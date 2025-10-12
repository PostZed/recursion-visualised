import type { JSX } from "react"
import ItemCard from "./ItemCard"

export type ItemContainerProps = {
    items: JSX.Element[],
    pivot: JSX.Element
}

export default function ItemContainer({ items, pivot }: ItemContainerProps) {

    return <div className="flex flex-row items-center">
        {items.map((item, index) => {
            return <ItemCard
                item={item}
                position={index}
                key={index}
                isPivot={pivot === item}
                renderMethod={(elem) => elem} />

        })}
    </div>
}