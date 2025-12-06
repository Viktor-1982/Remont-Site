"use client"

import { useState, useEffect } from "react"
import { Check, Square, Download, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChecklistItem {
    id: string
    text: string
    checked: boolean
}

interface ChecklistProps {
    title: string
    items: string[]
    storageKey?: string
    isEnglish?: boolean
}

export function Checklist({ title, items, storageKey, isEnglish = false }: ChecklistProps) {
    const defaultItems: ChecklistItem[] = items.map((text, index) => ({
        id: `item-${index}`,
        text,
        checked: false,
    }))

    const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(defaultItems)

    // Загружаем сохраненное состояние
    useEffect(() => {
        if (!storageKey) return
        const saved = localStorage.getItem(`checklist-${storageKey}`)
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                setChecklistItems(parsed)
            } catch {
                // Игнорируем ошибки
            }
        }
    }, [storageKey])

    // Сохраняем состояние
    const saveState = (newItems: ChecklistItem[]) => {
        if (storageKey) {
            localStorage.setItem(`checklist-${storageKey}`, JSON.stringify(newItems))
        }
    }

    const toggleItem = (id: string) => {
        const newItems = checklistItems.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        )
        setChecklistItems(newItems)
        saveState(newItems)
    }

    const resetChecklist = () => {
        const resetItems = defaultItems.map((item) => ({ ...item, checked: false }))
        setChecklistItems(resetItems)
        saveState(resetItems)
    }

    const exportToPDF = () => {
        const checkedCount = checklistItems.filter((item) => item.checked).length
        const totalCount = checklistItems.length
        
        const content = `
${title}

${checklistItems
    .map((item, index) => `${item.checked ? "✓" : "☐"} ${index + 1}. ${item.text}`)
    .join("\n")}

Прогресс: ${checkedCount} / ${totalCount} (${Math.round((checkedCount / totalCount) * 100)}%)

Источник: renohacks.com
        `.trim()

        const blob = new Blob([content], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${title.replace(/\s+/g, "-")}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const checkedCount = checklistItems.filter((item) => item.checked).length
    const progress = (checkedCount / checklistItems.length) * 100

    return (
        <div className="my-8 rounded-xl border bg-card p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold">{title}</h3>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetChecklist}
                        className="text-xs"
                        aria-label={isEnglish ? "Reset" : "Сбросить"}
                    >
                        <Trash2 className="h-4 w-4 mr-1" />
                        {isEnglish ? "Reset" : "Сбросить"}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={exportToPDF}
                        className="text-xs"
                        aria-label={isEnglish ? "Export" : "Экспорт"}
                    >
                        <Download className="h-4 w-4 mr-1" />
                        {isEnglish ? "Export" : "Экспорт"}
                    </Button>
                </div>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>
                        {isEnglish ? "Progress" : "Прогресс"}: {checkedCount} / {checklistItems.length}
                    </span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Checklist items */}
            <ul className="space-y-3">
                {checklistItems.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => toggleItem(item.id)}
                            className={cn(
                                "flex items-start gap-3 w-full text-left p-3 rounded-lg transition-all",
                                "hover:bg-accent/50",
                                item.checked && "bg-primary/5"
                            )}
                        >
                            <div
                                className={cn(
                                    "mt-0.5 flex h-5 w-5 items-center justify-center rounded border-2 transition-all",
                                    item.checked
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-muted-foreground/30"
                                )}
                            >
                                {item.checked && <Check className="h-3 w-3" />}
                            </div>
                            <span
                                className={cn(
                                    "flex-1",
                                    item.checked && "line-through text-muted-foreground"
                                )}
                            >
                                {item.text}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

