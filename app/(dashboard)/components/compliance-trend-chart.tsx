"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    LabelList,
    ReferenceLine,
    XAxis,
    YAxis,
} from "recharts";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { ChartPanel, DataTable } from "./chart-panel";

const TARGET = 90;

const data = [
    { week: "Aug 31", compliance: 81 },
    { week: "Sep 7", compliance: 83 },
    { week: "Sep 14", compliance: 82 },
    { week: "Sep 21", compliance: 84 },
    { week: "Sep 28", compliance: 85 },
    { week: "Oct 5", compliance: 83 },
    { week: "Oct 12", compliance: 86 },
    { week: "Oct 19", compliance: 85 },
    { week: "Oct 26", compliance: 87 },
    { week: "Nov 2", compliance: 88 },
    { week: "Nov 9", compliance: 86 },
    { week: "Nov 16", compliance: 89 },
];

const config = {
    compliance: { label: "Compliance", color: "var(--chart-1)" },
} satisfies ChartConfig;

const lastIndex = data.length - 1;

export function ComplianceTrendChart({ className }: { className?: string }) {
    return (
        <ChartPanel
            className={className}
            title="Pathway compliance"
            description={`Weekly share of planned activities completed, target ${TARGET}%`}
            table={
                <DataTable
                    caption="Weekly pathway compliance"
                    columns={["Week of", "Compliance"]}
                    rows={data.map((d) => [d.week, `${d.compliance}%`])}
                />
            }
            chart={
                <ChartContainer config={config} className="h-72 w-full">
                    <AreaChart
                        data={data}
                        margin={{ top: 16, right: 40, left: 0, bottom: 0 }}
                        accessibilityLayer
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="week"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={24}
                        />
                        <YAxis
                            domain={[70, 100]}
                            ticks={[70, 80, 90, 100]}
                            tickFormatter={(v) => `${v}%`}
                            tickLine={false}
                            axisLine={false}
                            width={44}
                        />
                        <ReferenceLine
                            y={TARGET}
                            stroke="var(--muted-foreground)"
                            strokeWidth={1}
                            label={{
                                value: "Target",
                                position: "insideTopLeft",
                                fill: "var(--muted-foreground)",
                                fontSize: 12,
                            }}
                        />
                        <ChartTooltip
                            cursor={{ stroke: "var(--border)" }}
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    formatter={(value) => (
                                        <span className="flex w-full justify-between gap-4">
                                            <span className="text-muted-foreground">
                                                Compliance
                                            </span>
                                            <span className="text-foreground font-medium tabular-nums">
                                                {value}%
                                            </span>
                                        </span>
                                    )}
                                />
                            }
                        />
                        <Area
                            dataKey="compliance"
                            type="monotone"
                            stroke="var(--color-compliance)"
                            strokeWidth={2}
                            fill="var(--color-compliance)"
                            fillOpacity={0.1}
                            activeDot={{
                                r: 4,
                                stroke: "var(--card)",
                                strokeWidth: 2,
                            }}
                            dot={(props) =>
                                props.index === lastIndex ? (
                                    <circle
                                        key="last"
                                        cx={props.cx}
                                        cy={props.cy}
                                        r={4}
                                        fill="var(--color-compliance)"
                                        stroke="var(--card)"
                                        strokeWidth={2}
                                    />
                                ) : (
                                    <g key={props.index} />
                                )
                            }
                        >
                            <LabelList
                                dataKey="compliance"
                                content={({ x, y, value, index }) =>
                                    index === lastIndex ? (
                                        <text
                                            x={Number(x) + 10}
                                            y={Number(y) + 4}
                                            className="fill-foreground text-xs font-medium"
                                        >
                                            {value}%
                                        </text>
                                    ) : null
                                }
                            />
                        </Area>
                    </AreaChart>
                </ChartContainer>
            }
        />
    );
}
