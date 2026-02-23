import { useEffect, useState, type JSX } from "react"
import ItemCard from "./ItemCard"
import { PaneLoadedEvent } from "../lib/custom-event"

export type SnipContainerProps = {
    sequence: JSX.Element[],
    snipAfter?: number
}


/**
 * This component is responsible for the "snipping" of the sequence, which is the animation 
 * that occurs when the pivot is removed from the partitions in [TransformContainer.tsx]. 
 * It takes in a sequence and a time after which the snip should occur. After the specified time,
 * it causes the last item in the sequence to animate - to shrink and disappear.
 * 
 * @param param0 
 * @returns 
 */
export default function SnipContainer({
    sequence,
    snipAfter = 1000
}: SnipContainerProps) {

    const snipEffect = `flex-none animate-dissolve`
    const [canBeSnipped, setCanBeSnipped] = useState(false)

    useEffect(() => {
        let nestedTimeout: number;

        /**
         * Set a timeout to start the snip animation after the specified time, and another timeout 
         * to dispatch a custom event to return control to findAllCombinations after the animation is done.
         */
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

    return <div className="flex items-center w-fit mx-auto overflow-auto">
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