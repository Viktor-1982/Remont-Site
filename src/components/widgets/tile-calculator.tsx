"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function TileCalculator() {
    const [area, setArea] = useState("")
    const [tileSize, setTileSize] = useState("")
    const [result, setResult] = useState<number | null>(null)

    const handleCalc = () => {
        const m2 = parseFloat(area)
        const tile = parseFloat(tileSize)
        if (!isNaN(m2) && !isNaN(tile) && tile > 0) {
            // площадь плитки в м² (например 30x30см = 0.09 м²)
            const tileArea = (tile * tile) / 10000
            setResult(Math.ceil(m2 / tileArea * 1.05)) // +5% запас
        }
    }

    return (
        <div className="space-y-4">
            <Input
                type="number"
                placeholder="Площадь поверхности (м²)"
                value={area}
                onChange={(e) => setArea(e.target.value)}
            />
            <Input
                type="number"
                placeholder="Размер плитки (см, например 30 = 30x30)"
                value={tileSize}
                onChange={(e) => setTileSize(e.target.value)}
            />
            <Button onClick={handleCalc}>Рассчитать</Button>
            {result !== null && (
                <p className="text-lg font-semibold">
                    Нужно примерно {result} плиток
                </p>
            )}
        </div>
    )
}
