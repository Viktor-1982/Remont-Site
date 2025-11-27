"use client"

export function HomeBackgroundAnimation() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Мягкий градиент с зеленым цветом авокадо */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-[#87A96B]/[0.03] to-accent/[0.02] animate-gradient-shift" />

            {/* 🧱 Кирпичики (упрощенные прямоугольники) */}
            <div className="absolute inset-0">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div
                        key={`brick-${i}`}
                        className="absolute border border-primary/8 dark:border-primary/12 rounded-sm animate-fade-in-out"
                        style={{
                            left: `${(i * 8.3) % 90}%`,
                            top: `${(i * 12.5) % 85}%`,
                            width: `${40 + (i % 3) * 20}px`,
                            height: `${20 + (i % 2) * 10}px`,
                            animationDelay: `${i * 0.6}s`,
                            animationDuration: `${8 + (i % 4) * 3}s`,
                            transform: `rotate(${(i % 3) * 2 - 2}deg)`,
                        }}
                    />
                ))}
            </div>

            {/* 🎨 Волны краски (плавные кривые) с зеленым цветом авокадо */}
            <div className="absolute inset-0">
                {Array.from({ length: 4 }).map((_, i) => {
                    const isAvocado = i === 1; // Вторая волна зеленого цвета
                    return (
                        <div
                            key={`paint-wave-${i}`}
                            className="absolute opacity-8 dark:opacity-12 animate-paint-flow"
                            style={{
                                left: `${i * 25}%`,
                                top: `${20 + i * 20}%`,
                                width: '200px',
                                height: '100px',
                                background: isAvocado 
                                    ? `radial-gradient(ellipse, #87A96B 0%, #87A96B/40 50%, transparent 80%)`
                                    : `radial-gradient(ellipse, hsl(var(--primary)) 0%, transparent 70%)`,
                                borderRadius: '50%',
                                animationDelay: `${i * 2}s`,
                                animationDuration: `${15 + i * 5}s`,
                                transform: `scale(${0.8 + (i % 2) * 0.4})`,
                            }}
                        />
                    );
                })}
            </div>

            {/* 🔨 Инструменты (упрощенные формы) */}
            <div className="absolute inset-0">
                {Array.from({ length: 8 }).map((_, i) => {
                    // Молоток (прямоугольник + ручка)
                    if (i % 3 === 0) {
                        return (
                            <div
                                key={`tool-hammer-${i}`}
                                className="absolute opacity-5 dark:opacity-8 animate-float"
                                style={{
                                    left: `${(i * 11) % 85}%`,
                                    top: `${(i * 15) % 80}%`,
                                    animationDelay: `${i * 1.2}s`,
                                    animationDuration: `${12 + (i % 3) * 4}s`,
                                }}
                            >
                                {/* Головка молотка */}
                                <div
                                    className="absolute border border-primary/10 rounded-sm"
                                    style={{
                                        width: '24px',
                                        height: '16px',
                                        transform: 'rotate(45deg)',
                                    }}
                                />
                                {/* Ручка */}
                                <div
                                    className="absolute border-l border-primary/10"
                                    style={{
                                        left: '8px',
                                        top: '12px',
                                        width: '1px',
                                        height: '20px',
                                    }}
                                />
                            </div>
                        )
                    }
                    // Кисть (прямоугольник)
                    if (i % 3 === 1) {
                        return (
                            <div
                                key={`tool-brush-${i}`}
                                className="absolute border border-primary/10 rounded-sm opacity-5 dark:opacity-8 animate-float"
                                style={{
                                    left: `${(i * 11) % 85}%`,
                                    top: `${(i * 15) % 80}%`,
                                    width: '20px',
                                    height: '30px',
                                    animationDelay: `${i * 1.2}s`,
                                    animationDuration: `${14 + (i % 3) * 4}s`,
                                    transform: `rotate(${(i % 2) * 20 - 10}deg)`,
                                }}
                            />
                        )
                    }
                    // Отвертка (линия)
                    return (
                        <div
                            key={`tool-screwdriver-${i}`}
                            className="absolute border-l border-primary/10 opacity-5 dark:opacity-8 animate-float"
                            style={{
                                left: `${(i * 11) % 85}%`,
                                top: `${(i * 15) % 80}%`,
                                width: '1px',
                                height: '25px',
                                animationDelay: `${i * 1.2}s`,
                                animationDuration: `${13 + (i % 3) * 4}s`,
                                transform: `rotate(${(i % 3) * 30 - 15}deg)`,
                            }}
                        />
                    )
                })}
            </div>

            {/* 📐 Строительные линии (измерительные) */}
            <div className="absolute inset-0">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={`measure-line-${i}`}
                        className="absolute border-t border-dashed border-primary/6 dark:border-primary/10 animate-fade-in-out"
                        style={{
                            left: `${15 + (i * 14) % 70}%`,
                            top: `${10 + (i * 18) % 75}%`,
                            width: `${60 + (i % 3) * 40}px`,
                            animationDelay: `${i * 0.8}s`,
                            animationDuration: `${10 + (i % 3) * 4}s`,
                            transform: `rotate(${(i % 2) * 5 - 2.5}deg)`,
                        }}
                    />
                ))}
            </div>

            {/* 🧩 Плитка (квадраты) с зеленым цветом авокадо */}
            <div className="absolute inset-0">
                {Array.from({ length: 15 }).map((_, i) => {
                    const isAvocado = i % 5 === 0; // Каждая 5-я плитка зеленого цвета
                    return (
                        <div
                            key={`tile-${i}`}
                            className={`absolute border rounded-sm animate-pulse-slow ${
                                isAvocado 
                                    ? "border-[#87A96B] dark:border-[#9CAF88] bg-[#87A96B]/15 dark:bg-[#9CAF88]/20" 
                                    : "border-primary/6 dark:border-primary/10"
                            }`}
                            style={{
                                left: `${(i * 6.7) % 92}%`,
                                top: `${(i * 9.3) % 88}%`,
                                width: `${30 + (i % 2) * 15}px`,
                                height: `${30 + (i % 2) * 15}px`,
                                animationDelay: `${i * 0.4}s`,
                                animationDuration: `${20 + (i % 4) * 5}s`,
                            }}
                        />
                    );
                })}
            </div>

            {/* Тонкая строительная сетка */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] opacity-30" />
        </div>
    )
}

