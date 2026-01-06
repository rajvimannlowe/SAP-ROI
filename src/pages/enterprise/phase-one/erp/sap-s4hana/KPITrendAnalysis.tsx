import { useParams, useNavigate } from "react-router-dom";
import {
  FileText,
  ClipboardList,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  LucideIcon,
  Sparkles,
  ArrowUpRight,
  Target,
} from "lucide-react";
import { PageHeader } from "../../../../../components/layout/PageHeader";
import { MODULE_COCKPIT_DATA } from "../../../../../data/moduleCockpitData";
import { StatusBadge } from "../../../../../components/roi/StatusBadge";
import { InfoCard } from "../../../../../components/roi/InfoCard";
import { MetricCard } from "../../../../../components/roi/MetricCard";
import { PerformanceTrendChart } from "../../../../../components/roi/PerformanceTrendChart";
import { Button } from "../../../../../components/ui/button";
import { getStatusColor } from "../../../../../data/statusMapping";
import { getTrendConfig } from "../../../../../data/kpiTrendData";
import { getTrendContent } from "../../../../../data/kpiTrendContent";

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getGradient = (color: string) =>
  `linear-gradient(135deg, ${color} 0%, ${hexToRgba(color, 0.8)} 100%)`;

const createInfoCardProps = (
  icon: LucideIcon,
  title: string,
  description: string | React.ReactNode,
  color: string
) => ({
  icon,
  iconGradient: getGradient(color),
  title,
  description,
  borderColor: hexToRgba(color, 0.3),
  bgColor: hexToRgba(color, 0.05),
});

const iconMap: Record<string, LucideIcon> = {
  TrendingDown,
  TrendingUp,
  CheckCircle2,
};

export function KPITrendAnalysis() {
  const {
    moduleId,
    kpiId,
    id: blueprintId,
  } = useParams<{
    moduleId: string;
    kpiId: string;
    id: string;
  }>();
  const navigate = useNavigate();

  const cockpitData = moduleId ? MODULE_COCKPIT_DATA[moduleId] : null;
  const kpiDetail = cockpitData?.kpiDetails.find((kpi) => kpi.id === kpiId);

  if (!cockpitData || !kpiDetail) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            KPI Not Found
          </h2>
          <p className="text-muted-foreground mb-4">
            The requested KPI trend analysis is not available.
          </p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const statusColor = getStatusColor(kpiDetail.status);
  const trendConfig = getTrendConfig(kpiId || "default");
  const trendContent = getTrendContent(kpiId || "default");

  const latestValue =
    trendConfig.data[0]?.data[trendConfig.data[0].data.length - 1]?.y || 0;
  const firstValue = trendConfig.data[0]?.data[0]?.y || 0;
  const improvement = ((latestValue - firstValue) / firstValue) * 100;
  const targetValue =
    trendConfig.thresholds.find((t) => t.id === "target")?.value || 100;

  return (
    <div className="space-y-6">
      <PageHeader
        title={kpiDetail.name}
        subtitle={`SAP ${cockpitData.moduleName} - KPI Trend & ROI Signal`}
        backTo={`/phase-i/catalog/${
          blueprintId || "sap-s4hana"
        }/blueprint/${moduleId}/cockpit/${kpiId}`}
        backLabel="Back to KPI Detail"
        rightContent={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => {}}
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Control Evidence</span>
            </Button>
            <Button
              size="sm"
              className="gap-2"
              style={{ backgroundColor: "#10b981" }}
              onClick={() => {}}
            >
              <ClipboardList className="h-4 w-4" />
              <span className="hidden sm:inline">Action Tracker</span>
            </Button>
            <div
              className="px-4 py-2 rounded-lg border flex items-center gap-2 shadow-sm"
              style={{
                backgroundColor: hexToRgba(statusColor, 0.1),
                borderColor: hexToRgba(statusColor, 0.3),
              }}
            >
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Current Status
              </span>
              <StatusBadge status={kpiDetail.status} size="sm" />
            </div>
          </div>
        }
      />

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          icon={Sparkles}
          value={`${latestValue}%`}
          title="Current Value"
          description="Latest measurement"
          color={statusColor}
        />
        <MetricCard
          icon={TrendingUp}
          value={`+${improvement.toFixed(1)}%`}
          title="Improvement"
          description="Since January"
          color="#10b981"
        />
        <MetricCard
          icon={Target}
          value={`${targetValue}%`}
          title="Target"
          description="Performance target"
          color="#2563eb"
        />
        <MetricCard
          icon={ArrowUpRight}
          value="↑"
          title="Trend"
          description="Upward trajectory"
          color="#9333ea"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <div className="relative">
            {kpiDetail.roiDimension && (
              <span className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow-md">
                {kpiDetail.roiDimension}
              </span>
            )}
            <PerformanceTrendChart
              title="6-Month Performance Trend"
              data={trendConfig.data}
              thresholds={trendConfig.thresholds}
              yAxisConfig={trendConfig.yAxisConfig}
              xAxisLabel={trendConfig.xAxisLabel}
              yAxisLabel={trendConfig.yAxisLabel}
              color={statusColor}
            />
          </div>
        </div>

        {/* Interpretation Summary */}
        <div className="space-y-4">
          <InfoCard
            icon={Sparkles}
            iconGradient={getGradient("#10b981")}
            title="Interpretation Summary"
            description={
              <div className="space-y-3 mt-2">
                {trendContent.interpretationSummary.map((item, index) => {
                  const IconComponent = iconMap[item.icon] || TrendingUp;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="p-1.5 rounded-lg"
                          style={{
                            backgroundColor: hexToRgba(item.color, 0.15),
                          }}
                        >
                          <IconComponent
                            className="h-4 w-4"
                            style={{ color: item.color }}
                          />
                        </div>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          {item.label}
                        </span>
                      </div>
                      {item.badge ? (
                        <span
                          className="px-3 py-1 rounded-md text-xs font-bold text-white"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.value}
                        </span>
                      ) : (
                        <span
                          className="text-sm font-bold"
                          style={{ color: item.color }}
                        >
                          {item.value}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            }
            borderColor={hexToRgba("#10b981", 0.3)}
            bgColor={hexToRgba("#10b981", 0.05)}
          />
        </div>
      </div>

      {/* Bottom Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Insight */}
        <InfoCard
          {...createInfoCardProps(
            AlertCircle,
            "Business Insight",
            <p className="text-sm leading-relaxed">
              {trendContent.businessInsight}
            </p>,
            "#2563eb"
          )}
        />

        {/* Positive Signals */}
        <InfoCard
          icon={CheckCircle}
          iconGradient={getGradient("#10b981")}
          title="Positive Signals"
          description={
            <ul className="space-y-3 mt-2">
              {trendContent.positiveSignals.map((signal, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground leading-relaxed">
                    {signal}
                  </span>
                </li>
              ))}
            </ul>
          }
          borderColor={hexToRgba("#10b981", 0.3)}
          bgColor={hexToRgba("#10b981", 0.08)}
        />
      </div>

      {/* Key Observations */}
      <InfoCard
        {...createInfoCardProps(
          AlertCircle,
          "Key Observations",
          <ul className="space-y-3 mt-2">
            {trendContent.keyObservations.map((observation, index) => (
              <li key={index} className="flex items-start gap-3">
                <div
                  className="mt-2 w-2 h-2 rounded-full shrink-0"
                  style={{
                    backgroundColor: "#4160F0",
                    boxShadow: `0 0 8px ${hexToRgba("#4160F0", 0.4)}`,
                  }}
                />
                <span className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {observation}
                </span>
              </li>
            ))}
          </ul>,
          "#9333ea"
        )}
      />
    </div>
  );
}
