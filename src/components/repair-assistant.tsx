"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send } from "lucide-react"
import { usePathname } from "next/navigation"

type ChatMessage = { role: "user" | "assistant"; content: string }

function getLocaleFromPath(pathname: string): "en" | "ru" {
    if (pathname.startsWith("/en")) return "en"
    if (pathname.endsWith("-en")) return "en"
    return "ru"
}

const t = {
    en: { title: "Repair Master", welcome: "👋 Hi! I can help with renovation...", typing: "...typing", errorServer: "❌ Server error.", errorEmpty: "❌ Empty reply.", errorConnect: "❌ Could not connect.", open: "Open repair assistant", close: "Close chat", placeholder: "Ask a question...", send: "Send" },
    ru: { title: "Мастер ремонта", welcome: "👋 Привет! Я помогу с ремонтом...", typing: "...печатает", errorServer: "❌ Ошибка сервера.", errorEmpty: "❌ Пустой ответ.", errorConnect: "❌ Не удалось подключиться.", open: "Открыть помощника", close: "Закрыть чат", placeholder: "Задай вопрос...", send: "Отправить" },
}

export function RepairAssistant() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [locale, setLocale] = useState<"ru" | "en">(getLocaleFromPath(pathname))
    const messagesEndRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        setLocale(getLocaleFromPath(pathname))
    }, [pathname])

    const dict = t[locale]

    const sendMessage = async () => {
        if (!input.trim() || loading) return
        const userMessage: ChatMessage = { role: "user", content: input }
        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setLoading(true)

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMessage], locale }),
            })
            const data = await res.json()
            const reply = res.ok ? data.reply || dict.errorEmpty : dict.errorServer
            setMessages((prev) => [...prev, { role: "assistant", content: reply }])
        } catch {
            setMessages((prev) => [...prev, { role: "assistant", content: dict.errorConnect }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {!isOpen && (
                <button onClick={() => setIsOpen(true)} aria-label={dict.open} className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg hover:bg-amber-600 transition">
                    <MessageCircle className="h-6 w-6" aria-hidden="true" />
                </button>
            )}
            {isOpen && (
                <div className="fixed bottom-4 right-4 w-80 h-[450px] rounded-xl border bg-[#fdf6e3] shadow-xl flex flex-col z-50 animate-in fade-in slide-in-from-bottom-5">
                    <div className="flex items-center justify-between p-3 border-b bg-amber-500 text-white rounded-t-xl">
                        <h2 className="font-semibold">{dict.title}</h2>
                        <button onClick={() => setIsOpen(false)} aria-label={dict.close} className="hover:opacity-80">
                            <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
                        {messages.length === 0 && !loading && <p className="text-gray-600 text-center mt-10">{dict.welcome}</p>}
                        {messages.map((m, i) => (
                            <div key={i} className={`px-3 py-2 rounded-2xl max-w-[85%] leading-relaxed shadow-sm ${m.role === "user" ? "ml-auto bg-amber-200" : "mr-auto bg-white"}`}>{m.content}</div>
                        ))}
                        {loading && <div className="mr-auto bg-white text-gray-500 px-3 py-2 rounded-2xl text-sm">{dict.typing}</div>}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-3 border-t flex gap-2 bg-[#fdf6e3]">
                        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder={dict.placeholder} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage() } }} />
                        <Button onClick={sendMessage} disabled={!input.trim() || loading} aria-label={dict.send} className="bg-amber-500 hover:bg-amber-600 text-white">
                            <Send className="h-5 w-5" aria-hidden="true" />
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}
