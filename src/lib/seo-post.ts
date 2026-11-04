import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import type { Post } from "contentlayer/generated"
import { allPosts } from "contentlayer/generated"

const baseUrl = "https://renohacks.com"

/**
 * Finds the translation of a post via translationOf field.
 */
function findTranslation(post: Post): Post | undefined {
    if (post.translationOf) {
        // This is a translation — find the original
        return allPosts.find(
            (p) => !p.draft && p.slug === post.translationOf && p.locale !== post.locale
        )
    } else {
        // This is the original — find the translation
        return allPosts.find(
            (p) => !p.draft && p.translationOf === post.slug && p.locale !== post.locale
        )
    }
}

export function getPostMetadata(post: Post): Metadata {
    const translation = findTranslation(post)

    // Build hreflang language map
    const languages: Record<string, string> = {}

    if (post.locale === "ru") {
        languages["ru"] = `${baseUrl}${post.url}`
        languages["ru-RU"] = `${baseUrl}${post.url}`
    } else {
        languages["en"] = `${baseUrl}${post.url}`
        languages["en-US"] = `${baseUrl}${post.url}`
    }

    if (translation) {
        if (translation.locale === "ru") {
            languages["ru"] = `${baseUrl}${translation.url}`
            languages["ru-RU"] = `${baseUrl}${translation.url}`
        } else {
            languages["en"] = `${baseUrl}${translation.url}`
            languages["en-US"] = `${baseUrl}${translation.url}`
        }
    }

    // x-default = EN version (EN is the primary language of this site)
    // If this post is EN → x-default = this post
    // If this post is RU → x-default = EN translation (if exists), else this post (reciprocal hreflang)
    if (post.locale === "en") {
        languages["x-default"] = `${baseUrl}${post.url}`
    } else if (translation && translation.locale === "en") {
        languages["x-default"] = `${baseUrl}${translation.url}`
    } else {
        languages["x-default"] = `${baseUrl}${post.url}`
    }

    const metadata = getPageMetadata(post.url, {
        title: post.title,
        description: post.description,
        cover: post.cover,
        type: "article",
        autoAlternateLanguages: false,
        alternates: {
            canonical: `${baseUrl}${post.url}`,
            languages,
        },
        openGraph: {
            type: "article",
            locale: post.locale === "en" ? "en_US" : "ru_RU",
            publishedTime: post.date,
            modifiedTime: post.modifiedDate || post.date,
            tags: post.tags,
            images: [
                {
                    url: `${baseUrl}${post.cover || "/images/og-default.png"}`,
                    width: 1200,
                    height: 675,
                    alt: post.title,
                },
            ],
        },
    })

    return {
        ...metadata,
        // Article titles stay search-intent first: the layout template must not
        // append "| Renohacks" and push them past the SERP length limit.
        title: { absolute: post.title },
    }
}
