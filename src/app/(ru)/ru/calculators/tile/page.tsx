import { CalculatorPageTemplate } from "@/components/pages/calculator-page"
import { TileCalculator } from "@/components/widgets/tile-calculator"
import { getCalculatorPageDictionary } from "@/dictionaries/calculator-pages"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getCalculatorPageDictionary("ru", "tile")

export const metadata = getPageMetadata(dictionary.metadata.path, {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    cover: "/images/og-default.png",
    type: "website",
    keywords: dictionary.metadata.keywords,
})

export default function TileCalculatorPage() {
    return <CalculatorPageTemplate dictionary={dictionary} widget={<TileCalculator />} />
}
