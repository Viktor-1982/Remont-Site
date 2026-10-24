"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Bath,
    BedDouble,
    ChefHat,
    ChevronDown,
    House,
    Layers3,
    Lightbulb,
    Paintbrush,
    Sparkles,
    Wallet,
} from "lucide-react"
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
    wallet: Wallet,
    bed: BedDouble,
    paintbrush: Paintbrush,
    layers3: Layers3,
    house: House,
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
                            "group flex items-center gap-1.5 py-1 pr-1 text-base font-medium tracking-normal transition-smooth",
                            isActive
                                ? "relative font-semibold text-primary after:absolute after:-bottom-1 after:left-0 after:h-[2.5px] after:w-full after:rounded-full after:bg-primary"
                                : "text-foreground/85 hover:text-primary dark:text-foreground/90",
                            className
                        )}
                        aria-label={dictionary.ariaOpenMenu}
                    >
                        <Sparkles className={cn("h-[18px] w-[18px] transition-colors", isActive ? "text-primary" : "text-primary/80 group-hover:text-primary")} />
                        <span>{dictionary.navLabel}</span>
                        <ChevronDown className="h-4 w-4 opacity-70 transition-transform group-hover:opacity-100 group-hover:translate-y-0.5" />
                    </button>
                </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent align="start" className="max-h-[70vh] w-96 overflow-y-auto">
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
