import { timingSafeEqual } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"
import { jsonNoStore } from "@/lib/no-store-response"

export function getConfiguredSecret(envNames: readonly string[]): string | null {
    for (const envName of envNames) {
        const value = process.env[envName]?.trim()
        if (value) {
            return value
        }
    }

    return null
}

export function getRequestSecret(req: NextRequest): string | null {
    const authHeader = req.headers.get("authorization")?.trim()
    const bearerToken = authHeader?.startsWith("Bearer ")
        ? authHeader.slice("Bearer ".length).trim()
        : authHeader
    const secretParam = req.nextUrl.searchParams.get("secret")?.trim()

    return bearerToken || secretParam || null
}

export function safeEqual(left: string, right: string): boolean {
    const leftBuffer = Buffer.from(left)
    const rightBuffer = Buffer.from(right)

    if (leftBuffer.length !== rightBuffer.length) {
        return false
    }

    return timingSafeEqual(leftBuffer, rightBuffer)
}

export function authorizeRequest(
    req: NextRequest,
    envNames: readonly string[],
    errorMessage = "Unauthorized"
):
    | { ok: true; secret: string }
    | { ok: false; response: NextResponse } {
    const configuredSecret = getConfiguredSecret(envNames)

    if (!configuredSecret) {
        return {
            ok: false,
            response: jsonNoStore(
                { error: "Endpoint is not configured" },
                { status: 503 }
            ),
        }
    }

    const requestSecret = getRequestSecret(req)

    if (!requestSecret || !safeEqual(requestSecret, configuredSecret)) {
        return {
            ok: false,
            response: jsonNoStore({ error: errorMessage }, { status: 401 }),
        }
    }

    return { ok: true, secret: configuredSecret }
}
