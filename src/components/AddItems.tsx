import { useEffect, useMemo, useState, type JSX } from "react"
import ItemContainer from "./ItemContainer";
import { PaneLoadedEvent } from "../lib/custom-event";

export type AddItemsProps = {
    items: JSX.Element[][]
    size: number
    appearanceInterval?: number
}

export default function AddItems({ items, size, appearanceInterval = 1000 }: AddItemsProps) {
    const partitionedArray = useMemo(() => addToPartitions(items, size), [items, size]);
    let [position, setPosition] = useState(-1);

    useEffect(() => {
        const interval = setInterval(() => {
            if (position < size - 1) {
                position++
                setPosition(position)

            }

            else {
                window.dispatchEvent(new PaneLoadedEvent("addItems"));
            }
        }, appearanceInterval);

        return () => {
            clearInterval(interval);
        }
    }, [])

    return <div className="mx-auto w-fit overflow-auto max-h-full">
        {partitionedArray.map((sequence, index) => {
            if (index <= position) {
                return <ItemContainer items={sequence} pivot={null} extraStyles="" />
            }
            else
                return null;
        })}
    </div>

}

/**
 * Puts the results of a recursive call in an array, ready for moving of the pivot
 * @param items Sequence returned by findAllCombinations
 * @param size The size the returned array should be
 * @returns 
 */
export function addToPartitions(items: JSX.Element[][], size: number) {
    const partitionSize = size / items.length;
    //@ts-expect-error
    let partitionedArray: Array<Array<JSX.Element>> = Array.from({ length: size },
        (_, i) => [`${i}`]
    )
        ;

    for (let i = 0; i <= size - partitionSize; i += partitionSize) {
        const itemFromItems = items[Math.floor(i / partitionSize)];
        partitionedArray = partitionedArray.fill(itemFromItems, i, i + partitionSize)
    }
    return partitionedArray;
}