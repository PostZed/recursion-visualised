import "./index.css";
import Description from "./components/Description";
import { mainRoot } from "./root";
import AnimationDone from "./components/AnimationDone";

/**
 * Set up the entry point of the app and the event listener which responds to the end of the demonstration.
 */
window.addEventListener("demo-finished", async () => {

    await new Promise<void>((res, _) => {
        mainRoot.render(<AnimationDone />);
        setTimeout(() => {
            res()
        }, 2000);
    })

    mainRoot.render(<Description />);
});

mainRoot.render(<>
    <Description />
</>)

