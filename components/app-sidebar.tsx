"use client";

import * as React from "react";

import { NavMain, type NavGroup } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { WorkspaceSwitcher } from "@/components/workspace-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import {
    RiBarChartBoxLine,
    RiBook3Line,
    RiCommunityLine,
    RiDashboardLine,
    RiFileShield2Line,
    RiRouteLine,
    RiSettings3Line,
    RiTaskLine,
    RiUserHeartLine,
} from "@remixicon/react";

const ALL_ROLES = [
    "nurse",
    "dpjp",
    "committee",
    "casemix",
    "management",
    "hospital_admin",
    "group_admin",
    "platform_admin",
] as const;

type Role = (typeof ALL_ROLES)[number];

type RoleNavGroup = {
    label?: string;
    items: (NavGroup["items"][number] & { roles: Role[] })[];
};

// This is sample data until SSO provides the session.
const data = {
    user: {
        name: "Medpath User",
        email: "user@medpath.local",
        roleLabel: "Administrator",
        roles: [...ALL_ROLES] as Role[],
    },
    organization: {
        name: "Hospital Group",
        hospitals: [
            { id: "hospital-a", name: "Hospital A" },
            { id: "hospital-b", name: "Hospital B" },
        ],
    },
};

const navigation: RoleNavGroup[] = [
    {
        items: [
            {
                title: "Dashboard",
                url: "/",
                icon: <RiDashboardLine aria-hidden="true" />,
                roles: [...ALL_ROLES],
            },
        ],
    },
    {
        label: "Care",
        items: [
            {
                title: "Patients",
                url: "/patients",
                icon: <RiUserHeartLine aria-hidden="true" />,
                roles: ["nurse", "dpjp", "committee"],
            },
            {
                title: "Worklist",
                url: "/worklist",
                icon: <RiTaskLine aria-hidden="true" />,
                roles: ["nurse", "dpjp", "committee"],
            },
        ],
    },
    {
        label: "Quality",
        items: [
            // DPJP gets read-only access inside the page.
            {
                title: "Pathways",
                url: "/pathways",
                icon: <RiRouteLine aria-hidden="true" />,
                roles: ["committee", "dpjp"],
            },
            {
                title: "Reports",
                url: "/reports",
                icon: <RiBarChartBoxLine aria-hidden="true" />,
                roles: ["committee", "casemix", "management", "group_admin"],
            },
            {
                title: "Audit Log",
                url: "/audit",
                icon: <RiFileShield2Line aria-hidden="true" />,
                roles: ["hospital_admin", "committee"],
            },
        ],
    },
    {
        label: "Administration",
        items: [
            {
                title: "Settings",
                url: "/settings",
                icon: <RiSettings3Line aria-hidden="true" />,
                roles: ["hospital_admin"],
            },
        ],
    },
    {
        label: "Platform",
        items: [
            // Platform staff manage tenants only and never see clinical menus.
            {
                title: "Organizations",
                url: "/platform/organizations",
                icon: <RiCommunityLine aria-hidden="true" />,
                roles: ["platform_admin"],
            },
            {
                title: "Master Data",
                url: "/platform/master-data",
                icon: <RiBook3Line aria-hidden="true" />,
                roles: ["platform_admin"],
            },
        ],
    },
];

function navigationFor(roles: Role[]): NavGroup[] {
    return navigation
        .map((group) => ({
            label: group.label,
            items: group.items.filter((item) =>
                item.roles.some((role) => roles.includes(role)),
            ),
        }))
        .filter((group) => group.items.length > 0);
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user, organization } = data;

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <WorkspaceSwitcher
                    organizationName={organization.name}
                    hospitals={organization.hospitals}
                    canViewGroup={user.roles.includes("group_admin")}
                />
            </SidebarHeader>
            <SidebarContent>
                <NavMain groups={navigationFor(user.roles)} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
