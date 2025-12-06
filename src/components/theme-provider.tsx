"use client"

import * as React from "react"
import {
    ThemeProvider as NextThemesProvider,
    type ThemeProviderProps,
} from "next-themes"

/**
 * Обёртка для NextThemesProvider с кастомными темами.
 * Теперь типобезопасно и без ошибок TS2322.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            {...props}
            themes={["light", "dark"]}
        >
            {children}
        </NextThemesProvider>
    )
}
