"use client"

import { useState } from "react"
import { Share2, Check, Copy, Mail } from "lucide-react"
import { 
    FaVk, 
    FaTelegram, 
    FaWhatsapp, 
    FaFacebook, 
    FaTwitter,
    FaLinkedin,
    FaReddit
} from "react-icons/fa"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface ShareButtonProps {
    url: string
    title: string
    description?: string
    isEnglish?: boolean
    variant?: "default" | "compact"
}

type SharePlatform = 
    | "vk" 
    | "telegram" 
    | "whatsapp" 
    | "facebook" 
    | "twitter" 
    | "linkedin" 
    | "reddit" 
    | "email" 
    | "copy"

export function ShareButton({
    url,
    title,
    description,
    isEnglish = false,
    variant = "default",
}: ShareButtonProps) {
    const [copied, setCopied] = useState(false)

    const fullUrl = typeof window !== "undefined" ? window.location.origin + url : url
    const shareText = `${title}${description ? ` - ${description}` : ""}`

    const shareLinks: Record<SharePlatform, string> = {
        vk: `https://vk.com/share.php?url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description || "")}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(shareText)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${fullUrl}`)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(shareText)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
        reddit: `https://reddit.com/submit?url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(title)}`,
        email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\n${fullUrl}`)}`,
        copy: fullUrl,
    }

    const handleShare = async (platform: SharePlatform) => {
        if (platform === "copy") {
            await copyToClipboard()
            return
        }

        if (platform === "email") {
            window.location.href = shareLinks.email
            return
        }

        window.open(shareLinks[platform], "_blank", "width=600,height=400")
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(fullUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
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
            } catch (err) {
                console.error("Failed to copy:", err)
            }
            document.body.removeChild(textArea)
        }
    }

    // Определяем доступные платформы в зависимости от языка
    const platforms: Array<{ 
        platform: SharePlatform
        label: string
        icon: React.ReactNode
        color?: string
    }> = [
        ...(!isEnglish ? [{
            platform: "vk" as SharePlatform,
            label: "VK",
            icon: <FaVk className="h-4 w-4" />,
            color: "text-[#0077FF]",
        }] : []),
        {
            platform: "telegram",
            label: "Telegram",
            icon: <FaTelegram className="h-4 w-4" />,
            color: "text-[#0088cc]",
        },
        {
            platform: "whatsapp",
            label: "WhatsApp",
            icon: <FaWhatsapp className="h-4 w-4" />,
            color: "text-[#25D366]",
        },
        {
            platform: "facebook",
            label: "Facebook",
            icon: <FaFacebook className="h-4 w-4" />,
            color: "text-[#1877F2]",
        },
        {
            platform: "twitter",
            label: isEnglish ? "Twitter/X" : "Twitter/X",
            icon: <FaTwitter className="h-4 w-4" />,
            color: "text-[#1DA1F2]",
        },
        ...(isEnglish ? [{
            platform: "linkedin" as SharePlatform,
            label: "LinkedIn",
            icon: <FaLinkedin className="h-4 w-4" />,
            color: "text-[#0077B5]",
        }] : []),
        ...(isEnglish ? [{
            platform: "reddit" as SharePlatform,
            label: "Reddit",
            icon: <FaReddit className="h-4 w-4" />,
            color: "text-[#FF4500]",
        }] : []),
        {
            platform: "email",
            label: isEnglish ? "Email" : "Email",
            icon: <Mail className="h-4 w-4" />,
        },
        {
            platform: "copy",
            label: isEnglish ? "Copy link" : "Копировать ссылку",
            icon: copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />,
        },
    ]

    const triggerButton = (
        <Button
            variant={variant === "compact" ? "outline" : "default"}
            size={variant === "compact" ? "sm" : "default"}
            className={cn(
                variant === "compact" 
                    ? "flex items-center gap-2 bg-white/90 hover:bg-white text-foreground border-white/30 hover:border-white/50 backdrop-blur-sm"
                    : cn(
                        "group flex items-center justify-center gap-3 rounded-xl border-2 border-primary/30",
                        "bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10",
                        "dark:from-primary/20 dark:via-primary/10 dark:to-accent/20",
                        "px-6 py-4 shadow-lg transition-all duration-300",
                        "hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 w-full"
                    )
            )}
        >
            {copied && variant !== "compact" ? (
                <>
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-green-500">
                        {isEnglish ? "Copied!" : "Скопировано!"}
                    </span>
                </>
            ) : (
                <>
                    <Share2 className={cn(
                        variant === "compact" ? "h-4 w-4" : "w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300"
                    )} />
                    <span className={cn(
                        variant === "compact" ? "hidden sm:inline" : "font-semibold text-foreground group-hover:text-primary transition-colors"
                    )}>
                        {isEnglish ? "Share" : "Поделиться"}
                    </span>
                </>
            )}
        </Button>
    )

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {triggerButton}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                {platforms.map((item, index) => {
                    const isEmailOrCopy = item.platform === "email" || item.platform === "copy"
                    const prevItem = platforms[index - 1]
                    const showSeparator = isEmailOrCopy && prevItem && (prevItem.platform !== "email" && prevItem.platform !== "copy")
                    
                    return (
                        <div key={item.platform}>
                            {showSeparator && <DropdownMenuSeparator />}
                            <DropdownMenuItem
                                onClick={() => handleShare(item.platform)}
                                className={cn(
                                    "cursor-pointer",
                                    item.platform === "copy" && copied && "text-green-500"
                                )}
                            >
                                <span className={cn("mr-2", item.color || "text-muted-foreground")}>
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </DropdownMenuItem>
                        </div>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
