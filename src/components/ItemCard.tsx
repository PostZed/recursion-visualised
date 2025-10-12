import type { JSX } from "react"

export type ItemCardProps<T> = {
    item: T
    position?: number
    isPivot: boolean
    renderMethod: (item: T) => JSX.Element
    effect: string
}

export default function ItemCard<T>({ item, position, effect, isPivot,
    renderMethod

}: ItemCardProps<T>) {

    const myColor = isPivot ? `bg-pivot ${effect}` : 'bg-static'
    return <div className={`m-1 rounded-lg border px-1 ${myColor}`}
    >
        {renderMethod(item)}
    </div>
}