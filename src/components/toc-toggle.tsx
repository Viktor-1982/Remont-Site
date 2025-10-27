"use client"

import { ListOrdered, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface TOCToggleProps {
    open: boolean
    onToggle: () => void
    label: string
    ariaLabel: string
}

export function TOCToggle({ open, onToggle, label, ariaLabel }: TOCToggleProps) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={ariaLabel}
            aria-expanded={open}
            className="fixed top-20 right-4 z-50 flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 shadow-md transition hover:scale-105 lg:hidden"
        >
      <span className="relative h-5 w-5">
        <X className={cn("absolute h-5 w-5 transition-opacity", open ? "opacity-100" : "opacity-0")} />
        <ListOrdered className={cn("absolute h-5 w-5 transition-opacity", open ? "opacity-0" : "opacity-100")} />
      </span>
            <span className="text-sm font-semibold text-primary-foreground">{label}</span>
        </button>
    )
}
