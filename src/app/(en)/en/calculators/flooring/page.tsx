import { FlooringCalculator } from "@/components/widgets/flooring-calculator"
import { ShareButton } from "@/components/share-button"
import { getPageMetadata } from "@/lib/seo"
import { Grid3X3, Ruler } from "lucide-react"
import Link from "next/link"

export const metadata = getPageMetadata("/en/calculators/flooring", {
    title: "Flooring Calculator - packs, waste and underlay | Renohacks",
    description:
        "Online flooring calculator for laminate, vinyl and engineered wood: area, packs, underlay and cutting waste.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function FlooringCalculatorPageEn() {
    return (
        <main className="mx-auto max-w-2xl px-4 py-10">
            <h1 className="mb-4 text-3xl font-bold">Flooring Calculator</h1>
            <p className="mb-8 text-muted-foreground">
                Calculate laminate, vinyl or engineered wood flooring by room area, layout pattern,
                pack coverage and cutting waste. Built for real renovation planning.
            </p>

            <FlooringCalculator />

            <section className="mt-10 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 px-6 py-8 shadow-xl">
                <h2 className="mb-4 text-xl font-semibold">What this calculator covers</h2>
                <ul className="space-y-3 text-sm text-muted-foreground">
                    <li><span className="font-medium text-foreground">Net floor area.</span> You can subtract fixed built-ins that will not receive flooring.</li>
                    <li><span className="font-medium text-foreground">Layout-specific waste.</span> Straight, diagonal and herringbone layouts use different base waste rates.</li>
                    <li><span className="font-medium text-foreground">Real pack math.</span> The result includes packs and plank count, not just square footage.</li>
                    <li><span className="font-medium text-foreground">Underlay and cost.</span> You can estimate underlay and budget in the same pass.</li>
                </ul>
            </section>

            <section className="mt-12">
                <h2 className="mb-4 text-xl font-semibold">FAQs</h2>
                <div className="space-y-4 text-sm text-muted-foreground">
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            How much waste should I allow for laminate or vinyl?
                        </summary>
                        <p className="mt-2">
                            Straight layouts usually need less waste than diagonal or herringbone patterns.
                            The calculator applies a layout-based base percentage and lets you add extra waste if needed.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Should I subtract closets or kitchen units?
                        </summary>
                        <p className="mt-2">
                            Yes, but only for fixed built-ins where flooring definitely will not be installed.
                        </p>
                    </details>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="mb-4 text-xl font-semibold">Related tools</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <Link href="/en/calculators/baseboard" className="group rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl">
                        <div className="flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-amber-500 shadow-inner">
                                <Ruler className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Baseboard Calculator</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Use the same room dimensions to estimate baseboard pieces and linear footage.</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/en/calculators/tile" className="group rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl">
                        <div className="flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-emerald-500 shadow-inner">
                                <Grid3X3 className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Tile Calculator</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Compare wood-look flooring with tile options for kitchens, bathrooms or entry zones.</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            <section className="mt-12 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 p-8 shadow-xl">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Share the calculator</h2>
                <ShareButton
                    url="/en/calculators/flooring"
                    title="Flooring Calculator - packs, waste and underlay | Renohacks"
                    description="Estimate flooring packs, underlay and waste in minutes"
                    isEnglish={true}
                />
            </section>
        </main>
    )
}
