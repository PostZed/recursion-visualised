/**
 * Find all the combinations possible for a list of items that follow a particular order.
 * E.g all the combinations of an array [a,b,c]
 * The function will move a's index, but b and c will always be in the same position 
 * relative to each other.
 * The call will return 
 * [[a,b,c],[b,a,c],[b,c,a]] 
 * 
 * 
 * @param items 
 * @returns 
 */
export function findCombinationsForOneOrder<T>(items: T[], pyramid: Array<Array<T>>) {

    const setOfItems = new Set(items);
    items = Array.from(setOfItems);
    let displacerIndex = 0;
    const displacer = items[displacerIndex]

    const combinations: Array<Array<T>> = [];

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


export function findAllCombinations<T>(items: T[], pyramid: Array<Array<T>>) {
    if (items.length === 0)
        return null

    if (items.length === 1)
        return [items]

    if (items.length === 2) {
        return findCombinationsForOneOrder(items, pyramid);
    }

    else {
        const length = items.length;
        const lastItem = items[length - 1]
        let itemsMinusOne = items.slice(0, length - 1);

        const withLastItemAdded: any[] = []

        const combinations = findAllCombinations(itemsMinusOne, pyramid)

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

        return withLastItemAdded;
    }
}


export function printAllCombinations(items: string[]) {
    let str = ""
    const pyramid: string[][] = []
    findAllCombinations(items, pyramid);
    for (const parent of pyramid) {
        for (const child of parent) {
            str += `${child} `
        }
        str += `\n`
    }

    console.log(str);

}

