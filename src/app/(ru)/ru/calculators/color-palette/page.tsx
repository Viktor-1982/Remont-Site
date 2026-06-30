import { ColorPalettePageTemplate } from "@/components/pages/color-palette-page"
import { ColorPaletteGenerator } from "@/components/widgets/color-palette-generator"
import {
    getColorPalettePageDictionary,
    getColorPalettePageMetadata,
} from "@/dictionaries/color-palette-page"

export const metadata = getColorPalettePageMetadata("ru")

export default function ColorPalettePage() {
    const dictionary = getColorPalettePageDictionary("ru")

    return <ColorPalettePageTemplate dictionary={dictionary} widget={<ColorPaletteGenerator />} />
}
