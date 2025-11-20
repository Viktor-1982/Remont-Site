import { getPageMetadata } from "@/lib/seo"
import { BudgetCalculator } from "@/components/widgets/budget-calculator"

export const metadata = getPageMetadata("/calculators/budget", {
    title: "Калькулятор бюджета ремонта онлайн | Renohacks",
    description:
        "Онлайн калькулятор бюджета ремонта: рассчитайте примерную стоимость ремонта квартиры. Косметический, стандартный или премиум ремонт.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function BudgetCalculatorPage() {
    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Калькулятор бюджета ремонта</h1>
            <p className="text-muted-foreground mb-6">
                Введите площадь квартиры и выберите тип ремонта, чтобы получить примерную оценку бюджета.
            </p>
            <BudgetCalculator />
        </main>
    )
}

