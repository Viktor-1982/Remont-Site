import type { ToolCard, ToolJourney, ToolScenario, ToolsDictionary } from "@/dictionaries/tools"
import {
    Bath,
    Calculator,
    Grid3X3,
    Layers,
    Lightbulb,
    Paintbrush,
    ReceiptText,
    Palette,
    PaintRoller,
    Ruler,
    ShoppingCart,
    Sparkles,
    Thermometer,
    Wallet,
    LucideIcon,
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

const scenarioIcons: Record<ToolScenario["icon"], LucideIcon> = {
    floors: Layers,
    walls: PaintRoller,
    bathroom: Bath,
    budget: ReceiptText,
}

const scenarioAccentClasses: Record<ToolScenario["icon"], string> = {
    floors: "from-emerald-500/15 via-lime-400/10 to-teal-400/10 text-emerald-700 dark:text-emerald-300",
    walls: "from-amber-500/15 via-orange-400/10 to-rose-400/10 text-amber-700 dark:text-amber-300",
    bathroom: "from-sky-500/15 via-cyan-400/10 to-blue-400/10 text-sky-700 dark:text-sky-300",
    budget: "from-violet-500/15 via-fuchsia-400/10 to-rose-400/10 text-violet-700 dark:text-violet-300",
}

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

function ScenarioCard({ item, ctaLabel }: { item: ToolScenario; ctaLabel: string }) {
    const Icon = scenarioIcons[item.icon]
    const accentClass = scenarioAccentClasses[item.icon]

    return (
        <Link
            href={item.href}
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/95 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-2xl"
        >
            <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentClass.split(" text-")[0]} opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
                aria-hidden
            />
            <div className="flex items-start justify-between gap-4">
                <div className="relative z-10">
                    <span
                        className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/15 bg-background/85 shadow-sm ${accentClass}`}
                    >
                        <Icon className="h-5 w-5" />
                    </span>
                    <h2 className="text-base font-semibold text-foreground sm:text-lg">{item.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
                <span className="relative z-10 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-medium text-primary">
                    {ctaLabel}
                </span>
            </div>

            <div className="relative z-10 mt-4 flex flex-wrap gap-2">
                {item.tools.map((tool) => (
                    <span
                        key={tool}
                        className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                        {tool}
                    </span>
                ))}
            </div>
        </Link>
    )
}

function JourneyCard({ item }: { item: ToolJourney }) {
    return (
        <div className="rounded-2xl border border-border/70 bg-card/95 p-5 shadow-sm">
            <h3 className="text-base font-semibold text-foreground sm:text-lg">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            <ol className="mt-4 space-y-2 text-sm text-muted-foreground">
                {item.steps.map((step, index) => (
                    <li key={`${item.title}-${step.href}`} className="flex items-start gap-3">
                        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {index + 1}
                        </span>
                        <Link
                            href={step.href}
                            className="pt-0.5 font-medium text-foreground transition-colors hover:text-primary hover:underline"
                        >
                            {step.label}
                        </Link>
                    </li>
                ))}
            </ol>
        </div>
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

            <section className="mt-10 sm:mt-14">
                <div className="mb-5">
                    <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{dictionary.scenarios.title}</h2>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                    {dictionary.scenarios.items.map((item) => (
                        <ScenarioCard key={item.title} item={item} ctaLabel={dictionary.ctaLabel} />
                    ))}
                </div>
            </section>

            <section className="mt-10 sm:mt-14">
                <div className="mb-5">
                    <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{dictionary.journeys.title}</h2>
                </div>
                <div className="grid gap-4 lg:grid-cols-3">
                    {dictionary.journeys.items.map((item) => (
                        <JourneyCard key={item.title} item={item} />
                    ))}
                </div>
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
