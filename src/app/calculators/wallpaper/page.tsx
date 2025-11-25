import { getPageMetadata } from "@/lib/seo"
import { WallpaperCalculator } from "@/components/widgets/wallpaper-calculator"
import { ShareButton } from "@/components/share-button"
import Link from "next/link"
import { Paintbrush, Grid, Layers, ScrollText } from "lucide-react"

export const metadata = getPageMetadata("/calculators/wallpaper", {
    title: "Калькулятор обоев онлайн — рассчитать количество рулонов | Renohacks",
    description:
        "Онлайн калькулятор обоев: введите площадь стен и узнайте, сколько рулонов обоев потребуется. Удобный инструмент Renohacks.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function WallpaperCalculatorPage() {
    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-4">Калькулятор обоев</h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Рассчитайте необходимое количество рулонов обоев для поклейки стен. 
                Учитывается площадь стен, окна, двери и раппорт рисунка.
            </p>
            <WallpaperCalculator />
            
            <section className="mt-10 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 px-6 py-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">Почему профессионалы выбирают этот калькулятор обоев</h2>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li>
                            <span className="font-medium text-foreground">Точный расчет с учетом раппорта.</span> Учитывается площадь стен, высота раппорта рисунка и запас для точного количества рулонов.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Учет окон и дверей.</span> Автоматически вычитаются площади проемов для точного расчета.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Гибкие настройки.</span> Настройте покрытие рулона и раппорт в зависимости от типа обоев.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Мобильная версия.</span> Работает на всех устройствах — рассчитывайте количество рулонов где угодно.
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
                    <h2 className="text-xl font-semibold mb-3 text-foreground">Пошаговое руководство по расчету обоев</h2>
                    <ol className="list-decimal ml-5 space-y-2 text-sm text-muted-foreground">
                        <li>Введите размеры стены: длину и высоту в метрах.</li>
                        <li>Укажите размеры рулона: длину и ширину (обычно указано на упаковке).</li>
                        <li>Для обоев с рисунком укажите высоту раппорта.</li>
                        <li>Добавьте окна и двери — калькулятор автоматически вычтет их площадь.</li>
                        <li>Получите точное количество рулонов и добавьте 1 рулон про запас.</li>
                </ol>
                    <p className="mt-3 text-sm text-muted-foreground">
                        💡 Совет: Всегда покупайте минимум 1 дополнительный рулон на случай непредвиденных ситуаций, подбора рисунка и ремонта.
                    </p>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Часто задаваемые вопросы о расчете обоев</h2>
                <div className="space-y-4 text-sm text-muted-foreground">
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Как правильно рассчитать количество рулонов обоев?
                        </summary>
                        <p className="mt-2">
                            Введите точные размеры стен, укажите размер рулона и раппорт (если есть), добавьте окна и двери. 
                            Калькулятор автоматически учтет все факторы и даст точный результат.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Что такое раппорт и почему он важен?
                        </summary>
                        <p className="mt-2">
                            Раппорт — это вертикальное расстояние между совпадающими элементами рисунка. Он важен для обоев с рисунком, 
                            так как влияет на количество полос из одного рулона и требует больше материала для подбора рисунка.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Нужно ли покупать дополнительные рулоны обоев?
                        </summary>
                        <p className="mt-2">
                            Да, всегда покупайте минимум 1 дополнительный рулон на случай непредвиденных ситуаций, подбора рисунка, ремонта 
                            и чтобы убедиться, что у вас достаточно материала из одной партии (чтобы избежать различий в цвете).
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
                        href="/calculators/tile"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner text-emerald-500">
                                <Grid className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Калькулятор плитки</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Рассчитайте количество плитки для пола и стен с учетом запаса и клея.
                                </p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        href="/calculators"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/15 to-indigo-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner text-indigo-500">
                                <ScrollText className="h-5 w-5" />
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
                        url="https://renohacks.com/calculators/wallpaper"
                        title="Калькулятор обоев онлайн — рассчитать количество рулонов | Renohacks"
                        description="Онлайн калькулятор обоев: введите площадь стен и узнайте, сколько рулонов обоев потребуется"
                    />
            </div>
            </section>
        </main>
    )
}
