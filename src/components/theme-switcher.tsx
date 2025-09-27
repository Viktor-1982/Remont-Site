"use client"

import { useTheme } from "next-themes"
import { Sun, Moon, Monitor, Palette, Contrast } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeSwitcher() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // 🔹 Чтобы избежать "hydration mismatch"
    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" aria-label="Переключить тему">
                <Sun className="h-5 w-5" />
            </Button>
        )
    }

    // Определяем иконку текущей темы
    const getIcon = () => {
        switch (theme ?? resolvedTheme) {
            case "light":
                return <Sun className="h-5 w-5" />
            case "dark":
                return <Moon className="h-5 w-5" />
            case "sepia":
                return <Palette className="h-5 w-5" />
            case "contrast":
                return <Contrast className="h-5 w-5" />
            default:
                return <Monitor className="h-5 w-5" />
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Переключить тему">
                    {getIcon()}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" /> Светлая
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" /> Тёмная
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Monitor className="mr-2 h-4 w-4" /> Системная
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("sepia")}>
                    <Palette className="mr-2 h-4 w-4" /> Сепия
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("contrast")}>
                    <Contrast className="mr-2 h-4 w-4" /> Контрастная
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
