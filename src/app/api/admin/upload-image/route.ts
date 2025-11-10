import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

// Проверка аутентификации (простая через env переменную)
function checkAuth(req: NextRequest): boolean {
    const authHeader = req.headers.get("authorization")
    const token = process.env.ADMIN_TOKEN || "your-secret-token"
    return authHeader === `Bearer ${token}`
}

export async function POST(req: NextRequest) {
    try {
        // Проверка аутентификации
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

        // Генерируем уникальное имя файла
        const timestamp = Date.now()
        const originalName = file.name
        const extension = originalName.split(".").pop()
        const fileName = `${articleSlug}-${timestamp}.${extension}`

        // Путь для сохранения: public/images/[articleSlug]/
        const imageDir = join(process.cwd(), "public", "images", articleSlug)
        
        // Создаём папку если её нет
        if (!existsSync(imageDir)) {
            await mkdir(imageDir, { recursive: true })
        }

        // Конвертируем File в Buffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Сохраняем файл
        const filePath = join(imageDir, fileName)
        await writeFile(filePath, buffer)

        // Возвращаем путь для использования в MDX
        const imagePath = `/images/${articleSlug}/${fileName}`

        return NextResponse.json({
            success: true,
            path: imagePath,
            fileName: fileName,
        })
    } catch (error) {
        console.error("Error uploading image:", error)
        return NextResponse.json(
            { error: "Failed to upload image" },
            { status: 500 }
        )
    }
}




