import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { allPosts } from ".contentlayer/generated"
import { ArticleHero } from "@/components/article-hero"
import { TableOfContents } from "@/components/table-of-contents"
import { Mdx } from "@/components/mdx-components"

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const post = allPosts.find((p) => p.slug === slug && p.locale === "ru")

    if (!post) return {}

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            url: `https://renohacks.com/posts/${slug}`,
            images: [post.cover || "/images/og-default.png"],
        },
        alternates: {
            canonical: `https://renohacks.com/posts/${slug}`,
            languages: {
                ru: `https://renohacks.com/posts/${slug}`,
                en: post.translationOf
                    ? `https://renohacks.com/en/posts/${post.translationOf}`
                    : "https://renohacks.com/en",
            },
        },
    }
}

export default async function PostPage({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = allPosts.find((p) => p.slug === slug && p.locale === "ru")

    if (!post) return notFound()

    return (
        <article className="container py-12">
            <ArticleHero post={post} />

            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
                <Mdx code={post.body.code} />
                <TableOfContents items={post.headings} />
            </div>

            {/* 🟡 SEO: Structured Data (JSON-LD) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: post.title,
                        description: post.description,
                        image: [`https://renohacks.com${post.cover}`],
                        author: {
                            "@type": "Organization",
                            name: "Renohacks",
                            url: "https://renohacks.com",
                        },
                        publisher: {
                            "@type": "Organization",
                            name: "Renohacks",
                            logo: {
                                "@type": "ImageObject",
                                url: "https://renohacks.com/images/logo.png",
                            },
                        },
                        datePublished: post.date,
                        dateModified: post.date,
                        mainEntityOfPage: {
                            "@type": "WebPage",
                            "@id": `https://renohacks.com/posts/${slug}`,
                        },
                        keywords: post.tags?.join(", "),
                        inLanguage: "ru",
                    }),
                }}
            />
        </article>
    )
}
