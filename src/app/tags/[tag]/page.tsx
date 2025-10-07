import { allPosts } from ".contentlayer/generated"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArticleGrid } from "@/components/article-grid"

// 🔹 Тип параметров маршрута
type Params = {
    params: Promise<{ tag: string }>
}

// 🔹 Генерация метаданных
export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { tag } = await params
    const decodedTag = decodeURIComponent(tag)

    const baseUrl = "https://renohacks.com"
    const title = `#${decodedTag} — статьи по тегу ${decodedTag} | Renohacks`
    const description = `Все статьи с тегом «${decodedTag}»: идеи, ремонты, интерьеры и DIY-проекты.`

    return {
        title,
        description,
        alternates: {
            canonical: `${baseUrl}/tags/${decodedTag}`,
            languages: {
                ru: `${baseUrl}/tags/${decodedTag}`,
                en: `${baseUrl}/en/tags/${decodedTag}`,
                "x-default": `${baseUrl}/tags/${decodedTag}`,
            },
        },
        openGraph: {
            title,
            description,
            url: `${baseUrl}/tags/${decodedTag}`,
            siteName: "Renohacks.com",
            images: ["/images/og-default.png"],
            locale: "ru_RU",
            type: "website",
        },
    }
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

    // 🔸 Фильтруем только русские посты
    let filtered = allPosts.filter(
        (post) =>
            !post.url.startsWith("/en/") &&
            post.tags?.map((t) => t.toLowerCase()).includes(decodedTag)
    )

    // 🔸 Автоматическое добавление свежих постов в "novinki"
    if (decodedTag === "novinki") {
        const recentPosts = allPosts.filter(
            (post) => !post.url.startsWith("/en/") && isRecent(post.date)
        )

        // Добавляем их, избегая дублей
        const existingIds = new Set(filtered.map((p) => p._id))
        for (const post of recentPosts) {
            if (!existingIds.has(post._id)) {
                filtered.push(post)
            }
        }
    }

    if (filtered.length === 0) return notFound()

    // 🔹 Сортируем по дате — свежие первыми
    filtered = filtered.sort((a, b) => {
        const ta = a.date ? new Date(a.date).getTime() : 0
        const tb = b.date ? new Date(b.date).getTime() : 0
        return tb - ta
    })

    return (
        <section className="container py-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">#{decodedTag}</h1>
            <p className="text-muted-foreground mb-8 text-sm sm:text-base">
                Все статьи с тегом <strong>«{decodedTag}»</strong>
            </p>
            <ArticleGrid posts={filtered} />
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
