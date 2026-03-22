import { getPageMetadata } from "@/lib/seo"
import { allPosts, type Post } from ".contentlayer/generated"
import { ArticleCard } from "@/components/article-card"
import { Search } from "lucide-react"
import Script from "next/script"

export const metadata = getPageMetadata("/en/search", {
    title: "Search Articles | Renohacks",
    description: "Search articles about renovation, design and DIY on Renohacks.com",
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
            name: "Home",
            item: `${baseUrl}/en`,
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Search",
            item: `${baseUrl}/en/search`,
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
                if (post.locale !== "en" || post.draft) return false
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
                        {query ? `Search: "${query}"` : "Search Articles"}
                    </h1>
                </div>
                {query && (
                    <p className="text-muted-foreground">
                        Found articles: <span className="font-semibold text-foreground">{filteredPosts.length}</span>
                    </p>
                )}
                {!query && (
                    <p className="text-muted-foreground">
                        Enter a query in the search bar at the top of the page
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
                        No results found for &quot;{query}&quot;
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Try changing your query or using different keywords
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

