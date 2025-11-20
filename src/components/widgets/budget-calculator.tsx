"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"
import calcDataJson from "@/messages/calc.json"
import type { Locale, CalcData, BudgetCalcDict, ButtonsDict } from "@/types/calc"

const calcData = calcDataJson as CalcData

type RenovationType = "cosmetic" | "standard" | "premium"

// Средние цены за м² (в рублях)
const PRICES = {
    cosmetic: {
        materials: 3000,
        work: 2500,
    },
    standard: {
        materials: 6000,
        work: 5000,
    },
    premium: {
        materials: 12000,
        work: 8000,
    },
}

export function BudgetCalculator() {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en") || pathname.endsWith("-en")
    const locale: Locale = isEnglish ? "en" : "ru"

    const t: BudgetCalcDict = calcData[locale].calc.budget
    const b: ButtonsDict = calcData[locale].calc.buttons

    const [area, setArea] = useState("")
    const [type, setType] = useState<RenovationType>("standard")
    const [result, setResult] = useState<{
        materials: number
        work: number
        total: number
    } | null>(null)

    const calculate = () => {
        const a = parseFloat(area.replace(",", "."))
        if (!a || a <= 0) return

        const prices = PRICES[type]
        const materials = a * prices.materials
        const work = a * prices.work
        const total = materials + work

        setResult({ materials, work, total })
    }

    return (
        <div className="max-w-md mx-auto border rounded-lg p-4 shadow-sm space-y-4 bg-card">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Calculator className="w-5 h-5 text-primary" /> {t.title}
            </h2>

            <Input
                placeholder={t.area}
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
            />

            <div className="space-y-2">
                <label className="text-sm font-medium">{t.type}</label>
                <div className="flex gap-2">
                    <Button
                        variant={type === "cosmetic" ? "default" : "outline"}
                        onClick={() => setType("cosmetic")}
                        className="flex-1"
                    >
                        {t.cosmetic}
                    </Button>
                    <Button
                        variant={type === "standard" ? "default" : "outline"}
                        onClick={() => setType("standard")}
                        className="flex-1"
                    >
                        {t.standard}
                    </Button>
                    <Button
                        variant={type === "premium" ? "default" : "outline"}
                        onClick={() => setType("premium")}
                        className="flex-1"
                    >
                        {t.premium}
                    </Button>
                </div>
            </div>

            <Button onClick={calculate} className="w-full">
                {b.calculate}
            </Button>

            {result !== null && (
                <div className="mt-4 p-4 rounded-lg bg-muted space-y-2">
                    <p className="text-sm font-medium">{t.result}</p>
                    <div className="space-y-1 text-sm">
                        <p>
                            {t.materials}{" "}
                            <b className="text-lg">
                                {Math.round(result.materials).toLocaleString()} ₽
                            </b>
                        </p>
                        <p>
                            {t.work}{" "}
                            <b className="text-lg">
                                {Math.round(result.work).toLocaleString()} ₽
                            </b>
                        </p>
                        <div className="pt-2 border-t">
                            <p className="text-base font-semibold">
                                {t.total}{" "}
                                <b className="text-xl text-primary">
                                    {Math.round(result.total).toLocaleString()} ₽
                                </b>
                            </p>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        {isEnglish
                            ? "Add 15-20% reserve for unexpected expenses."
                            : "Добавьте 15-20% резерва на непредвиденные расходы."}
                    </p>
                </div>
            )}
        </div>
    )
}

