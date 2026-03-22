import { ScreedCalculator } from "@/components/widgets/screed-calculator"
import { ShareButton } from "@/components/share-button"
import { getPageMetadata } from "@/lib/seo"
import { Grid3X3, Ruler } from "lucide-react"
import Link from "next/link"

export const metadata = getPageMetadata("/calculators/screed", {
    title: "Калькулятор стяжки пола - объем смеси и мешки | Renohacks",
    description:
        "Онлайн калькулятор стяжки пола: объем, расход сухой смеси, количество мешков, вода на замес и стоимость.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function ScreedCalculatorPage() {
    return (
        <main className="mx-auto max-w-2xl px-4 py-10">
            <h1 className="mb-4 text-3xl font-bold">Калькулятор стяжки пола</h1>
            <p className="mb-8 text-muted-foreground">
                Рассчитайте объем стяжки, расход сухой смеси, количество мешков и воду на замес.
                Подходит для цементной стяжки, наливного пола и облегченных смесей.
            </p>

            <ScreedCalculator />

            <section className="mt-10 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 px-6 py-8 shadow-xl">
                <h2 className="mb-4 text-xl font-semibold">Что важно перед расчетом стяжки</h2>
                <ul className="space-y-3 text-sm text-muted-foreground">
                    <li><span className="font-medium text-foreground">Берите среднюю толщину.</span> Если основание неровное, ориентируйтесь на среднее значение по маякам.</li>
                    <li><span className="font-medium text-foreground">Проверяйте норму расхода.</span> Для точного результата лучше брать данные с мешка конкретной смеси.</li>
                    <li><span className="font-medium text-foreground">Добавляйте запас.</span> Даже аккуратный расчет лучше вести с резервом 5-10%.</li>
                </ul>
            </section>

            <section className="mt-12">
                <h2 className="mb-4 text-xl font-semibold">Частые вопросы</h2>
                <div className="space-y-4 text-sm text-muted-foreground">
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Чем объем отличается от расхода смеси?
                        </summary>
                        <p className="mt-2">
                            Объем показывает геометрию слоя в м³, а расход смеси - сколько сухого материала
                            потребуется по норме производителя.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Можно ли считать наливной пол и цементную стяжку одинаково?
                        </summary>
                        <p className="mt-2">
                            Принцип один, но расход на 10 мм разный. Поэтому в калькуляторе есть пресеты
                            и ручная корректировка расхода.
                        </p>
                    </details>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="mb-4 text-xl font-semibold">Связанные инструменты</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <Link href="/calculators/flooring" className="group rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl">
                        <div className="flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-emerald-500 shadow-inner">
                                <Grid3X3 className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Калькулятор покрытия</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">После выравнивания пола удобно сразу перейти к расчету финишного покрытия.</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/calculators/baseboard" className="group rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl">
                        <div className="flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-amber-500 shadow-inner">
                                <Ruler className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Калькулятор плинтуса</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Закрывает финальный этап по полу после стяжки и покрытия.</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            <section className="mt-12 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 p-8 shadow-xl">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Поделитесь калькулятором</h2>
                <ShareButton
                    url="/calculators/screed"
                    title="Калькулятор стяжки пола - объем смеси и мешки | Renohacks"
                    description="Рассчитайте объем стяжки, сухую смесь и количество мешков"
                />
            </section>
        </main>
    )
}
