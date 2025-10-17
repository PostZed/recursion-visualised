import React, { useState, type JSX } from "react"
import type { PaneType } from "../lib/custom-event"
import { PaneContext, type PaneState } from "./PaneContext"
import SnipContainer from "./SnipContainer"
import AddItems from "./AddItems"
import DivisionContainer from "./DivisionContainer"
import SwitchContainer from "./SwitchContainer"
import TransformContainer from "./TransformContainer"

export type PaneManagerProps = {
    currentlyShowing: PaneType
    /** Used if currently showing is snipPane */
    currentSequence: Array<JSX.Element>,
    /**Used when currentlyShowing is addItems */
    itemsWithoutPivot: Array<Array<JSX.Element>>,
    itemsWithPivot: Array<Array<JSX.Element>>
}

const paneMap: Record<PaneType, Function> = {
    "addItems": AddItems,
    "multiplyDivisions": DivisionContainer,
    "snipSequence": SnipContainer,
    "transformItems": SwitchContainer
}

// export default function PaneManager({
//     currentlyShowing,
//     currentSequence,
//     itemsWithoutPivot,
//     itemsWithPivot
// }: PaneManagerProps) {
//     let [paneState, setPaneState] = useState<PaneState[]>([]);
//     // const [currentlyShowing,setCurrentlyShowing] = useState<PaneType>("snipSequence") ;

//     const obj = {
//         paneState,
//         setPaneState
//         // currentlyShowing,
//         // setCurrentlyShowing
//     }

//     if (currentlyShowing === "snipSequence")
//         return <PaneContext value={obj}>
//             <SnipContainer sequence={currentSequence!} snipAfter={500} />
//         </PaneContext>

//     else {
//         let node: JSX.Element;

//         switch (currentlyShowing) {
//             case "addItems":
//                 node = <AddItems items={itemsWithoutPivot!} size={itemsWithPivot?.length!} />
//                 break;

//             case "multiplyDivisions":
//                 node = <DivisionContainer divisionCount={itemsWithPivot?.length!} />
//                 break;

//             case "transformItems":
//                 node = <TransformContainer newSequences={itemsWithPivot!} />
//         }

//         return <PaneContext value={obj}>
//             {node}
//         </PaneContext>
//     }
// }