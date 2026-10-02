import type { Metadata } from "next"
import { allPosts } from ".contentlayer/generated"
import { sortPosts } from "@/lib/utils"
import { ArticleGrid } from "@/components/article-grid"
import { HeroBanner } from "@/components/hero-banner"
import { HomeBackgroundAnimation } from "@/components/home-background-animation"
import { PopularPosts } from "@/components/popular-posts"
import { EmailSubscription } from "@/components/email-subscription"
import { CalculatorsShowcase } from "@/components/calculators-showcase"
import { SeriesShowcase } from "@/components/series-showcase"
import { TopicHubsShowcase } from "@/components/topic-hubs-showcase"
import { LatestArticlesCarousel } from "@/components/latest-articles-carousel"

export const revalidate = 86400
export const dynamic = "force-static"

export const metadata: Metadata = {
    title: "DIY Renovation & Design Blog | Renohacks",
    description:
        "Step-by-step photo guides, DIY hacks, and online calculators for paint, tile, and budgeting. Plan your home renovation project without mistakes!",
    keywords: [
        "DIY renovation",
        "home improvement",
        "interior design",
        "apartment renovation",
        "renovation guides",
        "renovation tools",
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
        title: "DIY Renovation & Design Blog | Renohacks",
        description:
            "Step-by-step photo guides, DIY hacks, and online calculators for paint, tile, and budgeting. Plan your home renovation project without mistakes!",
        url: "https://renohacks.com",
        siteName: "Renohacks",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "https://renohacks.com/images/og-default.png",
                width: 1200,
                height: 630,
                alt: "Renohacks - DIY Renovation & Design Blog",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "DIY Renovation & Design Blog | Renohacks",
        description:
            "Step-by-step photo guides, DIY hacks, and online calculators for paint, tile, and budgeting. Plan your home renovation project without mistakes!",
        images: ["https://renohacks.com/images/og-default.png"],
    },
    alternates: {
        canonical: "https://renohacks.com",
        languages: {
            ru: "https://renohacks.com/ru",
            en: "https://renohacks.com",
            "x-default": "https://renohacks.com",
        },
    },
}

export default function HomePageEn() {
    const posts = sortPosts(allPosts).filter((p) => p.locale === "en" && !p.draft)

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://renohacks.com/#website",
        "name": "Renohacks",
        "url": "https://renohacks.com",
        "description": "Step-by-step photo guides, DIY hacks, and online calculators for home renovation.",
        "inLanguage": ["en", "ru"],
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://renohacks.com/search?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
        },
    }

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://renohacks.com/#organization",
        "name": "Renohacks",
        "url": "https://renohacks.com",
        "logo": {
            "@type": "ImageObject",
            "url": "https://renohacks.com/icon.svg",
            "width": 512,
            "height": 512,
        },
        "sameAs": [],
        "description": "Independent home renovation & DIY blog with photo guides, calculators, and material reviews.",
    }

    return (
        <main>
            <HomeBackgroundAnimation />
            <HeroBanner />

            <div className="container mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6">
                <TopicHubsShowcase isEnglish />
                <LatestArticlesCarousel posts={posts} isEnglish />
                
                <CalculatorsShowcase
                    isEnglish
                    limit={4}
                    title="Popular Renovation Tools"
                    subtitle="The four tools most likely to help with planning, materials, and lighting."
                    badgeLabel="Tools"
                />

                <SeriesShowcase
                    posts={posts}
                    isEnglish
                    title="Editorial series"
                    description="Repeatable formats around kitchens, bathrooms, renovation budgeting, and ways to avoid rework."
                    showAllLink
                />

                <section id="articles">
                    <h2 className="mb-6 text-center text-3xl font-bold text-balance sm:text-left">
                        Step-by-Step Guides and Practical Tips
                    </h2>
                    <ArticleGrid posts={posts} isEnglish />
                    <PopularPosts posts={posts} locale="en" limit={6} />
                </section>

                <section className="mt-16 sm:mt-20">
                    <EmailSubscription locale="en" variant="default" />
                </section>
            </div>

            {/* WebSite schema — enables Google Sitelinks Search Box */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            {/* Organization schema — enables Google Knowledge Panel */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
        </main>
    )
}
