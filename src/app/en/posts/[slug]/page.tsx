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
    const post = allPosts.find((p) => p.slug === slug && p.locale === "en")

    if (!post) return {}

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            url: `https://renohacks.com/en/posts/${slug}`,
            images: [post.cover || "/images/og-default.png"],
        },
        alternates: {
            canonical: `https://renohacks.com/en/posts/${slug}`,
            languages: {
                en: `https://renohacks.com/en/posts/${slug}`,
                ru: post.translationOf
                    ? `https://renohacks.com/posts/${post.translationOf}`
                    : "https://renohacks.com/",
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
    const post = allPosts.find((p) => p.slug === slug && p.locale === "en")

    if (!post) return notFound()

    return (
        <article className="container py-12">
            <ArticleHero post={post} />
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
                <Mdx code={post.body.code} />
                <TableOfContents items={post.headings} />
            </div>
        </article>
    )
}
