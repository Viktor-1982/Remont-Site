import { allPosts } from ".contentlayer/generated"
import { ArticleCard } from "@/components/article-card"
import { HeroBanner } from "@/components/hero-banner"

export default function HomePage() {
    // 🔹 сортируем статьи по дате (новые сверху)
    const posts = allPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    return (
        <>
            {/* Шапка сайта (hero) */}
            <HeroBanner />
            <div className="container py-10">
                {/* остальное */}
            </div>

            {/* Контент */}
            <div className="container py-10">
                <h1 className="text-3xl font-bold mb-8">Блог о ремонте и строительстве</h1>

                {/* Сетка карточек статей */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <ArticleCard key={post._id} post={post} />
                    ))}
                </div>
            </div>
        </>
    )
}
