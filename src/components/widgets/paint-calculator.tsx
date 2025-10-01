"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"
import calcData from "@/messages/calc.json"

export function PaintCalculator() {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en")
    const t = (calcData as any)[isEnglish ? "en" : "ru"].calc.paint

    const [area, setArea] = useState("")
    const [consumption, setConsumption] = useState("10") // м²/л
    const [result, setResult] = useState<number | null>(null)

    const calculate = () => {
        const a = parseFloat(area.replace(",", "."))
        const c = parseFloat(consumption.replace(",", "."))
        if (!a || !c) return
        setResult(a / c)
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
                    placeholder="20"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    {isEnglish ? "Consumption (m²/L)" : "Расход (м²/л)"}
                </label>
                <Input
                    type="number"
                    value={consumption}
                    onChange={(e) => setConsumption(e.target.value)}
                    placeholder="10"
                />
            </div>

            <Button onClick={calculate} className="w-full">
                {isEnglish ? "Calculate" : "Рассчитать"}
            </Button>

            {result !== null && (
                <p className="text-lg font-medium">
                    {t.result} <b>{result.toFixed(1)}</b>
                </p>
            )}
        </div>
    )
}
