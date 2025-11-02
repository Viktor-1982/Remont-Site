import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

// Проверка аутентификации
function checkAuth(req: NextRequest): boolean {
    const authHeader = req.headers.get("authorization")
    const token = process.env.ADMIN_TOKEN || "your-secret-token"
    return authHeader === `Bearer ${token}`
}

/**
 * Этот API использует GitHub API для автоматического коммита файлов
 * Работает через GitHub API, поэтому нужен GITHUB_TOKEN
 */
export async function POST(req: NextRequest) {
    try {
        if (!checkAuth(req)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
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
        const originalName = file.name
        const extension = originalName.split(".").pop()
        const fileName = `${articleSlug}-${timestamp}.${extension}`

        // Конвертируем File в base64 для GitHub API
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64Content = buffer.toString("base64")

        // Путь в репозитории
        const repoPath = `public/images/${articleSlug}/${fileName}`
        const imagePath = `/images/${articleSlug}/${fileName}`

        try {
            // Определяем ветку (может быть main или master)
            const defaultBranch = process.env.GITHUB_BRANCH || "main"
            let baseSha: string
            let treeSha: string
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
            treeSha = commitData.tree.sha

            // Проверяем, существует ли папка
            let treeItems: any[] = []
            try {
                const treeResponse = await fetch(
                    `https://api.github.com/repos/${githubRepo}/git/trees/${treeSha}?recursive=1`,
                    {
                        headers: {
                            Authorization: `Bearer ${githubToken}`,
                            Accept: "application/vnd.github.v3+json",
                        },
                    }
                )
                if (treeResponse.ok) {
                    const treeData = await treeResponse.json()
                    treeItems = treeData.tree || []
                }
            } catch (e) {
                // Игнорируем ошибку
            }

            // Создаём новое дерево с нашим файлом
            const newTreeItems = treeItems
                .filter((item: any) => item.type === "blob" && item.path !== repoPath)
                .map((item: any) => ({
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
        } catch (githubError: any) {
            console.error("GitHub API error:", githubError)
            return NextResponse.json(
                {
                    error: "Failed to commit to GitHub",
                    details: githubError.message,
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

