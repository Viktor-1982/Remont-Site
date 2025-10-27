import { getPageMetadata } from "@/lib/seo"
import { PaintCalculator } from "@/components/widgets/paint-calculator"

export const metadata = getPageMetadata("/calculators/paint", {
    title: "Калькулятор краски онлайн — рассчитать расход краски | Renohacks",
    description:
        "Онлайн калькулятор краски: введите размеры комнаты и узнайте, сколько литров краски нужно. Удобный инструмент Renohacks.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function PaintCalculatorPage() {
    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-4">Калькулятор краски</h1>
            <p className="text-muted-foreground mb-8">
                Рассчитайте точный расход краски для покраски стен и потолков. 
                Учитываются окна, двери и необходимость нанесения второго слоя.
            </p>
            <PaintCalculator />
            <div className="mt-8 p-4 bg-muted rounded-lg">
                <h2 className="font-semibold mb-2">💡 Как пользоваться калькулятором</h2>
                <ol className="list-decimal ml-5 space-y-1 text-sm">
                    <li>Введите размеры комнаты: длину, ширину и высоту</li>
                    <li>Укажите размеры окон и дверей (если есть)</li>
                    <li>Выберите, нужен ли второй слой краски</li>
                    <li>Получите точный расчёт в литрах</li>
                </ol>
            </div>
        </main>
    )
}
