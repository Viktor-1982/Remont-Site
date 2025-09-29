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
}

export function DeepLink({
                             appUrl,
                             webUrl,
                             children,
                             className,
                             ariaLabel,
                             title,
                             analyticsEvent,
                         }: DeepLinkProps) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()

        // 👉 Отправляем событие в GA4, если настроен gtag
        if (analyticsEvent && typeof window !== "undefined" && (window as any).gtag) {
            ;(window as any).gtag("event", "click", {
                event_category: "DeepLink",
                event_label: analyticsEvent,
            })
        }

        // 👉 Пробуем открыть приложение
        window.location.href = appUrl

        // 👉 Если приложения нет → fallback на сайт
        setTimeout(() => {
            window.open(webUrl, "_blank")
        }, 500)
    }

    return (
        <a
            href={appUrl}
            onClick={handleClick}
            aria-label={ariaLabel}
            title={title}
            className={className}
        >
            {children}
        </a>
    )
}
