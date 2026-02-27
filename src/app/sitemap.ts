// src/app/sitemap.ts
import { MetadataRoute } from "next"
import { allPosts } from ".contentlayer/generated"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://renohacks.com"
    const staticLastModified = "2026-02-27"

    const posts: MetadataRoute.Sitemap = allPosts
        .filter((post) => !post.draft)
        .map((post) => ({
        url: `${baseUrl}${post.url}`,
        lastModified: post.date,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }))


    const staticPageConfig = [
        { path: "", changeFrequency: "daily" as const, priority: 1.0 },
        { path: "/en", changeFrequency: "daily" as const, priority: 1.0 },
        { path: "/about", changeFrequency: "monthly" as const, priority: 0.5 },
        { path: "/en/about", changeFrequency: "monthly" as const, priority: 0.5 },
        { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.2 },
        { path: "/en/privacy", changeFrequency: "yearly" as const, priority: 0.2 },
        { path: "/terms", changeFrequency: "yearly" as const, priority: 0.2 },
        { path: "/en/terms", changeFrequency: "yearly" as const, priority: 0.2 },
        { path: "/developer", changeFrequency: "monthly" as const, priority: 0.3 },
        { path: "/en/developer", changeFrequency: "monthly" as const, priority: 0.3 },
        { path: "/tags", changeFrequency: "weekly" as const, priority: 0.6 },
        { path: "/en/tags", changeFrequency: "weekly" as const, priority: 0.6 },
        { path: "/calculators", changeFrequency: "monthly" as const, priority: 0.7 },
        { path: "/en/calculators", changeFrequency: "monthly" as const, priority: 0.7 },
        { path: "/calculators/paint", changeFrequency: "monthly" as const, priority: 0.6 },
        { path: "/en/calculators/paint", changeFrequency: "monthly" as const, priority: 0.6 },
        { path: "/calculators/tile", changeFrequency: "monthly" as const, priority: 0.6 },
        { path: "/en/calculators/tile", changeFrequency: "monthly" as const, priority: 0.6 },
        { path: "/calculators/wallpaper", changeFrequency: "monthly" as const, priority: 0.6 },
        { path: "/en/calculators/wallpaper", changeFrequency: "monthly" as const, priority: 0.6 },
        { path: "/calculators/budget", changeFrequency: "monthly" as const, priority: 0.6 },
        { path: "/en/calculators/budget", changeFrequency: "monthly" as const, priority: 0.6 },
        { path: "/calculators/ventilation", changeFrequency: "monthly" as const, priority: 0.6 },
        { path: "/en/calculators/ventilation", changeFrequency: "monthly" as const, priority: 0.6 },
        { path: "/calculators/underfloor-heating", changeFrequency: "monthly" as const, priority: 0.6 },
        { path: "/en/calculators/underfloor-heating", changeFrequency: "monthly" as const, priority: 0.6 },
        { path: "/calculators/lighting", changeFrequency: "monthly" as const, priority: 0.6 },
        { path: "/en/calculators/lighting", changeFrequency: "monthly" as const, priority: 0.6 },
        { path: "/tools", changeFrequency: "monthly" as const, priority: 0.6 },
        { path: "/en/tools", changeFrequency: "monthly" as const, priority: 0.6 },
        { path: "/tools/materials-checklist", changeFrequency: "monthly" as const, priority: 0.5 },
        { path: "/en/tools/materials-checklist", changeFrequency: "monthly" as const, priority: 0.5 },
        { path: "/quiz/interior-style", changeFrequency: "monthly" as const, priority: 0.4 },
        { path: "/en/quiz/interior-style", changeFrequency: "monthly" as const, priority: 0.4 },
        { path: "/smety", changeFrequency: "weekly" as const, priority: 0.7 },
        { path: "/en/costs", changeFrequency: "weekly" as const, priority: 0.7 },
    ]

    const staticPages: MetadataRoute.Sitemap = staticPageConfig.map((item) => ({
        url: `${baseUrl}${item.path}`,
        lastModified: staticLastModified,
        changeFrequency: item.changeFrequency,
        priority: item.priority,
    }))

    return [...staticPages, ...posts]
}
