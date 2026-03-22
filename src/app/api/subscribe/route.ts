import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { type Subscription } from "../subscriptions/store"
import { findSubscription, getStats, upsertSubscription } from "@/lib/subscriptions-repo"
import { authorizeRequest } from "@/lib/request-auth"
import { buildUnsubscribeUrl } from "@/lib/unsubscribe-token"

// Инициализация Resend (опционально, если настроен RESEND_API_KEY)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "noreply@renohacks.com"
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://renohacks.com"
const ADMIN_SECRET_ENV_NAMES = ["ADMIN_API_SECRET", "CRON_SECRET"] as const

export async function POST(req: NextRequest) {
    let locale: "ru" | "en" = "ru" // Дефолтное значение для обработки ошибок
    try {
        const body = await req.json()
        locale = (body.locale === "en" ? "en" : "ru")
        const { email, source } = body

        const resendConfigured = Boolean(resend) && Boolean(process.env.RESEND_API_KEY)

        // Валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email || !emailRegex.test(email)) {
            return NextResponse.json(
                { error: locale === "en" ? "Invalid email address" : "Некорректный email адрес" },
                { status: 400 }
            )
        }

        // Проверка на дубликаты - если уже подписан, просто возвращаем успех
        const existing = await findSubscription(email)
        if (existing) {
            // Обновляем дату подписки
            await upsertSubscription({
                ...existing,
                subscribedAt: Date.now(),
                locale: locale || existing.locale || ("ru" as const),
            })

            let emailSent = false

            // Пытаемся отправить письмо повторно (если настроен Resend)
            if (resendConfigured && resend) {
                try {
                    const isEnglish = locale === "en"
                    const subject = isEnglish 
                        ? "Welcome back to Renohacks! 🎉" 
                        : "С возвращением в Renohacks! 🎉"
                    const unsubscribeUrl =
                        buildUnsubscribeUrl(SITE_URL, email, locale) ||
                        "mailto:info@renohacks.com"
                    
                    const htmlContent = isEnglish
                        ? `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                                <h1 style="color: #333;">Welcome back!</h1>
                                <p>You're already subscribed to our newsletter. Here's what you'll receive:</p>
                                <ul>
                                    <li>📚 Best renovation and design articles</li>
                                    <li>🛠️ DIY tips and tricks</li>
                                    <li>💡 Latest trends and ideas</li>
                                    <li>📊 Useful calculators and tools</li>
                                </ul>
                                <p>Thank you for being with us!</p>
                                <p style="color: #666; font-size: 12px; margin-top: 30px;">
                                    Want to unsubscribe? <a href="${unsubscribeUrl}">Unsubscribe here</a>.
                                </p>
                            </div>
                        `
                        : `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                                <h1 style="color: #333;">С возвращением!</h1>
                                <p>Вы уже подписаны на нашу рассылку. Вот что вы будете получать:</p>
                                <ul>
                                    <li>📚 Лучшие статьи о ремонте и дизайне</li>
                                    <li>🛠️ DIY советы и лайфхаки</li>
                                    <li>💡 Последние тренды и идеи</li>
                                    <li>📊 Полезные калькуляторы и инструменты</li>
                                </ul>
                                <p>Спасибо, что остаётесь с нами!</p>
                                <p style="color: #666; font-size: 12px; margin-top: 30px;">
                                    Хотите отписаться? <a href="${unsubscribeUrl}">Отписаться</a>.
                                </p>
                            </div>
                        `

                    await resend.emails.send({
                        from: FROM_EMAIL,
                        to: email,
                        subject: subject,
                        html: htmlContent,
                    })
                    emailSent = true
                } catch (emailError) {
                    console.error("Failed to send welcome back email:", emailError)
                }
            } else {
                console.warn("Resend not configured: RESEND_API_KEY is missing in environment (duplicate subscribe)")
            }
            
            return NextResponse.json(
                { 
                    message: locale === "en" 
                        ? "You're already subscribed! Check your email for a welcome message." 
                        : "Вы уже подписаны! Проверьте почту - мы отправили приветственное письмо.",
                    email: existing.email,
                    emailSent,
                    resendConfigured,
                },
                { status: 200 }
            )
        }

        // Добавляем подписку
        const subscription: Subscription = {
            email: email.toLowerCase(),
            locale: locale,
            subscribedAt: Date.now(),
            source: source || "website",
        }

        await upsertSubscription(subscription)

        let emailSent = false

        // Отправка письма подтверждения через Resend (если настроен)
        if (resendConfigured && resend) {
            try {
                const isEnglish = locale === "en"
                const subject = isEnglish 
                    ? "Welcome to Renohacks! 🎉" 
                    : "Добро пожаловать в Renohacks! 🎉"
                const unsubscribeUrl =
                    buildUnsubscribeUrl(SITE_URL, email, locale) ||
                    "mailto:info@renohacks.com"
                
                const htmlContent = isEnglish
                    ? `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                            <h1 style="color: #333;">Welcome to Renohacks!</h1>
                            <p>Thank you for subscribing to our newsletter. You'll now receive:</p>
                            <ul>
                                <li>📚 Best renovation and design articles</li>
                                <li>🛠️ DIY tips and tricks</li>
                                <li>💡 Latest trends and ideas</li>
                                <li>📊 Useful calculators and tools</li>
                            </ul>
                            <p>We're excited to share our knowledge with you!</p>
                            <p style="color: #666; font-size: 12px; margin-top: 30px;">
                                If you didn't subscribe, you can safely ignore this email.
                            </p>
                            <p style="color: #666; font-size: 12px; margin-top: 10px;">
                                Want to unsubscribe? <a href="${unsubscribeUrl}">Unsubscribe here</a>.
                            </p>
                        </div>
                    `
                    : `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                            <h1 style="color: #333;">Добро пожаловать в Renohacks!</h1>
                            <p>Спасибо за подписку на нашу рассылку. Теперь вы будете получать:</p>
                            <ul>
                                <li>📚 Лучшие статьи о ремонте и дизайне</li>
                                <li>🛠️ DIY советы и лайфхаки</li>
                                <li>💡 Последние тренды и идеи</li>
                                <li>📊 Полезные калькуляторы и инструменты</li>
                            </ul>
                            <p>Мы рады делиться с вами нашими знаниями!</p>
                            <p style="color: #666; font-size: 12px; margin-top: 30px;">
                                Если вы не подписывались, просто проигнорируйте это письмо.
                            </p>
                            <p style="color: #666; font-size: 12px; margin-top: 10px;">
                                Хотите отписаться? <a href="${unsubscribeUrl}">Отписаться</a>.
                            </p>
                        </div>
                    `

                await resend.emails.send({
                    from: FROM_EMAIL,
                    to: email,
                    subject: subject,
                    html: htmlContent,
                })
                emailSent = true
            } catch (emailError) {
                // Логируем ошибку, но не прерываем процесс подписки
                console.error("Failed to send confirmation email:", emailError)
                // Продолжаем выполнение - подписка всё равно сохранена
            }
        } else {
            console.warn("Resend not configured: RESEND_API_KEY is missing in environment")
        }

        return NextResponse.json(
            { 
                message: locale === "en" 
                    ? "Successfully subscribed!" 
                    : "Успешно подписались!",
                email: subscription.email,
                emailSent,
                resendConfigured,
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Subscription error:", error)
        
        // Детальное логирование для отладки
        if (error instanceof Error) {
            console.error("Error message:", error.message)
            console.error("Error stack:", error.stack)
        }
        
        // Логируем информацию о Supabase
        console.error("Supabase ready:", process.env.SUPABASE_URL ? "configured" : "not configured")
        
        return NextResponse.json(
            { 
                error: locale === "en" 
                    ? "An error occurred. Please try again later." 
                    : "Произошла ошибка. Пожалуйста, попробуйте позже.",
                // В development режиме показываем детали ошибки
                ...(process.env.NODE_ENV === "development" && error instanceof Error ? {
                    details: error.message,
                    stack: error.stack
                } : {})
            },
            { status: 500 }
        )
    }
}

// GET endpoint для получения статистики (опционально, для админки)
export async function GET(req: NextRequest) {
    const auth = authorizeRequest(req, ADMIN_SECRET_ENV_NAMES)
    if (!auth.ok) {
        return auth.response
    }

    const stats = await getStats()
    return NextResponse.json(stats)
}

