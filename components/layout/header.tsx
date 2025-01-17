import Link from "next/link";
import Image from "next/image";
import { HEADER_NAV_ITEMS } from "@/constants";
import NavLink from "@/components/layout/nav-link";

const Header = () => {
    return (
        <header className={"my-10 flex justify-between gap-5"}>
            <Link href="/">
                <Image src={"/icons/logo.svg"} alt={"logo"} width={40} height={40} />
            </Link>
            <ul className={"flex items-center gap-8"}>
                {HEADER_NAV_ITEMS.map((item) => (
                    <NavLink key={item.title} href={item.href} title={item.title} />
                ))}
            </ul>
        </header>
    );
};

export default Header;
