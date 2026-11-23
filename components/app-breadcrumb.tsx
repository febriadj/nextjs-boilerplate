"use client";

import { Fragment, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Crumb = { href: string; label: string };

function formatSegment(segment: string) {
    const words = decodeURIComponent(segment).replace(/[-_]+/g, " ").trim();
    return words.charAt(0).toUpperCase() + words.slice(1);
}

function buildCrumbs(pathname: string): Crumb[] {
    const segments = pathname.split("/").filter(Boolean);
    return [
        { href: "/", label: "Dashboard" },
        ...segments.map((segment, index) => ({
            href: "/" + segments.slice(0, index + 1).join("/"),
            label: formatSegment(segment),
        })),
    ];
}

// With cacheComponents, usePathname() on dynamic routes must sit inside Suspense.
export function AppBreadcrumb() {
    return (
        <Suspense fallback={<BreadcrumbTrail crumbs={buildCrumbs("/")} />}>
            <PathnameBreadcrumb />
        </Suspense>
    );
}

function PathnameBreadcrumb() {
    return <BreadcrumbTrail crumbs={buildCrumbs(usePathname())} />;
}

function BreadcrumbTrail({ crumbs }: { crumbs: Crumb[] }) {
    const lastIndex = crumbs.length - 1;

    return (
        <Breadcrumb className="min-w-0">
            <BreadcrumbList className="flex-nowrap">
                {crumbs.map((crumb, index) => {
                    const isLast = index === lastIndex;
                    // On mobile only the first and current crumbs fit.
                    const hideOnMobile = index > 0 && !isLast;

                    return (
                        <Fragment key={crumb.href}>
                            {index > 0 && (
                                <BreadcrumbSeparator
                                    className={
                                        hideOnMobile
                                            ? "hidden md:block"
                                            : undefined
                                    }
                                />
                            )}
                            <BreadcrumbItem
                                className={
                                    hideOnMobile
                                        ? "hidden md:block"
                                        : isLast
                                          ? "min-w-0"
                                          : "shrink-0"
                                }
                            >
                                {isLast ? (
                                    <BreadcrumbPage className="block truncate">
                                        {crumb.label}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink
                                        render={<Link href={crumb.href} />}
                                    >
                                        {crumb.label}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
