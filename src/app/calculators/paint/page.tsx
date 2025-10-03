import { getPageMetadata } from "@/lib/seo"
import { PaintCalculator } from "@/components/widgets/paint-calculator"

export const metadata = getPageMetadata("/calculators/paint", {
    title: "Калькулятор краски онлайн — рассчитать расход краски | Renohacks",
    description:
        "Онлайн калькулятор краски: введите размеры комнаты и узнайте, сколько литров краски нужно. Удобный инструмент Renohacks.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function PaintCalculatorPage() {
    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Калькулятор краски</h1>
            <PaintCalculator />
        </main>
    )
}
