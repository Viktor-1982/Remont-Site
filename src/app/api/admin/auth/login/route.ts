import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createSession, ADMIN_SESSION_COOKIE } from "@/lib/admin-session"
import { checkRateLimit } from "@/lib/rate-limit"

export async function POST(req: NextRequest) {
    try {
        // ✅ Rate limiting для защиты от brute-force атак
        // Очень строгий лимит: 5 попыток входа в 15 минут
        const rateLimit = checkRateLimit(req, {
            maxRequests: 5,
            windowMs: 15 * 60 * 1000, // 15 минут
            message: "Too many login attempts. Please try again in 15 minutes.",
        })

        if (!rateLimit.success) {
            return NextResponse.json(
                { 
                    error: rateLimit.message || "Too many login attempts. Please try again later.",
                    retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
                },
                { 
                    status: 429,
                    headers: {
                        "Retry-After": Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
                        "X-RateLimit-Limit": "5",
                        "X-RateLimit-Remaining": rateLimit.remaining.toString(),
                        "X-RateLimit-Reset": new Date(rateLimit.resetTime).toISOString(),
                    },
                }
            )
        }

        const { password } = await req.json()

        if (!password || typeof password !== "string") {
            return NextResponse.json(
                { error: "Password is required" },
                { status: 400 }
            )
        }

        // ✅ Проверка пароля из переменных окружения
        // Поддержка нескольких паролей через запятую
        const passwordsEnv = process.env.ADMIN_PASSWORDS || process.env.ADMIN_PASSWORD || "admin123"
        const allowedPasswords = passwordsEnv
            .split(",")
            .map(p => p.trim())
            .filter(Boolean)

        // Проверяем пароль
        if (!allowedPasswords.includes(password)) {
            // ⚠️ Логируем неудачную попытку входа (для мониторинга)
            const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0] || 
                           req.headers.get("x-real-ip") || 
                           "unknown"
            console.warn("⚠️ Failed admin login attempt from IP:", clientIp)
            
            // Задержка для защиты от brute-force (2 секунды)
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            return NextResponse.json(
                { error: "Invalid password" },
                { 
                    status: 401,
                    headers: {
                        "X-RateLimit-Limit": "5",
                        "X-RateLimit-Remaining": rateLimit.remaining.toString(),
                        "X-RateLimit-Reset": new Date(rateLimit.resetTime).toISOString(),
                    },
                }
            )
        }

        // ✅ Создаем новую сессию
        const sessionToken = createSession()

        // ✅ Устанавливаем HTTP-only cookie
        const cookieStore = await cookies()
        cookieStore.set(ADMIN_SESSION_COOKIE, sessionToken, {
            httpOnly: true, // ✅ Недоступно через JavaScript
            secure: process.env.NODE_ENV === "production", // ✅ Только HTTPS в продакшене
            sameSite: "lax", // ✅ Защита от CSRF
            maxAge: 8 * 60 * 60, // ✅ 8 часов
            path: "/", // ✅ Доступна для всех путей
        })

        return NextResponse.json(
            { success: true },
            {
                headers: {
                    "X-RateLimit-Limit": "5",
                    "X-RateLimit-Remaining": rateLimit.remaining.toString(),
                    "X-RateLimit-Reset": new Date(rateLimit.resetTime).toISOString(),
                },
            }
        )
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        console.error("Error in login:", errorMessage)
        
        return NextResponse.json(
            { error: "Failed to login" },
            { status: 500 }
        )
    }
}

