import { allPosts } from ".contentlayer/generated"
import { HeroBanner } from "@/components/hero-banner"
import { ArticleGrid } from "@/components/article-grid"

export default function HomePage() {
    const posts = allPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    return (
        <main>
            <HeroBanner />

            <section className="container py-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
                    Последние статьи
                </h2>

                <ArticleGrid posts={posts} />
            </section>
        </main>
    )
}
