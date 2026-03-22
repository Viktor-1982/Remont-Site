import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { allPosts, type Post } from ".contentlayer/generated"
import { wasNotificationSent, saveNotificationSent } from "@/lib/notifications-repo"
import { NOTIFIABLE_CALCULATORS } from "@/lib/notifiable-calculators"
import { authorizeRequest } from "@/lib/request-auth"
import { getAllSubscriptions } from "@/lib/subscriptions-repo"
import { buildUnsubscribeUrl } from "@/lib/unsubscribe-token"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "noreply@renohacks.com"
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://renohacks.com"
const NOTIFY_SECRET_ENV_NAMES = ["CRON_SECRET", "NOTIFY_SECRET"] as const
const DEFAULT_LOOKBACK_HOURS = 24 * 14
const MAX_LOOKBACK_HOURS = 24 * 90

type ContentKind = "article" | "calculator"

type NotifiableContent = {
    kind: ContentKind
    slug: string
    locale: "ru" | "en"
    title: string
    description: string
    url: string
    publishedAt: string
    notificationKey: string
}

type NotifyResult = {
    sent: number
    failed: number
    total: number
    errors: string[]
}

function getLookbackHours(req: NextRequest, body: unknown): number {
    const bodyHours =
        typeof body === "object" && body !== null && "lookbackHours" in body
            ? Number((body as { lookbackHours?: unknown }).lookbackHours)
            : Number.NaN
    const queryHours = Number(req.nextUrl.searchParams.get("hours"))
    const candidate = Number.isFinite(bodyHours) ? bodyHours : queryHours

    if (!Number.isFinite(candidate) || candidate <= 0) {
        return DEFAULT_LOOKBACK_HOURS
    }

    return Math.min(Math.floor(candidate), MAX_LOOKBACK_HOURS)
}

function mapPostToContent(post: Post): NotifiableContent {
    const locale = post.locale === "en" ? "en" : "ru"

    return {
        kind: "article",
        slug: post.slug,
        locale,
        title: post.title,
        description: post.description,
        url: post.url,
        publishedAt: post.date,
        notificationKey: `article:${locale}:${post.slug}`,
    }
}

function getAllNotifiableContent(): NotifiableContent[] {
    const posts = allPosts
        .filter((post) => !post.draft)
        .map((post) => mapPostToContent(post))

    const calculators: NotifiableContent[] = NOTIFIABLE_CALCULATORS.map((calculator) => ({
        kind: "calculator",
        slug: calculator.slug,
        locale: calculator.locale,
        title: calculator.title,
        description: calculator.description,
        url: calculator.url,
        publishedAt: calculator.publishedAt,
        notificationKey: `calculator:${calculator.locale}:${calculator.slug}`,
    }))

    return [...posts, ...calculators]
}

async function findPendingContent(lookbackHours: number): Promise<NotifiableContent[]> {
    const now = Date.now()
    const lowerBound = now - lookbackHours * 60 * 60 * 1000
    const pending: NotifiableContent[] = []

    for (const item of getAllNotifiableContent()) {
        const publishedAt = new Date(item.publishedAt).getTime()

        if (!Number.isFinite(publishedAt) || publishedAt < lowerBound || publishedAt > now) {
            continue
        }

        const alreadySent = await wasNotificationSent(item.notificationKey, item.locale)
        if (!alreadySent) {
            pending.push(item)
        }
    }

    return pending.sort(
        (left, right) =>
            new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
    )
}

function getContentLabels(
    item: NotifiableContent
): {
    subject: string
    heading: string
    cta: string
} {
    const isEnglish = item.locale === "en"

    if (isEnglish) {
        return item.kind === "calculator"
            ? {
                  subject: `New Calculator: ${item.title}`,
                  heading: "New Calculator Published!",
                  cta: "Open Calculator",
              }
            : {
                  subject: `New Article: ${item.title}`,
                  heading: "New Article Published!",
                  cta: "Read Article",
              }
    }

    return item.kind === "calculator"
        ? {
              subject: `Новый калькулятор: ${item.title}`,
              heading: "Опубликован новый калькулятор!",
              cta: "Открыть калькулятор",
          }
        : {
              subject: `Новая статья: ${item.title}`,
              heading: "Опубликована новая статья!",
              cta: "Читать статью",
          }
}

async function sendNotificationsForContent(item: NotifiableContent): Promise<NotifyResult> {
    const alreadySent = await wasNotificationSent(item.notificationKey, item.locale)
    if (alreadySent) {
        return {
            sent: 0,
            failed: 0,
            total: 0,
            errors: [`Notification already sent for ${item.notificationKey}`],
        }
    }

    const subscribers = await getAllSubscriptions()
    if (subscribers.length === 0) {
        return {
            sent: 0,
            failed: 0,
            total: 0,
            errors: ["No subscribers found"],
        }
    }

    const targetSubscribers = subscribers.filter((subscriber) => subscriber.locale === item.locale)
    if (targetSubscribers.length === 0) {
        return {
            sent: 0,
            failed: 0,
            total: 0,
            errors: [`No subscribers found for locale "${item.locale}"`],
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

    const contentUrl = `${SITE_URL}${item.url}`
    const { subject, heading, cta } = getContentLabels(item)
    const unsubscribeUrl = (email: string, locale: "ru" | "en") =>
        buildUnsubscribeUrl(SITE_URL, email, locale) || "mailto:vles8878@gmail.com"

    let successCount = 0
    let errorCount = 0
    const errors: string[] = []

    const batchSize = 50
    for (let index = 0; index < targetSubscribers.length; index += batchSize) {
        const batch = targetSubscribers.slice(index, index + batchSize)

        const emailPromises = batch.map(async (subscriber) => {
            try {
                const isEnglish = item.locale === "en"
                const htmlContent = isEnglish
                    ? `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                            <h1 style="color: #333;">${heading}</h1>
                            <h2 style="color: #555; margin-top: 20px;">${item.title}</h2>
                            <p style="color: #666; line-height: 1.6;">${item.description}</p>
                            <div style="margin: 30px 0;">
                                <a href="${contentUrl}" style="display: inline-block; background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">${cta}</a>
                            </div>
                            <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                                Want to unsubscribe? <a href="${unsubscribeUrl(subscriber.email, subscriber.locale)}">Unsubscribe here</a>.
                            </p>
                        </div>
                    `
                    : `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                            <h1 style="color: #333;">${heading}</h1>
                            <h2 style="color: #555; margin-top: 20px;">${item.title}</h2>
                            <p style="color: #666; line-height: 1.6;">${item.description}</p>
                            <div style="margin: 30px 0;">
                                <a href="${contentUrl}" style="display: inline-block; background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">${cta}</a>
                            </div>
                            <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                                Хотите отписаться? <a href="${unsubscribeUrl(subscriber.email, subscriber.locale)}">Отписаться</a>.
                            </p>
                        </div>
                    `

                await resend.emails.send({
                    from: FROM_EMAIL,
                    to: subscriber.email,
                    subject,
                    html: htmlContent,
                })

                successCount++
            } catch (error) {
                errorCount++
                const message = error instanceof Error ? error.message : String(error)
                errors.push(`${subscriber.email}: ${message}`)
                console.error(`Failed to send email to ${subscriber.email}:`, error)
            }
        })

        await Promise.all(emailPromises)

        if (index + batchSize < targetSubscribers.length) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
        }
    }

    await saveNotificationSent(
        item.notificationKey,
        item.locale,
        targetSubscribers.length,
        successCount,
        errorCount
    )

    return {
        sent: successCount,
        failed: errorCount,
        total: targetSubscribers.length,
        errors: errors.slice(0, 10),
    }
}

function findRequestedContent(
    slug: string,
    locale?: string,
    kind?: string
): NotifiableContent | undefined {
    return getAllNotifiableContent().find((item) => {
        if (item.slug !== slug) {
            return false
        }

        if (locale && item.locale !== locale) {
            return false
        }

        if (kind && item.kind !== kind) {
            return false
        }

        return true
    })
}

function formatResult(item: NotifiableContent, result: NotifyResult) {
    return {
        kind: item.kind,
        slug: item.slug,
        locale: item.locale,
        title: item.title,
        url: item.url,
        publishedAt: item.publishedAt,
        ...result,
    }
}

export async function POST(req: NextRequest) {
    try {
        const auth = authorizeRequest(req, NOTIFY_SECRET_ENV_NAMES)
        if (!auth.ok) {
            return auth.response
        }

        const body = await req.json().catch(() => ({}))
        const slug = typeof body.slug === "string" ? body.slug : undefined
        const locale = typeof body.locale === "string" ? body.locale : undefined
        const kind = typeof body.kind === "string" ? body.kind : undefined
        const auto = body.auto === true || (!slug && !locale)
        const lookbackHours = getLookbackHours(req, body)

        if (auto) {
            const pendingItems = await findPendingContent(lookbackHours)

            if (pendingItems.length === 0) {
                return NextResponse.json(
                    {
                        message: `No pending content found within the last ${lookbackHours} hours`,
                        processed: 0,
                    },
                    { status: 200 }
                )
            }

            const results = []
            for (const item of pendingItems) {
                const result = await sendNotificationsForContent(item)
                results.push(formatResult(item, result))
            }

            const totalSent = results.reduce((sum, item) => sum + item.sent, 0)
            const totalFailed = results.reduce((sum, item) => sum + item.failed, 0)

            return NextResponse.json(
                {
                    message: `Processed ${pendingItems.length} pending content items`,
                    processed: pendingItems.length,
                    totalSent,
                    totalFailed,
                    results,
                },
                { status: 200 }
            )
        }

        if (!slug) {
            return NextResponse.json(
                { error: "Slug is required when not in auto mode" },
                { status: 400 }
            )
        }

        const item = findRequestedContent(slug, locale, kind)
        if (!item) {
            return NextResponse.json(
                { error: `Content with slug "${slug}" not found` },
                { status: 404 }
            )
        }

        const result = await sendNotificationsForContent(item)

        return NextResponse.json(
            {
                message: `Notifications sent: ${result.sent} successful, ${result.failed} failed`,
                ...formatResult(item, result),
            },
            { status: 200 }
        )
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

export async function GET(req: NextRequest) {
    try {
        const auth = authorizeRequest(req, NOTIFY_SECRET_ENV_NAMES)
        if (!auth.ok) {
            return auth.response
        }

        const lookbackHours = getLookbackHours(req, null)
        const pendingItems = await findPendingContent(lookbackHours)

        if (pendingItems.length === 0) {
            return NextResponse.json(
                {
                    message: `No pending content found within the last ${lookbackHours} hours`,
                    processed: 0,
                },
                { status: 200 }
            )
        }

        const results = []
        for (const item of pendingItems) {
            const result = await sendNotificationsForContent(item)
            results.push(formatResult(item, result))
        }

        const totalSent = results.reduce((sum, item) => sum + item.sent, 0)
        const totalFailed = results.reduce((sum, item) => sum + item.failed, 0)

        return NextResponse.json(
            {
                message: `Processed ${pendingItems.length} pending content items`,
                processed: pendingItems.length,
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
