export type PaneType =
    | "multiplyDivisions"
    | "addItems"
    | "transformItems"
    | "snipSequence"

export class PaneLoadedEvent extends Event {
    #paneType: PaneType
    constructor(paneType: PaneType) {
        super("paneloaded")
        this.#paneType = paneType;
    }

    getPaneType() {
        return this.#paneType;
    }
}

export class DemoFinished extends Event {

    constructor() {
        super("demo-finished")
    }
}