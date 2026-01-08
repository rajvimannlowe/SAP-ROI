import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoCard } from "@/components/roi/cards/InfoCard";
import { SummaryCards, SummaryCard } from "@/components/roi/cards/SummaryCards";
import { DeviationHeatmap } from "@/components/roi/DeviationHeatmap";
import {
  topRepeatingKPIs,
  topRepeatingRootCauses,
  processesWithFrequency,
  heatmapData,
  repeatTicketTrendData,
  strategicInsights,
} from "@/data/deviationAnalysisData";
import { ResponsiveBar } from "@nivo/bar";
import {
  AlertTriangle,
  TrendingDown,
  FileText,
  Users,
  Settings,
  Lightbulb,
  Target,
  RotateCcw,
  Zap,
  BarChart3,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useParams } from "react-router-dom";

export default function DeviationAnalysis() {
  const { id, moduleId, kpiId } = useParams();

  // Calculate trend summary
  const peakMonth = repeatTicketTrendData.reduce((max, item) =>
    item.percentage > max.percentage ? item : max
  );
  const latestMonth = repeatTicketTrendData[repeatTicketTrendData.length - 1];
  const reduction = peakMonth.percentage - latestMonth.percentage;
  const reductionPercent = Math.round((reduction / peakMonth.percentage) * 100);
  const absoluteReduction = peakMonth.repeatTickets - latestMonth.repeatTickets;
  const absoluteReductionPercent = Math.round(
    (absoluteReduction / peakMonth.repeatTickets) * 100
  );

  // Prepare bar chart data
  const barChartData = repeatTicketTrendData.map((item) => ({
    month: item.month,
    "Repeat Tickets": item.repeatTickets,
    "Total Tickets": item.totalTickets,
    percentage: item.percentage,
  }));

  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Page Header */}
      <PageHeader
        title="SAP FI - Repeat Deviations & Learning Dashboard"
        subtitle="Institutional Learning & Pattern Analysis"
        backTo={`/phase-i/catalog/${
          id || "sap-s4hana"
        }/blueprint/${moduleId}/cockpit/${kpiId}/actions/deviation-tickets`}
        backLabel="Back to Deviation Tickets"
      />

      {/* Purpose Statement */}
      <InfoCard
        icon={Lightbulb}
        iconGradient="linear-gradient(135deg, #9909e0 0%, #8b5cf6 100%)"
        title="SYSTEMIC LEARNING OVER BLAME"
        description="This dashboard analyzes patterns in repeat deviations to identify systemic weaknesses, not execution failures, to drive strategic improvements."
        borderColor="rgba(153, 9, 224, 0.3)"
        bgColor="rgba(153, 9, 224, 0.08)"
      />

      {/* Top Insights Section - Compact */}
      <Card className="border-border/50 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-[#4160F0] to-[#FF6700]">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
            <CardTitle className="text-lg font-bold text-foreground">
              Top Insights - Where to Focus
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Top Repeating KPIs - Compact */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-3.5 w-3.5 text-[#DC2626]" />
              <h3 className="text-sm font-semibold text-foreground">
                Top Repeating KPIs
              </h3>
            </div>
            <SummaryCards
              cards={topRepeatingKPIs.map(
                (kpi): SummaryCard => ({
                  title: kpi.name,
                  value: kpi.deviationCount,
                  icon: Target,
                  color: "#DC2626",
                  description: `${kpi.lastUpdated} • ${kpi.estimatedAnnualRisk} risk`,
                })
              )}
              columns={4}
            />
          </div>

          {/* Top Repeating Root Causes - Compact */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-3.5 w-3.5 text-[#EA580C]" />
              <h3 className="text-sm font-semibold text-foreground">
                Top Repeating Root Causes
              </h3>
            </div>
            <SummaryCards
              cards={topRepeatingRootCauses.map(
                (cause): SummaryCard => ({
                  title: cause.name,
                  value: cause.occurrences,
                  icon: AlertTriangle,
                  color: "#EA580C",
                  description: `${cause.lastUpdated} • ${cause.affectedItems} ${cause.affectedType}`,
                })
              )}
              columns={4}
            />
          </div>

          {/* Processes with Highest Frequency - Compact */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <RotateCcw className="h-3.5 w-3.5 text-[#9909e0]" />
              <h3 className="text-sm font-semibold text-foreground">
                Processes with Highest Frequency
              </h3>
            </div>
            <SummaryCards
              cards={processesWithFrequency.map(
                (process): SummaryCard => ({
                  title: process.name,
                  value: process.occurrences,
                  icon: RotateCcw,
                  color: "#9909e0",
                  description: `${process.lastUpdated} • ${process.kpisImpacted} KPIs`,
                })
              )}
              columns={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Heatmap Section */}
      <DeviationHeatmap data={heatmapData} />

      {/* Repeat Tickets Trend Over Time - Enhanced */}
      <Card className="border-2 border-border/50 shadow-xl overflow-hidden">
        <CardHeader className="pb-4 bg-gradient-to-r from-[#9909e0]/5 to-transparent border-b border-border/50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#9909e0] to-[#8b5cf6] shadow-md">
                <TrendingDown className="h-5 w-5 text-white" />
              </div>
              <span>Repeat Tickets Trend Over Time</span>
            </CardTitle>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/20">
              <TrendingDown className="h-4 w-4 text-[#10b981]" />
              <span className="text-xs font-semibold text-[#10b981]">
                {reductionPercent}% Improvement
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div style={{ height: "450px" }}>
            <ResponsiveBar
              data={barChartData}
              keys={["Repeat Tickets"]}
              indexBy="month"
              margin={{ top: 50, right: 130, bottom: 80, left: 60 }}
              padding={0.4}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={(bar) => {
                const value = bar.data["Repeat Tickets"] as number;
                if (value >= 9) return "#DC2626"; // Critical - Red
                if (value >= 7) return "#EA580C"; // High - Orange
                if (value >= 5) return "#F59E0B"; // Medium - Yellow
                return "#10b981"; // Low - Green
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -45,
                legend: "Month",
                legendPosition: "middle",
                legendOffset: 60,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Number of Repeat Tickets",
                legendPosition: "middle",
                legendOffset: -50,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor="#ffffff"
              borderRadius={8}
              tooltip={({ value, indexValue, data }) => (
                <div
                  className="bg-white p-4 rounded-xl border-2 shadow-xl"
                  style={{
                    borderColor: "#9909e0",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-[#9909e0]" />
                    <strong className="text-sm font-bold">{indexValue}</strong>
                  </div>
                  <div className="text-lg font-bold text-[#9909e0] mb-1">
                    {value} repeat tickets
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-muted-foreground">
                      {data.percentage}% of total
                    </span>
                    <span className="text-muted-foreground">
                      {data["Total Tickets"]} total tickets
                    </span>
                  </div>
                </div>
              )}
              theme={{
                text: {
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 12,
                  fontWeight: 500,
                },
                grid: {
                  line: {
                    stroke: "hsl(var(--border))",
                    strokeWidth: 1,
                    strokeDasharray: "4 4",
                  },
                },
                axis: {
                  domain: {
                    line: {
                      stroke: "hsl(var(--border))",
                      strokeWidth: 2,
                    },
                  },
                  ticks: {
                    line: {
                      stroke: "hsl(var(--border))",
                      strokeWidth: 1,
                    },
                    text: {
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 11,
                    },
                  },
                },
              }}
            />
          </div>

          {/* Trend Summary - Enhanced */}
          <div className="mt-6 relative overflow-hidden rounded-xl border-2 border-[#10b981]/30 bg-gradient-to-br from-[#10b981]/10 via-[#10b981]/5 to-transparent p-5 shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#10b981]/5 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[#10b981] shadow-md">
                  <TrendingDown className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-foreground">
                    Positive Trend: {reductionPercent}% Reduction in Repeat Rate
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Significant improvement achieved
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div className="p-3 rounded-lg bg-white/50 border border-[#10b981]/20">
                  <div className="text-xs text-muted-foreground mb-1">
                    Peak Rate
                  </div>
                  <div className="text-lg font-bold text-[#DC2626]">
                    {peakMonth.percentage}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {peakMonth.month}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/50 border border-[#10b981]/20">
                  <div className="text-xs text-muted-foreground mb-1">
                    Current Rate
                  </div>
                  <div className="text-lg font-bold text-[#10b981]">
                    {latestMonth.percentage}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {latestMonth.month}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/50 border border-[#10b981]/20">
                  <div className="text-xs text-muted-foreground mb-1">
                    Absolute Reduction
                  </div>
                  <div className="text-lg font-bold text-[#10b981]">
                    {absoluteReductionPercent}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {absoluteReduction} tickets
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The repeat ticket rate decreased from a peak of{" "}
                {peakMonth.percentage}% in {peakMonth.month} to{" "}
                {latestMonth.percentage}% in {latestMonth.month}, representing a{" "}
                {reductionPercent}% improvement. This is attributed to control
                enhancements implemented in the Q4 2024 feedback loop, with the
                absolute repeat ticket count declining from{" "}
                {peakMonth.repeatTickets} to {latestMonth.repeatTickets} (
                {absoluteReductionPercent}% reduction), indicating systematic
                learning.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategic Insights & Recommended Actions - Enhanced */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-2 border-b-2 border-border/50">
          <div className="p-2 rounded-lg bg-gradient-to-br from-[#4160F0] to-[#FF6700]">
            <Lightbulb className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Strategic Insights & Recommended Actions
          </h2>
        </div>

        {/* System Insight */}
        {strategicInsights
          .filter((insight) => insight.type === "system")
          .map((insight) => (
            <InfoCard
              key={insight.title}
              icon={Lightbulb}
              iconGradient="linear-gradient(135deg, #2563EB 0%, #4160F0 100%)"
              title={insight.title}
              description={
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {insight.issue}
                  </p>
                  <div className="pt-2 border-t border-border/30">
                    <p className="text-xs font-semibold text-foreground mb-1">
                      RECOMMENDATION:
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {insight.recommendation}
                    </p>
                  </div>
                </div>
              }
              borderColor="rgba(37, 99, 235, 0.3)"
              bgColor="rgba(37, 99, 235, 0.08)"
            />
          ))}

        {/* Control Design Insights */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-[#10b981]" />
            <h3 className="text-base font-semibold text-foreground">
              Where Control Design Must Evolve
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#10b981]/30 to-transparent" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {strategicInsights
              .filter((insight) => insight.type === "control")
              .map((insight) => (
                <InfoCard
                  key={insight.title}
                  icon={Settings}
                  iconGradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                  title={insight.title}
                  description={
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-2">
                          <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
                          <span className="text-red-700">ISSUE:</span>
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed pl-5">
                          {insight.issue}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-border/30">
                        <p className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-2">
                          <Lightbulb className="h-3.5 w-3.5 text-blue-600" />
                          <span className="text-blue-700">RECOMMENDATION:</span>
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed pl-5">
                          {insight.recommendation}
                        </p>
                      </div>
                      {insight.expectedImpact && (
                        <div className="pt-2 border-t border-border/30 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
                          <p className="text-sm font-semibold text-[#10b981]">
                            Expected impact: {insight.expectedImpact}
                          </p>
                        </div>
                      )}
                    </div>
                  }
                  borderColor="rgba(16, 185, 129, 0.3)"
                  bgColor="rgba(16, 185, 129, 0.08)"
                />
              ))}
          </div>
        </div>

        {/* Training/Policy Insights */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#F59E0B]" />
            <h3 className="text-base font-semibold text-foreground">
              Where Training or Policy Change Is Required
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#F59E0B]/30 to-transparent" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {strategicInsights
              .filter((insight) => insight.type === "training")
              .map((insight) => (
                <InfoCard
                  key={insight.title}
                  icon={Users}
                  iconGradient="linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)"
                  title={insight.title}
                  description={
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-2">
                          <FileText className="h-3.5 w-3.5 text-orange-600" />
                          <span className="text-orange-700">FINDING:</span>
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed pl-5">
                          {insight.issue}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-border/30">
                        <p className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-2">
                          <Zap className="h-3.5 w-3.5 text-blue-600" />
                          <span className="text-blue-700">
                            ACTION REQUIRED:
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed pl-5">
                          {insight.recommendation}
                        </p>
                      </div>
                      {insight.timeline && (
                        <div className="pt-2 border-t border-border/30 flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[#F59E0B]" />
                          <p className="text-sm font-semibold text-[#F59E0B]">
                            Timeline: {insight.timeline}
                          </p>
                        </div>
                      )}
                    </div>
                  }
                  borderColor="rgba(245, 158, 11, 0.3)"
                  bgColor="rgba(245, 158, 11, 0.08)"
                />
              ))}
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <InfoCard
        icon={FileText}
        iconGradient="linear-gradient(135deg, #6B7280 0%, #4B5563 100%)"
        title="Persistent Deviations Indicate Design Issues, Not Execution Failures"
        description="Recurring deviations, despite remediation efforts, suggest systemic factors like inadequate process capacity, insufficient automation, policy ambiguity, or control design gaps. This dashboard guides strategic investment in automation, capacity, training, and policy development to address root causes and prevent recurrence, fostering a mature control environment."
        borderColor="rgba(107, 114, 128, 0.3)"
        bgColor="rgba(107, 114, 128, 0.08)"
      />
    </div>
  );
}
