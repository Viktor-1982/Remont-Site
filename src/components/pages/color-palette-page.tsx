import type { ColorPalettePageDictionary } from "@/dictionaries/color-palette-page"
import { Layers, Paintbrush } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"
import { ShareButton } from "@/components/share-button"

const resourceIcons = {
    paintbrush: Paintbrush,
    layers: Layers,
} as const

function StructuredDataScripts({ items }: { items: ColorPalettePageDictionary["structuredData"] }) {
    return (
        <>
            {items.map((item) => (
                <script
                    key={item.id}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(item.data) }}
                />
            ))}
        </>
    )
}

function ResourceCard({
    card,
    ctaLabel,
}: {
    card: ColorPalettePageDictionary["resources"]["cards"][number]
    ctaLabel: string
}) {
    const Icon = resourceIcons[card.icon]
    const accentText = card.accent.split(" ").find((item) => item.startsWith("text-")) ?? "text-primary"

    return (
        <Link
            href={card.href}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
        >
            <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.accent} opacity-0 transition group-hover:opacity-100`}
            />
            <div className="relative z-10 flex items-start gap-4">
                <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner ${accentText}`}
                >
                    <Icon className="h-5 w-5" />
                </span>
                <div>
                    <p className="text-base font-semibold text-foreground">{card.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                </div>
            </div>
            <span className="relative z-10 mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                {ctaLabel}
                <span className="transition group-hover:translate-x-1">→</span>
            </span>
        </Link>
    )
}

export function ColorPalettePageTemplate({
    dictionary,
    widget,
    isEnglish = false,
}: {
    dictionary: ColorPalettePageDictionary
    widget: ReactNode
    isEnglish?: boolean
}) {
    return (
        <main className="mx-auto max-w-4xl px-4 py-10">
            <StructuredDataScripts items={dictionary.structuredData} />

            <header className="mb-8">
                <h1 className="mb-4 text-3xl font-bold">{dictionary.hero.title}</h1>
                <p className="text-muted-foreground">{dictionary.hero.description}</p>
            </header>

            {widget}

            <section className="relative mt-10 overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 px-6 py-8 shadow-xl">
                <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative z-10">
                    <h2 className="mb-4 text-xl font-semibold text-foreground">{dictionary.guide.title}</h2>
                    <ol className="ml-5 list-decimal space-y-2 text-sm text-muted-foreground">
                        {dictionary.guide.steps.map((step) => (
                            <li key={step}>{step}</li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="relative mt-10 overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 px-6 py-8 shadow-xl">
                <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative z-10">
                    <h2 className="mb-4 text-xl font-semibold text-foreground">{dictionary.schemes.title}</h2>
                    <div className="space-y-4 text-sm text-muted-foreground">
                        {dictionary.schemes.items.map((item) => (
                            <div key={item.title}>
                                <h3 className="mb-1 font-semibold text-foreground">{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {dictionary.nextSteps ? (
                <section className="mt-10">
                    <h2 className="text-xl font-semibold text-foreground">{dictionary.nextSteps.title}</h2>
                    {dictionary.nextSteps.description ? (
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {dictionary.nextSteps.description}
                        </p>
                    ) : null}
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {dictionary.nextSteps.cards.map((card) => (
                            <ResourceCard key={`next-${card.href}`} card={card} ctaLabel={dictionary.nextSteps!.ctaLabel} />
                        ))}
                    </div>
                </section>
            ) : null}

            <section className="mt-12">
                <h2 className="mb-4 text-xl font-semibold">{dictionary.resources.title}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {dictionary.resources.cards.map((card) => (
                        <ResourceCard key={card.href} card={card} ctaLabel={dictionary.resources.ctaLabel} />
                    ))}
                </div>
            </section>

            <section className="relative mt-12 overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 p-8 shadow-xl">
                <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative z-10">
                    <h2 className="mb-6 text-2xl font-bold text-foreground">{dictionary.share.title}</h2>
                    <ShareButton
                        url={dictionary.share.url}
                        title={dictionary.share.buttonTitle}
                        description={dictionary.share.description}
                        isEnglish={isEnglish}
                    />
                </div>
            </section>
        </main>
    )
}
