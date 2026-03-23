import { CalculatorPageTemplate } from "@/components/pages/calculator-page"
import { WallpaperCalculator } from "@/components/widgets/wallpaper-calculator"
import { getCalculatorPageDictionary } from "@/dictionaries/calculator-pages"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getCalculatorPageDictionary("en", "wallpaper")

export const metadata = getPageMetadata(dictionary.metadata.path, {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    cover: "/images/og-default.png",
    type: "website",
    keywords: dictionary.metadata.keywords,
})

export default function WallpaperCalculatorPageEn() {
    return <CalculatorPageTemplate dictionary={dictionary} widget={<WallpaperCalculator />} isEnglish />
}
