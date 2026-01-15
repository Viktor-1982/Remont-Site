import { supabaseAdmin, supabaseReady } from "./supabase-admin"

type SentNotificationRow = {
    id: string
    post_slug: string
    post_locale: "ru" | "en"
    sent_at: string
    subscribers_count: number
    success_count: number
    failed_count: number
}

export interface SentNotification {
    id: string
    postSlug: string
    postLocale: "ru" | "en"
    sentAt: number
    subscribersCount: number
    successCount: number
    failedCount: number
}

function mapRow(row: SentNotificationRow): SentNotification {
    return {
        id: row.id,
        postSlug: row.post_slug,
        postLocale: row.post_locale as "ru" | "en",
        sentAt: new Date(row.sent_at).getTime(),
        subscribersCount: row.subscribers_count,
        successCount: row.success_count,
        failedCount: row.failed_count,
    }
}

/**
 * Проверяет, было ли уже отправлено уведомление для статьи
 */
export async function wasNotificationSent(
    postSlug: string,
    postLocale: "ru" | "en"
): Promise<boolean> {
    if (supabaseReady && supabaseAdmin) {
        try {
            const { data, error } = await supabaseAdmin
                .from("sent_notifications")
                .select("id")
                .eq("post_slug", postSlug)
                .eq("post_locale", postLocale)
                .maybeSingle()

            if (error) {
                console.error("Supabase wasNotificationSent error:", error)
                return false // В случае ошибки считаем, что не отправлено
            }

            return data !== null
        } catch (err) {
            console.error("Unexpected error in wasNotificationSent:", err)
            return false
        }
    }

    // Если Supabase не настроен, используем in-memory хранилище (только для dev)
    return false
}

/**
 * Сохраняет информацию об отправленном уведомлении
 */
export async function saveNotificationSent(
    postSlug: string,
    postLocale: "ru" | "en",
    subscribersCount: number,
    successCount: number,
    failedCount: number
): Promise<void> {
    if (supabaseReady && supabaseAdmin) {
        try {
            const { error } = await supabaseAdmin.from("sent_notifications").upsert({
                post_slug: postSlug,
                post_locale: postLocale,
                subscribers_count: subscribersCount,
                success_count: successCount,
                failed_count: failedCount,
                sent_at: new Date().toISOString(),
            }, {
                onConflict: "post_slug,post_locale",
            })

            if (error) {
                console.error("Supabase saveNotificationSent error:", error)
                throw error
            }
        } catch (err) {
            console.error("Unexpected error in saveNotificationSent:", err)
            throw err
        }
    }
    // Если Supabase не настроен, просто логируем (для dev)
    console.log(`Notification sent for ${postSlug} (${postLocale}): ${successCount}/${subscribersCount}`)
}

/**
 * Получает все отправленные уведомления
 */
export async function getAllSentNotifications(): Promise<SentNotification[]> {
    if (supabaseReady && supabaseAdmin) {
        try {
            const { data, error } = await supabaseAdmin
                .from("sent_notifications")
                .select("*")
                .order("sent_at", { ascending: false })

            if (error) {
                console.error("Supabase getAllSentNotifications error:", error)
                throw error
            }

            return (data || []).map((row) => mapRow(row as SentNotificationRow))
        } catch (err) {
            console.error("Unexpected error in getAllSentNotifications:", err)
            throw err
        }
    }

    return []
}

