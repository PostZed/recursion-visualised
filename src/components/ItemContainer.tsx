import ItemCard from "./ItemCard"

export type ItemContainerProps = {
    items: string[]
}

export default function ItemContainer({ items }) {

    return <div>
        {items.map((item, index) => {
            return <ItemCard item={item} position={index} key={ } isPivot={index === 0} />
        })}
    </div>
}