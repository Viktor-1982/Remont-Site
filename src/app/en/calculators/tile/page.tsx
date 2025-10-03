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
            <h1 className="text-2xl font-bold mb-6">Tile Calculator</h1>
            <TileCalculator />
        </main>
    )
}
