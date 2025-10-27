import { useEffect, useState, type JSX } from "react"
import ItemContainer from "./ItemContainer";
import { PaneLoadedEvent } from "../lib/custom-event";

export type SwitchContainerProps = {
    newSequences: Array<Array<JSX.Element>>
    pivotAppearanceTime?: number
}

export default function TransformContainer({ newSequences, pivotAppearanceTime = 1000 }: SwitchContainerProps) {
    let [position, setPosition] = useState(-1);
    const pivot = newSequences[0][0];

    useEffect(() => {
        const interval = setInterval(() => {
            if (position < newSequences.length) {
                position++
                setPosition(position);
                //setPosition(pos => pos + 1)
            }
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

            if (index > position) {
                //w-0 h-0 scale-0
                return <ItemContainer items={newSequence} pivot={pivot}
                    pivotEffect={`hidden`} />
            }
        })}
    </div>


}

