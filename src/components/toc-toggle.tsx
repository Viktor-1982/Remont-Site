"use client"

import { useState, useEffect } from "react"
import { TableOfContents, Heading } from "@/components/table-of-contents"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TocToggle({ items }: { items: Heading[] }) {
    const [open, setOpen] = useState(false)

    // Закрытие по Esc
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false)
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])

    return (
        <>
            {/* Кнопка сверху (под хедером) только на мобильных */}
            <div className="fixed top-16 left-0 right-0 flex justify-center lg:hidden z-40">
                <Button
                    variant="default"
                    onClick={() => setOpen(true)}
                    aria-expanded={open}
                    className="flex items-center gap-2 shadow-md px-6 py-2 rounded-full"
                >
                    <Menu className="w-4 h-4" />
                    Оглавление
                </Button>
            </div>

            {/* Панель с оглавлением */}
            {open && (
                <div className="fixed inset-0 bg-background/95 z-50 p-4 overflow-y-auto max-w-full lg:hidden animate-in slide-in-from-bottom duration-300">
                    <div className="max-w-md mx-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Содержание</h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setOpen(false)}
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                        <TableOfContents
                            items={items}
                            onLinkClick={() => setOpen(false)} // 👈 закрываем при клике на пункт
                        />
                    </div>
                </div>
            )}
        </>
    )
}
