"use client"

type NotesSection = {
    title: string
    items: string[]
}

type CalculationResultNotesProps = {
    title: string
    intro: string
    sections: NotesSection[]
}

export function CalculationResultNotes({ title, intro, sections }: CalculationResultNotesProps) {
    return (
        <div className="rounded-2xl border border-border/60 bg-muted/40 p-4 md:p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{intro}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
                {sections.map((section) => (
                    <div key={section.title} className="rounded-xl border border-border/50 bg-background/80 p-4">
                        <h4 className="text-sm font-medium text-foreground">{section.title}</h4>
                        <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
                            {section.items.map((item) => (
                                <li key={item} className="flex gap-2">
                                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}
