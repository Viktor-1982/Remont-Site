import { getPageMetadata } from "@/lib/seo"
import Link from "next/link"
import {
    Calculator,
    Grid3X3,
    Layers,
    Lightbulb,
    Paintbrush,
    Palette,
    Ruler,
    ShoppingCart,
    Sparkles,
    Thermometer,
    Wallet,
    Wallpaper,
    Wind,
} from "lucide-react"
import Script from "next/script"

export const metadata = getPageMetadata("/tools", {
    title: "Инструменты для ремонта: краска, пол, стяжка, плинтус | Renohacks",
    description:
        "Точные инструменты для ремонта: краска, обои, плитка, напольные покрытия, стяжка, плинтус, вентиляция, теплый пол и бюджет.",
    cover: "/images/og-default.png",
    type: "website",
})

const baseUrl = "https://renohacks.com"

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: `${baseUrl}/`,
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Инструменты",
            item: `${baseUrl}/tools`,
        },
    ],
}

const calculators = [
    {
        href: "/calculators/paint",
        label: "Калькулятор краски",
        emoji: "🎨",
        icon: Paintbrush,
        desc: "Рассчитайте расход краски по размерам комнаты с учетом окон, дверей и количества слоев.",
        badge: "Стены и потолки",
        gradient: "from-rose-500/15 via-rose-400/10 to-orange-400/10",
    },
    {
        href: "/calculators/wallpaper",
        label: "Калькулятор обоев",
        emoji: "🪟",
        icon: Wallpaper,
        desc: "Узнайте, сколько рулонов обоев нужно с учетом раппорта, запаса и размеров комнаты.",
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
        href: "/calculators/flooring",
        label: "Калькулятор напольного покрытия",
        emoji: "🪵",
        icon: Layers,
        desc: "Рассчитайте ламинат, кварцвинил или паркетную доску по площади комнаты, упаковкам, подложке и запасу.",
        badge: "Ламинат и LVT",
        gradient: "from-lime-500/15 via-emerald-400/10 to-teal-400/10",
    },
    {
        href: "/calculators/baseboard",
        label: "Калькулятор плинтуса",
        emoji: "📏",
        icon: Ruler,
        desc: "Узнайте длину плинтуса, количество планок, вычет проемов и примерную стоимость.",
        badge: "Периметр и планки",
        gradient: "from-amber-500/15 via-orange-400/10 to-yellow-400/10",
    },
    {
        href: "/calculators/screed",
        label: "Калькулятор стяжки пола",
        emoji: "🧰",
        icon: Layers,
        desc: "Рассчитайте объем стяжки, расход сухой смеси, количество мешков, воду на замес и ориентировочную стоимость.",
        badge: "Основание пола",
        gradient: "from-stone-500/15 via-slate-400/10 to-zinc-400/10",
    },
    {
        href: "/calculators/underfloor-heating",
        label: "Калькулятор теплого пола",
        emoji: "🔥",
        icon: Thermometer,
        desc: "Рассчитайте мощность, длину кабеля или площадь матов и энергопотребление.",
        badge: "Теплый пол",
        gradient: "from-orange-500/15 via-amber-400/10 to-yellow-400/10",
    },
    {
        href: "/calculators/ventilation",
        label: "Калькулятор вентиляции",
        emoji: "🌬️",
        icon: Wind,
        desc: "Рассчитайте расход воздуха по объему помещения и кратности воздухообмена.",
        badge: "Вентиляция",
        gradient: "from-cyan-500/15 via-sky-400/10 to-blue-400/10",
    },
    {
        href: "/calculators/lighting",
        label: "Калькулятор освещенности",
        emoji: "💡",
        icon: Lightbulb,
        desc: "Узнайте, сколько люмен нужно комнате и сколько ламп установить по площади и типу помещения.",
        badge: "Освещение",
        gradient: "from-amber-500/15 via-yellow-400/10 to-orange-400/10",
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
    {
        href: "/calculators/color-palette",
        label: "Генератор цветовых палитр",
        emoji: "🎨",
        icon: Palette,
        desc: "Создайте гармоничную цветовую схему для интерьера с рекомендациями по применению.",
        badge: "Дизайн и цвета",
        gradient: "from-purple-500/15 via-pink-400/10 to-rose-400/10",
    },
    {
        href: "/quiz/interior-style",
        label: "Квиз: стиль интерьера",
        emoji: "✨",
        icon: Sparkles,
        desc: "Пройдите тест и узнайте, какой стиль интерьера лучше всего подходит вашему вкусу и образу жизни.",
        badge: "Дизайн",
        gradient: "from-indigo-500/15 via-purple-400/10 to-pink-400/10",
    },
    {
        href: "/tools/materials-checklist",
        label: "Чеклист покупок материалов",
        emoji: "🛒",
        icon: ShoppingCart,
        desc: "Полный список материалов для ремонта с возможностью отмечать уже купленные позиции.",
        badge: "Планирование",
        gradient: "from-green-500/15 via-emerald-400/10 to-teal-400/10",
    },
] as const

export default function ToolsIndexPage() {
    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <section className="mb-10 sm:mb-14">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                    <Calculator className="h-3.5 w-3.5" />
                    <span>Инструменты для ремонта Renohacks</span>
                </div>
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Умные инструменты для ремонта квартиры и дома
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Выберите инструмент, чтобы за пару минут прикинуть расход материалов и бюджет.
                    Инструменты учитывают реальные размеры помещений, запасы и особенности монтажа.
                </p>
            </section>

            <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {calculators.map((calc) => {
                    const Icon = calc.icon
                    return (
                        <Link
                            key={calc.href}
                            href={calc.href}
                            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/95 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-2xl sm:p-6"
                        >
                            <div
                                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${calc.gradient} opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
                                aria-hidden
                            />
                            <div className="relative z-10 flex h-full flex-col">
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-background/80 text-lg">
                                        {calc.emoji}
                                    </span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
                                        <Icon className="h-3.5 w-3.5" />
                                        {calc.badge}
                                    </span>
                                </div>

                                <h2 className="mb-2 text-base font-semibold text-foreground sm:text-lg">
                                    {calc.label}
                                </h2>
                                <p className="flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                    {calc.desc}
                                </p>

                                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary transition-all group-hover:gap-3">
                                    Открыть
                                    <span className="translate-y-[1px]">→</span>
                                </span>
                            </div>
                        </Link>
                    )
                })}
            </section>

            <section className="mt-10 rounded-2xl border border-border/60 bg-card/95 p-5 shadow-sm sm:mt-14 sm:p-6">
                <h2 className="mb-2 text-base font-semibold sm:text-lg">Как использовать инструменты Renohacks</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                    Начните с планировщика бюджета, чтобы понять общий диапазон затрат, затем переходите к
                    точечным расчетам по полу, стенам и инженерным системам. Результаты удобно использовать
                    как основу для закупки материалов и обсуждения сметы с подрядчиком.
                </p>
            </section>

            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
        </main>
    )
}
