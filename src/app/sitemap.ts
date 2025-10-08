import { MetadataRoute } from "next"
import { allPosts } from ".contentlayer/generated"

// 🔹 Основные теги сайта
const tags = ["novinki", "diy", "smety", "kitchen", "bathroom", "floor", "walls"]

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://renohacks.com"

    // 🔹 Посты
    const posts = allPosts.map((post) => ({
        url: `${baseUrl}${post.url}`,
        lastModified: post.date ? new Date(post.date) : new Date(),
        changefreq: "monthly" as const,
        priority: 0.7,
    }))

    // 🔹 Основные страницы (русская + английская версии)
    const pages = [
        {
            path: "",
            priority: 1.0,
            changefreq: "daily" as const,
        },
        {
            path: "/about",
            priority: 0.8,
            changefreq: "monthly" as const,
        },
        {
            path: "/calculators",
            priority: 0.8,
            changefreq: "monthly" as const,
        },
    ].flatMap(({ path, priority, changefreq }) => [
        {
            url: `${baseUrl}${path}`,
            lastModified: new Date(),
            changefreq,
            priority,
        },
        {
            url: `${baseUrl}/en${path}`,
            lastModified: new Date(),
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
            priority: 0.8,
        },
        {
            url: `${baseUrl}/en/calculators/${calc}`,
            lastModified: new Date("2025-09-01"),
            changefreq: "monthly" as const,
            priority: 0.8,
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
                priority: tag === "novinki" || tag === "diy" ? 0.8 : 0.7,
            },
            {
                url: `${baseUrl}/en/tags/${enTag}`,
                lastModified: getTagLastModified(tag),
                changefreq: "weekly" as const,
                priority: tag === "novinki" || tag === "diy" ? 0.8 : 0.7,
            },
        ]
    })

    // ✅ Финальный массив для sitemap.xml
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
