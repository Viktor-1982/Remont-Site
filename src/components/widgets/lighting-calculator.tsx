"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lightbulb, Sun, Calculator, CheckCircle2, Share2, Check, FileText } from "lucide-react"
import { computeLighting } from "@/lib/calculations"
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
    const [result, setResult] = useState<ReturnType<typeof computeLighting> | null>(null)
    const [resultCopied, setResultCopied] = useState(false)

    const preset = roomPresets.find((p) => p.value === roomType)

    const calculate = () => {
        const l = parseFloat(length.replace(",", "."))
        const w = parseFloat(width.replace(",", "."))
        const lumen = parseFloat(lumenPerLamp.replace(",", "."))
        const reserveNum = parseFloat(reserve.replace(",", "."))

        const res = computeLighting({
            length: l,
            width: w,
            roomType,
            lumenPerLamp: lumen,
            reservePercent: reserveNum,
        })

        if (!res) return
        setResult(res)
    }

    const buildResultText = () => {
        if (!result || !preset) return ""
        const lines: string[] = []
        if (isEn) {
            lines.push("Lighting Calculator — Result")
            lines.push("")
            lines.push(`Room: ${preset.labelEn}, ${length} m × ${width} m`)
            lines.push(`Area: ${result.areaM2.toFixed(1)} m²`)
            lines.push(`Target illuminance: ${result.targetLux} lux`)
            lines.push(`Total lumens needed: ${result.totalLumensWithReserve} lm`)
            lines.push(`Lumen per lamp: ${lumenPerLamp} lm`)
            lines.push(`Number of lamps: ${result.numberOfLamps}`)
        } else {
            lines.push("Калькулятор освещённости — результат")
            lines.push("")
            lines.push(`Помещение: ${preset.labelRu}, ${length} м × ${width} м`)
            lines.push(`Площадь: ${result.areaM2.toFixed(1)} м²`)
            lines.push(`Норма освещённости: ${result.targetLux} лк`)
            lines.push(`Нужно люмен (с запасом): ${result.totalLumensWithReserve} лм`)
            lines.push(`Световой поток одной лампы: ${lumenPerLamp} лм`)
            lines.push(`Количество ламп: ${result.numberOfLamps}`)
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
                    title: isEn ? "Lighting calculation result" : "Результат расчёта освещения",
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
            `<!DOCTYPE html><html lang="${isEn ? "en" : "ru"}"><head><meta charset="utf-8"><title>${isEn ? "Lighting result" : "Результат освещения"} — Renohacks</title><style>body{font-family:system-ui,sans-serif;margin:24px;color:#111;}pre{white-space:pre-wrap;}</style></head><body><h1>${isEn ? "Lighting calculator result" : "Результат калькулятора освещения"}</h1><pre>${text.replace(/</g, "&lt;")}</pre></body></html>`
        )
        win.document.close()
        win.focus()
        win.print()
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-amber-500/20 p-2 text-amber-600 dark:text-amber-400">
                        <Lightbulb className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">{t.title}</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            {isEn
                                ? "Calculate how many lumens you need and how many lamps to install based on room area and type."
                                : "Узнайте, сколько люмен нужно помещению и сколько ламп установить — по площади и типу комнаты."}
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 mt-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>{t.length}</Label>
                        <Input
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            placeholder="5"
                            className="rounded-xl"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>{t.width}</Label>
                        <Input
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            placeholder="4"
                            className="rounded-xl"
                        />
                    </div>
                </div>

                <div className="mt-4 space-y-2">
                    <Label>{t.roomType}</Label>
                    <div className="grid gap-2 grid-cols-2 sm:grid-cols-3">
                        {roomPresets.map((item) => (
                            <button
                                key={item.value}
                                type="button"
                                onClick={() => setRoomType(item.value)}
                                className={`rounded-xl border-2 px-3 py-2.5 text-sm text-left transition ${
                                    roomType === item.value
                                        ? "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400"
                                        : "border-border/40 bg-card hover:border-amber-400/50"
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

                <div className="grid gap-4 mt-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>{t.lumenPerLamp}</Label>
                        <Input
                            value={lumenPerLamp}
                            onChange={(e) => setLumenPerLamp(e.target.value)}
                            placeholder="1000"
                            className="rounded-xl"
                        />
                        <p className="text-xs text-muted-foreground">
                            {isEn
                                ? "Typical LED bulb: 800–1200 lm. Spotlights: 300–600 lm each."
                                : "Обычная LED-лампа: 800–1200 лм. Точечный светильник: 300–600 лм."}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <Label>{t.reserve}</Label>
                        <Input
                            value={reserve}
                            onChange={(e) => setReserve(e.target.value)}
                            placeholder="10"
                            className="rounded-xl"
                        />
                        <p className="text-xs text-muted-foreground">
                            {isEn ? "10–15% for height and reflection loss." : "10–15% на потери по высоте и отражению."}
                        </p>
                    </div>
                </div>

                <Button onClick={calculate} className="mt-6 w-full" size="lg">
                    {t.calculate}
                </Button>
            </div>

            {result && preset && (
                <>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-2xl border border-border/60 bg-card p-4">
                            <div className="text-xs uppercase text-muted-foreground">{t.area}</div>
                            <div className="text-2xl font-semibold mt-2">
                                {result.areaM2.toFixed(1)} {isEn ? "m²" : "м²"}
                            </div>
                        </div>
                        <div className="rounded-2xl border border-border/60 bg-card p-4">
                            <div className="text-xs uppercase text-muted-foreground">{t.lux}</div>
                            <div className="text-2xl font-semibold mt-2">
                                {result.targetLux} {isEn ? "lux" : "лк"}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                                {isEn ? preset.labelEn : preset.labelRu}
                            </div>
                        </div>
                        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
                            <div className="flex items-center gap-2 text-xs uppercase text-amber-700 dark:text-amber-400">
                                <Sun className="h-4 w-4" />
                                {t.totalLumens}
                            </div>
                            <div className="text-2xl font-semibold mt-2 text-amber-700 dark:text-amber-400">
                                {result.totalLumensWithReserve.toLocaleString()} {isEn ? "lm" : "лм"}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-5">
                        <div className="flex items-center gap-2 text-lg font-semibold text-primary mb-2">
                            <Calculator className="h-5 w-5" />
                            {t.lamps}
                        </div>
                        <p className="text-3xl font-bold text-foreground">{result.numberOfLamps}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                            {isEn
                                ? `At ${lumenPerLamp} lm per lamp. Add local lighting (desk, mirror) as needed.`
                                : `При ${lumenPerLamp} лм на лампу. Добавьте местный свет (стол, зеркало) по необходимости.`}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            variant="outline"
                            className="flex-1 rounded-xl border-primary/40"
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
                            className="flex-1 rounded-xl border-primary/40"
                            onClick={handleSaveResult}
                        >
                            <FileText className="h-4 w-4 mr-2" />
                            {t.saveResult}
                        </Button>
                    </div>
                </>
            )}

            <div className="rounded-2xl border border-border/60 bg-card p-5 text-sm text-muted-foreground">
                <div className="flex items-start gap-2 text-foreground font-medium mb-3">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    {t.instruction}
                </div>
                <ol className="list-decimal ml-5 space-y-2">
                    <li>
                        {isEn
                            ? "Enter room length and width in meters."
                            : "Введите длину и ширину комнаты в метрах."}
                    </li>
                    <li>
                        {isEn
                            ? "Select room type — the calculator uses standard lux norms (living 150, kitchen 250, office 300, etc.)."
                            : "Выберите тип помещения — используются нормы освещённости (гостиная 150 лк, кухня 250, кабинет 300 и т.д.)."}
                    </li>
                    <li>
                        {isEn
                            ? "Enter lumen per lamp (see packaging; typical LED bulb 800–1200 lm)."
                            : "Укажите световой поток одной лампы (указан на упаковке; обычно LED 800–1200 лм)."}
                    </li>
                    <li>
                        {isEn
                            ? "Get total lumens and recommended number of lamps. Add 10–15% reserve for ceiling height."
                            : "Получите нужное количество люмен и число ламп. Запас 10–15% учитывает высоту потолка."}
                    </li>
                </ol>
            </div>
        </div>
    )
}
