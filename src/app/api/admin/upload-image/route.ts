import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"
import { checkAdminAuth } from "@/lib/admin-auth"
import { checkRateLimit } from "@/lib/rate-limit"

export async function POST(req: NextRequest) {
    try {
        // ✅ Проверка аутентификации через HTTP-only cookie
        if (!(await checkAdminAuth())) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // ✅ Rate limiting: 30 загрузок в минуту (защита от злоупотребления)
        const rateLimit = checkRateLimit(req, {
            maxRequests: 30,
            windowMs: 60 * 1000, // 1 минута
            message: "Too many image uploads. Please slow down.",
        })

        if (!rateLimit.success) {
            return NextResponse.json(
                { error: rateLimit.message },
                {
                    status: 429,
                    headers: {
                        "Retry-After": Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
                        "X-RateLimit-Limit": "30",
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

        // ✅ Санитизация имени файла (защита от path traversal)
        const sanitizedSlug = articleSlug.replace(/[^a-zA-Z0-9-]/g, "")
        if (!sanitizedSlug || sanitizedSlug !== articleSlug) {
            return NextResponse.json(
                { error: "Invalid article slug format" },
                { status: 400 }
            )
        }

        // Генерируем уникальное имя файла
        const timestamp = Date.now()
        const fileName = `${sanitizedSlug}-${timestamp}.${extension}`

        // Путь для сохранения: public/images/[articleSlug]/
        // ✅ Защита от path traversal - используем sanitizedSlug
        const imageDir = join(process.cwd(), "public", "images", sanitizedSlug)
        
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
        const imagePath = `/images/${sanitizedSlug}/${fileName}`

        return NextResponse.json({
            success: true,
            path: imagePath,
            fileName: fileName,
        })
    } catch (error) {
        // ✅ Не выводим детали ошибки в ответ (защита от утечки информации)
        // Логируем только на сервере
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        console.error("Error uploading image:", errorMessage)
        
        return NextResponse.json(
            { error: "Failed to upload image. Please try again." },
            { status: 500 }
        )
    }
}




