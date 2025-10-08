// src/app/sitemap.ts
import { MetadataRoute } from "next"
import { allPosts } from ".contentlayer/generated"

const tags = ["novinki", "diy", "smety", "kitchen", "bathroom", "floor", "walls"]

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://renohacks.com"

    // Берём самую свежую дату публикации
    const latestPostDate = new Date(
        Math.max(...allPosts.map((p) => new Date(p.date).getTime()))
    )

    const posts = allPosts.map((post) => ({
        url: `${baseUrl}${post.url}`,
        lastModified: new Date(post.date),
        changefreq: "monthly" as const,
        priority: 0.7,
    }))

    const pages = [
        { path: "", priority: 1.0, changefreq: "daily" as const },
        { path: "/about", priority: 0.8, changefreq: "monthly" as const },
        { path: "/calculators", priority: 0.8, changefreq: "monthly" as const },
    ].flatMap(({ path, priority, changefreq }) => [
        {
            url: `${baseUrl}${path}`,
            lastModified: latestPostDate,
            changefreq,
            priority,
        },
        {
            url: `${baseUrl}/en${path}`,
            lastModified: latestPostDate,
            changefreq,
            priority,
        },
    ])

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

    const tagPages = tags.flatMap((tag) => {
        const enTag = mapTagToEn(tag)
        const lastModified = getTagLastModified(tag)
        const priority = tag === "novinki" || tag === "diy" ? 0.8 : 0.7
        return [
            {
                url: `${baseUrl}/tags/${tag}`,
                lastModified,
                changefreq: "weekly" as const,
                priority,
            },
            {
                url: `${baseUrl}/en/tags/${enTag}`,
                lastModified,
                changefreq: "weekly" as const,
                priority,
            },
        ]
    })

    return [...pages, ...calculators, ...tagPages, ...posts]
}

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

function getTagLastModified(tag: string): Date {
    const taggedPosts = allPosts.filter((p) => p.tags?.includes(tag))
    if (taggedPosts.length === 0) return new Date("2025-09-01")
    return new Date(Math.max(...taggedPosts.map((p) => new Date(p.date).getTime())))
}
