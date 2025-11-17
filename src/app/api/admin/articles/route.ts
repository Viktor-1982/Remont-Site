import { NextRequest, NextResponse } from "next/server"
import { readFile, writeFile, readdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"
import slugify from "slugify"
import { checkAdminAuth } from "@/lib/admin-auth"
import { checkRateLimit } from "@/lib/rate-limit"

// GET - получить список всех статей
export async function GET(req: NextRequest) {
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
                        // Поддержка LF и CRLF
                        const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
                        
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
        // ✅ Не выводим детали ошибки в ответ (защита от утечки информации)
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        console.error("Error fetching articles:", errorMessage)
        return NextResponse.json(
            { error: "Failed to fetch articles" },
            { status: 500 }
        )
    }
}

// POST - создать новую статью
export async function POST(req: NextRequest) {
    try {
        // ✅ Проверка аутентификации через HTTP-only cookie
        if (!(await checkAdminAuth())) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // ✅ Rate limiting: 10 запросов в минуту (создание статей)
        const rateLimit = checkRateLimit(req, {
            maxRequests: 10,
            windowMs: 60 * 1000, // 1 минута
            message: "Too many article creation requests. Please slow down.",
        })

        if (!rateLimit.success) {
            return NextResponse.json(
                { error: rateLimit.message },
                {
                    status: 429,
                    headers: {
                        "Retry-After": Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
                        "X-RateLimit-Limit": "10",
                        "X-RateLimit-Remaining": rateLimit.remaining.toString(),
                        "X-RateLimit-Reset": new Date(rateLimit.resetTime).toISOString(),
                    },
                }
            )
        }

        const body = await req.json()
        const {
            title,
            description,
            date,
            tags = [],
            cover,
            author = "Умница",
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
        
        // ✅ Валидация slug перед использованием
        const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-]/g, "")
        if (sanitizedSlug !== slug || !slug) {
            return NextResponse.json(
                { error: "Invalid slug format. Use only letters, numbers, and hyphens" },
                { status: 400 }
            )
        }

        // Определяем путь файла
        const fileName = `${sanitizedSlug}.mdx`
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

        // ✅ Санитизация данных для предотвращения инъекций
        const sanitizeString = (str: string) => {
            return str
                .replace(/"/g, '\\"')
                .replace(/\n/g, " ")
                .replace(/\r/g, "")
        }

        // Формируем frontmatter
        const frontmatter = `---
title: "${sanitizeString(title)}"
description: "${sanitizeString(description)}"
date: ${date || new Date().toISOString().split("T")[0]}
tags: [${tags.map((t: string) => `"${sanitizeString(t)}"`).join(", ")}]
cover: "${(cover || "").replace(/[^a-zA-Z0-9/._-]/g, "")}"
author: "${sanitizeString(author)}"
${translationOf ? `translationOf: "${sanitizeString(translationOf)}"` : ""}
draft: ${draft}
keywords:
${keywords.map((k: string) => `  - "${sanitizeString(k)}"`).join("\n")}
---

${content}
`

        // Сохраняем файл
        await writeFile(filePath, frontmatter, "utf-8")

        return NextResponse.json({
            success: true,
            slug: sanitizedSlug,
            path: filePath,
        })
    } catch (error) {
        // ✅ Не выводим детали ошибки в ответ (защита от утечки информации)
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        console.error("Error creating article:", errorMessage)
        return NextResponse.json(
            { error: "Failed to create article" },
            { status: 500 }
        )
    }
}

// PUT - обновить существующую статью
export async function PUT(req: NextRequest) {
    try {
        // ✅ Проверка аутентификации через HTTP-only cookie
        if (!(await checkAdminAuth())) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // ✅ Rate limiting: 20 запросов в минуту (обновление статей)
        const rateLimit = checkRateLimit(req, {
            maxRequests: 20,
            windowMs: 60 * 1000, // 1 минута
            message: "Too many article update requests. Please slow down.",
        })

        if (!rateLimit.success) {
            return NextResponse.json(
                { error: rateLimit.message },
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
        const {
            slug,
            locale = "ru",
            title,
            description,
            date,
            tags = [],
            cover,
            author = "Умница",
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

        // ✅ Санитизация данных для предотвращения инъекций
        const sanitizeString = (str: string) => {
            return (str || "")
                .replace(/"/g, '\\"')
                .replace(/\n/g, " ")
                .replace(/\r/g, "")
        }
        
        // ✅ Валидация slug (только буквы, цифры, дефисы)
        const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-]/g, "")
        if (sanitizedSlug !== slug || !slug) {
            return NextResponse.json(
                { error: "Invalid slug format. Use only letters, numbers, and hyphens" },
                { status: 400 }
            )
        }

        // Формируем frontmatter
        const frontmatter = `---
title: "${sanitizeString(title || "")}"
description: "${sanitizeString(description || "")}"
date: ${date || new Date().toISOString().split("T")[0]}
tags: [${tags.map((t: string) => `"${sanitizeString(t)}"`).join(", ")}]
cover: "${(cover || "").replace(/[^a-zA-Z0-9/._-]/g, "")}"
author: "${sanitizeString(author || "")}"
${translationOf ? `translationOf: "${sanitizeString(translationOf)}"` : ""}
draft: ${draft}
keywords:
${keywords.map((k: string) => `  - "${sanitizeString(k)}"`).join("\n")}
---

${content || ""}
`

        // Сохраняем файл
        await writeFile(filePath, frontmatter, "utf-8")

        return NextResponse.json({
            success: true,
            slug: sanitizedSlug,
        })
    } catch (error) {
        // ✅ Не выводим детали ошибки в ответ (защита от утечки информации)
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        console.error("Error updating article:", errorMessage)
        return NextResponse.json(
            { error: "Failed to update article" },
            { status: 500 }
        )
    }
}


