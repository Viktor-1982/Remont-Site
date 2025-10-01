"use client"

import { usePathname } from "next/navigation"
import type { Post } from ".contentlayer/generated"
import { ArticleCard } from "@/components/article-card"

export function ArticleGrid({ posts }: { posts: Post[] }) {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en")

    if (!posts || posts.length === 0) {
        return (
            <p className="text-muted-foreground text-center py-10">
                {isEnglish ? "No articles yet 📝" : "Пока нет статей 📝"}
            </p>
        )
    }

    return (
        <section
            className="
                grid gap-6
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
            "
            aria-label={isEnglish ? "Blog articles list" : "Список статей блога"}
        >
            {posts.map((post) => (
                <article key={post.url}>
                    <ArticleCard post={post} />
                </article>
            ))}
        </section>
    )
}
