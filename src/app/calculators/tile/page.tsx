import type { Metadata } from "next"
import { TileCalculator } from "@/components/widgets/tile-calculator"

export const metadata: Metadata = {
    title: "Калькулятор плитки онлайн — рассчитать количество плитки | Renohacks",
    description:
        "Онлайн калькулятор плитки: введите размеры комнаты и плитки, чтобы узнать, сколько плитки нужно. Удобный инструмент Renohacks.",
    openGraph: {
        title: "Калькулятор плитки онлайн — Renohacks",
        description:
            "Рассчитайте, сколько плитки понадобится для вашего ремонта. Бесплатный онлайн калькулятор.",
        url: "https://renohacks.com/calculators/tile",
        siteName: "Renohacks",
        locale: "ru_RU",
        type: "website",
    },
}

export default function TileCalculatorPage() {
    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Калькулятор плитки</h1>
            <TileCalculator />
        </div>
    )
}
