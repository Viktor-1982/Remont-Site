// src/app/sitemap.ts
import { MetadataRoute } from "next"
import { allPosts } from ".contentlayer/generated"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://renohacks.com"


    const posts: MetadataRoute.Sitemap = allPosts
        .filter((post) => !post.draft)
        .map((post) => ({
        url: `${baseUrl}${post.url}`,
        lastModified: post.date,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }))


    const staticPages: MetadataRoute.Sitemap = [
        "",
        "/about",
        "/privacy",
        "/terms",
        "/developer",
        "/tags",
        "/search",
        "/bookmarks",
        "/calculators",
        "/calculators/paint",
        "/calculators/tile",
        "/calculators/wallpaper",
        "/calculators/budget",
        "/tools",
        "/tools/materials-checklist",
        "/quiz/interior-style",
        "/smety",
        "/en",
        "/en/about",
        "/en/privacy",
        "/en/terms",
        "/en/developer",
        "/en/tags",
        "/en/search",
        "/en/bookmarks",
        "/en/costs",
        "/en/calculators",
        "/en/calculators/paint",
        "/en/calculators/tile",
        "/en/calculators/wallpaper",
        "/en/calculators/budget",
        "/en/tools",
        "/en/tools/materials-checklist",
        "/en/quiz/interior-style",
    ].map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 1.0,
    }))

    return [...staticPages, ...posts]
}
