import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { validateSession, ADMIN_SESSION_COOKIE } from "@/lib/admin-session"

export async function GET() {
    try {
        // ✅ Получаем токен из cookie
        const cookieStore = await cookies()
        const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value

        // ✅ Проверяем валидность сессии
        const isValid = validateSession(sessionToken)

        return NextResponse.json({
            authenticated: isValid,
        })
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        console.error("Error checking session:", errorMessage)
        
        return NextResponse.json(
            { authenticated: false },
            { status: 500 }
        )
    }
}

