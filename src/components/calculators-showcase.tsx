"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Paintbrush, Wallpaper, Grid3X3, Wallet, Palette, Calculator, ArrowRight, Sparkles, ShoppingCart, Thermometer, Wind, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"

interface CalculatorItem {
    id: string
    href: string
    label: string
    emoji: string
    icon: React.ComponentType<{ className?: string }>
    desc: string
    badge: string
    gradient: string
    color: string
}

const calculators: CalculatorItem[] = [
    {
        id: "paint",
        href: "/ru/calculators/paint",
        label: "Калькулятор краски",
        emoji: "🎨",
        icon: Paintbrush,
        desc: "Рассчитайте расход краски по размерам комнаты с учётом окон, дверей и количества слоёв.",
        badge: "Стены и потолки",
        gradient: "from-rose-500/15 via-rose-400/10 to-orange-400/10",
        color: "rose",
    },
    {
        id: "wallpaper",
        href: "/ru/calculators/wallpaper",
        label: "Калькулятор обоев",
        emoji: "🪟",
        icon: Wallpaper,
        desc: "Узнайте, сколько рулонов обоев нужно с учётом раппорта, запаса и размеров комнаты.",
        badge: "Обои и рисунок",
        gradient: "from-emerald-500/15 via-emerald-400/10 to-teal-400/10",
        color: "emerald",
    },
    {
        id: "tile",
        href: "/ru/calculators/tile",
        label: "Калькулятор плитки",
        emoji: "🧱",
        icon: Grid3X3,
        desc: "Подсчитайте плитку для пола и стен, процент отходов и примерный расход клея.",
        badge: "Пол и стены",
        gradient: "from-sky-500/15 via-sky-400/10 to-indigo-400/10",
        color: "sky",
    },
    {
        id: "underfloor-heating",
        href: "/ru/calculators/underfloor-heating",
        label: "Калькулятор тёплого пола",
        emoji: "🔥",
        icon: Thermometer,
        desc: "Рассчитайте мощность, длину кабеля/мата и примерное энергопотребление.",
        badge: "Тёплый пол",
        gradient: "from-orange-500/15 via-amber-400/10 to-yellow-400/10",
        color: "orange",
    },
    {
        id: "ventilation",
        href: "/ru/calculators/ventilation",
        label: "Калькулятор вентиляции",
        emoji: "🌬️",
        icon: Wind,
        desc: "Рассчитайте расход воздуха по объёму и кратности воздухообмена.",
        badge: "Вентиляция",
        gradient: "from-cyan-500/15 via-sky-400/10 to-blue-400/10",
        color: "cyan",
    },
    {
        id: "lighting",
        href: "/ru/calculators/lighting",
        label: "Калькулятор освещённости",
        emoji: "💡",
        icon: Lightbulb,
        desc: "Узнайте, сколько люмен нужно комнате и сколько ламп установить.",
        badge: "Освещение",
        gradient: "from-amber-500/15 via-yellow-400/10 to-orange-400/10",
        color: "amber",
    },
    {
        id: "budget",
        href: "/ru/calculators/budget",
        label: "Планировщик бюджета",
        emoji: "💰",
        icon: Wallet,
        desc: "Соберите смету по категориям работ, валюте и резерву, чтобы контролировать бюджет ремонта.",
        badge: "Полная смета",
        gradient: "from-amber-500/20 via-orange-400/10 to-rose-400/10",
        color: "amber",
    },
    {
        id: "color-palette",
        href: "/ru/calculators/color-palette",
        label: "Генератор цветовых палитр",
        emoji: "🎨",
        icon: Palette,
        desc: "Создайте гармоничную цветовую схему для вашего интерьера с рекомендациями по применению.",
        badge: "Дизайн и цвета",
        gradient: "from-purple-500/15 via-pink-400/10 to-rose-400/10",
        color: "purple",
    },
    {
        id: "quiz",
        href: "/ru/quiz/interior-style",
        label: "Квиз: стиль интерьера",
        emoji: "✨",
        icon: Sparkles,
        desc: "Пройдите тест и узнайте, какой стиль интерьера лучше всего подходит вашему вкусу и образу жизни.",
        badge: "Дизайн",
        gradient: "from-indigo-500/15 via-purple-400/10 to-pink-400/10",
        color: "indigo",
    },
    {
        id: "materials-checklist",
        href: "/ru/tools/materials-checklist",
        label: "Чеклист покупок материалов",
        emoji: "🛒",
        icon: ShoppingCart,
        desc: "Полный список материалов для ремонта с возможностью отмечать купленное. Ничего не забудьте купить.",
        badge: "Планирование",
        gradient: "from-green-500/15 via-emerald-400/10 to-teal-400/10",
        color: "green",
    },
]

const calculatorsEn: CalculatorItem[] = [
    {
        id: "paint",
        href: "/calculators/paint",
        label: "Paint Calculator",
        emoji: "🎨",
        icon: Paintbrush,
        desc: "Estimate paint needed by room size, including windows, doors, and number of coats.",
        badge: "Walls & ceilings",
        gradient: "from-rose-500/15 via-rose-400/10 to-orange-400/10",
        color: "rose",
    },
    {
        id: "wallpaper",
        href: "/calculators/wallpaper",
        label: "Wallpaper Calculator",
        emoji: "🪟",
        icon: Wallpaper,
        desc: "Find out how many wallpaper rolls you need, considering pattern repeat and waste.",
        badge: "Wallpaper & pattern",
        gradient: "from-emerald-500/15 via-emerald-400/10 to-teal-400/10",
        color: "emerald",
    },
    {
        id: "tile",
        href: "/calculators/tile",
        label: "Tile Calculator",
        emoji: "🧱",
        icon: Grid3X3,
        desc: "Calculate tiles for floors and walls, waste percentage, and approximate adhesive.",
        badge: "Floors & walls",
        gradient: "from-sky-500/15 via-sky-400/10 to-indigo-400/10",
        color: "sky",
    },
    {
        id: "underfloor-heating",
        href: "/calculators/underfloor-heating",
        label: "Underfloor Heating",
        emoji: "🔥",
        icon: Thermometer,
        desc: "Estimate power, cable/mat size, and monthly energy use.",
        badge: "Floor heating",
        gradient: "from-orange-500/15 via-amber-400/10 to-yellow-400/10",
        color: "orange",
    },
    {
        id: "ventilation",
        href: "/calculators/ventilation",
        label: "Ventilation Calculator",
        emoji: "🌬️",
        icon: Wind,
        desc: "Calculate airflow by room volume and air changes per hour.",
        badge: "Ventilation",
        gradient: "from-cyan-500/15 via-sky-400/10 to-blue-400/10",
        color: "cyan",
    },
    {
        id: "lighting",
        href: "/calculators/lighting",
        label: "Lighting Calculator",
        emoji: "💡",
        icon: Lightbulb,
        desc: "Find how many lumens and lamps your room needs by area and type.",
        badge: "Lighting",
        gradient: "from-amber-500/15 via-yellow-400/10 to-orange-400/10",
        color: "amber",
    },
    {
        id: "budget",
        href: "/calculators/budget",
        label: "Budget Planner",
        emoji: "💰",
        icon: Wallet,
        desc: "Build a renovation budget by work category, currency, and reserve for extra costs.",
        badge: "Full budget",
        gradient: "from-amber-500/20 via-orange-400/10 to-rose-400/10",
        color: "amber",
    },
    {
        id: "color-palette",
        href: "/calculators/color-palette",
        label: "Color Palette Generator",
        emoji: "🎨",
        icon: Palette,
        desc: "Create a harmonious color scheme for your interior with application recommendations.",
        badge: "Design & colors",
        gradient: "from-purple-500/15 via-pink-400/10 to-rose-400/10",
        color: "purple",
    },
    {
        id: "quiz",
        href: "/quiz/interior-style",
        label: "Interior Style Quiz",
        emoji: "✨",
        icon: Sparkles,
        desc: "Take a quiz to discover which interior style best matches your taste and lifestyle.",
        badge: "Design",
        gradient: "from-indigo-500/15 via-purple-400/10 to-pink-400/10",
        color: "indigo",
    },
    {
        id: "materials-checklist",
        href: "/tools/materials-checklist",
        label: "Materials Purchase Checklist",
        emoji: "🛒",
        icon: ShoppingCart,
        desc: "Complete list of renovation materials with ability to mark purchased items. Never forget to buy anything.",
        badge: "Planning",
        gradient: "from-green-500/15 via-emerald-400/10 to-teal-400/10",
        color: "green",
    },
]

interface CalculatorsShowcaseProps {
    isEnglish?: boolean
    limit?: number
    title?: string
    subtitle?: string
    badgeLabel?: string
}

const featuredToolIds = ["budget", "paint", "tile", "lighting"]

export function CalculatorsShowcase({
    isEnglish = false,
    limit,
    title,
    subtitle,
    badgeLabel,
}: CalculatorsShowcaseProps) {
    const router = useRouter()
    const baseItems = isEnglish ? calculatorsEn : calculators
    const prioritizedItems =
        typeof limit === "number"
            ? [
                ...featuredToolIds
                    .map((id) => baseItems.find((item) => item.id === id))
                    .filter((item): item is CalculatorItem => Boolean(item)),
                ...baseItems.filter((item) => !featuredToolIds.includes(item.id)),
            ]
            : baseItems
    const items = typeof limit === "number" ? prioritizedItems.slice(0, limit) : prioritizedItems
    const isCompact = typeof limit === "number" && limit <= 4
    const t = {
        title: title ?? (isEnglish ? "Smart Renovation Tools" : "Умные инструменты для ремонта"),
        subtitle: subtitle ?? (
            isEnglish
                ? "Free renovation tools to help you plan materials, lighting, and budget"
                : "Бесплатные инструменты для планирования бюджета, материалов и освещения"
        ),
        viewAll: isEnglish ? "View all tools" : "Все инструменты",
        badgeLabel: badgeLabel ?? (isEnglish ? "Free Tools" : "Бесплатные инструменты"),
    }

    return (
        <section className={`relative overflow-hidden ${isCompact ? "py-10 sm:py-12" : "py-16 sm:py-20"}`}>
            {/* Декоративный фон */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/10 dark:via-transparent dark:to-accent/10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Заголовок */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
                >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4">
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                        <span>{t.badgeLabel}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
                        {t.title}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {t.subtitle}
                    </p>
                </motion.div>

                {/* Сетка инструментов */}
                <div className={`grid gap-6 ${isCompact ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
                    {items.map((calc, index) => {
                        const Icon = calc.icon
                        return (
                            <motion.div
                                key={calc.href}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="group relative rounded-3xl border border-border/50 bg-card p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
                            >
                                {/* Фоновый градиент при наведении */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${calc.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                
                                <div className="relative z-10 flex-grow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-2xl bg-${calc.color}-500/10 text-${calc.color}-500 group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground group-hover:bg-background transition-colors">
                                            {calc.badge}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                                        <span>{calc.label}</span>
                                        <span className="text-lg opacity-80 group-hover:scale-125 transition-transform duration-300">{calc.emoji}</span>
                                    </h3>
                                    
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                        {calc.desc}
                                    </p>
                                </div>
                                
                                <div className="relative z-10 pt-4 border-t border-border/30 group-hover:border-border/10 transition-colors">
                                    <Link
                                        href={calc.href}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-primary-hover"
                                    >
                                        <span>{isEnglish ? "Open tool" : "Открыть инструмент"}</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Кнопка "Все инструменты" */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <Link
                        href={isEnglish ? "/tools" : "/ru/tools"}
                        className="group inline-flex items-center gap-2 rounded-xl border-2 border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 dark:from-primary/20 dark:via-primary/10 dark:to-accent/20 px-6 py-3 font-semibold text-foreground hover:text-primary transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
                        onClick={(e) => {
                            e.preventDefault()
                            router.push(isEnglish ? "/tools" : "/ru/tools")
                        }}
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span>{t.viewAll}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
