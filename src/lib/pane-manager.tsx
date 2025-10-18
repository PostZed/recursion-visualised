
import type { PaneLoadedEvent, PaneType } from "./custom-event";
import AddItems from "../components/AddItems";
import TransformContainer from "../components/TransformContainer";
import type { JSX } from "react";
import Commentary from "../components/Commentary";
import { mainRoot } from "../root";
import StandardLayout from "../components/StandardLayout";

export type PaneManagerProps = {
    itemsWithoutPivot: Array<Array<JSX.Element>>,
    itemsWithPivot: Array<Array<JSX.Element>>
}

export type GroupPaneProps = PaneManagerProps;

export async function showGroupedPanes({
    itemsWithoutPivot,
    itemsWithPivot,
}: GroupPaneProps) {

    const events: Extract<PaneType, "addItems" | "transformItems">[] = [
        "addItems",
        "transformItems"
    ]

    const key = itemsWithoutPivot.length;
    const time = 4000;
    const messageTime = itemsWithPivot.length === 2 ? 2000 : time / itemsWithPivot.length
    const nodes = [
        <AddItems items={itemsWithoutPivot} appearanceInterval={messageTime} size={itemsWithPivot.length} key={key} />,
        <TransformContainer newSequences={itemsWithPivot} pivotAppearanceTime={500} key={key} />
    ]

    const isBaseCase = itemsWithPivot.length === 2
    const baseCaseMsg = `Array length is equal to 2. Base case reached! Return 2 unique arrangements that form the core of the \
    recursive return values.`
    const standardMessage = `Put the results, that is, ${itemsWithoutPivot.length} unique combinations, in an array of length ${itemsWithPivot.length}. `
    const message = isBaseCase ? baseCaseMsg : standardMessage;
    const messages = [
        message,
        `Add the pivot to each of the combinations, each time increasing its index. `
    ]

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        const name = events[i]

        mainRoot.render(<StandardLayout
            message={<Commentary message={messages[i]} />}
            sequence={node}
        />)
        await waitForPaneCompletion(name)
    }


}

let formerListener: ((e: PaneLoadedEvent) => void) | null = null

export async function waitForPaneCompletion(paneName: PaneType) {
    return new Promise<void>((res, _) => {
        if (formerListener)
            window.removeEventListener("paneloaded", formerListener);

        function handlePaneLoaded(event: PaneLoadedEvent) {
            if (event.getPaneType() === paneName) {
                res()
            }
        }


        window.addEventListener("paneloaded", handlePaneLoaded);
    });
}