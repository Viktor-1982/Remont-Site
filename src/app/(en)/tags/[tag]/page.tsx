import { allPosts } from ".contentlayer/generated"
import { notFound, permanentRedirect } from "next/navigation"
import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import { ArticleGrid } from "@/components/article-grid"
import {
    findAlternateTagSlug,
    findTagDisplayName,
    getStaticTagParams,
    normalizeTag,
} from "@/lib/tags"

type Params = {
    params: Promise<{ tag: string }>
}

export const revalidate = 86400
export const dynamic = "force-static"
export const dynamicParams = true

// Minimum posts required for a tag page to be indexed by Google
const MIN_POSTS_FOR_INDEX = 3

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { tag } = await params
    const decodedTag = normalizeTag(decodeURIComponent(tag))
    const encodedTag = encodeURIComponent(decodedTag)
    const displayTag = findTagDisplayName(allPosts, "en", decodedTag)
    const russianTagSlug = findAlternateTagSlug(allPosts, "en", decodedTag, "ru")

    // Count published posts for this tag
    const postCount = allPosts.filter(
        (p) => p.locale === "en" && !p.draft &&
            p.tags?.map((t) => normalizeTag(t)).includes(decodedTag)
    ).length
    const isThinTag = postCount < MIN_POSTS_FOR_INDEX

    const title = `#${displayTag} — articles tagged ${displayTag} | Renohacks`
    const description = `All articles tagged "${displayTag}" on Renohacks.com: practical home renovation ideas, interior design tips, and DIY projects. Step-by-step guides, photo tutorials, expert advice, and material reviews.`

    return getPageMetadata(`/tags/${encodedTag}`, {
        title,
        description,
        cover: "/images/og-default.png",
        type: "website",
        autoAlternateLanguages: false,
        alternates: {
            languages: {
                en: `https://renohacks.com/tags/${encodedTag}`,
                ...(russianTagSlug
                    ? { ru: `https://renohacks.com/ru/tags/${encodeURIComponent(russianTagSlug)}` }
                    : {}),
                "x-default": `https://renohacks.com/tags/${encodedTag}`,
            },
        },
        openGraph: {
            locale: "en_US",
        },
        // Thin tag pages (< 3 posts) are noindexed to save crawl budget for important pages
        robots: isThinTag
            ? { index: false, follow: false }
            : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    })
}

export default async function TagPageEn({ params }: Params) {
    const { tag } = await params
    const decodedTag = normalizeTag(decodeURIComponent(tag))
    const displayTag = findTagDisplayName(allPosts, "en", decodedTag)

    const filtered = allPosts.filter(
        (post) =>
            post.locale === "en" &&
            !post.draft &&
            post.tags?.map((t) => normalizeTag(t)).includes(decodedTag)
    )

    if (filtered.length === 0) {
        // If it's a Russian tag or exists in Russian posts, 301 redirect to /ru/tags/[tag]
        const hasRuMatch = decodedTag === "novinki" || allPosts.some(
            (p) => p.locale === "ru" && !p.draft && p.tags?.map((t) => normalizeTag(t)).includes(decodedTag)
        )
        if (hasRuMatch || /[а-яА-ЯёЁ]/.test(decodedTag)) {
            permanentRedirect(`/ru/tags/${encodeURIComponent(decodedTag)}`)
        }
        return notFound()
    }

    return (
        <section className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16 max-w-7xl">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">#{displayTag}</h1>
            <p className="text-muted-foreground mb-8 text-sm sm:text-base">
                All articles tagged <strong>&quot;{displayTag}&quot;</strong>
            </p>
            <ArticleGrid posts={filtered} isEnglish={true} />
        </section>
    )
}

export async function generateStaticParams() {
    return getStaticTagParams(allPosts, "en")
}
