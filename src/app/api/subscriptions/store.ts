export interface Subscription {
    email: string
    locale: "ru" | "en"
    subscribedAt: number
    source?: string
}

// Temporary in-memory storage (use persistent storage in production)
export const subscriptions: Subscription[] = []

