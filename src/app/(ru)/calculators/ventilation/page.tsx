import { getPageMetadata } from "@/lib/seo"
import { VentilationCalculator } from "@/components/widgets/ventilation-calculator"
import { ShareButton } from "@/components/share-button"
import Link from "next/link"
import { AirVent, Gauge, Ruler } from "lucide-react"
import Script from "next/script"

export const metadata = getPageMetadata("/calculators/ventilation", {
    title: "Калькулятор вентиляции — объём и кратность | Renohacks",
    description:
        "Точный калькулятор вентиляции: объём помещения, кратность воздухообмена (ACH) и расход воздуха в м³/ч. Подходит для кухни, ванной, спальни и офиса.",
    cover: "/images/og-default.png",
    type: "website",
    keywords: [
        "калькулятор вентиляции",
        "кратность воздухообмена",
        "расход воздуха",
        "объем помещения",
        "ACH",
        "вентиляция кухни",
        "вентиляция ванной",
    ],
})

export default function VentilationCalculatorPage() {
    const baseUrl = "https://renohacks.com"

    const schema = {
        "@context": "https://schema.org",
        "@type": ["SoftwareApplication", "WebApplication"],
        name: "Калькулятор вентиляции",
        alternateName: "Расчёт воздухообмена",
        operatingSystem: "All",
        applicationCategory: ["UtilityApplication", "BusinessApplication"],
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "RUB",
            availability: "https://schema.org/InStock",
        },
        description:
            "Онлайн-калькулятор вентиляции: расчёт расхода воздуха по объёму помещения и кратности воздухообмена (ACH).",
        url: `${baseUrl}/calculators/ventilation`,
        image: `${baseUrl}/images/og-default.png`,
        creator: {
            "@type": "Organization",
            name: "Renohacks",
            url: baseUrl,
        },
        potentialAction: {
            "@type": "UseAction",
            target: `${baseUrl}/calculators/ventilation`,
            name: "Рассчитать вентиляцию",
        },
        featureList: [
            "Расчёт объёма помещения",
            "Подбор кратности воздухообмена",
            "Расход воздуха в м³/ч и л/с",
            "Резерв на ошибки и потери",
        ],
        inLanguage: "ru",
        isAccessibleForFree: true,
    }

    return (
        <main className="max-w-3xl mx-auto py-10 px-4">
            <Script
                id="ventilation-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <h1 className="text-3xl font-bold mb-4">Калькулятор вентиляции</h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Рассчитайте расход воздуха по объёму помещения и кратности воздухообмена (ACH).
                Реальная формула: расход = объём × ACH.
            </p>

            <VentilationCalculator />

            <section className="mt-10 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2 font-semibold mb-2">
                        <Ruler className="h-4 w-4 text-primary" />
                        Объём
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Объём = длина × ширина × высота. Измеряйте от стены до стены.
                    </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2 font-semibold mb-2">
                        <AirVent className="h-4 w-4 text-primary" />
                        Кратность
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Для жилых комнат обычно 3–4 ACH, для кухни 6–10, для ванной 6–8.
                    </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2 font-semibold mb-2">
                        <Gauge className="h-4 w-4 text-primary" />
                        Резерв
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Добавьте 10–15% на потери в каналах и на ошибки расчёта.
                    </p>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Другие полезные инструменты</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <Link
                        href="/calculators/underfloor-heating"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/15 to-amber-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10">
                            <p className="text-base font-semibold text-foreground">Калькулятор тёплого пола</p>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                Рассчитайте мощность, длину кабеля и энергопотребление.
                            </p>
                        </div>
                    </Link>
                    <Link
                        href="/calculators/budget"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/15 to-amber-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10">
                            <p className="text-base font-semibold text-foreground">Планировщик бюджета</p>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                Соберите смету по категориям и держите расходы под контролем.
                            </p>
                        </div>
                    </Link>
                </div>
            </section>

            <section className="mt-12 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 p-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Поделитесь калькулятором</h2>
                    <ShareButton
                        url="/calculators/ventilation"
                        title="Калькулятор вентиляции — объём и кратность | Renohacks"
                        description="Точный расчёт вентиляции по объёму помещения и кратности воздухообмена."
                    />
                </div>
            </section>
        </main>
    )
}

