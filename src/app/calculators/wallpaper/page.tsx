import type { Metadata } from "next"
import { WallpaperCalculator } from "@/components/widgets/wallpaper-calculator"

export const metadata: Metadata = {
    title: "Калькулятор обоев онлайн — рассчитать количество рулонов | Renohacks",
    description:
        "Онлайн калькулятор обоев: введите размеры стен и узнайте, сколько рулонов обоев понадобится. Удобный инструмент Renohacks.",
    openGraph: {
        title: "Калькулятор обоев онлайн — Renohacks",
        description:
            "Рассчитайте, сколько рулонов обоев нужно для вашего ремонта. Бесплатный онлайн калькулятор.",
        url: "https://renohacks.com/calculators/wallpaper",
        siteName: "Renohacks",
        locale: "ru_RU",
        type: "website",
    },
}

export default function WallpaperCalculatorPage() {
    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Калькулятор обоев</h1>
            <WallpaperCalculator />
        </div>
    )
}
