import { getPageMetadata } from "@/lib/seo"
import Link from "next/link"
import { Calculator, Paintbrush, Wallpaper, Grid3X3, Wallet, Palette, Sparkles, ShoppingCart, Thermometer, Wind } from "lucide-react"
import Script from "next/script"

export const metadata = getPageMetadata("/en/tools", {
    title: "Renovation tools: paint, wallpaper, tile, ventilation | Renohacks",
    description:
        "Modern renovation tools: paint coverage, wallpaper rolls, tiles, ventilation, underfloor heating and budget planning. Accurate material and cost estimates for your home.",
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
            name: "Home",
            item: `${baseUrl}/en`,
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Tools",
            item: `${baseUrl}/en/tools`,
        },
    ],
}

const calculatorsEn = [
    {
        href: "/en/calculators/paint",
        label: "Paint Calculator",
        emoji: "🎨",
        icon: Paintbrush,
        desc: "Estimate paint needed by room size, including windows, doors, and number of coats.",
        badge: "Walls & ceilings",
        gradient: "from-rose-500/15 via-rose-400/10 to-orange-400/10",
    },
    {
        href: "/en/calculators/wallpaper",
        label: "Wallpaper Calculator",
        emoji: "🪟",
        icon: Wallpaper,
        desc: "Find out how many wallpaper rolls you need, considering pattern repeat and waste.",
        badge: "Wallpaper & pattern",
        gradient: "from-emerald-500/15 via-emerald-400/10 to-teal-400/10",
    },
    {
        href: "/en/calculators/tile",
        label: "Tile Calculator",
        emoji: "🧱",
        icon: Grid3X3,
        desc: "Calculate tiles for floors and walls, waste percentage, and approximate adhesive.",
        badge: "Floors & walls",
        gradient: "from-sky-500/15 via-sky-400/10 to-indigo-400/10",
    },
    {
        href: "/en/calculators/underfloor-heating",
        label: "Underfloor Heating",
        emoji: "🔥",
        icon: Thermometer,
        desc: "Estimate power, cable/mat size, and monthly energy usage.",
        badge: "Floor heating",
        gradient: "from-orange-500/15 via-amber-400/10 to-yellow-400/10",
    },
    {
        href: "/en/calculators/ventilation",
        label: "Ventilation Calculator",
        emoji: "🌬️",
        icon: Wind,
        desc: "Calculate airflow by room volume and air changes per hour.",
        badge: "Ventilation",
        gradient: "from-cyan-500/15 via-sky-400/10 to-blue-400/10",
    },
    {
        href: "/en/calculators/budget",
        label: "Budget Planner",
        emoji: "💰",
        icon: Wallet,
        desc: "Build a renovation budget by work category, currency, and reserve for extra costs.",
        badge: "Full budget",
        gradient: "from-amber-500/20 via-orange-400/10 to-rose-400/10",
    },
    {
        href: "/en/calculators/color-palette",
        label: "Color Palette Generator",
        emoji: "🎨",
        icon: Palette,
        desc: "Create a harmonious color scheme for your interior with application recommendations.",
        badge: "Design & colors",
        gradient: "from-purple-500/15 via-pink-400/10 to-rose-400/10",
    },
    {
        href: "/en/quiz/interior-style",
        label: "Interior Style Quiz",
        emoji: "✨",
        icon: Sparkles,
        desc: "Take a quiz to discover which interior style best matches your taste and lifestyle.",
        badge: "Design",
        gradient: "from-indigo-500/15 via-purple-400/10 to-pink-400/10",
    },
    {
        href: "/en/tools/materials-checklist",
        label: "Materials Purchase Checklist",
        emoji: "🛒",
        icon: ShoppingCart,
        desc: "Complete list of renovation materials with ability to mark purchased items. Never forget to buy anything.",
        badge: "Planning",
        gradient: "from-green-500/15 via-emerald-400/10 to-teal-400/10",
    },
] as const

export default function ToolsIndexPageEn() {
    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            {/* 🎯 Hero section for tools */}
            <section className="mb-10 sm:mb-14">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-4">
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Renohacks renovation tools</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
                    Smart tools for your home renovation
                </h1>
                <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Choose a tool to estimate materials and budget in just a couple of minutes.
                    Each tool is optimized for real-world room dimensions, waste, and installation specifics.
                </p>
            </section>

            {/* 🧮 Tools grid */}
            <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {calculatorsEn.map((calc) => {
                    const Icon = calc.icon
                    return (
                        <Link
                            key={calc.href}
                            href={calc.href}
                            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/95 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-primary/60"
                        >
                            {/* Decorative gradient */}
                            <div
                                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${calc.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
                                aria-hidden
                            />

                            {/* Content */}
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
                                    Open
                                    <span className="translate-y-[1px]">→</span>
                                </span>
                            </div>
                        </Link>
                    )
                })}
            </section>

            {/* ℹ️ Helper section */}
            <section className="mt-10 sm:mt-14 rounded-2xl border border-border/60 bg-card/95 p-5 sm:p-6 shadow-sm">
                <h2 className="text-base sm:text-lg font-semibold mb-2">
                    How to use Renohacks tools
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Start with the Budget Planner to understand your overall renovation cost, then use
                    material tools to fine-tune each room. You can save the results and use them
                    as a base for contractor quotes and detailed planning.
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


