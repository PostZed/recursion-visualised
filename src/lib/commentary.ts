export function getSnipMessage(position: number) {
    return `Removing item at position ${position}.`;
}

export function getBaseCaseMessage() {
    return `The list is now 2 items long. Base case reached! `
}

export function getTransformString(withoutPivotSize: number, withPivotSize: number) {
    return `Move the pivot through all the positions in the combinations returned by the \
previous recursive calls. The resulting list is ${withPivotSize} \
(factorial of ${withoutPivotSize} ) items long.`
}