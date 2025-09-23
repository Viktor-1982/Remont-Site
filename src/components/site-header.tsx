"use client"

import Link from "next/link"
import { Hammer, Menu, X, Instagram } from "lucide-react"
import { FaPinterest } from "react-icons/fa"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ThemeSwitcher } from "@/components/theme-switcher"

export function SiteHeader() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const links = [
        { href: "/", label: "Главная" },
        { href: "/tags/novinki", label: "Новинки" },
        { href: "/tags/diy", label: "DIY" },
        { href: "/tags/smety", label: "Сметы" },
        { href: "/about", label: "О проекте" },
        { href: "/calculators", label: "Калькуляторы" },
    ]

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(href + "/")

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full border-b shadow-sm transition-all duration-300",
                "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
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
                    <span>renohacks.com</span>
                </Link>

                {/* Навигация (десктоп) */}
                <nav aria-label="Main navigation" className="hidden md:flex gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            aria-current={isActive(link.href) ? "page" : undefined}
                            className={cn(
                                "text-sm hover:text-foreground hover:underline underline-offset-4 transition",
                                isActive(link.href)
                                    ? "text-primary font-semibold"
                                    : "text-muted-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Правая часть */}
                <div className="flex items-center gap-3">
                    {/* Соцсети (десктоп) */}
                    <div className="hidden sm:flex items-center gap-3">
                        <Link
                            href="https://instagram.com/yourchannel"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="text-muted-foreground hover:text-[#E1306C] transition"
                        >
                            <Instagram className="h-5 w-5" />
                        </Link>
                        <Link
                            href="https://pinterest.com/yourchannel"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Pinterest"
                            className="text-muted-foreground hover:text-[#BD081C] transition"
                        >
                            <FaPinterest className="h-5 w-5" />
                        </Link>
                    </div>

                    {/* Переключатель темы */}
                    <ThemeSwitcher />

                    {/* Бургер (мобилка) */}
                    <button
                        className="md:hidden p-2 rounded hover:bg-muted transition"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Мобильное меню */}
            <div
                className={cn(
                    "absolute top-16 left-0 right-0 border-t bg-background/95 backdrop-blur md:hidden shadow-lg transition-all duration-300 overflow-hidden",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <nav aria-label="Mobile navigation" className="flex flex-col divide-y">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            aria-current={isActive(link.href) ? "page" : undefined}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "px-4 py-3 text-base transition hover:bg-muted",
                                isActive(link.href)
                                    ? "text-primary font-semibold"
                                    : "text-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Соцсети (мобилка) */}
                    <div className="flex gap-4 px-4 py-3">
                        <Link
                            href="https://instagram.com/yourchannel"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="text-muted-foreground hover:text-[#E1306C] transition"
                        >
                            <Instagram className="h-6 w-6" />
                        </Link>
                        <Link
                            href="https://pinterest.com/yourchannel"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Pinterest"
                            className="text-muted-foreground hover:text-[#BD081C] transition"
                        >
                            <FaPinterest className="h-6 w-6" />
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}
