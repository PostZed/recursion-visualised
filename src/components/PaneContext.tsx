import { createContext } from "react";
import type { PaneType } from "../lib/custom-event";

export type PaneState = {
    paneType: PaneType,
    hasLoaded: boolean,

}
export type PaneContext = {
    paneState: PaneState[],
    setPaneState: (paneState: PaneState[]) => void,
    // currentlyShowing: PaneType,
    // setCurrentlyShowing: (pane: PaneType) => void
}
export const PaneContext = createContext<PaneContext>({
    paneState: [],
    setPaneState: (paneState) => { },
    // currentlyShowing: "snipSequence",
    // setCurrentlyShowing: (paneName) => { }
})