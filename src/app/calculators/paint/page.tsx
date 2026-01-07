import { getPageMetadata } from "@/lib/seo"
import { PaintCalculator } from "@/components/widgets/paint-calculator"
import { ShareButton } from "@/components/share-button"
import Link from "next/link"
import { Grid, ScrollText, Layers, Paintbrush } from "lucide-react"

export const metadata = getPageMetadata("/calculators/paint", {
    title: "Калькулятор краски онлайн — рассчитать расход краски | Renohacks",
    description:
        "Онлайн калькулятор краски: введите размеры комнаты и узнайте, сколько литров краски нужно. Удобный инструмент Renohacks.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function PaintCalculatorPage() {
    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-4">Калькулятор краски</h1>
            <p className="text-muted-foreground mb-8">
                Рассчитайте точный расход краски для покраски стен и потолков. 
                Учитываются окна, двери и необходимость нанесения второго слоя.
            </p>
            <PaintCalculator />
            
            <section className="mt-10 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 px-6 py-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">Почему профессионалы выбирают этот калькулятор краски</h2>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li>
                            <span className="font-medium text-foreground">Точный расчет с учетом всех факторов.</span> Учитываются окна, двери, количество слоев и расход краски на м².
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Учет окон и дверей.</span> Автоматически вычитаются площади проемов для точного расчета.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Гибкие настройки.</span> Настройте количество слоев и расход краски в зависимости от типа поверхности.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Мобильная версия.</span> Работает на всех устройствах — рассчитывайте расход краски где угодно.
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
                    <h2 className="text-xl font-semibold mb-3 text-foreground">Пошаговое руководство по расчету краски</h2>
                    <ol className="list-decimal ml-5 space-y-2 text-sm text-muted-foreground">
                        <li>Введите размеры комнаты: длину, ширину и высоту стен в метрах.</li>
                        <li>Укажите количество окон и дверей — калькулятор автоматически вычтет их площадь.</li>
                        <li>Выберите количество слоев краски (обычно 2 слоя для качественного покрытия).</li>
                        <li>Укажите расход краски на м² (обычно 8-12 л/м², указано на банке).</li>
                        <li>Получите точный расчет в литрах и добавьте 10% про запас.</li>
                </ol>
                    <p className="mt-3 text-sm text-muted-foreground">
                        💡 Совет: Всегда покупайте краску с небольшим запасом (10-15%) на случай непредвиденных ситуаций и подкрашивания.
                    </p>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Часто задаваемые вопросы о расчете краски</h2>
                <div className="space-y-4 text-sm text-muted-foreground">
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Как правильно рассчитать расход краски?
                        </summary>
                        <p className="mt-2">
                            Введите точные размеры комнаты, укажите количество окон и дверей, выберите количество слоев и расход краски. 
                            Калькулятор автоматически учтет все факторы и даст точный результат.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Сколько слоев краски нужно наносить?
                        </summary>
                        <p className="mt-2">
                            Обычно достаточно 2 слоев для качественного покрытия. Для темных цветов или при покраске поверх темной краски может потребоваться 3 слоя.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Нужно ли учитывать запас при покупке краски?
                        </summary>
                        <p className="mt-2">
                            Да, обязательно добавьте 10-15% к расчетному количеству на случай непредвиденных ситуаций, подкрашивания и возможных ошибок при нанесении.
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
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500/15 to-rose-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner text-rose-500">
                                <Paintbrush className="h-5 w-5" />
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
                        url="/calculators/paint"
                        title="Калькулятор краски онлайн — рассчитать расход краски | Renohacks"
                        description="Онлайн калькулятор краски: введите размеры комнаты и узнайте, сколько литров краски нужно"
                    />
            </div>
            </section>
        </main>
    )
}
