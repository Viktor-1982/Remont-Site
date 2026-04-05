import { describe, expect, it } from "vitest"
import {
    SUBSCRIPTION_SEGMENTS,
    getContentSegments,
    isSubscriptionSegment,
} from "@/lib/subscription-segments"

describe("subscription segments", () => {
    it("accepts only known segment keys", () => {
        expect(isSubscriptionSegment("planning-budget")).toBe(true)
        expect(isSubscriptionSegment("ideas-trends")).toBe(true)
        expect(isSubscriptionSegment("mistakes-guides")).toBe(true)
        expect(isSubscriptionSegment("unknown")).toBe(false)
    })

    it("maps calculators to the right newsletter segment", () => {
        expect(
            getContentSegments({
                kind: "calculator",
                slug: "budget",
            })
        ).toEqual(["planning-budget"])

        expect(
            getContentSegments({
                kind: "calculator",
                slug: "color-palette",
            })
        ).toEqual(["ideas-trends"])
    })

    it("maps article rubrics and series to the expected segments", () => {
        expect(
            getContentSegments({
                kind: "article",
                rubric: "mistakes",
            })
        ).toEqual(["mistakes-guides"])

        expect(
            getContentSegments({
                kind: "article",
                series: "budget-planning",
                rubric: "guide",
            })
        ).toEqual(["planning-budget", "mistakes-guides"])
    })

    it("falls back to all segments for unmapped articles", () => {
        expect(
            getContentSegments({
                kind: "article",
                slug: "custom-article",
            })
        ).toEqual([...SUBSCRIPTION_SEGMENTS])
    })
})
