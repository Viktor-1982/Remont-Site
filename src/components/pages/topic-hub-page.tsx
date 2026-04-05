import type { Post } from "contentlayer/generated"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { ArrowRight, Calculator, Grid, Home, Lightbulb, Sparkles, Wrench } from "lucide-react"
import { ArticleCard } from "@/components/article-card"
import { ArticleSeriesBadge } from "@/components/article-series-badge"
import { ArticleRubricBadge } from "@/components/article-rubric-badge"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { EmailSubscription } from "@/components/email-subscription"
import { FAQSection } from "@/components/widgets/faq-section"
import type { TopicHubDictionary } from "@/lib/topic-hub"

const baseUrl = "https://renohacks.com"

const featureIconMap = {
    lightbulb: Lightbulb,
    home: Home,
    calculator: Calculator,
    grid: Grid,
    wrench: Wrench,
} as const

function formatPostDate(date: string | undefined, isEnglish: boolean) {
    if (!date) return null

    return new Intl.DateTimeFormat(isEnglish ? "en-US" : "ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date))
}

export function TopicHubPage({
    dictionary,
    posts,
    isEnglish = false,
}: {
    dictionary: TopicHubDictionary
    posts: Post[]
    isEnglish?: boolean
}) {
    const [featuredPost, ...otherPosts] = posts
    const canonical = `${baseUrl}${dictionary.path}`
    const locale = isEnglish ? "en" : "ru"
    const CalculatorIcon = featureIconMap[dictionary.calculator.icon]

    const breadcrumbItems = [
        { label: isEnglish ? "Home" : "Главная", href: isEnglish ? "/en" : "/" },
        { label: dictionary.breadcrumbLabel, href: dictionary.path },
    ]

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: `${baseUrl}${item.href}`,
        })),
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: dictionary.faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    }

    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: dictionary.title,
        description: dictionary.description,
        url: canonical,
        inLanguage: isEnglish ? "en-US" : "ru-RU",
        mainEntity: {
            "@type": "ItemList",
            itemListElement: posts.map((post, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `${baseUrl}${post.url}`,
                name: post.title,
            })),
        },
    }

    return (
        <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 md:py-16">
            <Breadcrumbs items={breadcrumbItems} isEnglish={isEnglish} />

            <section className="relative overflow-hidden rounded-[28px] border border-border/60 bg-card/95 px-5 py-8 shadow-soft sm:px-7 sm:py-10 lg:px-10">
                <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_36%)]"
                    aria-hidden
                />
                <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-start">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/90 shadow-sm">
                            <Sparkles className="h-3.5 w-3.5" />
                            {dictionary.eyebrow}
                        </div>
                        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                            {dictionary.title}
                        </h1>
                        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            {dictionary.description}
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            {dictionary.featureCards.map((card) => {
                                const Icon = featureIconMap[card.icon]
                                return (
                                    <div
                                        key={card.title}
                                        className="rounded-2xl border border-border/60 bg-background/80 p-4 shadow-sm"
                                    >
                                        <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
                                            <Icon className="h-4 w-4" />
                                        </span>
                                        <h2 className="text-base font-semibold text-foreground">{card.title}</h2>
                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                            {card.description}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-primary/20 bg-gradient-to-br from-primary/[0.08] via-background to-amber-500/[0.08] p-6 shadow-lg">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/90">
                            <CalculatorIcon className="h-3.5 w-3.5" />
                            {dictionary.calculator.eyebrow}
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">
                            {dictionary.calculator.title}
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                            {dictionary.calculator.description}
                        </p>
                        <Link
                            href={dictionary.calculator.href}
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:gap-3 hover:shadow-xl hover:shadow-primary/25"
                        >
                            {dictionary.calculator.buttonLabel}
                            <ArrowRight className="h-4 w-4" />
                        </Link>

                        {dictionary.relatedLinks?.length ? (
                            <div className="mt-6 border-t border-border/60 pt-4">
                                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                                    {dictionary.relatedTitle}
                                </div>
                                <div className="mt-4 space-y-3">
                                    {dictionary.relatedLinks.map((item) => {
                                        const Icon = featureIconMap[item.icon]

                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-background/85 px-4 py-3 transition-all hover:border-primary/30 hover:bg-background"
                                            >
                                                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
                                                    <Icon className="h-4 w-4" />
                                                </span>
                                                <span className="min-w-0 flex-1">
                                                    <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                                        {item.title}
                                                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                                                    </span>
                                                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                                                        {item.description}
                                                    </span>
                                                </span>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </section>

            {featuredPost ? (
                <section className="mt-12 sm:mt-14">
                    <div className="mb-6">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                            {dictionary.featuredLabel}
                        </div>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                            {dictionary.featuredIntro}
                        </p>
                    </div>

                    <Link
                        href={featuredPost.url}
                        className="group grid gap-6 overflow-hidden rounded-[28px] border border-border/60 bg-card/95 p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:p-5"
                    >
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-muted">
                            {featuredPost.cover ? (
                                <Image
                                    src={featuredPost.cover}
                                    alt={featuredPost.description || featuredPost.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            ) : null}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </div>

                        <div className="flex min-w-0 flex-col justify-center py-1">
                            <div className="mb-4 flex flex-wrap items-center gap-3">
                                {featuredPost.series || featuredPost.rubric ? (
                                    <>
                                        <ArticleSeriesBadge series={featuredPost.series} isEnglish={isEnglish} />
                                        <ArticleRubricBadge rubric={featuredPost.rubric} isEnglish={isEnglish} />
                                    </>
                                ) : null}
                                <span className="text-xs font-medium text-muted-foreground">
                                    {formatPostDate(featuredPost.date, isEnglish)}
                                    {featuredPost.readingTime ? ` / ${featuredPost.readingTime}` : ""}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
                                {featuredPost.title}
                            </h2>
                            {featuredPost.description ? (
                                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                    {featuredPost.description}
                                </p>
                            ) : null}
                            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                                {isEnglish ? "Read article" : "Читать статью"}
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        </div>
                    </Link>
                </section>
            ) : null}

            {otherPosts.length > 0 ? (
                <section className="mt-12 sm:mt-14">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            {dictionary.articlesTitle}
                        </h2>
                        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                            {dictionary.articlesDescription}
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8">
                        {otherPosts.map((post) => (
                            <ArticleCard key={`${post.locale}-${post.slug}`} post={post} />
                        ))}
                    </div>
                </section>
            ) : null}

            <section className="mt-12 sm:mt-14">
                <FAQSection
                    items={dictionary.faqs}
                    title={dictionary.faqTitle}
                    isEnglish={isEnglish}
                    searchable={false}
                />
            </section>

            <section className="mx-auto mt-12 max-w-4xl sm:mt-16">
                <EmailSubscription locale={locale} variant="compact" />
            </section>

            <Script
                id={`breadcrumb-schema-${locale}-${dictionary.key}`}
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Script
                id={`faq-schema-${locale}-${dictionary.key}`}
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Script
                id={`collection-schema-${locale}-${dictionary.key}`}
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
            />
        </main>
    )
}
