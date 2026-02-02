"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wind, Gauge, CheckCircle2 } from "lucide-react"
import { computeVentilation } from "@/lib/calculations"

type RoomType = "living" | "bedroom" | "kitchen" | "bathroom" | "office" | "hallway"

const roomPresets: Array<{
    value: RoomType
    labelRu: string
    labelEn: string
    achMin: number
    achMax: number
}> = [
    { value: "living", labelRu: "Гостиная", labelEn: "Living room", achMin: 3, achMax: 4 },
    { value: "bedroom", labelRu: "Спальня", labelEn: "Bedroom", achMin: 3, achMax: 4 },
    { value: "kitchen", labelRu: "Кухня", labelEn: "Kitchen", achMin: 6, achMax: 10 },
    { value: "bathroom", labelRu: "Ванная", labelEn: "Bathroom", achMin: 6, achMax: 8 },
    { value: "office", labelRu: "Кабинет", labelEn: "Home office", achMin: 3, achMax: 5 },
    { value: "hallway", labelRu: "Коридор", labelEn: "Hallway", achMin: 2, achMax: 3 },
]

export function VentilationCalculator({ isEnglish = false }: { isEnglish?: boolean }) {
    const pathname = usePathname()
    const isEn = isEnglish || pathname.startsWith("/en")

    const [length, setLength] = useState("")
    const [width, setWidth] = useState("")
    const [height, setHeight] = useState("2.7")
    const [roomType, setRoomType] = useState<RoomType>("living")
    const [ach, setAch] = useState("3")
    const [reserve, setReserve] = useState("10")
    const [result, setResult] = useState<ReturnType<typeof computeVentilation> | null>(null)

    const preset = roomPresets.find((item) => item.value === roomType)

    const calculate = () => {
        const l = parseFloat(length.replace(",", "."))
        const w = parseFloat(width.replace(",", "."))
        const h = parseFloat(height.replace(",", "."))
        const achNum = parseFloat(ach.replace(",", "."))
        const reserveNum = parseFloat(reserve.replace(",", "."))

        const res = computeVentilation({
            length: l,
            width: w,
            height: h,
            airChangesPerHour: achNum,
            reservePercent: reserveNum,
        })

        if (!res) return
        setResult(res)
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-primary/10 p-2 text-primary">
                        <Wind className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">
                            {isEn ? "Ventilation calculator" : "Калькулятор вентиляции"}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            {isEn
                                ? "Uses the real formula: airflow = volume × air changes per hour (ACH)."
                                : "Реальная формула: расход = объём × кратность воздухообмена (ACH)."}
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 mt-6 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label>{isEn ? "Length (m)" : "Длина (м)"}</Label>
                        <Input value={length} onChange={(e) => setLength(e.target.value)} placeholder="5" />
                    </div>
                    <div className="space-y-2">
                        <Label>{isEn ? "Width (m)" : "Ширина (м)"}</Label>
                        <Input value={width} onChange={(e) => setWidth(e.target.value)} placeholder="4" />
                    </div>
                    <div className="space-y-2">
                        <Label>{isEn ? "Ceiling height (m)" : "Высота потолка (м)"}</Label>
                        <Input value={height} onChange={(e) => setHeight(e.target.value)} placeholder="2.7" />
                    </div>
                </div>

                <div className="grid gap-4 mt-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>{isEn ? "Room type" : "Тип помещения"}</Label>
                        <div className="grid gap-2 sm:grid-cols-2">
                            {roomPresets.map((item) => (
                                <button
                                    key={item.value}
                                    type="button"
                                    onClick={() => {
                                        setRoomType(item.value)
                                        setAch(((item.achMin + item.achMax) / 2).toFixed(1))
                                    }}
                                    className={`rounded-xl border-2 px-3 py-2 text-sm transition ${
                                        roomType === item.value
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-border/40 bg-card hover:border-primary/30"
                                    }`}
                                >
                                    {isEn ? item.labelEn : item.labelRu}
                                </button>
                            ))}
                        </div>
                        {preset && (
                            <p className="text-xs text-muted-foreground">
                                {isEn
                                    ? `Typical ACH: ${preset.achMin}–${preset.achMax}`
                                    : `Типичная кратность: ${preset.achMin}–${preset.achMax}`}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label>{isEn ? "Air changes per hour (ACH)" : "Кратность воздухообмена (ACH)"}</Label>
                        <Input value={ach} onChange={(e) => setAch(e.target.value)} placeholder="3.5" />
                        <Label className="pt-2">{isEn ? "Reserve (%)" : "Запас (%)"}</Label>
                        <Input value={reserve} onChange={(e) => setReserve(e.target.value)} placeholder="10" />
                    </div>
                </div>

                <Button onClick={calculate} className="mt-5 w-full" size="lg">
                    {isEn ? "Calculate airflow" : "Рассчитать расход"}
                </Button>
            </div>

            {result && (
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-border/60 bg-card p-4">
                        <div className="text-xs uppercase text-muted-foreground">
                            {isEn ? "Room volume" : "Объём помещения"}
                        </div>
                        <div className="text-2xl font-semibold mt-2">
                            {result.volumeM3.toFixed(1)} м³
                        </div>
                    </div>
                    <div className="rounded-2xl border border-border/60 bg-card p-4">
                        <div className="text-xs uppercase text-muted-foreground">
                            {isEn ? "Airflow" : "Расход воздуха"}
                        </div>
                        <div className="text-2xl font-semibold mt-2">
                            {result.flowM3h.toFixed(0)} м³/ч
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                            {result.flowLs.toFixed(1)} л/с
                        </div>
                    </div>
                    <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
                        <div className="flex items-center gap-2 text-xs uppercase text-primary">
                            <Gauge className="h-4 w-4" />
                            {isEn ? "With reserve" : "С учётом запаса"}
                        </div>
                        <div className="text-2xl font-semibold mt-2 text-primary">
                            {result.flowWithReserveM3h.toFixed(0)} м³/ч
                        </div>
                    </div>
                </div>
            )}

            <div className="rounded-2xl border border-border/60 bg-card p-5 text-sm text-muted-foreground">
                <div className="flex items-start gap-2 text-foreground font-medium">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    {isEn ? "Simple instruction" : "Простая инструкция"}
                </div>
                <ol className="list-decimal ml-5 mt-2 space-y-1">
                    <li>{isEn ? "Enter room dimensions." : "Введите размеры помещения."}</li>
                    <li>
                        {isEn
                            ? "Choose room type to auto-fill a typical ACH."
                            : "Выберите тип помещения — кратность подставится автоматически."}
                    </li>
                    <li>
                        {isEn
                            ? "Adjust ACH if needed and set reserve."
                            : "При необходимости скорректируйте ACH и добавьте запас."}
                    </li>
                    <li>
                        {isEn
                            ? "Get airflow in m³/h and L/s for fan or duct selection."
                            : "Получите расход в м³/ч и л/с для подбора вентиляции."}
                    </li>
                </ol>
            </div>
        </div>
    )
}

