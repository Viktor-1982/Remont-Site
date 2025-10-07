"use client"

import { ReactNode } from "react"

type DeepLinkProps = {
    href?: string
    appUrl?: string
    webUrl?: string
    children: ReactNode
    className?: string
    ariaLabel?: string // 
    title?: string
    analyticsEvent?: string
    location?: string
}

export function DeepLink({
                             href,
                             appUrl,
                             webUrl,
                             children,
                             className,
                             ariaLabel,
                             title,
                             analyticsEvent,
                             location,
                         }: DeepLinkProps) {
    const finalAppUrl = appUrl || href
    const finalWebUrl = webUrl || href
    const safeHref = finalWebUrl || "/" // ✅ предотвращает TS2322 (undefined → Url)

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // 🔹 Google Tag Manager event
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({
                event: "deep_link_click",
                category: "DeepLink",
                label: analyticsEvent ?? "",
                url: finalAppUrl,
                location: location ?? "unknown",
            })
        }

        // 🔹 Пробуем открыть приложение
        if (appUrl) {
            e.preventDefault()
            window.location.href = appUrl

            // fallback на сайт, если приложение не установлено
            if (finalWebUrl) {
                setTimeout(() => {
                    window.open(finalWebUrl, "_blank", "noopener,noreferrer")
                }, 500)
            }
        }
        // 🔹 Если внешняя ссылка (https://instagram.com/...)
        else if (finalWebUrl && !finalWebUrl.startsWith("/")) {
            e.preventDefault()
            window.open(finalWebUrl, "_blank", "noopener,noreferrer")
        }
        // 🔹 Внутренние ссылки ("/about" и т.п.) — работают нативно
    }

    return (
        <a
            href={safeHref} // ✅ безопасный URL (всегда string)
            onClick={handleClick}
            aria-label={ariaLabel}
            title={title}
            className={className}
            rel="noopener noreferrer"
            target={finalWebUrl?.startsWith("http") ? "_blank" : undefined} // 🔹 откроет внешние ссылки в новой вкладке
        >
            {children}
        </a>
    )
}
