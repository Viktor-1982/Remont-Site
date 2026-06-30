"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const consentCopy = {
    ru: {
        title: "Настройки cookies",
        description:
            "Мы используем аналитические и рекламные cookies только с вашего согласия. Техническое хранилище, нужное для работы выбора и формы подписки, остаётся активным.",
        changeHint:
            "Изменить выбор позже можно через очистку данных этого сайта в браузере и повторную загрузку страницы.",
        accept: "Принять",
        reject: "Отклонить",
    },
    en: {
        title: "Cookie Settings",
        description:
            "We use analytics and advertising cookies only with your consent. Technical storage required for your choice and the subscription form remains active.",
        changeHint:
            "To change your choice later, clear this site's data in your browser and reload the page.",
        accept: "Accept",
        reject: "Reject",
    },
} as const

export function CookieConsent() {
    const pathname = usePathname()
    const locale = pathname === "/ru" || pathname.startsWith("/ru/") ? "ru" : "en"
    const copy = consentCopy[locale]
    const [showBanner, setShowBanner] = useState(false)

    useEffect(() => {
        if (typeof window === "undefined") {
            return
        }

        const win = window as Window & {
            dataLayer?: unknown[]
            gtag?: (...args: unknown[]) => void
        }

        function gtag(...args: unknown[]) {
            if (win.dataLayer) {
                win.dataLayer.push(args)
            }
        }

        const consent = localStorage.getItem("cookie-consent")
        if (consent === "accepted") {
            gtag("consent", "update", {
                ad_storage: "granted",
                ad_user_data: "granted",
                ad_personalization: "granted",
                analytics_storage: "granted",
            })
            return
        }

        if (!consent) {
            setShowBanner(true)
        }
    }, [])

    const handleConsent = (accepted: boolean) => {
        localStorage.setItem("cookie-consent", accepted ? "accepted" : "rejected")
        localStorage.setItem("cookie-consent-date", new Date().toISOString())

        if (typeof window !== "undefined") {
            const win = window as Window & {
                dataLayer?: unknown[]
                gtag?: (...args: unknown[]) => void
            }

            const dataLayer = win.dataLayer || []
            dataLayer.push({
                event: "consent_update",
                consent: {
                    ad_storage: accepted ? "granted" : "denied",
                    ad_user_data: accepted ? "granted" : "denied",
                    ad_personalization: accepted ? "granted" : "denied",
                    analytics_storage: accepted ? "granted" : "denied",
                },
            })

            if (win.gtag) {
                win.gtag("consent", "update", {
                    ad_storage: accepted ? "granted" : "denied",
                    ad_user_data: accepted ? "granted" : "denied",
                    ad_personalization: accepted ? "granted" : "denied",
                    analytics_storage: accepted ? "granted" : "denied",
                })
            }
        }

        setShowBanner(false)

        if (accepted) {
            window.location.reload()
        }
    }

    if (!showBanner) {
        return null
    }

    return (
        <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
            <div className="mx-auto max-w-4xl rounded-lg border bg-background p-6 shadow-lg">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold">{copy.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{copy.description}</p>
                        <p className="mt-2 text-xs text-muted-foreground">{copy.changeHint}</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button onClick={() => handleConsent(true)} className="flex-1">
                            {copy.accept}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleConsent(false)}
                            className="flex-1"
                        >
                            {copy.reject}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
