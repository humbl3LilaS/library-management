"use client";
import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const NavBreadcrumb = () => {
    const pathname = usePathname();
    const segments = pathname.substring(1).split("/");
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {segments.map((item, idx) => (
                    <React.Fragment key={idx}>
                        <BreadcrumbItem key={`${item}-${idx}`}>
                            <BreadcrumbLink
                                className={"capitalize"}
                                href={
                                    idx > 0
                                        ? "/" +
                                          segments.slice(0, idx + 1).join("/")
                                        : `/${item}`
                                }
                            >
                                {item}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {idx !== segments.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default NavBreadcrumb;
