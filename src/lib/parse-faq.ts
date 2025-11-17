/**
 * Парсит FAQ секцию из MDX контента
 * Формат: ## ❓ FAQ\n\n**Вопрос?**\nОтвет\n\n**Вопрос?**\nОтвет
 */

export interface FAQItem {
    question: string
    answer: string
}

export function parseFAQ(content: string): FAQItem[] {
    const faqs: FAQItem[] = []
    
    // Ищем секцию FAQ (может быть ## ❓ FAQ или ## FAQ или ## 💬 FAQ)
    const faqMatch = content.match(/##\s*[❓💬]?\s*FAQ[\s\S]*?(?=##|$)/i)
    if (!faqMatch) return faqs
    
    const faqSection = faqMatch[0]
    
    // Паттерн для вопросов: **Вопрос?** или **Вопрос** (может быть с эмодзи)
    const questionPattern = /\*\*([^*]+)\*\*\s*\n([^\n]+(?:\n(?!\*\*)[^\n]+)*)/g
    let match
    
    while ((match = questionPattern.exec(faqSection)) !== null) {
        const question = match[1].trim()
        const answer = match[2]
            .trim()
            .replace(/\*\*/g, '') // Убираем жирный текст из ответа
            .replace(/\n\n/g, ' ') // Заменяем двойные переносы на пробелы
            .replace(/\n/g, ' ')
            .trim()
        
        if (question && answer) {
            faqs.push({ question, answer })
        }
    }
    
    return faqs
}

