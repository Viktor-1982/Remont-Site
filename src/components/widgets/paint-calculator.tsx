"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"
import { CalculationResultNotes } from "@/components/widgets/calculation-result-notes"
import calcDataJson from "@/components/messages/calc.json"
import type { Locale, CalcData, PaintCalcDict, ButtonsDict } from "@/types/calc"
import { computePaintLiters, type PaintResult } from "@/lib/calculations"

const calcData = calcDataJson as CalcData

export function PaintCalculator() {
    const pathname = usePathname()
    const isEnglish = !pathname.startsWith("/ru") || pathname.endsWith("-en")
    const locale: Locale = isEnglish ? "en" : "ru"

    const t: PaintCalcDict = calcData[locale].calc.paint
    const b: ButtonsDict = calcData[locale].calc.buttons

    const [length, setLength] = useState("")
    const [width, setWidth] = useState("")
    const [height, setHeight] = useState("")
    const [doors, setDoors] = useState("0")
    const [windows, setWindows] = useState("0")
    const [layers, setLayers] = useState("2")
    const [coverage, setCoverage] = useState("10")
    const [pricePerLiter, setPricePerLiter] = useState("")
    const [currency, setCurrency] = useState("₽")
    const [result, setResult] = useState<PaintResult | null>(null)

    const currencies = ["₽", "$", "S$", "€", "£", "¥"]

    const calculate = () => {
        const l = parseFloat(length.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const w = parseFloat(width.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const h = parseFloat(height.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const doorsNum = parseInt(doors.replace(/[^0-9]/g, "") || "0")
        const windowsNum = parseInt(windows.replace(/[^0-9]/g, "") || "0")
        const lay = parseInt(layers.replace(/[^0-9]/g, "") || "1")
        const cov = parseFloat(coverage.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const price = parseFloat(pricePerLiter.replace(",", ".").replace(/[^0-9.-]/g, ""))
        
        if (isNaN(l) || isNaN(w) || isNaN(h) || isNaN(cov) || 
            !isFinite(l) || !isFinite(w) || !isFinite(h) || !isFinite(cov)) return
        
        if (l <= 0 || w <= 0 || h <= 0 || cov <= 0) return
        
        if (l > 1000 || w > 1000 || h > 100) return
        
        if (doorsNum < 0 || windowsNum < 0 || lay < 1 || lay > 10) return

        const res = computePaintLiters({
            length: l,
            width: w,
            height: h,
            doors: doorsNum,
            windows: windowsNum,
            layers: lay,
            coverage: cov,
            pricePerLiter: !isNaN(price) && price > 0 ? price : undefined,
        })

        if (!res) return
        setResult(res)
    }

    const buildSummary = () => {
        const lines: string[] = []
        const doorsNum = parseInt(doors.replace(/[^0-9]/g, "") || "0")
        const windowsNum = parseInt(windows.replace(/[^0-9]/g, "") || "0")

        if (isEnglish) {
            lines.push("Paint Calculator Result")
        } else {
            lines.push("Результат расчета краски")
        }

        lines.push("")

        if (length || width || height) {
            lines.push(
                isEnglish
                    ? `Room size: length ${length || "-"} m, width ${width || "-"} m, height ${height || "-"} m.`
                    : `Размер комнаты: длина ${length || "-"} м, ширина ${width || "-"} м, высота ${height || "-"} м.`,
            )
        }

        if (doorsNum > 0 || windowsNum > 0) {
            lines.push(
                isEnglish
                    ? `Openings: doors ${doorsNum}, windows ${windowsNum}.`
                    : `Проёмы: двери ${doorsNum}, окна ${windowsNum}.`,
            )
        }

        if (layers) {
            lines.push(
                isEnglish
                    ? `Number of coats: ${layers || "-"}.`
                    : `Количество слоёв: ${layers || "-"}.`,
            )
        }

        if (coverage) {
            lines.push(
                isEnglish
                    ? `Coverage rate: ${coverage || "-"} m²/L.`
                    : `Укрывистость краски: ${coverage || "-"} м²/л.`,
            )
        }

        if (result !== null) {
            const rounded = Math.ceil(result.litersNeeded)
            lines.push("")
            lines.push(
                isEnglish
                    ? `Estimated paint needed: ${rounded} L. Add about 10% reserve before buying.`
                    : `Оценочный расход краски: ${rounded} л. Перед покупкой лучше добавить около 10% запаса.`,
            )
            if (result.estimatedCost) {
                lines.push(
                    isEnglish
                        ? `Estimated cost: ~${Math.ceil(result.estimatedCost)} ${currency}`
                        : `Ориентировочная стоимость: ~${Math.ceil(result.estimatedCost)} ${currency}`,
                )
            }
        }

        lines.push("")
        lines.push(
            isEnglish
                ? "Source: renohacks.com — online renovation tools and guides."
                : "Источник: renohacks.com — онлайн-инструменты и статьи о ремонте.",
        )

        return lines.join("\n")
    }

    const handlePrint = () => {
        if (typeof window === "undefined") return

        const summaryText = buildSummary()
        const printWindow = window.open("", "_blank", "width=800,height=1000")
        if (!printWindow) return

        const doc = printWindow.document
        doc.open()
        doc.write(`<!DOCTYPE html>
<html lang="${isEnglish ? "en" : "ru"}">
  <head>
    <meta charSet="utf-8" />
    <title>${isEnglish ? "Paint result — renohacks.com" : "Результат расчёта краски — renohacks.com"}</title>
    <style>
      body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 24px; color: #111827; }
      h1 { font-size: 20px; margin-bottom: 12px; }
      pre { white-space: pre-wrap; font-family: inherit; font-size: 14px; }
    </style>
  </head>
  <body>
    <h1>${isEnglish ? "Paint calculator result" : "Результат калькулятора краски"}</h1>
    <pre>`)
        doc.write(summaryText)
        doc.write(`</pre>
  </body>
</html>`)
        doc.close()
        printWindow.focus()
        printWindow.print()
    }

    const resultNotes =
        result !== null
            ? isEnglish
                ? {
                      title: "How to read this result",
                      intro: `The calculation currently gives ${Math.ceil(result.litersNeeded)} L before the safety reserve. It already includes room walls, ceiling area, openings, coats and the paint coverage you entered.`,
                      sections: [
                          {
                              title: "Already included",
                              items: [
                                  "Wall perimeter and ceiling area for the same room.",
                                  `Openings: ${doors} door(s) and ${windows} window(s).`,
                                  `Number of coats: ${layers}.`,
                                  `Coverage rate: ${coverage} m²/L.`,
                              ],
                          },
                          {
                              title: "Not included automatically",
                              items: [
                                  "Primer, putty, tinting surcharge and tools.",
                                  "Extra paint for very porous, textured or freshly patched walls.",
                                  "Separate paint if you are not painting the ceiling.",
                              ],
                          },
                          {
                              title: "Reserve to add",
                              items: [
                                  "The number shown is the clean estimate, not the final purchase quantity.",
                                  "For most rooms, buy about 10% extra on top of the calculated liters.",
                                  "If the color is difficult to match later, round up to the next full can size.",
                              ],
                          },
                          {
                              title: "Where people miscalculate",
                              items: [
                                  "They forget the calculator already includes the ceiling.",
                                  "They copy the coverage rate from the label without adjusting for a dark base or rough wall.",
                                  "They buy exactly the shown liters and leave no reserve for the second pass or touch-ups.",
                              ],
                          },
                      ],
                  }
                : {
                      title: "Как читать этот результат",
                      intro: `Сейчас калькулятор показывает ${Math.ceil(result.litersNeeded)} л без страхового запаса. В расчет уже вошли стены по периметру, потолок, проемы, количество слоев и укрывистость, которую вы указали.`,
                      sections: [
                          {
                              title: "Что уже учтено",
                              items: [
                                  "Стены по периметру комнаты и площадь потолка.",
                                  `Проемы: двери ${doors} и окна ${windows}.`,
                                  `Количество слоев: ${layers}.`,
                                  `Укрывистость краски: ${coverage} м²/л.`,
                              ],
                          },
                          {
                              title: "Что не учтено автоматически",
                              items: [
                                  "Грунт, шпаклевка, колеровка и расходники.",
                                  "Дополнительный расход на сильно впитывающие, фактурные или свежешпаклеванные стены.",
                                  "Отдельная логика, если потолок вы красить не будете.",
                              ],
                          },
                          {
                              title: "Какой запас добавить",
                              items: [
                                  "Показанное число — это чистый расчет, а не финальный объем покупки.",
                                  "Для обычной комнаты лучше добавить около 10% сверху.",
                                  "Если цвет сложный или важна точная партия, лучше округлить до следующего полного ведра.",
                              ],
                          },
                          {
                              title: "Где чаще ошибаются",
                              items: [
                                  "Забывают, что калькулятор уже включает потолок.",
                                  "Берут укрывистость с банки как идеальную и не учитывают темную базу или шероховатую стену.",
                                  "Покупают ровно по цифре без запаса на второй проход и подкраску.",
                              ],
                          },
                      ],
                  }
            : null

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-r from-primary/15 via-transparent to-accent/20 blur-3xl opacity-60" />
            <div className="relative space-y-6 rounded-[32px] border border-primary/10 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),_transparent_45%),_var(--background)] p-6 md:p-8 shadow-[0_25px_80px_-35px_rgba(79,70,229,0.8)] transition">
                <div className="space-y-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <Calculator className="h-3.5 w-3.5" /> Renohacks Pro Tool
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t.title}</h2>
                    <p className="text-sm text-muted-foreground">
                        {isEnglish 
                            ? "Calculate the exact amount of paint needed for walls and ceilings, accounting for windows, doors, and multiple coats."
                            : "Рассчитайте точный расход краски для стен и потолков с учетом окон, дверей и количества слоев."}
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.length}</label>
                        <Input 
                            placeholder="5.0" 
                            value={length} 
                            onChange={(e) => setLength(e.target.value)}
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.width}</label>
                        <Input 
                            placeholder="4.0" 
                            value={width} 
                            onChange={(e) => setWidth(e.target.value)}
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.height}</label>
                        <Input 
                            placeholder="2.7" 
                            value={height} 
                            onChange={(e) => setHeight(e.target.value)}
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.doors}</label>
                        <Input 
                            placeholder="1" 
                            value={doors} 
                            onChange={(e) => setDoors(e.target.value)}
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.windows}</label>
                        <Input 
                            placeholder="2" 
                            value={windows} 
                            onChange={(e) => setWindows(e.target.value)}
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.layers}</label>
                        <Input 
                            placeholder="2" 
                            value={layers} 
                            onChange={(e) => setLayers(e.target.value)}
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.coverage}</label>
                        <Input 
                            placeholder="10" 
                            value={coverage} 
                            onChange={(e) => setCoverage(e.target.value)}
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">
                            {isEnglish ? "Price per liter" : "Цена за литр"}
                        </label>
                        <Input
                            placeholder={isEnglish ? "optional" : "необязательно"}
                            value={pricePerLiter}
                            onChange={(e) => setPricePerLiter(e.target.value)}
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">
                            {isEnglish ? "Currency" : "Валюта"}
                        </label>
                        <div className="flex gap-1.5">
                            {currencies.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setCurrency(c)}
                                    className={`flex-1 rounded-xl border-2 py-2 text-sm font-medium transition ${
                                        currency === c
                                            ? "border-primary/50 bg-primary/10 text-primary"
                                            : "border-border/40 bg-background/80 text-muted-foreground hover:border-primary/30"
                                    }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <Button
                    onClick={calculate}
                    className="w-full rounded-2xl bg-gradient-to-r from-primary to-primary/80 py-6 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/40 transition hover:translate-y-0 hover:brightness-110"
                    size="lg"
                >
                    {b.calculate}
                </Button>

                {result !== null && (
                    <>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 to-primary/5 p-4 shadow-md">
                                <div className="flex items-center gap-2 text-xs font-medium uppercase text-primary mb-2">
                                    <Calculator className="h-3.5 w-3.5" /> {t.result}
                                </div>
                                <p className="text-2xl font-bold text-primary">
                                    {Math.ceil(result.litersNeeded)} {isEnglish ? "L" : "л"}
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    {isEnglish ? "Add 10% extra for safety." : "Добавьте 10% про запас."}
                                </p>
                            </div>
                            {result.estimatedCost && (
                                <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-4 shadow-md">
                                    <div className="flex items-center gap-2 text-xs font-medium uppercase text-emerald-600 dark:text-emerald-400 mb-2">
                                        {isEnglish ? "Estimated cost" : "Ориентировочная стоимость"}
                                    </div>
                                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                        ~{Math.ceil(result.estimatedCost).toLocaleString()} {currency}
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        {isEnglish ? "Based on your price per liter." : "На основе указанной цены за литр."}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                            <Button
                                variant="outline"
                                className="flex-1 rounded-2xl border-primary/40 bg-background/80"
                                onClick={handlePrint}
                            >
                                {isEnglish ? "Save result as PDF" : "Сохранить результат в PDF"}
                            </Button>
                        </div>
                        {resultNotes ? <CalculationResultNotes {...resultNotes} /> : null}
                    </>
                )}
            </div>
        </div>
    )
}
