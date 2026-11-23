"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RiBarChartBoxLine, RiTableLine } from "@remixicon/react";

// Every chart has a table twin so values never depend on color or hover alone.
export function ChartPanel({
    title,
    description,
    chart,
    table,
    className,
}: {
    title: string;
    description: string;
    chart: React.ReactNode;
    table: React.ReactNode;
    className?: string;
}) {
    const [view, setView] = React.useState<"chart" | "table">("chart");
    const showTable = view === "table";

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
                <CardAction>
                    <Button
                        variant="ghost"
                        size="sm"
                        aria-pressed={showTable}
                        onClick={() => setView(showTable ? "chart" : "table")}
                    >
                        {showTable ? (
                            <RiBarChartBoxLine aria-hidden="true" />
                        ) : (
                            <RiTableLine aria-hidden="true" />
                        )}
                        {showTable ? "Chart" : "Table"}
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>{showTable ? table : chart}</CardContent>
        </Card>
    );
}

export function DataTable({
    caption,
    columns,
    rows,
}: {
    caption: string;
    columns: string[];
    rows: (string | number)[][];
}) {
    return (
        <div className="max-h-72 overflow-auto">
            <table className="w-full text-sm">
                <caption className="sr-only">{caption}</caption>
                <thead className="bg-card sticky top-0">
                    <tr className="border-b">
                        {columns.map((column, index) => (
                            <th
                                key={column}
                                scope="col"
                                className={`text-muted-foreground py-2 font-medium ${index === 0 ? "text-start" : "text-end"}`}
                            >
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr
                            key={String(row[0])}
                            className="border-b last:border-0"
                        >
                            {row.map((cell, index) =>
                                index === 0 ? (
                                    <th
                                        key={index}
                                        scope="row"
                                        className="py-2 text-start font-normal"
                                    >
                                        {cell}
                                    </th>
                                ) : (
                                    <td
                                        key={index}
                                        className="py-2 text-end tabular-nums"
                                    >
                                        {cell}
                                    </td>
                                ),
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
