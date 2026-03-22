import { getPageMetadata } from "@/lib/seo"
import { TileCalculator } from "@/components/widgets/tile-calculator"
import { ShareButton } from "@/components/share-button"
import Link from "next/link"
import { Paintbrush, ScrollText, Layers, Grid } from "lucide-react"
import Script from "next/script"

export const metadata = getPageMetadata("/en/calculators/tile", {
    title: "Tile Calculator Online — Calculate Tiles for Floor & Walls | Renohacks",
    description:
        "Free tile calculator: calculate exact tile quantity for floors and walls. Accounts for area, tile size, windows, doors, and waste. Online calculation in 30 seconds.",
    cover: "/images/og-default.png",
    type: "website",
    keywords: [
        "tile calculator",
        "tile calculation",
        "how many tiles do I need",
        "bathroom tile calculator",
        "kitchen tile calculator",
        "calculate tiles for floor",
        "calculate tiles for walls",
        "online tile calculator",
    ],
})

export default function TileCalculatorPageEn() {
    const baseUrl = "https://renohacks.com"
    
    const tileCalculatorSchema = {
        "@context": "https://schema.org",
        "@type": ["SoftwareApplication", "WebApplication"],
        "name": "Tile Calculator Online",
        "alternateName": "Tile Quantity Calculator",
        "operatingSystem": "All",
        "applicationCategory": ["UtilityApplication", "BusinessApplication"],
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
        },
        "description": "Free online calculator to estimate tile quantity for floors and walls. Accounts for area, tile size, waste, and extra for repairs.",
        "url": `${baseUrl}/en/calculators/tile`,
        "image": `${baseUrl}/images/og-default.png`,
        "creator": {
            "@type": "Organization",
            "name": "Renohacks",
            "url": baseUrl,
        },
        "potentialAction": {
            "@type": "UseAction",
            "target": `${baseUrl}/en/calculators/tile`,
            "name": "Calculate tile quantity",
        },
        "featureList": [
            "Calculate tiles for floor",
            "Calculate tiles for walls",
            "Account for windows and doors",
            "Waste percentage for cutting",
            "Mobile responsive"
        ],
        "keywords": "tile calculator, tile calculation, how many tiles needed, tile installation",
        "inLanguage": "en",
        "isAccessibleForFree": true,
    }
    
    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <Script
                id="tile-calculator-schema-en"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(tileCalculatorSchema) }}
            />
            
            <h1 className="text-3xl font-bold mb-4">Tile Calculator</h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Calculate the amount of tiles needed for floors or walls. 
                Accounts for area, tile size, grout width, layout method, windows, doors, bathtub/screen, waste from cutting, pack quantity, and adhesive needed.
            </p>
            <TileCalculator />
            
            <section className="mt-10 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 px-6 py-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">Why professionals choose this tile calculator</h2>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li>
                            <span className="font-medium text-foreground">Calculation for floors and walls.</span> Separate settings for different surface types accounting for windows, doors, and built-in bathtub/screen.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Accurate tile dimensions.</span> Accounts for tile length and width, grout width for maximum precision in quantity calculation.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Layout method.</span> Automatic waste calculation depending on layout method: straight, diagonal, herringbone, brick pattern.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Pack calculation.</span> Specify tiles per pack and get exact number of packs needed.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Adhesive calculation.</span> Automatic calculation of adhesive needed for installation.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Flexible waste.</span> Adjust additional waste percentage for cutting depending on your work experience.
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
                    <h2 className="text-xl font-semibold mb-3 text-foreground">Step-by-step tile calculation guide</h2>
                    <ol className="list-decimal ml-5 space-y-2 text-sm text-muted-foreground">
                        <li>Choose surface type: floor or wall.</li>
                        <li>Enter room dimensions: length and width in meters (measure with a tape measure from wall to wall).</li>
                        <li>For floors: specify bathtub/screen area if there is a built-in bathtub or fixed screen.</li>
                        <li>Specify tile dimensions: length and width in centimeters (indicated on the package, e.g. 30×30 cm).</li>
                        <li>Specify grout width in millimeters (usually 2–5 mm for ceramic, 1–3 mm for porcelain).</li>
                        <li>Specify tiles per pack (indicated on the box; needed for pack calculation).</li>
                        <li>For walls, specify the number and area of windows and doors.</li>
                        <li>Choose layout method: straight (seam to seam) — 10% waste, diagonal — 15%, herringbone — 20%, brick pattern — 12%.</li>
                        <li>If needed, add additional waste (if work experience is low, add 5–10%).</li>
                        <li>Get accurate tile quantity, number of packs needed, and adhesive.</li>
                    </ol>
                    <p className="mt-3 text-sm text-muted-foreground">
                        💡 Tip: The calculator automatically accounts for waste depending on layout method. For beginners, it&apos;s recommended to add 5–10% additional waste.
                    </p>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Tile calculation FAQs</h2>
                <div className="space-y-4 text-sm text-muted-foreground">
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            How to correctly calculate tile quantity?
                        </summary>
                        <p className="mt-2">
                            Enter accurate room and tile dimensions, specify grout width, tiles per pack, windows and doors (for walls), 
                            bathtub/screen area (for floors), choose layout method. The calculator will automatically account for all factors, 
                            calculate waste depending on layout method and give you an accurate result with pack quantity and adhesive.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            What waste percentage is needed?
                        </summary>
                        <p className="mt-2">
                            The calculator automatically sets waste depending on layout method: 
                            straight (seam to seam) — 10%, diagonal — 15%, herringbone — 20%, brick pattern — 12%. 
                            If your work experience is low, add 5–10% additional waste.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Why specify grout width?
                        </summary>
                        <p className="mt-2">
                            Grout width affects effective tile area and calculation accuracy. 
                            Usually for ceramic tiles, 2–5 mm grout is used, for porcelain — 1–3 mm. 
                            The calculator accounts for grout when calculating tile quantity needed.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            How to calculate number of packs?
                        </summary>
                        <p className="mt-2">
                            Specify tiles per pack (indicated on the box). 
                            The calculator will automatically calculate the number of packs needed, rounding up.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            How to calculate adhesive quantity?
                        </summary>
                        <p className="mt-2">
                            The calculator automatically calculates adhesive needed at 4-5 kg per m². 
                            Exact consumption depends on adhesive type and tile size, indicated on the package.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Do I need to subtract bathtub/screen area?
                        </summary>
                        <p className="mt-2">
                            Yes, if you have a built-in bathtub or fixed screen, specify their area in square meters. 
                            This will allow more accurate tile calculation for the floor.
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
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner text-emerald-500">
                                <Grid className="h-5 w-5" />
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
                        url="/en/calculators/tile"
                        title="Tile Calculator Online — Calculate Tiles for Floor & Walls | Renohacks"
                        description="Free tile calculator: calculate exact tile quantity for floors and walls"
                        isEnglish={true}
                    />
                </div>
            </section>
        </main>
    )
}
