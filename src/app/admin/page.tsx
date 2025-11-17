"use client"

import React, { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Upload, Save, Plus, Eye, X, ExternalLink } from "lucide-react"
import Image from "next/image"
import slugify from "slugify"

interface Article {
    slug: string
    title: string
    date: string
    locale: string
}

interface ArticleData {
    slug: string
    locale: string
    title: string
    description: string
    date: string
    tags: string[]
    cover: string
    author: string
    translationOf: string | null
    draft: boolean
    keywords: string[]
    content: string
}

// ✅ Session-based authentication - используем HTTP-only cookies
// Токены больше не хранятся на клиенте, что значительно безопаснее!

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState("")
    const [articles, setArticles] = useState<Article[]>([])
    const [selectedArticle, setSelectedArticle] = useState<ArticleData | null>(null)
    const [isNewArticle, setIsNewArticle] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [showPreview, setShowPreview] = useState(false)
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
    
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // Поля формы
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        tags: "",
        cover: "",
        author: "Умница",
        translationOf: "",
        draft: false,
        keywords: "",
        content: "",
        locale: "ru",
        slug: "",
    })

    // ✅ Session-based аутентификация через API
    const handleLogin = async () => {
        if (!password) {
            alert("Введите пароль")
            return
        }

        try {
            setIsLoading(true)
            
            // Отправляем пароль на сервер для создания сессии
            const response = await fetch("/api/admin/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
                credentials: "include", // ✅ Важно: отправляем cookies
            })

            if (response.ok) {
                // ✅ Сессия создана, HTTP-only cookie установлен
                setIsAuthenticated(true)
                await loadArticles()
            } else {
                const data = await response.json()
                alert(data.error || "Неверный пароль")
            }
        } catch (error) {
            console.error("Login error:", error)
            alert("Ошибка при входе. Попробуйте снова.")
        } finally {
            setIsLoading(false)
        }
    }

    // Загрузить список статей
    const loadArticles = async () => {
        try {
            setIsLoading(true)
            // ✅ Используем cookies вместо Bearer token
            const response = await fetch("/api/admin/articles", {
                credentials: "include", // ✅ Важно: отправляем cookies
            })
            
            if (response.status === 401) {
                // Сессия истекла или не авторизован
                setIsAuthenticated(false)
                return
            }
            
            const data = await response.json()
            setArticles(data.articles || [])
        } catch (error) {
            console.error("Error loading articles:", error)
        } finally {
            setIsLoading(false)
        }
    }

    // Загрузить конкретную статью
    const loadArticle = async (slug: string, locale: string = "ru") => {
        try {
            setIsLoading(true)
            // ✅ Используем cookies вместо Bearer token
            const response = await fetch(`/api/admin/articles/${slug}?locale=${locale}`, {
                credentials: "include", // ✅ Важно: отправляем cookies
            })
            if (response.ok) {
                const data = await response.json()
                setSelectedArticle(data)
                setFormData({
                    title: data.title,
                    description: data.description,
                    date: data.date,
                    tags: data.tags.join(", "),
                    cover: data.cover,
                    author: data.author,
                    translationOf: data.translationOf || "",
                    draft: data.draft,
                    keywords: data.keywords.join(", "),
                    content: data.content,
                    locale: data.locale,
                    slug: data.slug,
                })
                setIsNewArticle(false)
                setSlugManuallyEdited(false)
            }
        } catch (error) {
            console.error("Error loading article:", error)
        } finally {
            setIsLoading(false)
        }
    }

    // Создать новую статью
    const handleNewArticle = () => {
        setSelectedArticle(null)
        setIsNewArticle(true)
        setFormData({
            title: "",
            description: "",
            date: new Date().toISOString().split("T")[0],
            tags: "",
            cover: "",
            author: "Умница",
            translationOf: "",
            draft: false,
            keywords: "",
            content: "",
            locale: "ru",
            slug: "",
        })
        setSlugManuallyEdited(false)
    }

    // Безопасное чтение ошибки из Response
type ErrorResponse = { error?: string; message?: string } | string

const readErrorResponse = async (res: Response): Promise<ErrorResponse> => {
        try {
            // Попытка распарсить JSON
            return (await res.json()) as { error?: string; message?: string }
        } catch {
            try {
                // Фолбэк к тексту
                const text = await res.text()
                return text.trim() ? { message: text } : { message: res.statusText }
            } catch {
                return { message: res.statusText }
            }
        }
    }

    // Сохранить статью
    const handleSave = async () => {
        try {
            setIsLoading(true)
            const tags = formData.tags.split(",").map(t => t.trim()).filter(Boolean)
            const keywords = formData.keywords.split(",").map(k => k.trim()).filter(Boolean)

            const payload = {
                ...formData,
                tags,
                keywords,
            }

            // Сервер ожидает POST/PUT на /api/admin/articles (без :slug в пути)
            const url = "/api/admin/articles"
            const method = isNewArticle ? "POST" : "PUT"

            // ✅ Используем cookies вместо Bearer token
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // ✅ Важно: отправляем cookies
                body: JSON.stringify({
                    ...payload,
                    slug: selectedArticle?.slug || formData.slug,
                    locale: formData.locale,
                }),
            })

            if (response.status === 401) {
                // Сессия истекла
                setIsAuthenticated(false)
                alert("Сессия истекла. Пожалуйста, войдите снова.")
                return
            }
            
            if (response.ok) {
                alert("Статья сохранена!")
                loadArticles()
                if (isNewArticle) {
                    const data = await response.json()
                    await loadArticle(data.slug, formData.locale)
                }
            } else {
                const error = await readErrorResponse(response)
                const message = typeof error === "string" ? error : (error?.error || error?.message || `HTTP ${response.status}`)
                alert(`Ошибка: ${message}`)
            }
        } catch (error) {
            console.error("Error saving article:", error)
            alert("Ошибка при сохранении")
        } finally {
            setIsLoading(false)
        }
    }

    // Загрузить изображение и вставить в текст
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const textarea = textareaRef.current
        if (!textarea) return

        // Получаем позицию курсора
        const cursorPos = textarea.selectionStart
        const textBefore = formData.content.substring(0, cursorPos)
        const textAfter = formData.content.substring(cursorPos)

        try {
            setUploadingImage(true)

            // Определяем slug статьи для папки изображений
            // Если это новая статья без slug, используем временное имя на основе заголовка
            let articleSlug = selectedArticle?.slug || formData.slug
            if (!articleSlug && formData.title) {
                articleSlug = slugify(formData.title, { lower: true, strict: true, locale: "ru" }) || "temp"
            }
            if (!articleSlug) {
                alert("Сначала укажите slug или заголовок статьи")
                return
            }

            const formDataUpload = new FormData()
            formDataUpload.append("file", file)
            formDataUpload.append("articleSlug", articleSlug)

            // Выбираем API в зависимости от настройки
            // Если есть GITHUB_TOKEN - используем автокоммит, иначе обычную загрузку
            const useAutoCommit = process.env.NEXT_PUBLIC_USE_GIT_AUTO_COMMIT === "true"
            const apiEndpoint = useAutoCommit 
                ? "/api/admin/upload-image-auto"
                : "/api/admin/upload-image"

            // ✅ Используем cookies вместо Bearer token
            const response = await fetch(apiEndpoint, {
                method: "POST",
                credentials: "include", // ✅ Важно: отправляем cookies
                body: formDataUpload,
            })

            if (response.ok) {
                const data = await response.json()
                
                // Вставляем markdown код изображения в позицию курсора
                const imageMarkdown = `\n\n![Описание изображения](${data.path})\n\n`
                const newContent = textBefore + imageMarkdown + textAfter
                
                setFormData(prev => ({ ...prev, content: newContent }))

                // Восстанавливаем позицию курсора после вставки
                setTimeout(() => {
                    if (textarea) {
                        const newCursorPos = cursorPos + imageMarkdown.length
                        textarea.focus()
                        textarea.setSelectionRange(newCursorPos, newCursorPos)
                    }
                }, 10)
            } else {
                alert("Ошибка при загрузке изображения")
            }
        } catch (error) {
            console.error("Error uploading image:", error)
            alert("Ошибка при загрузке изображения")
        } finally {
            setUploadingImage(false)
            // Сбрасываем input чтобы можно было загрузить тот же файл снова
            event.target.value = ""
        }
    }

    // Загрузка обложки и установка поля cover
    const handleCoverUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        try {
            setUploadingImage(true)

            // Вычисляем slug для папки
            let articleSlug = selectedArticle?.slug || formData.slug
            if (!articleSlug && formData.title) {
                articleSlug = slugify(formData.title, { lower: true, strict: true, locale: "ru" }) || "temp"
            }
            if (!articleSlug) {
                alert("Сначала укажите slug или заголовок статьи")
                return
            }

            const formDataUpload = new FormData()
            formDataUpload.append("file", file)
            formDataUpload.append("articleSlug", articleSlug)

            const useAutoCommit = process.env.NEXT_PUBLIC_USE_GIT_AUTO_COMMIT === "true"
            const apiEndpoint = useAutoCommit
                ? "/api/admin/upload-image-auto"
                : "/api/admin/upload-image"

            // ✅ Используем cookies вместо Bearer token
            const response = await fetch(apiEndpoint, {
                method: "POST",
                credentials: "include", // ✅ Важно: отправляем cookies
                body: formDataUpload,
            })

            if (response.ok) {
                const data = await response.json()
                setFormData(prev => ({ ...prev, cover: data.path }))
            } else {
                alert("Ошибка при загрузке обложки")
            }
        } catch (e) {
            console.error("Cover upload error:", e)
            alert("Ошибка при загрузке обложки")
        } finally {
            setUploadingImage(false)
            event.target.value = ""
        }
    }

    // ✅ Выход из системы
    const handleLogout = async () => {
        try {
            await fetch("/api/admin/auth/logout", {
                method: "POST",
                credentials: "include", // ✅ Важно: отправляем cookies
            })
            setIsAuthenticated(false)
            setPassword("")
            setSelectedArticle(null)
            setArticles([])
        } catch (error) {
            console.error("Logout error:", error)
            // Выходим даже при ошибке
            setIsAuthenticated(false)
            setPassword("")
        }
    }

    // ✅ Проверка сессии при загрузке
    React.useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch("/api/admin/auth/session", {
                    credentials: "include",
                })
                const data = await response.json()
                if (data.authenticated) {
                    setIsAuthenticated(true)
                    // Загружаем статьи только если авторизованы
                    const articlesResponse = await fetch("/api/admin/articles", {
                        credentials: "include",
                    })
                    if (articlesResponse.ok) {
                        const articlesData = await articlesResponse.json()
                        setArticles(articlesData.articles || [])
                    }
                }
            } catch {
                // Игнорируем ошибки при проверке сессии
            }
        }
        checkSession()
    }, [])

    // Если не авторизован, показываем форму входа
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Вход в админ-панель</CardTitle>
                        <CardDescription>
                            Введите пароль для доступа
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="password">Пароль</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                                placeholder="Введите пароль"
                            />
                        </div>
                            <Button onClick={handleLogin} className="w-full" disabled={isLoading}>
                                {isLoading ? "Вход..." : "Войти"}
                            </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Подсобный расчёт EN-ссылки
    const currentSlug = selectedArticle?.slug || formData.slug
    const baseKey = (selectedArticle?.translationOf || formData.translationOf || currentSlug || "").trim()
    const englishUrl = baseKey ? `/en/posts/${baseKey}` : ""

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Заголовок */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Админ-панель</h1>
                        <p className="text-muted-foreground">Управление статьями</p>
                    </div>
                    <div className="flex gap-2">
                        {englishUrl && (
                            <Button
                                variant="outline"
                                onClick={() => window.open(englishUrl, "_blank")}
                                title="Открыть английскую версию"
                            >
                                <ExternalLink className="size-4" />
                                EN-страница
                            </Button>
                        )}
                        <Button variant="outline" onClick={handleNewArticle}>
                            <Plus className="size-4" />
                            Новая статья
                        </Button>
                        <Button variant="outline" onClick={handleLogout}>
                            <X className="size-4" />
                            Выйти
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-[300px_1fr] gap-6">
                    {/* Список статей */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Статьи</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <p className="text-sm text-muted-foreground">Загрузка...</p>
                            ) : (
                                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                                    {articles.map((article) => (
                                        <button
                                            key={`${article.slug}-${article.locale}`}
                                            onClick={() => loadArticle(article.slug, article.locale)}
                                            className="w-full text-left p-2 rounded hover:bg-accent transition-colors"
                                        >
                                            <div className="font-medium text-sm">{article.title}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {article.locale.toUpperCase()} • {article.date}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Редактор */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {isNewArticle ? "Новая статья" : "Редактирование статьи"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Основные поля */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="title">Заголовок *</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => {
                                            const newTitle = e.target.value
                                            setFormData(prev => ({ ...prev, title: newTitle }))
                                            if (!slugManuallyEdited) {
                                                const auto = slugify(newTitle, { lower: true, strict: true, locale: "ru" })
                                                setFormData(prev => ({ ...prev, slug: auto }))
                                            }
                                        }}
                                        placeholder="Заголовок статьи"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="slug">Slug (URL)</Label>
                                    <Input
                                        id="slug"
                                        value={formData.slug}
                                        onChange={(e) => {
                                            setFormData(prev => ({ ...prev, slug: e.target.value }))
                                            setSlugManuallyEdited(true)
                                        }}
                                        placeholder="slug-stati"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description">Описание *</Label>
                                <Input
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Краткое описание статьи"
                                />
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="date">Дата</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="locale">Язык</Label>
                                    <select
                                        id="locale"
                                        value={formData.locale}
                                        onChange={(e) => setFormData(prev => ({ ...prev, locale: e.target.value }))}
                                        className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                                    >
                                        <option value="ru">Русский</option>
                                        <option value="en">English</option>
                                    </select>
                                </div>
                                <div>
                                    <Label htmlFor="author">Автор</Label>
                                    <Input
                                        id="author"
                                        value={formData.author}
                                        onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                                    />
                                </div>
                            </div>

                            {/* Поле связи с EN-версией */}
                            <div>
                                <Label htmlFor="translationOf">translationOf (EN slug, опционально)</Label>
                                <Input
                                    id="translationOf"
                                    value={formData.translationOf}
                                    onChange={(e) => setFormData(prev => ({ ...prev, translationOf: e.target.value }))}
                                    placeholder="Например: 5-renovation-mistakes"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Укажите slug английской версии. Если пусто — русская статья работает без EN-дубликата.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="tags">Теги (через запятую)</Label>
                                    <Input
                                        id="tags"
                                        value={formData.tags}
                                        onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                                        placeholder="ремонт, интерьер, дизайн"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="cover">Обложка (путь к изображению)</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="cover"
                                            value={formData.cover}
                                            onChange={(e) => setFormData(prev => ({ ...prev, cover: e.target.value }))}
                                            placeholder="/images/article/cover.png"
                                        />
                                        <input
                                            type="file"
                                            id="cover-upload"
                                            accept="image/*"
                                            onChange={handleCoverUpload}
                                            className="hidden"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => document.getElementById("cover-upload")?.click()}
                                            disabled={uploadingImage}
                                        >
                                            <Upload className="size-4" />
                                            {uploadingImage ? "Загрузка..." : "Загрузить"}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="keywords">Ключевые слова (через запятую)</Label>
                                <Input
                                    id="keywords"
                                    value={formData.keywords}
                                    onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                                    placeholder="ремонт квартиры, советы по ремонту"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="draft"
                                    checked={formData.draft}
                                    onChange={(e) => setFormData(prev => ({ ...prev, draft: e.target.checked }))}
                                    className="size-4"
                                />
                                <Label htmlFor="draft">Черновик</Label>
                            </div>

                            {/* Редактор контента */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <Label htmlFor="content">Содержание статьи (MDX) *</Label>
                                    <div className="flex gap-2">
                                        <input
                                            type="file"
                                            id="image-upload"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => document.getElementById("image-upload")?.click()}
                                            disabled={uploadingImage}
                                        >
                                            <Upload className="size-4" />
                                            {uploadingImage ? "Загрузка..." : "Вставить фото"}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setShowPreview(!showPreview)}
                                        >
                                            <Eye className="size-4" />
                                            {showPreview ? "Скрыть превью" : "Превью"}
                                        </Button>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <textarea
                                        ref={textareaRef}
                                        id="content"
                                        value={formData.content}
                                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                        placeholder="Напишите содержимое статьи здесь. Поставьте курсор в нужное место и нажмите 'Вставить фото' чтобы добавить изображение."
                                        className="w-full min-h-[500px] rounded-md border border-input bg-transparent px-3 py-2 text-sm font-mono"
                                        style={{ resize: "vertical" }}
                                    />
                                    {showPreview && (
                                        <div className="border rounded-md p-4 bg-muted/50 overflow-auto max-h-[500px]">
                                            <div className="prose dark:prose-invert max-w-none">
                                                {formData.content.split("\n").map((line, i) => {
                                                    const imageMatch = line.match(/!\[(.*?)\]\((.*?)\)/)
                                                    if (imageMatch) {
                                                        return (
                                                            <div key={i} className="my-4">
                                                                <Image
                                                                    src={imageMatch[2]}
                                                                    alt={imageMatch[1]}
                                                                    width={800}
                                                                    height={600}
                                                                    className="rounded-lg w-full h-auto"
                                                                />
                                                                <p className="text-sm text-muted-foreground text-center mt-2">
                                                                    {imageMatch[1]}
                                                                </p>
                                                            </div>
                                                        )
                                                    }
                                                    return <p key={i}>{line || <br />}</p>
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    💡 Подсказка: Поставьте курсор в нужное место текста и нажмите &quot;Вставить фото&quot;. 
                                    Изображение будет автоматически добавлено в эту позицию.
                                </p>
                            </div>

                            {/* Кнопка сохранения */}
                            <div className="flex justify-end">
                                <Button onClick={handleSave} disabled={isLoading}>
                                    <Save className="size-4" />
                                    {isLoading ? "Сохранение..." : "Сохранить статью"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

