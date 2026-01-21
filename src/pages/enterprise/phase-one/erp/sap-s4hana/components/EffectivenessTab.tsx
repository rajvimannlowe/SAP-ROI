import { useMemo } from "react";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { MetricCard } from "../../../../../../components/roi/cards/MetricCard";
import { DrilldownTable } from "../../../../../../components/roi/DrilldownTable";
import { ControlEvidenceData } from "../../../../../../data/controlEvidenceData";
import { periodPerformanceColumns } from "../../../../../../data/controlEvidenceTableConfig";

interface EffectivenessTabProps {
  evidenceData: ControlEvidenceData;
}

export default function EffectivenessTab({
  evidenceData,
}: EffectivenessTabProps) {
  const columns = useMemo(() => periodPerformanceColumns(), []);

  return (
    <div className="space-y-6">
      {/* Control Effectiveness - Using MetricCard */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">
          Control Effectiveness
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <MetricCard
              icon={CheckCircle2}
              value={evidenceData.overallPassRate}
              title="Overall Pass Rate"
              description={`${evidenceData.totalPassed.toLocaleString()} of ${evidenceData.totalTests.toLocaleString()} items`}
              color="#10b981"
            />
            <p className="text-xs text-muted-foreground px-1">
              Source: <span className="font-semibold">Computed</span> (from SAP-derived data)
            </p>
          </div>
          <div className="space-y-2">
            <MetricCard
              icon={AlertCircle}
              value={evidenceData.totalExceptions.toLocaleString()}
              title="Total Exceptions"
              description={`Out of ${evidenceData.totalTests.toLocaleString()} total items`}
              color="#f59e0b"
            />
            <p className="text-xs text-muted-foreground px-1">
              Source: <span className="font-semibold">SAP</span> (Exception Report)
            </p>
          </div>
          <div className="space-y-2">
            <MetricCard
              icon={Clock}
              value={evidenceData.totalTests.toLocaleString()}
              title="Total Items"
              description="Items tested and reviewed"
              color="#2563eb"
            />
            <p className="text-xs text-muted-foreground px-1">
              Source: <span className="font-semibold">SAP</span> (ANLA count)
            </p>
          </div>
          <div className="space-y-2">
            <MetricCard
              icon={Clock}
              value={evidenceData.lastReviewDate}
              title="Last Review Date"
              description={`Next review: ${evidenceData.nextReviewDate}`}
              color="#9333ea"
            />
            <p className="text-xs text-muted-foreground px-1">
              Source: <span className="font-semibold">Entry Screen</span> (Human Governance Input)
            </p>
          </div>
        </div>
      </div>

      {/* Period Performance Table - Using DrilldownTable */}
      <DrilldownTable
        title="Performance by Period"
        columns={columns}
        data={evidenceData.periodPerformance}
        getRowKey={(row) => row.id}
        compact={false}
      />
    </div>
  );
}
