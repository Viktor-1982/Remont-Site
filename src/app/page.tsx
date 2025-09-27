// app/page.tsx
import { allPosts } from ".contentlayer/generated"
import { HeroBanner } from "@/components/hero-banner"
import { ArticleGrid } from "@/components/article-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Renohacks.com — блог о ремонте и строительстве",
    description:
        "Добро пожаловать в Renohacks! Здесь вы найдете фото-гайды, лайфхаки и обзоры материалов для ремонта и дизайна.",
    keywords: [
        "ремонт",
        "строительство",
        "интерьер",
        "дизайн",
        "сметы",
        "материалы",
        "лайфхаки"
    ],
    alternates: {
        canonical: "https://renohacks.com/",
    },
    openGraph: {
        title: "Renohacks.com — блог о ремонте и строительстве",
        description:
            "Фото-гайды, советы и обзоры материалов для ремонта и интерьера. Всё о ремонте в одном месте.",
        url: "https://renohacks.com/",
        images: ["/images/og-default.png"],
    },
}

export default function HomePage() {
    const posts = allPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    return (
        <main>
            {/* HeroBanner должен содержать главный h1 */}
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
