import { PageHeader } from "@/components/layout/PageHeader";
import { InfoCard } from "@/components/roi/cards/InfoCard";
import { SummaryCards, SummaryCard } from "@/components/roi/cards/SummaryCards";
import { DeviationHeatmap } from "@/components/roi/DeviationHeatmap";
import { MetricCard } from "@/components/roi/cards/MetricCard";
import {
  topRepeatingKPIs,
  topRepeatingRootCauses,
  processesWithFrequency,
  heatmapData,
  repeatTicketTrendData,
  strategicInsights,
} from "@/data/deviationAnalysisData";
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

  return (
    <div className="flex flex-col gap-6 pb-8">
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

      {/* Top Insights Section - Using InfoCard */}
      <InfoCard
        icon={BarChart3}
        iconGradient="linear-gradient(135deg, #4160F0 0%, #FF6700 100%)"
        title="Top Insights - Where to Focus"
        description={
          <div className="space-y-4 mt-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-3.5 w-3.5 text-[#DC2626]" />
                <h4 className="text-xs font-semibold text-foreground">
                  Top Repeating KPIs
                </h4>
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
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-3.5 w-3.5 text-[#EA580C]" />
                <h4 className="text-xs font-semibold text-foreground">
                  Top Repeating Root Causes
                </h4>
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
            <div>
              <div className="flex items-center gap-2 mb-2">
                <RotateCcw className="h-3.5 w-3.5 text-[#9909e0]" />
                <h4 className="text-xs font-semibold text-foreground">
                  Processes with Highest Frequency
                </h4>
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
          </div>
        }
        borderColor="rgba(65, 96, 240, 0.3)"
        bgColor="rgba(65, 96, 240, 0.08)"
      />

      {/* Heatmap Section */}
      <DeviationHeatmap data={heatmapData} />

      {/* Repeat Tickets Trend Over Time - Compact */}
      <InfoCard
        icon={TrendingDown}
        iconGradient="linear-gradient(135deg, #9909e0 0%, #8b5cf6 100%)"
        title="Repeat Tickets Trend Analysis"
        value={`${reductionPercent}% Improvement`}
        description={
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground">
              Tracking repeat deviation patterns over time
            </p>

            {/* Key Metrics Cards - Using MetricCard Component */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <MetricCard
                icon={AlertTriangle}
                value={`${peakMonth.percentage}%`}
                title="Peak Rate"
                description={`${peakMonth.month} • ${peakMonth.repeatTickets} tickets`}
                color="#DC2626"
                backgroundColor="rgba(220, 38, 38, 0.1)"
                showStatusDot={true}
              />
              <MetricCard
                icon={TrendingDown}
                value={`${latestMonth.percentage}%`}
                title="Current Rate"
                description={`${latestMonth.month} • ${latestMonth.repeatTickets} tickets`}
                color="#10b981"
                backgroundColor="rgba(16, 185, 129, 0.1)"
              />
              <MetricCard
                icon={TrendingDown}
                value={`${reductionPercent}%`}
                title="Reduction"
                description={`${absoluteReduction} fewer tickets`}
                color="#10b981"
                backgroundColor="rgba(16, 185, 129, 0.1)"
              />
              <MetricCard
                icon={Clock}
                value="6 Months"
                title="Trend Period"
                description="Jul 2024 - Dec 2024"
                color="#9909e0"
                backgroundColor="rgba(153, 9, 224, 0.1)"
              />
            </div>

            {/* Key Insights - Compact */}
            <div className="space-y-3">
              <InfoCard
                icon={CheckCircle2}
                iconGradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                title={`Positive Trend: ${reductionPercent}% Reduction in Repeat Rate`}
                description={
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The repeat ticket rate decreased from a peak of{" "}
                    <strong className="text-[#DC2626]">
                      {peakMonth.percentage}%
                    </strong>{" "}
                    in <strong>{peakMonth.month}</strong> to{" "}
                    <strong className="text-[#10b981]">
                      {latestMonth.percentage}%
                    </strong>{" "}
                    in <strong>{latestMonth.month}</strong>, representing a{" "}
                    <strong className="text-[#10b981]">
                      {reductionPercent}% improvement
                    </strong>
                    .
                  </p>
                }
                borderColor="rgba(16, 185, 129, 0.3)"
                bgColor="rgba(16, 185, 129, 0.08)"
                onClick={() => {
                  console.log("Positive Trend insight clicked");
                  // Add navigation or action here
                }}
              />

              <InfoCard
                icon={Zap}
                iconGradient="linear-gradient(135deg, #9909e0 0%, #8b5cf6 100%)"
                title="Systematic Learning Achieved"
                description={
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The absolute repeat ticket count declined from{" "}
                    <strong>{peakMonth.repeatTickets}</strong> to{" "}
                    <strong className="text-[#10b981]">
                      {latestMonth.repeatTickets}
                    </strong>{" "}
                    (
                    <strong className="text-[#10b981]">
                      {absoluteReductionPercent}% reduction
                    </strong>
                    ), indicating systematic learning and effective control
                    enhancements implemented in the Q4 2024 feedback loop.
                  </p>
                }
                borderColor="rgba(153, 9, 224, 0.3)"
                bgColor="rgba(153, 9, 224, 0.08)"
                onClick={() => {
                  console.log("Systematic Learning insight clicked");
                  // Add navigation or action here
                }}
              />

              <InfoCard
                icon={Target}
                iconGradient="linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)"
                title="Continuous Improvement Path"
                description={
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The consistent downward trend demonstrates that process
                    improvements, automation enhancements, and policy
                    clarifications are effectively reducing repeat deviations,
                    fostering a mature control environment.
                  </p>
                }
                borderColor="rgba(245, 158, 11, 0.3)"
                bgColor="rgba(245, 158, 11, 0.08)"
                onClick={() => {
                  console.log("Continuous Improvement insight clicked");
                  // Add navigation or action here
                }}
              />
            </div>
          </div>
        }
        borderColor="rgba(153, 9, 224, 0.3)"
        bgColor="rgba(153, 9, 224, 0.08)"
      />

      {/* Strategic Insights & Recommended Actions - Compact */}
      <InfoCard
        icon={Lightbulb}
        iconGradient="linear-gradient(135deg, #4160F0 0%, #FF6700 100%)"
        title="Strategic Insights & Recommended Actions"
        description={
          <div className="space-y-4 mt-3">
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
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Settings className="h-4 w-4 text-[#10b981]" />
                <h3 className="text-sm font-semibold text-foreground">
                  Where Control Design Must Evolve
                </h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
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
                              <span className="text-blue-700">
                                RECOMMENDATION:
                              </span>
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
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-[#F59E0B]" />
                <h3 className="text-sm font-semibold text-foreground">
                  Where Training or Policy Change Is Required
                </h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
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
        }
        borderColor="rgba(65, 96, 240, 0.3)"
        bgColor="rgba(65, 96, 240, 0.08)"
      />

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
