import { BaseboardCalculator } from "@/components/widgets/baseboard-calculator"
import { ShareButton } from "@/components/share-button"
import { getPageMetadata } from "@/lib/seo"
import { Grid3X3, Layers } from "lucide-react"
import Link from "next/link"

export const metadata = getPageMetadata("/calculators/baseboard", {
    title: "Калькулятор плинтуса - длина, планки и стоимость | Renohacks",
    description:
        "Онлайн калькулятор плинтуса: погонные метры, количество планок, вычет проемов, запас и примерная стоимость.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function BaseboardCalculatorPage() {
    return (
        <main className="mx-auto max-w-2xl px-4 py-10">
            <h1 className="mb-4 text-3xl font-bold">Калькулятор плинтуса</h1>
            <p className="mb-8 text-muted-foreground">
                Рассчитайте плинтус по размерам комнаты или готовому периметру. Калькулятор вычитает дверные
                проемы, добавляет запас и показывает, сколько планок нужно купить.
            </p>

            <BaseboardCalculator />

            <section className="mt-10 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 px-6 py-8 shadow-xl">
                <h2 className="mb-4 text-xl font-semibold">Когда этот расчет особенно полезен</h2>
                <ul className="space-y-3 text-sm text-muted-foreground">
                    <li><span className="font-medium text-foreground">Для стандартной комнаты.</span> Можно посчитать плинтус по длине и ширине без ручного периметра.</li>
                    <li><span className="font-medium text-foreground">Для сложной формы.</span> Если периметр уже снят, переключитесь в режим готового периметра.</li>
                    <li><span className="font-medium text-foreground">Для закупки.</span> Калькулятор сразу показывает количество планок и ориентир по стоимости.</li>
                </ul>
            </section>

            <section className="mt-12">
                <h2 className="mb-4 text-xl font-semibold">Частые вопросы</h2>
                <div className="space-y-4 text-sm text-muted-foreground">
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Нужно ли вычитать дверные проемы?
                        </summary>
                        <p className="mt-2">
                            Да. Обычно плинтус не проходит через дверной проем, поэтому эту длину лучше вычесть.
                        </p>
                    </details>
                    <details className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
                        <summary className="cursor-pointer font-medium text-foreground">
                            Какой запас брать на плинтус?
                        </summary>
                        <p className="mt-2">
                            Для обычной комнаты часто хватает 5-7%. Если много подрезки, углов и нестандартных узлов,
                            запас можно увеличить.
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
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Удобно считать плинтус вместе с ламинатом или кварцвинилом по одной комнате.</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/calculators/screed" className="group rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl">
                        <div className="flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-amber-500 shadow-inner">
                                <Layers className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Калькулятор стяжки</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Сначала база пола, потом покрытие и плинтус: логичная связка для закупки.</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            <section className="mt-12 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 p-8 shadow-xl">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Поделитесь калькулятором</h2>
                <ShareButton
                    url="/calculators/baseboard"
                    title="Калькулятор плинтуса - длина, планки и стоимость | Renohacks"
                    description="Рассчитайте длину, запас и количество планок плинтуса"
                />
            </section>
        </main>
    )
}
