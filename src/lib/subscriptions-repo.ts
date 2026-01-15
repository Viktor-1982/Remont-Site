import { supabaseAdmin, supabaseReady } from "./supabase-admin"
import { subscriptions as memoryStore, type Subscription } from "@/app/api/subscriptions/store"

type SubscriptionRow = {
    email: string
    locale: "ru" | "en"
    source: string | null
    subscribed_at: string | null
}

const nowIso = () => new Date().toISOString()

function mapRow(row: SubscriptionRow): Subscription {
    return {
        email: row.email,
        locale: row.locale,
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
        source: payload.source ?? null,
        subscribed_at: new Date(payload.subscribedAt).toISOString(),
    }

    if (supabaseReady && supabaseAdmin) {
        const { error } = await supabaseAdmin.from("subscriptions").upsert({
            ...record,
            subscribed_at: nowIso(),
        })

        if (error) {
            console.error("Supabase upsertSubscription error:", error)
            throw error
        }
        return
    }

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
        const { data, error } = await supabaseAdmin.from("subscriptions").select("locale")
        if (error) {
            console.error("Supabase getStats error:", error)
            throw error
        }

        const ru = data.filter((d) => d.locale === "ru").length
        const en = data.filter((d) => d.locale === "en").length

        return {
            total: data.length,
            byLocale: { ru, en },
        }
    }

    return {
        total: memoryStore.length,
        byLocale: {
            ru: memoryStore.filter((s) => s.locale === "ru").length,
            en: memoryStore.filter((s) => s.locale === "en").length,
        },
    }
}

