import { NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

// Проверка аутентификации
function checkAuth(req: NextRequest): boolean {
    const authHeader = req.headers.get("authorization")
    const token = process.env.ADMIN_TOKEN || "your-secret-token"
    return authHeader === `Bearer ${token}`
}

// GET - получить конкретную статью
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        if (!checkAuth(req)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { slug } = await params
        const searchParams = req.nextUrl.searchParams
        const locale = searchParams.get("locale") || "ru"

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

        // Парсим frontmatter
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
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
        console.error("Error fetching article:", error)
        return NextResponse.json(
            { error: "Failed to fetch article" },
            { status: 500 }
        )
    }
}

