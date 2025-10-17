import { useEffect, useState, type JSX } from "react"
import ItemCard from "./ItemCard"
import { PaneLoadedEvent } from "../lib/custom-event"

export type SnipContainerProps = {
    sequence: JSX.Element[],
    snipAfter?: number
}

export default function SnipContainer({
    sequence,
    snipAfter = 1000
}: SnipContainerProps) {

    const snipEffect = `flex-none animate-dissolve`
    const [canBeSnipped, setCanBeSnipped] = useState(false)

    useEffect(() => {
        let nestedTimeout: number;

        const timeout = setTimeout(() => {
            setCanBeSnipped(true);
            nestedTimeout = setTimeout(() => {
                window.dispatchEvent(new PaneLoadedEvent("snipSequence"));
            }, snipAfter)
        }, snipAfter);

        return () => {
            clearTimeout(timeout);
            clearTimeout(nestedTimeout);
        }
    }, [])

    return <div className="flex items-center w-fit mx-auto h-[100%]">
        {sequence.map((item, index) => {
            return <ItemCard
                item={item}
                effect={snipEffect}
                isPivot={index === sequence.length - 1 && canBeSnipped}
                renderMethod={(elem) => elem}
                shouldHighlightPivot={canBeSnipped} />

        })}
    </div>
}