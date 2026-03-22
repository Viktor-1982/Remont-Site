import { NextRequest, NextResponse } from "next/server"
import { deleteSubscription, findSubscription } from "@/lib/subscriptions-repo"
import { verifyUnsubscribeToken } from "@/lib/unsubscribe-token"

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
            message:
                locale === "en"
                    ? "Successfully unsubscribed."
                    : "Вы успешно отписались.",
            email: normalizedEmail,
        },
    }
}

function unauthorizedMessage(locale: string) {
    return locale === "en"
        ? "Invalid or expired unsubscribe token"
        : "Недействительная или просроченная ссылка для отписки"
}

export async function POST(req: NextRequest) {
    const body = await req.json().catch(() => ({}))
    const locale = body?.locale === "en" ? "en" : "ru"
    const verification = verifyUnsubscribeToken(body?.token as string | undefined)

    if (!verification.valid) {
        return NextResponse.json(
            { error: unauthorizedMessage(locale) },
            { status: 401 }
        )
    }

    const result = await unsubscribe(verification.email, verification.locale)
    return NextResponse.json(result.body, { status: result.status })
}

export async function GET(req: NextRequest) {
    const locale = req.nextUrl.searchParams.get("locale") === "en" ? "en" : "ru"
    const verification = verifyUnsubscribeToken(
        req.nextUrl.searchParams.get("token") || undefined
    )

    if (!verification.valid) {
        return NextResponse.json(
            { error: unauthorizedMessage(locale) },
            { status: 401 }
        )
    }

    const result = await unsubscribe(verification.email, verification.locale)
    return NextResponse.json(result.body, { status: result.status })
}
