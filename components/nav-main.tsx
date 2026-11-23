"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export type NavGroup = {
    // Omit for a top-level group that needs no heading, such as Dashboard.
    label?: string;
    items: {
        title: string;
        url: string;
        icon: React.ReactNode;
    }[];
};

// With cacheComponents, usePathname() on dynamic routes must sit inside Suspense.
export function NavMain({ groups }: { groups: NavGroup[] }) {
    return (
        <Suspense fallback={<NavGroupList groups={groups} pathname={null} />}>
            <ActiveNavGroupList groups={groups} />
        </Suspense>
    );
}

function ActiveNavGroupList({ groups }: { groups: NavGroup[] }) {
    return <NavGroupList groups={groups} pathname={usePathname()} />;
}

function NavGroupList({
    groups,
    pathname,
}: {
    groups: NavGroup[];
    pathname: string | null;
}) {
    return groups.map((group) => (
        <SidebarGroup key={group.label ?? "main"}>
            {group.label && (
                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            )}
            <SidebarMenu>
                {group.items.map((item) => {
                    const isActive =
                        pathname !== null &&
                        (pathname === item.url ||
                            pathname.startsWith(`${item.url}/`));

                    return (
                        <SidebarMenuItem key={item.url}>
                            <SidebarMenuButton
                                isActive={isActive}
                                tooltip={item.title}
                                render={
                                    <Link
                                        href={item.url}
                                        aria-current={
                                            isActive ? "page" : undefined
                                        }
                                    />
                                }
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    ));
}
