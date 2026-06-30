"use client"

import Link from "next/link"

export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <h1 className="text-5xl font-extrabold tracking-tight">404</h1>
            <p className="mt-3 text-lg text-muted-foreground">
                Извините, страница не найдена.
            </p>
            <Link
                href="/ru"
                className="mt-6 text-lg font-medium underline underline-offset-4 text-foreground hover:text-primary transition-colors"
            >
                На главную
            </Link>
        </main>
    )
}
