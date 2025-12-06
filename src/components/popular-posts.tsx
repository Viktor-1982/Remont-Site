"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { Post } from ".contentlayer/generated"
import { getPopularPosts } from "@/lib/view-counter"
import { ArticleCard } from "@/components/article-card"
import { TrendingUp } from "lucide-react"

interface PopularPostsProps {
    posts: Post[]
    locale: "ru" | "en"
    limit?: number
}

export function PopularPosts({ posts, locale, limit = 5 }: PopularPostsProps) {
    const [popularPosts, setPopularPosts] = useState<Post[]>([])
    const router = useRouter()

    useEffect(() => {
        const filteredPosts = posts.filter(
            (p) => p.locale === locale && !p.draft
        )

        const popular = getPopularPosts(
            filteredPosts.map((p) => ({ slug: p.slug, locale: p.locale })),
            limit
        )

        const popularPostsData = popular
            .map(({ slug, locale: loc }) =>
                filteredPosts.find((p) => p.slug === slug && p.locale === loc)
            )
            .filter((p): p is Post => p !== undefined)

        setPopularPosts(popularPostsData)

        // Prefetch популярных статей для улучшения производительности
        popularPostsData.forEach((post) => {
            const href = `/${locale === "en" ? "en/" : ""}posts/${post.slug}`
            router.prefetch(href)
        })
    }, [posts, locale, limit, router])

    if (popularPosts.length === 0) return null

    return (
        <section className="mt-12 sm:mt-16">
            <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {locale === "en" ? "Popular Articles" : "Популярные статьи"}
                </h2>
            </div>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {popularPosts.map((post) => (
                    <ArticleCard key={`${post.slug}-${post.locale}`} post={post} />
                ))}
            </div>
        </section>
    )
}

