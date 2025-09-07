"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun, Hammer, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SiteHeader() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => setMounted(true), [])

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Логотип */}
                <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                    <Hammer className="h-6 w-6 text-primary" />
                    <span>PRO ремонт</span>
                </Link>

                {/* Навигация (десктоп) */}
                <nav className="hidden md:flex gap-6">
                    <Link href="/" className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition">Главная</Link>
                    <Link href="/tags/novinki" className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition">Новинки</Link>
                    <Link href="/tags/diy" className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition">DIY</Link>
                    <Link href="/tags/smety" className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition">Сметы</Link>
                    <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition">О проекте</Link>
                </nav>

                {/* Правая часть */}
                <div className="flex items-center gap-2">
                    {/* Переключатель темы */}
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Toggle theme"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        {mounted && (
                            <>
                                <Sun className={cn("h-5 w-5", theme === "dark" && "hidden")} />
                                <Moon className={cn("h-5 w-5", theme !== "dark" && "hidden")} />
                            </>
                        )}
                    </Button>

                    {/* Бургер (мобилка) */}
                    <button
                        className="md:hidden p-2 rounded hover:bg-muted"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Мобильное меню */}
            {isOpen && (
                <div className="absolute top-16 left-0 right-0 border-t bg-background/95 backdrop-blur md:hidden animate-in slide-in-from-top duration-300">
                    <nav className="flex flex-col gap-4 p-4">
                        <Link href="/" onClick={() => setIsOpen(false)}>Главная</Link>
                        <Link href="/tags/novinki" onClick={() => setIsOpen(false)}>Новинки</Link>
                        <Link href="/tags/diy" onClick={() => setIsOpen(false)}>DIY</Link>
                        <Link href="/tags/smety" onClick={() => setIsOpen(false)}>Сметы</Link>
                        <Link href="/about" onClick={() => setIsOpen(false)}>О проекте</Link>
                    </nav>
                </div>
            )}
        </header>
    )
}
