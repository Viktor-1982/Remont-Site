import { getPageMetadata } from "@/lib/seo"
import { WallpaperCalculator } from "@/components/widgets/wallpaper-calculator"
import { ShareButton } from "@/components/share-button"
import Link from "next/link"
import { Paintbrush, Grid, Layers, ScrollText } from "lucide-react"

export const metadata = getPageMetadata("/en/calculators/wallpaper", {
    title: "Wallpaper Calculator Online — calculate rolls needed | Renohacks",
    description:
        "Online wallpaper calculator: enter your wall area and find out how many rolls of wallpaper you need. A handy tool by Renohacks.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function WallpaperCalculatorPageEn() {
    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-4">Wallpaper Calculator</h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Calculate how many rolls of wallpaper you need for your walls. 
                Accounts for wall area, windows, doors, and pattern repeat.
            </p>
            <WallpaperCalculator />
            
            <section className="mt-10 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 px-6 py-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">Why professionals choose this wallpaper calculator</h2>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li>
                            <span className="font-medium text-foreground">Accurate calculation with pattern repeat.</span> Accounts for wall area, pattern repeat height, and waste for precise roll count.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Windows and doors accounted for.</span> Automatically subtracts opening areas for accurate calculation.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Flexible settings.</span> Adjust roll coverage and pattern repeat depending on wallpaper type.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Mobile version.</span> Works on all devices — calculate wallpaper rolls anywhere.
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
                    <h2 className="text-xl font-semibold mb-3 text-foreground">Step-by-step wallpaper calculation guide</h2>
                    <ol className="list-decimal ml-5 space-y-2 text-sm text-muted-foreground">
                        <li>Enter wall dimensions: length and height in meters.</li>
                        <li>Specify roll dimensions: length and width (usually indicated on the package).</li>
                        <li>For patterned wallpaper, enter pattern repeat height.</li>
                        <li>Add windows and doors — the calculator will automatically subtract their area.</li>
                        <li>Get accurate number of rolls needed and add 1 extra roll for safety.</li>
                    </ol>
                    <p className="mt-3 text-sm text-muted-foreground">
                        💡 Tip: Always buy 1 extra roll for unexpected situations, pattern matching, and repairs.
                    </p>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Wallpaper calculation FAQs</h2>
                <div className="space-y-4 text-sm text-muted-foreground">
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            How to correctly calculate wallpaper rolls?
                        </summary>
                        <p className="mt-2">
                            Enter accurate wall dimensions, specify roll size and pattern repeat (if any), add windows and doors. 
                            The calculator will automatically account for all factors and give you an accurate result.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            What is pattern repeat and why is it important?
                        </summary>
                        <p className="mt-2">
                            Pattern repeat is the vertical distance between matching pattern elements. It&apos;s important for patterned wallpaper 
                            as it affects how many strips you can get from one roll and requires more material for pattern matching.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Should I buy extra wallpaper rolls?
                        </summary>
                        <p className="mt-2">
                            Yes, always buy at least 1 extra roll for unexpected situations, pattern matching, repairs, and to ensure you have 
                            enough material from the same batch (to avoid color differences).
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
                        href="/en/calculators/paint"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500/15 to-rose-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner text-rose-500">
                                <Paintbrush className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Paint Calculator</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Calculate paint consumption for walls and ceilings accounting for windows and doors.
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
                        href="/en/calculators"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/15 to-indigo-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner text-indigo-500">
                                <ScrollText className="h-5 w-5" />
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
                        url="/en/calculators/wallpaper"
                        title="Wallpaper Calculator Online — calculate rolls needed | Renohacks"
                        description="Online wallpaper calculator: enter your wall area and find out how many rolls of wallpaper you need"
                        isEnglish={true}
                    />
                </div>
            </section>
        </main>
    )
}
