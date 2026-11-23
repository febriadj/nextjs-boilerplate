import { Card, CardContent } from "@/components/ui/card";
import { RiArrowDownLine, RiArrowUpLine } from "@remixicon/react";

type Stat = {
    label: string;
    value: string;
    detail: string;
    // Direction of change and whether that direction is good for this measure.
    trend?: { direction: "up" | "down"; good: boolean };
};

const stats: Stat[] = [
    {
        label: "Patients on a pathway",
        value: "86",
        detail: "+7 vs last week",
    },
    {
        label: "Pathway compliance",
        value: "88%",
        detail: "+3 pts vs previous 30 days",
        trend: { direction: "up", good: true },
    },
    {
        label: "Variances to review",
        value: "14",
        detail: "5 waiting more than 24 h",
    },
    {
        label: "Average length of stay",
        value: "4.5 d",
        detail: "0.3 d over the 4.2 d target",
        trend: { direction: "up", good: false },
    },
];

export function StatTiles() {
    return (
        <section
            aria-label="Key figures"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
            {stats.map((stat) => {
                const Icon =
                    stat.trend?.direction === "down"
                        ? RiArrowDownLine
                        : RiArrowUpLine;
                return (
                    <Card key={stat.label}>
                        <CardContent className="flex flex-col gap-1">
                            <p className="text-muted-foreground text-sm">
                                {stat.label}
                            </p>
                            <p className="text-3xl font-semibold tracking-tight">
                                {stat.value}
                            </p>
                            <p
                                className={`inline-flex items-center gap-1 text-xs ${
                                    stat.trend
                                        ? stat.trend.good
                                            ? "text-success"
                                            : "text-destructive"
                                        : "text-muted-foreground"
                                }`}
                            >
                                {stat.trend && (
                                    <Icon
                                        aria-hidden="true"
                                        className="size-3.5"
                                    />
                                )}
                                {stat.detail}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </section>
    );
}
