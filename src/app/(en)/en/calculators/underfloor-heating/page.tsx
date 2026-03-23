import { CalculatorPageTemplate } from "@/components/pages/calculator-page"
import { UnderfloorHeatingCalculator } from "@/components/widgets/underfloor-heating-calculator"
import { getCalculatorPageDictionary } from "@/dictionaries/calculator-pages"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getCalculatorPageDictionary("en", "underfloorHeating")

export const metadata = getPageMetadata(dictionary.metadata.path, {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    cover: "/images/og-default.png",
    type: "website",
    keywords: dictionary.metadata.keywords,
})

export default function UnderfloorHeatingPageEn() {
    return <CalculatorPageTemplate dictionary={dictionary} widget={<UnderfloorHeatingCalculator />} isEnglish />
}
