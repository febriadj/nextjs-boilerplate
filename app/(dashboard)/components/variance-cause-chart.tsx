"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { ChartPanel, DataTable } from "./chart-panel";

const data = [
    { week: "Sep 28", patient: 6, clinician: 4, system: 3 },
    { week: "Oct 5", patient: 5, clinician: 6, system: 2 },
    { week: "Oct 12", patient: 7, clinician: 3, system: 4 },
    { week: "Oct 19", patient: 6, clinician: 5, system: 3 },
    { week: "Oct 26", patient: 8, clinician: 4, system: 2 },
    { week: "Nov 2", patient: 5, clinician: 4, system: 3 },
    { week: "Nov 9", patient: 6, clinician: 3, system: 2 },
    { week: "Nov 16", patient: 7, clinician: 3, system: 2 },
];

// Standard clinical pathway variance classification.
const config = {
    patient: { label: "Patient", color: "var(--chart-1)" },
    clinician: { label: "Clinician", color: "var(--chart-2)" },
    system: { label: "System", color: "var(--chart-3)" },
} satisfies ChartConfig;

const segment = {
    stackId: "cause",
    stroke: "var(--card)",
    strokeWidth: 2,
    maxBarSize: 24,
} as const;

export function VarianceCauseChart({ className }: { className?: string }) {
    return (
        <ChartPanel
            className={className}
            title="Variances by cause"
            description="Confirmed variances per week"
            table={
                <DataTable
                    caption="Confirmed variances per week by cause"
                    columns={["Week of", "Patient", "Clinician", "System"]}
                    rows={data.map((d) => [
                        d.week,
                        d.patient,
                        d.clinician,
                        d.system,
                    ])}
                />
            }
            chart={
                <ChartContainer config={config} className="h-72 w-full">
                    <BarChart
                        data={data}
                        margin={{ top: 8, right: 0, left: 0, bottom: 0 }}
                        accessibilityLayer
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="week"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={16}
                        />
                        <YAxis
                            allowDecimals={false}
                            tickLine={false}
                            axisLine={false}
                            width={28}
                        />
                        <ChartTooltip
                            cursor={{ fill: "var(--muted)", opacity: 0.6 }}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="patient"
                            fill="var(--color-patient)"
                            {...segment}
                        />
                        <Bar
                            dataKey="clinician"
                            fill="var(--color-clinician)"
                            {...segment}
                        />
                        <Bar
                            dataKey="system"
                            fill="var(--color-system)"
                            radius={[4, 4, 0, 0]}
                            {...segment}
                        />
                    </BarChart>
                </ChartContainer>
            }
        />
    );
}
