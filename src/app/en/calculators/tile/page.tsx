import type { Metadata } from "next"
import { TileCalculator } from "@/components/widgets/tile-calculator"

export const metadata: Metadata = {
    title: "Tile calculator online — calculate tiles needed | Renohacks",
    description:
        "Online tile calculator: enter room dimensions and tile size to find out how many tiles you need. Free renovation tool.",
    openGraph: {
        title: "Tile calculator online — Renohacks",
        description:
            "Easily calculate how many tiles you need for your renovation project.",
        url: "https://renohacks.com/en/calculators/tile",
        siteName: "Renohacks",
        locale: "en_US",
        type: "website",
    },
}

export default function TileCalculatorPage() {
    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Tile calculator</h1>
            <TileCalculator />
        </div>
    )
}
