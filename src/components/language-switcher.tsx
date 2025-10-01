"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

export function LanguageSwitcher() {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en")

    const targetPath = isEnglish
        ? pathname.replace(/^\/en/, "") || "/"
        : "/en" + (pathname === "/" ? "" : pathname)

    return (
        <Link
            href={targetPath}
            className="px-3 py-1 border rounded text-sm hover:bg-muted transition"
            aria-label={isEnglish ? "Switch to Russian" : "Переключить на английский"}
        >
            {isEnglish ? "RU" : "EN"}
        </Link>
    )
}
