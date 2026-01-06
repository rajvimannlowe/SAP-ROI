import { Database, Zap, Clock, CheckCircle2 } from "lucide-react";
import { ProductBlueprint } from "../../../../../../data/productBlueprintData";
import { InfoCard } from "../../../../../../components/roi/InfoCard";
import { IconBadge } from "../../../../../../components/roi/IconBadge";
import { SectionHeader } from "./SectionHeader";
import { gradientStyles } from "./constants";

interface DataSectionProps {
  blueprint: ProductBlueprint;
}

export function DataSection({ blueprint }: DataSectionProps) {
  return (
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
  );
}


