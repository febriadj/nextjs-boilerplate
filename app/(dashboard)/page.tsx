import { ComplianceTrendChart } from "./components/compliance-trend-chart";
import { NeedsAttention } from "./components/needs-attention";
import { PathwayPerformance } from "./components/pathway-performance";
import { StatTiles } from "./components/stat-tiles";
import { VarianceCauseChart } from "./components/variance-cause-chart";

export default function DashboardPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div>
                <h1 className="text-xl font-semibold tracking-tight">
                    Dashboard
                </h1>
                <p className="text-muted-foreground text-sm">
                    Hospital A · last 30 days
                </p>
            </div>
            <StatTiles />
            <div className="grid gap-4 lg:grid-cols-3">
                <ComplianceTrendChart className="lg:col-span-2" />
                <NeedsAttention />
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
                <PathwayPerformance className="lg:col-span-2" />
                <VarianceCauseChart />
            </div>
        </div>
    );
}
