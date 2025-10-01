import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "Онлайн калькуляторы для ремонта | Renohacks",
    description: "Бесплатные калькуляторы ремонта: краска, обои, плитка. Удобные инструменты для расчётов.",
    openGraph: {
        title: "Онлайн калькуляторы для ремонта | Renohacks",
        description: "Рассчитайте расход краски, обоев и плитки с помощью наших бесплатных онлайн-калькуляторов.",
        url: "https://renohacks.com/calculators",
        siteName: "Renohacks",
        locale: "ru_RU",
        type: "website",
    },
}

const calculators = [
    {
        href: "/calculators/paint",
        icon: "🎨",
        title: "Калькулятор краски",
        desc: "Рассчитайте, сколько литров краски нужно для комнаты.",
    },
    {
        href: "/calculators/wallpaper",
        icon: "🪟",
        title: "Калькулятор обоев",
        desc: "Узнайте, сколько рулонов обоев понадобится для стен.",
    },
    {
        href: "/calculators/tile",
        icon: "🧱",
        title: "Калькулятор плитки",
        desc: "Подсчитайте количество плитки для пола или стен.",
    },
]

export default function CalculatorsIndexPage() {
    return (
        <main className="container py-12">
            <h1 className="text-3xl font-bold mb-6">Калькуляторы ремонта</h1>
            <p className="mb-8 text-muted-foreground">
                Выберите калькулятор и быстро рассчитайте количество материалов для вашего ремонта:
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {calculators.map((calc) => (
                    <Card key={calc.href} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <span>{calc.icon}</span> {calc.title}
                            </CardTitle>
                            <CardDescription>{calc.desc}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow" />
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href={calc.href}>Перейти</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </main>
    )
}
