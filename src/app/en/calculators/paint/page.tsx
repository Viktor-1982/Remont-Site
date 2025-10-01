import type { Metadata } from "next"
import { PaintCalculator } from "@/components/widgets/paint-calculator"

export const metadata: Metadata = {
    title: "Paint calculator online — calculate paint consumption | Renohacks",
    description:
        "Online paint calculator: enter the room size and find out how many liters of paint you need. Free tool from Renohacks.",
    openGraph: {
        title: "Paint calculator online — Renohacks",
        description:
            "Easily calculate how much paint you need for your renovation project.",
        url: "https://renohacks.com/en/calculators/paint",
        siteName: "Renohacks",
        locale: "en_US",
        type: "website",
    },
}

export default function PaintCalculatorPage() {
    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Paint calculator</h1>
            <PaintCalculator />
        </div>
    )
}
