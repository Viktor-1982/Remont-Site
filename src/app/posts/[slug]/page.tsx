import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { allPosts } from ".contentlayer/generated"

import { ArticleHero } from "@/components/article-hero"
import { TableOfContents } from "@/components/table-of-contents"
import { ArticleCard } from "@/components/article-card"
import { MDXRenderer } from "@/components/mdx-renderer"

// 🔹 Генерация путей
export const generateStaticParams = async () => {
    return allPosts.map((p) => ({ slug: p.slug }))
}

// 🔹 SEO
export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params
    const post = allPosts.find((p) => p.slug === slug)
    if (!post) return {}

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            images: post.cover ? [post.cover] : [],
            type: "article",
            authors: [post.author ?? "repair-blog"],
            tags: post.tags ?? [],
            publishedTime: post.date,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: post.cover ? [post.cover] : [],
        },
    }
}

// 🔹 Страница статьи
export default async function PostPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params
    const post = allPosts.find((p) => p.slug === slug)
    if (!post) return notFound()

    const relatedPosts = allPosts
        .filter(
            (p) =>
                p.slug !== post.slug &&
                p.tags?.some((t) => post.tags?.includes(t))
        )
        .slice(0, 2)

    return (
        <div className="container flex flex-col lg:flex-row gap-10 py-10">
            <div className="flex-1 space-y-8">
                <ArticleHero post={post} />

                {/* Контент статьи */}
                <article className="prose dark:prose-invert max-w-3xl mx-auto px-4 sm:px-6">
                    <MDXRenderer code={post.body.code} />
                </article>

                {/* Читайте также */}
                {relatedPosts.length > 0 && (
                    <div className="mt-12 border-t pt-6">
                        <h2 className="text-xl font-semibold mb-4">Читайте также:</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {relatedPosts.map((related) => (
                                <ArticleCard key={related._id} post={related} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <aside>
                <TableOfContents post={post} />
            </aside>
        </div>
    )
}
