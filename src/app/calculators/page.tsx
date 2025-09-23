import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Hammer, PaintBucket, Ruler } from "lucide-react"

export const metadata: Metadata = {
    title: "Онлайн калькуляторы для ремонта — краска, плитка, обои | Renohacks.com",
    description:
        "Бесплатные онлайн калькуляторы для ремонта: рассчитайте количество краски, плитки и обоев для вашей комнаты. Удобные инструменты для планирования материалов.",
    openGraph: {
        title: "Онлайн калькуляторы для ремонта — Renohacks.com",
        description:
            "Онлайн калькуляторы: краска, плитка и обои. Удобные инструменты для расчёта материалов при ремонте.",
        url: "https://renohacks.com/calculators",
        siteName: "Renohacks.com",
        locale: "ru_RU",
        type: "website",
    },
    other: {
        "application/ld+json": JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Онлайн калькуляторы для ремонта",
            description:
                "Бесплатные онлайн калькуляторы: краска, плитка и обои. Удобные инструменты для ремонта и планирования материалов.",
            url: "https://renohacks.com/calculators",
            itemListElement: [
                {
                    "@type": "SoftwareApplication",
                    name: "Калькулятор краски",
                    applicationCategory: "HomeImprovement",
                    operatingSystem: "Web",
                    url: "https://renohacks.com/calculators/paint",
                },
                {
                    "@type": "SoftwareApplication",
                    name: "Калькулятор плитки",
                    applicationCategory: "HomeImprovement",
                    operatingSystem: "Web",
                    url: "https://renohacks.com/calculators/tile",
                },
                {
                    "@type": "SoftwareApplication",
                    name: "Калькулятор обоев",
                    applicationCategory: "HomeImprovement",
                    operatingSystem: "Web",
                    url: "https://renohacks.com/calculators/wallpaper",
                },
            ],
        }),
    },
}

// ⬇️ ВАЖНО: добавляем дефолтный экспорт
export default function CalculatorsPage() {
    return (
        <div className="grid gap-6 md:grid-cols-3">
            <Link href="/calculators/paint">
                <Card className="rounded-2xl p-4 bg-gradient-to-br from-green-100 to-green-200 transition-transform hover:scale-105 hover:shadow-xl">
                    <CardHeader>
                        <PaintBucket className="w-10 h-10 mb-3 text-green-700" />
                        <CardTitle className="text-lg font-bold text-green-900">
                            Калькулятор краски
                        </CardTitle>
                        <CardDescription className="text-green-800">
                            Быстро рассчитайте количество краски для вашей комнаты.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </Link>

            <Link href="/calculators/tile">
                <Card className="rounded-2xl p-4 bg-gradient-to-br from-blue-100 to-teal-200 transition-transform hover:scale-105 hover:shadow-xl">
                    <CardHeader>
                        <Ruler className="w-10 h-10 mb-3 text-blue-700" />
                        <CardTitle className="text-lg font-bold text-blue-900">
                            Калькулятор плитки
                        </CardTitle>
                        <CardDescription className="text-blue-800">
                            Подсчитайте количество плитки и затирки для пола и стен.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </Link>

            <Link href="/calculators/wallpaper">
                <Card className="rounded-2xl p-4 bg-gradient-to-br from-orange-100 to-pink-200 transition-transform hover:scale-105 hover:shadow-xl">
                    <CardHeader>
                        <Hammer className="w-10 h-10 mb-3 text-orange-700" />
                        <CardTitle className="text-lg font-bold text-orange-900">
                            Калькулятор обоев
                        </CardTitle>
                        <CardDescription className="text-orange-800">
                            Рассчитайте количество рулонов обоев с учётом рисунка.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </Link>
        </div>
    )
}

