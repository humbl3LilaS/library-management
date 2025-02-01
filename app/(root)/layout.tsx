import { ReactNode } from "react";
import Header from "@/components/layout/client/header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { updateUserLastActivity } from "@/actions/update-user-last-activity";

const Layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();
    if (!session) {
        redirect("/sign-in");
    }
    after(async () => {
        await updateUserLastActivity(session.user.id);
    });
    return (
        <main
            className={
                "min-h-screen px-5 bg-pattern bg-cover bg-top bg-dark-100 xs:px-10 md:px-16"
            }
        >
            <div className={"mx-auto  max-w-7xl"}>
                <Header />
                <div>{children}</div>
            </div>
        </main>
    );
};

export default Layout;
