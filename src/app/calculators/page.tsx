import { getPageMetadata } from "@/lib/seo"
import Link from "next/link"
import { Calculator, Paintbrush, Wallpaper, Grid3X3, Wallet } from "lucide-react"

export const metadata = getPageMetadata("/calculators", {
    title: "Калькуляторы для ремонта: краска, обои, плитка, бюджет | Renohacks",
    description:
        "Современные калькуляторы ремонта: расход краски, количество обоев и плитки, планировщик бюджета. Точные расчёты материалов и стоимости для квартиры и дома.",
    cover: "/images/og-default.png",
    type: "website",
})

const calculators = [
    {
        href: "/calculators/paint",
        label: "Калькулятор краски",
        emoji: "🎨",
        icon: Paintbrush,
        desc: "Рассчитайте расход краски по размерам комнаты с учётом окон, дверей и количества слоёв.",
        badge: "Стены и потолки",
        gradient: "from-rose-500/15 via-rose-400/10 to-orange-400/10",
    },
    {
        href: "/calculators/wallpaper",
        label: "Калькулятор обоев",
        emoji: "🪟",
        icon: Wallpaper,
        desc: "Узнайте, сколько рулонов обоев нужно с учётом раппорта, запаса и размеров комнаты.",
        badge: "Обои и рисунок",
        gradient: "from-emerald-500/15 via-emerald-400/10 to-teal-400/10",
    },
    {
        href: "/calculators/tile",
        label: "Калькулятор плитки",
        emoji: "🧱",
        icon: Grid3X3,
        desc: "Подсчитайте плитку для пола и стен, процент отходов и примерный расход клея.",
        badge: "Пол и стены",
        gradient: "from-sky-500/15 via-sky-400/10 to-indigo-400/10",
    },
    {
        href: "/calculators/budget",
        label: "Планировщик бюджета",
        emoji: "💰",
        icon: Wallet,
        desc: "Соберите смету по категориям работ, валюте и резерву, чтобы контролировать бюджет ремонта.",
        badge: "Полная смета",
        gradient: "from-amber-500/20 via-orange-400/10 to-rose-400/10",
    },
] as const

export default function CalculatorsIndexPage() {
    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            {/* 🎯 Hero-блок для раздела калькуляторов */}
            <section className="mb-10 sm:mb-14">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-4">
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Калькуляторы ремонта Renohacks</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
                    Умные калькуляторы для ремонта квартиры и дома
                </h1>
                <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Выберите калькулятор, чтобы за пару минут прикинуть расход материалов и бюджет.
                    Инструменты учитывают реальные параметры помещений, запасы и особенности укладки.
                </p>
            </section>

            {/* 🧮 Сетка калькуляторов */}
            <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {calculators.map((calc) => {
                    const Icon = calc.icon
                    return (
                        <Link
                            key={calc.href}
                            href={calc.href}
                            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/95 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-primary/60"
                        >
                            {/* Декоративный градиент */}
                            <div
                                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${calc.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
                                aria-hidden
                            />

                            {/* Содержимое */}
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-background/80 border border-primary/30 text-lg">
                                        {calc.emoji}
                                    </span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
                                        <Icon className="w-3.5 h-3.5" />
                                        {calc.badge}
                                    </span>
                                </div>

                                <h2 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                                    {calc.label}
                                </h2>
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1">
                                    {calc.desc}
                                </p>

                                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary group-hover:gap-3 transition-all">
                                    Открыть калькулятор
                                    <span className="translate-y-[1px]">→</span>
                                </span>
                            </div>
                        </Link>
                    )
                })}
            </section>

            {/* ℹ️ Подпоясняющий блок */}
            <section className="mt-10 sm:mt-14 rounded-2xl border border-border/60 bg-card/95 p-5 sm:p-6 shadow-sm">
                <h2 className="text-base sm:text-lg font-semibold mb-2">
                    Как использовать калькуляторы Renohacks
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Начните с планировщика бюджета, чтобы понять общую стоимость ремонта, затем используйте
                    калькуляторы материалов для детальной проработки каждой комнаты. Все результаты можно
                    сохранить, пересчитать и использовать как основу для сметы с подрядчиками.
                </p>
            </section>
        </main>
    )
}
