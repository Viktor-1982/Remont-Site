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

export function ThemeSwitcher() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Переключить тему">
                    <Sun className="h-5 w-5 rotate-0 scale-100 dark:hidden" />
                    <Moon className="h-5 w-5 hidden dark:block" />
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
