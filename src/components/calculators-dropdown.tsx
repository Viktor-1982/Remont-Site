"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Calculator,
    ChevronDown,
    Grid3X3,
    Layers,
    Lightbulb,
    Paintbrush,
    Palette,
    Ruler,
    ShoppingCart,
    Sparkles,
    Thermometer,
    Wallet,
    Wallpaper,
    Wind,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { getToolShortcuts } from "@/dictionaries/tool-shortcuts"
import type { ToolsLocale } from "@/dictionaries/tools"

const toolIcons = {
    paintbrush: Paintbrush,
    wallpaper: Wallpaper,
    grid3x3: Grid3X3,
    layers: Layers,
    ruler: Ruler,
    thermometer: Thermometer,
    wind: Wind,
    lightbulb: Lightbulb,
    wallet: Wallet,
    palette: Palette,
    sparkles: Sparkles,
    shoppingCart: ShoppingCart,
} as const

interface CalculatorsDropdownProps {
    isEnglish?: boolean
    className?: string
}

export function CalculatorsDropdown({ isEnglish = false, className }: CalculatorsDropdownProps) {
    const pathname = usePathname()
    const locale: ToolsLocale = isEnglish ? "en" : "ru"
    const calculators = getToolShortcuts(locale)
    const allCalculatorsHref = isEnglish ? "/tools" : "/ru/tools"
    const isActive = pathname.startsWith(allCalculatorsHref)

    return (
        <DropdownMenu>
            <div className="relative flex items-center">
                <Link
                    href={allCalculatorsHref}
                    className={cn(
                        "group flex items-center gap-1.5 py-1 pr-1 text-base font-medium tracking-normal transition-smooth",
                        isActive
                            ? "relative font-semibold text-primary after:absolute after:-bottom-1 after:left-0 after:h-[2.5px] after:w-full after:rounded-full after:bg-primary"
                            : "text-foreground/85 hover:text-primary dark:text-foreground/90",
                        className
                    )}
                >
                    <Calculator className={cn("h-[18px] w-[18px] transition-colors", isActive ? "text-primary" : "text-primary/80 group-hover:text-primary")} />
                    <span>{isEnglish ? "Tools" : "Инструменты"}</span>
                </Link>
                <DropdownMenuTrigger asChild>
                    <button
                        className={cn(
                            "ml-0.5 p-1 transition-smooth rounded-md hover:bg-muted/60",
                            isActive ? "text-primary" : "text-foreground/80 hover:text-primary dark:text-foreground/90"
                        )}
                        aria-label={isEnglish ? "Open tools menu" : "Открыть меню инструментов"}
                    >
                        <ChevronDown className="h-4 w-4 opacity-70 transition-transform hover:opacity-100" />
                    </button>
                </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent
                align="start"
                className="w-72 max-h-[min(30rem,var(--radix-dropdown-menu-content-available-height))] overflow-hidden"
            >
                <DropdownMenuLabel className="flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-primary" />
                    {isEnglish ? "Renovation Tools" : "Инструменты для ремонта"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="-mr-1 max-h-[min(22rem,var(--radix-dropdown-menu-content-available-height))] overflow-y-auto pr-1">
                    {calculators.map((calc) => {
                        const Icon = toolIcons[calc.icon]
                        return (
                            <DropdownMenuItem key={calc.href} asChild>
                                <Link href={calc.href} className="flex cursor-pointer items-start gap-3">
                                    <div className="mt-0.5">
                                        <Icon className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="text-sm font-medium">{calc.label}</div>
                                        <div className="text-xs text-muted-foreground">{calc.desc}</div>
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                        )
                    })}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={allCalculatorsHref} className="flex cursor-pointer items-center gap-2 font-semibold text-primary">
                        <Calculator className="h-4 w-4" />
                        {isEnglish ? "View all tools" : "Все инструменты"}
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
