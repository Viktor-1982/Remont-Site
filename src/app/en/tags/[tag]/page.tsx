import { allPosts } from ".contentlayer/generated"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import { ArticleGrid } from "@/components/article-grid"

type Params = {
    params: Promise<{ tag: string }>
}

export const revalidate = 86400
export const dynamic = "force-static"
export const dynamicParams = false

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { tag } = await params
    const decodedTag = decodeURIComponent(tag).trim().toLowerCase()
    const encodedTag = encodeURIComponent(decodedTag)

    const title = `#${decodedTag} — articles tagged ${decodedTag} | Renohacks`
    const description = `All articles tagged "${decodedTag}" on Renohacks.com: practical home renovation ideas, interior design tips, and DIY projects. Step-by-step guides, photo tutorials, expert advice, and material reviews.`

    return getPageMetadata(`/en/tags/${encodedTag}`, {
        title,
        description,
        cover: "/images/og-default.png",
        type: "website",
        autoAlternateLanguages: false,
        alternates: {
            languages: {
                en: `https://renohacks.com/en/tags/${encodedTag}`,
                "x-default": `https://renohacks.com/en/tags/${encodedTag}`,
            },
        },
        openGraph: {
            locale: "en_US",
        },
    })
}

export default async function TagPageEn({ params }: Params) {
    const { tag } = await params
    const decodedTag = decodeURIComponent(tag)

    const filtered = allPosts.filter(
        (post) =>
            post.url.startsWith("/en/") &&
            !post.draft &&
            post.tags?.map((t) => t.toLowerCase()).includes(decodedTag.toLowerCase())
    )

    if (filtered.length === 0) return notFound()

    return (
        <section className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16 max-w-7xl">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">#{decodedTag}</h1>
            <p className="text-muted-foreground mb-8 text-sm sm:text-base">
                All articles tagged <strong>&quot;{decodedTag}&quot;</strong>
            </p>
            <ArticleGrid posts={filtered} isEnglish={true} />
        </section>
    )
}

export async function generateStaticParams() {
    const tags = Array.from(
        new Set(
            allPosts
                .filter((p) => p.url.startsWith("/en/") && !p.draft)
                .flatMap((p) => p.tags || [])
        )
    )
    return tags.map((tag) => ({ tag }))
}
