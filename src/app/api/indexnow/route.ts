import { NextRequest, NextResponse } from "next/server"
import { submitToIndexNow } from "@/lib/indexnow"

/**
 * API endpoint для отправки URL в IndexNow
 * POST /api/indexnow
 * Body: { urls: string[] }
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { urls } = body

        if (!urls || !Array.isArray(urls)) {
            return NextResponse.json(
                { error: "urls must be an array of URLs" },
                { status: 400 }
            )
        }

        if (urls.length === 0) {
            return NextResponse.json(
                { error: "At least one URL is required" },
                { status: 400 }
            )
        }

        // Ограничение на количество URL за один запрос (IndexNow рекомендует до 10,000)
        if (urls.length > 10000) {
            return NextResponse.json(
                { error: "Maximum 10,000 URLs per request" },
                { status: 400 }
            )
        }

        const result = await submitToIndexNow(urls)

        if (result.success) {
            return NextResponse.json({
                success: true,
                message: `Successfully submitted ${urls.length} URL(s) to IndexNow`,
                urls: urls.length,
            })
        } else {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error || "Failed to submit URLs",
                },
                { status: 500 }
            )
        }
    } catch (error) {
        console.error("IndexNow API error:", error)
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        )
    }
}

/**
 * GET endpoint для проверки статуса IndexNow
 */
export async function GET() {
    return NextResponse.json({
        service: "IndexNow",
        key: "506b8013c6ddcce134765ffa1fc1b102",
        keyLocation: "https://renohacks.com/506b8013c6ddcce134765ffa1fc1b102.txt",
        endpoints: [
            "https://api.indexnow.org/indexnow",
            "https://www.bing.com/indexnow",
            "https://yandex.com/indexnow",
        ],
        status: "active",
    })
}

