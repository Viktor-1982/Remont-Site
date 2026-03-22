import { ScreedCalculator } from "@/components/widgets/screed-calculator"
import { ShareButton } from "@/components/share-button"
import { getPageMetadata } from "@/lib/seo"
import { Grid3X3, Ruler } from "lucide-react"
import Link from "next/link"

export const metadata = getPageMetadata("/en/calculators/screed", {
    title: "Screed Calculator - volume, dry mix and bags | Renohacks",
    description:
        "Online screed calculator: estimate volume, dry mix, number of bags, mixing water and approximate cost.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function ScreedCalculatorPageEn() {
    return (
        <main className="mx-auto max-w-2xl px-4 py-10">
            <h1 className="mb-4 text-3xl font-bold">Screed Calculator</h1>
            <p className="mb-8 text-muted-foreground">
                Calculate screed volume, dry mix consumption, bag count and mixing water for floor leveling.
                Suitable for cement screed, self-leveling compounds and lightweight mixes.
            </p>

            <ScreedCalculator />

            <section className="mt-10 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 px-6 py-8 shadow-xl">
                <h2 className="mb-4 text-xl font-semibold">What matters before you estimate screed</h2>
                <ul className="space-y-3 text-sm text-muted-foreground">
                    <li><span className="font-medium text-foreground">Use average thickness.</span> If the subfloor is uneven, base the estimate on the average working thickness.</li>
                    <li><span className="font-medium text-foreground">Check product consumption.</span> For the best accuracy, use the exact kg-per-square-meter figure from the bag.</li>
                    <li><span className="font-medium text-foreground">Keep a reserve.</span> Even a careful screed estimate is safer with a 5-10% margin.</li>
                </ul>
            </section>

            <section className="mt-12">
                <h2 className="mb-4 text-xl font-semibold">FAQs</h2>
                <div className="space-y-4 text-sm text-muted-foreground">
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            What is the difference between volume and dry mix consumption?
                        </summary>
                        <p className="mt-2">
                            Volume is the geometric size of the layer in cubic meters. Dry mix consumption shows
                            how much material is actually needed based on the manufacturer rate.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Can I use the same logic for self-leveling and cement screed?
                        </summary>
                        <p className="mt-2">
                            The logic is similar, but the consumption per 10 mm is different. That is why the
                            calculator includes presets and manual override for the mix rate.
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
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Move from floor base to the final finish in one planning workflow.</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/en/calculators/baseboard" className="group rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl">
                        <div className="flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-amber-500 shadow-inner">
                                <Ruler className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Baseboard Calculator</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Finish the perimeter once the screed and floor finish are decided.</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            <section className="mt-12 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 p-8 shadow-xl">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Share the calculator</h2>
                <ShareButton
                    url="/en/calculators/screed"
                    title="Screed Calculator - volume, dry mix and bags | Renohacks"
                    description="Estimate screed volume, dry mix and bag count"
                    isEnglish={true}
                />
            </section>
        </main>
    )
}
