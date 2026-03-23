import { CalculatorPageTemplate } from "@/components/pages/calculator-page"
import { BaseboardCalculator } from "@/components/widgets/baseboard-calculator"
import { getCalculatorPageDictionary } from "@/dictionaries/calculator-pages"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getCalculatorPageDictionary("ru", "baseboard")

export const metadata = getPageMetadata(dictionary.metadata.path, {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    cover: "/images/og-default.png",
    type: "website",
})

export default function BaseboardCalculatorPage() {
    return <CalculatorPageTemplate dictionary={dictionary} widget={<BaseboardCalculator />} />
}
