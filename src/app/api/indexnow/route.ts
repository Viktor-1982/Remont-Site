import { NextRequest, NextResponse } from "next/server"
import { submitToIndexNow, submitSingleUrlViaGet } from "@/lib/indexnow"

/**
 * API endpoint для отправки URL в IndexNow
 * POST /api/indexnow - для множества URL (до 10,000)
 * Body: { urls: string[] }
 * 
 * Также поддерживает GET запрос для одного URL:
 * GET /api/indexnow?url=<encoded-url>
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
 * GET endpoint для:
 * 1. Отправки одного URL: GET /api/indexnow?url=<encoded-url>
 * 2. Проверки статуса: GET /api/indexnow (без параметров)
 */
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const url = searchParams.get("url")

    // Если передан параметр url, отправляем его в IndexNow
    if (url) {
        try {
            const decodedUrl = decodeURIComponent(url)
            const result = await submitSingleUrlViaGet(decodedUrl)

            if (result.success) {
                return NextResponse.json({
                    success: true,
                    message: "Successfully submitted URL to IndexNow",
                    url: decodedUrl,
                    statusCode: result.statusCode,
                })
            } else {
                return NextResponse.json(
                    {
                        success: false,
                        error: result.error || "Failed to submit URL",
                        statusCode: result.statusCode,
                    },
                    { status: result.statusCode && result.statusCode >= 400 ? result.statusCode : 500 }
                )
            }
        } catch (error) {
            console.error("IndexNow GET API error:", error)
            return NextResponse.json(
                {
                    success: false,
                    error: error instanceof Error ? error.message : "Unknown error",
                },
                { status: 500 }
            )
        }
    }

    // Если параметр url не передан, возвращаем информацию о сервисе
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
        usage: {
            singleUrl: "GET /api/indexnow?url=<encoded-url>",
            multipleUrls: "POST /api/indexnow with body: { urls: string[] }",
        },
    })
}

