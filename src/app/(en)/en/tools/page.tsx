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

export const metadata = getPageMetadata("/en/tools", {
    title: "Renovation tools: paint, flooring, baseboard, screed | Renohacks",
    description:
        "Modern renovation tools for paint, wallpaper, tile, flooring, baseboard, screed, ventilation, heating and budget planning.",
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

const calculators = [
    {
        href: "/en/calculators/paint",
        label: "Paint Calculator",
        emoji: "🎨",
        icon: Paintbrush,
        desc: "Estimate paint needed by room size, including windows, doors and number of coats.",
        badge: "Walls and ceilings",
        gradient: "from-rose-500/15 via-rose-400/10 to-orange-400/10",
    },
    {
        href: "/en/calculators/wallpaper",
        label: "Wallpaper Calculator",
        emoji: "🪟",
        icon: Wallpaper,
        desc: "Find out how many wallpaper rolls you need, including pattern repeat and waste.",
        badge: "Wallpaper and pattern",
        gradient: "from-emerald-500/15 via-emerald-400/10 to-teal-400/10",
    },
    {
        href: "/en/calculators/tile",
        label: "Tile Calculator",
        emoji: "🧱",
        icon: Grid3X3,
        desc: "Calculate tile for floors and walls, waste percentage and approximate adhesive usage.",
        badge: "Floors and walls",
        gradient: "from-sky-500/15 via-sky-400/10 to-indigo-400/10",
    },
    {
        href: "/en/calculators/flooring",
        label: "Flooring Calculator",
        emoji: "🪵",
        icon: Layers,
        desc: "Estimate laminate, vinyl or engineered wood packs, underlay and waste by room size and layout.",
        badge: "Laminate and LVT",
        gradient: "from-lime-500/15 via-emerald-400/10 to-teal-400/10",
    },
    {
        href: "/en/calculators/baseboard",
        label: "Baseboard Calculator",
        emoji: "📏",
        icon: Ruler,
        desc: "Calculate baseboard length, piece count, doorway deductions and approximate cost from room dimensions or perimeter.",
        badge: "Perimeter and pieces",
        gradient: "from-amber-500/15 via-orange-400/10 to-yellow-400/10",
    },
    {
        href: "/en/calculators/screed",
        label: "Screed Calculator",
        emoji: "🧰",
        icon: Layers,
        desc: "Estimate screed volume, dry mix, bag count, water and approximate cost for floor leveling.",
        badge: "Floor base",
        gradient: "from-stone-500/15 via-slate-400/10 to-zinc-400/10",
    },
    {
        href: "/en/calculators/underfloor-heating",
        label: "Underfloor Heating",
        emoji: "🔥",
        icon: Thermometer,
        desc: "Estimate power, cable or mat coverage and monthly energy use.",
        badge: "Floor heating",
        gradient: "from-orange-500/15 via-amber-400/10 to-yellow-400/10",
    },
    {
        href: "/en/calculators/ventilation",
        label: "Ventilation Calculator",
        emoji: "🌬️",
        icon: Wind,
        desc: "Calculate airflow by room volume and target air changes per hour.",
        badge: "Ventilation",
        gradient: "from-cyan-500/15 via-sky-400/10 to-blue-400/10",
    },
    {
        href: "/en/calculators/lighting",
        label: "Lighting Calculator",
        emoji: "💡",
        icon: Lightbulb,
        desc: "Find how many lumens and light fixtures your room needs by area and room type.",
        badge: "Lighting",
        gradient: "from-amber-500/15 via-yellow-400/10 to-orange-400/10",
    },
    {
        href: "/en/calculators/budget",
        label: "Budget Planner",
        emoji: "💰",
        icon: Wallet,
        desc: "Build a renovation budget by work category, currency and reserve for extra costs.",
        badge: "Full budget",
        gradient: "from-amber-500/20 via-orange-400/10 to-rose-400/10",
    },
    {
        href: "/en/calculators/color-palette",
        label: "Color Palette Generator",
        emoji: "🎨",
        icon: Palette,
        desc: "Create a harmonious color scheme for your interior with practical application notes.",
        badge: "Design and color",
        gradient: "from-purple-500/15 via-pink-400/10 to-rose-400/10",
    },
    {
        href: "/en/quiz/interior-style",
        label: "Interior Style Quiz",
        emoji: "✨",
        icon: Sparkles,
        desc: "Take a quiz to find the interior style that best matches your taste and lifestyle.",
        badge: "Design",
        gradient: "from-indigo-500/15 via-purple-400/10 to-pink-400/10",
    },
    {
        href: "/en/tools/materials-checklist",
        label: "Materials Purchase Checklist",
        emoji: "🛒",
        icon: ShoppingCart,
        desc: "Keep a full renovation materials checklist and mark the items you have already purchased.",
        badge: "Planning",
        gradient: "from-green-500/15 via-emerald-400/10 to-teal-400/10",
    },
] as const

export default function ToolsIndexPageEn() {
    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <section className="mb-10 sm:mb-14">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                    <Calculator className="h-3.5 w-3.5" />
                    <span>Renohacks renovation tools</span>
                </div>
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Smart tools for home renovation planning
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Choose a tool to estimate materials, layout waste and budget in just a couple of minutes.
                    Each tool is tuned for real room dimensions, reserves and installation specifics.
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
                                    Open
                                    <span className="translate-y-[1px]">→</span>
                                </span>
                            </div>
                        </Link>
                    )
                })}
            </section>

            <section className="mt-10 rounded-2xl border border-border/60 bg-card/95 p-5 shadow-sm sm:mt-14 sm:p-6">
                <h2 className="mb-2 text-base font-semibold sm:text-lg">How to use Renohacks tools</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                    Start with the budget planner to define the cost range, then move into focused material
                    estimates for floors, walls and systems. The results work well as a basis for purchasing
                    lists and contractor quotes.
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
