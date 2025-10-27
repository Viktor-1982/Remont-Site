import { getPageMetadata } from "@/lib/seo"
import Link from "next/link"

export const metadata = getPageMetadata("/en/calculators", {
    title: "Renovation calculators: paint, wallpaper, tile | Renohacks",
    description:
        "Free online renovation calculators: estimate paint, wallpaper, and tile for your home. Accurate material calculations for walls and floors.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function CalculatorsIndexPageEn() {
    const calculators = [
        {
            href: "/en/calculators/paint",
            label: "🎨 Paint Calculator",
            desc: "Estimate paint needed by room size",
            color: "bg-rose-100 dark:bg-rose-900/40",
        },
        {
            href: "/en/calculators/wallpaper",
            label: "🪟 Wallpaper Calculator",
            desc: "Find out how many rolls of wallpaper you need",
            color: "bg-emerald-100 dark:bg-emerald-900/40",
        },
        {
            href: "/en/calculators/tile",
            label: "🧱 Tile Calculator",
            desc: "Calculate tiles needed for walls or floors",
            color: "bg-sky-100 dark:bg-sky-900/40",
        },
    ]

    return (
        <main className="container py-12">
            <h1 className="text-3xl font-bold mb-8">Renovation calculators</h1>
            <p className="mb-6 text-muted-foreground">
                Choose a calculator to quickly estimate materials for your renovation:
            </p>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {calculators.map((calc) => (
                    <Link
                        key={calc.href}
                        href={calc.href}
                        className={`rounded-xl p-6 shadow-sm hover:shadow-md transition ${calc.color}`}
                    >
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                            {calc.label}
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{calc.desc}</p>
                    </Link>
                ))}
            </div>
        </main>
    )
}
