import type { Metadata } from "next"
import { TileCalculator } from "@/components/widgets/tile-calculator"

export const metadata: Metadata = {
    title: "Калькулятор плитки онлайн — рассчитать количество плитки | PRO ремонт",
    description:
        "Бесплатный онлайн калькулятор плитки: рассчитайте количество плитки для комнаты с учётом запаса 5%. Удобный инструмент для ремонта.",
    openGraph: {
        title: "Калькулятор плитки онлайн — PRO ремонт",
        description:
            "Онлайн калькулятор плитки: помогает рассчитать количество плитки с запасом в 5%.",
        url: "https://pro-remont.netlify.app/calculators/tile",
        siteName: "PRO ремонт",
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
