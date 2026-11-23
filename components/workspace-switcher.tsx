"use client";

import * as React from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
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
    RiBuilding2Line,
    RiHospitalLine,
} from "@remixicon/react";

const ALL_HOSPITALS = "all";

export function WorkspaceSwitcher({
    organizationName,
    hospitals,
    canViewGroup,
}: {
    organizationName: string;
    hospitals: { id: string; name: string }[];
    canViewGroup: boolean;
}) {
    const { isMobile } = useSidebar();
    const [selectedId, setSelectedId] = React.useState(hospitals[0]?.id ?? "");

    const selectedHospital = hospitals.find((h) => h.id === selectedId);
    const isGroupView = selectedId === ALL_HOSPITALS;
    const title = isGroupView
        ? "All hospitals"
        : (selectedHospital?.name ?? "");
    const canSwitch = hospitals.length > 1 || canViewGroup;

    const identity = (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                {isGroupView ? (
                    <RiBuilding2Line aria-hidden="true" className="size-4" />
                ) : (
                    <RiHospitalLine aria-hidden="true" className="size-4" />
                )}
            </div>
            <div className="grid flex-1 text-start text-sm leading-tight">
                <span className="truncate font-medium">{title}</span>
                <span className="text-muted-foreground truncate text-xs">
                    {organizationName}
                </span>
            </div>
        </>
    );

    if (!canSwitch) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <div className="flex h-14 items-center gap-2 px-3 group-data-[collapsible=icon]:p-0">
                        {identity}
                    </div>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <SidebarMenuButton
                                size="lg"
                                aria-label={`Switch hospital, current: ${title}`}
                                className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground cursor-pointer"
                            />
                        }
                    >
                        {identity}
                        <RiArrowUpDownLine
                            aria-hidden="true"
                            className="ms-auto"
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="min-w-56"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuRadioGroup
                            value={selectedId}
                            onValueChange={(value) => setSelectedId(value)}
                        >
                            <DropdownMenuGroup>
                                <DropdownMenuLabel className="text-muted-foreground text-xs">
                                    {organizationName}
                                </DropdownMenuLabel>
                                {hospitals.map((hospital) => (
                                    <DropdownMenuRadioItem
                                        key={hospital.id}
                                        value={hospital.id}
                                        className="cursor-pointer"
                                    >
                                        <RiHospitalLine aria-hidden="true" />
                                        {hospital.name}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuGroup>
                            {canViewGroup && (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioItem
                                        value={ALL_HOSPITALS}
                                        className="cursor-pointer"
                                    >
                                        <RiBuilding2Line aria-hidden="true" />
                                        All hospitals
                                    </DropdownMenuRadioItem>
                                </>
                            )}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
