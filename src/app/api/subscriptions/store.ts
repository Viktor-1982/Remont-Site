import { type SubscriptionSegment } from "@/lib/subscription-segments"

export interface Subscription {
    email: string
    locale: "ru" | "en"
    segment: SubscriptionSegment | null
    subscribedAt: number
    source?: string
}

// Temporary in-memory storage (use persistent storage in production)
export const subscriptions: Subscription[] = []

