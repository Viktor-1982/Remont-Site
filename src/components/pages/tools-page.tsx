import type { ToolCard, ToolsDictionary } from "@/dictionaries/tools"
import {
    Calculator,
    Grid3X3,
    Layers,
    Lightbulb,
    Paintbrush,
    Palette,
    Ruler,
    ShoppingCart,
    Sparkles,
    Thermometer,
    Wallet,
    Wallpaper,
    Wind,
} from "lucide-react"
import Link from "next/link"
import Script from "next/script"

const baseUrl = "https://renohacks.com"

const toolIcons = {
    paintbrush: Paintbrush,
    wallpaper: Wallpaper,
    grid3x3: Grid3X3,
    layers: Layers,
    ruler: Ruler,
    thermometer: Thermometer,
    wind: Wind,
    lightbulb: Lightbulb,
    wallet: Wallet,
    palette: Palette,
    sparkles: Sparkles,
    shoppingCart: ShoppingCart,
} as const

function getBreadcrumbSchema(dictionary: ToolsDictionary) {
    const homePath = dictionary.breadcrumb.pagePath.startsWith("/en") ? "/en" : "/"

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: dictionary.breadcrumb.homeLabel,
                item: `${baseUrl}${homePath}`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: dictionary.breadcrumb.pageLabel,
                item: `${baseUrl}${dictionary.breadcrumb.pagePath}`,
            },
        ],
    }
}

function ToolCardLink({ card, ctaLabel }: { card: ToolCard; ctaLabel: string }) {
    const Icon = toolIcons[card.icon]

    return (
        <Link
            href={card.href}
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/95 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-2xl sm:p-6"
        >
            <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
                aria-hidden
            />
            <div className="relative z-10 flex h-full flex-col">
                <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-background/80 text-lg">
                        {card.emoji}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
                        <Icon className="h-3.5 w-3.5" />
                        {card.badge}
                    </span>
                </div>

                <h2 className="mb-2 text-base font-semibold text-foreground sm:text-lg">{card.label}</h2>
                <p className="flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{card.desc}</p>

                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary transition-all group-hover:gap-3">
                    {ctaLabel}
                    <span className="translate-y-[1px]">→</span>
                </span>
            </div>
        </Link>
    )
}

export function ToolsPageTemplate({ dictionary }: { dictionary: ToolsDictionary }) {
    const breadcrumbSchema = getBreadcrumbSchema(dictionary)

    return (
        <main className="container mx-auto px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <section className="mb-10 sm:mb-14">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                    <Calculator className="h-3.5 w-3.5" />
                    <span>{dictionary.hero.badge}</span>
                </div>
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {dictionary.hero.title}
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {dictionary.hero.description}
                </p>
            </section>

            <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {dictionary.cards.map((card) => (
                    <ToolCardLink key={card.href} card={card} ctaLabel={dictionary.ctaLabel} />
                ))}
            </section>

            <section className="mt-10 rounded-2xl border border-border/60 bg-card/95 p-5 shadow-sm sm:mt-14 sm:p-6">
                <h2 className="mb-2 text-base font-semibold sm:text-lg">{dictionary.explainer.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                    {dictionary.explainer.description}
                </p>
            </section>

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
