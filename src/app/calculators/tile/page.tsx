import { getPageMetadata } from "@/lib/seo"
import { TileCalculator } from "@/components/widgets/tile-calculator"

export const metadata = getPageMetadata("/calculators/tile", {
    title: "Калькулятор плитки онлайн — рассчитать количество плитки | Renohacks",
    description:
        "Онлайн калькулятор плитки: введите площадь и размеры плитки, чтобы рассчитать необходимое количество. Удобный инструмент Renohacks.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function TileCalculatorPage() {
    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Калькулятор плитки</h1>
            <TileCalculator />
        </main>
    )
}
