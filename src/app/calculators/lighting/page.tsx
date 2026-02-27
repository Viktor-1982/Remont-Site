import { getPageMetadata } from "@/lib/seo"
import { LightingCalculator } from "@/components/widgets/lighting-calculator"
import { ShareButton } from "@/components/share-button"
import Link from "next/link"
import { Lightbulb, Sun, Ruler } from "lucide-react"
import Script from "next/script"

export const metadata = getPageMetadata("/calculators/lighting", {
    title: "Калькулятор освещённости — люмены и количество ламп | Renohacks",
    description:
        "Рассчитайте, сколько люмен нужно комнате и сколько ламп установить. Нормы по типам помещений, запас на высоту потолка. Бесплатный онлайн-калькулятор.",
    cover: "/images/og-default.png",
    type: "website",
    keywords: [
        "калькулятор освещённости",
        "люмены для комнаты",
        "сколько ламп нужно",
        "нормы освещения",
        "расчёт освещения",
        "люксы по помещениям",
    ],
})

export default function LightingCalculatorPage() {
    const baseUrl = "https://renohacks.com"

    const schema = {
        "@context": "https://schema.org",
        "@type": ["SoftwareApplication", "WebApplication"],
        name: "Калькулятор освещённости",
        alternateName: "Расчёт освещения по люменам",
        operatingSystem: "All",
        applicationCategory: ["UtilityApplication", "LifestyleApplication"],
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "RUB",
            availability: "https://schema.org/InStock",
        },
        description:
            "Онлайн-калькулятор освещённости: расчёт нужных люмен и количества ламп по площади и типу помещения.",
        url: `${baseUrl}/calculators/lighting`,
        image: `${baseUrl}/images/og-default.png`,
        creator: { "@type": "Organization", name: "Renohacks", url: baseUrl },
        potentialAction: {
            "@type": "UseAction",
            target: `${baseUrl}/calculators/lighting`,
            name: "Рассчитать освещение",
        },
        featureList: [
            "Расчёт по площади комнаты",
            "Нормы освещённости по типу помещения",
            "Количество ламп по световому потоку",
            "Запас на высоту потолка",
        ],
        inLanguage: "ru",
        isAccessibleForFree: true,
    }

    return (
        <main className="max-w-3xl mx-auto py-10 px-4">
            <Script
                id="lighting-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <h1 className="text-3xl font-bold mb-4">Калькулятор освещённости</h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Узнайте, сколько люмен нужно вашей комнате и сколько ламп или светильников установить.
                Калькулятор использует нормы освещённости по типам помещений и учитывает запас на высоту потолка.
            </p>

            <LightingCalculator />

            <section className="mt-10 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2 font-semibold mb-2">
                        <Ruler className="h-4 w-4 text-primary" />
                        Площадь
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Длина × ширина комнаты в метрах. Измеряйте по полу от стены до стены.
                    </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2 font-semibold mb-2">
                        <Sun className="h-4 w-4 text-primary" />
                        Люксы
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Норма освещённости: гостиная и спальня 150 лк, кухня 250, кабинет 300, коридор 100.
                    </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2 font-semibold mb-2">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        Люмены на лампу
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Указано на упаковке. LED-лампа 60 Вт эквивалент — обычно 800–1000 лм.
                    </p>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Другие полезные инструменты</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <Link
                        href="/calculators/ventilation"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/15 to-cyan-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10">
                            <p className="text-base font-semibold text-foreground">Калькулятор вентиляции</p>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                Расход воздуха по объёму и кратности для кухни, ванной, спальни.
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
                        url="/calculators/lighting"
                        title="Калькулятор освещённости — люмены и количество ламп | Renohacks"
                        description="Рассчитайте, сколько люмен и ламп нужно для комнаты по площади и типу помещения."
                    />
                </div>
            </section>
        </main>
    )
}
