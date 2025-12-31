import { useState } from "react";
import {
  FileText,
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
import { PageHeader } from "../../../../../components/layout/PageHeader";

type Section = "intent" | "metrics" | "data" | "intelligence" | "modules";

export function ProductROIBlueprint() {
  const blueprint = SAP_S4HANA_BLUEPRINT;
  const [activeSection, setActiveSection] = useState<Section>("intent");

  const sections: { id: Section; label: string; icon: typeof FileText }[] = [
    { id: "intent", label: "ROI Intent", icon: Target },
    { id: "metrics", label: "Metrics", icon: BarChart3 },
    { id: "data", label: "Data & Integration", icon: Database },
    { id: "intelligence", label: "Intelligence", icon: Brain },
    { id: "modules", label: "Modules", icon: Layers },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section - Consistent with other screens */}
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

      {/* Sticky Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm -mx-6 lg:-mx-8 px-6 lg:px-8 py-2.5 border-b border-border/50">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-gradient-to-r from-[#4160F0] to-[#FF6700] text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : ""}`} />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {/* ROI Intent Section */}
        {activeSection === "intent" && (
          <div className="space-y-5 animate-in fade-in-50 duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                ROI Dimensions & Intent
              </h2>
              <p className="text-sm text-muted-foreground">
                Strategic ROI dimensions and their value realization intents
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {blueprint.roiIntents.map((intent) => (
                <ROIIntentCard key={intent.id} {...intent} />
              ))}
            </div>
          </div>
        )}

        {/* Metrics Section */}
        {activeSection === "metrics" && (
          <div className="space-y-6 animate-in fade-in-50 duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                ROI Measurement Contract
              </h2>
              <p className="text-sm text-muted-foreground">
                Primary and secondary metrics for value measurement and
                governance
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="p-1.5 rounded-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      }}
                    >
                      <BarChart3 className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                      Primary ROI Metrics
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200">
                    {blueprint.primaryMetrics.length} Metrics
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {blueprint.primaryMetrics.map((metric) => {
                    const dimensionIntent = blueprint.roiIntents.find(
                      (intent) =>
                        metric.dimension.includes(intent.label.split(" ")[0])
                    );
                    return (
                      <ROIMetricCard
                        key={metric.id}
                        {...metric}
                        dimensionColor={dimensionIntent?.color || "#6B7280"}
                      />
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="p-1.5 rounded-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                      }}
                    >
                      <BarChart3 className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                      Secondary ROI Metrics
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold border border-purple-200">
                    {blueprint.secondaryMetrics.length} Metrics
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {blueprint.secondaryMetrics.map((metric) => {
                    const dimensionIntent = blueprint.roiIntents.find(
                      (intent) =>
                        metric.dimension.includes(intent.label.split(" ")[0])
                    );
                    return (
                      <ROIMetricCard
                        key={metric.id}
                        {...metric}
                        dimensionColor={dimensionIntent?.color || "#6B7280"}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data & Integration Section */}
        {activeSection === "data" && (
          <div className="space-y-5 animate-in fade-in-50 duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Data & Integration Contract
              </h2>
              <p className="text-sm text-muted-foreground">
                Data sources, integration methods, and update frequencies
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="lg:col-span-2 border border-border/50 rounded-lg p-4 bg-card shadow-sm">
                <div className="flex items-center gap-2.5 mb-4">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, #4160F0 0%, #2563eb 100%)",
                    }}
                  >
                    <Database className="h-4 w-4 text-white" />
                  </div>
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

              <div className="space-y-3">
                <div
                  className="border rounded-lg p-4 shadow-sm"
                  style={{
                    borderColor: "rgba(65, 96, 240, 0.2)",
                    background:
                      "linear-gradient(135deg, rgba(65, 96, 240, 0.05) 0%, rgba(65, 96, 240, 0.02) 100%)",
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div
                      className="p-1.5 rounded-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, #4160F0 0%, #FF6700 100%)",
                      }}
                    >
                      <Zap className="h-3.5 w-3.5 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground">
                      Integration Method
                    </h3>
                  </div>
                  <p className="text-sm font-bold text-foreground mb-1.5">
                    {blueprint.integrationMethod}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {blueprint.integrationDetails}
                  </p>
                </div>

                <div
                  className="border rounded-lg p-4 shadow-sm"
                  style={{
                    borderColor: "rgba(139, 92, 246, 0.2)",
                    background:
                      "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(139, 92, 246, 0.02) 100%)",
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div
                      className="p-1.5 rounded-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                      }}
                    >
                      <Clock className="h-3.5 w-3.5 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground">
                      Update Frequency
                    </h3>
                  </div>
                  <p className="text-sm font-bold text-foreground mb-1.5">
                    {blueprint.updateFrequency}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {blueprint.updateFrequencyDetails}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Intelligence Section */}
        {activeSection === "intelligence" && (
          <div className="space-y-5 animate-in fade-in-50 duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">
                Intelligence & Dependencies
              </h2>
              <p className="text-sm text-muted-foreground">
                Algorithm logic, AI/ML capabilities, and key dependencies
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="border border-border/50 rounded-lg p-4 bg-card shadow-sm">
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                    }}
                  >
                    <Cpu className="h-4 w-4 text-white" />
                  </div>
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
                  background:
                    "linear-gradient(135deg, rgba(65, 96, 240, 0.05) 0%, rgba(255, 103, 0, 0.05) 100%)",
                }}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className="p-1.5 rounded-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, #4160F0 0%, #FF6700 100%)",
                    }}
                  >
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">
                    AI / ML Overlay
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {blueprint.aiMlOverlay}
                </p>
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #4160F0 0%, #FF6700 100%)",
                  }}
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
                background:
                  "linear-gradient(135deg, rgba(254, 243, 199, 0.5) 0%, rgba(253, 230, 138, 0.3) 100%)",
              }}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="p-1.5 rounded-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  }}
                >
                  <AlertTriangle className="h-4 w-4 text-white" />
                </div>
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
                      style={{
                        background:
                          "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                      }}
                    />
                    <span className="leading-relaxed">{dep}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Modules Section */}
        {activeSection === "modules" && (
          <div className="space-y-5 animate-in fade-in-50 duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Modules
              </h2>
              <p className="text-sm text-muted-foreground">
                Select a module to view detailed ROI cockpit and metrics
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {blueprint.subModules.map((module) => (
                <button
                  key={module.id}
                  className={`group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-md hover:shadow-xl transition-all duration-300 ${
                    module.id === "fi"
                      ? "ring-2 ring-[#4160F0]/30 border-[#4160F0]/50"
                      : "hover:border-[#4160F0]/40"
                  }`}
                >
                  <div className="p-3">
                    <div
                      className={`rounded-lg p-3.5 mb-2 shadow-sm border relative overflow-hidden ${
                        module.id === "fi"
                          ? "bg-gradient-to-br from-blue-50/80 to-indigo-50/60"
                          : "bg-gradient-to-br from-slate-50/50 to-blue-50/30 group-hover:from-blue-50/60 group-hover:to-indigo-50/40"
                      }`}
                      style={{
                        borderColor:
                          module.id === "fi"
                            ? "rgba(65, 96, 240, 0.3)"
                            : "rgba(148, 163, 184, 0.2)",
                      }}
                    >
                      <div className="text-center">
                        <div
                          className={`text-2xl font-bold mb-2 transition-colors ${
                            module.id === "fi"
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
                          module.id === "fi" ? "opacity-100" : "opacity-50"
                        }`}
                        style={{
                          backgroundColor:
                            module.id === "fi" ? "#4160F0" : "#94a3b8",
                          boxShadow:
                            module.id === "fi"
                              ? "0 0 6px rgba(65, 96, 240, 0.5)"
                              : undefined,
                        }}
                      />
                      <span className="text-[9px] text-muted-foreground font-medium">
                        {module.id === "fi" ? "Active" : "Available"}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-5 border-t border-border/50">
        <div
          className="text-center py-3 px-4 rounded-lg border shadow-sm"
          style={{
            borderColor: "rgba(65, 96, 240, 0.2)",
            background:
              "linear-gradient(135deg, rgba(65, 96, 240, 0.03) 0%, rgba(255, 103, 0, 0.03) 100%)",
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
