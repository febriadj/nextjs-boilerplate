import Link from "next/link";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    RiErrorWarningLine,
    RiRouteLine,
    RiStethoscopeLine,
    type RemixiconComponentType,
} from "@remixicon/react";

const kinds = {
    variance: { label: "Suspected variance", icon: RiErrorWarningLine },
    diagnosis: { label: "Diagnosis changed", icon: RiStethoscopeLine },
    review: { label: "Template review", icon: RiRouteLine },
} satisfies Record<string, { label: string; icon: RemixiconComponentType }>;

const items: {
    kind: keyof typeof kinds;
    title: string;
    context: string;
    age: string;
}[] = [
    {
        kind: "variance",
        title: "Head CT not recorded on day 1",
        context: "Ischemic stroke · Ward A, bed 12",
        age: "3 h",
    },
    {
        kind: "diagnosis",
        title: "Working diagnosis changed from A91 to A90",
        context: "Dengue hemorrhagic fever · Ward B, bed 4",
        age: "5 h",
    },
    {
        kind: "variance",
        title: "Antibiotic not started within 1 hour",
        context: "Community-acquired pneumonia · Ward C, bed 7",
        age: "9 h",
    },
    {
        kind: "variance",
        title: "Stay exceeds target, day 6 of 5",
        context: "Acute myocardial infarction · ICCU, bed 2",
        age: "1 d",
    },
    {
        kind: "review",
        title: "Community-acquired pneumonia v3 awaits approval",
        context: "Submitted by the medical committee",
        age: "2 d",
    },
];

export function NeedsAttention({ className }: { className?: string }) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Needs attention</CardTitle>
                <CardDescription>
                    Oldest items are at the bottom
                </CardDescription>
                <CardAction>
                    <Link
                        href="/worklist"
                        className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 hover:underline"
                    >
                        Open worklist
                    </Link>
                </CardAction>
            </CardHeader>
            <CardContent>
                <ul className="flex flex-col">
                    {items.map((item) => {
                        const kind = kinds[item.kind];
                        const Icon = kind.icon;
                        return (
                            <li
                                key={item.title}
                                className="flex gap-3 border-b py-3 first:pt-0 last:border-0 last:pb-0"
                            >
                                <Icon
                                    aria-hidden="true"
                                    className="text-muted-foreground mt-0.5 size-4 shrink-0"
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="text-muted-foreground text-xs">
                                        {kind.label}
                                    </p>
                                    <p className="text-sm font-medium">
                                        {item.title}
                                    </p>
                                    <p className="text-muted-foreground truncate text-xs">
                                        {item.context}
                                    </p>
                                </div>
                                <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                                    {item.age}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </CardContent>
        </Card>
    );
}
