// app/posts/[slug]/page.tsx
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { allPosts } from ".contentlayer/generated"

import { ArticleHero } from "@/components/article-hero"
import { TableOfContents } from "@/components/table-of-contents"
import { ArticleCard } from "@/components/article-card"
import { MDXRenderer } from "@/components/mdx-renderer"

// 🔹 Генерация статических путей
export function generateStaticParams(): { slug: string }[] {
    return allPosts.map((p) => ({ slug: p.slug }))
}

// 🔹 SEO-метаданные
export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params
    const post = allPosts.find((p) => p.slug === slug)
    if (!post) return {}

    const siteName = "Renohacks.com"
    const baseUrl = "https://renohacks.com"

    return {
        title: `${post.title} | ${siteName}`,
        description: post.description,
        keywords: post.tags?.join(", "),
        openGraph: {
            title: post.title,
            description: post.description,
            url: `${baseUrl}/posts/${post.slug}`,
            siteName,
            images: post.cover
                ? [
                    {
                        url: `${baseUrl}${post.cover}`,
                        width: 1200,
                        height: 630,
                        alt: post.title,
                    },
                ]
                : [],
            type: "article",
            publishedTime: post.date,
            authors: [post.author ?? siteName],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: post.cover ? [`${baseUrl}${post.cover}`] : [],
        },
        alternates: {
            canonical: `${baseUrl}/posts/${post.slug}`,
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

    const baseUrl = "https://renohacks.com"

    // Похожие статьи
    let relatedPosts = allPosts
        .filter(
            (p) =>
                p.slug !== post.slug && p.tags?.some((t) => post.tags?.includes(t))
        )
        .slice(0, 2)

    let relatedTitle = "Похожие статьи"

    if (relatedPosts.length === 0) {
        relatedPosts = allPosts
            .filter((p) => p.slug !== post.slug)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 2)

        relatedTitle = "Последние статьи"
    }

    return (
        <div className="container flex flex-col lg:flex-row gap-10 py-10">
            <div className="flex-1 space-y-8">
                {/* JSON-LD микроразметка */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Article",
                            headline: post.title,
                            description: post.description,
                            image: post.cover ? `${baseUrl}${post.cover}` : undefined,
                            author: {
                                "@type": "Person",
                                name: post.author ?? "Renohacks.com",
                            },
                            datePublished: post.date,
                            dateModified: post.date,
                            mainEntityOfPage: `${baseUrl}/posts/${post.slug}`,
                        }),
                    }}
                />

                {/* Заголовок, картинка, дата */}
                <ArticleHero post={post} />

                {/* Контент статьи */}
                <article className="prose dark:prose-invert max-w-3xl mx-auto px-4 sm:px-6">
                    <MDXRenderer code={post.body.code} />
                </article>

                {/* Блок «Читайте также» */}
                {relatedPosts.length > 0 && (
                    <div className="mt-12 border-t pt-6">
                        <h2 className="text-xl font-semibold mb-4">{relatedTitle}</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {relatedPosts.map((related) => (
                                <ArticleCard key={related._id} post={related} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Оглавление */}
            <aside className="w-full lg:w-80">
                <TableOfContents items={post.headings} />
            </aside>
        </div>
    )
}
