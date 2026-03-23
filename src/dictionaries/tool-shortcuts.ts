import { getToolsDictionary, type ToolsLocale } from "@/dictionaries/tools"

export type ToolShortcut = {
    href: string
    label: string
    desc: string
    icon: ReturnType<typeof getToolsDictionary>["cards"][number]["icon"]
}

export function getToolShortcuts(locale: ToolsLocale): ToolShortcut[] {
    return getToolsDictionary(locale).cards.map((card) => ({
        href: card.href,
        label: card.label,
        desc: card.desc,
        icon: card.icon,
    }))
}
