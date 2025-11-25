import { getPageMetadata } from "@/lib/seo"
import { PaintCalculator } from "@/components/widgets/paint-calculator"
import { ShareButton } from "@/components/share-button"
import Link from "next/link"
import { Grid, ScrollText, Layers, Paintbrush } from "lucide-react"

export const metadata = getPageMetadata("/en/calculators/paint", {
    title: "Paint Calculator Online — calculate paint consumption | Renohacks",
    description:
        "Online paint calculator: enter your room dimensions and find out how many liters of paint you need. A handy tool by Renohacks.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function PaintCalculatorPageEn() {
    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-4">Paint Calculator</h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Calculate the exact amount of paint needed for walls and ceilings. 
                Accounts for windows, doors, and second coat requirements.
            </p>
            <PaintCalculator />
            
            <section className="mt-10 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 px-6 py-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">Why professionals choose this paint calculator</h2>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li>
                            <span className="font-medium text-foreground">Accurate calculation with all factors.</span> Accounts for windows, doors, number of coats, and paint coverage per m².
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Windows and doors accounted for.</span> Automatically subtracts opening areas for accurate calculation.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Flexible settings.</span> Adjust the number of coats and paint coverage depending on surface type.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Mobile version.</span> Works on all devices — calculate paint consumption anywhere.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Free and no registration.</span> Use the calculator without restrictions.
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mt-10 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 px-6 py-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-xl font-semibold mb-3 text-foreground">Step-by-step paint calculation guide</h2>
                    <ol className="list-decimal ml-5 space-y-2 text-sm text-muted-foreground">
                        <li>Enter room dimensions: length, width, and wall height in meters.</li>
                        <li>Specify the number of windows and doors — the calculator will automatically subtract their area.</li>
                        <li>Choose the number of paint coats (usually 2 coats for quality coverage).</li>
                        <li>Enter paint coverage per m² (usually 8-12 L/m², indicated on the can).</li>
                        <li>Get accurate calculation in liters and add 10% extra for safety.</li>
                    </ol>
                    <p className="mt-3 text-sm text-muted-foreground">
                        💡 Tip: Always buy paint with a small reserve (10-15%) for unexpected situations and touch-ups.
                    </p>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Paint calculation FAQs</h2>
                <div className="space-y-4 text-sm text-muted-foreground">
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            How to correctly calculate paint consumption?
                        </summary>
                        <p className="mt-2">
                            Enter accurate room dimensions, specify the number of windows and doors, choose the number of coats and paint coverage. 
                            The calculator will automatically account for all factors and give you an accurate result.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            How many coats of paint should be applied?
                        </summary>
                        <p className="mt-2">
                            Usually 2 coats are enough for quality coverage. For dark colors or when painting over dark paint, 3 coats may be needed.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Should I account for extra paint when buying?
                        </summary>
                        <p className="mt-2">
                            Yes, always add 10-15% to the calculated amount for unexpected situations, touch-ups, and possible application errors.
                        </p>
                    </details>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">More renovation planning resources</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <Link
                        href="/en/calculators/budget"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/15 to-amber-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner text-amber-500">
                                <Layers className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Budget Calculator</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Calculate the total renovation cost including all work categories and reserve.
                                </p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        href="/en/calculators/tile"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner text-emerald-500">
                                <Grid className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Tile Calculator</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Calculate tile quantity for floors and walls including waste and adhesive.
                                </p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        href="/en/calculators/wallpaper"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/15 to-indigo-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner text-indigo-500">
                                <ScrollText className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Wallpaper Calculator</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Determine the number of wallpaper rolls accounting for wall height and pattern.
                                </p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        href="/en/calculators"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500/15 to-rose-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner text-rose-500">
                                <Paintbrush className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">All Calculators</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Explore the full Renohacks toolkit for planning materials.
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            <section className="mt-12 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 p-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Share the calculator</h2>
                    <ShareButton
                        url="https://renohacks.com/en/calculators/paint"
                        title="Paint Calculator Online — calculate paint consumption | Renohacks"
                        description="Online paint calculator: enter your room dimensions and find out how many liters of paint you need"
                        isEnglish={true}
                    />
                </div>
            </section>
        </main>
    )
}
