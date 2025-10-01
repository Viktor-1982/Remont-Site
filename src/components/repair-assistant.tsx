"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send } from "lucide-react"
import { usePathname } from "next/navigation"

type ChatMessage = { role: "user" | "assistant"; content: string }

export function RepairAssistant() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement | null>(null)

    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en")
    const locale = isEnglish ? "en" : "ru"

    // 🔹 Отправка сообщения
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
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    locale // ✅ передаём язык в API
                }),
            })

            if (!res.ok) {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: isEnglish ? "❌ Server error. Try later." : "❌ Ошибка сервера. Попробуйте позже." },
                ])
                return
            }

            const data = await res.json()
            const reply = data.reply || (isEnglish ? "❌ Empty reply from server." : "❌ Пустой ответ от сервера.")

            setMessages((prev) => [...prev, { role: "assistant", content: reply }])
        } catch (err) {
            console.error("Ошибка запроса:", err)
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: isEnglish ? "❌ Could not connect to server." : "❌ Не удалось подключиться к серверу." },
            ])
        } finally {
            setLoading(false)
        }
    }

    // 🔹 Автоскролл вниз
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, loading])

    return (
        <>
            {/* Кнопка-пузырёк */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    aria-label={isEnglish ? "Open repair assistant" : "Открыть помощника по ремонту"}
                    className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg hover:bg-amber-600 transition"
                >
                    <MessageCircle className="h-6 w-6" aria-hidden="true" />
                </button>
            )}

            {/* Окно чата */}
            {isOpen && (
                <div
                    className="fixed bottom-4 right-4 w-80 h-[450px] rounded-xl border bg-[#fdf6e3] shadow-xl flex flex-col z-50 animate-in fade-in slide-in-from-bottom-5"
                    role="dialog"
                    aria-label={isEnglish ? "Repair assistant chat" : "Чат помощника по ремонту"}
                >
                    {/* Заголовок */}
                    <div className="flex items-center justify-between p-3 border-b bg-amber-500 text-white rounded-t-xl">
                        <h2 className="font-semibold">
                            {isEnglish ? "Repair Master" : "Мастер ремонта"}
                        </h2>
                        <button
                            onClick={() => {
                                setIsOpen(false)
                                setMessages([])
                            }}
                            aria-label={isEnglish ? "Close chat" : "Закрыть чат"}
                            className="hover:opacity-80"
                        >
                            <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Сообщения */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
                        {messages.length === 0 && !loading && (
                            <p className="text-gray-600 text-center mt-10">
                                {isEnglish
                                    ? "👋 Hi! I can help with renovation. Ask me about paint, tiles or materials."
                                    : "👋 Привет! Я помогу с ремонтом. Спроси про краску, плитку или материалы."}
                            </p>
                        )}
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`px-3 py-2 rounded-2xl max-w-[85%] leading-relaxed shadow-sm ${
                                    m.role === "user"
                                        ? "ml-auto bg-amber-200 text-gray-900 font-semibold rounded-br-none"
                                        : "mr-auto bg-white text-gray-900 rounded-bl-none"
                                }`}
                            >
                                {m.content}
                            </div>
                        ))}
                        {loading && (
                            <div className="mr-auto bg-white text-gray-500 px-3 py-2 rounded-2xl text-sm">
                                {isEnglish ? "...typing" : "...печатает"}
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Ввод */}
                    <div className="p-3 border-t flex gap-2 bg-[#fdf6e3]">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={isEnglish ? "Ask a question..." : "Задай вопрос..."}
                            className="bg-white text-gray-900"
                            aria-label={isEnglish ? "Question input field" : "Поле ввода для вопроса"}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault()
                                    sendMessage()
                                }
                            }}
                        />
                        <Button
                            onClick={sendMessage}
                            disabled={!input.trim() || loading}
                            aria-label={isEnglish ? "Send message" : "Отправить сообщение"}
                            className="bg-amber-500 hover:bg-amber-600 text-white"
                        >
                            <Send className="h-5 w-5" aria-hidden="true" />
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}
