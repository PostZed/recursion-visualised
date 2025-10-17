import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
    return <div id="layout" className="flex flex-col md:flex-row shadow mx-auto w-full md:w-[70%] h-full">
        {children}
    </div>
}