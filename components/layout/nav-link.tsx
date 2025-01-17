"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavLinkProps = {
    title: string;
    href: string;
};

const NavLink = ({ title, href }: NavLinkProps) => {
    const pathname = usePathname();
    return (
        <li>
            <Link
                href={href}
                className={cn(
                    "text-base cursor-pointer capitalize",
                    pathname === href ? "text-light-200" : "text-light-100"
                )}
            >
                {title}
            </Link>
        </li>
    );
};

export default NavLink;
