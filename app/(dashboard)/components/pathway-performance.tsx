import Link from "next/link";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RiArrowDownLine, RiArrowUpLine } from "@remixicon/react";

const pathways = [
    {
        name: "Ischemic stroke",
        code: "I63",
        active: 18,
        compliance: 82,
        los: 6.1,
        target: 5.0,
    },
    {
        name: "Dengue hemorrhagic fever",
        code: "A91",
        active: 24,
        compliance: 91,
        los: 3.8,
        target: 4.0,
    },
    {
        name: "Community-acquired pneumonia",
        code: "J18.9",
        active: 15,
        compliance: 86,
        los: 5.2,
        target: 5.0,
    },
    {
        name: "Caesarean section",
        code: "O82",
        active: 21,
        compliance: 94,
        los: 3.1,
        target: 3.0,
    },
    {
        name: "Acute myocardial infarction",
        code: "I21",
        active: 8,
        compliance: 79,
        los: 5.6,
        target: 5.0,
    },
];

function LosDelta({ los, target }: { los: number; target: number }) {
    const delta = Math.round((los - target) * 10) / 10;
    if (delta === 0) {
        return <span className="text-muted-foreground">On target</span>;
    }
    const over = delta > 0;
    const Icon = over ? RiArrowUpLine : RiArrowDownLine;
    return (
        <span
            className={`inline-flex items-center gap-1 ${over ? "text-destructive" : "text-success"}`}
        >
            <Icon aria-hidden="true" className="size-3.5" />
            {Math.abs(delta).toFixed(1)} d {over ? "over" : "under"}
        </span>
    );
}

export function PathwayPerformance({ className }: { className?: string }) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Pathways in use</CardTitle>
                <CardDescription>
                    Compliance and length of stay, last 30 days
                </CardDescription>
                <CardAction>
                    <Link
                        href="/reports"
                        className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 hover:underline"
                    >
                        Open reports
                    </Link>
                </CardAction>
            </CardHeader>
            <CardContent className="overflow-x-auto">
                <table className="w-full min-w-[36rem] text-sm">
                    <caption className="sr-only">
                        Pathway compliance and length of stay
                    </caption>
                    <thead>
                        <tr className="text-muted-foreground border-b">
                            <th
                                scope="col"
                                className="py-2 text-start font-medium"
                            >
                                Pathway
                            </th>
                            <th
                                scope="col"
                                className="py-2 text-end font-medium"
                            >
                                Patients
                            </th>
                            <th
                                scope="col"
                                className="w-48 py-2 ps-6 text-start font-medium"
                            >
                                Compliance
                            </th>
                            <th
                                scope="col"
                                className="py-2 text-end font-medium"
                            >
                                Avg LOS
                            </th>
                            <th
                                scope="col"
                                className="py-2 text-end font-medium"
                            >
                                vs target
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pathways.map((p) => (
                            <tr key={p.code} className="border-b last:border-0">
                                <th
                                    scope="row"
                                    className="py-3 text-start font-normal"
                                >
                                    <span className="block font-medium">
                                        {p.name}
                                    </span>
                                    <span className="text-muted-foreground text-xs">
                                        {p.code}
                                    </span>
                                </th>
                                <td className="py-3 text-end tabular-nums">
                                    {p.active}
                                </td>
                                <td className="py-3 ps-6">
                                    <div className="flex items-center gap-3">
                                        <div
                                            role="meter"
                                            aria-label={`${p.name} compliance`}
                                            aria-valuenow={p.compliance}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            className="h-2 flex-1 rounded-full bg-[color-mix(in_oklch,var(--chart-1)_18%,transparent)]"
                                        >
                                            <div
                                                className="bg-chart-1 h-full rounded-full"
                                                style={{
                                                    width: `${p.compliance}%`,
                                                }}
                                            />
                                        </div>
                                        <span className="w-9 text-end tabular-nums">
                                            {p.compliance}%
                                        </span>
                                    </div>
                                </td>
                                <td className="py-3 text-end tabular-nums">
                                    {p.los.toFixed(1)} / {p.target.toFixed(1)} d
                                </td>
                                <td className="py-3 text-end text-xs whitespace-nowrap">
                                    <LosDelta los={p.los} target={p.target} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
}
