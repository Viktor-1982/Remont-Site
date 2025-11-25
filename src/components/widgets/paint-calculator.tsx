"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"
import calcDataJson from "@/components/messages/calc.json"
import type { Locale, CalcData, PaintCalcDict, ButtonsDict } from "@/types/calc"

const calcData = calcDataJson as CalcData

export function PaintCalculator() {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en") || pathname.endsWith("-en")
    const locale: Locale = isEnglish ? "en" : "ru"

    const t: PaintCalcDict = calcData[locale].calc.paint
    const b: ButtonsDict = calcData[locale].calc.buttons

    const [length, setLength] = useState("")
    const [width, setWidth] = useState("")
    const [height, setHeight] = useState("")
    const [doors, setDoors] = useState("1")
    const [windows, setWindows] = useState("1")
    const [layers, setLayers] = useState("2")
    const [coverage, setCoverage] = useState("10")
    const [result, setResult] = useState<number | null>(null)

    const calculate = () => {
        // ✅ Валидация и санитизация входных данных
        const l = parseFloat(length.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const w = parseFloat(width.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const h = parseFloat(height.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const doorsNum = parseInt(doors.replace(/[^0-9]/g, "") || "0")
        const windowsNum = parseInt(windows.replace(/[^0-9]/g, "") || "0")
        const lay = parseInt(layers.replace(/[^0-9]/g, "") || "1")
        const cov = parseFloat(coverage.replace(",", ".").replace(/[^0-9.-]/g, ""))
        
        // Проверка на валидные числа
        if (isNaN(l) || isNaN(w) || isNaN(h) || isNaN(cov) || 
            !isFinite(l) || !isFinite(w) || !isFinite(h) || !isFinite(cov)) return
        
        // Защита от отрицательных и нулевых значений
        if (l <= 0 || w <= 0 || h <= 0 || cov <= 0) return
        
        // Защита от чрезмерно больших значений (защита от DoS)
        if (l > 1000 || w > 1000 || h > 100) return
        
        // Защита от невалидных значений для doors, windows, layers
        if (doorsNum < 0 || windowsNum < 0 || lay < 1 || lay > 10) return
        
        const d = doorsNum * 2
        const win = windowsNum * 1.5
        
        // Проверка на разумность результата (площадь не может быть отрицательной)
        const area = (2 * h * (l + w) - (d + win)) * lay
        if (area <= 0) return

        setResult(area / cov)
    }

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
                            placeholder={t.length} 
                            value={length} 
                            onChange={(e) => setLength(e.target.value)}
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.width}</label>
                        <Input 
                            placeholder={t.width} 
                            value={width} 
                            onChange={(e) => setWidth(e.target.value)}
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.height}</label>
                        <Input 
                            placeholder={t.height} 
                            value={height} 
                            onChange={(e) => setHeight(e.target.value)}
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.doors}</label>
                        <Input 
                            placeholder={t.doors} 
                            value={doors} 
                            onChange={(e) => setDoors(e.target.value)}
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.windows}</label>
                        <Input 
                            placeholder={t.windows} 
                            value={windows} 
                            onChange={(e) => setWindows(e.target.value)}
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.layers}</label>
                        <Input 
                            placeholder={t.layers} 
                            value={layers} 
                            onChange={(e) => setLayers(e.target.value)}
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.coverage}</label>
                        <Input 
                            placeholder={t.coverage} 
                            value={coverage} 
                            onChange={(e) => setCoverage(e.target.value)}
                            className="rounded-xl border-border/60 bg-background/80"
                        />
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
                    <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 to-primary/5 p-4 shadow-md">
                        <div className="flex items-center gap-2 text-xs font-medium uppercase text-primary mb-2">
                            <Calculator className="h-3.5 w-3.5" /> {t.result}
                        </div>
                        <p className="text-2xl font-bold text-primary">
                            {Math.ceil(result)} {isEnglish ? "L" : "л"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                            {isEnglish ? "Add 10% extra for safety." : "Добавьте 10% про запас."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
