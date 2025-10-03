import { getPageMetadata } from "@/lib/seo"
import { PaintCalculator } from "@/components/widgets/paint-calculator"

export const metadata = getPageMetadata("/en/calculators/paint", {
    title: "Paint Calculator Online — calculate paint consumption | Renohacks",
    description:
        "Online paint calculator: enter your room dimensions and find out how many liters of paint you need. A handy tool by Renohacks.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function PaintCalculatorPageEn() {
    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Paint Calculator</h1>
            <PaintCalculator />
        </main>
    )
}
