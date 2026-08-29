import { CalculatorPageTemplate } from "@/components/pages/calculator-page"
import { DrywallCalculator } from "@/components/widgets/drywall-calculator"
import { getCalculatorPageDictionary } from "@/dictionaries/calculator-pages"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getCalculatorPageDictionary("ru", "drywall")

export const metadata = getPageMetadata(dictionary.metadata.path, {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    cover: "/images/og-default.png",
    type: "website",
})

export default function DrywallCalculatorPage() {
    return <CalculatorPageTemplate dictionary={dictionary} widget={<DrywallCalculator />} />
}
