import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import type { Post } from "contentlayer/generated"

export function getPostMetadata(post: Post): Metadata {
    return getPageMetadata(post.url, {
        title: post.title,
        description: post.description,
        cover: post.cover,
        type: "article",
        keywords: post.keywords,
        alternates: {
            canonical: `https://renohacks.com${post.url}`,
            languages: {
                ru: `https://renohacks.com${post.url.replace("/en", "")}`,
                en: `https://renohacks.com/en${post.url.replace(/^\/en/, "")}`,
            },
        },
        openGraph: {
            type: "article",
            locale: post.locale === "en" ? "en_US" : "ru_RU",
            publishedTime: post.date,
            images: [
                {
                    url: `https://renohacks.com${post.cover || "/images/og-default.png"}`,
                    width: 1200,
                    height: 675,
                    alt: post.title,
                },
            ],
        },
    })
}
