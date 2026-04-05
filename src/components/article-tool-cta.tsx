import type { Post } from "contentlayer/generated"
import {
    ArrowRight,
    Grid3X3,
    Hammer,
    Layers,
    Lightbulb,
    Palette,
    Paintbrush,
    Ruler,
    Thermometer,
    Wallet,
    Wallpaper,
    Wind,
} from "lucide-react"
import Link from "next/link"
import {
    getArticleTools,
    type ArticleHubCard,
    type ArticleToolCard,
    type ArticleToolIcon,
    type ArticleToolLocale,
} from "@/lib/article-tools"

const iconMap: Record<ArticleToolIcon, typeof Paintbrush> = {
    paintbrush: Paintbrush,
    wallpaper: Wallpaper,
    grid3x3: Grid3X3,
    layers: Layers,
    ruler: Ruler,
    hammer: Hammer,
    thermometer: Thermometer,
    wind: Wind,
    lightbulb: Lightbulb,
    wallet: Wallet,
    palette: Palette,
}

function SecondaryCard({
    card,
    label,
}: {
    card: ArticleToolCard | ArticleHubCard
    label: string
}) {
    const Icon = iconMap[card.icon]

    return (
        <Link
            href={card.href}
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/95 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl"
        >
            <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
                aria-hidden
            />
            <div className="relative z-10">
                <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/90">
                        {label}
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-background/85 text-primary shadow-sm">
                        <Icon className="h-4 w-4" />
                    </span>
                </div>

                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                    {card.badge}
                </div>
                <h3 className="mb-2 text-base font-semibold text-foreground">{card.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                    {card.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                </span>
            </div>
        </Link>
    )
}

export function ArticleToolCta({
    post,
    locale,
}: {
    post: Post
    locale: ArticleToolLocale
}) {
    const section = getArticleTools(post, locale)
    const PrimaryIcon = iconMap[section.primary.icon]

    return (
        <section className="mt-10 sm:mt-12">
            <div className="relative overflow-hidden rounded-[28px] border border-border/60 bg-card/95 p-5 shadow-soft sm:p-7 lg:p-8">
                <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,114,22,0.12),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_36%)]"
                    aria-hidden
                />

                <div className="relative z-10 mb-6 max-w-2xl">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/90">
                        <span>{section.eyebrow}</span>
                    </div>
                    <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        {section.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {section.description}
                    </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                    <Link
                        href={section.primary.href}
                        className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.08] via-card to-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-2xl sm:p-7"
                    >
                        <div
                            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${section.primary.gradient} opacity-90 transition-opacity duration-300 group-hover:opacity-100`}
                            aria-hidden
                        />
                        <div className="relative z-10 flex h-full flex-col">
                            <div className="mb-5 flex items-center justify-between gap-4">
                                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/90 shadow-sm">
                                    {section.primaryLabel}
                                </span>
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-background/90 text-primary shadow-sm">
                                    <PrimaryIcon className="h-5 w-5" />
                                </span>
                            </div>

                            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                                {section.primary.badge}
                            </div>
                            <h3 className="mb-3 text-2xl font-bold tracking-tight text-foreground">
                                {section.primary.title}
                            </h3>
                            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                                {section.primary.description}
                            </p>

                            <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all group-hover:gap-3 group-hover:shadow-xl group-hover:shadow-primary/25">
                                {section.primary.ctaLabel}
                                <ArrowRight className="h-4 w-4" />
                            </div>
                        </div>
                    </Link>

                    <div className="grid gap-4">
                        {section.hub ? <SecondaryCard card={section.hub} label={section.hubLabel} /> : null}
                        {section.secondary.map((card) => (
                            <SecondaryCard key={card.id} card={card} label={section.secondaryLabel} />
                        ))}
                    </div>
                </div>

                <div className="relative z-10 mt-6 grid gap-4 border-t border-border/60 pt-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border/60 bg-background/80 px-4 py-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            {section.trust.updatedLabel}
                        </div>
                        <div className="mt-2 text-sm font-semibold text-foreground sm:text-base">
                            {section.trust.updatedValue}
                        </div>
                    </div>
                    <div className="rounded-2xl border border-border/60 bg-background/80 px-4 py-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            {section.trust.basisLabel}
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {section.trust.basisValue}
                        </p>
                    </div>
                </div>
                <div className="relative z-10 mt-4">
                    <Link
                        href={section.trust.pageHref}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80"
                    >
                        {section.trust.pageLabel}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
