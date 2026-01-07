"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X, Calculator, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { DeepLink } from "@/components/deep-link"
import { SearchBar } from "@/components/search-bar"
import { CalculatorsDropdown } from "@/components/calculators-dropdown"
import { FaInstagram, FaPinterest } from "react-icons/fa"
import navData from "@/types/nav"
import type { NavData, Locale, NavLink } from "@/types/nav"
import { useState } from "react"
import { Paintbrush, Wallpaper, Grid3X3, Wallet, Palette, Sparkles, ShoppingCart } from "lucide-react"

export function SiteHeader() {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en")
    const locale: Locale = isEnglish ? "en" : "ru"
    const { links, social, header } = (navData as NavData)[locale]
    const [open, setOpen] = useState(false)
    const [toolsOpen, setToolsOpen] = useState(false)

    const calculators = isEnglish
        ? [
              { href: "/en/calculators/paint", label: "Paint Calculator", icon: Paintbrush },
              { href: "/en/calculators/wallpaper", label: "Wallpaper Calculator", icon: Wallpaper },
              { href: "/en/calculators/tile", label: "Tile Calculator", icon: Grid3X3 },
              { href: "/en/calculators/budget", label: "Budget Planner", icon: Wallet },
              { href: "/en/calculators/color-palette", label: "Color Palette Generator", icon: Palette },
              { href: "/en/quiz/interior-style", label: "Interior Style Quiz", icon: Sparkles },
              { href: "/en/tools/materials-checklist", label: "Materials Checklist", icon: ShoppingCart },
          ]
        : [
              { href: "/calculators/paint", label: "Калькулятор краски", icon: Paintbrush },
              { href: "/calculators/wallpaper", label: "Калькулятор обоев", icon: Wallpaper },
              { href: "/calculators/tile", label: "Калькулятор плитки", icon: Grid3X3 },
              { href: "/calculators/budget", label: "Планировщик бюджета", icon: Wallet },
              { href: "/calculators/color-palette", label: "Генератор палитр", icon: Palette },
              { href: "/quiz/interior-style", label: "Квиз: стиль интерьера", icon: Sparkles },
              { href: "/tools/materials-checklist", label: "Чеклист покупок", icon: ShoppingCart },
          ]
    
    const allCalculatorsHref = isEnglish ? "/en/tools" : "/tools"

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
            "/tags", "/bookmarks", "/calculators", "/tools", "/about",
            "/en/tags", "/en/bookmarks", "/en/calculators", "/en/tools", "/en/about"
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

                {/* 🧭 Навигация — десктоп */}
                <nav className="hidden md:flex items-center gap-8">
                    {links.map((link: NavLink) => {
                        // Для калькуляторов используем выпадающее меню
                                    if (link.href === "/tools" || link.href === "/en/tools" || link.href === "/calculators" || link.href === "/en/calculators") {
                            return (
                                <CalculatorsDropdown
                                    key={link.href}
                                    isEnglish={isEnglish}
                                />
                            )
                        }
                        
                        return (
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
                        )
                    })}
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
                <div className="flex items-center md:hidden gap-1.5 ml-auto shrink-0">
                    {/* 🌐 Языковой переключатель */}
                    <div className="shrink-0">
                        <LanguageSwitcher />
                    </div>
                    {/* 🎨 Переключатель темы */}
                    <div className="shrink-0">
                        <ThemeSwitcher />
                    </div>
                    {/* 🍔 Бургер-меню - всегда видно и доступно */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden shrink-0 w-10 h-10 min-w-[40px] flex-shrink-0 relative z-10"
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
                                {/* 🔍 Поиск в мобильном меню */}
                                <div className="pb-2 border-b">
                                    <SearchBar isEnglish={isEnglish} />
                                </div>
                                
                                {links.map((link: NavLink) => {
                                    // Для инструментов создаем раскрывающийся список
                                    if (link.href === "/tools" || link.href === "/en/tools" || link.href === "/calculators" || link.href === "/en/calculators") {
                                        return (
                                            <div key={link.href} className="flex flex-col gap-2">
                                                <button
                                                    onClick={() => setToolsOpen(!toolsOpen)}
                                                    className={cn(
                                                        "flex items-center justify-between text-lg font-semibold transition-colors hover:text-primary",
                                                        isActive(link.href)
                                                            ? "text-primary"
                                                            : "text-foreground/90 hover:text-foreground"
                                                    )}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <Calculator className="w-5 h-5" />
                                                        {link.label}
                                                    </span>
                                                    {toolsOpen ? (
                                                        <ChevronDown className="w-4 h-4 transition-transform" />
                                                    ) : (
                                                        <ChevronRight className="w-4 h-4 transition-transform" />
                                                    )}
                                                </button>
                                                {toolsOpen && (
                                                    <div className="ml-7 flex flex-col gap-2 border-l border-border/50 pl-4">
                                                        {calculators.map((calc) => {
                                                            const Icon = calc.icon
                                                            return (
                                                                <Link
                                                                    key={calc.href}
                                                                    href={calc.href}
                                                                    onClick={() => setOpen(false)}
                                                                    className="flex items-start gap-3 py-1 transition-colors hover:text-primary text-foreground/80"
                                                                >
                                                                    <Icon className="w-4 h-4 text-primary mt-0.5" />
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="font-medium text-base">{calc.label}</div>
                                                                    </div>
                                                                </Link>
                                                            )
                                                        })}
                                                        <Link
                                                            href={allCalculatorsHref}
                                                            onClick={() => setOpen(false)}
                                                            className="flex items-center gap-2 text-base font-semibold text-primary mt-1"
                                                        >
                                                            <Calculator className="w-4 h-4" />
                                                            {isEnglish ? "View all calculators" : "Все калькуляторы"}
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    }
                                    
                                    return (
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
                                    )
                                })}

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
