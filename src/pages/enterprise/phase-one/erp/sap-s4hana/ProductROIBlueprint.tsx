import { useState } from "react";
import {
  Target,
  BarChart3,
  Database,
  Brain,
  Layers,
  Zap,
  Clock,
  Cpu,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { SAP_S4HANA_BLUEPRINT } from "../../../../../data/productBlueprintData";
import { ROIIntentCard } from "../../../../../components/roi/ROIIntentCard";
import { ROIMetricCard } from "../../../../../components/roi/ROIMetricCard";
import { InfoCard } from "../../../../../components/roi/InfoCard";
import { IconBadge } from "../../../../../components/roi/IconBadge";
import { PageHeader } from "../../../../../components/layout/PageHeader";

type Section = "intent" | "metrics" | "data" | "intelligence" | "modules";

const sections = [
  { id: "intent" as Section, label: "ROI Intent", icon: Target },
  { id: "metrics" as Section, label: "Metrics", icon: BarChart3 },
  { id: "data" as Section, label: "Data & Integration", icon: Database },
  { id: "intelligence" as Section, label: "Intelligence", icon: Brain },
  { id: "modules" as Section, label: "Modules", icon: Layers },
];

const gradientStyles = {
  primary: "linear-gradient(135deg, #4160F0 0%, #2563eb 100%)",
  brand: "linear-gradient(135deg, #4160F0 0%, #FF6700 100%)",
  emerald: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  purple: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
  indigo: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
  amber: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
  blueBg:
    "linear-gradient(135deg, rgba(65, 96, 240, 0.05) 0%, rgba(65, 96, 240, 0.02) 100%)",
  purpleBg:
    "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(139, 92, 246, 0.02) 100%)",
  brandBg:
    "linear-gradient(135deg, rgba(65, 96, 240, 0.05) 0%, rgba(255, 103, 0, 0.05) 100%)",
  amberBg:
    "linear-gradient(135deg, rgba(254, 243, 199, 0.5) 0%, rgba(253, 230, 138, 0.3) 100%)",
  footerBg:
    "linear-gradient(135deg, rgba(65, 96, 240, 0.03) 0%, rgba(255, 103, 0, 0.03) 100%)",
};

const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <div>
    <h2 className="text-xl font-bold text-foreground mb-2">{title}</h2>
    <p className="text-sm text-muted-foreground">{subtitle}</p>
  </div>
);

export function ProductROIBlueprint() {
  const blueprint = SAP_S4HANA_BLUEPRINT;
  const [activeSection, setActiveSection] = useState<Section>("intent");

  const getDimensionColor = (dimension: string) =>
    blueprint.roiIntents.find((intent) =>
      dimension.includes(intent.label.split(" ")[0])
    )?.color || "#6B7280";

  return (
    <div className="space-y-6">
      <PageHeader
        title={blueprint.productSuite}
        subtitle="Product ROI Blueprint"
        backTo="/phase-i/catalog"
        rightContent={
          <>
            <div className="text-right">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                Vendor
              </p>
              <p className="text-sm font-bold text-foreground">
                {blueprint.vendor}
              </p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-right">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                Category
              </p>
              <p className="text-sm font-bold text-foreground">
                {blueprint.category}
              </p>
            </div>
            <span className="px-2.5 py-0.5 text-xs font-semibold text-[#4160F0] bg-blue-50 rounded-full border border-blue-200">
              {blueprint.phase}
            </span>
          </>
        }
      />

      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm -mx-6 lg:-mx-8 px-6 lg:px-8 py-2.5 border-b border-border/50">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {sections.map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-gradient-to-r from-[#4160F0] to-[#FF6700] text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : ""}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        {activeSection === "intent" && (
          <div className="space-y-5 animate-in fade-in-50 duration-300">
            <SectionHeader
              title="ROI Dimensions & Intent"
              subtitle="Strategic ROI dimensions and their value realization intents"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {blueprint.roiIntents.map((intent) => (
                <ROIIntentCard key={intent.id} {...intent} />
              ))}
            </div>
          </div>
        )}

        {activeSection === "metrics" && (
          <div className="space-y-6 animate-in fade-in-50 duration-300">
            <SectionHeader
              title="ROI Measurement Contract"
              subtitle="Primary and secondary metrics for value measurement and governance"
            />
            <div className="space-y-5">
              {[
                {
                  title: "Primary ROI Metrics",
                  metrics: blueprint.primaryMetrics,
                  gradient: gradientStyles.emerald,
                  badgeStyle:
                    "bg-emerald-50 text-emerald-700 border-emerald-200",
                },
                {
                  title: "Secondary ROI Metrics",
                  metrics: blueprint.secondaryMetrics,
                  gradient: gradientStyles.purple,
                  badgeStyle: "bg-purple-50 text-purple-700 border-purple-200",
                },
              ].map(({ title, metrics, gradient, badgeStyle }) => (
                <div key={title}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <IconBadge gradient={gradient} icon={BarChart3} />
                      <h3 className="text-lg font-bold text-foreground">
                        {title}
                      </h3>
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
        )}

        {activeSection === "data" && (
          <div className="space-y-5 animate-in fade-in-50 duration-300">
            <SectionHeader
              title="Data & Integration Contract"
              subtitle="Data sources, integration methods, and update frequencies"
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="lg:col-span-2 group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-md hover:shadow-xl hover:border-border/70 transition-all duration-300">
                <div className="p-3">
                  <div
                    className="rounded-lg p-3.5 shadow-sm border relative overflow-hidden"
                    style={{
                      backgroundColor: "rgba(65, 96, 240, 0.05)",
                      borderColor: "rgba(65, 96, 240, 0.2)",
                    }}
                  >
                    <div className="flex items-center gap-2.5 mb-4">
                      <IconBadge
                        gradient={gradientStyles.primary}
                        icon={Database}
                      />
                      <h3 className="text-base font-bold text-foreground">
                        Data Sources
                      </h3>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                        Internal Sources
                      </p>
                      <ul className="space-y-2">
                        {blueprint.dataSources.sources.map((source, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs text-foreground"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#4160F0] mt-0.5 shrink-0" />
                            <span className="leading-relaxed">{source}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <InfoCard
                  icon={Zap}
                  iconGradient={gradientStyles.brand}
                  title="Integration Method"
                  value={blueprint.integrationMethod}
                  description={blueprint.integrationDetails}
                />
                <InfoCard
                  icon={Clock}
                  iconGradient={gradientStyles.purple}
                  title="Update Frequency"
                  value={blueprint.updateFrequency}
                  description={blueprint.updateFrequencyDetails}
                  borderColor="rgba(139, 92, 246, 0.2)"
                  bgColor="rgba(139, 92, 246, 0.05)"
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === "intelligence" && (
          <div className="space-y-5 animate-in fade-in-50 duration-300">
            <SectionHeader
              title="Intelligence & Dependencies"
              subtitle="Algorithm logic, AI/ML capabilities, and key dependencies"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="border border-border/50 rounded-lg p-4 bg-card shadow-sm">
                <div className="flex items-center gap-2.5 mb-3">
                  <IconBadge gradient={gradientStyles.indigo} icon={Cpu} />
                  <h3 className="text-base font-bold text-foreground">
                    Algorithm Logic
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {blueprint.algorithmLogic}
                </p>
              </div>
              <div
                className="border rounded-lg p-4 shadow-sm"
                style={{
                  borderColor: "rgba(65, 96, 240, 0.2)",
                  background: gradientStyles.brandBg,
                }}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <IconBadge gradient={gradientStyles.brand} icon={Brain} />
                  <h3 className="text-base font-bold text-foreground">
                    AI / ML Overlay
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {blueprint.aiMlOverlay}
                </p>
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold text-white"
                  style={{ background: gradientStyles.brand }}
                >
                  <TrendingUp className="h-3 w-3" />
                  Predictive analytics enabled
                </div>
              </div>
            </div>
            <div
              className="border rounded-lg p-4 shadow-sm"
              style={{
                borderColor: "rgba(245, 158, 11, 0.3)",
                background: gradientStyles.amberBg,
              }}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <IconBadge
                  gradient={gradientStyles.amber}
                  icon={AlertTriangle}
                />
                <h3 className="text-base font-bold text-foreground">
                  Key Dependencies & Constraints
                </h3>
              </div>
              <ul className="space-y-2">
                {blueprint.dependencies.map((dep, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-foreground"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{ background: gradientStyles.amber }}
                    />
                    <span className="leading-relaxed">{dep}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeSection === "modules" && (
          <div className="space-y-5 animate-in fade-in-50 duration-300">
            <SectionHeader
              title="Modules"
              subtitle="Select a module to view detailed ROI cockpit and metrics"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {blueprint.subModules.map((module) => {
                const isActive = module.id === "fi";
                return (
                  <button
                    key={module.id}
                    className={`group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-md hover:shadow-xl transition-all duration-300 ${
                      isActive
                        ? "ring-2 ring-[#4160F0]/30 border-[#4160F0]/50"
                        : "hover:border-[#4160F0]/40"
                    }`}
                  >
                    <div className="p-3">
                      <div
                        className={`rounded-lg p-3.5 mb-2 shadow-sm border relative overflow-hidden ${
                          isActive
                            ? "bg-gradient-to-br from-blue-50/80 to-indigo-50/60"
                            : "bg-gradient-to-br from-slate-50/50 to-blue-50/30 group-hover:from-blue-50/60 group-hover:to-indigo-50/40"
                        }`}
                        style={{
                          borderColor: isActive
                            ? "rgba(65, 96, 240, 0.3)"
                            : "rgba(148, 163, 184, 0.2)",
                        }}
                      >
                        <div className="text-center">
                          <div
                            className={`text-2xl font-bold mb-2 transition-colors ${
                              isActive
                                ? "text-[#4160F0]"
                                : "text-foreground group-hover:text-[#4160F0]"
                            }`}
                          >
                            {module.name}
                          </div>
                          <div className="text-[10px] font-medium text-muted-foreground mb-2 leading-tight">
                            {module.label}
                          </div>
                          {module.phase && (
                            <div className="inline-block px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-[9px] font-semibold border border-amber-200">
                              {module.phase}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-1.5">
                        <div
                          className={`w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-125 ${
                            isActive ? "opacity-100" : "opacity-50"
                          }`}
                          style={{
                            backgroundColor: isActive ? "#4160F0" : "#94a3b8",
                            boxShadow: isActive
                              ? "0 0 6px rgba(65, 96, 240, 0.5)"
                              : undefined,
                          }}
                        />
                        <span className="text-[9px] text-muted-foreground font-medium">
                          {isActive ? "Active" : "Available"}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="pt-5 border-t border-border/50">
        <div
          className="text-center py-3 px-4 rounded-lg border shadow-sm"
          style={{
            borderColor: "rgba(65, 96, 240, 0.2)",
            background: gradientStyles.footerBg,
          }}
        >
          <p className="text-xs text-muted-foreground leading-relaxed">
            This blueprint defines the value realization contract for{" "}
            <span className="font-semibold text-foreground">
              {blueprint.productSuite}
            </span>
            . All metrics and data sources are binding for governance and
            reporting purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
