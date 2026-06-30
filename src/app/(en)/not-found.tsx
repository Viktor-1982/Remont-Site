"use client"

import Link from "next/link"

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight">404</h1>
            <p className="mt-3 text-lg text-muted-foreground">
                Sorry, the page you are looking for could not be found.
            </p>
            <Link
                href="/"
                className="mt-6 text-lg font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
            >
                Back to Home
            </Link>
        </main>
    )
}
