import { getPageMetadata } from "@/lib/seo"
import { WallpaperCalculator } from "@/components/widgets/wallpaper-calculator"

export const metadata = getPageMetadata("/calculators/wallpaper", {
    title: "Калькулятор обоев онлайн — рассчитать количество рулонов | Renohacks",
    description:
        "Онлайн калькулятор обоев: введите площадь стен и узнайте, сколько рулонов обоев потребуется. Удобный инструмент Renohacks.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function WallpaperCalculatorPage() {
    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-4">Калькулятор обоев</h1>
            <p className="text-muted-foreground mb-8">
                Рассчитайте необходимое количество рулонов обоев для поклейки стен. 
                Учитывается площадь стен, окна, двери и раппорт рисунка.
            </p>
            <WallpaperCalculator />
            <div className="mt-8 p-4 bg-muted rounded-lg">
                <h2 className="font-semibold mb-2">💡 Как пользоваться калькулятором</h2>
                <ol className="list-decimal ml-5 space-y-1 text-sm">
                    <li>Введите размеры стены и размеры рулона</li>
                    <li>Укажите высоту раппорта (для обоев с рисунком)</li>
                    <li>Добавьте окна и двери (если есть)</li>
                    <li>Получите точное количество рулонов</li>
                </ol>
            </div>
        </main>
    )
}
