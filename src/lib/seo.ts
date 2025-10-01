import type { Metadata } from "next"
import type { Post } from ".contentlayer/generated"

const siteUrl = "https://renohacks.com"

/**
 * SEO для статей (MDX)
 */
export function getPostMetadata(post: Post): Metadata {
    const isEnglish = post.url.endsWith("-en") || post.url.startsWith("/en")
    const baseSlug = post.url.replace(/-en$/, "")

    const languages: Record<string, string> = isEnglish
        ? {
            en: `${siteUrl}${post.url}`,
            ru: `${siteUrl}${baseSlug}`,
            "x-default": `${siteUrl}${post.url}`,
        }
        : {
            ru: `${siteUrl}${post.url}`,
            en: `${siteUrl}${post.url}-en`,
            "x-default": `${siteUrl}${post.url}`,
        }

    return {
        title: `${post.title} | renohacks.com`,
        description: post.description,
        keywords: post.tags?.join(", "),
        openGraph: {
            title: post.title,
            description: post.description,
            url: `${siteUrl}${post.url}`,
            siteName: "renohacks.com",
            images: post.cover
                ? [
                    {
                        url: `${siteUrl}${post.cover}`,
                        width: 1200,
                        height: 630,
                        alt: post.title,
                    },
                ]
                : [],
            type: "article",
            publishedTime: post.date,
            authors: [post.author ?? "renohacks.com"],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: post.cover ? [`${siteUrl}${post.cover}`] : [],
        },
        alternates: {
            canonical: `${siteUrl}${post.url}`,
            languages,
        },
    }
}

/**
 * SEO для статичных страниц
 * @param slug - URL без домена (например "/about" или "/calculators")
 * @param opts - { title, description, cover?, type? }
 */
export function getPageMetadata(
    slug: string,
    opts: {
        title: string
        description: string
        cover?: string
        type?: "website" | "article"
    }
): Metadata {
    const isEnglish = slug.startsWith("/en")
    const baseSlug = slug.replace(/^\/en/, "")

    const languages: Record<string, string> = isEnglish
        ? {
            en: `${siteUrl}${slug}`,
            ru: `${siteUrl}${baseSlug || "/"}`,
            "x-default": `${siteUrl}${slug}`,
        }
        : {
            ru: `${siteUrl}${slug}`,
            en: `${siteUrl}/en${slug === "/" ? "" : slug}`,
            "x-default": `${siteUrl}${slug}`,
        }

    return {
        title: `${opts.title} | renohacks.com`,
        description: opts.description,
        openGraph: {
            title: `${opts.title} | renohacks.com`,
            description: opts.description,
            url: `${siteUrl}${slug}`,
            siteName: "renohacks.com",
            images: opts.cover
                ? [
                    {
                        url: `${siteUrl}${opts.cover}`,
                        width: 1200,
                        height: 630,
                        alt: opts.title,
                    },
                ]
                : [],
            locale: isEnglish ? "en_US" : "ru_RU",
            type: opts.type ?? "article",
        },
        alternates: {
            canonical: `${siteUrl}${slug}`,
            languages,
        },
    }
}
