"use client"

import { ListOrdered, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface TOCToggleProps {
    open: boolean
    onToggle: () => void
}

export function TOCToggle({ open, onToggle }: TOCToggleProps) {
    return (
        <button
            onClick={onToggle}
            aria-label={open ? "Скрыть оглавление" : "Открыть оглавление"}
            aria-expanded={open}
            className="fixed top-20 right-4 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-white shadow-md transition hover:scale-105 lg:hidden"
        >
            {/* Иконки */}
            <span className="relative h-5 w-5">
        <X
            className={cn(
                "absolute h-5 w-5 transition-opacity",
                open ? "opacity-100" : "opacity-0"
            )}
        />
        <ListOrdered
            className={cn(
                "absolute h-5 w-5 transition-opacity",
                open ? "opacity-0" : "opacity-100"
            )}
        />
      </span>

            {/* Текст */}
            <span className="text-sm font-semibold">
        {open ? "Скрыть" : "Оглавление"}
      </span>
        </button>
    )
}
