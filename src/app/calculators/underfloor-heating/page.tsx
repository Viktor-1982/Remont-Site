import { getPageMetadata } from "@/lib/seo"
import { UnderfloorHeatingCalculator } from "@/components/widgets/underfloor-heating-calculator"
import { ShareButton } from "@/components/share-button"
import Link from "next/link"
import { Flame, Thermometer, Zap, Timer } from "lucide-react"
import Script from "next/script"

export const metadata = getPageMetadata("/calculators/underfloor-heating", {
    title: "Калькулятор тёплого пола — мощность, кабель, расход | Renohacks",
    description:
        "Калькулятор тёплого пола: рассчитайте мощность системы, длину кабеля или площадь матов и примерное энергопотребление. Подходит для плитки, ламината и дерева.",
    cover: "/images/og-default.png",
    type: "website",
    keywords: [
        "калькулятор тёплого пола",
        "расчёт тёплого пола",
        "мощность тёплого пола",
        "длина кабеля тёплого пола",
        "мат тёплого пола площадь",
        "энергопотребление тёплого пола",
        "тёплый пол под плитку",
        "тёплый пол под ламинат",
    ],
})

export default function UnderfloorHeatingPage() {
    const baseUrl = "https://renohacks.com"

    const schema = {
        "@context": "https://schema.org",
        "@type": ["SoftwareApplication", "WebApplication"],
        name: "Калькулятор тёплого пола",
        alternateName: "Расчёт тёплого пола",
        operatingSystem: "All",
        applicationCategory: ["UtilityApplication", "BusinessApplication"],
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "RUB",
            availability: "https://schema.org/InStock",
        },
        description:
            "Бесплатный онлайн-калькулятор для расчёта мощности тёплого пола, длины кабеля/матов и ориентировочного энергопотребления.",
        url: `${baseUrl}/calculators/underfloor-heating`,
        image: `${baseUrl}/images/og-default.png`,
        creator: {
            "@type": "Organization",
            name: "Renohacks",
            url: baseUrl,
        },
        potentialAction: {
            "@type": "UseAction",
            target: `${baseUrl}/calculators/underfloor-heating`,
            name: "Рассчитать тёплый пол",
        },
        featureList: [
            "Расчёт мощности по типу покрытия",
            "Длина кабеля или площадь матов",
            "Прогноз энергопотребления",
            "Режимы: комфорт и основное отопление",
        ],
        inLanguage: "ru",
        isAccessibleForFree: true,
    }

    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <Script
                id="underfloor-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <h1 className="text-3xl font-bold mb-4">Калькулятор тёплого пола</h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Рассчитайте мощность системы, длину кабеля или площадь матов и примерное
                энергопотребление в месяц. Учитываются тип покрытия, режим работы и зона обогрева.
            </p>
            <UnderfloorHeatingCalculator />

            <section className="mt-10 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 px-6 py-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">
                        Что учитывает калькулятор тёплого пола
                    </h2>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li>
                            <span className="font-medium text-foreground">Тип покрытия.</span> Плитка, ламинат,
                            дерево и винил имеют разную рекомендуемую мощность.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Режим работы.</span> Комфортный подогрев
                            или основное отопление с повышенной мощностью.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Система.</span> Расчёт длины кабеля либо
                            площади нагревательных матов.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Энергопотребление.</span> Учитываются часы,
                            дни и средняя загрузка термостата.
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mt-12 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md">
                    <div className="flex items-center gap-2 text-foreground font-semibold mb-2">
                        <Flame className="h-4 w-4 text-primary" />
                        Подбор мощности
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Для плитки обычно берут 150–180 Вт/м², для ламината и винила — 120–160 Вт/м²,
                        для дерева — 100–140 Вт/м². Комфортный режим мягче, основной — мощнее.
                    </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md">
                    <div className="flex items-center gap-2 text-foreground font-semibold mb-2">
                        <Timer className="h-4 w-4 text-primary" />
                        Энергопотребление
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Термостат снижает нагрузку. Обычно средняя загрузка 50–70% при 5–8 часах работы в день.
                        Меняйте значения, чтобы получить реалистичный прогноз.
                    </p>
                </div>
            </section>

            <section className="mt-12 rounded-2xl border border-border/60 bg-card/95 p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Простая инструкция</h2>
                <ol className="list-decimal ml-5 space-y-2 text-sm text-muted-foreground">
                    <li>Введите площадь помещения и долю обогрева (обычно 70–90%).</li>
                    <li>Выберите тип покрытия, режим и основание под полом.</li>
                    <li>Укажите тип системы и мощность кабеля/мата.</li>
                    <li>Задайте часы работы, дни и среднюю загрузку — получите мощность, длину и расход энергии.</li>
                </ol>
            </section>

            <section className="mt-12 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 p-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Поделитесь калькулятором</h2>
                    <ShareButton
                        url="/calculators/underfloor-heating"
                        title="Калькулятор тёплого пола — мощность, кабель, расход | Renohacks"
                        description="Бесплатный калькулятор тёплого пола: мощность, длина кабеля/матов и энергопотребление"
                    />
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Другие полезные инструменты</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <Link
                        href="/calculators/paint"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500/15 to-rose-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner text-rose-500">
                                <Thermometer className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Калькулятор краски</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Рассчитайте расход краски для стен и потолков с учётом проёмов.
                                </p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        href="/calculators/tile"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500/15 to-sky-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner text-sky-500">
                                <Zap className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Калькулятор плитки</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Подсчитайте плитку, запас и клей для пола и стен.
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>
        </main>
    )
}

