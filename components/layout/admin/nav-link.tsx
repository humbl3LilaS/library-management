"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type AdminNavLinkProps = {
    title: string;
    href: string;
    icon: string;
};

const NavLink = ({ data }: { data: AdminNavLinkProps }) => {
    const pathname = usePathname();
    return (
        <li key={data.title}>
            <Link
                href={data.href}
                className={cn("link", data.href === pathname && "bg-primary-admin  shadow-sm")}
            >
                <Image
                    src={data.icon}
                    alt={data.title}
                    width={40}
                    height={40}
                    className={cn(
                        "relative size-5",
                        data.href === pathname && "brightness-0 invert"
                    )}
                />
                <span className={cn(data.href === pathname ? "text-white" : "text-dark")}>
                    {data.title}
                </span>
            </Link>
        </li>
    );
};

export default NavLink;
