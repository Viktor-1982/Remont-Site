import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { allPosts, type Post } from ".contentlayer/generated"
import { getAllSubscriptions } from "@/lib/subscriptions-repo"
import { wasNotificationSent, saveNotificationSent } from "@/lib/notifications-repo"

// Инициализация Resend (опционально, если настроен RESEND_API_KEY)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "noreply@renohacks.com"
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://renohacks.com"

// Секретный ключ для защиты endpoint
// CRON_SECRET используется Vercel автоматически для cron jobs
// NOTIFY_SECRET можно использовать для ручных вызовов
const NOTIFY_SECRET = process.env.CRON_SECRET || process.env.NOTIFY_SECRET || "change-me-in-production"

// Время в часах, в течение которого статья считается новой (для автоматического поиска)
const NEW_POST_HOURS = 24

/**
 * Находит новые статьи, опубликованные за последние N часов
 */
function findNewPosts(hours: number = NEW_POST_HOURS): Post[] {
    const now = Date.now()
    const hoursAgo = now - hours * 60 * 60 * 1000

    return allPosts.filter((post) => {
        if (post.draft) return false
        
        const postDate = new Date(post.date).getTime()
        const isNew = postDate >= hoursAgo && postDate <= now
        
        return isNew
    }).sort((a, b) => {
        // Сортируем по дате (новые первыми)
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return dateB - dateA
    })
}

/**
 * Отправляет уведомления для одной статьи
 */
async function sendNotificationsForPost(post: Post): Promise<{
    sent: number
    failed: number
    total: number
    errors: string[]
}> {
    // Проверяем, не было ли уже отправлено уведомление
    const alreadySent = await wasNotificationSent(post.slug, post.locale)
    if (alreadySent) {
        return {
            sent: 0,
            failed: 0,
            total: 0,
            errors: [`Notification already sent for ${post.slug} (${post.locale})`],
        }
    }

    // Получаем всех подписчиков
    const subscribers = await getAllSubscriptions()

    if (subscribers.length === 0) {
        return {
            sent: 0,
            failed: 0,
            total: 0,
            errors: ["No subscribers found"],
        }
    }

    // Фильтруем подписчиков по языку статьи
    const targetSubscribers = subscribers.filter(
        (sub) => sub.locale === post.locale
    )

    if (targetSubscribers.length === 0) {
        return {
            sent: 0,
            failed: 0,
            total: 0,
            errors: [`No subscribers found for locale "${post.locale}"`],
        }
    }

    if (!resend) {
        return {
            sent: 0,
            failed: 0,
            total: targetSubscribers.length,
            errors: ["Resend is not configured. RESEND_API_KEY is missing."],
        }
    }

    // Формируем URL статьи
    const articleUrl = `${SITE_URL}${post.url}`
    const unsubscribeUrl = (email: string, locale: string) =>
        `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}&locale=${locale}`

    // Отправляем письма
    const isEnglish = post.locale === "en"
    const subject = isEnglish
        ? `New Article: ${post.title}`
        : `Новая статья: ${post.title}`

    let successCount = 0
    let errorCount = 0
    const errors: string[] = []

    // Отправляем письма батчами (Resend рекомендует не более 50 за раз)
    const batchSize = 50
    for (let i = 0; i < targetSubscribers.length; i += batchSize) {
        const batch = targetSubscribers.slice(i, i + batchSize)

        const emailPromises = batch.map(async (subscriber) => {
            try {
                const htmlContent = isEnglish
                    ? `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                            <h1 style="color: #333;">New Article Published!</h1>
                            <h2 style="color: #555; margin-top: 20px;">${post.title}</h2>
                            <p style="color: #666; line-height: 1.6;">${post.description}</p>
                            <div style="margin: 30px 0;">
                                <a href="${articleUrl}" style="display: inline-block; background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Read Article</a>
                            </div>
                            <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                                Want to unsubscribe? <a href="${unsubscribeUrl(subscriber.email, subscriber.locale)}">Unsubscribe here</a>.
                            </p>
                        </div>
                    `
                    : `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                            <h1 style="color: #333;">Опубликована новая статья!</h1>
                            <h2 style="color: #555; margin-top: 20px;">${post.title}</h2>
                            <p style="color: #666; line-height: 1.6;">${post.description}</p>
                            <div style="margin: 30px 0;">
                                <a href="${articleUrl}" style="display: inline-block; background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Читать статью</a>
                            </div>
                            <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                                Хотите отписаться? <a href="${unsubscribeUrl(subscriber.email, subscriber.locale)}">Отписаться</a>.
                            </p>
                        </div>
                    `

                await resend.emails.send({
                    from: FROM_EMAIL,
                    to: subscriber.email,
                    subject: subject,
                    html: htmlContent,
                })

                successCount++
            } catch (error) {
                errorCount++
                const errorMsg = error instanceof Error ? error.message : String(error)
                errors.push(`${subscriber.email}: ${errorMsg}`)
                console.error(`Failed to send email to ${subscriber.email}:`, error)
            }
        })

        await Promise.all(emailPromises)

        // Небольшая задержка между батчами, чтобы не превысить лимиты API
        if (i + batchSize < targetSubscribers.length) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
        }
    }

    // Сохраняем информацию об отправке
    await saveNotificationSent(
        post.slug,
        post.locale,
        targetSubscribers.length,
        successCount,
        errorCount
    )

    return {
        sent: successCount,
        failed: errorCount,
        total: targetSubscribers.length,
        errors: errors.slice(0, 10), // Показываем только первые 10 ошибок
    }
}

export async function POST(req: NextRequest) {
    try {
        // Проверка секретного ключа через заголовок или query параметр
        const authHeader = req.headers.get("authorization")
        const secretParam = req.nextUrl.searchParams.get("secret")
        const secret = authHeader?.replace("Bearer ", "") || secretParam

        if (!secret || secret !== NOTIFY_SECRET) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const body = await req.json().catch(() => ({}))
        const { slug, locale, auto } = body

        // Автоматический режим: находим все новые статьи
        if (auto === true || (!slug && !locale)) {
            const newPosts = findNewPosts(NEW_POST_HOURS)
            
            if (newPosts.length === 0) {
                return NextResponse.json(
                    { 
                        message: `No new posts found (published within last ${NEW_POST_HOURS} hours)`,
                        processed: 0 
                    },
                    { status: 200 }
                )
            }

            const results = []
            for (const post of newPosts) {
                const result = await sendNotificationsForPost(post)
                results.push({
                    slug: post.slug,
                    locale: post.locale,
                    title: post.title,
                    ...result,
                })
            }

            const totalSent = results.reduce((sum, r) => sum + r.sent, 0)
            const totalFailed = results.reduce((sum, r) => sum + r.failed, 0)

            return NextResponse.json(
                {
                    message: `Processed ${newPosts.length} new posts`,
                    processed: newPosts.length,
                    totalSent,
                    totalFailed,
                    results,
                },
                { status: 200 }
            )
        }

        // Ручной режим: отправка для конкретной статьи
        if (!slug) {
            return NextResponse.json(
                { error: "Slug is required when not in auto mode" },
                { status: 400 }
            )
        }

        // Находим статью по slug и locale
        const post = allPosts.find(
            (p) => p.slug === slug && (!locale || p.locale === locale) && !p.draft
        )

        if (!post) {
            return NextResponse.json(
                { error: `Post with slug "${slug}" not found` },
                { status: 404 }
            )
        }

        const result = await sendNotificationsForPost(post)

        return NextResponse.json(
            {
                message: `Notifications sent: ${result.sent} successful, ${result.failed} failed`,
                slug: post.slug,
                locale: post.locale,
                title: post.title,
                ...result,
            },
            { status: 200 }
        )

        // Получаем всех подписчиков
        const subscribers = await getAllSubscriptions()

        if (subscribers.length === 0) {
            return NextResponse.json(
                { message: "No subscribers found", sent: 0 },
                { status: 200 }
            )
        }

        // Фильтруем подписчиков по языку статьи
        const targetSubscribers = subscribers.filter(
            (sub) => sub.locale === post.locale
        )

        if (targetSubscribers.length === 0) {
            return NextResponse.json(
                { message: `No subscribers found for locale "${post.locale}"`, sent: 0 },
                { status: 200 }
            )
        }

        if (!resend) {
            return NextResponse.json(
                { error: "Resend is not configured. RESEND_API_KEY is missing." },
                { status: 500 }
            )
        }

        // Формируем URL статьи
        const articleUrl = `${SITE_URL}${post.url}`
        const unsubscribeUrl = (email: string, locale: string) =>
            `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}&locale=${locale}`

        // Отправляем письма
        const isEnglish = post.locale === "en"
        const subject = isEnglish
            ? `New Article: ${post.title}`
            : `Новая статья: ${post.title}`

        let successCount = 0
        let errorCount = 0
        const errors: string[] = []

        // Отправляем письма батчами (Resend рекомендует не более 50 за раз)
        const batchSize = 50
        for (let i = 0; i < targetSubscribers.length; i += batchSize) {
            const batch = targetSubscribers.slice(i, i + batchSize)

            const emailPromises = batch.map(async (subscriber) => {
                try {
                    const htmlContent = isEnglish
                        ? `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                                <h1 style="color: #333;">New Article Published!</h1>
                                <h2 style="color: #555; margin-top: 20px;">${post.title}</h2>
                                <p style="color: #666; line-height: 1.6;">${post.description}</p>
                                <div style="margin: 30px 0;">
                                    <a href="${articleUrl}" style="display: inline-block; background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Read Article</a>
                                </div>
                                <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                                    Want to unsubscribe? <a href="${unsubscribeUrl(subscriber.email, subscriber.locale)}">Unsubscribe here</a>.
                                </p>
                            </div>
                        `
                        : `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                                <h1 style="color: #333;">Опубликована новая статья!</h1>
                                <h2 style="color: #555; margin-top: 20px;">${post.title}</h2>
                                <p style="color: #666; line-height: 1.6;">${post.description}</p>
                                <div style="margin: 30px 0;">
                                    <a href="${articleUrl}" style="display: inline-block; background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Читать статью</a>
                                </div>
                                <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                                    Хотите отписаться? <a href="${unsubscribeUrl(subscriber.email, subscriber.locale)}">Отписаться</a>.
                                </p>
                            </div>
                        `

                    await resend.emails.send({
                        from: FROM_EMAIL,
                        to: subscriber.email,
                        subject: subject,
                        html: htmlContent,
                    })

                    successCount++
                } catch (error) {
                    errorCount++
                    const errorMsg = error instanceof Error ? error.message : String(error)
                    errors.push(`${subscriber.email}: ${errorMsg}`)
                    console.error(`Failed to send email to ${subscriber.email}:`, error)
                }
            })

            await Promise.all(emailPromises)

            // Небольшая задержка между батчами, чтобы не превысить лимиты API
            if (i + batchSize < targetSubscribers.length) {
                await new Promise((resolve) => setTimeout(resolve, 1000))
            }
        }

    } catch (error) {
        console.error("Notify subscribers error:", error)
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "An error occurred",
            },
            { status: 500 }
        )
    }
}

/**
 * GET endpoint для автоматического вызова через cron
 * Проверяет новые статьи и отправляет уведомления
 */
export async function GET(req: NextRequest) {
    try {
        // Проверка секретного ключа через заголовок (Vercel автоматически добавляет CRON_SECRET)
        // Также поддерживается query параметр для ручных вызовов
        const authHeader = req.headers.get("authorization")
        const secretParam = req.nextUrl.searchParams.get("secret")
        const secret = authHeader?.replace("Bearer ", "") || secretParam

        if (!secret || secret !== NOTIFY_SECRET) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        // Автоматически находим и отправляем уведомления для новых статей
        const newPosts = findNewPosts(NEW_POST_HOURS)
        
        if (newPosts.length === 0) {
            return NextResponse.json(
                { 
                    message: `No new posts found (published within last ${NEW_POST_HOURS} hours)`,
                    processed: 0 
                },
                { status: 200 }
            )
        }

        const results = []
        for (const post of newPosts) {
            const result = await sendNotificationsForPost(post)
            results.push({
                slug: post.slug,
                locale: post.locale,
                title: post.title,
                ...result,
            })
        }

        const totalSent = results.reduce((sum, r) => sum + r.sent, 0)
        const totalFailed = results.reduce((sum, r) => sum + r.failed, 0)

        return NextResponse.json(
            {
                message: `Processed ${newPosts.length} new posts`,
                processed: newPosts.length,
                totalSent,
                totalFailed,
                results,
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Auto notify subscribers error:", error)
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "An error occurred",
            },
            { status: 500 }
        )
    }
}

