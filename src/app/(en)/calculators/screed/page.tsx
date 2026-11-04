import { CalculatorPageTemplate } from "@/components/pages/calculator-page"
import { ScreedCalculator } from "@/components/widgets/screed-calculator"
import { getCalculatorPageDictionary } from "@/dictionaries/calculator-pages"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getCalculatorPageDictionary("en", "screed")

export const metadata = getPageMetadata(dictionary.metadata.path, {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    keywords: dictionary.metadata.keywords,
    cover: "/images/calculators/screed.jpg",
    type: "website",
})

export default function ScreedCalculatorPageEn() {
    return <CalculatorPageTemplate dictionary={dictionary} widget={<ScreedCalculator />} isEnglish />
}
