import { CalculatorPageTemplate } from "@/components/pages/calculator-page"
import { BaseboardCalculator } from "@/components/widgets/baseboard-calculator"
import { getCalculatorPageDictionary } from "@/dictionaries/calculator-pages"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getCalculatorPageDictionary("en", "baseboard")

export const metadata = getPageMetadata(dictionary.metadata.path, {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    keywords: dictionary.metadata.keywords,
    cover: "/images/calculators/baseboard.jpg",
    type: "website",
})

export default function BaseboardCalculatorPageEn() {
    return <CalculatorPageTemplate dictionary={dictionary} widget={<BaseboardCalculator />} isEnglish />
}
