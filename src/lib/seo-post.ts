import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import type { Post } from "contentlayer/generated"
import { allPosts } from "contentlayer/generated"

/**
 * Находит связанный перевод поста через translationOf
 */
function findTranslation(post: Post): Post | undefined {
    if (post.translationOf) {
        // Если это перевод, найти оригинал
        return allPosts.find(
            (p) => p.slug === post.translationOf && p.locale !== post.locale
        )
    } else {
        // Если это оригинал, найти перевод
        return allPosts.find(
            (p) => p.translationOf === post.slug && p.locale !== post.locale
        )
    }
}

export function getPostMetadata(post: Post): Metadata {
    const baseUrl = "https://renohacks.com"
    const translation = findTranslation(post)
    
    // Формируем languages для hreflang
    const languages: Record<string, string> = {
        [post.locale]: `${baseUrl}${post.url}`,
    }
    
    if (translation) {
        const altLocale = post.locale === "en" ? "ru" : "en"
        languages[altLocale] = `${baseUrl}${translation.url}`
    }
    
    // x-default указывает на основную версию (русскую)
    languages["x-default"] = post.locale === "ru" 
        ? `${baseUrl}${post.url}` 
        : (translation ? `${baseUrl}${translation.url}` : `${baseUrl}${post.url}`)
    
    return getPageMetadata(post.url, {
        title: post.title,
        description: post.description,
        cover: post.cover,
        type: "article",
        keywords: post.keywords,
        alternates: {
            canonical: `${baseUrl}${post.url}`,
            languages,
        },
        openGraph: {
            type: "article",
            locale: post.locale === "en" ? "en_US" : "ru_RU",
            publishedTime: post.date,
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
}
