import navDataJson from "@/components/messages/nav.json"

export type Locale = "ru" | "en"

export interface NavLink {
    href: string
    label: string
    title: string
}

export interface NavLabels {
    desktop: string
    mobile: string
}

export interface Social {
    instagram: string
    pinterest: string
}

export interface HeaderDict {
    socialLabel: string
    ariaMenuOpen: string
    ariaMenuClose: string
}

export interface TOCDict {
    open: string
    close: string
    ariaOpen: string
    ariaClose: string
    mobile: string
}

export interface ThemeDict {
    ariaLabel: string
    light: string
    dark: string
    system: string
    sepia: string
    contrast: string
}

export interface ArticlesDict {
    empty: string
    list: string
    listMobile: string
    minRead: string
    words: string
    related: string
    latest: string
    tagLabel: string
}

export interface FooterSections {
    [key: string]: { href: string; label: string; title: string }
}

export interface FooterDict {
    about: string
    sectionsTitle: string
    sectionsTitleMobile: string
    sections: FooterSections
    contactsTitle: string
    contactsTitleMobile: string
    contactsText: string
    socialLabel: string
    rights: string
}

export interface HeroDict {
    title: string
    subtitle: string
    ctaTrends: string
    ctaDiy: string
}

export interface AssistantDict {
    title: string
    subtitle: string
    inputPlaceholder: string
    button: string
}

export interface NavLocaleData {
    navLabels: NavLabels
    links: NavLink[]
    social: Social
    header: HeaderDict
    toc: TOCDict
    theme: ThemeDict
    articles: ArticlesDict
    footer: FooterDict
    hero: HeroDict
    assistant: AssistantDict
}

export type NavData = {
    [key in Locale]: NavLocaleData
}

// ✅ Экспорт готового объекта
const navData = navDataJson as NavData
export default navData
