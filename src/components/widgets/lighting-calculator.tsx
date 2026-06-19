"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lightbulb, Sun, Calculator, Share2, Check, FileText } from "lucide-react"
import { CalculationResultNotes } from "@/components/widgets/calculation-result-notes"
import { computeLighting, type LightingResult } from "@/lib/calculations"
import calcDataJson from "@/components/messages/calc.json"
import type { Locale, CalcData, LightingCalcDict } from "@/types/calc"

const calcData = calcDataJson as CalcData

type RoomType = "living" | "kitchen" | "bathroom" | "bedroom" | "office" | "hallway" | "kids"

const roomPresets: Array<{
    value: RoomType
    labelRu: string
    labelEn: string
    lux: number
}> = [
    { value: "living", labelRu: "Гостиная", labelEn: "Living room", lux: 150 },
    { value: "kitchen", labelRu: "Кухня", labelEn: "Kitchen", lux: 250 },
    { value: "bathroom", labelRu: "Ванная", labelEn: "Bathroom", lux: 200 },
    { value: "bedroom", labelRu: "Спальня", labelEn: "Bedroom", lux: 150 },
    { value: "office", labelRu: "Кабинет", labelEn: "Home office", lux: 300 },
    { value: "hallway", labelRu: "Коридор", labelEn: "Hallway", lux: 100 },
    { value: "kids", labelRu: "Детская", labelEn: "Kids room", lux: 200 },
]

export function LightingCalculator({ isEnglish = false }: { isEnglish?: boolean }) {
    const pathname = usePathname()
    const isEn = isEnglish || pathname.startsWith("/en")
    const locale: Locale = isEn ? "en" : "ru"
    const t: LightingCalcDict = calcData[locale].calc.lighting

    const [length, setLength] = useState("")
    const [width, setWidth] = useState("")
    const [roomType, setRoomType] = useState<RoomType>("living")
    const [lumenPerLamp, setLumenPerLamp] = useState("1000")
    const [reserve, setReserve] = useState("10")
    const [pricePerLamp, setPricePerLamp] = useState("")
    const [currency, setCurrency] = useState("₽")
    const currencies = ["₽", "$", "€", "£", "¥"]

    const [result, setResult] = useState<LightingResult | null>(null)
    const [resultCopied, setResultCopied] = useState(false)

    const preset = roomPresets.find((p) => p.value === roomType)

    const calculate = () => {
        const l = parseFloat(length.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const w = parseFloat(width.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const lumen = parseFloat(lumenPerLamp.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const reserveNum = parseFloat(reserve.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const price = parseFloat(pricePerLamp.replace(",", ".").replace(/[^0-9.-]/g, ""))

        if (isNaN(l) || isNaN(w) || isNaN(lumen) || !isFinite(l) || !isFinite(w) || !isFinite(lumen)) return
        if (l <= 0 || w <= 0 || lumen <= 0) return

        const res = computeLighting({
            length: l,
            width: w,
            roomType,
            lumenPerLamp: lumen,
            reservePercent: !isNaN(reserveNum) ? reserveNum : 10,
            pricePerLamp: !isNaN(price) && price > 0 ? price : undefined,
        })

        if (!res) return
        setResult(res)
    }

    const buildResultText = () => {
        if (!result || !preset) return ""
        const lines: string[] = []
        if (isEn) {
            lines.push("Lighting Calculator Result")
            lines.push("")
            lines.push(`Room: ${preset.labelEn}, ${length} m × ${width} m`)
            lines.push(`Area: ${result.areaM2.toFixed(1)} m²`)
            lines.push(`Target illuminance: ${result.targetLux} lux`)
            lines.push(`Lumens needed with reserve: ${result.totalLumensWithReserve} lm`)
            lines.push(`Lumen per lamp: ${lumenPerLamp} lm`)
            lines.push(`Lamp count: ${result.numberOfLamps}`)
            if (result.estimatedCost) {
                lines.push(`Estimated cost: ~${Math.ceil(result.estimatedCost).toLocaleString()} ${currency}`)
            }
        } else {
            lines.push("Результат расчета освещения")
            lines.push("")
            lines.push(`Помещение: ${preset.labelRu}, ${length} м × ${width} м`)
            lines.push(`Площадь: ${result.areaM2.toFixed(1)} м²`)
            lines.push(`Норма освещённости: ${result.targetLux} лк`)
            lines.push(`Нужно света с запасом: ${result.totalLumensWithReserve} лм`)
            lines.push(`Световой поток одной лампы: ${lumenPerLamp} лм`)
            lines.push(`Количество светильников или ламп: ${result.numberOfLamps}`)
            if (result.estimatedCost) {
                lines.push(`Ориентировочная стоимость: ~${Math.ceil(result.estimatedCost).toLocaleString()} ${currency}`)
            }
        }
        lines.push("")
        lines.push(isEn ? "Source: renohacks.com" : "Источник: renohacks.com")
        return lines.join("\n")
    }

    const handleShareResult = async () => {
        const text = buildResultText()
        const url = typeof window !== "undefined" ? window.location.href : ""
        const sharePayload = `${text}\n\n${url}`

        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share({
                    title: isEn ? "Lighting Calculator Result" : "Результат расчета освещения",
                    text: sharePayload,
                })
            } catch {
                await copyResult(sharePayload)
            }
        } else {
            await copyResult(sharePayload)
        }
    }

    const copyResult = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setResultCopied(true)
            setTimeout(() => setResultCopied(false), 2000)
        } catch {
            const ta = document.createElement("textarea")
            ta.value = text
            ta.style.position = "fixed"
            ta.style.left = "-9999px"
            document.body.appendChild(ta)
            ta.select()
            document.execCommand("copy")
            document.body.removeChild(ta)
            setResultCopied(true)
            setTimeout(() => setResultCopied(false), 2000)
        }
    }

    const handleSaveResult = () => {
        if (typeof window === "undefined") return
        const text = buildResultText()
        const win = window.open("", "_blank", "width=600,height=500")
        if (!win) return
        win.document.write(
            `<!DOCTYPE html><html lang="${isEn ? "en" : "ru"}"><head><meta charset="utf-8"><title>${isEn ? "Lighting result" : "Результат расчета освещения"} — Renohacks</title><style>body{font-family:system-ui,sans-serif;margin:24px;color:#111;}pre{white-space:pre-wrap;}</style></head><body><h1>${isEn ? "Lighting calculator result" : "Результат расчета освещения"}</h1><pre>${text.replace(/</g, "&lt;")}</pre></body></html>`
        )
        win.document.close()
        win.focus()
        win.print()
    }

    const resultNotes =
        result && preset
            ? isEn
                ? {
                      title: "How to read this result",
                      intro: `The calculator recommends ${result.numberOfLamps} lamps at ${lumenPerLamp} lm each for a ${preset.labelEn.toLowerCase()} of ${result.areaM2.toFixed(1)} m².`,
                      sections: [
                          {
                              title: "Already included",
                              items: [
                                  `Standard illuminance norm for ${preset.labelEn.toLowerCase()}: ${result.targetLux} lux.`,
                                  `Light loss factor of 1.2 for ceiling height and room reflection.`,
                                  `Reserve of ${reserve}% on top of the base lumens.`,
                              ],
                          },
                          {
                              title: "Not included automatically",
                              items: [
                                  "Local task lighting (desk lamp, mirror light, reading spot).",
                                  "Decorative / accent lighting that does not contribute to general illuminance.",
                                  "Dimmer efficiency losses or smart-bulb color temperature shifts.",
                              ],
                          },
                          {
                              title: "Where people miscalculate",
                              items: [
                                  "They mix lumens with watts — always check the lumen value on the lamp box.",
                                  "They forget that dark walls and furniture absorb light and need more lumens.",
                                  "They plan all light from the ceiling and skip task zones entirely.",
                              ],
                          },
                      ],
                  }
                : {
                      title: "Как читать этот результат",
                      intro: `Калькулятор рекомендует ${result.numberOfLamps} ламп(ы) по ${lumenPerLamp} лм для ${preset.labelRu.toLowerCase()} площадью ${result.areaM2.toFixed(1)} м².`,
                      sections: [
                          {
                              title: "Что уже учтено",
                              items: [
                                  `Норма освещённости для ${preset.labelRu.toLowerCase()}: ${result.targetLux} лк.`,
                                  `Коэффициент потерь света 1.2 (высота потолка, отражение стен).`,
                                  `Запас ${reserve}% сверх базовых люменов.`,
                              ],
                          },
                          {
                              title: "Что не учтено автоматически",
                              items: [
                                  "Локальный свет (настольная лампа, зеркало, бра для чтения).",
                                  "Декоративная / акцентная подсветка, не дающая общего освещения.",
                                  "Потери от диммера или сдвиг цветовой температуры у умных ламп.",
                              ],
                          },
                          {
                              title: "Где чаще ошибаются",
                              items: [
                                  "Путают люмены с ваттами — всегда проверяйте люмены на упаковке.",
                                  "Забывают, что тёмные стены и мебель поглощают свет и требуют больше люменов.",
                                  "Планируют весь свет с потолка и полностью игнорируют зоны локального освещения.",
                              ],
                          },
                      ],
                  }
            : null

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-r from-amber-500/15 via-transparent to-primary/20 blur-3xl opacity-60" />
            <div className="relative space-y-6 rounded-[32px] border border-primary/10 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.12),_transparent_45%),_var(--background)] p-6 md:p-8 shadow-[0_25px_80px_-35px_rgba(245,158,11,0.6)] transition">
                <div className="space-y-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                        <Lightbulb className="h-3.5 w-3.5" /> Renohacks Pro Tool
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t.title}</h2>
                    <p className="text-sm text-muted-foreground">
                        {isEn
                            ? "Calculate how many lumens you need and how many lamps to install based on room area and type."
                            : "Узнайте, сколько люмен нужно помещению и сколько ламп установить — по площади и типу комнаты."}
                    </p>
                </div>

                {/* Room type selection */}
                <div className="space-y-3">
                    <label className="text-xs font-medium text-muted-foreground">{t.roomType}</label>
                    <div className="grid gap-2 grid-cols-2 sm:grid-cols-4">
                        {roomPresets.map((item) => (
                            <button
                                key={item.value}
                                type="button"
                                onClick={() => setRoomType(item.value)}
                                className={`rounded-xl border-2 px-3 py-2.5 text-sm text-left transition ${
                                    roomType === item.value
                                        ? "border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-400 shadow-md"
                                        : "border-border/40 bg-card/50 hover:border-amber-400/50"
                                }`}
                            >
                                {isEn ? item.labelEn : item.labelRu}
                                <span className="block text-xs text-muted-foreground mt-0.5">
                                    {item.lux} {isEn ? "lux" : "лк"}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Room dimensions */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.length}</label>
                        <Input
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            placeholder="5"
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.width}</label>
                        <Input
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            placeholder="4"
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                </div>

                {/* Lamp params */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.lumenPerLamp}</label>
                        <Input
                            value={lumenPerLamp}
                            onChange={(e) => setLumenPerLamp(e.target.value)}
                            placeholder="1000"
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                        <p className="text-xs text-muted-foreground">
                            {isEn
                                ? "Typical LED bulb: 800–1200 lm. Spotlights: 300–600 lm each."
                                : "Обычная LED-лампа: 800–1200 лм. Точечный светильник: 300–600 лм."}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.reserve}</label>
                        <Input
                            value={reserve}
                            onChange={(e) => setReserve(e.target.value)}
                            placeholder="10"
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                        <p className="text-xs text-muted-foreground">
                            {isEn ? "10–15% for height and reflection loss." : "10–15% на потери по высоте и отражению."}
                        </p>
                    </div>
                </div>

                {/* Cost estimation */}
                <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm space-y-4">
                    <label className="text-xs font-medium text-muted-foreground block">
                        {isEn ? "Cost estimation (optional)" : "Оценка стоимости (необязательно)"}
                    </label>
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-xs text-muted-foreground">
                                {isEn ? "Price per lamp" : "Цена за лампу / светильник"}
                            </label>
                            <Input
                                placeholder={isEn ? "optional" : "необязательно"}
                                value={pricePerLamp}
                                onChange={(e) => setPricePerLamp(e.target.value)}
                                className="rounded-xl border-border/60 bg-background/80"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-muted-foreground">
                                {isEn ? "Currency" : "Валюта"}
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
                </div>

                <Button
                    onClick={calculate}
                    className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 py-6 text-base font-semibold text-white shadow-lg shadow-amber-500/40 transition hover:brightness-110"
                    size="lg"
                >
                    {t.calculate}
                </Button>

                {result && preset && (
                    <>
                        {/* Result cards */}
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm">
                                <div className="text-xs uppercase text-muted-foreground">{t.area}</div>
                                <div className="text-2xl font-semibold mt-2">
                                    {result.areaM2.toFixed(1)} {isEn ? "m²" : "м²"}
                                </div>
                            </div>
                            <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm">
                                <div className="text-xs uppercase text-muted-foreground">{t.lux}</div>
                                <div className="text-2xl font-semibold mt-2">
                                    {result.targetLux} {isEn ? "lux" : "лк"}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    {isEn ? preset.labelEn : preset.labelRu}
                                </div>
                            </div>
                            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-amber-500/5 p-4 shadow-sm">
                                <div className="flex items-center gap-2 text-xs uppercase text-amber-700 dark:text-amber-400">
                                    <Sun className="h-4 w-4" />
                                    {t.totalLumens}
                                </div>
                                <div className="text-2xl font-semibold mt-2 text-amber-700 dark:text-amber-400">
                                    {result.totalLumensWithReserve.toLocaleString()} {isEn ? "lm" : "лм"}
                                </div>
                            </div>
                        </div>

                        {/* Main result */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-5">
                                <div className="flex items-center gap-2 text-lg font-semibold text-primary mb-2">
                                    <Calculator className="h-5 w-5" />
                                    {t.lamps}
                                </div>
                                <p className="text-3xl font-bold text-foreground">{result.numberOfLamps}</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    {isEn
                                        ? `At ${lumenPerLamp} lm per lamp.`
                                        : `При ${lumenPerLamp} лм на лампу.`}
                                </p>
                            </div>
                            {result.estimatedCost && (
                                <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-5 shadow-md">
                                    <div className="flex items-center gap-2 text-xs font-medium uppercase text-emerald-600 dark:text-emerald-400 mb-2">
                                        {isEn ? "Estimated cost" : "Ориентировочная стоимость"}
                                    </div>
                                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                        ~{Math.ceil(result.estimatedCost).toLocaleString()} {currency}
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        {isEn ? "Based on your price per lamp." : "На основе указанной цены за лампу."}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                variant="outline"
                                className="flex-1 rounded-2xl border-primary/40 bg-background/80"
                                onClick={handleShareResult}
                            >
                                {resultCopied ? (
                                    <>
                                        <Check className="h-4 w-4 mr-2" />
                                        {isEn ? "Copied!" : "Скопировано!"}
                                    </>
                                ) : (
                                    <>
                                        <Share2 className="h-4 w-4 mr-2" />
                                        {t.shareResult}
                                    </>
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 rounded-2xl border-primary/40 bg-background/80"
                                onClick={handleSaveResult}
                            >
                                <FileText className="h-4 w-4 mr-2" />
                                {t.saveResult}
                            </Button>
                        </div>

                        {resultNotes ? <CalculationResultNotes {...resultNotes} /> : null}
                    </>
                )}
            </div>
        </div>
    )
}
