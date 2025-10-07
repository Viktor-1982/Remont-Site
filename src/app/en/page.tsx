import type { Metadata } from "next"
import { allPosts } from ".contentlayer/generated"
import { sortPosts } from "@/lib/utils"
import { ArticleGrid } from "@/components/article-grid"
import { HeroBanner } from "@/components/hero-banner"

// 🔄 Автообновление контента раз в минуту
export const revalidate = 60

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
    const posts = sortPosts(allPosts).filter(
        (p) => p.locale === "en" && !p.draft
    )

    return (
        <main>
            {/* 🌍 Full-width banner */}
            <HeroBanner />

            {/* 📄 Main content inside container */}
            <div className="container py-10 space-y-12">
                {/* ✅ anchor for the scroll arrow */}
                <section id="articles">
                    <h1 className="text-3xl font-bold mb-6 text-balance">
                        Inspiring Renovation & Design Ideas
                    </h1>
                    <ArticleGrid posts={posts} />
                </section>
            </div>
        </main>
    )
}
