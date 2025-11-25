"use client"

import { useState } from "react"
import { Share2, Check } from "lucide-react"

interface ShareButtonProps {
    url: string
    title: string
    description?: string
    isEnglish?: boolean
}

export function ShareButton({ url, title, description, isEnglish = false }: ShareButtonProps) {
    const [copied, setCopied] = useState(false)

    const handleShare = async () => {
        // Проверяем поддержку Web Share API
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text: description || title,
                    url,
                })
            } catch {
                // Пользователь отменил или произошла ошибка
                // Fallback на копирование ссылки
                copyToClipboard()
            }
        } else {
            // Fallback: копируем ссылку в буфер обмена
            copyToClipboard()
        }
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // Fallback для старых браузеров
            const textArea = document.createElement("textarea")
            textArea.value = url
            textArea.style.position = "fixed"
            textArea.style.left = "-999999px"
            document.body.appendChild(textArea)
            textArea.focus()
            textArea.select()
            try {
                document.execCommand("copy")
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) {
                console.error("Failed to copy:", err)
            }
            document.body.removeChild(textArea)
        }
    }

    return (
        <button
            onClick={handleShare}
            className="group flex items-center justify-center gap-3 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 dark:from-primary/20 dark:via-primary/10 dark:to-accent/20 px-6 py-4 shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 w-full"
        >
            {copied ? (
                <>
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-green-500">
                        {isEnglish ? "Copied!" : "Скопировано!"}
                    </span>
                </>
            ) : (
                <>
                    <Share2 className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {isEnglish ? "Share" : "Поделиться"}
                    </span>
                </>
            )}
        </button>
    )
}
