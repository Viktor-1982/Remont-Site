import { CalculatorPageTemplate } from "@/components/pages/calculator-page"
import { FlooringCalculator } from "@/components/widgets/flooring-calculator"
import { getCalculatorPageDictionary } from "@/dictionaries/calculator-pages"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getCalculatorPageDictionary("en", "flooring")

export const metadata = getPageMetadata(dictionary.metadata.path, {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    cover: "/images/og-default.png",
    type: "website",
})

export default function FlooringCalculatorPageEn() {
    return <CalculatorPageTemplate dictionary={dictionary} widget={<FlooringCalculator />} isEnglish />
}
