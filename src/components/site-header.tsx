"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { DeepLink } from "@/components/deep-link"
import { SearchBar } from "@/components/search-bar"
import { FaInstagram, FaPinterest } from "react-icons/fa"
import navData from "@/types/nav"
import type { NavData, Locale, NavLink } from "@/types/nav"
import { useState } from "react"

export function SiteHeader() {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en")
    const locale: Locale = isEnglish ? "en" : "ru"
    const { links, social, header } = (navData as NavData)[locale]
    const [open, setOpen] = useState(false)

    const isActive = (href: string): boolean => {
        // Нормализуем pathname (убираем trailing slash)
        const normalizedPathname = pathname.endsWith("/") && pathname !== "/" && pathname !== "/en" 
            ? pathname.slice(0, -1) 
            : pathname
        
        // Точное совпадение для главной страницы
        if (href === "/" && !isEnglish) {
            return normalizedPathname === "/" || normalizedPathname === ""
        }
        if (href === "/en" && isEnglish) {
            return normalizedPathname === "/en" || normalizedPathname === "/en/"
        }
        
        // Точное совпадение
        if (normalizedPathname === href) return true
        
        // Для страниц, которые должны быть активны только при точном совпадении
        // (не активны на дочерних страницах)
        const exactMatchPages = [
            "/tags", "/bookmarks", "/calculators", "/about",
            "/en/tags", "/en/bookmarks", "/en/calculators", "/en/about"
        ]
        
        if (exactMatchPages.includes(href)) {
            // Если pathname начинается с href/, это дочерняя страница - не активна
            if (normalizedPathname.startsWith(`${href}/`)) {
                return false
            }
            return normalizedPathname === href
        }
        
        // Для страниц типа /tags/тренды, /tags/diy - активна при точном совпадении
        // или если pathname начинается с href/ (но не глубже)
        if (normalizedPathname.startsWith(`${href}/`)) {
            const afterHref = normalizedPathname.slice(href.length + 1)
            // Если после href/ нет больше слэшей, это прямая дочерняя страница - активна
            return !afterHref.includes("/")
        }
        
        return false
    }

    return (
        <header className="sticky top-0 z-50 bg-background/95 dark:bg-background/90 backdrop-blur-md border-b border-border/50 shadow-soft transition-all">
            <div className="container flex items-center justify-between h-16 px-4 sm:px-6">
                {/* 🏠 Логотип */}
                <Link
                    href={isEnglish ? "/en" : "/"}
                    className="inline-flex items-baseline px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-primary/10 via-accent/8 to-primary/10 dark:from-primary/15 dark:via-accent/12 dark:to-primary/15 text-foreground transition-smooth hover:scale-105 hover:from-primary/15 hover:via-accent/12 hover:to-primary/15 dark:hover:from-primary/20 dark:hover:via-accent/18 dark:hover:to-primary/20 shadow-soft"
                >
                    renohacks.com
                </Link>

                {/* 🌐 Языковой переключатель — всегда видим */}
                <div className="flex items-center gap-2 md:hidden">
                    <LanguageSwitcher />
                </div>

                {/* 🧭 Навигация — десктоп */}
                <nav className="hidden md:flex items-center gap-8">
                    {links.map((link: NavLink) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "transition-smooth font-medium text-sm tracking-wide",
                                isActive(link.href)
                                    ? "text-primary font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
                                    : "text-foreground/70 hover:text-foreground hover:text-primary/80"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* 🔘 Переключатели и соцсети — десктоп */}
                <div className="hidden md:flex items-center gap-3">
                    <SearchBar isEnglish={isEnglish} />
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                    <div className="flex items-center gap-4 pl-3 border-l border-border/50 ml-3">
                        <DeepLink
                            href={social.instagram}
                            ariaLabel="Instagram"
                            analyticsEvent="click_instagram_header"
                            location="header"
                            className="text-muted-foreground hover:text-[#E1306C] transition-all hover:scale-110"
                        >
                            <FaInstagram size={18} aria-hidden="true" />
                        </DeepLink>
                        <DeepLink
                            href={social.pinterest}
                            ariaLabel="Pinterest"
                            analyticsEvent="click_pinterest_header"
                            location="header"
                            className="text-muted-foreground hover:text-[#BD081C] transition-all hover:scale-110"
                        >
                            <FaPinterest size={18} aria-hidden="true" />
                        </DeepLink>
                    </div>
                </div>

                {/* 📱 Мобильное меню */}
                <div className="flex items-center md:hidden gap-2">
                    {/* 🔍 Поиск на мобильных */}
                    <SearchBar isEnglish={isEnglish} />
                    {/* 🎨 Переключатель темы — рядом с меню */}
                    <ThemeSwitcher />

                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                aria-label={open ? header.ariaMenuClose : header.ariaMenuOpen}
                            >
                                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="p-6 pr-16">
                            <SheetTitle className="sr-only">
                                {isEnglish ? "Navigation menu" : "Меню навигации"}
                            </SheetTitle>
                            <nav className="flex flex-col gap-4">
                                {links.map((link: NavLink) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            "text-lg font-semibold transition-colors hover:text-primary",
                                            isActive(link.href)
                                                ? "text-primary underline underline-offset-4"
                                                : "text-foreground/90 hover:text-foreground"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                <div className="flex items-center gap-4 mt-6">
                                    <DeepLink
                                        href={social.instagram}
                                        ariaLabel="Instagram"
                                        title="Instagram"
                                        className="text-muted-foreground hover:text-[#E1306C] transition-colors"
                                    >
                                        Instagram
                                    </DeepLink>
                                    <DeepLink
                                        href={social.pinterest}
                                        ariaLabel="Pinterest"
                                        title="Pinterest"
                                        className="text-muted-foreground hover:text-[#BD081C] transition-colors"
                                    >
                                        Pinterest
                                    </DeepLink>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
