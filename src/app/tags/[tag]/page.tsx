import { allPosts } from ".contentlayer/generated"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import { ArticleGrid } from "@/components/article-grid"

// 🔹 Тип параметров маршрута
type Params = {
    params: Promise<{ tag: string }>
}

export const revalidate = 86400
export const dynamic = "force-static"
export const dynamicParams = false

// 🔹 Генерация метаданных
export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { tag } = await params
    const decodedTag = decodeURIComponent(tag)

    const title = `#${decodedTag} — статьи по тегу ${decodedTag} | Renohacks`
    const description = `Все статьи с тегом «${decodedTag}» на Renohacks.com: практические идеи для ремонта, дизайна интерьера и DIY-проектов. Пошаговые инструкции, фото-гайды, советы экспертов и обзоры материалов.`

    return getPageMetadata(`/tags/${decodedTag}`, {
        title,
        description,
        cover: "/images/og-default.png",
        type: "website",
        openGraph: {
            locale: "ru_RU",
        },
    })
}

// 🔹 Проверка, свежая ли статья
function isRecent(date?: string) {
    if (!date) return false
    const published = new Date(date)
    const diffDays = (Date.now() - published.getTime()) / (1000 * 60 * 60 * 24)
    return diffDays < 10 // младше 10 дней
}

// 🔹 Основной компонент страницы
export default async function TagPage({ params }: Params) {
    const { tag } = await params
    const decodedTag = decodeURIComponent(tag).toLowerCase()

    let filtered: typeof allPosts

    // 🔸 Специальная логика для страницы "новинки"
    if (decodedTag === "novinki") {
        // Исключаем теги, которые не должны попадать в новинки
        const excludedTags = ["тренды", "trends", "2025", "2026"]
        
        // Показываем последние 4 добавленные статьи о ремонте
        filtered = allPosts
            .filter(
                (post) => {
                    // Только русские посты
                    if (post.url.startsWith("/en/")) return false
                    // Только опубликованные
                    if (post.draft) return false
                    // Только свежие (младше 10 дней)
                    if (!isRecent(post.date)) return false
                    
                    // Исключаем посты с тегами "тренды" и подобными
                    const postTags = post.tags?.map((t) => t.toLowerCase()) || []
                    const hasExcludedTag = excludedTags.some(tag => 
                        postTags.includes(tag.toLowerCase())
                    )
                    
                    return !hasExcludedTag
                }
            )
            // Сортируем по дате (новые первыми)
            .sort((a, b) => {
                const ta = a.date ? new Date(a.date).getTime() : 0
                const tb = b.date ? new Date(b.date).getTime() : 0
                return tb - ta
            })
            // Берем только последние 4 статьи
            .slice(0, 4)
    } else {
        // 🔸 Обычная логика для других тегов
        filtered = allPosts.filter(
            (post) =>
                !post.url.startsWith("/en/") &&
                post.tags?.map((t) => t.toLowerCase()).includes(decodedTag)
        )
    }

    if (filtered.length === 0) return notFound()

    // 🔹 Сортируем по дате — свежие первыми
    filtered = filtered.sort((a, b) => {
        const ta = a.date ? new Date(a.date).getTime() : 0
        const tb = b.date ? new Date(b.date).getTime() : 0
        return tb - ta
    })

    return (
        <section className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16 max-w-7xl">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">#{decodedTag}</h1>
            <p className="text-muted-foreground mb-8 text-sm sm:text-base">
                Все статьи с тегом <strong>«{decodedTag}»</strong>
            </p>
            <ArticleGrid posts={filtered} isEnglish={false} />
        </section>
    )
}

// 🔹 Генерация статических путей
export async function generateStaticParams() {
    const tags = Array.from(
        new Set(
            allPosts
                .filter((p) => !p.url.startsWith("/en/"))
                .flatMap((p) => p.tags || [])
        )
    )
    // добавляем "novinki" на всякий случай даже если ни одна статья его не имеет
    if (!tags.includes("novinki")) tags.push("novinki")

    return tags.map((tag) => ({ tag }))
}
