import { BarChart3 } from "lucide-react";
import { ROIMetric } from "../../../../../../data/productBlueprintData";
import { ROIMetricCard } from "../../../../../../components/roi/ROIMetricCard";
import { IconBadge } from "../../../../../../components/roi/IconBadge";
import { SectionHeader } from "./SectionHeader";
import { gradientStyles } from "./constants";

interface MetricsSectionProps {
  primaryMetrics: ROIMetric[];
  secondaryMetrics: ROIMetric[];
  getDimensionColor: (dimension: string) => string;
}

export function MetricsSection({
  primaryMetrics,
  secondaryMetrics,
  getDimensionColor,
}: MetricsSectionProps) {
  const metricGroups = [
    {
      title: "Primary ROI Metrics",
      metrics: primaryMetrics,
      gradient: gradientStyles.emerald,
      badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      title: "Secondary ROI Metrics",
      metrics: secondaryMetrics,
      gradient: gradientStyles.purple,
      badgeStyle: "bg-purple-50 text-purple-700 border-purple-200",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      <SectionHeader
        title="ROI Measurement Contract"
        subtitle="Primary and secondary metrics for value measurement and governance"
      />
      <div className="space-y-5">
        {metricGroups.map(({ title, metrics, gradient, badgeStyle }) => (
          <div key={title}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <IconBadge gradient={gradient} icon={BarChart3} />
                <h3 className="text-lg font-bold text-foreground">{title}</h3>
              </div>
              <span
                className={`px-2.5 py-1 ${badgeStyle} rounded-full text-xs font-semibold border`}
              >
                {metrics.length} Metrics
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {metrics.map((metric) => (
                <ROIMetricCard
                  key={metric.id}
                  {...metric}
                  dimensionColor={getDimensionColor(metric.dimension)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

