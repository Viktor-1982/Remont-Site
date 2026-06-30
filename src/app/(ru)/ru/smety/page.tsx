import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import { allPosts } from "contentlayer/generated"
import { ArticleGrid } from "@/components/article-grid"
import Script from "next/script"

export const metadata: Metadata = getPageMetadata("/ru/smety", {
    title: "Сметы ремонта и расчёты | Renohacks",
    description:
        "Готовые сметы на ремонт квартир: материалы, работы, расходы. Реальные примеры бюджетов для разных типов ремонта.",
    cover: "/images/og-default.png",
    type: "website",
})

const baseUrl = "https://renohacks.com"

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: `${baseUrl}/`,
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Сметы",
            item: `${baseUrl}/smety`,
        },
    ],
}

export default function SmetyPage() {
    // Фильтруем только русские статьи со сметами
    const estimates = allPosts.filter(
        (post) =>
            !post.url.startsWith("/en/") &&
            post.tags?.includes("сметы")
    )

    // Сортируем по дате — свежие первыми
    const sortedEstimates = estimates.sort((a, b) => {
        const ta = a.date ? new Date(a.date).getTime() : 0
        const tb = b.date ? new Date(b.date).getTime() : 0
        return tb - ta
    })

    return (
        <main className="container py-12">
            <h1 className="text-3xl font-bold mb-4">💰 Сметы на ремонт</h1>
            <p className="mb-8 text-muted-foreground">
                Готовые сметы и расчёты стоимости ремонта с детализацией по материалам и работам. Реальные примеры из жизни:
            </p>

            {sortedEstimates.length > 0 ? (
                <ArticleGrid posts={sortedEstimates} isEnglish={false} />
            ) : (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Сметы скоро появятся...</p>
                </div>
            )}

            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
        </main>
    )
}
