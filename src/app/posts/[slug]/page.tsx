import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { allPosts } from ".contentlayer/generated"
import { getPostMetadata } from "@/lib/seo"

import { ArticleHero } from "@/components/article-hero"
import { TableOfContents } from "@/components/table-of-contents"
import { ArticleCard } from "@/components/article-card"
import { MDXRenderer } from "@/components/mdx-renderer"
import navData from "@/messages/nav.json"

// 🔹 статические пути
export function generateStaticParams(): { slug: string }[] {
    return allPosts.map((p) => ({
        slug: p.url.replace(/^\/posts\//, ""),
    }))
}

// 🔹 генерация SEO
export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const post = allPosts.find(
        (p) => p.url.replace(/^\/posts\//, "") === slug
    )
    if (!post) return {}
    return getPostMetadata(post)
}

// 🔹 сама страница
export default async function PostPage({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = allPosts.find(
        (p) => p.url.replace(/^\/posts\//, "") === slug
    )

    if (!post) return notFound()

    const isEnglish = post.url.endsWith("-en") || post.url.startsWith("/en")
    const t = (navData as any)[isEnglish ? "en" : "ru"].articles

    // похожие статьи
    let relatedPosts = allPosts
        .filter((p) => p.url !== post.url && p.tags?.some((t) => post.tags?.includes(t)))
        .slice(0, 2)

    if (relatedPosts.length === 0) {
        relatedPosts = allPosts
            .filter((p) => p.url !== post.url)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 2)
    }

    return (
        <div className="container flex flex-col lg:flex-row gap-10 py-10">
            <div className="flex-1 space-y-8">
                <ArticleHero post={post} clickableTags />
                <article className="prose dark:prose-invert max-w-3xl mx-auto px-4 sm:px-6">
                    <MDXRenderer code={post.body.code} />
                </article>

                {relatedPosts.length > 0 && (
                    <div className="mt-12 border-t pt-6">
                        <h2 className="text-xl font-semibold mb-4">
                            {t.related}
                        </h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {relatedPosts.map((related) => (
                                <ArticleCard key={related._id} post={related} clickableTags />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <aside className="w-full lg:w-80">
                <TableOfContents items={post.headings} />
            </aside>
        </div>
    )
}
