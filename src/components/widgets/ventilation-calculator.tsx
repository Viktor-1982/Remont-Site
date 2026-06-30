"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Wind, Gauge, Share2, Check, FileText } from "lucide-react"
import { CalculationResultNotes } from "@/components/widgets/calculation-result-notes"
import { computeVentilation, type VentilationResult } from "@/lib/calculations"
import calcDataJson from "@/components/messages/calc.json"
import type { Locale, CalcData, VentilationCalcDict } from "@/types/calc"

const calcData = calcDataJson as CalcData

type RoomType = "living" | "bedroom" | "kitchen" | "bathroom" | "office" | "hallway"

const roomPresets: Array<{
    value: RoomType
    labelRu: string
    labelEn: string
    achMin: number
    achMax: number
}> = [
    { value: "living", labelRu: "Гостиная", labelEn: "Living room", achMin: 3, achMax: 4 },
    { value: "bedroom", labelRu: "Спальня", labelEn: "Bedroom", achMin: 3, achMax: 4 },
    { value: "kitchen", labelRu: "Кухня", labelEn: "Kitchen", achMin: 6, achMax: 10 },
    { value: "bathroom", labelRu: "Ванная", labelEn: "Bathroom", achMin: 6, achMax: 8 },
    { value: "office", labelRu: "Кабинет", labelEn: "Home office", achMin: 3, achMax: 5 },
    { value: "hallway", labelRu: "Коридор", labelEn: "Hallway", achMin: 2, achMax: 3 },
]

export function VentilationCalculator({ isEnglish = false }: { isEnglish?: boolean }) {
    const pathname = usePathname()
    const isEn = isEnglish || !pathname.startsWith("/ru")
    const locale: Locale = isEn ? "en" : "ru"
    const t: VentilationCalcDict = calcData[locale].calc.ventilation

    const [length, setLength] = useState("")
    const [width, setWidth] = useState("")
    const [height, setHeight] = useState("2.7")
    const [roomType, setRoomType] = useState<RoomType>("living")
    const [ach, setAch] = useState("3")
    const [reserve, setReserve] = useState("10")
    const [result, setResult] = useState<VentilationResult | null>(null)
    const [resultCopied, setResultCopied] = useState(false)

    const preset = roomPresets.find((item) => item.value === roomType)

    const calculate = () => {
        const l = parseFloat(length.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const w = parseFloat(width.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const h = parseFloat(height.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const achNum = parseFloat(ach.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const reserveNum = parseFloat(reserve.replace(",", ".").replace(/[^0-9.-]/g, ""))

        if (isNaN(l) || isNaN(w) || isNaN(h) || isNaN(achNum)) return
        if (!isFinite(l) || !isFinite(w) || !isFinite(h) || !isFinite(achNum)) return
        if (l <= 0 || w <= 0 || h <= 0 || achNum <= 0) return

        const res = computeVentilation({
            length: l,
            width: w,
            height: h,
            airChangesPerHour: achNum,
            reservePercent: !isNaN(reserveNum) ? reserveNum : 10,
        })

        if (!res) return
        setResult(res)
    }

    const buildResultText = () => {
        if (!result || !preset) return ""
        const lines: string[] = []
        if (isEn) {
            lines.push("Ventilation Calculator Result")
            lines.push("")
            lines.push(`Room: ${preset.labelEn}, ${length} m × ${width} m × ${height} m`)
            lines.push(`Volume: ${result.volumeM3.toFixed(1)} m³`)
            lines.push(`Air changes per hour: ${ach}`)
            lines.push(`Airflow: ${result.flowM3h.toFixed(0)} m³/h (${result.flowLs.toFixed(1)} L/s)`)
            lines.push(`With reserve: ${result.flowWithReserveM3h.toFixed(0)} m³/h`)
        } else {
            lines.push("Результат расчета вентиляции")
            lines.push("")
            lines.push(`Помещение: ${preset.labelRu}, ${length} м × ${width} м × ${height} м`)
            lines.push(`Объем: ${result.volumeM3.toFixed(1)} м³`)
            lines.push(`Кратность воздухообмена: ${ach}`)
            lines.push(`Расход воздуха: ${result.flowM3h.toFixed(0)} м³/ч (${result.flowLs.toFixed(1)} л/с)`)
            lines.push(`С запасом: ${result.flowWithReserveM3h.toFixed(0)} м³/ч`)
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
                    title: isEn ? "Ventilation Calculator Result" : "Результат расчета вентиляции",
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
            `<!DOCTYPE html><html lang="${isEn ? "en" : "ru"}"><head><meta charset="utf-8"><title>${isEn ? "Ventilation result" : "Результат расчета вентиляции"} — Renohacks</title><style>body{font-family:system-ui,sans-serif;margin:24px;color:#111;}pre{white-space:pre-wrap;}</style></head><body><h1>${isEn ? "Ventilation calculator result" : "Результат расчета вентиляции"}</h1><pre>${text.replace(/</g, "&lt;")}</pre></body></html>`
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
                      intro: `The calculator shows an airflow of ${result.flowWithReserveM3h.toFixed(0)} m³/h (with reserve) for a ${preset.labelEn.toLowerCase()} of ${result.volumeM3.toFixed(1)} m³.`,
                      sections: [
                          {
                              title: "Already included",
                              items: [
                                  `Room volume: ${result.volumeM3.toFixed(1)} m³.`,
                                  `Air changes per hour (ACH): ${ach}.`,
                                  `Reserve: ${reserve}% on top of the base airflow.`,
                              ],
                          },
                          {
                              title: "Not included automatically",
                              items: [
                                  "Duct pressure losses — depend on duct layout and fittings.",
                                  "Filter resistance — varies with filter type and age.",
                                  "Heat recovery efficiency if using an HRV/ERV unit.",
                              ],
                          },
                          {
                              title: "Where people miscalculate",
                              items: [
                                  "They use the wrong ACH norm — kitchens and bathrooms need 6–10, bedrooms 3–4.",
                                  "They forget to add duct losses when sizing the fan.",
                                  "They confuse supply and exhaust rates — both need to be balanced.",
                              ],
                          },
                      ],
                  }
                : {
                      title: "Как читать этот результат",
                      intro: `Калькулятор показывает расход ${result.flowWithReserveM3h.toFixed(0)} м³/ч (с запасом) для ${preset.labelRu.toLowerCase()} объемом ${result.volumeM3.toFixed(1)} м³.`,
                      sections: [
                          {
                              title: "Что уже учтено",
                              items: [
                                  `Объем помещения: ${result.volumeM3.toFixed(1)} м³.`,
                                  `Кратность воздухообмена: ${ach}.`,
                                  `Запас: ${reserve}% сверх базового расхода.`,
                              ],
                          },
                          {
                              title: "Что не учтено автоматически",
                              items: [
                                  "Потери давления в воздуховодах — зависят от трассировки и фитингов.",
                                  "Сопротивление фильтра — меняется от типа и степени загрязнения.",
                                  "КПД рекуператора, если используется приточно-вытяжная установка.",
                              ],
                          },
                          {
                              title: "Где чаще ошибаются",
                              items: [
                                  "Используют неправильную кратность — на кухне и в ванной нужно 6–10, в спальне 3–4.",
                                  "Забывают учесть потери в воздуховодах при подборе вентилятора.",
                                  "Путают приток и вытяжку — оба потока должны быть сбалансированы.",
                              ],
                          },
                      ],
                  }
            : null

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-r from-sky-500/15 via-transparent to-primary/20 blur-3xl opacity-60" />
            <div className="relative space-y-6 rounded-[32px] border border-primary/10 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_45%),_var(--background)] p-6 md:p-8 shadow-[0_25px_80px_-35px_rgba(14,165,233,0.6)] transition">
                <div className="space-y-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-600 dark:text-sky-400">
                        <Wind className="h-3.5 w-3.5" /> Renohacks Pro Tool
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t.title}</h2>
                    <p className="text-sm text-muted-foreground">
                        {isEn
                            ? "Uses the real formula: airflow = volume × air changes per hour (ACH)."
                            : "Реальная формула: расход = объём × кратность воздухообмена (ACH)."}
                    </p>
                </div>

                {/* Room dimensions */}
                <div className="grid gap-4 md:grid-cols-3">
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
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.height}</label>
                        <Input
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="2.7"
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                </div>

                {/* Room type selection */}
                <div className="space-y-3">
                    <label className="text-xs font-medium text-muted-foreground">{t.roomType}</label>
                    <div className="grid gap-2 grid-cols-2 sm:grid-cols-3">
                        {roomPresets.map((item) => (
                            <button
                                key={item.value}
                                type="button"
                                onClick={() => {
                                    setRoomType(item.value)
                                    setAch(((item.achMin + item.achMax) / 2).toFixed(1))
                                }}
                                className={`rounded-xl border-2 px-3 py-2.5 text-sm text-left transition ${
                                    roomType === item.value
                                        ? "border-sky-500/50 bg-sky-500/10 text-sky-700 dark:text-sky-400 shadow-md"
                                        : "border-border/40 bg-card/50 hover:border-sky-400/50"
                                }`}
                            >
                                {isEn ? item.labelEn : item.labelRu}
                                <span className="block text-xs text-muted-foreground mt-0.5">
                                    ACH {item.achMin}–{item.achMax}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ACH and Reserve */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.ach}</label>
                        <Input
                            value={ach}
                            onChange={(e) => setAch(e.target.value)}
                            placeholder="3.5"
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                        {preset && (
                            <p className="text-xs text-muted-foreground">
                                {isEn
                                    ? `Typical ACH for ${preset.labelEn.toLowerCase()}: ${preset.achMin}–${preset.achMax}`
                                    : `Типичная кратность для ${preset.labelRu.toLowerCase()}: ${preset.achMin}–${preset.achMax}`}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.reserve}</label>
                        <Input
                            value={reserve}
                            onChange={(e) => setReserve(e.target.value)}
                            placeholder="10"
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                </div>

                <Button
                    onClick={calculate}
                    className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 py-6 text-base font-semibold text-white shadow-lg shadow-sky-500/40 transition hover:brightness-110"
                    size="lg"
                >
                    {t.calculate}
                </Button>

                {result && preset && (
                    <>
                        {/* Result cards */}
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm">
                                <div className="text-xs uppercase text-muted-foreground">{t.volume}</div>
                                <div className="text-2xl font-semibold mt-2">
                                    {result.volumeM3.toFixed(1)} {isEn ? "m³" : "м³"}
                                </div>
                            </div>
                            <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm">
                                <div className="text-xs uppercase text-muted-foreground">{t.airflow}</div>
                                <div className="text-2xl font-semibold mt-2">
                                    {result.flowM3h.toFixed(0)} {isEn ? "m³/h" : "м³/ч"}
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">
                                    {result.flowLs.toFixed(1)} {isEn ? "L/s" : "л/с"}
                                </div>
                            </div>
                            <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-500/10 to-sky-500/5 p-4 shadow-sm">
                                <div className="flex items-center gap-2 text-xs uppercase text-sky-700 dark:text-sky-400">
                                    <Gauge className="h-4 w-4" />
                                    {t.withReserve}
                                </div>
                                <div className="text-2xl font-semibold mt-2 text-sky-700 dark:text-sky-400">
                                    {result.flowWithReserveM3h.toFixed(0)} {isEn ? "m³/h" : "м³/ч"}
                                </div>
                            </div>
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
                                        {isEn ? "Share result" : "Поделиться результатом"}
                                    </>
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 rounded-2xl border-primary/40 bg-background/80"
                                onClick={handleSaveResult}
                            >
                                <FileText className="h-4 w-4 mr-2" />
                                {isEn ? "Save as PDF" : "Сохранить в PDF"}
                            </Button>
                        </div>

                        {resultNotes ? <CalculationResultNotes {...resultNotes} /> : null}
                    </>
                )}
            </div>
        </div>
    )
}
