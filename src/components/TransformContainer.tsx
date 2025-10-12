import { useEffect, useState, type JSX } from "react"
import ItemCard from "./ItemCard";

export type TransformContainerProps = {
    current: Array<JSX.Element>,
    next: Array<JSX.Element>,
    pivotIndex: number
}

export default function TransformContainer({ current, next, pivotIndex }: TransformContainerProps) {
    const pivot = next[pivotIndex];
    const [nodeToRender, setNodeToRender] = useState(current);
    const growEffect = `animate-grow`
    const collapsedEffect = `flex-none w-0 h-0`
    const effectToUse = nodeToRender === current ? collapsedEffect : growEffect;

    useEffect(() => {
        let timeout;
        setTimeout(() => {
            setNodeToRender(next);
        }, 2000)

        return () => clearTimeout(timeout)
    }, [])

    return <div className="flex flex-row items-center">
        {nodeToRender.map((item) => {
            return <ItemCard
                item={item}
                effect={effectToUse}
                isPivot={item === pivot}
                renderMethod={(thing) => thing} />
        })}
    </div>
}