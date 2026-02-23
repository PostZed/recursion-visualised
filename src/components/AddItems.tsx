import { useEffect, useMemo, useState, type JSX } from "react"
import ItemContainer from "./ItemContainer";
import { PaneLoadedEvent } from "../lib/custom-event";

export type AddItemsProps = {
    items: JSX.Element[][]
    size: number
    appearanceInterval?: number
}

/**
 * 
 * @param obj Adds all items to the left side of the screen after each return of findAllCombinations()
 * @returns 
 */
export default function AddItems({ items, size, appearanceInterval = 1000 }: AddItemsProps) {
    const partitionedArray = useMemo(() => addToPartitions(items, size), [items, size]);
    /**The index of the last item added to the array. Initially set to -1 because nothing has been added.
     */
    let [position, setPosition] = useState(-1);

    useEffect(() => {
        /**
         * Set an interval to add each item to the list
         */
        const interval = setInterval(() => {
            if (position < size - 1) {
                /**
                 * `position` must be incremented like this, or else it will forever refer to -1. 
                 */
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
 * Puts the results of a call to findAllCombinations in an array, ready for moving of the pivot
 * @param items Sequence returned by findAllCombinations
 * @param size The size the returned array should be
 * @returns An array with "partitions", each partition containing the same sequence, in 
 * preparation for adding and moving the pivot.
 */
export function addToPartitions(items: JSX.Element[][], size: number) {
    //Find the size of each partition
    const partitionSize = size / items.length;
    //@ts-expect-error
    // Make each member of the partitioned array an array
    let partitionedArray: Array<Array<JSX.Element>> = Array.from({ length: size },
        (_, i) => [`${i}`]
    )
        ;


    //Fill the array with the items in their individual partitions.
    for (let i = 0; i <= size - partitionSize; i += partitionSize) {
        const itemFromItems = items[Math.floor(i / partitionSize)];
        partitionedArray = partitionedArray.fill(itemFromItems, i, i + partitionSize)
    }
    return partitionedArray;
}