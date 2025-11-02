import { NextRequest, NextResponse } from "next/server"
import { readFile, writeFile, readdir, stat } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"
import slugify from "slugify"

// Проверка аутентификации
function checkAuth(req: NextRequest): boolean {
    const authHeader = req.headers.get("authorization")
    const token = process.env.ADMIN_TOKEN || "your-secret-token"
    return authHeader === `Bearer ${token}`
}

// GET - получить список всех статей
export async function GET(req: NextRequest) {
    try {
        if (!checkAuth(req)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const postsDir = join(process.cwd(), "content", "posts")
        const articles: Array<{ slug: string; title: string; date: string; locale: string }> = []

        async function scanDirectory(dir: string, locale: string = "ru") {
            const files = await readdir(dir, { withFileTypes: true })

            for (const file of files) {
                const filePath = join(dir, file.name)

                if (file.isDirectory()) {
                    // Если папка "en", меняем локаль
                    await scanDirectory(filePath, file.name === "en" ? "en" : locale)
                } else if (file.name.endsWith(".mdx")) {
                    try {
                        const content = await readFile(filePath, "utf-8")
                        const frontmatter = content.match(/^---\n([\s\S]*?)\n---/)
                        
                        if (frontmatter) {
                            const titleMatch = frontmatter[1].match(/title:\s*["'](.*)["']/)
                            const dateMatch = frontmatter[1].match(/date:\s*(.+)/)
                            
                            const title = titleMatch ? titleMatch[1] : file.name
                            const date = dateMatch ? dateMatch[1].trim() : ""

                            // Определяем slug из имени файла
                            const slug = file.name.replace(".mdx", "")

                            articles.push({
                                slug,
                                title,
                                date,
                                locale,
                            })
                        }
                    } catch (err) {
                        console.error(`Error reading ${filePath}:`, err)
                    }
                }
            }
        }

        await scanDirectory(postsDir)

        return NextResponse.json({ articles: articles.sort((a, b) => 
            new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
        ) })
    } catch (error) {
        console.error("Error fetching articles:", error)
        return NextResponse.json(
            { error: "Failed to fetch articles" },
            { status: 500 }
        )
    }
}

// POST - создать новую статью
export async function POST(req: NextRequest) {
    try {
        if (!checkAuth(req)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const {
            title,
            description,
            date,
            tags = [],
            cover,
            author = "Renohacks",
            translationOf,
            draft = false,
            keywords = [],
            content,
            locale = "ru",
            slug: customSlug,
        } = body

        if (!title || !description || !content) {
            return NextResponse.json(
                { error: "Title, description, and content are required" },
                { status: 400 }
            )
        }

        // Генерируем slug из title, если не указан
        const slug = customSlug || slugify(title, { lower: true, strict: true, locale: "ru" })

        // Определяем путь файла
        const fileName = `${slug}.mdx`
        const postsDir = join(process.cwd(), "content", "posts")
        const filePath = locale === "en" 
            ? join(postsDir, "en", fileName)
            : join(postsDir, fileName)

        // Проверяем, существует ли файл
        if (existsSync(filePath)) {
            return NextResponse.json(
                { error: "Article with this slug already exists" },
                { status: 400 }
            )
        }

        // Формируем frontmatter
        const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
date: ${date || new Date().toISOString().split("T")[0]}
tags: [${tags.map((t: string) => `"${t}"`).join(", ")}]
cover: "${cover || ""}"
author: "${author}"
${translationOf ? `translationOf: "${translationOf}"` : ""}
draft: ${draft}
keywords:
${keywords.map((k: string) => `  - "${k}"`).join("\n")}
---

${content}
`

        // Сохраняем файл
        await writeFile(filePath, frontmatter, "utf-8")

        return NextResponse.json({
            success: true,
            slug,
            path: filePath,
        })
    } catch (error) {
        console.error("Error creating article:", error)
        return NextResponse.json(
            { error: "Failed to create article" },
            { status: 500 }
        )
    }
}

// PUT - обновить существующую статью
export async function PUT(req: NextRequest) {
    try {
        if (!checkAuth(req)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const {
            slug,
            locale = "ru",
            title,
            description,
            date,
            tags = [],
            cover,
            author = "Renohacks",
            translationOf,
            draft = false,
            keywords = [],
            content,
        } = body

        if (!slug) {
            return NextResponse.json(
                { error: "Slug is required" },
                { status: 400 }
            )
        }

        // Определяем путь файла
        const fileName = `${slug}.mdx`
        const postsDir = join(process.cwd(), "content", "posts")
        const filePath = locale === "en" 
            ? join(postsDir, "en", fileName)
            : join(postsDir, fileName)

        // Проверяем, существует ли файл
        if (!existsSync(filePath)) {
            return NextResponse.json(
                { error: "Article not found" },
                { status: 404 }
            )
        }

        // Формируем frontmatter
        const frontmatter = `---
title: "${(title || "").replace(/"/g, '\\"')}"
description: "${(description || "").replace(/"/g, '\\"')}"
date: ${date || new Date().toISOString().split("T")[0]}
tags: [${tags.map((t: string) => `"${t}"`).join(", ")}]
cover: "${cover || ""}"
author: "${author}"
${translationOf ? `translationOf: "${translationOf}"` : ""}
draft: ${draft}
keywords:
${keywords.map((k: string) => `  - "${k}"`).join("\n")}
---

${content || ""}
`

        // Сохраняем файл
        await writeFile(filePath, frontmatter, "utf-8")

        return NextResponse.json({
            success: true,
            slug,
        })
    } catch (error) {
        console.error("Error updating article:", error)
        return NextResponse.json(
            { error: "Failed to update article" },
            { status: 500 }
        )
    }
}

