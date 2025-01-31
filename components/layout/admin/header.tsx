import { auth } from "@/auth";

const AdminLayoutHeader = async () => {
    const session = await auth();
    return (
        <header className={"admin-header"}>
            <div>
                <h2 className={"text-2xl font-semibold text-dark-400"}>{session?.user?.name}</h2>
                <p className={"text-base text-slate-500"}>
                    Monitor all of your users and books here!
                </p>
            </div>
        </header>
    );
};

export default AdminLayoutHeader;
