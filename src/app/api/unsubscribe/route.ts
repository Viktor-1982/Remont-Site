import { NextRequest, NextResponse } from "next/server"
import { deleteSubscription, findSubscription } from "@/lib/subscriptions-repo"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function unsubscribe(email: string, locale: string) {
    const normalizedEmail = email.toLowerCase()
    const existing = await findSubscription(normalizedEmail)

    if (!existing) {
        return {
            status: 200,
            body: {
                message:
                    locale === "en"
                        ? "This email is already unsubscribed or not found."
                        : "Этот email уже отсутствует в рассылке.",
                email: normalizedEmail,
            },
        }
    }

    await deleteSubscription(normalizedEmail)

    return {
        status: 200,
        body: {
            message: locale === "en" ? "Successfully unsubscribed." : "Вы успешно отписались.",
            email: normalizedEmail,
        },
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const email = body?.email as string | undefined
    const locale = (body?.locale as string | undefined) || "ru"

    if (!email || !emailRegex.test(email)) {
        return NextResponse.json(
            { error: locale === "en" ? "Invalid email address" : "Некорректный email" },
            { status: 400 }
        )
    }

    const result = await unsubscribe(email, locale)
    return NextResponse.json(result.body, { status: result.status })
}

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get("email") || undefined
    const locale = req.nextUrl.searchParams.get("locale") || "ru"

    if (!email || !emailRegex.test(email)) {
        return NextResponse.json(
            { error: locale === "en" ? "Invalid email address" : "Некорректный email" },
            { status: 400 }
        )
    }

    const result = await unsubscribe(email, locale)
    return NextResponse.json(result.body, { status: result.status })
}

