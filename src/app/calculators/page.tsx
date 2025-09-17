import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Hammer, PaintBucket, Ruler } from "lucide-react"

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
            <h1 className="text-3xl font-bold mb-8">Калькуляторы ремонта</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {calculators.map((calc) => (
                    <Link key={calc.href} href={calc.href}>
                        <Card className="hover:shadow-lg transition group bg-gradient-to-br from-background to-muted border border-border">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    {/* фиксированный контейнер для иконки */}
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
