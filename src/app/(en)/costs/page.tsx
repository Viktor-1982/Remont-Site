import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import { allPosts } from "contentlayer/generated"
import { ArticleGrid } from "@/components/article-grid"
import { Breadcrumbs } from "@/components/breadcrumbs"

export const metadata: Metadata = getPageMetadata("/costs", {
    title: "Renovation Cost Estimates",
    description:
        "Explore real renovation cost estimates, budgets, and detailed material and labor breakdowns. Learn how to plan your home remodeling costs without mistakes!",
    cover: "/images/og-default.png",
    type: "website",
})

const baseUrl = "https://renohacks.com"

const COST_TAGS_EN = new Set([
    "estimates",
    "estimate",
    "budget",
    "budgeting",
    "renovation budget",
    "budget renovation",
    "costs",
    "renovation costs",
])

const COST_SLUGS_EN = new Set([
    "home-renovation-costs-2026",
    "renovation-mistakes-2026",
])

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Cost Estimates",
            item: `${baseUrl}/costs`,
        },
    ],
}

export default function CostsPage() {
    // Фильтруем только английские статьи со сметами и бюджетом
    const estimates = allPosts.filter(
        (post) =>
            !post.draft &&
            post.locale === "en" &&
            (COST_SLUGS_EN.has(post.slug) ||
                post.tags?.some((tag) => COST_TAGS_EN.has(tag.toLowerCase())))
    )

    // Сортируем по дате — свежие первыми
    const sortedEstimates = [...estimates].sort((a, b) => {
        const ta = a.date ? new Date(a.date).getTime() : 0
        const tb = b.date ? new Date(b.date).getTime() : 0
        return tb - ta
    })

    return (
        <div className="container py-12">
            <Breadcrumbs
                isEnglish={true}
                items={[
                    { label: "Home", href: "/" },
                    { label: "Cost Estimates", href: "/costs" },
                ]}
            />
            <h1 className="text-3xl font-bold mb-4">💰 Renovation Cost Estimates</h1>
            <p className="mb-8 text-muted-foreground">
                Ready-made cost estimates and renovation budgets with detailed breakdown of materials and labor. Real examples:
            </p>

            {sortedEstimates.length > 0 ? (
                <ArticleGrid posts={sortedEstimates} isEnglish={true} />
            ) : (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Estimates coming soon...</p>
                </div>
            )}

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
        </div>
    )
}
