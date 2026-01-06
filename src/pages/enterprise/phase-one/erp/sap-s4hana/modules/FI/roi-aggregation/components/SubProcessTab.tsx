import { EnhancedCard } from "@/components/ui/enhanced-card";
import { subProcessData } from "@/data/roiAggregationData";
import { AlertTriangle, CheckCircle2, Target } from "lucide-react";

const SubProcessTab = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Healthy":
        return "#10B981";
      case "At Risk":
        return "#F59E0B";
      case "Critical":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Healthy":
        return CheckCircle2;
      case "At Risk":
        return AlertTriangle;
      case "Critical":
        return AlertTriangle;
      default:
        return AlertTriangle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-2">Sub-Process ROI Aggregation</h2>
        <p className="text-muted-foreground">
          Detailed analysis and risk indicators for each financial sub-process
        </p>
      </div>

      {/* Sub-Process Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {subProcessData.map((process) => {
          const StatusIcon = getStatusIcon(process.status);
          const ProcessIcon = process.icon;
          
          return (
            <EnhancedCard
              key={process.id}
              title={process.name}
              subtitle={`ROI Score: ${process.roiScore}`}
              icon={ProcessIcon}
              accentColor={process.color}
              badge={{
                label: process.status,
                icon: StatusIcon,
                color: getStatusColor(process.status)
              }}
            >
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
                    <span className="text-sm text-muted-foreground">Action Status</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-xs font-medium">In Progress</span>
                  </div>
                </div>
              </div>
            </EnhancedCard>
          );
        })}
      </div>

      {/* Summary Statistics */}
      <EnhancedCard
        title="Sub-Process Summary"
        subtitle="Aggregate statistics across all financial sub-processes"
        icon={Target}
        accentColor="#4160F0"
        className="mt-8"
      >
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
      </EnhancedCard>
    </div>
  );
};

export default SubProcessTab;
