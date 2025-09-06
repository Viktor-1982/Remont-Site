"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"

export function RepairAssistant() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
    const [input, setInput] = useState("")
    const messagesEndRef = useRef<HTMLDivElement | null>(null)

    const sendMessage = async () => {
        if (!input.trim()) return

        const userMessage = { role: "user", content: input }
        setMessages((prev) => [...prev, userMessage])
        setInput("")

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            })

            if (!res.ok) {
                const text = await res.text()
                console.error("API error:", res.status, text)
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: "❌ Ошибка на сервере, попробуй позже." },
                ])
                return
            }

            const data = await res.json()
            if (!data.reply) {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: "❌ Ошибка: пустой ответ от ИИ." },
                ])
                return
            }

            const aiMessage = { role: "assistant", content: data.reply }
            setMessages((prev) => [...prev, aiMessage])
        } catch (err) {
            console.error("Ошибка запроса:", err)
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "❌ Не удалось подключиться к серверу." },
            ])
        }
    }

    // 🔹 Авто-скролл к последнему сообщению
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    return (
        <>
            {/* Кнопка-пузырёк */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg hover:bg-amber-600 transition"
                >
                    <MessageCircle className="h-6 w-6" />
                </button>
            )}

            {/* Чат-окно */}
            {isOpen && (
                <div className="fixed bottom-4 right-4 w-80 h-[450px] rounded-xl border bg-[#fdf6e3] shadow-xl flex flex-col z-50 animate-in fade-in slide-in-from-bottom-5">
                    {/* Заголовок */}
                    <div className="flex items-center justify-between p-3 border-b bg-amber-500 text-white rounded-t-xl">
                        <h2 className="font-semibold">Мастер ремонта</h2>
                        <button onClick={() => setIsOpen(false)}>
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Сообщения */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
                        {messages.length === 0 && (
                            <p className="text-gray-600 text-center mt-10">
                                👋 Привет! Я помогу с ремонтом. Спроси про краску, плитку или материалы.
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
                        {/* 🔹 якорь для скролла */}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Поле ввода */}
                    <div className="p-3 border-t flex gap-2 bg-[#fdf6e3]">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Задай вопрос..."
                            className="bg-white text-gray-900"
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <Button
                            onClick={sendMessage}
                            className="bg-amber-500 hover:bg-amber-600 text-white"
                        >
                            ➡️
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}
