import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { allPosts } from "contentlayer/generated"
import { ArticleHero } from "@/components/article-hero"
import { TableOfContents } from "@/components/table-of-contents"
import { Mdx } from "@/components/mdx-components"
import { RelatedPosts } from "@/components/related-posts"
import { getPostMetadata } from "@/lib/seo-post" // ✅ используем общий SEO-модуль

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const post = allPosts.find((p) => p.slug === slug && p.locale === "ru")
    if (!post) return {}
    return getPostMetadata(post) // ✅ автоматическое SEO
}

export default async function PostPage({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = allPosts.find((p) => p.slug === slug && p.locale === "ru")
    if (!post) return notFound()

    const baseUrl = "https://renohacks.com"
    const canonical = `${baseUrl}/posts/${slug}`

    return (
        <article className="container py-12">
            <ArticleHero post={post} />

            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
                <Mdx code={post.body.code} />
                <TableOfContents items={post.headings} />
            </div>

            <RelatedPosts currentSlug={slug} locale="ru" />

            {/* 🟡 JSON-LD: структурированные данные для поисковиков */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        headline: post.title,
                        description: post.description,
                        image: [`${baseUrl}${post.cover || "/images/og-default.png"}`],
                        author: {
                            "@type": "Organization",
                            name: "Renohacks",
                            url: baseUrl,
                        },
                        publisher: {
                            "@type": "Organization",
                            name: "Renohacks",
                            logo: {
                                "@type": "ImageObject",
                                url: `${baseUrl}/favicon.ico`,
                            },
                        },
                        datePublished: post.date,
                        dateModified: post.date,
                        mainEntityOfPage: {
                            "@type": "WebPage",
                            "@id": canonical,
                        },
                        keywords: post.keywords?.join(", "),
                        inLanguage: "ru",
                        articleSection: "Ремонт и дизайн",
                        wordCount: post.body.raw?.split(/\s+/).length ?? 0,
                        isAccessibleForFree: true,
                        genre: "DIY, Ремонт, Дизайн интерьера",
                    }),
                }}
            />
        </article>
    )
}
