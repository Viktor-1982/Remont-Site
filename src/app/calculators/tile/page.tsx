import { getPageMetadata } from "@/lib/seo"
import { TileCalculator } from "@/components/widgets/tile-calculator"
import { ShareButton } from "@/components/share-button"
import Link from "next/link"
import { Paintbrush, ScrollText, Layers, Grid } from "lucide-react"
import Script from "next/script"

export const metadata = getPageMetadata("/calculators/tile", {
    title: "Калькулятор плитки онлайн — рассчитать количество для пола и стен | Renohacks",
    description:
        "Бесплатный калькулятор плитки: рассчитайте точное количество плитки для пола и стен. Учитывает площадь, размеры плитки, окна, двери и запас на подрезку. Онлайн-расчет за 30 секунд.",
    cover: "/images/og-default.png",
    type: "website",
    keywords: [
        "калькулятор плитки",
        "расчет плитки",
        "сколько нужно плитки",
        "калькулятор плитки для ванной",
        "калькулятор плитки для кухни",
        "расчет количества плитки",
        "как рассчитать плитку",
        "онлайн калькулятор плитки",
    ],
})

export default function TileCalculatorPage() {
    const baseUrl = "https://renohacks.com"
    
    const tileCalculatorSchema = {
        "@context": "https://schema.org",
        "@type": ["SoftwareApplication", "WebApplication"],
        "name": "Калькулятор плитки онлайн",
        "alternateName": "Расчет количества плитки",
        "operatingSystem": "All",
        "applicationCategory": ["UtilityApplication", "BusinessApplication"],
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "RUB",
            "availability": "https://schema.org/InStock",
        },
        "description": "Бесплатный онлайн-калькулятор для расчета количества плитки для пола и стен. Учитывает площадь, размеры плитки, отходы и запас.",
        "url": `${baseUrl}/calculators/tile`,
        "image": `${baseUrl}/images/og-default.png`,
        "creator": {
            "@type": "Organization",
            "name": "Renohacks",
            "url": baseUrl,
        },
        "potentialAction": {
            "@type": "UseAction",
            "target": `${baseUrl}/calculators/tile`,
            "name": "Рассчитать количество плитки",
        },
        "featureList": [
            "Расчет плитки для пола",
            "Расчет плитки для стен",
            "Учет окон и дверей",
            "Процент запаса на подрезку",
            "Мобильная адаптивность"
        ],
        "keywords": "калькулятор плитки, расчет плитки, сколько нужно плитки, укладка плитки",
        "inLanguage": "ru",
        "isAccessibleForFree": true,
    }
    
    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <Script
                id="tile-calculator-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(tileCalculatorSchema) }}
            />
            
            <h1 className="text-3xl font-bold mb-4">Калькулятор плитки</h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Рассчитайте количество плитки для пола или стен. 
                Учитываются площадь, размеры плитки, ширина швов, способ укладки, окна, двери, ванна/экран, отходы на подрезку, количество упаковок и необходимое количество клея.
            </p>
            <TileCalculator />
            
            <section className="mt-10 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 px-6 py-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">Почему профессионалы выбирают этот калькулятор плитки</h2>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li>
                            <span className="font-medium text-foreground">Расчет для пола и стен.</span> Отдельные настройки для разных типов поверхностей с учетом окон, дверей и встроенной ванны/экрана.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Точные размеры плитки.</span> Учитываются длина и ширина плитки, ширина швов для максимально точного расчета количества.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Способ укладки.</span> Автоматический расчет запаса в зависимости от способа укладки: прямая, диагональная, ёлочка, кирпичная.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Расчет упаковок.</span> Укажите количество плиток в упаковке и получите точное количество необходимых упаковок.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Расчет клея.</span> Автоматический расчет необходимого количества клея для укладки.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Гибкий запас.</span> Настройте дополнительный запас на подрезку в зависимости от вашего опыта работы.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Бесплатно и без регистрации.</span> Используйте калькулятор без ограничений.
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mt-10 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 px-6 py-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-xl font-semibold mb-3 text-foreground">Пошаговое руководство по расчету плитки</h2>
                    <ol className="list-decimal ml-5 space-y-2 text-sm text-muted-foreground">
                        <li>Выберите тип поверхности: пол или стена.</li>
                        <li>Введите размеры помещения: длину и ширину в метрах (измерьте рулеткой от стены до стены).</li>
                        <li>Для пола: укажите площадь ванны/экрана, если есть встроенная ванна или неподвижный экран.</li>
                        <li>Укажите размеры плитки: длину и ширину в сантиметрах (указаны на упаковке, например 30×30 см).</li>
                        <li>Укажите ширину шва в миллиметрах (обычно 2–5 мм для керамики, 1–3 мм для керамогранита).</li>
                        <li>Укажите количество плиток в упаковке (указано на коробке; нужно для расчета упаковок).</li>
                        <li>Для стен укажите количество и площадь окон и дверей.</li>
                        <li>Выберите способ укладки: прямая (шов в шов) — 10% запаса, диагональная — 15%, ёлочка — 20%, кирпичная — 12%.</li>
                        <li>При необходимости добавьте дополнительный запас (если опыт работы низкий, добавьте 5–10%).</li>
                        <li>Получите точное количество плитки, необходимое количество упаковок и клея.</li>
                </ol>
                    <p className="mt-3 text-sm text-muted-foreground">
                        💡 Совет: Калькулятор автоматически учитывает запас в зависимости от способа укладки. Для начинающих мастеров рекомендуется добавить дополнительный запас 5–10%.
                    </p>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Часто задаваемые вопросы о расчете плитки</h2>
                <div className="space-y-4 text-sm text-muted-foreground">
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Как правильно рассчитать количество плитки?
                        </summary>
                        <p className="mt-2">
                            Введите точные размеры помещения и плитки, укажите ширину шва, количество плиток в упаковке, окна и двери (для стен), 
                            площадь ванны/экрана (для пола), выберите способ укладки. Калькулятор автоматически учтет все факторы, 
                            рассчитает запас в зависимости от способа укладки и даст точный результат с количеством упаковок и клея.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Какой запас на подрезку нужен?
                        </summary>
                        <p className="mt-2">
                            Калькулятор автоматически устанавливает запас в зависимости от способа укладки: 
                            прямая (шов в шов) — 10%, диагональная — 15%, ёлочка — 20%, кирпичная — 12%. 
                            Если ваш опыт работы низкий, добавьте дополнительный запас 5–10%.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Зачем указывать ширину шва?
                        </summary>
                        <p className="mt-2">
                            Ширина шва влияет на эффективную площадь плитки и точность расчета. 
                            Обычно для керамической плитки используют швы 2–5 мм, для керамогранита — 1–3 мм. 
                            Калькулятор учитывает швы при расчете необходимого количества плитки.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Как рассчитать количество упаковок?
                        </summary>
                        <p className="mt-2">
                            Укажите количество плиток в упаковке (указано на коробке). 
                            Калькулятор автоматически рассчитает необходимое количество упаковок, округляя в большую сторону.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Как рассчитать количество клея?
                        </summary>
                        <p className="mt-2">
                            Калькулятор автоматически рассчитывает необходимое количество клея из расчета 4-5 кг на м². 
                            Точный расход зависит от типа клея и размера плитки, указано на упаковке.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Нужно ли вычитать площадь ванны/экрана?
                        </summary>
                        <p className="mt-2">
                            Да, если у вас есть встроенная ванна или неподвижный экран, укажите их площадь в квадратных метрах. 
                            Это позволит более точно рассчитать количество плитки для пола.
                        </p>
                    </details>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Дополнительные ресурсы для планирования ремонта</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <Link
                        href="/calculators/budget"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/15 to-amber-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner text-amber-500">
                                <Layers className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Калькулятор бюджета</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Рассчитайте полную стоимость ремонта с учетом всех категорий работ и резерва.
                                </p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        href="/calculators/paint"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500/15 to-rose-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner text-rose-500">
                                <Paintbrush className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Калькулятор краски</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Рассчитайте расход краски для стен и потолков с учетом окон и дверей.
                                </p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        href="/calculators/wallpaper"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/15 to-indigo-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner text-indigo-500">
                                <ScrollText className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Калькулятор обоев</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Определите количество рулонов обоев с учетом высоты стен и рисунка.
                                </p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        href="/calculators"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner text-emerald-500">
                                <Grid className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Все калькуляторы</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Изучите полный набор инструментов Renohacks для планирования материалов.
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            <section className="mt-12 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 p-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Поделитесь калькулятором</h2>
                    <ShareButton
                        url="/calculators/tile"
                        title="Калькулятор плитки онлайн — рассчитать количество для пола и стен | Renohacks"
                        description="Бесплатный калькулятор плитки: рассчитайте точное количество плитки для пола и стен"
                    />
            </div>
            </section>
        </main>
    )
}
