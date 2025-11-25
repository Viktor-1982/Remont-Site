"use client"

export function BackgroundAnimation() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Мягкий градиент */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-accent/[0.02] animate-gradient-shift" />

            {/* Декоративные круги */}
            <div className="absolute inset-0">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={`circle-${i}`}
                        className="absolute rounded-full border border-primary/5 dark:border-primary/10 animate-pulse-slow"
                        style={{
                            left: `${10 + (i * 12) % 80}%`,
                            top: `${15 + (i * 15) % 70}%`,
                            width: `${80 + (i % 3) * 40}px`,
                            height: `${80 + (i % 3) * 40}px`,
                            animationDelay: `${i * 0.8}s`,
                        }}
                    />
                ))}
            </div>

            {/* Тонкие линии */}
            <div className="absolute inset-0">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={`line-${i}`}
                        className="absolute w-px bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10"
                        style={{
                            left: `${20 + (i * 15) % 80}%`,
                            top: '0%',
                            height: '100%',
                            animationDelay: `${i * 0.5}s`,
                        }}
                    />
                ))}
            </div>

            {/* Маленькие точки */}
            <div className="absolute inset-0">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={`dot-${i}`}
                        className="absolute rounded-full bg-primary/8 dark:bg-primary/12 animate-fade-in-out"
                        style={{
                            left: `${(i * 7.3) % 95}%`,
                            top: `${(i * 11.7) % 95}%`,
                            width: '2px',
                            height: '2px',
                            animationDelay: `${i * 0.3}s`,
                            animationDuration: `${4 + (i % 3) * 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Тонкая сетка */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:60px_60px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] opacity-40" />
        </div>
    )
}

