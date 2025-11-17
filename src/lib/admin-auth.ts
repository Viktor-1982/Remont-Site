// ✅ Утилита для проверки аутентификации администратора в API routes

import { cookies } from "next/headers"
import { validateSession, ADMIN_SESSION_COOKIE } from "./admin-session"

/**
 * Проверяет, аутентифицирован ли администратор
 * Используется в API routes для защиты endpoints
 */
export async function checkAdminAuth(): Promise<boolean> {
    try {
        // ✅ Получаем токен из HTTP-only cookie
        const cookieStore = await cookies()
        const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value

        // ✅ Проверяем валидность сессии
        return validateSession(sessionToken)
    } catch (error) {
        console.error("Error checking admin auth:", error)
        return false
    }
}

/**
 * Получает токен сессии из cookie (для совместимости, если нужно)
 */
export async function getSessionToken(): Promise<string | null> {
    try {
        const cookieStore = await cookies()
        return cookieStore.get(ADMIN_SESSION_COOKIE)?.value || null
    } catch {
        return null
    }
}

