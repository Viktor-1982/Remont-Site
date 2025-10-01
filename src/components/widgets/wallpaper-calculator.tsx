"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"
import calcData from "@/messages/calc.json"

export function WallpaperCalculator() {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en")
    const t = (calcData as any)[isEnglish ? "en" : "ru"].calc.wallpaper || {
        title: isEnglish ? "Wallpaper Calculator" : "Калькулятор обоев",
        inputLabel: isEnglish ? "Wall area in m²" : "Площадь стен в м²",
        result: isEnglish ? "Rolls needed:" : "Необходимо рулонов:",
    }

    const [area, setArea] = useState("")
    const [rollCoverage, setRollCoverage] = useState("5") // м² на 1 рулон
    const [result, setResult] = useState<number | null>(null)

    const calculate = () => {
        const a = parseFloat(area.replace(",", "."))
        const r = parseFloat(rollCoverage.replace(",", "."))
        if (!a || !r) return
        setResult(a / r)
    }

    return (
        <div className="max-w-md mx-auto border rounded-lg p-4 shadow-sm space-y-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Calculator className="w-5 h-5 text-primary" /> {t.title}
            </h2>

            <div>
                <label className="block text-sm font-medium mb-1">
                    {t.inputLabel}
                </label>
                <Input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="25"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    {isEnglish ? "Roll coverage (m²)" : "Покрытие 1 рулона (м²)"}
                </label>
                <Input
                    type="number"
                    value={rollCoverage}
                    onChange={(e) => setRollCoverage(e.target.value)}
                    placeholder="5"
                />
            </div>

            <Button onClick={calculate} className="w-full">
                {isEnglish ? "Calculate" : "Рассчитать"}
            </Button>

            {result !== null && (
                <p className="text-lg font-medium">
                    {t.result} <b>{Math.ceil(result)}</b>
                </p>
            )}
        </div>
    )
}
