import type { Metadata } from "next"
import { allPosts } from ".contentlayer/generated"
import { sortPosts } from "@/lib/utils"
import { ArticleGrid } from "@/components/article-grid"
import { HeroBanner } from "@/components/hero-banner"
import { HomeBackgroundAnimation } from "@/components/home-background-animation"
import { PopularPosts } from "@/components/popular-posts"
import { EmailSubscription } from "@/components/email-subscription"
import { CalculatorsShowcase } from "@/components/calculators-showcase"
import { TopicHubsShowcase } from "@/components/topic-hubs-showcase"

export const revalidate = 86400
export const dynamic = "force-static"

export const metadata: Metadata = {
    title: "Renohacks.com - DIY Renovation & Interior Design Blog for Home Projects",
    description:
        "Step-by-step photo guides, DIY hacks, free paint and tile calculators, and material reviews for better home renovation planning.",
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
        "interior ideas",
        "design trends",
        "renovation without mistakes",
    ],
    openGraph: {
        title: "Renohacks.com - DIY Renovation & Interior Design Blog for Home Projects",
        description:
            "Step-by-step photo guides, DIY hacks, free paint and tile calculators, and material reviews for better home renovation planning.",
        url: "https://renohacks.com/en",
        siteName: "Renohacks.com",
        locale: "en_US",
        type: "website",
        images: ["/images/og-default.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Renohacks.com - DIY Renovation & Interior Design Blog for Home Projects",
        description:
            "Step-by-step photo guides, DIY hacks, free paint and tile calculators, and material reviews for better home renovation planning.",
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
    const posts = sortPosts(allPosts).filter((p) => p.locale === "en" && !p.draft)

    return (
        <main>
            <HomeBackgroundAnimation />
            <HeroBanner />

            <div className="container mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6">
                <TopicHubsShowcase isEnglish />

                <section id="articles">
                    <h2 className="mb-6 text-center text-3xl font-bold text-balance sm:text-left">
                        Step-by-Step Guides and Practical Tips
                    </h2>
                    <ArticleGrid posts={posts} isEnglish />
                    <PopularPosts posts={posts} locale="en" limit={6} />
                </section>

                <CalculatorsShowcase
                    isEnglish
                    limit={4}
                    title="Popular Renovation Calculators"
                    subtitle="The four tools most likely to help with planning, materials, and lighting."
                    badgeLabel="Calculators"
                />

                <section className="mt-16 sm:mt-20">
                    <EmailSubscription locale="en" variant="default" />
                </section>
            </div>
        </main>
    )
}
