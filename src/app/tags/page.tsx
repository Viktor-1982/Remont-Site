import { getPageMetadata } from "@/lib/seo"
import { allPosts } from ".contentlayer/generated"
import { TagCloud } from "@/components/tag-cloud"

export const metadata = getPageMetadata("/tags", {
    title: "Облако тегов — все теги статей | Renohacks.com",
    description: "Визуальное отображение всех тегов статей на Renohacks.com. Размер тега показывает количество статей. Навигация по темам ремонта, дизайна и DIY.",
    cover: "/images/og-default.png",
    type: "website",
})

export const revalidate = 86400
export const dynamic = "force-static"

export default function TagsPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-6xl">
            <header className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
                    Облако тегов
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Все теги статей на сайте. Размер тега показывает количество статей с этим тегом.
                </p>
            </header>

            <TagCloud posts={allPosts} locale="ru" />
        </div>
    )
}

