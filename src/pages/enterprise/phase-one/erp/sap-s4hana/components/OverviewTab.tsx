import { InfoCard } from "@/components/roi/cards/InfoCard";
import { SummaryCard } from "@/components/roi/cards/SummaryCards";
import { roiScoreData } from "@/data/roiAggregationData";
import { TrendingUp, AlertTriangle, Shield, DollarSign } from "lucide-react";

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getGradient = (color: string) =>
  `linear-gradient(135deg, ${color} 0%, ${hexToRgba(color, 0.8)} 100%)`;

const OverviewTab = () => {
  const summaryCards: SummaryCard[] = [
    {
      title: "Total KPIs",
      value: "16",
      icon: DollarSign,
      color: "#2563eb",
    },
    {
      title: "Automation Rate",
      value: "85%",
      icon: TrendingUp,
      color: "#10b981",
    },
    {
      title: "Total Value",
      value: "$19.6M",
      icon: Shield,
      color: "#9333ea",
    },
    {
      title: "Monitoring",
      value: "24/7",
      icon: AlertTriangle,
      color: "#f59e0b",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Main ROI Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* SAP FI Overall ROI Score */}
        <InfoCard
          icon={TrendingUp}
          iconGradient={getGradient("#2563eb")}
          title="SAP FI Overall ROI Score"
          value={roiScoreData.score}
          description={
            <div className="space-y-3 mt-2">
              <p className="text-sm text-foreground">{roiScoreData.description}</p>
              <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded text-xs w-fit">
                <AlertTriangle className="h-3 w-3 text-orange-600" />
                <span className="text-orange-700 font-medium">
                  {roiScoreData.criticalRisks} Critical,{" "}
                  {roiScoreData.moderateRisks} Moderate Risks
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Health Status</span>
                  <span className="text-sm font-semibold text-blue-600">
                    Excellent
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: "96%" }}
                  ></div>
                </div>
              </div>
            </div>
          }
          borderColor={hexToRgba("#2563eb", 0.3)}
          bgColor={hexToRgba("#2563eb", 0.05)}
        />

        {/* Value at Risk Protected */}
        <InfoCard
          icon={Shield}
          iconGradient={getGradient("#10b981")}
          title="Value at Risk Protected"
          value={roiScoreData.valueProtected}
          description={
            <div className="space-y-3 mt-2">
              <p className="text-sm text-foreground">
                Annual value protected by controls
              </p>
              <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded text-xs w-fit">
                <Shield className="h-3 w-3 text-green-600" />
                <span className="text-green-700 font-medium">
                  2 of 3 sub-processes healthy
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Protection Rate</span>
                  <span className="text-sm font-semibold text-green-600">
                    93.5%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Controls effectively mitigating financial risks
                </p>
              </div>
            </div>
          }
          borderColor={hexToRgba("#10b981", 0.3)}
          bgColor={hexToRgba("#10b981", 0.05)}
        />

        {/* Value at Risk Exposed */}
        <InfoCard
          icon={AlertTriangle}
          iconGradient={getGradient("#ef4444")}
          title="Value at Risk Exposed"
          value={roiScoreData.valueExposed}
          description={
            <div className="space-y-3 mt-2">
              <p className="text-sm text-foreground">
                Potential exposure requiring remediation
              </p>
              <div className="flex items-center gap-1 bg-red-100 px-2 py-1 rounded text-xs w-fit">
                <AlertTriangle className="h-3 w-3 text-red-600" />
                <span className="text-red-700 font-medium">
                  {roiScoreData.activeRemediations} active remediation actions
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Risk Level</span>
                  <span className="text-sm font-semibold text-red-600">
                    Moderate
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Immediate attention required for risk mitigation
                </p>
              </div>
            </div>
          }
          borderColor={hexToRgba("#ef4444", 0.3)}
          bgColor={hexToRgba("#ef4444", 0.05)}
        />
      </div>

      {/* Key Metrics Summary */}
      <InfoCard
        icon={DollarSign}
        iconGradient={getGradient("#4160F0")}
        title="Enterprise Financial Controls ROI Synthesis"
        description={
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Comprehensive overview of financial control effectiveness
            </p>
            <SummaryCards cards={summaryCards} columns={4} />
          </div>
        }
        borderColor={hexToRgba("#4160F0", 0.3)}
        bgColor={hexToRgba("#4160F0", 0.02)}
      />
    </div>
  );
};

export default OverviewTab;

