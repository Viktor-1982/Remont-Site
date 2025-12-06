"use client"

import { useEffect } from "react"
import { addToViewHistory } from "@/lib/view-history"
import type { Post } from ".contentlayer/generated"

interface ViewHistoryTrackerProps {
    post: Post
}

/**
 * Компонент для отслеживания просмотров статей и добавления их в историю
 */
export function ViewHistoryTracker({ post }: ViewHistoryTrackerProps) {
    useEffect(() => {
        // Добавляем статью в историю просмотров при загрузке страницы
        addToViewHistory(post)
    }, [post])

    return null // Этот компонент не рендерит ничего визуально
}

