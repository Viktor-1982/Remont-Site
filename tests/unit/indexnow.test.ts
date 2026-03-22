import { describe, expect, it } from "vitest"
import { validateAndNormalizeUrl } from "@/lib/indexnow"

describe("validateAndNormalizeUrl", () => {
    it("accepts same-site https urls", () => {
        expect(validateAndNormalizeUrl("https://renohacks.com/posts/test")).toBe(
            "https://renohacks.com/posts/test"
        )
    })

    it("rejects foreign hosts", () => {
        expect(validateAndNormalizeUrl("https://example.com/posts/test")).toBeNull()
    })

    it("rejects unsupported protocols", () => {
        expect(validateAndNormalizeUrl("javascript:alert(1)")).toBeNull()
    })
})
