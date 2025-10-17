
import { factorial, findAllCombinations } from "./Demo"
import { descRoot } from "../root";
import type { JSX } from "react";
//import { createRoot } from "react-dom/client";


export default function Description() {

    async function handleClick() {
        descRoot.render(<></>);

        const list = ["Red", "Orange", "Yellow", "Green"]
        await findAllCombinations(list as unknown as JSX.Element[], [], factorial(list.length));
    }

    return <div className="bg-gray-50 shadow">
        <h1>Find all the combinations of a set using a simple recursive algorithm.</h1>
        <div>
            <p> Understand how recursion works by viewing this simple demonstration using HTML, CSS and JavaScript.</p>
            <p>The task is simple: Find all of the combinations of the members of a set. For example,
                find all the combinations of <code>[Red,Orange,Yellow]</code>.  </p>
            <p>The number of combinations is equal to factorial of the size of the set.</p>
            <p>Click <span>Start</span> to start the recursive algorithm.</p>
            <button className="bg-pink-300 rounded-md hover:bg-pink-500 hover:scale-110 w-fit display-block p-1 mx-auto"
                onClick={handleClick}>Start</button>
        </div>
    </div>
}