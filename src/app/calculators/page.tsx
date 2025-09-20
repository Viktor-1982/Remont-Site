import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Hammer, PaintBucket, Ruler } from "lucide-react"

export const metadata: Metadata = {
    title: "Онлайн калькуляторы для ремонта — краска, плитка, обои | PRO ремонт",
    description:
        "Бесплатные онлайн калькуляторы для ремонта: рассчитайте количество краски, плитки и обоев для вашей комнаты. Удобные инструменты для планирования материалов.",
    openGraph: {
        title: "Онлайн калькуляторы для ремонта — PRO ремонт",
        description:
            "Онлайн калькуляторы: краска, плитка и обои. Удобные инструменты для расчёта материалов при ремонте.",
        url: "https://pro-remont.netlify.app/calculators",
        siteName: "PRO ремонт",
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
            url: "https://pro-remont.netlify.app/calculators",
            itemListElement: [
                {
                    "@type": "SoftwareApplication",
                    name: "Калькулятор краски",
                    applicationCategory: "HomeImprovement",
                    operatingSystem: "Web",
                    offers: { "@type": "Offer", price: "0", priceCurrency: "RUB" },
                    url: "https://pro-remont.netlify.app/calculators/paint",
                },
                {
                    "@type": "SoftwareApplication",
                    name: "Калькулятор плитки",
                    applicationCategory: "HomeImprovement",
                    operatingSystem: "Web",
                    offers: { "@type": "Offer", price: "0", priceCurrency: "RUB" },
                    url: "https://pro-remont.netlify.app/calculators/tile",
                },
                {
                    "@type": "SoftwareApplication",
                    name: "Калькулятор обоев",
                    applicationCategory: "HomeImprovement",
                    operatingSystem: "Web",
                    offers: { "@type": "Offer", price: "0", priceCurrency: "RUB" },
                    url: "https://pro-remont.netlify.app/calculators/wallpaper",
                },
            ],
        }),
    },
}

export default function CalculatorsPage() {
    const calculators = [
        {
            href: "/calculators/paint",
            icon: <PaintBucket className="h-6 w-6" />,
            title: "Калькулятор краски",
            description: "Рассчитайте, сколько литров краски нужно для вашей комнаты.",
            color: "from-sky-500/10 text-sky-600 bg-sky-500/20",
        },
        {
            href: "/calculators/tile",
            icon: <Ruler className="h-6 w-6" />,
            title: "Калькулятор плитки",
            description: "Поможет определить количество плитки и учесть запас в 5%.",
            color: "from-emerald-500/10 text-emerald-600 bg-emerald-500/20",
        },
        {
            href: "/calculators/wallpaper",
            icon: <Hammer className="h-6 w-6" />,
            title: "Калькулятор обоев",
            description: "Посчитайте, сколько рулонов обоев потребуется.",
            color: "from-amber-500/10 text-amber-600 bg-amber-500/20",
        },
    ]

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">Онлайн калькуляторы для ремонта</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {calculators.map((calc) => (
                    <Link key={calc.href} href={calc.href}>
                        <Card className="hover:shadow-lg transition group bg-gradient-to-br from-background to-muted border border-border">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`flex items-center justify-center h-10 w-10 rounded-full ${calc.color}`}
                                    >
                                        {calc.icon}
                                    </div>
                                    <div>
                                        <CardTitle className="group-hover:text-primary transition-colors">
                                            {calc.title}
                                        </CardTitle>
                                        <CardDescription>{calc.description}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
