"use client"

import { useState } from "react"
import { Check, X, Minus, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ComparisonRow {
    feature: string
    values: (string | number | boolean | null)[]
    highlight?: "best" | "worst" | "neutral"
}

interface ComparisonTableProps {
    title: string
    items: string[] // Названия сравниваемых элементов
    rows: ComparisonRow[]
    filters?: string[] // Опциональные фильтры
    isEnglish?: boolean
}

export function ComparisonTable({
    title,
    items,
    rows,
    filters,
    isEnglish = false,
}: ComparisonTableProps) {
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

    const filteredRows = selectedFilter
        ? rows.filter((row) => row.feature.toLowerCase().includes(selectedFilter.toLowerCase()))
        : rows

    const renderValue = (value: string | number | boolean | null, index: number) => {
        if (value === null || value === undefined) {
            return (
                <td key={index} className="px-4 py-3 text-center text-muted-foreground">
                    <Minus className="h-4 w-4 mx-auto" />
                </td>
            )
        }

        if (typeof value === "boolean") {
            return (
                <td
                    key={index}
                    className={cn(
                        "px-4 py-3 text-center",
                        value ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    )}
                >
                    {value ? (
                        <Check className="h-5 w-5 mx-auto" />
                    ) : (
                        <X className="h-5 w-5 mx-auto" />
                    )}
                </td>
            )
        }

        return (
            <td
                key={index}
                className={cn(
                    "px-4 py-3 text-center",
                    typeof value === "number" && "font-mono"
                )}
            >
                {value}
            </td>
        )
    }

    return (
        <div className="my-8 rounded-xl border bg-card shadow-soft overflow-hidden">
            {/* Заголовок */}
            <div className="p-6 border-b bg-muted/30">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                {filters && filters.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        <Button
                            variant={selectedFilter === null ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedFilter(null)}
                            className="text-xs"
                        >
                            <Filter className="h-3 w-3 mr-1" />
                            {isEnglish ? "All" : "Все"}
                        </Button>
                        {filters.map((filter) => (
                            <Button
                                key={filter}
                                variant={selectedFilter === filter ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedFilter(filter)}
                                className="text-xs"
                            >
                                {filter}
                            </Button>
                        ))}
                    </div>
                )}
            </div>

            {/* Таблица */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-muted/20">
                            <th className="px-4 py-3 text-left font-semibold sticky left-0 bg-muted/20 z-10">
                                {isEnglish ? "Feature" : "Характеристика"}
                            </th>
                            {items.map((item, index) => (
                                <th
                                    key={index}
                                    className="px-4 py-3 text-center font-semibold min-w-[120px]"
                                >
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRows.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={cn(
                                    "border-b transition-colors hover:bg-muted/30",
                                    row.highlight === "best" && "bg-green-50 dark:bg-green-950/20",
                                    row.highlight === "worst" && "bg-red-50 dark:bg-red-950/20"
                                )}
                            >
                                <td className="px-4 py-3 font-medium sticky left-0 bg-inherit z-10">
                                    {row.feature}
                                </td>
                                {row.values.map((value, index) => renderValue(value, index))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Легенда */}
            <div className="p-4 border-t bg-muted/20 text-xs text-muted-foreground flex items-center justify-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-100 dark:bg-green-900/30" />
                    <span>{isEnglish ? "Best option" : "Лучший вариант"}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-100 dark:bg-red-900/30" />
                    <span>{isEnglish ? "Not recommended" : "Не рекомендуется"}</span>
                </div>
            </div>
        </div>
    )
}

