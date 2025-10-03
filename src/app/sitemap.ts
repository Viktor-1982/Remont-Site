import { MetadataRoute } from "next"
import { allPosts } from ".contentlayer/generated"

const tags = ["novinki", "diy", "smety", "kitchen", "bathroom", "floor", "walls"]

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://renohacks.com"

    // 🔹 Посты
    const posts = allPosts.map((post) => ({
        url: `${baseUrl}${post.url}`,
        lastModified: post.date ? new Date(post.date) : new Date(),
        changefreq: "monthly" as const,
        priority: 0.6,
    }))

    // 🔹 Основные страницы
    const pages = [
        {
            path: "",
            priority: 1.0,
            changefreq: "daily" as const,
            lastModified: new Date("2025-09-01"),
        },
        {
            path: "/about",
            priority: 0.7,
            changefreq: "monthly" as const,
            lastModified: new Date("2025-09-01"),
        },
        {
            path: "/calculators",
            priority: 0.7,
            changefreq: "monthly" as const,
            lastModified: new Date("2025-09-01"),
        },
        // 🔹 Страницы ошибок
        {
            path: "/404",
            priority: 0.0,
            changefreq: "yearly" as const,
            lastModified: new Date("2025-09-01"),
        },
        {
            path: "/500",
            priority: 0.0,
            changefreq: "yearly" as const,
            lastModified: new Date("2025-09-01"),
        },
    ].flatMap(({ path, priority, changefreq, lastModified }) => [
        {
            url: `${baseUrl}${path}`,
            lastModified,
            changefreq,
            priority,
        },
        {
            url: `${baseUrl}/en${path}`,
            lastModified,
            changefreq,
            priority,
        },
    ])

    // 🔹 Калькуляторы
    const calculators = ["paint", "wallpaper", "tile"].flatMap((calc) => [
        {
            url: `${baseUrl}/calculators/${calc}`,
            lastModified: new Date("2025-09-01"),
            changefreq: "monthly" as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/en/calculators/${calc}`,
            lastModified: new Date("2025-09-01"),
            changefreq: "monthly" as const,
            priority: 0.7,
        },
    ])

    // 🔹 Теги
    const tagPages = tags.flatMap((tag) => {
        const enTag = mapTagToEn(tag)
        return [
            {
                url: `${baseUrl}/tags/${tag}`,
                lastModified: getTagLastModified(tag),
                changefreq: "weekly" as const,
                priority: 0.7,
            },
            {
                url: `${baseUrl}/en/tags/${enTag}`,
                lastModified: getTagLastModified(tag),
                changefreq: "weekly" as const,
                priority: 0.7,
            },
        ]
    })

    return [...pages, ...calculators, ...tagPages, ...posts]
}

// 🔹 Маппинг тегов
function mapTagToEn(tag: string): string {
    const map: Record<string, string> = {
        novinki: "trends",
        diy: "diy",
        smety: "costs",
        kitchen: "kitchen",
        bathroom: "bathroom",
        floor: "floor",
        walls: "walls",
    }
    return map[tag] || tag
}

// 🔹 Берём дату последнего поста по тегу
function getTagLastModified(tag: string): Date {
    const taggedPosts = allPosts.filter((post) => post.tags?.includes(tag))
    if (taggedPosts.length === 0) return new Date("2025-09-01")
    return new Date(
        Math.max(...taggedPosts.map((post) => new Date(post.date || "").getTime()))
    )
}
