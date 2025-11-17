import { NextRequest, NextResponse } from "next/server"
import { checkRateLimit } from "@/lib/rate-limit"

interface ChatCompletionChoice {
    message: {
        role: string
        content: string
    }
}

interface ChatCompletionResponse {
    choices?: ChatCompletionChoice[]
    error?: {
        message: string
        code: number | string
    }
}

const FREE_MODELS = [
    "deepseek/deepseek-r1:free",
    "meta-llama/llama-3.2-3b-instruct:free",
    "google/gemma-2-9b-it:free",
    "cognitivecomputations/dolphin-mistral-24b-venice:free",
]

export async function POST(req: NextRequest) {
    try {
        // ✅ Rate limiting: 20 запросов в минуту для чата (защита от злоупотребления)
        const rateLimit = checkRateLimit(req, {
            maxRequests: 20,
            windowMs: 60 * 1000, // 1 минута
            message: "Too many chat requests. Please slow down and try again in a minute.",
        })

        if (!rateLimit.success) {
            return NextResponse.json(
                {
                    reply: rateLimit.message || "Too many requests. Please try again later.",
                },
                {
                    status: 429,
                    headers: {
                        "Retry-After": Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
                        "X-RateLimit-Limit": "20",
                        "X-RateLimit-Remaining": rateLimit.remaining.toString(),
                        "X-RateLimit-Reset": new Date(rateLimit.resetTime).toISOString(),
                    },
                }
            )
        }

        const body = await req.json()
        const { messages, locale } = body

        // ✅ Валидация входных данных
        if (!Array.isArray(messages)) {
            return NextResponse.json(
                { reply: "Invalid request: messages must be an array" },
                { status: 400 }
            )
        }

        // ✅ Ограничение количества сообщений (защита от DoS)
        if (messages.length > 50) {
            return NextResponse.json(
                { reply: "Too many messages. Maximum 50 messages allowed." },
                { status: 400 }
            )
        }

        // ✅ Валидация и санитизация сообщений
        interface ChatMessage {
            role: string
            content: string
        }
        
        const validatedMessages = messages
            .slice(0, 50) // Ограничиваем количество
            .filter((msg: unknown): msg is ChatMessage => {
                // Проверяем структуру сообщения
                if (!msg || typeof msg !== "object") return false
                const m = msg as Record<string, unknown>
                if (typeof m.role !== "string" || typeof m.content !== "string") return false
                if (!["user", "assistant", "system"].includes(m.role)) return false
                // Ограничиваем длину сообщения (защита от DoS)
                if (m.content.length > 10000) return false
                return true
            })
            .map((msg: ChatMessage) => ({
                role: msg.role,
                content: msg.content.substring(0, 10000), // Обрезаем слишком длинные сообщения
            }))

        // ✅ Валидация locale
        const validLocale = locale === "en" ? "en" : "ru"

        const systemPrompt = validLocale === "en" 
            ? "You are a helpful renovation assistant for Renohacks.com. Provide practical DIY tips for home renovation, painting, bathroom and kitchen remodeling. Keep answers concise and actionable."
            : "Ты помощник по ремонту для Renohacks.com. Давай практические советы по DIY ремонту, покраске, ремонту ванной и кухни. Отвечай кратко и по делу."

        const messagesWithSystem = [
            { role: "system", content: systemPrompt },
            ...validatedMessages,
        ]

        let data: ChatCompletionResponse | null = null
        let lastError: string | null = null

        for (const model of FREE_MODELS) {
            const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "HTTP-Referer": "https://renohacks.com",
                    "X-Title": "Renohacks Repair Assistant",
                },
                body: JSON.stringify({ model, messages: messagesWithSystem }),
            })

            data = (await res.json()) as ChatCompletionResponse
            console.log(`Model tried: ${model}`, data)

            if (res.ok && data.choices && data.choices[0]) {
                return NextResponse.json(
                    { reply: data.choices[0].message.content },
                    {
                        headers: {
                            "X-RateLimit-Limit": "20",
                            "X-RateLimit-Remaining": rateLimit.remaining.toString(),
                            "X-RateLimit-Reset": new Date(rateLimit.resetTime).toISOString(),
                        },
                    }
                )
            }

            lastError = data?.error?.message || "неизвестная ошибка"
        }

        return NextResponse.json(
            { reply: validLocale === "en" 
                ? `❌ All free models are busy. Error: ${lastError}` 
                : `❌ Все бесплатные модели перегружены. Ошибка: ${lastError}` 
            },
            { status: 429 }
        )
    } catch (err) {
        console.error("API route crashed:", err)
        return NextResponse.json(
            { reply: "❌ Внутренняя ошибка сервера" },
            { status: 500 }
        )
    }
}
