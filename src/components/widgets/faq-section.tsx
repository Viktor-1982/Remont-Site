"use client"

import { useState } from "react"
import { ChevronDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQItem {
    question: string
    answer: string
}

interface FAQSectionProps {
    items: FAQItem[]
    title?: string
    isEnglish?: boolean
    searchable?: boolean
}

export function FAQSection({ 
    items, 
    title, 
    isEnglish = false,
    searchable = true 
}: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    // Фильтруем FAQ по поисковому запросу
    const filteredItems = searchable && searchQuery.trim()
        ? items.filter(item => 
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : items

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    if (items.length === 0) return null

    return (
        <div className="my-6 sm:my-8 rounded-xl border border-border dark:border-border/50 bg-card dark:bg-card p-4 sm:p-6 shadow-soft dark:shadow-xl">
            {/* Заголовок */}
            <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground dark:text-foreground mb-2">
                    {title || (isEnglish ? "Frequently Asked Questions" : "Часто задаваемые вопросы")}
                </h2>
                {searchable && items.length > 3 && (
                    <div className="relative mt-3 sm:mt-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-muted-foreground" />
                        <input
                            type="text"
                            placeholder={isEnglish ? "Search FAQ..." : "Поиск по FAQ..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm sm:text-base rounded-lg border border-border dark:border-border/50 bg-background dark:bg-background text-foreground dark:text-foreground placeholder:text-muted-foreground dark:placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary focus:border-transparent transition-all"
                        />
                    </div>
                )}
            </div>

            {/* Список FAQ */}
            <div className="space-y-2">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => {
                        const originalIndex = items.indexOf(item)
                        const isOpen = openIndex === originalIndex
                        
                        return (
                            <div
                                key={originalIndex}
                                className="border border-border dark:border-border/50 rounded-lg overflow-hidden bg-background dark:bg-background transition-all hover:border-primary/50 dark:hover:border-primary/50"
                            >
                                <button
                                    onClick={() => toggleItem(originalIndex)}
                                    className="w-full px-3 sm:px-4 py-3 sm:py-4 text-left flex items-center justify-between gap-3 sm:gap-4 hover:bg-muted/50 dark:hover:bg-muted/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background rounded-lg"
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-answer-${originalIndex}`}
                                >
                                    <span className="font-semibold text-sm sm:text-base text-foreground dark:text-foreground pr-2 sm:pr-4 flex-1">
                                        {item.question}
                                    </span>
                                    <ChevronDown
                                        className={cn(
                                            "h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground dark:text-muted-foreground flex-shrink-0 transition-transform duration-200",
                                            isOpen && "transform rotate-180"
                                        )}
                                    />
                                </button>
                                <div
                                    id={`faq-answer-${originalIndex}`}
                                    className={cn(
                                        "overflow-hidden transition-all duration-300 ease-in-out",
                                        isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                                    )}
                                >
                                    <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-3 sm:pt-4 text-sm sm:text-base text-muted-foreground dark:text-muted-foreground leading-relaxed">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="text-center py-8 text-muted-foreground dark:text-muted-foreground">
                        {isEnglish 
                            ? "No questions found matching your search."
                            : "Вопросы по вашему запросу не найдены."}
                    </div>
                )}
            </div>

            {/* Подсказка о количестве */}
            {searchable && searchQuery && filteredItems.length > 0 && (
                <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground text-center">
                    {isEnglish
                        ? `Showing ${filteredItems.length} of ${items.length} questions`
                        : `Показано ${filteredItems.length} из ${items.length} вопросов`}
                </div>
            )}
        </div>
    )
}

