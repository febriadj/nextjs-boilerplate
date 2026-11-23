"use client";

import { RiComputerLine, RiMoonLine, RiSunLine } from "@remixicon/react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const THEME_OPTIONS = [
    { value: "light", label: "Light", icon: RiSunLine },
    { value: "dark", label: "Dark", icon: RiMoonLine },
    { value: "system", label: "System", icon: RiComputerLine },
] as const;

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-11 md:size-9"
                        aria-label="Change theme"
                    />
                }
            >
                {/* Icons swap via the .dark class so server and client markup match. */}
                <RiSunLine aria-hidden="true" className="dark:hidden" />
                <RiMoonLine aria-hidden="true" className="hidden dark:block" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-fit">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Theme</DropdownMenuLabel>
                    {/* theme is undefined until next-themes reads localStorage on the client. */}
                    <DropdownMenuRadioGroup
                        value={theme ?? "system"}
                        onValueChange={(value) => setTheme(value as string)}
                    >
                        {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
                            <DropdownMenuRadioItem
                                key={value}
                                value={value}
                                closeOnClick
                                className="cursor-pointer"
                            >
                                <Icon aria-hidden="true" />
                                {label}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
