import { getPageMetadata } from "@/lib/seo"
import { WallpaperCalculator } from "@/components/widgets/wallpaper-calculator"

export const metadata = getPageMetadata("/calculators/wallpaper", {
    title: "Калькулятор обоев онлайн — рассчитать количество рулонов | Renohacks",
    description:
        "Онлайн калькулятор обоев: введите площадь стен и узнайте, сколько рулонов обоев потребуется. Удобный инструмент Renohacks.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function WallpaperCalculatorPage() {
    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Калькулятор обоев</h1>
            <WallpaperCalculator />
        </main>
    )
}
