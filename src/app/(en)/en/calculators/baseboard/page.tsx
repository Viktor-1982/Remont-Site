import { BaseboardCalculator } from "@/components/widgets/baseboard-calculator"
import { ShareButton } from "@/components/share-button"
import { getPageMetadata } from "@/lib/seo"
import { Grid3X3, Layers } from "lucide-react"
import Link from "next/link"

export const metadata = getPageMetadata("/en/calculators/baseboard", {
    title: "Baseboard Calculator - length, pieces and cost | Renohacks",
    description:
        "Online baseboard calculator: estimate linear footage, piece count, waste and approximate cost.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function BaseboardCalculatorPageEn() {
    return (
        <main className="mx-auto max-w-2xl px-4 py-10">
            <h1 className="mb-4 text-3xl font-bold">Baseboard Calculator</h1>
            <p className="mb-8 text-muted-foreground">
                Calculate baseboard by room size or known perimeter. The tool deducts doorway widths,
                adds waste and shows how many pieces you should buy.
            </p>

            <BaseboardCalculator />

            <section className="mt-10 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 px-6 py-8 shadow-xl">
                <h2 className="mb-4 text-xl font-semibold">When this estimate is most useful</h2>
                <ul className="space-y-3 text-sm text-muted-foreground">
                    <li><span className="font-medium text-foreground">For standard rooms.</span> Use length and width and let the calculator build the perimeter.</li>
                    <li><span className="font-medium text-foreground">For complex layouts.</span> If you already measured perimeter manually, switch to custom mode.</li>
                    <li><span className="font-medium text-foreground">For purchasing.</span> The result gives you total length, piece count and a quick cost estimate.</li>
                </ul>
            </section>

            <section className="mt-12">
                <h2 className="mb-4 text-xl font-semibold">FAQs</h2>
                <div className="space-y-4 text-sm text-muted-foreground">
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Should I deduct door openings?
                        </summary>
                        <p className="mt-2">
                            Yes. In most rooms, baseboard does not run through the door opening, so that width
                            should be deducted from the perimeter.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            How much waste should I allow?
                        </summary>
                        <p className="mt-2">
                            Five to seven percent is often enough for a simple room. If there are more cuts,
                            tricky corners or material defects, use a slightly higher reserve.
                        </p>
                    </details>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="mb-4 text-xl font-semibold">Related tools</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <Link href="/en/calculators/flooring" className="group rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl">
                        <div className="flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-emerald-500 shadow-inner">
                                <Grid3X3 className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Flooring Calculator</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">A natural follow-up when you are finishing the same room floor by floor.</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/en/calculators/screed" className="group rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl">
                        <div className="flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-amber-500 shadow-inner">
                                <Layers className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Screed Calculator</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Estimate the floor base first, then the finish and baseboard in one workflow.</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            <section className="mt-12 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 p-8 shadow-xl">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Share the calculator</h2>
                <ShareButton
                    url="/en/calculators/baseboard"
                    title="Baseboard Calculator - length, pieces and cost | Renohacks"
                    description="Calculate baseboard length, waste and piece count"
                    isEnglish={true}
                />
            </section>
        </main>
    )
}
