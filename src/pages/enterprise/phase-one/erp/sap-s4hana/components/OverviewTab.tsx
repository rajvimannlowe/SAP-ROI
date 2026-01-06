import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { IconBadge } from "@/components/roi/IconBadge";
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
  return (
    <div className="space-y-4">
      {/* Main ROI Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* SAP FI Overall ROI Score */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div className="text-xs text-blue-700 font-medium uppercase">
                SAP FI OVERALL ROI SCORE
              </div>
            </div>
            <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded text-xs">
              <AlertTriangle className="h-3 w-3 text-orange-600" />
              <span className="text-orange-700 font-medium">
                {roiScoreData.criticalRisks} Critical,{" "}
                {roiScoreData.moderateRisks} Moderate Risks
              </span>
            </div>
          </div>

          <div className="mb-3">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {roiScoreData.score}
            </div>
            <div className="text-sm text-blue-700">
              {roiScoreData.description}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">Health Status</span>
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

        {/* Value at Risk Protected */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div className="text-xs text-green-700 font-medium uppercase">
                VALUE AT RISK PROTECTED
              </div>
            </div>
            <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded text-xs">
              <Shield className="h-3 w-3 text-green-600" />
              <span className="text-green-700 font-medium">
                2 of 3 sub-processes healthy
              </span>
            </div>
          </div>

          <div className="mb-3">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {roiScoreData.valueProtected}
            </div>
            <div className="text-sm text-green-700">
              Annual value protected by controls
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-700">Protection Rate</span>
              <span className="text-sm font-semibold text-green-600">
                93.5%
              </span>
            </div>
            <div className="text-xs text-green-600">
              Controls effectively mitigating financial risks
            </div>
          </div>
        </div>

        {/* Value at Risk Exposed */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div className="text-xs text-red-700 font-medium uppercase">
                VALUE AT RISK EXPOSED
              </div>
            </div>
            <div className="flex items-center gap-1 bg-red-100 px-2 py-1 rounded text-xs">
              <AlertTriangle className="h-3 w-3 text-red-600" />
              <span className="text-red-700 font-medium">
                {roiScoreData.activeRemediations} active remediation actions
              </span>
            </div>
          </div>

          <div className="mb-3">
            <div className="text-3xl font-bold text-red-600 mb-1">
              {roiScoreData.valueExposed}
            </div>
            <div className="text-sm text-red-700">
              Potential exposure requiring remediation
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-red-700">Risk Level</span>
              <span className="text-sm font-semibold text-red-600">
                Moderate
              </span>
            </div>
            <div className="text-xs text-red-600">
              Immediate attention required for risk mitigation
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <Card
        className="col-span-full"
        style={{
          borderColor: hexToRgba("#4160F0", 0.3),
          backgroundColor: hexToRgba("#4160F0", 0.02),
        }}
      >
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <IconBadge gradient={getGradient("#4160F0")} icon={DollarSign} />
            <div>
              <CardTitle>Enterprise Financial Controls ROI Synthesis</CardTitle>
              <CardDescription>
                Comprehensive overview of financial control effectiveness
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">16</div>
              <div className="text-sm text-blue-700">Total KPIs</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="text-2xl font-bold text-green-600">85%</div>
              <div className="text-sm text-green-700">Automation Rate</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-50 border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">$19.6M</div>
              <div className="text-sm text-purple-700">Total Value</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">24/7</div>
              <div className="text-sm text-orange-700">Monitoring</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;

