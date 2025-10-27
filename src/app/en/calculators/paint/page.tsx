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
            <h1 className="text-3xl font-bold mb-4">Paint Calculator</h1>
            <p className="text-muted-foreground mb-8">
                Calculate the exact amount of paint needed for walls and ceilings. 
                Accounts for windows, doors, and second coat requirements.
            </p>
            <PaintCalculator />
            <div className="mt-8 p-4 bg-muted rounded-lg">
                <h2 className="font-semibold mb-2">💡 How to Use the Calculator</h2>
                <ol className="list-decimal ml-5 space-y-1 text-sm">
                    <li>Enter room dimensions: length, width, and height</li>
                    <li>Specify window and door sizes (if any)</li>
                    <li>Choose if a second coat is needed</li>
                    <li>Get accurate calculation in liters</li>
                </ol>
            </div>
        </main>
    )
}
