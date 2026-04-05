import { supabaseAdmin, supabaseReady } from "./supabase-admin"
import { subscriptions as memoryStore, type Subscription } from "@/app/api/subscriptions/store"
import {
    SUBSCRIPTION_SEGMENTS,
    isSubscriptionSegment,
    type SubscriptionSegment,
} from "@/lib/subscription-segments"

type SubscriptionRow = {
    email: string
    locale: "ru" | "en"
    segment: string | null
    source: string | null
    subscribed_at: string | null
}

const nowIso = () => new Date().toISOString()

function isMissingSegmentColumnError(error: { message?: string } | null | undefined): boolean {
    const message = error?.message?.toLowerCase() ?? ""
    return message.includes("segment") && (message.includes("column") || message.includes("schema"))
}

function mapRow(row: SubscriptionRow): Subscription {
    return {
        email: row.email,
        locale: row.locale,
        segment: isSubscriptionSegment(row.segment) ? row.segment : null,
        source: row.source ?? undefined,
        subscribedAt: row.subscribed_at ? new Date(row.subscribed_at).getTime() : Date.now(),
    }
}

export async function findSubscription(email: string): Promise<Subscription | null> {
    const normalizedEmail = email.toLowerCase()

    if (supabaseReady && supabaseAdmin) {
        try {
            const { data, error } = await supabaseAdmin
                .from("subscriptions")
                .select("*")
                .eq("email", normalizedEmail)
                .maybeSingle()

            // maybeSingle() возвращает null для "not found", не ошибку
            // PGRST116 - это код "not found", но maybeSingle() не должен его возвращать
            if (error) {
                console.error("Supabase findSubscription error:", error)
                // В случае ошибки возвращаем null, чтобы не ломать процесс подписки
                return null
            }

            return data ? mapRow(data as SubscriptionRow) : null
        } catch (err) {
            console.error("Unexpected error in findSubscription:", err)
            return null
        }
    }

    const existing = memoryStore.find((s) => s.email.toLowerCase() === normalizedEmail)
    return existing ?? null
}

export async function upsertSubscription(payload: Subscription): Promise<void> {
    const record: SubscriptionRow = {
        email: payload.email.toLowerCase(),
        locale: payload.locale,
        segment: payload.segment,
        source: payload.source ?? null,
        subscribed_at: new Date(payload.subscribedAt).toISOString(),
    }

    if (supabaseReady && supabaseAdmin) {
        try {
            const { error } = await supabaseAdmin.from("subscriptions").upsert({
                ...record,
                subscribed_at: nowIso(),
            }, {
                onConflict: "email"
            })

            if (error) {
                if (isMissingSegmentColumnError(error)) {
                    const { error: retryError } = await supabaseAdmin.from("subscriptions").upsert(
                        {
                            email: record.email,
                            locale: record.locale,
                            source: record.source,
                            subscribed_at: nowIso(),
                        },
                        {
                            onConflict: "email",
                        }
                    )

                    if (!retryError) {
                        return
                    }

                    console.error("Supabase retry without segment failed:", retryError)
                }

                console.error("Supabase upsertSubscription error:", error)
                console.error("Error details:", JSON.stringify(error, null, 2))
                console.error("Record being upserted:", record)
                
                // Если ошибка связана с таблицей, пробуем использовать memory store как fallback
                if (error.code === "PGRST116" || error.message?.includes("relation") || error.message?.includes("does not exist")) {
                    console.warn("Supabase table may not exist, falling back to memory store")
                    const existingIndex = memoryStore.findIndex((s) => s.email.toLowerCase() === record.email)
                    if (existingIndex >= 0) {
                        memoryStore[existingIndex] = { ...payload, subscribedAt: Date.now() }
                    } else {
                        memoryStore.push({ ...payload, subscribedAt: Date.now() })
                    }
                    return
                }
                
                throw error
            }
            return
        } catch (err) {
            console.error("Unexpected error in upsertSubscription:", err)
            // Fallback на memory store в случае критической ошибки
            console.warn("Falling back to memory store due to error")
            const existingIndex = memoryStore.findIndex((s) => s.email.toLowerCase() === record.email)
            if (existingIndex >= 0) {
                memoryStore[existingIndex] = { ...payload, subscribedAt: Date.now() }
            } else {
                memoryStore.push({ ...payload, subscribedAt: Date.now() })
            }
            // Не бросаем ошибку, чтобы подписка всё равно работала
            return
        }
    }

    // Используем memory store если Supabase не настроен
    const existingIndex = memoryStore.findIndex((s) => s.email.toLowerCase() === record.email)
    if (existingIndex >= 0) {
        memoryStore[existingIndex] = { ...payload, subscribedAt: Date.now() }
    } else {
        memoryStore.push({ ...payload, subscribedAt: Date.now() })
    }
}

export async function deleteSubscription(email: string): Promise<void> {
    const normalizedEmail = email.toLowerCase()

    if (supabaseReady && supabaseAdmin) {
        const { error } = await supabaseAdmin.from("subscriptions").delete().eq("email", normalizedEmail)
        if (error) {
            console.error("Supabase deleteSubscription error:", error)
            throw error
        }
        return
    }

    const index = memoryStore.findIndex((s) => s.email.toLowerCase() === normalizedEmail)
    if (index >= 0) {
        memoryStore.splice(index, 1)
    }
}

export async function getAllSubscriptions(): Promise<Subscription[]> {
    if (supabaseReady && supabaseAdmin) {
        try {
            const { data, error } = await supabaseAdmin
                .from("subscriptions")
                .select("*")

            if (error) {
                console.error("Supabase getAllSubscriptions error:", error)
                throw error
            }

            return (data || []).map((row) => mapRow(row as SubscriptionRow))
        } catch (err) {
            console.error("Unexpected error in getAllSubscriptions:", err)
            throw err
        }
    }

    return [...memoryStore]
}

export async function getStats() {
    if (supabaseReady && supabaseAdmin) {
        let data: Array<{ locale: "ru" | "en"; segment?: SubscriptionSegment | null }> = []

        const { data: rowsWithSegment, error } = await supabaseAdmin
            .from("subscriptions")
            .select("locale, segment")

        if (error) {
            if (!isMissingSegmentColumnError(error)) {
                console.error("Supabase getStats error:", error)
                throw error
            }

            const { data: rowsWithoutSegment, error: fallbackError } = await supabaseAdmin
                .from("subscriptions")
                .select("locale")

            if (fallbackError) {
                console.error("Supabase fallback getStats error:", fallbackError)
                throw fallbackError
            }

            data = rowsWithoutSegment ?? []
        } else {
            data = rowsWithSegment ?? []
        }

        const ru = data.filter((d) => d.locale === "ru").length
        const en = data.filter((d) => d.locale === "en").length
        const bySegment = Object.fromEntries(
            SUBSCRIPTION_SEGMENTS.map((segment) => [
                segment,
                data.filter((d) => d.segment === segment).length,
            ])
        ) as Record<SubscriptionSegment, number>
        const unsegmented = data.filter((d) => !isSubscriptionSegment(d.segment)).length

        return {
            total: data.length,
            byLocale: { ru, en },
            bySegment,
            unsegmented,
        }
    }

    const bySegment = Object.fromEntries(
        SUBSCRIPTION_SEGMENTS.map((segment) => [
            segment,
            memoryStore.filter((s) => s.segment === segment).length,
        ])
    ) as Record<SubscriptionSegment, number>
    const unsegmented = memoryStore.filter((s) => !s.segment).length

    return {
        total: memoryStore.length,
        byLocale: {
            ru: memoryStore.filter((s) => s.locale === "ru").length,
            en: memoryStore.filter((s) => s.locale === "en").length,
        },
        bySegment,
        unsegmented,
    }
}

