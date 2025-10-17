import type { JSX } from "react"

export type ItemCardProps<T> = {
    item: T
    position?: number
    isPivot: boolean
    renderMethod: (item: T) => JSX.Element
    effect: string
    shouldHighlightPivot?: boolean
}

export default function ItemCard<T>({
    item,
    position,
    effect,
    isPivot,
    renderMethod,
    shouldHighlightPivot = true

}: ItemCardProps<T>) {

    const myColor = isPivot && shouldHighlightPivot ? `bg-pivot ` : 'bg-static'
    const myEffect = isPivot ? effect : ""
    return <div className={`m-1 rounded-lg border px-1 ${myColor} ${myEffect}`}
    >
        {renderMethod(item)}
    </div>
}