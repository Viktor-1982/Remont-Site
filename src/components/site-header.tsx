"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun, Hammer, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function SiteHeader() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => setMounted(true), [])

    const links = [
        { href: "/", label: "Главная" },
        { href: "/tags/novinki", label: "Новинки" },
        { href: "/tags/diy", label: "DIY" },
        { href: "/tags/smety", label: "Сметы" },
        { href: "/about", label: "О проекте" },
    ]

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full border-b shadow-sm transition-all duration-300",
                // ✨ Glass effect с fallback
                "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
                // для Android оптимизация
                "will-change-transform"
            )}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Логотип */}
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-lg hover:scale-105 transition-transform"
                >
                    <Hammer className="h-6 w-6 text-primary" />
                    <span>PRO ремонт</span>
                </Link>

                {/* Навигация (десктоп) */}
                <nav className="hidden md:flex gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm hover:text-foreground hover:underline underline-offset-4 transition",
                                pathname === link.href
                                    ? "text-primary font-semibold"
                                    : "text-muted-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Правая часть */}
                <div className="flex items-center gap-2">
                    {/* Переключатель темы */}
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Toggle theme"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="hover:scale-110 transition-transform"
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
                        className="md:hidden p-2 rounded hover:bg-muted transition"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Мобильное меню */}
            {isOpen && (
                <div className="absolute top-16 left-0 right-0 border-t bg-background/95 backdrop-blur md:hidden animate-in slide-in-from-top duration-300 shadow-lg">
                    <nav className="flex flex-col gap-4 p-4">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    pathname === link.href
                                        ? "text-primary font-semibold"
                                        : "text-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    )
}
