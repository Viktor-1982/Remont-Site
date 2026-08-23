import { CalculatorPageTemplate } from "@/components/pages/calculator-page"
import { SoundproofingCalculator } from "@/components/widgets/soundproofing-calculator"
import { getCalculatorPageDictionary } from "@/dictionaries/calculator-pages"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getCalculatorPageDictionary("ru", "soundproofing")

export const metadata = getPageMetadata(dictionary.metadata.path, {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    cover: "/images/posts/soundproofing-2026/cover-soundproofing.jpg",
    type: "website",
})

export default function SoundproofingCalculatorPage() {
    return <CalculatorPageTemplate dictionary={dictionary} widget={<SoundproofingCalculator />} />
}
