import { getPageMetadata } from "@/lib/seo"
import { BudgetCalculator } from "@/components/widgets/budget-calculator"

export const metadata = getPageMetadata("/en/calculators/budget", {
    title: "Renovation Budget Calculator Online | Renohacks",
    description:
        "Online renovation budget calculator: estimate the cost of apartment renovation. Cosmetic, standard, or premium renovation.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function BudgetCalculatorPageEn() {
    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Renovation Budget Calculator</h1>
            <p className="text-muted-foreground mb-6">
                Enter your apartment area and select renovation type to get an estimated budget.
            </p>
            <BudgetCalculator />
        </main>
    )
}

