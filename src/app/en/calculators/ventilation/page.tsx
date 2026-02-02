import { getPageMetadata } from "@/lib/seo"
import { VentilationCalculator } from "@/components/widgets/ventilation-calculator"
import { ShareButton } from "@/components/share-button"
import Link from "next/link"
import { AirVent, Gauge, Ruler } from "lucide-react"
import Script from "next/script"

export const metadata = getPageMetadata("/en/calculators/ventilation", {
    title: "Ventilation Calculator — volume and ACH | Renohacks",
    description:
        "Accurate ventilation calculator: room volume, air changes per hour (ACH) and airflow in m³/h. Works for kitchens, bathrooms, bedrooms and offices.",
    cover: "/images/og-default.png",
    type: "website",
    keywords: [
        "ventilation calculator",
        "air changes per hour",
        "airflow",
        "room volume",
        "ACH",
        "kitchen ventilation",
        "bathroom ventilation",
    ],
})

export default function VentilationCalculatorPageEn() {
    const baseUrl = "https://renohacks.com"

    const schema = {
        "@context": "https://schema.org",
        "@type": ["SoftwareApplication", "WebApplication"],
        name: "Ventilation Calculator",
        alternateName: "Airflow Calculator",
        operatingSystem: "All",
        applicationCategory: ["UtilityApplication", "BusinessApplication"],
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
        },
        description:
            "Ventilation calculator: airflow based on room volume and air changes per hour (ACH).",
        url: `${baseUrl}/en/calculators/ventilation`,
        image: `${baseUrl}/images/og-default.png`,
        creator: {
            "@type": "Organization",
            name: "Renohacks",
            url: baseUrl,
        },
        potentialAction: {
            "@type": "UseAction",
            target: `${baseUrl}/en/calculators/ventilation`,
            name: "Calculate ventilation",
        },
        featureList: [
            "Room volume calculation",
            "Typical ACH presets",
            "Airflow in m³/h and L/s",
            "Reserve margin",
        ],
        inLanguage: "en",
        isAccessibleForFree: true,
    }

    return (
        <main className="max-w-3xl mx-auto py-10 px-4">
            <Script
                id="ventilation-schema-en"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <h1 className="text-3xl font-bold mb-4">Ventilation Calculator</h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Calculate airflow using room volume and air changes per hour (ACH).
                Formula: airflow = volume × ACH.
            </p>

            <VentilationCalculator isEnglish />

            <section className="mt-10 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2 font-semibold mb-2">
                        <Ruler className="h-4 w-4 text-primary" />
                        Volume
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Volume = length × width × height. Measure wall to wall.
                    </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2 font-semibold mb-2">
                        <AirVent className="h-4 w-4 text-primary" />
                        ACH
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Typical ACH: living rooms 3–4, kitchens 6–10, bathrooms 6–8.
                    </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2 font-semibold mb-2">
                        <Gauge className="h-4 w-4 text-primary" />
                        Reserve
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Add 10–15% for duct losses and calculation tolerance.
                    </p>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Other useful tools</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <Link
                        href="/en/calculators/underfloor-heating"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/15 to-amber-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10">
                            <p className="text-base font-semibold text-foreground">Underfloor Heating</p>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                Estimate power, cable length and energy usage.
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
                                Build a renovation estimate by work categories.
                            </p>
                        </div>
                    </Link>
                </div>
            </section>

            <section className="mt-12 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 p-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Share the calculator</h2>
                    <ShareButton
                        url="/en/calculators/ventilation"
                        title="Ventilation Calculator — volume and ACH | Renohacks"
                        description="Accurate ventilation calculation based on room volume and ACH."
                    />
                </div>
            </section>
        </main>
    )
}

