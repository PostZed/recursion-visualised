import { useLayoutEffect, type JSX } from "react"

export type StandardLayoutProps = {
    sequence: JSX.Element,
    message: JSX.Element
}

/**
 * 
 * @param obj Contains the nodes for the message and the specific pane we're rendering.
 * @returns 
 */
export default function StandardLayout({ message, sequence }: StandardLayoutProps) {

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    })

    return <div className="flex flex-col md:flex-row h-full">
        <div className="m-2 flex-3 overflow-auto shadow">{sequence}</div>
        <div className="m-2 flex-2 md:flex-1 overflow-auto shadow">{message}</div>
    </div>
}