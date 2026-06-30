import type { Post } from "contentlayer/generated"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { ArticleGrid } from "@/components/article-grid"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { EmailSubscription } from "@/components/email-subscription"
import { SeriesShowcase } from "@/components/series-showcase"
import { getAllArticleSeriesKeys, type ArticleSeriesMeta } from "@/lib/article-series"

export function ArticleSeriesPage({
    meta,
    posts,
    allPosts,
    isEnglish = false,
}: {
    meta: ArticleSeriesMeta
    posts: Post[]
    allPosts: Post[]
    isEnglish?: boolean
}) {
    const homeHref = isEnglish ? "/" : "/ru"
    const overviewHref = isEnglish ? "/series" : "/ru/series"
    const locale = isEnglish ? "en" : "ru"

    return (
        <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 md:py-16">
            <Breadcrumbs
                items={[
                    { label: isEnglish ? "Home" : "Главная", href: homeHref },
                    { label: isEnglish ? "Series" : "Серии", href: overviewHref },
                    { label: meta.label, href: meta.path },
                ]}
                isEnglish={isEnglish}
            />

            <section className="overflow-hidden rounded-[28px] border border-border/60 bg-card/95 px-5 py-8 shadow-soft sm:px-7 sm:py-10 lg:px-10">
                <div className="max-w-4xl">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                        {meta.eyebrow}
                    </div>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                        {meta.title}
                    </h1>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {meta.description}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="rounded-full border border-border/60 bg-background/80 px-3 py-1.5 font-medium">
                            {posts.length} {isEnglish ? (posts.length === 1 ? "article" : "articles") : posts.length === 1 ? "статья" : posts.length < 5 ? "статьи" : "статей"}
                        </span>
                        <Link
                            href={overviewHref}
                            className="inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
                        >
                            {isEnglish ? "See all series" : "Смотреть все серии"}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mt-12">
                <ArticleGrid posts={posts} isEnglish={isEnglish} />
            </section>

            <SeriesShowcase
                posts={allPosts}
                isEnglish={isEnglish}
                title={isEnglish ? "More editorial series" : "Другие серии"}
                seriesKeys={getAllArticleSeriesKeys().filter((key) => key !== meta.key)}
                className="mt-14"
            />

            <section className="mx-auto mt-14 max-w-4xl">
                <EmailSubscription locale={locale} variant="compact" />
            </section>
        </main>
    )
}
