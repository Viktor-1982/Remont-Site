import { NextRequest, NextResponse } from "next/server"
import { checkAdminAuth } from "@/lib/admin-auth"
import { checkRateLimit } from "@/lib/rate-limit"

interface GitTreeItem {
    path: string
    mode: string
    type: "blob" | "tree"
    sha?: string
}

/**
 * Этот API использует GitHub API для автоматического коммита файлов
 * Работает через GitHub API, поэтому нужен GITHUB_TOKEN
 */
export async function POST(req: NextRequest) {
    try {
        // ✅ Проверка аутентификации через HTTP-only cookie
        if (!(await checkAdminAuth())) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // ✅ Rate limiting: 10 коммитов в минуту (GitHub API имеет свои лимиты)
        const rateLimit = checkRateLimit(req, {
            maxRequests: 10,
            windowMs: 60 * 1000, // 1 минута
            message: "Too many Git commits. Please slow down.",
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

        const formData = await req.formData()
        const file = formData.get("file") as File
        const articleSlug = formData.get("articleSlug") as string

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 })
        }

        if (!articleSlug) {
            return NextResponse.json({ error: "Article slug is required" }, { status: 400 })
        }

        // ✅ Валидация размера файла (максимум 10 МБ)
        const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 МБ
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: "File size exceeds maximum allowed size (10MB)" },
                { status: 400 }
            )
        }

        // ✅ Валидация типа файла (только изображения)
        const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
        const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"]
        
        const originalName = file.name
        const extension = originalName.split(".").pop()?.toLowerCase()
        
        if (!extension || !allowedExtensions.includes(extension)) {
            return NextResponse.json(
                { error: "Invalid file type. Only images (jpg, jpeg, png, gif, webp) are allowed" },
                { status: 400 }
            )
        }

        // ✅ Дополнительная проверка MIME типа
        if (!allowedMimeTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Invalid file MIME type" },
                { status: 400 }
            )
        }

        // ✅ Санитизация имени файла и articleSlug (защита от path traversal)
        const sanitizedSlug = articleSlug.replace(/[^a-zA-Z0-9-]/g, "")
        if (!sanitizedSlug || sanitizedSlug !== articleSlug) {
            return NextResponse.json(
                { error: "Invalid article slug format. Use only letters, numbers, and hyphens" },
                { status: 400 }
            )
        }

        // Проверяем наличие GitHub токена
        const githubToken = process.env.GITHUB_TOKEN
        const githubRepo = process.env.GITHUB_REPO // формат: owner/repo

        if (!githubToken || !githubRepo) {
            return NextResponse.json({
                error: "GitHub token and repository not configured. Use manual upload instead.",
                hint: "Set GITHUB_TOKEN and GITHUB_REPO in environment variables",
            }, { status: 500 })
        }

        // Генерируем уникальное имя файла
        const timestamp = Date.now()
        const fileName = `${sanitizedSlug}-${timestamp}.${extension}`

        // Конвертируем File в base64 для GitHub API
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64Content = buffer.toString("base64")

        // Путь в репозитории (используем sanitizedSlug для безопасности)
        const repoPath = `public/images/${sanitizedSlug}/${fileName}`
        const imagePath = `/images/${sanitizedSlug}/${fileName}`

        try {
            // Определяем ветку (может быть main или master)
            const defaultBranch = process.env.GITHUB_BRANCH || "main"
            let baseSha: string
            let usedBranch: string
            
            // Получаем текущий SHA основной ветки
            const branchResponse = await fetch(
                `https://api.github.com/repos/${githubRepo}/branches/${defaultBranch}`,
                {
                    headers: {
                        Authorization: `Bearer ${githubToken}`,
                        Accept: "application/vnd.github.v3+json",
                    },
                }
            )

            if (!branchResponse.ok) {
                // Пробуем master если main не сработал
                const masterResponse = await fetch(
                    `https://api.github.com/repos/${githubRepo}/branches/master`,
                    {
                        headers: {
                            Authorization: `Bearer ${githubToken}`,
                            Accept: "application/vnd.github.v3+json",
                        },
                    }
                )
                
                if (!masterResponse.ok) {
                    const errorText = await branchResponse.text()
                    throw new Error(`Failed to get branch info: ${errorText}`)
                }
                
                const masterData = await masterResponse.json()
                baseSha = masterData.commit.sha
                usedBranch = "master"
            } else {
                const branchData = await branchResponse.json()
                baseSha = branchData.commit.sha
                usedBranch = defaultBranch
            }

            // Получаем SHA дерева
            const commitResponse = await fetch(
                `https://api.github.com/repos/${githubRepo}/git/commits/${baseSha}`,
                {
                    headers: {
                        Authorization: `Bearer ${githubToken}`,
                        Accept: "application/vnd.github.v3+json",
                    },
                }
            )
            
            if (!commitResponse.ok) {
                throw new Error("Failed to get commit info")
            }
            
            const commitData = await commitResponse.json()
            const treeSha: string = commitData.tree.sha

            // Получаем существующие элементы дерева (если доступны)
            const treeResponse = await fetch(
                `https://api.github.com/repos/${githubRepo}/git/trees/${treeSha}?recursive=1`,
                {
                    headers: {
                        Authorization: `Bearer ${githubToken}`,
                        Accept: "application/vnd.github.v3+json",
                    },
                }
            )

            let existingTreeItems: GitTreeItem[] = []
            if (treeResponse.ok) {
                const treeData = (await treeResponse.json()) as { tree?: GitTreeItem[] }
                existingTreeItems = (treeData.tree ?? []).filter(
                    (item) => item.type === "blob" && item.path !== repoPath
                )
            }

            // Создаём новое дерево с нашим файлом
            const newTreeItems: GitTreeItem[] = existingTreeItems.map((item) => ({
                path: item.path,
                mode: item.mode,
                type: item.type,
                sha: item.sha,
            }))

            // Добавляем новый файл
            const blobResponse = await fetch(
                `https://api.github.com/repos/${githubRepo}/git/blobs`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${githubToken}`,
                        Accept: "application/vnd.github.v3+json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        content: base64Content,
                        encoding: "base64",
                    }),
                }
            )

            if (!blobResponse.ok) {
                throw new Error("Failed to create blob")
            }

            const blobData = await blobResponse.json()

            newTreeItems.push({
                path: repoPath,
                mode: "100644",
                type: "blob",
                sha: blobData.sha,
            })

            // Создаём новое дерево
            const createTreeResponse = await fetch(
                `https://api.github.com/repos/${githubRepo}/git/trees`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${githubToken}`,
                        Accept: "application/vnd.github.v3+json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        base_tree: treeSha,
                        tree: newTreeItems,
                    }),
                }
            )

            if (!createTreeResponse.ok) {
                const errorText = await createTreeResponse.text()
                throw new Error(`Failed to create tree: ${errorText}`)
            }

            const newTreeData = await createTreeResponse.json()

            // Создаём коммит
            const newCommitResponse = await fetch(
                `https://api.github.com/repos/${githubRepo}/git/commits`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${githubToken}`,
                        Accept: "application/vnd.github.v3+json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message: `Add image: ${fileName}`,
                        tree: newTreeData.sha,
                        parents: [baseSha],
                    }),
                }
            )

            if (!newCommitResponse.ok) {
                const errorText = await newCommitResponse.text()
                throw new Error(`Failed to create commit: ${errorText}`)
            }

            const newCommitData = await newCommitResponse.json()

            // Обновляем ветку
            const updateBranchResponse = await fetch(
                `https://api.github.com/repos/${githubRepo}/git/refs/heads/${usedBranch}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${githubToken}`,
                        Accept: "application/vnd.github.v3+json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        sha: newCommitData.sha,
                    }),
                }
            )

            if (!updateBranchResponse.ok) {
                const errorText = await updateBranchResponse.text()
                throw new Error(`Failed to update branch: ${errorText}`)
            }

            return NextResponse.json({
                success: true,
                path: imagePath,
                fileName: fileName,
                message: "Image uploaded and committed to Git automatically!",
            })
        } catch (githubError: unknown) {
            const message =
                githubError instanceof Error ? githubError.message : "Unknown GitHub error"
            console.error("GitHub API error:", githubError)
            return NextResponse.json(
                {
                    error: "Failed to commit to GitHub",
                    details: message,
                    hint: "Image is saved temporarily, but will be lost on next deploy without Git commit",
                },
                { status: 500 }
            )
        }
    } catch (error) {
        console.error("Error uploading image:", error)
        return NextResponse.json(
            { error: "Failed to upload image" },
            { status: 500 }
        )
    }
}

