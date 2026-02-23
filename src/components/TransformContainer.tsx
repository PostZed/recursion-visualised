import { useEffect, useState, type JSX } from "react"
import ItemContainer from "./ItemContainer";
import { PaneLoadedEvent } from "../lib/custom-event";

export type SwitchContainerProps = {
    newSequences: Array<Array<JSX.Element>>
    pivotAppearanceTime?: number
}

/**
 * This element coordinates the "addition" of the pivot to the partitions created in [AddItems.tsx].
 * After every "pivotAppearanceTine", it causes the pivot of the item combination in question to animate - to
 * appear and grow.
 * 
 * @param obj obj.newSequences is the list of all the sequences computed so far.
 * @returns 
 */
export default function TransformContainer({ newSequences, pivotAppearanceTime = 1000 }: SwitchContainerProps) {
    // Initial position is 1 because we haven't started the animation.
    let [position, setPosition] = useState(-1);
    //The pivot is the first item of the first sequence
    const pivot = newSequences[0][0];

    useEffect(() => {
        const interval = setInterval(() => {
            if (position < newSequences.length) {
                //Postition must be incremented like this, or else it will forever refer to -1.
                position++
                setPosition(position);

            }

            //Dispatch a custom event to return control to findAllCombinations.
            else {
                window.dispatchEvent(new PaneLoadedEvent("transformItems"))
            }
        }, pivotAppearanceTime)

        return () => {
            clearInterval(interval)
        }
    }, [])


    return <div className="w-fit mx-auto overflow-auto max-h-full">
        {newSequences.map((newSequence, index) => {
            if (position === -1)
                return null

            if (position === index)
                return <ItemContainer items={newSequence} pivot={pivot} pivotEffect="animate-grow" />

            if (position > index)
                return <ItemContainer items={newSequence} pivot={pivot} />

            //Items with higher indices will have their pivots hidden, so that they will appear as
            //they are still in their partitions.
            if (index > position) {

                return <ItemContainer items={newSequence} pivot={pivot}
                    pivotEffect={`hidden`} />
            }
        })}
    </div>


}

