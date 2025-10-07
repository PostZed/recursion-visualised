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
export function* findCombinationsForOneOrder<T>(items: T[]) {

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
    }

    yield combinations

}


export function* findAllCombinations<T>(items: T[])/*: Array<Array<T>> | null */ {
    if (items.length === 0)
        yield null

    if (items.length === 1)
        yield [items]

    if (items.length === 2)
        yield* findCombinationsForOneOrder(items);

    else {
        const length = items.length;
        const lastItem = items[length - 1]
        let itemsMinusOne = items.slice(0, length - 1);
        // yield* findAllCombinations(itemsMinusOne);

        // let combinations: Array<Array<T>> | null = findAll(itemsMinusOne);
        const withLastItemAdded: any[] = []
        // for (let combination of combinations!) {
        //     combination!.unshift(lastItem);
        //     const withExtra = findOne(combination);

        //     for (const eachCombination of withExtra!) {
        //         withLastItemAdded.push(eachCombination)
        //     }
        //     yield* findCombinationsForOneOrder(combination!)

        // }

        for (const combination of findAllCombinations(itemsMinusOne)) {
            combination!.unshift(lastItem);
            yield* findCombinationsForOneOrder(combination)
        }

        //  yield withLastItemAdded;
    }
}


export function printAllCombinations(items: string[]) {
    let str = "";
    const generator = findAllCombinations(items);
    let res: { value: Array<Array<string>>, done: boolean } | any = generator.next();
    let done = res.done;
    let value = res.value;


    do {

        for (const parent of value) {
            for (const item of parent) {
                str += `${item} `
            }
            str += `\n`
        }

        res = generator.next();
        done = res.done;
        value = res.value;
    } while (!done);
    console.log(str);

}

export function findOne<T>(items: T[]) {

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
    }

    return combinations
}

export function findAll<T>(items: T[]): Array<Array<T>> | null {
    if (items.length === 0)
        return null
    if (items.length === 1)
        return [items]
    if (items.length === 2)
        return findOne(items);

    else {
        const length = items.length
        const lastItem = items[length - 1]
        let itemsMinusOne = items.slice(0, length);
        const combinations: Array<Array<T>> | null = findAll(itemsMinusOne)

        const withLastItemAdded: Array<Array<T>> = []
        for (let combination of combinations!) {
            combination.unshift(lastItem);
            const allCombinationsWithLastItem = findOne(combination);
            for (const eachCombination of allCombinationsWithLastItem)
                withLastItemAdded.push(eachCombination)
        }

        return withLastItemAdded;
    }
}

printAllCombinations(["Zee", "Schwerzli", "Monsty"]);