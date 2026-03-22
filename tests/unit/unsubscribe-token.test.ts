import { describe, expect, it, vi, beforeEach, afterEach } from "vitest"
import {
    buildUnsubscribeUrl,
    createUnsubscribeToken,
    verifyUnsubscribeToken,
} from "@/lib/unsubscribe-token"

describe("unsubscribe token", () => {
    const originalSecret = process.env.UNSUBSCRIBE_SECRET

    beforeEach(() => {
        process.env.UNSUBSCRIBE_SECRET = "test-unsubscribe-secret"
        vi.useFakeTimers()
        vi.setSystemTime(new Date("2026-03-22T12:00:00.000Z"))
    })

    afterEach(() => {
        vi.useRealTimers()

        if (originalSecret === undefined) {
            delete process.env.UNSUBSCRIBE_SECRET
        } else {
            process.env.UNSUBSCRIBE_SECRET = originalSecret
        }
    })

    it("creates and verifies a signed token", () => {
        const token = createUnsubscribeToken("User@Example.com", "en")

        expect(token).toBeTruthy()
        expect(verifyUnsubscribeToken(token)).toEqual({
            valid: true,
            email: "user@example.com",
            locale: "en",
        })
    })

    it("rejects an expired token", () => {
        const token = createUnsubscribeToken(
            "user@example.com",
            "ru",
            Date.now() - 1000
        )

        expect(verifyUnsubscribeToken(token)).toEqual({
            valid: false,
            reason: "Token has expired",
        })
    })

    it("builds unsubscribe urls without exposing email query params", () => {
        const url = buildUnsubscribeUrl(
            "https://renohacks.com",
            "user@example.com",
            "ru"
        )

        expect(url).toMatch(/^https:\/\/renohacks\.com\/api\/unsubscribe\?token=/)
        expect(url).not.toContain("email=")
    })
})
