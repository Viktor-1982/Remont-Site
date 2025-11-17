import { NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"
import { checkAdminAuth } from "@/lib/admin-auth"
import { checkRateLimit } from "@/lib/rate-limit"

// GET - получить конкретную статью
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        // ✅ Проверка аутентификации через HTTP-only cookie
        if (!(await checkAdminAuth())) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // ✅ Rate limiting: 100 запросов в минуту
        const rateLimit = checkRateLimit(req, {
            maxRequests: 100,
            windowMs: 60 * 1000, // 1 минута
            message: "Too many requests. Please slow down.",
        })

        if (!rateLimit.success) {
            return NextResponse.json(
                { error: rateLimit.message },
                {
                    status: 429,
                    headers: {
                        "Retry-After": Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
                        "X-RateLimit-Limit": "100",
                        "X-RateLimit-Remaining": rateLimit.remaining.toString(),
                        "X-RateLimit-Reset": new Date(rateLimit.resetTime).toISOString(),
                    },
                }
            )
        }

        const { slug: rawSlug } = await params
        const searchParams = req.nextUrl.searchParams
        const locale = searchParams.get("locale") || "ru"

        // ✅ Защита от path traversal - санитизация slug
        const slug = rawSlug.replace(/[^a-zA-Z0-9-]/g, "")
        if (slug !== rawSlug || !slug) {
            return NextResponse.json(
                { error: "Invalid article identifier" },
                { status: 400 }
            )
        }
        
        // ✅ Валидация locale
        if (locale !== "ru" && locale !== "en") {
            return NextResponse.json(
                { error: "Invalid locale" },
                { status: 400 }
            )
        }

        // Определяем путь файла
        const fileName = `${slug}.mdx`
        const postsDir = join(process.cwd(), "content", "posts")
        const filePath = locale === "en" 
            ? join(postsDir, "en", fileName)
            : join(postsDir, fileName)

        if (!existsSync(filePath)) {
            return NextResponse.json(
                { error: "Article not found" },
                { status: 404 }
            )
        }

        const content = await readFile(filePath, "utf-8")

        // Парсим frontmatter (поддержка LF и CRLF)
        const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
        const bodyContent = frontmatterMatch 
            ? content.slice(frontmatterMatch[0].length).trim()
            : content

        if (!frontmatterMatch) {
            return NextResponse.json(
                { error: "Invalid article format" },
                { status: 400 }
            )
        }

        const frontmatter = frontmatterMatch[1]
        
        // Парсим поля
        const titleMatch = frontmatter.match(/title:\s*["'](.*)["']/)
        const descriptionMatch = frontmatter.match(/description:\s*["'](.*)["']/)
        const dateMatch = frontmatter.match(/date:\s*(.+)/)
        const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/)
        const coverMatch = frontmatter.match(/cover:\s*["'](.*)["']/)
        const authorMatch = frontmatter.match(/author:\s*["'](.*)["']/)
        const translationOfMatch = frontmatter.match(/translationOf:\s*["'](.*)["']/)
        const draftMatch = frontmatter.match(/draft:\s*(true|false)/)
        const keywordsMatch = frontmatter.match(/keywords:\n((?:\s+-\s+["'].*["']\n?)+)/)

        const tags = tagsMatch 
            ? tagsMatch[1].split(",").map(t => t.trim().replace(/["']/g, ""))
            : []

        const keywords = keywordsMatch
            ? keywordsMatch[1]
                .split("\n")
                .map((k: string) => k.trim().match(/- ["'](.*)["']/)?.[1])
                .filter(Boolean)
            : []

        return NextResponse.json({
            slug,
            locale,
            title: titleMatch?.[1] || "",
            description: descriptionMatch?.[1] || "",
            date: dateMatch?.[1]?.trim() || "",
            tags,
            cover: coverMatch?.[1] || "",
            author: authorMatch?.[1] || "Renohacks",
            translationOf: translationOfMatch?.[1] || null,
            draft: draftMatch?.[1] === "true",
            keywords,
            content: bodyContent,
        })
    } catch (error) {
        // ✅ Не выводим детали ошибки в ответ (защита от утечки информации)
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        console.error("Error fetching article:", errorMessage)
        
        // ✅ Защита от path traversal - проверяем, что slug не содержит опасных символов
        const { slug: rawSlug } = await params
        const sanitizedSlug = rawSlug.replace(/[^a-zA-Z0-9-]/g, "")
        if (sanitizedSlug !== rawSlug) {
            return NextResponse.json(
                { error: "Invalid article identifier" },
                { status: 400 }
            )
        }
        
        return NextResponse.json(
            { error: "Failed to fetch article" },
            { status: 500 }
        )
    }
}


