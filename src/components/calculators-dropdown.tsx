"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calculator, Paintbrush, Wallpaper, Grid3X3, Wallet, Palette, ChevronDown, Sparkles, ShoppingCart, Thermometer, Wind } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface CalculatorLink {
    href: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    desc: string
}

const calculatorsRu: CalculatorLink[] = [
    {
        href: "/calculators/paint",
        label: "Калькулятор краски",
        icon: Paintbrush,
        desc: "Расчет расхода краски",
    },
    {
        href: "/calculators/wallpaper",
        label: "Калькулятор обоев",
        icon: Wallpaper,
        desc: "Количество рулонов",
    },
    {
        href: "/calculators/tile",
        label: "Калькулятор плитки",
        icon: Grid3X3,
        desc: "Расчет плитки и клея",
    },
    {
        href: "/calculators/underfloor-heating",
        label: "Калькулятор тёплого пола",
        icon: Thermometer,
        desc: "Мощность и расход",
    },
    {
        href: "/calculators/ventilation",
        label: "Калькулятор вентиляции",
        icon: Wind,
        desc: "Объём и кратность",
    },
    {
        href: "/calculators/budget",
        label: "Планировщик бюджета",
        icon: Wallet,
        desc: "Полная смета ремонта",
    },
    {
        href: "/calculators/color-palette",
        label: "Генератор палитр",
        icon: Palette,
        desc: "Цветовые схемы",
    },
    {
        href: "/quiz/interior-style",
        label: "Квиз: стиль интерьера",
        icon: Sparkles,
        desc: "Найдите свой стиль",
    },
    {
        href: "/tools/materials-checklist",
        label: "Чеклист покупок",
        icon: ShoppingCart,
        desc: "Список материалов",
    },
]

const calculatorsEn: CalculatorLink[] = [
    {
        href: "/en/calculators/paint",
        label: "Paint Calculator",
        icon: Paintbrush,
        desc: "Paint coverage estimate",
    },
    {
        href: "/en/calculators/wallpaper",
        label: "Wallpaper Calculator",
        icon: Wallpaper,
        desc: "Wallpaper rolls needed",
    },
    {
        href: "/en/calculators/tile",
        label: "Tile Calculator",
        icon: Grid3X3,
        desc: "Tiles and adhesive",
    },
    {
        href: "/en/calculators/underfloor-heating",
        label: "Underfloor Heating",
        icon: Thermometer,
        desc: "Power and energy",
    },
    {
        href: "/en/calculators/ventilation",
        label: "Ventilation",
        icon: Wind,
        desc: "Volume and ACH",
    },
    {
        href: "/en/calculators/budget",
        label: "Budget Planner",
        icon: Wallet,
        desc: "Full renovation budget",
    },
    {
        href: "/en/calculators/color-palette",
        label: "Color Palette Generator",
        icon: Palette,
        desc: "Color schemes",
    },
    {
        href: "/en/quiz/interior-style",
        label: "Interior Style Quiz",
        icon: Sparkles,
        desc: "Find your style",
    },
    {
        href: "/en/tools/materials-checklist",
        label: "Materials Checklist",
        icon: ShoppingCart,
        desc: "Purchase list",
    },
]

interface CalculatorsDropdownProps {
    isEnglish?: boolean
    className?: string
}

export function CalculatorsDropdown({ isEnglish = false, className }: CalculatorsDropdownProps) {
    const pathname = usePathname()
    const calculators = isEnglish ? calculatorsEn : calculatorsRu
    const allCalculatorsHref = isEnglish ? "/en/tools" : "/tools"
    const isActive = pathname.startsWith(allCalculatorsHref)

    return (
        <DropdownMenu>
            <div className="relative flex items-center">
                <Link
                    href={allCalculatorsHref}
                    className={cn(
                        "transition-smooth font-medium text-sm tracking-wide flex items-center gap-1 pr-1",
                        isActive
                            ? "text-primary font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
                            : "text-foreground/70 hover:text-foreground hover:text-primary/80",
                        className
                    )}
                >
                    <Calculator className="w-4 h-4" />
                    <span>{isEnglish ? "Tools" : "Инструменты"}</span>
                </Link>
                <DropdownMenuTrigger asChild>
                    <button
                        className={cn(
                            "ml-0.5 p-0.5 transition-smooth",
                            isActive
                                ? "text-primary"
                                : "text-foreground/70 hover:text-foreground hover:text-primary/80"
                        )}
                        aria-label={isEnglish ? "Open tools menu" : "Открыть меню инструментов"}
                    >
                        <ChevronDown className="w-3 h-3 opacity-70" />
                    </button>
                </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuLabel className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-primary" />
                    {isEnglish ? "Renovation Tools" : "Инструменты для ремонта"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {calculators.map((calc) => {
                    const Icon = calc.icon
                    return (
                        <DropdownMenuItem key={calc.href} asChild>
                            <Link
                                href={calc.href}
                                className="flex items-start gap-3 cursor-pointer"
                            >
                                <div className="mt-0.5">
                                    <Icon className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm">{calc.label}</div>
                                    <div className="text-xs text-muted-foreground">{calc.desc}</div>
                                </div>
                            </Link>
                        </DropdownMenuItem>
                    )
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link
                        href={allCalculatorsHref}
                        className="flex items-center gap-2 cursor-pointer font-semibold text-primary"
                    >
                        <Calculator className="w-4 h-4" />
                        {isEnglish ? "View all tools" : "Все инструменты"}
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

