import { useState, type JSX, type ReactNode } from "react";
import ItemContainer from "./ItemContainer";
import PartitionContainer from "./PartitionContainer";

export type CombinationContainerProps = {
    /* The list of combinations returned by the recursive function*/
    list: Array<Array<JSX.Element>>,
    /* A list of length 6 contains 2 partitions each of 3 items*/
    partitionCount: number;
}

export default function CombinationContainer({ list, partitionCount }: CombinationContainerProps) {
    const size = list.length;
    const partitionSize = size / partitionCount;
    const [partitions, _] = useState(() => partitionList(list, list.length / partitionCount))
    const [stepInList, setStepInList] = useState(0);

    return <div>
        {partitions.map((partition, i) => {
            return <PartitionContainer
                partition={partition}
                myFirst={i * partitionSize}
                myLast={(i * partitionSize) + partitionSize - 1}
                setStepInList={setStepInList}
                stepInList={stepInList}
            />
        })}
    </div>
}

function partitionList(list: Array<Array<JSX.Element>>, partitionSize: number) {
    const smallLists: Array<Array<Array<JSX.Element>>> = []
    let start: number;
    let end: number

    for (let i = 0; i <= list.length - partitionSize; i += partitionSize) {
        start = i
        end = i + partitionSize
        const smallList = list.slice(start, end);
        smallLists.push(smallList);
    }
    return smallLists;
}

