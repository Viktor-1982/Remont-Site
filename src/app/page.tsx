// src/app/page.tsx
import type { Metadata } from "next"
import { allPosts, type Post } from ".contentlayer/generated"
import { ArticleGrid } from "@/components/article-grid"
import { HeroBanner } from "@/components/hero-banner"

export const metadata: Metadata = {
    title: "Renohacks.com — блог о ремонте и дизайне",
    description: "Фото-гайды, DIY лайфхаки, калькуляторы и обзоры материалов.",
    openGraph: {
        title: "Renohacks.com — блог о ремонте и дизайне",
        description: "Фото-гайды, DIY лайфхаки, калькуляторы и обзоры материалов.",
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
        <main className="container py-10 space-y-12">
            {/* 🏠 Баннер */}
            <HeroBanner />

            {/* 📑 Статьи */}
            <section>
                <h1 className="text-3xl font-bold mb-6">Статьи о ремонте и дизайне</h1>
                <ArticleGrid posts={posts} />
            </section>
        </main>
    )
}
