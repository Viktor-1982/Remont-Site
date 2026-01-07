"use client"

import Link from "next/link"
import { Paintbrush, Wallpaper, Grid3X3, Wallet, Palette, Calculator, ArrowRight, Sparkles, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"

interface CalculatorItem {
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
        href: "/calculators/paint",
        label: "Калькулятор краски",
        emoji: "🎨",
        icon: Paintbrush,
        desc: "Рассчитайте расход краски по размерам комнаты с учётом окон, дверей и количества слоёв.",
        badge: "Стены и потолки",
        gradient: "from-rose-500/15 via-rose-400/10 to-orange-400/10",
        color: "rose",
    },
    {
        href: "/calculators/wallpaper",
        label: "Калькулятор обоев",
        emoji: "🪟",
        icon: Wallpaper,
        desc: "Узнайте, сколько рулонов обоев нужно с учётом раппорта, запаса и размеров комнаты.",
        badge: "Обои и рисунок",
        gradient: "from-emerald-500/15 via-emerald-400/10 to-teal-400/10",
        color: "emerald",
    },
    {
        href: "/calculators/tile",
        label: "Калькулятор плитки",
        emoji: "🧱",
        icon: Grid3X3,
        desc: "Подсчитайте плитку для пола и стен, процент отходов и примерный расход клея.",
        badge: "Пол и стены",
        gradient: "from-sky-500/15 via-sky-400/10 to-indigo-400/10",
        color: "sky",
    },
    {
        href: "/calculators/budget",
        label: "Планировщик бюджета",
        emoji: "💰",
        icon: Wallet,
        desc: "Соберите смету по категориям работ, валюте и резерву, чтобы контролировать бюджет ремонта.",
        badge: "Полная смета",
        gradient: "from-amber-500/20 via-orange-400/10 to-rose-400/10",
        color: "amber",
    },
    {
        href: "/calculators/color-palette",
        label: "Генератор цветовых палитр",
        emoji: "🎨",
        icon: Palette,
        desc: "Создайте гармоничную цветовую схему для вашего интерьера с рекомендациями по применению.",
        badge: "Дизайн и цвета",
        gradient: "from-purple-500/15 via-pink-400/10 to-rose-400/10",
        color: "purple",
    },
    {
        href: "/quiz/interior-style",
        label: "Квиз: стиль интерьера",
        emoji: "✨",
        icon: Sparkles,
        desc: "Пройдите тест и узнайте, какой стиль интерьера лучше всего подходит вашему вкусу и образу жизни.",
        badge: "Дизайн",
        gradient: "from-indigo-500/15 via-purple-400/10 to-pink-400/10",
        color: "indigo",
    },
    {
        href: "/tools/materials-checklist",
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
        href: "/en/calculators/paint",
        label: "Paint Calculator",
        emoji: "🎨",
        icon: Paintbrush,
        desc: "Estimate paint needed by room size, including windows, doors, and number of coats.",
        badge: "Walls & ceilings",
        gradient: "from-rose-500/15 via-rose-400/10 to-orange-400/10",
        color: "rose",
    },
    {
        href: "/en/calculators/wallpaper",
        label: "Wallpaper Calculator",
        emoji: "🪟",
        icon: Wallpaper,
        desc: "Find out how many wallpaper rolls you need, considering pattern repeat and waste.",
        badge: "Wallpaper & pattern",
        gradient: "from-emerald-500/15 via-emerald-400/10 to-teal-400/10",
        color: "emerald",
    },
    {
        href: "/en/calculators/tile",
        label: "Tile Calculator",
        emoji: "🧱",
        icon: Grid3X3,
        desc: "Calculate tiles for floors and walls, waste percentage, and approximate adhesive.",
        badge: "Floors & walls",
        gradient: "from-sky-500/15 via-sky-400/10 to-indigo-400/10",
        color: "sky",
    },
    {
        href: "/en/calculators/budget",
        label: "Budget Planner",
        emoji: "💰",
        icon: Wallet,
        desc: "Build a renovation budget by work category, currency, and reserve for extra costs.",
        badge: "Full budget",
        gradient: "from-amber-500/20 via-orange-400/10 to-rose-400/10",
        color: "amber",
    },
    {
        href: "/en/calculators/color-palette",
        label: "Color Palette Generator",
        emoji: "🎨",
        icon: Palette,
        desc: "Create a harmonious color scheme for your interior with application recommendations.",
        badge: "Design & colors",
        gradient: "from-purple-500/15 via-pink-400/10 to-rose-400/10",
        color: "purple",
    },
    {
        href: "/en/quiz/interior-style",
        label: "Interior Style Quiz",
        emoji: "✨",
        icon: Sparkles,
        desc: "Take a quiz to discover which interior style best matches your taste and lifestyle.",
        badge: "Design",
        gradient: "from-indigo-500/15 via-purple-400/10 to-pink-400/10",
        color: "indigo",
    },
    {
        href: "/en/tools/materials-checklist",
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
}

export function CalculatorsShowcase({ isEnglish = false }: CalculatorsShowcaseProps) {
    const items = isEnglish ? calculatorsEn : calculators
    const t = {
        title: isEnglish ? "Smart Renovation Tools" : "Умные инструменты для ремонта",
        subtitle: isEnglish 
            ? "Free calculators and tools to help you plan your renovation project" 
            : "Бесплатные калькуляторы и инструменты для планирования ремонта",
        viewAll: isEnglish ? "View all tools" : "Все инструменты",
    }

    return (
        <section className="relative py-16 sm:py-20 overflow-hidden">
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
                    className="text-center mb-12 sm:mb-16"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary mb-6">
                        <Calculator className="w-4 h-4" />
                        <span>{isEnglish ? "Free Tools" : "Бесплатные инструменты"}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                            {t.title}
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </motion.div>

                {/* Сетка инструментов */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
                    {items.map((calc, index) => {
                        const Icon = calc.icon
                        return (
                            <motion.div
                                key={calc.href}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link
                                    href={calc.href}
                                    className="group relative block h-full"
                                >
                                    <div className="relative h-full rounded-2xl border border-border/60 bg-card/80 dark:bg-card/90 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/50 overflow-hidden">
                                        {/* Градиентный фон */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${calc.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                        
                                        {/* Декоративные элементы */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 dark:bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                                        
                                        <div className="relative z-10">
                                            {/* Иконка и бейдж */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                                                    <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                                                        {calc.emoji}
                                                    </div>
                                                </div>
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20">
                                                    <Icon className="w-3 h-3" />
                                                    {calc.badge}
                                                </span>
                                            </div>

                                            {/* Заголовок */}
                                            <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                                                {calc.label}
                                            </h3>

                                            {/* Описание */}
                                            <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4 line-clamp-2">
                                                {calc.desc}
                                            </p>

                                            {/* Стрелка */}
                                            <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                                                <span className="text-sm font-semibold">
                                                    {isEnglish ? "Open" : "Открыть"}
                                                </span>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
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
                    className="text-center"
                >
                    <Link
                        href={isEnglish ? "/en/tools" : "/tools"}
                        className="group inline-flex items-center gap-2 rounded-xl border-2 border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 dark:from-primary/20 dark:via-primary/10 dark:to-accent/20 px-6 py-3 font-semibold text-foreground hover:text-primary transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
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

