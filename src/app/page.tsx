import type { Metadata } from "next"
import { allPosts } from ".contentlayer/generated"
import { ArticleGrid } from "@/components/article-grid"

export const metadata: Metadata = {
    title: "Renohacks.com — блог о ремонте и строительстве",
    description: "Фото-гайды, лайфхаки, сметы и обзоры материалов.",
    openGraph: {
        title: "Renohacks.com — блог о ремонте и строительстве",
        description: "Фото-гайды, лайфхаки, сметы и обзоры материалов.",
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
    // 🇷🇺 только русские статьи (без -en)
    const posts = allPosts
        .filter((p) => !p.url.endsWith("-en"))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
        <main className="container py-10">
            <h1 className="text-3xl font-bold mb-6">Статьи о ремонте и дизайне</h1>
            <ArticleGrid posts={posts} />
        </main>
    )
}
