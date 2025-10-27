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
            <h1 className="text-3xl font-bold mb-4">Калькулятор плитки</h1>
            <p className="text-muted-foreground mb-8">
                Рассчитайте количество плитки для пола или стен. 
                Учитываются площадь, размеры плитки, отходы на подрезку и запас.
            </p>
            <TileCalculator />
            <div className="mt-8 p-4 bg-muted rounded-lg">
                <h2 className="font-semibold mb-2">💡 Как пользоваться калькулятором</h2>
                <ol className="list-decimal ml-5 space-y-1 text-sm">
                    <li>Введите площадь укладки и размеры плитки</li>
                    <li>Укажите размеры окон/дверей (если это стены)</li>
                    <li>Выберите процент запаса (обычно 5–10%)</li>
                    <li>Получите точное количество плитки</li>
                </ol>
            </div>
        </main>
    )
}
