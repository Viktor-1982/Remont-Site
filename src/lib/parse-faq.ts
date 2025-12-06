/**
 * Парсит FAQ секцию из MDX контента
 * Поддерживает разные форматы:
 * - ## ❓ FAQ\n\n**Вопрос?**\nОтвет
 * - ## ❓ Частые вопросы\n\n**Вопрос?**\n\nОтвет
 * - ## ❓ Частые вопросы\n\nВопрос?\n\nОтвет (без жирного текста)
 */

export interface FAQItem {
    question: string
    answer: string
}

export function parseFAQ(content: string): FAQItem[] {
    const faqs: FAQItem[] = []
    
    // Ищем секцию FAQ (может быть ## ❓ FAQ, ## FAQ, ## 💬 FAQ, ## ❓ Частые вопросы и т.д.)
    const faqMatch = content.match(/##\s*[❓💬]?\s*(?:FAQ|Частые вопросы|частые вопросы|часто задаваемые вопросы|Ответы на частые вопросы)[\s\S]*?(?=##|$)/i)
    if (!faqMatch) return faqs
    
    const faqSection = faqMatch[0]
    
    // Паттерн 1: **Вопрос?** или **Вопрос** (жирный текст) - самый распространенный формат
    // Улучшенный паттерн: поддерживает один или два переноса строки между вопросом и ответом
    const questionPattern1 = /\*\*([^*]+?)\*\*\s*\n+([^\n]+(?:\n(?!\*\*)[^\n]+)*?)(?=\n\*\*|\n---|$)/g
    let match
    
    while ((match = questionPattern1.exec(faqSection)) !== null) {
        const question = match[1].trim()
        const answer = match[2]
            .trim()
            .replace(/\*\*/g, '') // Убираем жирный текст из ответа
            .replace(/\n\n+/g, ' ') // Заменяем множественные переносы на пробелы
            .replace(/\n/g, ' ')
            .trim()
        
        if (question && answer) {
            faqs.push({ question, answer })
        }
    }
    
    // Паттерн 2: Если первый паттерн ничего не нашел, пробуем парсить построчно
    if (faqs.length === 0) {
        const lines = faqSection.split('\n')
        let currentQuestion = ''
        let currentAnswer: string[] = []
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim()
            
            // Пропускаем заголовок секции
            if (line.startsWith('##')) continue
            
            // Если строка заканчивается на "?" и содержит **, это вопрос в жирном тексте
            if (line.match(/^\*\*.*\?\*\*$/)) {
                // Сохраняем предыдущий вопрос-ответ, если есть
                if (currentQuestion && currentAnswer.length > 0) {
                    faqs.push({
                        question: currentQuestion.replace(/\*\*/g, ''),
                        answer: currentAnswer.join(' ').trim()
                    })
                }
                currentQuestion = line
                currentAnswer = []
            } 
            // Если строка заканчивается на "?" и не содержит **, это вопрос без форматирования
            else if (line.endsWith('?') && !line.includes('**')) {
                // Сохраняем предыдущий вопрос-ответ, если есть
                if (currentQuestion && currentAnswer.length > 0) {
                    faqs.push({
                        question: currentQuestion.replace(/\*\*/g, ''),
                        answer: currentAnswer.join(' ').trim()
                    })
                }
                currentQuestion = line
                currentAnswer = []
            } 
            // Если есть текущий вопрос и строка не пустая, это часть ответа
            else if (currentQuestion && line && !line.startsWith('##') && !line.startsWith('---')) {
                currentAnswer.push(line.replace(/\*\*/g, ''))
            }
            // Если встретили разделитель или новый заголовок, сохраняем последний FAQ
            else if ((line.startsWith('---') || line.startsWith('##')) && currentQuestion && currentAnswer.length > 0) {
                faqs.push({
                    question: currentQuestion.replace(/\*\*/g, ''),
                    answer: currentAnswer.join(' ').trim()
                })
                break
            }
        }
        
        // Сохраняем последний FAQ, если есть
        if (currentQuestion && currentAnswer.length > 0) {
            faqs.push({
                question: currentQuestion.replace(/\*\*/g, ''),
                answer: currentAnswer.join(' ').trim()
            })
        }
    }
    
    return faqs
}
