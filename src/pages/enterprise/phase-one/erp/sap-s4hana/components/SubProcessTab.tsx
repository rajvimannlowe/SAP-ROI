import { InfoCard } from "@/components/roi/cards/InfoCard";
import { SummaryCards } from "@/components/roi/cards/SummaryCards";
import { StatusBadge } from "@/components/roi/StatusBadge";
import { StatusType } from "@/data/statusMapping";
import { subProcessData, subProcessSummary } from "@/data/roiAggregationData";
import { Target, CheckCircle2, AlertTriangle, DollarSign } from "lucide-react";

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getGradient = (color: string) =>
  `linear-gradient(135deg, ${color} 0%, ${hexToRgba(color, 0.8)} 100%)`;

const SubProcessTab = () => {
  // Map process status to StatusBadge status type
  const getStatusType = (status: string): StatusType => {
    switch (status) {
      case "Healthy":
        return "Optimal";
      case "At Risk":
        return "Warning";
      case "Critical":
        return "Error";
      default:
        return "Warning";
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-foreground">
          Sub-Process ROI Aggregation
        </h2>
        <p className="text-sm text-muted-foreground">
          Detailed analysis and risk indicators for each financial sub-process
        </p>
      </div>

      {/* Sub-Process Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {subProcessData.map((process) => {
          const ProcessIcon = process.icon;

          return (
            <InfoCard
              key={process.id}
              icon={ProcessIcon}
              iconGradient={getGradient(process.color)}
              title={process.name}
              value={process.roiScore}
              description={
                <div className="space-y-2 mt-2">
                  {/* Header Row: Status Badge and Risk Indicator */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-semibold text-muted-foreground mb-0.5 uppercase tracking-wide">
                        {process.keyRiskIndicator}
                      </div>
                      <div className="text-xs font-medium text-foreground leading-tight">
                        {process.riskDescription}
                      </div>
                    </div>
                    <StatusBadge
                      status={getStatusType(process.status)}
                      size="sm"
                    />
                  </div>

                  {/* Compact Metrics Row */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1.5 border-t border-border/30">
                    <div className="text-center">
                      <div
                        className="text-base font-bold mb-0.5"
                        style={{ color: process.color }}
                      >
                        {process.valueAtRisk}
                      </div>
                      <div className="text-[9px] text-muted-foreground uppercase tracking-wide">
                        At Risk
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className="text-base font-bold mb-0.5"
                        style={{ color: process.color }}
                      >
                        {process.actionItems}
                      </div>
                      <div className="text-[9px] text-muted-foreground uppercase tracking-wide">
                        Actions
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className="text-base font-bold mb-0.5"
                        style={{ color: process.color }}
                      >
                        {process.targets}
                      </div>
                      <div className="text-[9px] text-muted-foreground uppercase tracking-wide">
                        Targets
                      </div>
                    </div>
                  </div>

                  {/* Action Status Footer */}
                  <div className="flex items-center justify-between pt-1.5 border-t border-border/30">
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">
                        Status
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span className="text-[10px] font-medium text-blue-600">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              }
              borderColor={hexToRgba(process.color, 0.3)}
              bgColor={hexToRgba(process.color, 0.05)}
            />
          );
        })}
      </div>

      {/* Summary Statistics */}
      <InfoCard
        icon={Target}
        iconGradient={getGradient("#4160F0")}
        title="Sub-Process Summary"
        description={
          <div className="mt-3">
            <p className="text-xs text-muted-foreground mb-3">
              Aggregate statistics across all financial sub-processes
            </p>
            <SummaryCards
              cards={[
                {
                  title: "Healthy Processes",
                  value: subProcessSummary.healthyProcesses.toString(),
                  icon: CheckCircle2,
                  color: "#10b981",
                },
                {
                  title: "At Risk Processes",
                  value: subProcessSummary.atRiskProcesses.toString(),
                  icon: AlertTriangle,
                  color: "#f59e0b",
                },
                {
                  title: "Total Value at Risk",
                  value: subProcessSummary.totalValueAtRisk,
                  icon: DollarSign,
                  color: "#ef4444",
                },
                {
                  title: "Active Action Items",
                  value: subProcessSummary.activeActionItems.toString(),
                  icon: Target,
                  color: "#2563eb",
                },
              ]}
              columns={4}
            />
          </div>
        }
        borderColor={hexToRgba("#4160F0", 0.3)}
        bgColor={hexToRgba("#4160F0", 0.02)}
      />
    </div>
  );
};

export default SubProcessTab;
