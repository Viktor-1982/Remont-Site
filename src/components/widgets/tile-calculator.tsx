"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"
import calcData from "@/messages/calc.json"

export function TileCalculator() {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en")
    const t = (calcData as any)[isEnglish ? "en" : "ru"].calc.tiles

    const [area, setArea] = useState("")
    const [tileSize, setTileSize] = useState("0.25") // м² на 1 плитку
    const [result, setResult] = useState<number | null>(null)

    const calculate = () => {
        const a = parseFloat(area.replace(",", "."))
        const s = parseFloat(tileSize.replace(",", "."))
        if (!a || !s) return
        setResult(a / s)
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
                    placeholder="15"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    {isEnglish ? "Tile size (m²)" : "Размер плитки (м²)"}
                </label>
                <Input
                    type="number"
                    value={tileSize}
                    onChange={(e) => setTileSize(e.target.value)}
                    placeholder="0.25"
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
