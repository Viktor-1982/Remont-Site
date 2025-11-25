"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

/**
 * Google CMP (Consent Management Platform) для GDPR/EEA
 * Поддерживает 3 варианта: Consent, Do not consent, Manage options
 */
export function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false)
    const [showManageOptions, setShowManageOptions] = useState(false)

    useEffect(() => {
        // Consent mode уже инициализирован в layout.tsx через inline script
        // Здесь только проверяем сохраненное согласие и обновляем consent при необходимости
        if (typeof window !== "undefined") {
            const win = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
            
            // Функция gtag для consent management
            function gtag(...args: unknown[]) {
                if (win.dataLayer) {
                    win.dataLayer.push(args)
                }
            }

            // Проверяем, есть ли уже сохраненное согласие
            const consent = localStorage.getItem("cookie-consent")
            if (consent === "accepted") {
                // Если согласие уже дано, обновляем consent
                gtag("consent", "update", {
                    ad_storage: "granted",
                    ad_user_data: "granted",
                    ad_personalization: "granted",
                    analytics_storage: "granted",
                })
            } else if (!consent) {
                // Показываем баннер только если согласия нет
                setShowBanner(true)
            }
        }
    }, [])

    const handleConsent = (accepted: boolean) => {
        localStorage.setItem("cookie-consent", accepted ? "accepted" : "rejected")
        localStorage.setItem("cookie-consent-date", new Date().toISOString())

        // Обновляем Google CMP consent через dataLayer
        if (typeof window !== "undefined") {
            const win = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
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

            // Также через gtag если доступен
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
        setShowManageOptions(false)

        // Перезагружаем страницу для применения изменений AdSense
        if (accepted) {
            window.location.reload()
        }
    }

    const handleManageOptions = () => {
        setShowManageOptions(true)
    }

    if (!showBanner && !showManageOptions) {
        return null
    }

    return (
        <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
            <div className="mx-auto max-w-4xl rounded-lg border bg-background p-6 shadow-lg">
                {showManageOptions ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Cookie Preferences</h3>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowManageOptions(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            We use cookies to personalize content and ads, provide social media
                            features, and analyze our traffic. You can choose which cookies to
                            accept.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between rounded-md border p-3">
                                <div>
                                    <p className="font-medium">Advertising Cookies</p>
                                    <p className="text-xs text-muted-foreground">
                                        Used to show you relevant ads
                                    </p>
                                </div>
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        defaultChecked
                                    />
                                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between rounded-md border p-3">
                                <div>
                                    <p className="font-medium">Analytics Cookies</p>
                                    <p className="text-xs text-muted-foreground">
                                        Help us understand how visitors interact with our website
                                    </p>
                                </div>
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        defaultChecked
                                    />
                                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button onClick={() => handleConsent(true)} className="flex-1">
                                Accept All
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => handleConsent(false)}
                                className="flex-1"
                            >
                                Reject All
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold">We value your privacy</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                We use cookies to enhance your browsing experience, serve
                                personalized ads or content, and analyze our traffic. By clicking
                                &quot;Accept All&quot;, you consent to our use of cookies.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button onClick={() => handleConsent(true)} className="flex-1">
                                Accept All
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => handleConsent(false)}
                                className="flex-1"
                            >
                                Do not consent
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={handleManageOptions}
                                className="flex-1"
                            >
                                Manage options
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

