import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { type Subscription } from "../subscriptions/store"
import { findSubscription, getStats, upsertSubscription } from "@/lib/subscriptions-repo"
import { authorizeRequest } from "@/lib/request-auth"
import { buildUnsubscribeUrl } from "@/lib/unsubscribe-token"
import {
    DEFAULT_SUBSCRIPTION_SEGMENT,
    getSubscriptionSegmentCopy,
    isSubscriptionSegment,
    type SubscriptionSegment,
} from "@/lib/subscription-segments"

type Locale = "ru" | "en"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "noreply@renohacks.com"
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://renohacks.com"
const ADMIN_SECRET_ENV_NAMES = ["ADMIN_API_SECRET", "CRON_SECRET"] as const

function resolveLocale(value: unknown): Locale {
    return value === "en" ? "en" : "ru"
}

function resolveSegment(value: unknown): SubscriptionSegment {
    return isSubscriptionSegment(value) ? value : DEFAULT_SUBSCRIPTION_SEGMENT
}

function resolveSource(value: unknown): string {
    return typeof value === "string" && value.trim() ? value.trim() : "website"
}

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function buildWelcomeEmail({
    email,
    locale,
    segment,
    existing,
}: {
    email: string
    locale: Locale
    segment: SubscriptionSegment
    existing: boolean
}) {
    const isEnglish = locale === "en"
    const segmentCopy = getSubscriptionSegmentCopy(segment, locale)
    const unsubscribeUrl =
        buildUnsubscribeUrl(SITE_URL, email, locale) || "mailto:vles8878@gmail.com"
    const heading = existing
        ? isEnglish
            ? "Your subscription is updated"
            : "Мы обновили вашу подписку"
        : isEnglish
          ? "Welcome to Renohacks"
          : "Добро пожаловать в Renohacks"
    const intro = existing
        ? isEnglish
            ? `You are already subscribed. We updated your newsletter preference to "${segmentCopy.label}".`
            : `Вы уже были подписаны. Мы обновили направление рассылки на "${segmentCopy.label}".`
        : isEnglish
          ? `Thanks for subscribing. Your selected newsletter track is "${segmentCopy.label}".`
          : `Спасибо за подписку. Вы выбрали направление "${segmentCopy.label}".`
    const footer = isEnglish
        ? "You can unsubscribe at any time using the link below."
        : "Вы можете отписаться в любой момент по ссылке ниже."
    const subject = existing
        ? isEnglish
            ? "Your Renohacks subscription is updated"
            : "Мы обновили вашу подписку Renohacks"
        : isEnglish
          ? "Welcome to Renohacks"
          : "Добро пожаловать в Renohacks"
    const bullets = segmentCopy.emailBullets
        .map((item) => `<li style="margin: 0 0 8px;">${item}</li>`)
        .join("")

    return {
        subject,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1f2937;">
                <h1 style="margin: 0 0 16px; color: #111827;">${heading}</h1>
                <p style="margin: 0 0 12px; line-height: 1.6;">${intro}</p>
                <p style="margin: 0 0 12px; line-height: 1.6;"><strong>${segmentCopy.emailHeading}.</strong> ${segmentCopy.emailIntro}</p>
                <ul style="margin: 0 0 20px; padding-left: 20px; line-height: 1.6;">
                    ${bullets}
                </ul>
                <p style="margin: 0 0 16px; line-height: 1.6;">${footer}</p>
                <p style="margin: 0; font-size: 12px; color: #6b7280;">
                    <a href="${unsubscribeUrl}" style="color: #2563eb; text-decoration: underline;">
                        ${isEnglish ? "Unsubscribe" : "Отписаться"}
                    </a>
                </p>
            </div>
        `,
    }
}

async function sendWelcomeEmail(
    email: string,
    locale: Locale,
    segment: SubscriptionSegment,
    existing: boolean
) {
    const resendConfigured = Boolean(resend) && Boolean(process.env.RESEND_API_KEY)

    if (!resendConfigured || !resend) {
        console.warn("Resend is not configured for newsletter subscriptions")
        return {
            emailSent: false,
            resendConfigured,
        }
    }

    const message = buildWelcomeEmail({ email, locale, segment, existing })

    try {
        await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: message.subject,
            html: message.html,
        })

        return {
            emailSent: true,
            resendConfigured,
        }
    } catch (error) {
        console.error("Failed to send subscription email:", error)
        return {
            emailSent: false,
            resendConfigured,
        }
    }
}

export async function POST(req: NextRequest) {
    let locale: Locale = "ru"

    try {
        const body = await req.json().catch(() => ({}))
        locale = resolveLocale((body as { locale?: unknown }).locale)

        const rawEmail = (body as { email?: unknown }).email
        const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : ""
        const source = resolveSource((body as { source?: unknown }).source)
        const segment = resolveSegment((body as { segment?: unknown }).segment)

        if (!isValidEmail(email)) {
            return NextResponse.json(
                {
                    error:
                        locale === "en"
                            ? "Invalid email address"
                            : "Введите корректный email адрес",
                },
                { status: 400 }
            )
        }

        const existing = await findSubscription(email)

        if (existing) {
            const updatedSubscription: Subscription = {
                ...existing,
                email,
                locale,
                segment,
                source: source || existing.source || "website",
                subscribedAt: Date.now(),
            }

            await upsertSubscription(updatedSubscription)
            const emailStatus = await sendWelcomeEmail(email, locale, segment, true)

            return NextResponse.json(
                {
                    message:
                        locale === "en"
                            ? "Your subscription preferences were updated."
                            : "Мы обновили параметры вашей подписки.",
                    email,
                    locale,
                    segment,
                    ...emailStatus,
                },
                { status: 200 }
            )
        }

        const subscription: Subscription = {
            email,
            locale,
            segment,
            source,
            subscribedAt: Date.now(),
        }

        await upsertSubscription(subscription)
        const emailStatus = await sendWelcomeEmail(email, locale, segment, false)

        return NextResponse.json(
            {
                message:
                    locale === "en" ? "Successfully subscribed." : "Подписка оформлена.",
                email,
                locale,
                segment,
                ...emailStatus,
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Subscription error:", error)

        return NextResponse.json(
            {
                error:
                    locale === "en"
                        ? "An error occurred. Please try again later."
                        : "Произошла ошибка. Пожалуйста, попробуйте позже.",
                ...(process.env.NODE_ENV === "development" && error instanceof Error
                    ? {
                          details: error.message,
                          stack: error.stack,
                      }
                    : {}),
            },
            { status: 500 }
        )
    }
}

export async function GET(req: NextRequest) {
    const auth = authorizeRequest(req, ADMIN_SECRET_ENV_NAMES)
    if (!auth.ok) {
        return auth.response
    }

    const stats = await getStats()
    return NextResponse.json(stats)
}
