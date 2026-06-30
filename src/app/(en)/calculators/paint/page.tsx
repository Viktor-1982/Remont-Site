import { CalculatorPageTemplate } from "@/components/pages/calculator-page"
import { PaintCalculator } from "@/components/widgets/paint-calculator"
import { getCalculatorPageDictionary } from "@/dictionaries/calculator-pages"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getCalculatorPageDictionary("en", "paint")

export const metadata = getPageMetadata(dictionary.metadata.path, {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    cover: "/images/og-default.png",
    type: "website",
})

export default function PaintCalculatorPageEn() {
    return <CalculatorPageTemplate dictionary={dictionary} widget={<PaintCalculator />} isEnglish />
}
