import type { JSX } from "react"
import ItemCard from "./ItemCard"

export type ItemContainerProps = {
    items: JSX.Element[],
    pivot: JSX.Element | null,
    extraStyles?: string
    pivotEffect?: string
}

/**
 * A container for the items in the combinations, which renders each item using the ItemCard component. 
 * It takes in an array of items, a pivot item, and some styling information, 
 * and returns a styled div containing the rendered items.
 * @param obj
 * @returns 
 */
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