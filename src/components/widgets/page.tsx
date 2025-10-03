import { getPageMetadata } from "@/lib/seo"
import Link from "next/link"

export const metadata = getPageMetadata("/calculators", {
    title: "Онлайн калькуляторы для ремонта | Renohacks",
    description:
        "Бесплатные калькуляторы для ремонта: краска, обои, плитка. Удобные инструменты для расчётов материалов.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function CalculatorsIndexPage() {
    return (
        <main className="container py-12">
            <h1 className="text-3xl font-bold mb-6">Калькуляторы ремонта</h1>
            <p className="mb-8 text-muted-foreground">
                Выберите калькулятор и быстро рассчитайте количество материалов для вашего ремонта:
            </p>
            <ul className="space-y-4 text-lg">
                <li>
                    <Link href="/calculators/paint" className="text-primary hover:underline">
                        🎨 Калькулятор краски
                    </Link>
                </li>
                <li>
                    <Link href="/calculators/wallpaper" className="text-primary hover:underline">
                        🪟 Калькулятор обоев
                    </Link>
                </li>
                <li>
                    <Link href="/calculators/tile" className="text-primary hover:underline">
                        🧱 Калькулятор плитки
                    </Link>
                </li>
            </ul>
        </main>
    )
}
