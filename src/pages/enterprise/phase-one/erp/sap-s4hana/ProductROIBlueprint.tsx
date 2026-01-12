import { useState } from "react";
import { SAP_S4HANA_BLUEPRINT } from "../../../../../data/productBlueprintData";
import { PageHeader } from "../../../../../components/layout/PageHeader";
import { sections, Section, gradientStyles } from "./components/constants";
import { IntentSection } from "./components/IntentSection";
import { MetricsSection } from "./components/MetricsSection";
import { DataSection } from "./components/DataSection";
import { IntelligenceSection } from "./components/IntelligenceSection";

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
                    ? "bg-linear-to-r from-[#4160F0] to-[#FF6700] text-white shadow-sm"
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
          <IntentSection roiIntents={blueprint.roiIntents} />
        )}

        {activeSection === "metrics" && (
          <MetricsSection
            primaryMetrics={blueprint.primaryMetrics}
            secondaryMetrics={blueprint.secondaryMetrics}
            getDimensionColor={getDimensionColor}
          />
        )}

        {activeSection === "data" && <DataSection blueprint={blueprint} />}

        {activeSection === "intelligence" && (
          <IntelligenceSection blueprint={blueprint} />
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
