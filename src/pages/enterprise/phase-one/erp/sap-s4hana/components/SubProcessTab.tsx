import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { IconBadge } from "@/components/roi/IconBadge";
import { StatusBadge } from "@/components/roi/StatusBadge";
import { StatusType } from "@/data/statusMapping";
import { subProcessData } from "@/data/roiAggregationData";
import { Target } from "lucide-react";

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getGradient = (color: string) =>
  `linear-gradient(135deg, ${color} 0%, ${hexToRgba(color, 0.8)} 100%)`;

const SubProcessTab = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-2">
          Sub-Process ROI Aggregation
        </h2>
        <p className="text-muted-foreground">
          Detailed analysis and risk indicators for each financial sub-process
        </p>
      </div>

      {/* Sub-Process Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {subProcessData.map((process) => {
          const ProcessIcon = process.icon;

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
            <Card
              key={process.id}
              style={{
                borderColor: hexToRgba(process.color, 0.3),
                backgroundColor: hexToRgba(process.color, 0.02),
              }}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 flex-1">
                    <IconBadge
                      gradient={getGradient(process.color)}
                      icon={ProcessIcon}
                    />
                    <div className="flex-1">
                      <CardTitle className="text-lg">{process.name}</CardTitle>
                      <CardDescription>
                        ROI Score: {process.roiScore}
                      </CardDescription>
                    </div>
                  </div>
                  <StatusBadge
                    status={getStatusType(process.status)}
                    size="sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Risk Indicator Section */}
                  <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                    <div className="text-xs font-semibold text-muted-foreground mb-1">
                      {process.keyRiskIndicator}
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {process.riskDescription}
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 rounded-lg bg-red-50 border border-red-200">
                      <div className="text-lg font-bold text-red-600">
                        {process.valueAtRisk}
                      </div>
                      <div className="text-xs text-red-700">VALUE AT RISK</div>
                    </div>

                    <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <div className="text-lg font-bold text-blue-600">
                        {process.actionItems}
                      </div>
                      <div className="text-xs text-blue-700">ACTION ITEMS</div>
                    </div>

                    <div className="text-center p-3 rounded-lg bg-purple-50 border border-purple-200">
                      <div className="text-lg font-bold text-purple-600">
                        {process.targets}
                      </div>
                      <div className="text-xs text-purple-700">TARGETS</div>
                    </div>
                  </div>

                  {/* Action Items Indicator */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/30">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Action Status
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-xs font-medium">In Progress</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Statistics */}
      <Card
        className="mt-8"
        style={{
          borderColor: hexToRgba("#4160F0", 0.3),
          backgroundColor: hexToRgba("#4160F0", 0.02),
        }}
      >
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <IconBadge gradient={getGradient("#4160F0")} icon={Target} />
            <div>
              <CardTitle>Sub-Process Summary</CardTitle>
              <CardDescription>
                Aggregate statistics across all financial sub-processes
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-sm text-green-700">Healthy Processes</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">2</div>
              <div className="text-sm text-yellow-700">At Risk Processes</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-red-50 border border-red-200">
              <div className="text-2xl font-bold text-red-600">$13.4M</div>
              <div className="text-sm text-red-700">Total Value at Risk</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">11</div>
              <div className="text-sm text-blue-700">Active Action Items</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubProcessTab;

