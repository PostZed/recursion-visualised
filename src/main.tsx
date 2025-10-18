import "./index.css";
import Description from "./components/Description";
import { mainRoot } from "./root";
import AnimationDone from "./components/AnimationDone";


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

