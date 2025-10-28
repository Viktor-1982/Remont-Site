import Link from "next/link"
import { allPosts } from ".contentlayer/generated"
import { cn } from "@/lib/utils"

interface RelatedPostsProps {
    currentSlug: string
    locale: "ru" | "en"
    limit?: number
}

export function RelatedPosts({ currentSlug, locale, limit = 4 }: RelatedPostsProps) {
    // Получаем все посты того же языка, исключая текущий
    const relatedPosts = allPosts
        .filter(post => post.locale === locale && post.slug !== currentSlug)
        .sort(() => Math.random() - 0.5) // Случайный порядок
        .slice(0, limit)

    if (relatedPosts.length === 0) return null

    const title = locale === "ru" ? "Читайте также" : "Related Articles"
    const readMore = locale === "ru" ? "Читать далее" : "Read more"

    return (
        <aside className="mt-12 p-6 bg-muted/50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <div className="grid gap-4 md:grid-cols-2">
                {relatedPosts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/${locale === "en" ? "en/" : ""}posts/${post.slug}`}
                        className="group block p-4 bg-background rounded-md border hover:border-primary/50 transition-colors"
                    >
                        <h4 className="font-medium text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                            {post.description}
                        </p>
                        <span className="text-xs text-primary font-medium">
                            {readMore} →
                        </span>
                    </Link>
                ))}
            </div>
        </aside>
    )
}
