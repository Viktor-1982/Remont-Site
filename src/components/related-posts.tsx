import Link from "next/link"
import { allPosts } from ".contentlayer/generated"

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
        <aside className="mt-12 p-6 bg-card/80 dark:bg-muted/30 rounded-lg border border-border/50">
            <h3 className="text-xl font-semibold mb-4 text-foreground">{title}</h3>
            <div className="grid gap-4 md:grid-cols-2">
                {relatedPosts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/${locale === "en" ? "en/" : ""}posts/${post.slug}`}
                        className="group block p-4 bg-card dark:bg-card/80 rounded-md border-2 border-border/60 dark:border-border/40 hover:border-primary/50 dark:hover:border-primary/40 hover:shadow-md transition-all"
                    >
                        <h4 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors line-clamp-2 text-foreground">
                            {post.title}
                        </h4>
                        <p className="text-sm text-foreground/80 dark:text-foreground/70 line-clamp-2 mb-2">
                            {post.description}
                        </p>
                        <span className="text-sm text-primary font-semibold">
                            {readMore} →
                        </span>
                    </Link>
                ))}
            </div>
        </aside>
    )
}
