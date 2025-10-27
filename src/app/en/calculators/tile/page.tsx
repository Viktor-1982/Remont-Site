import { getPageMetadata } from "@/lib/seo"
import { TileCalculator } from "@/components/widgets/tile-calculator"

export const metadata = getPageMetadata("/en/calculators/tile", {
    title: "Tile Calculator Online — calculate tiles needed | Renohacks",
    description:
        "Online tile calculator: enter the area and tile size to find out how many tiles you need. A handy tool by Renohacks.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function TileCalculatorPageEn() {
    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-4">Tile Calculator</h1>
            <p className="text-muted-foreground mb-8">
                Calculate the amount of tiles needed for floors or walls. 
                Accounts for area, tile size, waste from cutting, and extra for repairs.
            </p>
            <TileCalculator />
            <div className="mt-8 p-4 bg-muted rounded-lg">
                <h2 className="font-semibold mb-2">💡 How to Use the Calculator</h2>
                <ol className="list-decimal ml-5 space-y-1 text-sm">
                    <li>Enter installation area and tile dimensions</li>
                    <li>Specify window/door sizes (for walls)</li>
                    <li>Choose waste percentage (usually 5–10%)</li>
                    <li>Get accurate tile count needed</li>
                </ol>
            </div>
        </main>
    )
}
