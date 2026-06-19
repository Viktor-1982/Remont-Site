import { NextResponse } from "next/server"

export function jsonNoStore<JsonBody>(
    body: JsonBody,
    init?: ResponseInit
): NextResponse<JsonBody> {
    const headers = new Headers(init?.headers)
    headers.set("Cache-Control", "no-store")

    return NextResponse.json(body, {
        ...init,
        headers,
    })
}
