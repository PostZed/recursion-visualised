import type { JSX } from "react";
import { showGroupedPanes, waitForPaneCompletion } from "../lib/pane-manager";
import { getSnipMessage } from "../lib/commentary";
import Commentary from "./Commentary";
import SnipContainer from "./SnipContainer";
import { DemoFinished } from "../lib/custom-event";
import { listRoot, messageRoot } from "../root";


export function findCombinationsForOneOrder(items: JSX.Element[], pyramid: JSX.Element[][]) {

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


export async function findAllCombinations(
    items: JSX.Element[],
    pyramid: JSX.Element[][] = [],
    total: number) {
    if (items.length === 0)
        return null

    if (items.length === 1)
        return [items]

    if (items.length === 2) {
        const baseCaseResult = findCombinationsForOneOrder(items, pyramid)

        await showGroupedPanes({
            root: listRoot,
            itemsWithoutPivot: baseCaseResult,
            itemsWithPivot: baseCaseResult,
            messageRoot: messageRoot
        })
        return baseCaseResult;
    }

    else {
        const length = items.length;
        const lastItem = items[length - 1]
        let itemsMinusOne = items.slice(0, length - 1);

        const withLastItemAdded: JSX.Element[][] = []

        messageRoot.render(<Commentary message={getSnipMessage(items.length)} />)
        listRoot.render(<SnipContainer sequence={items} key={items.length} />)
        await waitForPaneCompletion("snipSequence");

        const combinations = await findAllCombinations(itemsMinusOne, pyramid, total)

        for (let combination of combinations!) {
            /*We must copy combinations into a new variable. It shares a pointer with the items in pyramid
            and mutating it changes items in pyramid, which we DON'T want to do.
            */
            const copy = Array.from(combination)
            copy.unshift(lastItem)
            const withExtra = findCombinationsForOneOrder(copy, pyramid)
            for (const eachCombination of withExtra) {
                withLastItemAdded.push(eachCombination);
            }
        }

        await showGroupedPanes({
            itemsWithoutPivot: combinations!,
            itemsWithPivot: withLastItemAdded,
            root: listRoot,
            messageRoot: messageRoot
        })

        if (withLastItemAdded.length === total) {
            window.dispatchEvent(new DemoFinished());
        }
        return withLastItemAdded;
    }
}

export function factorial(n: number) {
    if (n === 1)
        return 1;
    if (n === 0)
        return 0;

    else {
        return factorial(n - 1) * n;
    }
}
