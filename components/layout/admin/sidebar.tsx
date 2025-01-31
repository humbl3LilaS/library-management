import Image from "next/image";
import { ADMIN_NAV_ITEMS } from "@/constants/admin";
import NavLink from "@/components/layout/admin/nav-link";
import { auth } from "@/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { parseUserAlisa } from "@/lib/utils";

const AdminSideBar = async () => {
    const session = await auth();
    return (
        <aside>
            <div className={"admin-sidebar"}>
                <nav className={"h-full flex flex-col"}>
                    <div className={"logo"}>
                        <Image src={"/icons/admin/logo.svg"} alt={"logo"} height={40} width={40} />
                        <h1>BookWise</h1>
                    </div>
                    <ul className={"h-full mt-10 flex flex-col gap-4"}>
                        {ADMIN_NAV_ITEMS.map((item) => (
                            <NavLink key={item.title} data={item} />
                        ))}
                    </ul>
                    <div className={"user mt-auto"}>
                        <Avatar>
                            <AvatarFallback className={"bg-amber-100"}>
                                {parseUserAlisa(session?.user.name || "US")}
                            </AvatarFallback>
                        </Avatar>
                        <div className={"flex flex-col max-md:hidden"}>
                            <p className={"font-semibold text-dark-200"}>{session?.user?.name}</p>
                            <p className={"font-xs text-light-500"}>{session?.user?.email}</p>
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AdminSideBar;
