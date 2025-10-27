import { getPageMetadata } from "@/lib/seo"
import Link from "next/link"

export const metadata = getPageMetadata("/calculators", {
    title: "Калькуляторы для ремонта: краска, обои, плитка | Renohacks",
    description:
        "Бесплатные онлайн калькуляторы для ремонта: рассчитайте расход краски, обоев и плитки для вашей квартиры. Точные расчёты материалов для стен и пола.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function CalculatorsIndexPage() {
    const calculators = [
        {
            href: "/calculators/paint",
            label: "🎨 Калькулятор краски",
            desc: "Рассчитайте расход краски по размерам комнаты",
            color: "bg-rose-100 dark:bg-rose-900/40",
        },
        {
            href: "/calculators/wallpaper",
            label: "🪟 Калькулятор обоев",
            desc: "Узнайте, сколько рулонов обоев потребуется",
            color: "bg-emerald-100 dark:bg-emerald-900/40",
        },
        {
            href: "/calculators/tile",
            label: "🧱 Калькулятор плитки",
            desc: "Подсчитайте количество плитки для пола или стен",
            color: "bg-sky-100 dark:bg-sky-900/40",
        },
    ]

    return (
        <main className="container py-12">
            <h1 className="text-3xl font-bold mb-8">Калькуляторы ремонта</h1>
            <p className="mb-6 text-muted-foreground">
                Выберите калькулятор и быстро рассчитайте количество материалов для вашего ремонта:
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
