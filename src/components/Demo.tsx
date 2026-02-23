import type { JSX } from "react";
import { showGroupedPanes, waitForPaneCompletion } from "../lib/pane-manager";
import { getSnipMessage } from "../lib/commentary";
import Commentary from "./Commentary";
import SnipContainer from "./SnipContainer";
import { DemoFinished } from "../lib/custom-event";
import { mainRoot } from "../root";
import StandardLayout from "./StandardLayout";

/**
 * "Slide" the first element of a set so that it occupies every position in the set, that is, 
 * [1,2,3] will yield [
 * [1,2,3],
 * [2,1,3],
 * [1,3,2]
 * ] 
 * This works because the relative order of the other elements remains the same.
 * @param items A set of JSX.Element. In practice, use strings.
 * @param pyramid A 2D array which will eventually contain all the combinations of the set.
 * In this method, we simply push all the combinations we find for [items].
 * @returns An array containing all the combinations of [items]
 */
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

/**
 * Main recursive method for finding all the combinations of a set.
 * @param items The items whose combinations we will find.
 * @param A 2D array to which we continually append the results.
 * @param total The total number of combinations we expect; it helps track if the demonstration is finished.
 * @returns 2D array containing all combinations.
 */
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
            itemsWithoutPivot: baseCaseResult,
            itemsWithPivot: baseCaseResult,
        })
        return baseCaseResult;
    }

    else {
        const length = items.length;
        const lastItem = items[length - 1]
        //"Remove" the last item
        const itemsMinusOne = items.slice(0, length - 1);

        //Will store all combinations of "items"
        const withLastItemAdded: JSX.Element[][] = []

        // messageRoot.render(<Commentary message={getSnipMessage(items.length)} />)
        // listRoot.render(<SnipContainer sequence={items} key={items.length} />)
        mainRoot.render(<StandardLayout
            message={<Commentary message={getSnipMessage(items.length)} />}
            sequence={<SnipContainer sequence={items} key={items.length} />}
        />)
        //Pause method execution as the extra items are "snipped"
        await waitForPaneCompletion("snipSequence");

        const combinations = await findAllCombinations(itemsMinusOne, pyramid, total)

        //Now retrieve `lastItem` and and pre-pend it to each combination
        for (let combination of combinations!) {

            /*We must copy the variable "combination" into a new variable. It shares a pointer with the items in pyramid
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
        })

        //Check if the demonstration is over, i.e all combinations have been found.
        if (withLastItemAdded.length === total) {
            window.dispatchEvent(new DemoFinished());
        }
        return withLastItemAdded;
    }
}

export function factorial(n: number): number {
    if (n === 1)
        return 1;
    if (n === 0)
        return 1;

    else {
        return factorial(n - 1) * n;
    }
}
