// src/app/sitemap.ts
import { MetadataRoute } from "next"
import { allPosts } from ".contentlayer/generated"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://renohacks.com"

    
    const posts: MetadataRoute.Sitemap = allPosts.map((post) => ({
        url: `${baseUrl}${post.url}`,
        lastModified: post.date,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }))

    
    const staticPages: MetadataRoute.Sitemap = [
        "",
        "/about",
        "/contact",
        "/calculators/paint",
        "/calculators/tile",
        "/calculators/wallpaper",
    ].map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 1.0,
    }))

    return [...staticPages, ...posts]
}
