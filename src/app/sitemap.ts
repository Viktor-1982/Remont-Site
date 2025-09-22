import { MetadataRoute } from "next"
import { allPosts } from ".contentlayer/generated"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://renohacks.com" // новый домен ✅

    const posts = allPosts.map((post) => ({
        url: `${baseUrl}/posts/${post.slug}`,
        lastModified: post.date,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
        },
        ...posts,
    ]
}
