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
            <h1 className="text-2xl font-bold mb-6">Wallpaper Calculator</h1>
            <WallpaperCalculator />
        </main>
    )
}
