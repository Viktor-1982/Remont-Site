// src/app/page.tsx
import type { Metadata } from "next"
import { allPosts, type Post } from ".contentlayer/generated"
import { ArticleGrid } from "@/components/article-grid"
import { HeroBanner } from "@/components/hero-banner"

// 🔄 Автоматическое обновление страницы каждые 60 сек
export const revalidate = 60

export const metadata: Metadata = {
    title: "Renohacks.com — блог о ремонте и дизайне",
    description:
        "Фото-гайды, DIY лайфхаки, калькуляторы и обзоры материалов.",
    openGraph: {
        title: "Renohacks.com — блог о ремонте и дизайне",
        description:
            "Фото-гайды, DIY лайфхаки, калькуляторы и обзоры материалов.",
        url: "https://renohacks.com/",
        siteName: "Renohacks.com",
        locale: "ru_RU",
        type: "website",
        images: ["/images/og-default.png"],
    },
    alternates: {
        canonical: "https://renohacks.com/",
        languages: {
            ru: "https://renohacks.com/",
            en: "https://renohacks.com/en",
            "x-default": "https://renohacks.com/",
        },
    },
}

export default function HomePage() {
    const posts: Post[] = allPosts
        .filter((p) => p.locale === "ru")
        .filter((p) => !p.draft)
        .sort((a, b) => {
            const ta = a.date ? new Date(a.date).getTime() : 0
            const tb = b.date ? new Date(b.date).getTime() : 0
            return tb - ta
        })

    return (
        <main>
            {/* 🏠 Баннер во всю ширину */}
            <HeroBanner />

            {/* 📑 Контент внутри контейнера */}
            <div className="container py-10 space-y-12">
                {/* ✅ Якорь для стрелки */}
                <section id="articles">
                    <h1 className="text-3xl font-bold mb-6 text-balance">
                        Идеи и советы по ремонту и дизайну
                    </h1>
                    <ArticleGrid posts={posts} />
                </section>
            </div>
        </main>
    )
}
