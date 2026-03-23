import type {
    CalculatorPageDictionary,
    CalculatorRelatedCard,
} from "@/dictionaries/calculator-pages"
import { Grid, Layers, Paintbrush, Ruler, ScrollText } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"
import { ShareButton } from "@/components/share-button"

const relatedIcons = {
    grid: Grid,
    scrollText: ScrollText,
    layers: Layers,
    paintbrush: Paintbrush,
    ruler: Ruler,
} as const

function RelatedCard({ card }: { card: CalculatorRelatedCard }) {
    const Icon = relatedIcons[card.icon]

    return (
        <Link
            href={card.href}
            className="group rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
        >
            <div className="flex items-start gap-4">
                <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 shadow-inner ${card.accentClass}`}
                >
                    <Icon className="h-5 w-5" />
                </span>
                <div>
                    <p className="text-base font-semibold text-foreground">{card.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                </div>
            </div>
        </Link>
    )
}

export function CalculatorPageTemplate({
    dictionary,
    widget,
    isEnglish = false,
}: {
    dictionary: CalculatorPageDictionary
    widget: ReactNode
    isEnglish?: boolean
}) {
    return (
        <main className="mx-auto max-w-2xl px-4 py-10">
            <h1 className="mb-4 text-3xl font-bold">{dictionary.hero.title}</h1>
            <p className="mb-8 text-muted-foreground">{dictionary.hero.description}</p>

            {widget}

            <section className="mt-10 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 px-6 py-8 shadow-xl">
                <h2 className="mb-4 text-xl font-semibold">{dictionary.benefits.title}</h2>
                <ul className="space-y-3 text-sm text-muted-foreground">
                    {dictionary.benefits.items.map((item) => (
                        <li key={item.strong}>
                            <span className="font-medium text-foreground">{item.strong}</span> {item.text}
                        </li>
                    ))}
                </ul>
            </section>

            {dictionary.guide ? (
                <section className="mt-10 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 px-6 py-8 shadow-xl">
                    <h2 className="mb-3 text-xl font-semibold text-foreground">{dictionary.guide.title}</h2>
                    <ol className="ml-5 list-decimal space-y-2 text-sm text-muted-foreground">
                        {dictionary.guide.steps.map((step) => (
                            <li key={step}>{step}</li>
                        ))}
                    </ol>
                    {dictionary.guide.tip ? (
                        <p className="mt-3 text-sm text-muted-foreground">{dictionary.guide.tip}</p>
                    ) : null}
                </section>
            ) : null}

            <section className="mt-12">
                <h2 className="mb-4 text-xl font-semibold">{dictionary.faq.title}</h2>
                <div className="space-y-4 text-sm text-muted-foreground">
                    {dictionary.faq.items.map((item) => (
                        <details key={item.question} className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                            <summary className="cursor-pointer font-medium text-foreground">
                                {item.question}
                            </summary>
                            <p className="mt-2">{item.answer}</p>
                        </details>
                    ))}
                </div>
            </section>

            <section className="mt-12">
                <h2 className="mb-4 text-xl font-semibold">{dictionary.related.title}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {dictionary.related.cards.map((card) => (
                        <RelatedCard key={card.href} card={card} />
                    ))}
                </div>
            </section>

            <section className="mt-12 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 p-8 shadow-xl">
                <h2 className="mb-6 text-2xl font-bold text-foreground">{dictionary.shareTitle}</h2>
                <ShareButton
                    url={dictionary.share.url}
                    title={dictionary.share.title}
                    description={dictionary.share.description}
                    isEnglish={isEnglish}
                />
            </section>
        </main>
    )
}
