import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { deleteSession, ADMIN_SESSION_COOKIE } from "@/lib/admin-session"

export async function POST() {
    try {
        // ✅ Получаем токен из cookie
        const cookieStore = await cookies()
        const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value

        // ✅ Удаляем сессию из хранилища
        deleteSession(sessionToken)

        // ✅ Удаляем cookie
        cookieStore.delete(ADMIN_SESSION_COOKIE)

        return NextResponse.json({ success: true })
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        console.error("Error in logout:", errorMessage)
        
        return NextResponse.json(
            { error: "Failed to logout" },
            { status: 500 }
        )
    }
}

