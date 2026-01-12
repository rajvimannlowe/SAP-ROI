import { Cpu, Brain, AlertTriangle, TrendingUp } from "lucide-react";
import { ProductBlueprint } from "../../../../../../data/productBlueprintData";
import { IconBadge } from "../../../../../../components/roi/IconBadge";
import { SectionHeader } from "./SectionHeader";
import { gradientStyles } from "./constants";

interface IntelligenceSectionProps {
  blueprint: ProductBlueprint;
}

export function IntelligenceSection({ blueprint }: IntelligenceSectionProps) {
  return (
    <div className="space-y-5 animate-in fade-in-50 duration-300">
      <SectionHeader
        title="Intelligence & Dependencies"
        subtitle="Algorithm logic, AI/ML capabilities, and key dependencies"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-md hover:shadow-xl hover:border-border/70 transition-all duration-300">
          <div className="p-3">
            <div
              className="rounded-lg p-3.5 shadow-sm border relative overflow-hidden"
              style={{
                backgroundColor: "rgba(99, 102, 241, 0.05)",
                borderColor: "rgba(99, 102, 241, 0.2)",
              }}
            >
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
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-md hover:shadow-xl hover:border-border/70 transition-all duration-300">
          <div className="p-3">
            <div
              className="rounded-lg p-3.5 shadow-sm border relative overflow-hidden"
              style={{
                backgroundColor: "rgba(65, 96, 240, 0.05)",
                borderColor: "rgba(65, 96, 240, 0.2)",
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
        </div>
      </div>
      <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-md hover:shadow-xl hover:border-border/70 transition-all duration-300">
        <div className="p-3">
          <div
            className="rounded-lg p-3.5 shadow-sm border relative overflow-hidden"
            style={{
              backgroundColor: "rgba(245, 158, 11, 0.08)",
              borderColor: "rgba(245, 158, 11, 0.3)",
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
      </div>
    </div>
  );
}



