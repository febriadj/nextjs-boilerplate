import { AppBreadcrumb } from "@/components/app-breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function AppHeader() {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex min-w-0 items-center gap-2 px-4">
                <SidebarTrigger className="-ms-1" />
                <Separator
                    orientation="vertical"
                    className="me-2 data-vertical:h-4 data-vertical:self-auto"
                />
                <AppBreadcrumb />
            </div>
            <div className="ms-auto flex items-center gap-2 px-4">
                <ThemeSwitcher />
            </div>
        </header>
    );
}
