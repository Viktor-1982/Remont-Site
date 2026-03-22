import { FlooringCalculator } from "@/components/widgets/flooring-calculator"
import { ShareButton } from "@/components/share-button"
import { getPageMetadata } from "@/lib/seo"
import { Grid3X3, Ruler } from "lucide-react"
import Link from "next/link"

export const metadata = getPageMetadata("/calculators/flooring", {
    title: "Калькулятор ламината и кварцвинила - упаковки и запас | Renohacks",
    description:
        "Онлайн калькулятор ламината, кварцвинила и паркетной доски: площадь, упаковки, подложка и запас на подрезку.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function FlooringCalculatorPage() {
    return (
        <main className="mx-auto max-w-2xl px-4 py-10">
            <h1 className="mb-4 text-3xl font-bold">Калькулятор напольного покрытия</h1>
            <p className="mb-8 text-muted-foreground">
                Рассчитайте ламинат, кварцвинил или паркетную доску по площади комнаты, схеме укладки,
                упаковкам и запасу на подрезку. Подходит для прямой укладки, диагонали и елки.
            </p>

            <FlooringCalculator />

            <section className="mt-10 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 px-6 py-8 shadow-xl">
                <h2 className="mb-4 text-xl font-semibold">Что учитывает калькулятор покрытия</h2>
                <ul className="space-y-3 text-sm text-muted-foreground">
                    <li><span className="font-medium text-foreground">Чистую площадь пола.</span> Можно вычесть стационарные зоны без покрытия.</li>
                    <li><span className="font-medium text-foreground">Схему укладки.</span> Базовый запас меняется для прямой укладки, диагонали и елки.</li>
                    <li><span className="font-medium text-foreground">Реальные упаковки.</span> Расчет идет не только по м², но и по упаковкам и количеству планок.</li>
                    <li><span className="font-medium text-foreground">Подложку и стоимость.</span> Можно сразу прикинуть подложку и бюджет по цене упаковки.</li>
                </ul>
            </section>

            <section className="mt-12">
                <h2 className="mb-4 text-xl font-semibold">Частые вопросы</h2>
                <div className="space-y-4 text-sm text-muted-foreground">
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Какой запас брать на ламинат или кварцвинил?
                        </summary>
                        <p className="mt-2">
                            Для прямой укладки обычно хватает 7%. Для диагонали нужен больший запас,
                            а для елки он еще выше из-за подрезки.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Нужно ли вычитать шкафы и кухню?
                        </summary>
                        <p className="mt-2">
                            Да, но только если покрытие точно не будет заводиться под стационарную мебель
                            и встроенные конструкции.
                        </p>
                    </details>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="mb-4 text-xl font-semibold">Связанные инструменты</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <Link href="/calculators/baseboard" className="group rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl">
                        <div className="flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-amber-500 shadow-inner">
                                <Ruler className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Калькулятор плинтуса</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Сразу рассчитайте длину и количество планок по тому же помещению.</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/calculators/tile" className="group rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl">
                        <div className="flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-emerald-500 shadow-inner">
                                <Grid3X3 className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Калькулятор плитки</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Сравните расход разных покрытий для пола и мокрых зон.</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            <section className="mt-12 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 p-8 shadow-xl">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Поделитесь калькулятором</h2>
                <ShareButton
                    url="/calculators/flooring"
                    title="Калькулятор ламината и кварцвинила - упаковки и запас | Renohacks"
                    description="Рассчитайте упаковки покрытия, подложку и запас на подрезку"
                />
            </section>
        </main>
    )
}
