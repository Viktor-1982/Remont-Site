import type { Metadata } from "next"
import { WallpaperCalculator } from "@/components/widgets/wallpaper-calculator"

export const metadata: Metadata = {
    title: "Калькулятор обоев онлайн — рассчитать количество рулонов | PRO ремонт",
    description:
        "Онлайн калькулятор обоев: рассчитайте количество рулонов обоев для комнаты. Учитывает размеры стен, высоту и запас на подгонку рисунка.",
    openGraph: {
        title: "Калькулятор обоев онлайн — PRO ремонт",
        description:
            "Бесплатный калькулятор обоев: посчитайте, сколько рулонов нужно для вашей комнаты. С учётом высоты потолка и запаса.",
        url: "https://pro-remont.netlify.app/calculators/wallpaper",
        siteName: "PRO ремонт",
        locale: "ru_RU",
        type: "website",
    },
}

export default function WallpaperCalculatorPage() {
    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Калькулятор обоев</h1>
            <WallpaperCalculator />
        </div>
    )
}
