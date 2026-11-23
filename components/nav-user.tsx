"use client";

import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import {
    RiArrowUpDownLine,
    RiLogoutBoxLine,
    RiNotificationLine,
    RiUserLine,
} from "@remixicon/react";

function initialsOf(name: string) {
    const words = name
        .replace(/[^\p{L}\s]/gu, "")
        .trim()
        .split(/\s+/);
    const initials = words
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
    return initials || "?";
}

function UserIdentity({
    name,
    roleLabel,
}: {
    name: string;
    roleLabel: string;
}) {
    return (
        <>
            <Avatar>
                <AvatarFallback>{initialsOf(name)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-start text-sm leading-tight">
                <span className="truncate font-medium">{name}</span>
                <span className="text-muted-foreground truncate text-xs">
                    {roleLabel}
                </span>
            </div>
        </>
    );
}

export function NavUser({
    user,
}: {
    user: { name: string; email: string; roleLabel: string };
}) {
    const { isMobile } = useSidebar();
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <SidebarMenuButton
                                size="lg"
                                aria-label={`Account menu for ${user.name}`}
                                className="aria-expanded:bg-muted cursor-pointer"
                            />
                        }
                    >
                        <UserIdentity
                            name={user.name}
                            roleLabel={user.roleLabel}
                        />
                        <RiArrowUpDownLine
                            aria-hidden="true"
                            className="ms-auto size-4"
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="min-w-56"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
                                    <Avatar>
                                        <AvatarFallback>
                                            {initialsOf(user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-start text-sm leading-tight">
                                        <span className="truncate font-medium">
                                            {user.name}
                                        </span>
                                        <span className="text-muted-foreground truncate text-xs">
                                            {user.email}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                render={<Link href="/profile" />}
                            >
                                <RiUserLine aria-hidden="true" />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                render={<Link href="/notifications" />}
                            >
                                <RiNotificationLine aria-hidden="true" />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="cursor-pointer"
                            render={<Link href="/login" />}
                        >
                            <RiLogoutBoxLine aria-hidden="true" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
