import type { Post } from ".contentlayer/generated"
import { ArticleCard } from "@/components/article-card"

export function ArticleGrid({ posts }: { posts: Post[] }) {
    if (!posts || posts.length === 0) {
        return (
            <p className="text-muted-foreground text-center py-10">
                Пока нет статей 📝
            </p>
        )
    }

    return (
        <section className="grid gap-6">
            {/* Первая статья — широкая карточка */}
            {posts[0] && (
                <div className="sm:col-span-2 lg:col-span-3">
                    <ArticleCard post={posts[0]} />
                </div>
            )}

            {/* Остальные статьи в сетке */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.slice(1).map((post) => (
                    <ArticleCard key={post.url} post={post} />
                ))}
            </div>
        </section>
    )
}
