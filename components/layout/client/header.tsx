import Link from "next/link";
import Image from "next/image";
import { HEADER_NAV_ITEMS } from "@/constants/client";
import NavLink from "@/components/layout/client/nav-link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import { parseUserAlisa } from "@/lib/utils";

const Header = async () => {
    const session = await auth();

    return (
        <header className={"py-10 flex justify-between gap-5"}>
            <Link href="/public">
                <Image
                    src={"/icons/logo.svg"}
                    alt={"logo"}
                    width={40}
                    height={40}
                />
            </Link>
            <ul className={"flex items-center gap-8"}>
                {HEADER_NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.title}
                        href={item.href}
                        title={item.title}
                    />
                ))}
                <li>
                    <Link href={`/profile/${session?.user.id}`}>
                        <Avatar>
                            <AvatarImage
                                src={"https://github.com/shadcn.png"}
                            />
                            <AvatarFallback>
                                {parseUserAlisa(session?.user.name ?? "")}
                            </AvatarFallback>
                        </Avatar>
                    </Link>
                </li>
            </ul>
        </header>
    );
};

export default Header;
