import { ReactNode } from "react";
import Header from "@/components/layout/header";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <main
            className={"min-h-screen px-5 bg-pattern bg-cover bg-top bg-dark-100 xs:px-10 md:px-16"}
        >
            <div className={"mx-auto  max-w-7xl"}>
                <Header />
                <div>{children}</div>
            </div>
        </main>
    );
};

export default Layout;
