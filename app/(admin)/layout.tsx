import { ReactNode } from "react";
import "@/styles/admin.css";
import Sidebar from "@/components/layout/admin/sidebar";
import Header from "@/components/layout/admin/header";
import { checkUserRole } from "@/actions/check-user-role";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: ReactNode }) => {
    const role = await checkUserRole();
    if (role !== "ADMIN") {
        return redirect("/");
    }
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
