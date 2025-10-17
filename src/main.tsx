
import "./index.css";
import Description from "./components/Description";
import { mainRoot, descRoot, listRoot, messageRoot } from "./root";
import { createRoot } from "react-dom/client";

// let descRoot = createRoot(document.getElementById("desc-root")!);
// let mainRoot = createRoot(document.getElementById("root")!);

window.addEventListener("demo-finished", () => {
    // mainRoot.unmount();
    descRoot.render(<Description />);
});

descRoot.render(<>
    <Description />
</>)

