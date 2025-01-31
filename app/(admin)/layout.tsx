import { ReactNode } from "react";
import "@/styles/admin.css";
import Sidebar from "@/components/layout/admin/sidebar";
import Header from "@/components/layout/admin/header";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <main className={"min-h-screen w-full flex font-ibm-plex-sans"}>
            <Sidebar />
            <div className={"admin-container"}>
                <Header />
                {children}
            </div>
        </main>
    );
};

export default Layout;
