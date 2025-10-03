"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"
import calcDataJson from "@/messages/calc.json"
import type { Locale, CalcData, TilesCalcDict, ButtonsDict } from "@/types/calc"

const calcData = calcDataJson as CalcData

export function TileCalculator() {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en") || pathname.endsWith("-en")
    const locale: Locale = isEnglish ? "en" : "ru"

    const t: TilesCalcDict = calcData[locale].calc.tiles
    const b: ButtonsDict = calcData[locale].calc.buttons

    const [area, setArea] = useState("")
    const [tileSize, setTileSize] = useState("0.25")
    const [result, setResult] = useState<number | null>(null)

    const calculate = () => {
        const a = parseFloat(area.replace(",", "."))
        const ts = parseFloat(tileSize.replace(",", "."))
        if (!a || !ts) return
        setResult(a / ts)
    }

    return (
        <div className="max-w-md mx-auto border rounded-lg p-4 shadow-sm space-y-4 bg-card">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Calculator className="w-5 h-5 text-primary" /> {t.title}
            </h2>

            <Input placeholder={t.inputLabel} value={area} onChange={(e) => setArea(e.target.value)} />
            <Input placeholder={t.tileSize} value={tileSize} onChange={(e) => setTileSize(e.target.value)} />

            <Button onClick={calculate} className="w-full">
                {b.calculate}
            </Button>

            {result !== null && (
                <div className="mt-4 p-3 rounded-lg bg-muted">
                    <p className="text-lg font-semibold">
                        {t.result} <b>{Math.ceil(result)}</b> 🧱
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {isEnglish ? "Buy 5% extra for cutting waste." : "Возьмите +5% на подрезку."}
                    </p>
                </div>
            )}
        </div>
    )
}
