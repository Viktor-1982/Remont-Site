import { CalculatorPageTemplate } from "@/components/pages/calculator-page"
import { LightingCalculator } from "@/components/widgets/lighting-calculator"
import { getCalculatorPageDictionary } from "@/dictionaries/calculator-pages"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getCalculatorPageDictionary("ru", "lighting")

export const metadata = getPageMetadata(dictionary.metadata.path, {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    cover: "/images/og-default.png",
    type: "website",
    keywords: dictionary.metadata.keywords,
})

export default function LightingCalculatorPage() {
    return <CalculatorPageTemplate dictionary={dictionary} widget={<LightingCalculator />} />
}
