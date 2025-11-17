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
        <div className="max-w-md mx-auto border rounded-lg p-4 shadow-sm space-y-4 bg-card">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Calculator className="w-5 h-5 text-primary" /> {t.title}
            </h2>

            <Input placeholder={t.length} value={length} onChange={(e) => setLength(e.target.value)} />
            <Input placeholder={t.width} value={width} onChange={(e) => setWidth(e.target.value)} />
            <Input placeholder={t.height} value={height} onChange={(e) => setHeight(e.target.value)} />
            <Input placeholder={t.doors} value={doors} onChange={(e) => setDoors(e.target.value)} />
            <Input placeholder={t.windows} value={windows} onChange={(e) => setWindows(e.target.value)} />
            <Input placeholder={t.layers} value={layers} onChange={(e) => setLayers(e.target.value)} />
            <Input placeholder={t.coverage} value={coverage} onChange={(e) => setCoverage(e.target.value)} />

            <Button onClick={calculate} className="w-full">
                {b.calculate}
            </Button>

            {result !== null && (
                <div className="mt-4 p-3 rounded-lg bg-muted">
                    <p className="text-lg font-semibold">
                        {t.result} <b>{Math.ceil(result)}</b> L
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {isEnglish ? "Add 10% extra for safety." : "Добавьте 10% про запас."}
                    </p>
                </div>
            )}
        </div>
    )
}
