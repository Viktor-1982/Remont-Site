import type { Metadata } from "next"
import { PaintCalculator } from "@/components/widgets/paint-calculator"

export const metadata: Metadata = {
    title: "Калькулятор краски онлайн — рассчитать расход краски | Renohacks",
    description:
        "Онлайн калькулятор краски: введите размеры комнаты и узнайте, сколько литров краски нужно. Удобный инструмент Renohacks.",
    openGraph: {
        title: "Калькулятор краски онлайн — Renohacks",
        description:
            "Рассчитайте, сколько литров краски понадобится для вашей комнаты. Бесплатный онлайн калькулятор.",
        url: "https://renohacks.com/calculators/paint",
        siteName: "Renohacks",
        locale: "ru_RU",
        type: "website",
    },
}

export default function PaintCalculatorPage() {
    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Калькулятор краски</h1>
            <PaintCalculator />
        </div>
    )
}
