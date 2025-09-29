"use client"

import { ReactNode } from "react"

type DeepLinkProps = {
    appUrl: string
    webUrl: string
    children: ReactNode
    className?: string
    ariaLabel?: string
    title?: string
    analyticsEvent?: string // название события для аналитики
    location?: string       // место на сайте: footer, header и т.д.
}

export function DeepLink({
                             appUrl,
                             webUrl,
                             children,
                             className,
                             ariaLabel,
                             title,
                             analyticsEvent,
                             location,
                         }: DeepLinkProps) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()

        // 👉 Отправляем событие в GTM через dataLayer
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({
                event: "deep_link_click",
                category: "DeepLink",
                label: analyticsEvent ?? "",
                url: appUrl,
                location: location ?? "unknown",
            })
        }

        // 👉 Пробуем открыть приложение
        window.location.href = appUrl

        // 👉 Если приложения нет → fallback на сайт
        setTimeout(() => {
            window.open(webUrl, "_blank", "noopener,noreferrer")
        }, 500)
    }

    return (
        <a
            href={webUrl} // ✅ для SEO и fallback
            onClick={handleClick}
            aria-label={ariaLabel}
            title={title}
            className={className}
            rel="noopener noreferrer"
        >
            {children}
        </a>
    )
}
