import { getPageMetadata } from "@/lib/seo"
import { ColorPaletteGenerator } from "@/components/widgets/color-palette-generator"
import { ShareButton } from "@/components/share-button"
import Link from "next/link"
import { Paintbrush, Layers } from "lucide-react"

export const metadata = getPageMetadata("/calculators/color-palette", {
    title: "Генератор цветовых палитр для ремонта — подбор гармоничных цветов | Renohacks",
    description:
        "Создайте гармоничную цветовую палитру для вашего ремонта. Генератор цветовых схем с рекомендациями по применению. Бесплатный инструмент Renohacks.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function ColorPalettePage() {
    return (
        <main className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-4">Генератор цветовых палитр</h1>
            <p className="text-muted-foreground mb-8">
                Создайте гармоничную цветовую схему для вашего интерьера. Выберите базовый цвет и тип палитры, 
                получите готовую палитру из 5-6 цветов с рекомендациями по применению.
            </p>
            <ColorPaletteGenerator />

            <section className="mt-10 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 px-6 py-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">Как использовать генератор палитр</h2>
                    <ol className="list-decimal ml-5 space-y-2 text-sm text-muted-foreground">
                        <li>Выберите базовый цвет — тот, который вам нравится или уже есть в интерьере.</li>
                        <li>Выберите тип цветовой схемы: аналогичная, дополнительная, триада, монохромная или раздельно-дополнительная.</li>
                        <li>Нажмите &quot;Сгенерировать палитру&quot; — получите гармоничную палитру из 5-6 цветов.</li>
                        <li>Скопируйте коды цветов или экспортируйте палитру как изображение.</li>
                        <li>Используйте рекомендации по применению для создания гармоничного интерьера.</li>
                    </ol>
                </div>
            </section>

            <section className="mt-10 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 px-6 py-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">Типы цветовых схем</h2>
                    <div className="space-y-4 text-sm text-muted-foreground">
                        <div>
                            <h3 className="font-semibold text-foreground mb-1">Аналогичная схема</h3>
                            <p>Соседние цвета на цветовом круге. Создает спокойную и гармоничную атмосферу. Идеально для спален и гостиных.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-1">Дополнительная схема</h3>
                            <p>Противоположные цвета на цветовом круге. Создает динамичный и энергичный интерьер. Подходит для современных интерьеров.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-1">Триада</h3>
                            <p>Три равноудаленных цвета. Яркая и сбалансированная палитра. Идеально для детских комнат и творческих пространств.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-1">Монохромная схема</h3>
                            <p>Оттенки одного цвета. Элегантная и утонченная палитра. Идеально для минималистичных интерьеров.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-1">Раздельно-дополнительная</h3>
                            <p>Баланс между контрастом и гармонией. Создает интересный, но не перегруженный интерьер. Подходит для гостиных.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Дополнительные инструменты</h2>
                <div className="grid gap-4 md:grid-cols-2">
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
                                    Рассчитайте расход краски для вашей цветовой палитры.
                                </p>
                            </div>
                        </div>
                    </Link>
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
                                <p className="text-base font-semibold text-foreground">Планировщик бюджета</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Рассчитайте стоимость ремонта с учетом выбранных цветов.
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            <section className="mt-12 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 p-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Поделитесь генератором</h2>
                    <ShareButton
                        url="https://renohacks.com/calculators/color-palette"
                        title="Генератор цветовых палитр для ремонта | Renohacks"
                        description="Создайте гармоничную цветовую палитру для вашего интерьера"
                    />
                </div>
            </section>
        </main>
    )
}

