import { ColorPalettePageTemplate } from "@/components/pages/color-palette-page"
import { ColorPaletteGenerator } from "@/components/widgets/color-palette-generator"
import {
    getColorPalettePageDictionary,
    getColorPalettePageMetadata,
} from "@/dictionaries/color-palette-page"

export const metadata = getColorPalettePageMetadata("en")

export default function ColorPalettePageEn() {
    const dictionary = getColorPalettePageDictionary("en")

    return <ColorPalettePageTemplate dictionary={dictionary} widget={<ColorPaletteGenerator />} isEnglish={true} />
}
