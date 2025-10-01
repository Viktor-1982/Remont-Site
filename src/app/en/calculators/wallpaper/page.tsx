import type { Metadata } from "next"
import { WallpaperCalculator } from "@/components/widgets/wallpaper-calculator"

export const metadata: Metadata = {
    title: "Wallpaper calculator online — calculate wallpaper rolls | Renohacks",
    description:
        "Online wallpaper calculator: enter wall dimensions to find out how many rolls you need. Free renovation tool.",
    openGraph: {
        title: "Wallpaper calculator online — Renohacks",
        description:
            "Easily calculate how many wallpaper rolls you’ll need for your renovation project.",
        url: "https://renohacks.com/en/calculators/wallpaper",
        siteName: "Renohacks",
        locale: "en_US",
        type: "website",
    },
}

export default function WallpaperCalculatorPage() {
    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Wallpaper calculator</h1>
            <WallpaperCalculator />
        </div>
    )
}
