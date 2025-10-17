import { useEffect, useState } from "react"
import { PaneLoadedEvent } from "../lib/custom-event";

export type DivisionContainerProps = {
    divisionCount: number,
    dropTime?: number
}

export default function DivisionContainer({ divisionCount, dropTime = 1000 }: DivisionContainerProps) {
    let [count, setCount] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            if (count < divisionCount) {
                count++
                setCount(count)
            }

            else {
                window.dispatchEvent(new PaneLoadedEvent("multiplyDivisions"))
            }

        }, dropTime)

        return () => {
            clearInterval(interval);
        }
    }, [])
    return <div className="flex flex-col w-[50%] h-full relative mx-auto">
        {Array.from({ length: divisionCount }).map((_, index) => {
            const hasBorder = index + 1 <= count ? `border` : ""
            const isNewest = count === index + 1;
            const animation = isNewest ? `animate-slide-in` : ""
            return <div className={`${hasBorder} w-full h-6 relative ${animation}`} />
        })
        }
    </div>
}