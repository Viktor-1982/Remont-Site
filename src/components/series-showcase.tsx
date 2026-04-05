import Link from "next/link"
import type { Post } from "contentlayer/generated"
import { ArrowRight, Bath, ChefHat, AlertTriangle, Wallet } from "lucide-react"
import { getArticleSeriesOverview, type ArticleSeriesKey } from "@/lib/article-series"
import { cn } from "@/lib/utils"

const iconMap = {
    chefHat: ChefHat,
    bath: Bath,
    wallet: Wallet,
    alertTriangle: AlertTriangle,
} as const

export function SeriesShowcase({
    posts,
    isEnglish = false,
    title,
    description,
    seriesKeys,
    showAllLink = false,
    className,
}: {
    posts: Post[]
    isEnglish?: boolean
    title?: string
    description?: string
    seriesKeys?: ArticleSeriesKey[]
    showAllLink?: boolean
    className?: string
}) {
    const locale = isEnglish ? "en" : "ru"
    const items = getArticleSeriesOverview(posts, locale, seriesKeys).filter((item) => item.count > 0)
    const allSeriesHref = isEnglish ? "/en/series" : "/series"

    if (items.length === 0) {
        return null
    }

    return (
        <section className={cn("space-y-6", className)}>
            {title || description || showAllLink ? (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        {title ? (
                            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                {title}
                            </h2>
                        ) : null}
                        {description ? (
                            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                                {description}
                            </p>
                        ) : null}
                    </div>
                    {showAllLink ? (
                        <Link
                            href={allSeriesHref}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
                        >
                            {isEnglish ? "All series" : "Все серии"}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    ) : null}
                </div>
            ) : null}

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {items.map((item) => {
                    const Icon = iconMap[item.icon]

                    return (
                        <Link
                            key={item.key}
                            href={item.path}
                            className="group rounded-[24px] border border-border/60 bg-card/95 p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <span
                                    className={cn(
                                        "inline-flex h-11 w-11 items-center justify-center rounded-2xl border",
                                        item.className
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                </span>
                                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                                    {item.count} {isEnglish ? (item.count === 1 ? "article" : "articles") : item.count === 1 ? "статья" : item.count < 5 ? "статьи" : "статей"}
                                </span>
                            </div>

                            <div className="mt-4">
                                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                                    {item.eyebrow}
                                </div>
                                <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground">
                                    {item.label}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>

                            {item.latestPost ? (
                                <div className="mt-5 rounded-2xl border border-border/60 bg-background/85 p-4">
                                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                                        {isEnglish ? "Latest in series" : "Последнее в серии"}
                                    </div>
                                    <div className="mt-2 line-clamp-2 text-sm font-medium text-foreground">
                                        {item.latestPost.title}
                                    </div>
                                </div>
                            ) : null}

                            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                                {isEnglish ? "Open series" : "Открыть серию"}
                                <ArrowRight className="h-4 w-4" />
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
