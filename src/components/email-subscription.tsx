"use client"

import { useId, useState } from "react"
import { Mail, Check, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import navDataJson from "@/components/messages/nav.json"
import {
    SUBSCRIPTION_SEGMENTS,
    type SubscriptionSegment,
} from "@/lib/subscription-segments"

type Locale = "ru" | "en"

type SegmentOptionDict = {
    label: string
    description: string
}

interface EmailSubscriptionDict {
    title: string
    description: string
    segmentLabel: string
    segmentHint: string
    missingSegment: string
    segments: Record<SubscriptionSegment, SegmentOptionDict>
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
    locale?: Locale
    variant?: "default" | "compact" | "inline"
    className?: string
}

export function EmailSubscription({
    locale = "ru",
    variant = "default",
    className,
}: EmailSubscriptionProps) {
    const [email, setEmail] = useState("")
    const [segment, setSegment] = useState<SubscriptionSegment | null>(null)
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState("")
    const segmentGroupId = useId()

    const t = navData[locale].emailSubscription
    const segmentOptions = SUBSCRIPTION_SEGMENTS.map((value) => ({
        value,
        ...t.segments[value],
    }))

    const validateEmail = (value: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value)
    }

    const handleEmailChange = (value: string) => {
        setEmail(value)
        if (status === "error") {
            setStatus("idle")
            setErrorMessage("")
        }
    }

    const handleSegmentChange = (value: SubscriptionSegment) => {
        setSegment(value)
        if (status === "error") {
            setStatus("idle")
            setErrorMessage("")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!segment) {
            setStatus("error")
            setErrorMessage(t.missingSegment)
            return
        }

        if (!email.trim() || !validateEmail(email)) {
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
                body: JSON.stringify({ email, locale, segment }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || t.error)
            }

            setStatus("success")
            setEmail("")

            setTimeout(() => {
                setStatus("idle")
            }, 5000)
        } catch (error) {
            setStatus("error")
            setErrorMessage(error instanceof Error ? error.message : t.error)
        }
    }

    const renderSegmentPicker = () => (
        <fieldset className="space-y-2 text-left">
            <legend className="text-sm font-semibold text-foreground">{t.segmentLabel}</legend>
            <p className="text-xs sm:text-sm text-muted-foreground">{t.segmentHint}</p>
            <div
                className={cn(
                    "grid gap-2",
                    variant === "default" ? "sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-3"
                )}
            >
                {segmentOptions.map((option) => {
                    const selected = segment === option.value

                    return (
                        <label
                            key={option.value}
                            className={cn(
                                "cursor-pointer rounded-xl border p-3 transition-colors",
                                selected
                                    ? "border-primary bg-primary/5"
                                    : "border-border/60 bg-background hover:border-primary/40"
                            )}
                        >
                            <input
                                type="radio"
                                name={segmentGroupId}
                                value={option.value}
                                checked={selected}
                                onChange={() => handleSegmentChange(option.value)}
                                disabled={status === "loading" || status === "success"}
                                className="sr-only"
                            />
                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-foreground">
                                    {option.label}
                                </p>
                                <p className="text-xs leading-relaxed text-muted-foreground">
                                    {option.description}
                                </p>
                            </div>
                        </label>
                    )
                })}
            </div>
        </fieldset>
    )

    const renderStatus = (align: "left" | "center") => (
        <div className={cn("min-h-[1.5rem]", align === "center" && "text-center")}>
            {status === "success" && (
                <p
                    className={cn(
                        "text-sm text-green-600 dark:text-green-400 flex items-center gap-2",
                        align === "center" && "justify-center"
                    )}
                >
                    <Check className="h-4 w-4" />
                    {t.success}
                </p>
            )}
            {status === "error" && errorMessage && (
                <p
                    className={cn(
                        "text-sm text-destructive flex items-center gap-2",
                        align === "center" && "justify-center"
                    )}
                >
                    <AlertCircle className="h-4 w-4" />
                    {errorMessage}
                </p>
            )}
        </div>
    )

    if (variant === "inline") {
        return (
            <form onSubmit={handleSubmit} className={cn("space-y-3", className)}>
                {renderSegmentPicker()}
                <div className="flex gap-2">
                    <Input
                        type="email"
                        placeholder={t.placeholder}
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
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
                </div>
                {renderStatus("left")}
            </form>
        )
    }

    if (variant === "compact") {
        return (
            <div
                className={cn(
                    "p-4 sm:p-6 rounded-xl border border-border/50 bg-card/50 dark:bg-card/80",
                    className
                )}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        <h3 className="text-sm sm:text-base font-semibold text-foreground">
                            {t.title}
                        </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{t.description}</p>
                    {renderSegmentPicker()}
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Input
                            type="email"
                            placeholder={t.placeholder}
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            disabled={status === "loading" || status === "success"}
                            className="flex-1 min-w-0 text-sm"
                            required
                        />
                        <Button
                            type="submit"
                            disabled={status === "loading" || status === "success"}
                            size="sm"
                            className="sm:self-end"
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
                    {renderStatus("left")}
                </form>
            </div>
        )
    }

    return (
        <div
            className={cn(
                "p-6 sm:p-8 md:p-10 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/5 dark:from-primary/10 dark:via-background dark:to-primary/10",
                className
            )}
        >
            <div className="max-w-3xl mx-auto text-center space-y-4">
                <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-primary/10 dark:bg-primary/20">
                        <Mail className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                    </div>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                    {t.title}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                    {t.description}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                    {renderSegmentPicker()}
                    <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                        <Input
                            type="email"
                            placeholder={t.placeholder}
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
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
                                    {locale === "en" ? "Subscribing..." : "Оформляем..."}
                                </>
                            ) : status === "success" ? (
                                <>
                                    <Check className="h-4 w-4 mr-2" />
                                    {locale === "en" ? "Subscribed" : "Подписка оформлена"}
                                </>
                            ) : (
                                t.button
                            )}
                        </Button>
                    </div>
                    {renderStatus("center")}
                </form>
            </div>
        </div>
    )
}
