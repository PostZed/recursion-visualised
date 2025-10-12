import type { JSX } from "react";
import CombinationContainer from "./components/CombinationContainer";
import { createRoot } from "react-dom/client";
import TransformContainer from "./components/TransformContainer";
import "./index.css"

const listPaneRoot = createRoot(document.getElementById("list-pane")!);
let transformNodes: JSX.Element[] = []

export function findCombinationsForOneOrder(items: JSX.Element[], pyramid: Array<Array<JSX.Element>>) {

    const setOfItems = new Set(items);
    items = Array.from(setOfItems);
    let displacerIndex = 0;
    const displacer = items[displacerIndex]

    const combinations: Array<Array<JSX.Element>> = [];

    for (let i = 0; i < items.length; i++) {
        const displacedIndex = i
        const displaced = items[displacedIndex]
        const cloneOfItems = Array.from(items);
        cloneOfItems[displacedIndex] = displacer;
        cloneOfItems[displacerIndex] = displaced
        displacerIndex = displacedIndex
        combinations.push(cloneOfItems)
        items = cloneOfItems
        pyramid.push(items)
    }


    return combinations

}


export async function findAllCombinations(items: JSX.Element[], pyramid: Array<Array<JSX.Element>>) {
    if (items.length === 0)
        return null

    if (items.length === 1)
        return [items]

    if (items.length === 2) {
        const c = findCombinationsForOneOrder(items, pyramid)

        for (let i = 0; i < c.length; i++) {
            const list = c[i]
            const listMinusOne = [items[0]]
            const currentTransformNode =
                <TransformContainer current={listMinusOne} next={list} pivotIndex={i} />
            //  transformNodes.push(currentTransformNode);
            transformNodes = [...transformNodes, currentTransformNode]
            listPaneRoot.render(transformNodes)
            await new Promise((res, _) => {
                setTimeout(res, 2000);
            })
        }

        return c;
    }

    else {
        const length = items.length;
        const lastItem = items[length - 1]
        let itemsMinusOne = items.slice(0, length - 1);

        const withLastItemAdded: any[] = []

        const combinations = await findAllCombinations(itemsMinusOne, pyramid)

        for (let combination of combinations!) {
            /*We must copy combinations into a new variable. It shares a pointer with the items in pyramid
            and mutating it changes items in pyramid, which we DON'T want to do.
            */
            const ersatz = Array.from(combination)
            ersatz.unshift(lastItem)
            const withExtra = findCombinationsForOneOrder(ersatz, pyramid)
            for (const eachCombination of withExtra) {
                withLastItemAdded.push(eachCombination);
            }
        }
        transformNodes = [];
        for (let i = 0; i < withLastItemAdded!.length; i++) {
            const list = withLastItemAdded[i];
            const partitionSize = withLastItemAdded.length / combinations!.length
            const listMinusOne = combinations![Math.floor(i / partitionSize)];
            const currentTransformNode =
                <TransformContainer
                    current={listMinusOne}
                    next={list}
                    key={list}
                    pivotIndex={Math.floor(i % partitionSize)} />
            // transformNodes.push(currentTransformNode)
            transformNodes = [...transformNodes, currentTransformNode]
            listPaneRoot.render(transformNodes);
            await new Promise((res, _) => {
                setTimeout(res, 2000);
            })
        }



        return withLastItemAdded;
    }
}

findAllCombinations(["Zee", "Schwerzli", "Monsty", "Darcy"], []);

