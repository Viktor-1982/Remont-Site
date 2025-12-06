"use client"

import { useState } from "react"
import { Share2, Check, MessageCircle, Send } from "lucide-react"
import { FaVk, FaTelegram, FaWhatsapp } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ShareButtonProps {
    url: string
    title: string
    description?: string
    isEnglish?: boolean
    variant?: "default" | "compact"
}

export function ShareButton({
    url,
    title,
    description,
    isEnglish = false,
    variant = "default",
}: ShareButtonProps) {
    const [copied, setCopied] = useState(false)
    const [showSocial, setShowSocial] = useState(false)

    const fullUrl = typeof window !== "undefined" ? window.location.origin + url : url
    const shareText = `${title}${description ? ` - ${description}` : ""}`

    const shareLinks = {
        vk: `https://vk.com/share.php?url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description || "")}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(shareText)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${fullUrl}`)}`,
    }

    const handleShare = async (platform?: "vk" | "telegram" | "whatsapp") => {
        if (platform) {
            window.open(shareLinks[platform], "_blank", "width=600,height=400")
            return
        }

        // Проверяем поддержку Web Share API
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text: description || title,
                    url: fullUrl,
                })
            } catch {
                // Пользователь отменил или произошла ошибка
                copyToClipboard()
            }
        } else {
            // Показываем социальные сети
            setShowSocial(true)
        }
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(fullUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
            setShowSocial(false)
        } catch {
            // Fallback для старых браузеров
            const textArea = document.createElement("textarea")
            textArea.value = fullUrl
            textArea.style.position = "fixed"
            textArea.style.left = "-999999px"
            document.body.appendChild(textArea)
            textArea.focus()
            textArea.select()
            try {
                document.execCommand("copy")
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
                setShowSocial(false)
            } catch (err) {
                console.error("Failed to copy:", err)
            }
            document.body.removeChild(textArea)
        }
    }

    if (variant === "compact") {
        return (
            <div className="relative">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare()}
                    className="flex items-center gap-2 bg-white/90 hover:bg-white text-foreground border-white/30 hover:border-white/50 backdrop-blur-sm"
                >
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline">{isEnglish ? "Share" : "Поделиться"}</span>
                </Button>
                {showSocial && (
                    <div className="absolute top-full left-0 mt-2 p-2 bg-card border rounded-lg shadow-lg z-50 flex gap-2 animate-in fade-in slide-in-from-top-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleShare("vk")}
                            className="text-[#0077FF] hover:bg-[#0077FF]/10"
                            aria-label="VK"
                        >
                            <FaVk className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleShare("telegram")}
                            className="text-[#0088cc] hover:bg-[#0088cc]/10"
                            aria-label="Telegram"
                        >
                            <FaTelegram className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleShare("whatsapp")}
                            className="text-[#25D366] hover:bg-[#25D366]/10"
                            aria-label="WhatsApp"
                        >
                            <FaWhatsapp className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={copyToClipboard}
                            aria-label={isEnglish ? "Copy link" : "Копировать ссылку"}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="space-y-3">
            <button
                onClick={() => handleShare()}
                className={cn(
                    "group flex items-center justify-center gap-3 rounded-xl border-2 border-primary/30",
                    "bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10",
                    "dark:from-primary/20 dark:via-primary/10 dark:to-accent/20",
                    "px-6 py-4 shadow-lg transition-all duration-300",
                    "hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 w-full"
                )}
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

            {/* Социальные сети */}
            <div className="grid grid-cols-3 gap-2">
                <Button
                    variant="outline"
                    onClick={() => handleShare("vk")}
                    className="flex items-center justify-center gap-2 text-[#0077FF] hover:bg-[#0077FF]/10 hover:border-[#0077FF]"
                >
                    <FaVk className="h-4 w-4" />
                    <span className="text-xs">VK</span>
                </Button>
                <Button
                    variant="outline"
                    onClick={() => handleShare("telegram")}
                    className="flex items-center justify-center gap-2 text-[#0088cc] hover:bg-[#0088cc]/10 hover:border-[#0088cc]"
                >
                    <FaTelegram className="h-4 w-4" />
                    <span className="text-xs">Telegram</span>
                </Button>
                <Button
                    variant="outline"
                    onClick={() => handleShare("whatsapp")}
                    className="flex items-center justify-center gap-2 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]"
                >
                    <FaWhatsapp className="h-4 w-4" />
                    <span className="text-xs">WhatsApp</span>
                </Button>
            </div>
        </div>
    )
}
