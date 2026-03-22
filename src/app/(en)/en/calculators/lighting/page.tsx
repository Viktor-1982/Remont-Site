import { getPageMetadata } from "@/lib/seo"
import { LightingCalculator } from "@/components/widgets/lighting-calculator"
import { ShareButton } from "@/components/share-button"
import Link from "next/link"
import { Lightbulb, Sun, Ruler } from "lucide-react"
import Script from "next/script"

export const metadata = getPageMetadata("/en/calculators/lighting", {
    title: "Lighting Calculator — Lumens and Number of Lamps | Renohacks",
    description:
        "Calculate how many lumens your room needs and how many lamps to install. Standards by room type, reserve for ceiling height. Free online calculator.",
    cover: "/images/og-default.png",
    type: "website",
    keywords: [
        "lighting calculator",
        "lumens for room",
        "how many lamps",
        "illuminance standards",
        "light calculation",
        "lux by room type",
    ],
})

export default function LightingCalculatorEnPage() {
    const baseUrl = "https://renohacks.com"

    const schema = {
        "@context": "https://schema.org",
        "@type": ["SoftwareApplication", "WebApplication"],
        name: "Lighting Calculator",
        alternateName: "Lumen and lamp count calculator",
        operatingSystem: "All",
        applicationCategory: ["UtilityApplication", "LifestyleApplication"],
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
        },
        description:
            "Online lighting calculator: lumens needed and number of lamps by room area and type.",
        url: `${baseUrl}/en/calculators/lighting`,
        image: `${baseUrl}/images/og-default.png`,
        creator: { "@type": "Organization", name: "Renohacks", url: baseUrl },
        potentialAction: {
            "@type": "UseAction",
            target: `${baseUrl}/en/calculators/lighting`,
            name: "Calculate lighting",
        },
        featureList: [
            "Calculation by room area",
            "Illuminance norms by room type",
            "Number of lamps by lumen per lamp",
            "Reserve for ceiling height",
        ],
        inLanguage: "en",
        isAccessibleForFree: true,
    }

    return (
        <main className="max-w-3xl mx-auto py-10 px-4">
            <Script
                id="lighting-schema-en"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <h1 className="text-3xl font-bold mb-4">Lighting Calculator</h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Find out how many lumens your room needs and how many lamps or fixtures to install.
                The calculator uses standard illuminance levels by room type and adds a reserve for ceiling height.
            </p>

            <LightingCalculator isEnglish />

            <section className="mt-10 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2 font-semibold mb-2">
                        <Ruler className="h-4 w-4 text-primary" />
                        Area
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Length × width in meters. Measure floor from wall to wall.
                    </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2 font-semibold mb-2">
                        <Sun className="h-4 w-4 text-primary" />
                        Lux
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Typical values: living and bedroom 150 lux, kitchen 250, office 300, hallway 100.
                    </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2 font-semibold mb-2">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        Lumen per lamp
                    </div>
                    <p className="text-sm text-muted-foreground">
                        On the packaging. 60W equivalent LED bulb is usually 800–1000 lm.
                    </p>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Other useful tools</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <Link
                        href="/en/calculators/ventilation"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/15 to-cyan-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10">
                            <p className="text-base font-semibold text-foreground">Ventilation Calculator</p>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                Airflow by volume and ACH for kitchen, bathroom, bedroom.
                            </p>
                        </div>
                    </Link>
                    <Link
                        href="/en/calculators/budget"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/15 to-amber-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10">
                            <p className="text-base font-semibold text-foreground">Budget Planner</p>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                Build a cost breakdown by category and keep spending under control.
                            </p>
                        </div>
                    </Link>
                </div>
            </section>

            <section className="mt-12 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 p-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Share calculator</h2>
                    <ShareButton
                        url="/en/calculators/lighting"
                        title="Lighting Calculator — Lumens and Number of Lamps | Renohacks"
                        description="Calculate lumens and lamps needed for a room by area and type."
                        isEnglish
                    />
                </div>
            </section>
        </main>
    )
}
