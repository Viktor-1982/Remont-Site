import type { Metadata } from "next"
import { allPosts } from ".contentlayer/generated"
import { ArticleGrid } from "@/components/article-grid"

export const metadata: Metadata = {
    title: "Renohacks.com — renovation and interior design blog",
    description: "Photo guides, DIY hacks, calculators, and material reviews.",
    openGraph: {
        title: "Renohacks.com — renovation and interior design blog",
        description: "Photo guides, DIY hacks, calculators, and material reviews.",
        url: "https://renohacks.com/en",
        siteName: "Renohacks.com",
        locale: "en_US",
        type: "website",
        images: ["/images/og-default.png"],
    },
    alternates: {
        canonical: "https://renohacks.com/en",
        languages: {
            ru: "https://renohacks.com/",
            en: "https://renohacks.com/en",
            "x-default": "https://renohacks.com/",
        },
    },
}

export default function HomePageEn() {
    // 🇬🇧 только английские статьи (url оканчивается на -en)
    const posts = allPosts
        .filter((p) => p.url.endsWith("-en"))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
        <main className="container py-10">
            <h1 className="text-3xl font-bold mb-6">Renovation & Interior Design Articles</h1>
            <ArticleGrid posts={posts} />
        </main>
    )
}
