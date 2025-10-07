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
export function findCombinationsForOneOrder<T>(items: T[]) {
    /*
     List<T> noDuplicates = list.stream().distinct().toList();
        list = new ArrayList<>(noDuplicates) ;
        Integer pivotPos = 0;
        T displacer = list.get(pivotPos);
        Integer displacerIndex = pivotPos;
    
        ArrayList<ArrayList<T>> combinations = new ArrayList<>();
    
        for (int i = 0; i < list.size(); i++) {
          Integer indexOfDisplaced = i;
          T displaced = list.get(indexOfDisplaced);
          ArrayList<T> clone = new ArrayList(list);
          clone.set(indexOfDisplaced, displacer);
          clone.set(displacerIndex, displaced);
          displacerIndex = indexOfDisplaced;
          combinations.add(clone);
          list = clone;
        }
    
        return combinations;
    */

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


export function findAllCombinations<T>(items: T[]): Array<Array<T>> | null {
    if (items.length === 0)
        return null
    if (items.length === 1)
        return [items]

    if (items.length === 2)
        return findCombinationsForOneOrder(items);

    else {
        const length = items.length
        const lastItem = items[length - 1]
        let itemsMinusOne = items.slice(0, length - 1);
        const combinations: Array<Array<T>> | null = findAllCombinations(itemsMinusOne)

        const withLastItemAdded: Array<Array<T>> = []
        for (let combination of combinations!) {
            combination.unshift(lastItem);
            const allCombinationsWithLastItem = findCombinationsForOneOrder(combination);
            for (const eachCombination of allCombinationsWithLastItem)
                withLastItemAdded.push(eachCombination)
        }

        return withLastItemAdded;
    }
}

function printAll() {
    const c = findAllCombinations(["Zee", "Monsty", "Schwerzli"])
    let str = ""
    for (const parent of c!) {
        for (const item of parent) {
            str += `${item} `
        }
        str += `\n`
    }
    console.log(str)
}
printAll();
