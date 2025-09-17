import { TileCalculator } from "@/components/widgets/tile-calculator"

export default function TileCalculatorPage() {
    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Калькулятор плитки</h1>
            <TileCalculator />
        </div>
    )
}
