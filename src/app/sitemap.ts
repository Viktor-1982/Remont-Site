import { MetadataRoute } from "next"
import { allPosts } from ".contentlayer/generated"
import { getAllArticleSeries } from "@/lib/article-series"
import { getCanonicalTagSlugs } from "@/lib/tags"

const baseUrl = "https://renohacks.com"
const publishedPosts = allPosts.filter((post) => !post.draft)

const staticPageConfig = [
    { path: "", changeFrequency: "daily" as const, priority: 1.0 },
    { path: "/en", changeFrequency: "daily" as const, priority: 1.0 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.5 },
    { path: "/en/about", changeFrequency: "monthly" as const, priority: 0.5 },
    { path: "/editorial-standards", changeFrequency: "monthly" as const, priority: 0.45 },
    { path: "/en/editorial-standards", changeFrequency: "monthly" as const, priority: 0.45 },
    { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/en/privacy", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/terms", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/en/terms", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/developer", changeFrequency: "monthly" as const, priority: 0.3 },
    { path: "/en/developer", changeFrequency: "monthly" as const, priority: 0.3 },
    { path: "/tags", changeFrequency: "weekly" as const, priority: 0.6 },
    { path: "/en/tags", changeFrequency: "weekly" as const, priority: 0.6 },
    { path: "/calculators", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/en/calculators", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/calculators/paint", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/en/calculators/paint", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/calculators/tile", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/en/calculators/tile", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/calculators/wallpaper", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/en/calculators/wallpaper", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/calculators/flooring", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/en/calculators/flooring", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/calculators/baseboard", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/en/calculators/baseboard", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/calculators/screed", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/en/calculators/screed", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/calculators/budget", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/en/calculators/budget", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/calculators/ventilation", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/en/calculators/ventilation", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/calculators/underfloor-heating", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/en/calculators/underfloor-heating", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/calculators/lighting", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/en/calculators/lighting", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/calculators/color-palette", changeFrequency: "monthly" as const, priority: 0.5 },
    { path: "/en/calculators/color-palette", changeFrequency: "monthly" as const, priority: 0.5 },
    { path: "/tools", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/en/tools", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/tools/materials-checklist", changeFrequency: "monthly" as const, priority: 0.5 },
    { path: "/en/tools/materials-checklist", changeFrequency: "monthly" as const, priority: 0.5 },
    { path: "/quiz/interior-style", changeFrequency: "monthly" as const, priority: 0.4 },
    { path: "/en/quiz/interior-style", changeFrequency: "monthly" as const, priority: 0.4 },
    { path: "/smety", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/en/costs", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/lighting", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/en/lighting", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/bathroom", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/en/bathroom", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/kitchen", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/en/kitchen", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/budget-planning", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/en/budget-planning", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/bedroom", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/en/bedroom", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/walls", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/en/walls", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/flooring", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/en/flooring", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/small-apartment", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/en/small-apartment", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/series", changeFrequency: "weekly" as const, priority: 0.65 },
    { path: "/en/series", changeFrequency: "weekly" as const, priority: 0.65 },
] as const

function getLatestPublishedDate() {
    const timestamps = publishedPosts
        .map((post) => Date.parse(post.date))
        .filter((timestamp) => Number.isFinite(timestamp))

    return timestamps.length > 0
        ? new Date(Math.max(...timestamps)).toISOString()
        : new Date("2026-01-01T00:00:00.000Z").toISOString()
}

function getTagPages() {
    const ruTags = getCanonicalTagSlugs(publishedPosts, "ru")
    const enTags = getCanonicalTagSlugs(publishedPosts, "en")
    const lastModified = getLatestPublishedDate()

    const ruPages = ruTags.map((tag) => ({
        url: `${baseUrl}/tags/${encodeURIComponent(tag)}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.5,
    }))

    const enPages = enTags.map((tag) => ({
        url: `${baseUrl}/en/tags/${encodeURIComponent(tag)}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.5,
    }))

    return [...ruPages, ...enPages]
}

export default function sitemap(): MetadataRoute.Sitemap {
    const staticLastModified = getLatestPublishedDate()
    const articleSeriesPages: MetadataRoute.Sitemap = [
        ...getAllArticleSeries("ru").map((series) => ({
            url: `${baseUrl}${series.path}`,
            lastModified: staticLastModified,
            changeFrequency: "weekly" as const,
            priority: 0.6,
        })),
        ...getAllArticleSeries("en").map((series) => ({
            url: `${baseUrl}${series.path}`,
            lastModified: staticLastModified,
            changeFrequency: "weekly" as const,
            priority: 0.6,
        })),
    ]

    const posts: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
        url: `${baseUrl}${post.url}`,
        lastModified: post.date,
        changeFrequency: "monthly",
        priority: 0.7,
    }))

    const staticPages: MetadataRoute.Sitemap = staticPageConfig.map((item) => ({
        url: `${baseUrl}${item.path}`,
        lastModified: staticLastModified,
        changeFrequency: item.changeFrequency,
        priority: item.priority,
    }))

    return [...staticPages, ...articleSeriesPages, ...getTagPages(), ...posts]
}
