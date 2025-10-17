import type { JSX } from "react"
import ItemCard from "./ItemCard"

export type ItemContainerProps = {
    items: JSX.Element[],
    pivot: JSX.Element | null,
    extraStyles?: string
    pivotEffect?: string
}

export default function ItemContainer({ items, pivot, extraStyles = "", pivotEffect = "" }: ItemContainerProps) {

    return <div className={`flex flex-row items-center ${extraStyles}`}>
        {items.map((item, index) => {
            return <ItemCard
                item={item}
                position={index}
                key={index}
                isPivot={pivot === item}
                renderMethod={(elem) => elem}
                effect={pivotEffect} />

        })}
    </div>
}