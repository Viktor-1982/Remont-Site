import { allPosts } from ".contentlayer/generated"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArticleGrid } from "@/components/article-grid"

type Params = {
    params: Promise<{ tag: string }>
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { tag } = await params
    const decodedTag = decodeURIComponent(tag)

    const baseUrl = "https://renohacks.com"
    const title = `#${decodedTag} — articles tagged ${decodedTag} | Renohacks`
    const description = `All articles tagged "${decodedTag}" on Renohacks.com: practical home renovation ideas, interior design tips, and DIY projects. Step-by-step guides, photo tutorials, expert advice, and material reviews.`

    return {
        title,
        description,
        alternates: {
            canonical: `${baseUrl}/en/tags/${decodedTag}`,
            languages: {
                ru: `${baseUrl}/tags/${decodedTag}`,
                en: `${baseUrl}/en/tags/${decodedTag}`,
                "x-default": `${baseUrl}/en/tags/${decodedTag}`,
            },
        },
        openGraph: {
            title,
            description,
            url: `${baseUrl}/en/tags/${decodedTag}`,
            siteName: "Renohacks.com",
            images: ["/images/og-default.png"],
            locale: "en_US",
            type: "website",
        },
    }
}

export default async function TagPageEn({ params }: Params) {
    const { tag } = await params
    const decodedTag = decodeURIComponent(tag)

    const filtered = allPosts.filter(
        (post) =>
            post.url.startsWith("/en/") &&
            post.tags?.map((t) => t.toLowerCase()).includes(decodedTag.toLowerCase())
    )

    if (filtered.length === 0) return notFound()

    return (
        <section className="container py-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">#{decodedTag}</h1>
            <p className="text-muted-foreground mb-8 text-sm sm:text-base">
                All articles tagged <strong>“{decodedTag}”</strong>
            </p>
            <ArticleGrid posts={filtered} isEnglish={true} />
        </section>
    )
}

export async function generateStaticParams() {
    const tags = Array.from(
        new Set(
            allPosts
                .filter((p) => p.url.startsWith("/en/"))
                .flatMap((p) => p.tags || [])
        )
    )
    return tags.map((tag) => ({ tag }))
}
