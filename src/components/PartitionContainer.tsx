import { useEffect, useState, type JSX, type ReactNode } from "react"
import ItemContainer from "./ItemContainer";

export type PartitionContainerProps = {
    partition: Array<Array<JSX.Element>>
    //   start: boolean
    myFirst: number
    myLast: number
    stepInList: number,
    setStepInList: any
}

export default function PartitionContainer({
    partition,
    stepInList,
    myFirst,
    myLast,
    setStepInList
}: PartitionContainerProps) {

    const pivot = partition[0][0]
    const start = stepInList >= myFirst && stepInList <= myLast;
    let [myNodes, setMyNodes] = useState<ReactNode[]>(() => {
        //return [<ItemContainer items={partition[0]} pivot={pivot} />];
        return []
    });
    const [done, setDone] = useState(false);
    let [step, setStep] = useState(0)
    const intervalTime = 1000

    useEffect(() => {
        let interval: number
        if (start === true && done === false) {
            interval = setInterval(() => {
                if (step <= partition.length - 1) {
                    const combination = partition[step]
                    const currentNode = <ItemContainer items={combination} pivot={pivot} />
                    myNodes = [...myNodes, currentNode]
                    //  setMyNodes((nodes) => [...nodes, currentNode])
                    setMyNodes(myNodes)
                    // setStep((curr_step) => curr_step + 1);
                    step++
                    setStep(step)
                    // setStepInList((s: number) => {
                    //     return s + 1;
                    // });
                    stepInList++
                    setStepInList(stepInList)
                }
                else {
                    setDone(true);
                }

            }, intervalTime)
        }

        return () => {
            if (interval !== undefined)
                clearInterval(interval);
        }
    }, [done, start])
    return <div>
        {myNodes}
    </div>
} 