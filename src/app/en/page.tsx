import type { Metadata } from "next"
import { allPosts } from ".contentlayer/generated"
import { sortPosts } from "@/lib/utils"
import { ArticleGrid } from "@/components/article-grid"
import { HeroBanner } from "@/components/hero-banner"
import { HomeBackgroundAnimation } from "@/components/home-background-animation"
import { PopularPosts } from "@/components/popular-posts"
import { EmailSubscription } from "@/components/email-subscription"

// 🔄 Автообновление контента раз в минуту
export const revalidate = 60

export const metadata: Metadata = {
    title: "Renohacks.com — DIY Renovation & Interior Design Blog | Home Ideas 2025",
    description: "Step-by-step photo guides, DIY hacks, free paint & tile calculators, material reviews. Everything for quality home renovation and apartment design.",
    keywords: [
        "DIY renovation",
        "home improvement",
        "interior design",
        "apartment renovation",
        "renovation guides",
        "renovation calculators",
        "renovation tips",
        "material reviews",
        "painting walls",
        "bathroom renovation",
        "kitchen renovation",
        "interior ideas 2025",
        "design trends",
        "renovation without mistakes"
    ],
    openGraph: {
        title: "Renohacks.com — DIY Renovation & Interior Design Blog | Home Ideas 2025",
        description: "Step-by-step photo guides, DIY hacks, free paint & tile calculators, material reviews. Everything for quality home renovation and apartment design.",
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
            {/* 🎨 Construction-themed background animations */}
            <HomeBackgroundAnimation />
            
            {/* 🌍 Full-width banner */}
            <HeroBanner />

            {/* 📄 Main content inside container */}
            <div className="container mx-auto px-4 sm:px-6 py-10 space-y-12 max-w-7xl">
                {/* ✅ anchor for the scroll arrow */}
                <section id="articles">
                    <h1 className="text-3xl font-bold mb-6 text-balance text-center sm:text-left">
                        Step-by-Step Guides & Practical Tips
                    </h1>
                    <ArticleGrid posts={posts} isEnglish={true} />
                    
                    {/* Popular Posts */}
                    <PopularPosts posts={posts} locale="en" limit={6} />
                </section>

                {/* Email Subscription */}
                <section className="mt-16 sm:mt-20">
                    <EmailSubscription locale="en" variant="default" />
                </section>
            </div>
        </main>
    )
}
