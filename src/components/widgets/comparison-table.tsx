"use client"

import { useState } from "react"
import { Check, X, Minus, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
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
    columnHighlights?: ("best" | "worst" | "neutral" | null)[]
    isEnglish?: boolean
}

export function ComparisonTable({
    title,
    items,
    rows,
    filters,
    columnHighlights,
    isEnglish = false,
}: ComparisonTableProps) {
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

    const filteredRows = selectedFilter
        ? rows.filter((row) => row.feature.toLowerCase().includes(selectedFilter.toLowerCase()))
        : rows

    // Автоматическое определение подсветки для парных сравнений "Устарело vs Новый стандарт"
    const effectiveColHighlights =
        columnHighlights ||
        (items.length === 2 && rows.some((r) => r.highlight === "best")
            ? ["worst" as const, "best" as const]
            : undefined)

    const renderValue = (
        value: string | number | boolean | null,
        index: number,
        rowHighlight?: "best" | "worst" | "neutral"
    ) => {
        const colHighlight = effectiveColHighlights?.[index]
        const isBest = colHighlight === "best" || (rowHighlight === "best" && !effectiveColHighlights)
        const isWorst = colHighlight === "worst" || (rowHighlight === "worst" && !effectiveColHighlights)

        const cellHighlightClass = cn(
            isBest && "bg-green-50/50 dark:bg-green-950/20 text-foreground font-medium",
            isWorst && "bg-red-50/30 dark:bg-red-950/15 text-muted-foreground"
        )

        if (value === null || value === undefined) {
            return (
                <td
                    key={index}
                    className={cn(
                        "px-3 sm:px-4 py-3 text-center text-muted-foreground min-w-[140px] sm:min-w-[180px]",
                        cellHighlightClass
                    )}
                >
                    <Minus className="h-4 w-4 mx-auto" />
                </td>
            )
        }

        if (typeof value === "boolean") {
            return (
                <td
                    key={index}
                    className={cn(
                        "px-3 sm:px-4 py-3 text-center min-w-[140px] sm:min-w-[180px]",
                        cellHighlightClass,
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
                    "px-3 sm:px-4 py-3 text-center text-xs sm:text-sm min-w-[140px] sm:min-w-[180px]",
                    cellHighlightClass,
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
            <div className="p-4 sm:p-6 border-b bg-muted/30">
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{title}</h3>
                {filters && filters.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
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

            {/* Таблица с горизонтальным скроллом */}
            <div className="overflow-x-auto overscroll-x-contain touch-pan-x">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b bg-muted/40">
                            <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold sticky left-0 z-20 bg-muted border-r border-border shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] min-w-[130px] sm:min-w-[170px]">
                                {isEnglish ? "Feature" : "Характеристика"}
                            </th>
                            {items.map((item, index) => {
                                const colHighlight = effectiveColHighlights?.[index]
                                return (
                                    <th
                                        key={index}
                                        className={cn(
                                            "px-3 sm:px-4 py-3 text-center text-xs sm:text-sm font-semibold min-w-[140px] sm:min-w-[180px]",
                                            colHighlight === "best" && "bg-green-100/50 dark:bg-green-950/40",
                                            colHighlight === "worst" && "bg-red-100/40 dark:bg-red-950/30",
                                            !colHighlight && "bg-muted/40"
                                        )}
                                    >
                                        <div className="flex flex-col items-center gap-1.5">
                                            <span>{item}</span>
                                            {colHighlight === "best" && (
                                                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/60 text-green-800 dark:text-green-300 font-medium border border-green-300 dark:border-green-800">
                                                    <Check className="w-3 h-3" />
                                                    {isEnglish ? "Best choice" : "Лучший вариант"}
                                                </span>
                                            )}
                                            {colHighlight === "worst" && (
                                                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-300 font-medium border border-red-300 dark:border-red-800">
                                                    <X className="w-3 h-3" />
                                                    {isEnglish ? "Not recommended" : "Не рекомендуется"}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRows.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="border-b transition-colors hover:bg-muted/30"
                            >
                                <td className="px-3 sm:px-4 py-3 font-medium text-xs sm:text-sm sticky left-0 z-10 bg-card border-r border-border shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] min-w-[130px] sm:min-w-[170px]">
                                    {row.feature}
                                </td>
                                {row.values.map((value, index) =>
                                    renderValue(value, index, row.highlight)
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Легенда */}
            <div className="p-3 sm:p-4 border-t bg-muted/20 text-xs text-muted-foreground flex items-center justify-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-800" />
                    <span>{isEnglish ? "Best option" : "Лучший вариант"}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800" />
                    <span>{isEnglish ? "Not recommended" : "Не рекомендуется"}</span>
                </div>
            </div>
        </div>
    )
}
