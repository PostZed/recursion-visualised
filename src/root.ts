import { createRoot } from "react-dom/client";

export const mainRoot = createRoot(document.getElementById("root")!);
export const descRoot = createRoot(document.getElementById("desc-root")!);
export const listRoot = createRoot(document.getElementById("list-pane")!)
export const messageRoot = createRoot(document.getElementById("message")!)