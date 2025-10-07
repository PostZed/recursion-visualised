
export type ItemCardProps = {
    item: string
    position?: number
    isPivot: boolean
}

export default function ItemCard({ item, position, isPivot }: ItemCardProps) {

    const myColor = isPivot ? 'pivot' : 'static'
    return <div className={`rounded-lg border bg-${myColor}`} >
        {item}
    </div>
}