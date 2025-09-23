import { NextRequest, NextResponse } from "next/server"

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
        const { messages } = await req.json()

        let data: ChatCompletionResponse | null = null
        let lastError: string | null = null

        for (const model of FREE_MODELS) {
            const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "HTTP-Referer": "https://renohacks.com",
                    "X-Title": "PRO-remont",
                },
                body: JSON.stringify({ model, messages }),
            })

            data = (await res.json()) as ChatCompletionResponse
            console.log(`Model tried: ${model}`, data)

            if (res.ok && data.choices && data.choices[0]) {
                return NextResponse.json({ reply: data.choices[0].message.content })
            }

            lastError = data?.error?.message || "неизвестная ошибка"
        }

        return NextResponse.json(
            { reply: `❌ Все бесплатные модели перегружены. Ошибка: ${lastError}` },
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
