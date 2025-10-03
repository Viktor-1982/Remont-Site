"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"
import calcDataJson from "@/messages/calc.json"
import type { Locale, CalcData, WallpaperCalcDict, ButtonsDict } from "@/types/calc"

const calcData = calcDataJson as CalcData

export function WallpaperCalculator() {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en") || pathname.endsWith("-en")
    const locale: Locale = isEnglish ? "en" : "ru"

    const t: WallpaperCalcDict = calcData[locale].calc.wallpaper
    const b: ButtonsDict = calcData[locale].calc.buttons

    const [area, setArea] = useState("")
    const [rollCoverage, setRollCoverage] = useState("5")
    const [result, setResult] = useState<number | null>(null)

    const calculate = () => {
        const a = parseFloat(area.replace(",", "."))
        const r = parseFloat(rollCoverage.replace(",", "."))
        if (!a || !r) return
        setResult(a / r)
    }

    return (
        <div className="max-w-md mx-auto border rounded-lg p-4 shadow-sm space-y-4 bg-card">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Calculator className="w-5 h-5 text-primary" /> {t.title}
            </h2>

            <Input placeholder={t.inputLabel} value={area} onChange={(e) => setArea(e.target.value)} />
            <Input placeholder={t.rollCoverage} value={rollCoverage} onChange={(e) => setRollCoverage(e.target.value)} />

            <Button onClick={calculate} className="w-full">
                {b.calculate}
            </Button>

            {result !== null && (
                <div className="mt-4 p-3 rounded-lg bg-muted">
                    <p className="text-lg font-semibold">
                        {t.result} <b>{Math.ceil(result)}</b> 📦
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {isEnglish ? "We recommend buying 1 extra roll just in case." : "Рекомендуем взять +1 рулон про запас."}
                    </p>
                </div>
            )}
        </div>
    )
}
