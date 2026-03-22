import { getPageMetadata } from "@/lib/seo"
import { allPosts, type Post } from ".contentlayer/generated"
import { ArticleCard } from "@/components/article-card"
import { Search } from "lucide-react"
import Script from "next/script"

export const metadata = getPageMetadata("/search", {
    title: "Поиск статей | Renohacks",
    description: "Поиск статей о ремонте, дизайне и DIY на Renohacks.com",
    cover: "/images/og-default.png",
    type: "website",
    robots: {
        index: false,
        follow: true,
        googleBot: {
            index: false,
            follow: true,
        },
    },
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
            name: "Поиск",
            item: `${baseUrl}/search`,
        },
    ],
}

interface SearchPageProps {
    searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q } = await searchParams
    const query = q?.toLowerCase().trim() || ""

    let filteredPosts: Post[] = []

    if (query) {
        filteredPosts = allPosts
            .filter((post) => {
                if (post.locale !== "ru" || post.draft) return false
                const searchText = `${post.title} ${post.description || ""} ${post.tags?.join(" ") || ""}`.toLowerCase()
                return searchText.includes(query)
            })
            .sort((a, b) => {
                const ta = a.date ? new Date(a.date).getTime() : 0
                const tb = b.date ? new Date(b.date).getTime() : 0
                return tb - ta
            })
    }

    return (
        <main className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 max-w-7xl">
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <Search className="h-6 w-6 text-primary" />
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                        {query ? `Поиск: "${query}"` : "Поиск статей"}
                    </h1>
                </div>
                {query && (
                    <p className="text-muted-foreground">
                        Найдено статей: <span className="font-semibold text-foreground">{filteredPosts.length}</span>
                    </p>
                )}
                {!query && (
                    <p className="text-muted-foreground">
                        Введите запрос в поисковую строку вверху страницы
                    </p>
                )}
            </div>

            {query && filteredPosts.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post) => (
                        <ArticleCard key={post._id} post={post} />
                    ))}
                </div>
            )}

            {query && filteredPosts.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-lg text-muted-foreground mb-4">
                        По запросу &quot;{query}&quot; ничего не найдено
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Попробуйте изменить запрос или использовать другие ключевые слова
                    </p>
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

