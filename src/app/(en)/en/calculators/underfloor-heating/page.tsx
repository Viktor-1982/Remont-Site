import { getPageMetadata } from "@/lib/seo"
import { UnderfloorHeatingCalculator } from "@/components/widgets/underfloor-heating-calculator"
import { ShareButton } from "@/components/share-button"
import Link from "next/link"
import { Flame, Thermometer, Zap, Timer } from "lucide-react"
import Script from "next/script"

export const metadata = getPageMetadata("/en/calculators/underfloor-heating", {
    title: "Underfloor Heating Calculator — power, cable length, energy | Renohacks",
    description:
        "Underfloor heating calculator: estimate system power, cable length or mat area, and monthly energy usage. Works for tile, laminate, vinyl, and wood floors.",
    cover: "/images/og-default.png",
    type: "website",
    keywords: [
        "underfloor heating calculator",
        "floor heating power",
        "heating cable length",
        "heating mat area",
        "floor heating energy consumption",
        "floor heating for tile",
        "floor heating for laminate",
    ],
})

export default function UnderfloorHeatingPageEn() {
    const baseUrl = "https://renohacks.com"

    const schema = {
        "@context": "https://schema.org",
        "@type": ["SoftwareApplication", "WebApplication"],
        name: "Underfloor Heating Calculator",
        alternateName: "Floor Heating Calculator",
        operatingSystem: "All",
        applicationCategory: ["UtilityApplication", "BusinessApplication"],
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
        },
        description:
            "Free calculator for underfloor heating power, cable length / mat area, and estimated energy usage.",
        url: `${baseUrl}/en/calculators/underfloor-heating`,
        image: `${baseUrl}/images/og-default.png`,
        creator: {
            "@type": "Organization",
            name: "Renohacks",
            url: baseUrl,
        },
        potentialAction: {
            "@type": "UseAction",
            target: `${baseUrl}/en/calculators/underfloor-heating`,
            name: "Calculate underfloor heating",
        },
        featureList: [
            "Power recommendation by floor finish",
            "Cable length or mat area",
            "Monthly energy estimate",
            "Comfort or primary heating mode",
        ],
        inLanguage: "en",
        isAccessibleForFree: true,
    }

    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <Script
                id="underfloor-schema-en"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <h1 className="text-3xl font-bold mb-4">Underfloor Heating Calculator</h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Estimate system power, cable length or mat area, and monthly energy usage. The calculator
                accounts for floor finish, heating mode, and heated coverage.
            </p>
            <UnderfloorHeatingCalculator />

            <section className="mt-10 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 px-6 py-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">What the calculator includes</h2>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li>
                            <span className="font-medium text-foreground">Floor finish.</span> Tile, laminate,
                            vinyl, and wood have different recommended power levels.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Heating mode.</span> Comfort or primary
                            heating affects power recommendations.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">System type.</span> Cable length or mat
                            area are calculated based on your selection.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Energy usage.</span> Hours, days and
                            average thermostat load are included.
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mt-12 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md">
                    <div className="flex items-center gap-2 text-foreground font-semibold mb-2">
                        <Flame className="h-4 w-4 text-primary" />
                        Power selection
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Typical recommendations: 150–180 W/m² for tile, 120–160 W/m² for laminate/vinyl,
                        and 100–140 W/m² for wood. Primary heating uses higher values.
                    </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md">
                    <div className="flex items-center gap-2 text-foreground font-semibold mb-2">
                        <Timer className="h-4 w-4 text-primary" />
                        Energy estimate
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        A thermostat reduces load. Typical average load is 50–70% with 5–8 hours per day.
                        Adjust values to match your usage.
                    </p>
                </div>
            </section>

            <section className="mt-12 rounded-2xl border border-border/60 bg-card/95 p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Simple instructions</h2>
                <ol className="list-decimal ml-5 space-y-2 text-sm text-muted-foreground">
                    <li>Enter room area and heated coverage (usually 70–90%).</li>
                    <li>Select floor finish, heating mode, and floor below.</li>
                    <li>Pick system type and cable/mat power.</li>
                    <li>Set hours, days and average load to get power, length, and energy use.</li>
                </ol>
            </section>

            <section className="mt-12 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 p-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Share the calculator</h2>
                    <ShareButton
                        url="/en/calculators/underfloor-heating"
                        title="Underfloor Heating Calculator — power, cable length, energy | Renohacks"
                        description="Free underfloor heating calculator: power, cable length/mat area, and energy usage."
                    />
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">More renovation tools</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <Link
                        href="/en/calculators/paint"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500/15 to-rose-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner text-rose-500">
                                <Thermometer className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Paint Calculator</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Estimate paint for walls and ceilings with openings.
                                </p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        href="/en/calculators/tile"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500/15 to-sky-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner text-sky-500">
                                <Zap className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Tile Calculator</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Calculate tiles, waste and adhesive for floors and walls.
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>
        </main>
    )
}

