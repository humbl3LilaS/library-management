import { ReactNode } from "react";
import Header from "@/components/layout/header";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <main className={"root-container"}>
            <div className={"flex-1 mx-auto  max-w-7xl"}>
                <Header />
                <div className={"mt-20 mb-20"}>{children}</div>
            </div>
        </main>
    );
};

export default Layout;
