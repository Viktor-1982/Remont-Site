﻿export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="mt-2 text-lg">Страница не найдена</p>
            <a href="/" className="mt-4 text-primary underline">
                На главную
            </a>
        </div>
    )
}
