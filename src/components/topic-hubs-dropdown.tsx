"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bath, ChefHat, ChevronDown, Lightbulb, Sparkles } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getTopicHubsDictionary, type TopicHubsLocale } from "@/dictionaries/topic-hubs"
import { cn } from "@/lib/utils"

const topicHubIcons = {
    bath: Bath,
    lightbulb: Lightbulb,
    chefHat: ChefHat,
} as const

interface TopicHubsDropdownProps {
    isEnglish?: boolean
    className?: string
}

export function TopicHubsDropdown({ isEnglish = false, className }: TopicHubsDropdownProps) {
    const pathname = usePathname()
    const locale: TopicHubsLocale = isEnglish ? "en" : "ru"
    const dictionary = getTopicHubsDictionary(locale)
    const isActive = dictionary.items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))

    return (
        <DropdownMenu>
            <div className="relative flex items-center">
                <DropdownMenuTrigger asChild>
                    <button
                        className={cn(
                            "transition-smooth flex items-center gap-1 pr-1 text-sm font-medium tracking-wide",
                            isActive
                                ? "relative font-semibold text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-primary"
                                : "text-foreground/70 hover:text-foreground hover:text-primary/80",
                            className
                        )}
                        aria-label={dictionary.ariaOpenMenu}
                    >
                        <Sparkles className="h-4 w-4" />
                        <span>{dictionary.navLabel}</span>
                        <ChevronDown className="h-3 w-3 opacity-70" />
                    </button>
                </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent align="start" className="w-80">
                <DropdownMenuLabel className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    {dictionary.menuLabel}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {dictionary.items.map((item) => {
                    const Icon = topicHubIcons[item.icon]

                    return (
                        <DropdownMenuItem key={item.href} asChild>
                            <Link href={item.href} className="flex cursor-pointer items-start gap-3">
                                <div className="mt-0.5">
                                    <Icon className={cn("h-4 w-4", item.iconClass)} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-sm font-medium">{item.label}</div>
                                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                                </div>
                            </Link>
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
