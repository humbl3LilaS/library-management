import { ReactNode } from "react";
import Image from "next/image";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <main className={"auth-container"}>
            <section className={"auth-form"}>
                <div className={"auth-box"}>
                    <div className={"flex gap-3"}>
                        <Image src={"/icons/logo.svg"} alt={"logo"} width={37} height={37} />
                        <h1 className={"text-2xl font-semibold text-white"}>BookWise</h1>
                    </div>
                    <div>{children}</div>
                </div>
            </section>
            <section className={"h-screen hidden md:block"}>
                <Image
                    src={"/images/auth-illustration.png"}
                    alt={"auth illustration"}
                    width={1000}
                    height={1000}
                    className={"h-full"}
                />
            </section>
        </main>
    );
};

export default Layout;
