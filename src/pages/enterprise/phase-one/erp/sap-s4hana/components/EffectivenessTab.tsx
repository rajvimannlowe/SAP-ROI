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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            icon={CheckCircle2}
            value={evidenceData.overallPassRate}
            title="Overall Pass Rate"
            description={`${evidenceData.totalPassed.toLocaleString()} of ${evidenceData.totalTests.toLocaleString()} tests`}
            color="#10b981"
          />
          <MetricCard
            icon={AlertCircle}
            value={evidenceData.totalExceptions.toString()}
            title="Total Exceptions"
            description="Requires management review and resolution"
            color="#f59e0b"
          />
          <MetricCard
            icon={Clock}
            value={evidenceData.lastReviewDate}
            title="Last Review Date"
            description={`Next review: ${evidenceData.nextReviewDate}`}
            color="#2563eb"
          />
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
