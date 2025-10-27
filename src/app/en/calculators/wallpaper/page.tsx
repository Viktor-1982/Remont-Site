import { getPageMetadata } from "@/lib/seo"
import { WallpaperCalculator } from "@/components/widgets/wallpaper-calculator"

export const metadata = getPageMetadata("/en/calculators/wallpaper", {
    title: "Wallpaper Calculator Online — calculate rolls needed | Renohacks",
    description:
        "Online wallpaper calculator: enter your wall area and find out how many rolls of wallpaper you need. A handy tool by Renohacks.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function WallpaperCalculatorPageEn() {
    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-4">Wallpaper Calculator</h1>
            <p className="text-muted-foreground mb-8">
                Calculate how many rolls of wallpaper you need for your walls. 
                Accounts for wall area, windows, doors, and pattern repeat.
            </p>
            <WallpaperCalculator />
            <div className="mt-8 p-4 bg-muted rounded-lg">
                <h2 className="font-semibold mb-2">💡 How to Use the Calculator</h2>
                <ol className="list-decimal ml-5 space-y-1 text-sm">
                    <li>Enter wall dimensions and roll size</li>
                    <li>Specify pattern repeat height (for patterned wallpaper)</li>
                    <li>Add windows and doors (if any)</li>
                    <li>Get accurate number of rolls needed</li>
                </ol>
            </div>
        </main>
    )
}
