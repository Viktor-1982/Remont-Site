"use client"

import { useState } from "react"
import { Mail, Check, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import navDataJson from "@/components/messages/nav.json"

type Locale = "ru" | "en"

interface EmailSubscriptionDict {
    title: string
    description: string
    placeholder: string
    button: string
    success: string
    error: string
    invalidEmail: string
    alreadySubscribed: string
}

type NavData = Record<Locale, { emailSubscription: EmailSubscriptionDict }>

const navData: NavData = navDataJson as NavData

interface EmailSubscriptionProps {
    locale?: "ru" | "en"
    variant?: "default" | "compact" | "inline"
    className?: string
}

export function EmailSubscription({ 
    locale = "ru", 
    variant = "default",
    className 
}: EmailSubscriptionProps) {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState("")

    const t = navData[locale].emailSubscription

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!email.trim()) {
            setStatus("error")
            setErrorMessage(t.invalidEmail)
            return
        }

        if (!validateEmail(email)) {
            setStatus("error")
            setErrorMessage(t.invalidEmail)
            return
        }

        setStatus("loading")
        setErrorMessage("")

        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, locale }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || t.error)
            }

            setStatus("success")
            setEmail("")
            
            // Сбрасываем статус через 5 секунд
            setTimeout(() => {
                setStatus("idle")
            }, 5000)
        } catch (error) {
            setStatus("error")
            setErrorMessage(
                error instanceof Error 
                    ? error.message 
                    : t.error
            )
        }
    }

    if (variant === "inline") {
        return (
            <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
                <Input
                    type="email"
                    placeholder={t.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading" || status === "success"}
                    className="flex-1 min-w-0"
                    required
                />
                <Button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    size="default"
                >
                    {status === "loading" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : status === "success" ? (
                        <Check className="h-4 w-4" />
                    ) : (
                        t.button
                    )}
                </Button>
            </form>
        )
    }

    if (variant === "compact") {
        return (
            <div className={cn("p-4 sm:p-6 rounded-xl border border-border/50 bg-card/50 dark:bg-card/80", className)}>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        <h3 className="text-sm sm:text-base font-semibold text-foreground">{t.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{t.description}</p>
                    <div className="flex gap-2">
                        <Input
                            type="email"
                            placeholder={t.placeholder}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === "loading" || status === "success"}
                            className="flex-1 min-w-0 text-sm"
                            required
                        />
                        <Button
                            type="submit"
                            disabled={status === "loading" || status === "success"}
                            size="sm"
                        >
                            {status === "loading" ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : status === "success" ? (
                                <Check className="h-4 w-4" />
                            ) : (
                                t.button
                            )}
                        </Button>
                    </div>
                    {status === "success" && (
                        <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 flex items-center gap-1.5">
                            <Check className="h-3 w-3" />
                            {t.success}
                        </p>
                    )}
                    {status === "error" && errorMessage && (
                        <p className="text-xs sm:text-sm text-destructive flex items-center gap-1.5">
                            <AlertCircle className="h-3 w-3" />
                            {errorMessage}
                        </p>
                    )}
                </form>
            </div>
        )
    }

    return (
        <div className={cn("p-6 sm:p-8 md:p-10 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/5 dark:from-primary/10 dark:via-background dark:to-primary/10", className)}>
            <div className="max-w-2xl mx-auto text-center space-y-4">
                <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-primary/10 dark:bg-primary/20">
                        <Mail className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                    </div>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                    {t.title}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
                    {t.description}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <Input
                            type="email"
                            placeholder={t.placeholder}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === "loading" || status === "success"}
                            className="flex-1 text-base h-12"
                            required
                        />
                        <Button
                            type="submit"
                            disabled={status === "loading" || status === "success"}
                            size="lg"
                            className="h-12 px-6 sm:px-8"
                        >
                            {status === "loading" ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    {locale === "en" ? "Subscribing..." : "Подписка..."}
                                </>
                            ) : status === "success" ? (
                                <>
                                    <Check className="h-4 w-4 mr-2" />
                                    {locale === "en" ? "Subscribed!" : "Подписан!"}
                                </>
                            ) : (
                                t.button
                            )}
                        </Button>
                    </div>
                    {status === "success" && (
                        <p className="text-sm sm:text-base text-green-600 dark:text-green-400 flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                            <Check className="h-4 w-4" />
                            {t.success}
                        </p>
                    )}
                    {status === "error" && errorMessage && (
                        <p className="text-sm sm:text-base text-destructive flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                            <AlertCircle className="h-4 w-4" />
                            {errorMessage}
                        </p>
                    )}
                </form>
            </div>
        </div>
    )
}

