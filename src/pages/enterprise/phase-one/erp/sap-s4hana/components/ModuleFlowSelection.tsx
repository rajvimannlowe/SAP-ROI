import { useNavigate } from "react-router-dom";
import { Target, Layers, ArrowRight } from "lucide-react";
import { hexToRgba, BRAND_COLORS, CARD_STYLES } from "../../../../../../components/roi/cards/index";

interface ModuleFlowSelectionProps {
  blueprintId: string;
  moduleId: string;
  moduleName: string;
  moduleLabel: string;
  catalogId?: string;
  onBack?: () => void;
}

export function ModuleFlowSelection({
  blueprintId,
  moduleId,
  moduleName,
  moduleLabel,
  catalogId,
  // onBack,
}: ModuleFlowSelectionProps) {
  const navigate = useNavigate();

  // const handleBack = () => {
  //   if (onBack) {
  //     onBack();
  //   } else if (catalogId) {
  //     // Navigate back to module selection
  //     navigate(`/phase-i/catalog/${catalogId}/modules`);
  //   }
  // };

  const handleROIDimensionFlow = () => {
    // Navigate to blueprint page with moduleId in state so we can navigate back to flow selection
    navigate(`/phase-i/catalog/${blueprintId}/blueprint`, {
      state: { moduleId, catalogId },
    });
  };

  const handleSubModuleFlow = () => {
    // Navigate to module cockpit page with moduleId and catalogId in state
    navigate(`/phase-i/catalog/${blueprintId}/blueprint/${moduleId}/cockpit`, {
      state: { moduleId, catalogId },
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-border/50">
        <h2 className="text-2xl font-bold text-foreground mb-1">
          {moduleName} - {moduleLabel}
        </h2>
        <p className="text-sm text-muted-foreground">
          Select a flow to continue
        </p>
      </div>

      {/* Flow Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ROI Dimension Flow Card */}
        <div
          onClick={handleROIDimensionFlow}
          className={`group relative overflow-hidden ${CARD_STYLES.BORDER_RADIUS} border border-border/50 bg-card ${CARD_STYLES.SHADOW} hover:${CARD_STYLES.HOVER_SHADOW} ${CARD_STYLES.TRANSITION} cursor-pointer`}
        >
          <div className="p-4">
            <div
              className="rounded-lg p-4 shadow-sm border relative overflow-hidden"
              style={{
                backgroundColor: hexToRgba(BRAND_COLORS.PRIMARY, 0.1),
                borderColor: hexToRgba(BRAND_COLORS.PRIMARY, 0.3),
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at top right, ${hexToRgba(
                    BRAND_COLORS.PRIMARY,
                    0.2
                  )}, transparent 70%)`,
                }}
              />

              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-lg shrink-0 shadow-sm"
                    style={{
                      backgroundColor: BRAND_COLORS.PRIMARY,
                    }}
                  >
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-foreground leading-tight">
                      ROI Dimension Flow
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      View ROI intents, metrics, and blueprint details
                    </p>
                  </div>
                  <ArrowRight
                    className="h-5 w-5 text-muted-foreground group-hover:text-[#4160F0] transition-colors group-hover:translate-x-1 transition-transform"
                    style={{ color: BRAND_COLORS.PRIMARY }}
                  />
                </div>

                <div
                  className="pt-3 border-t"
                  style={{
                    borderColor: hexToRgba(BRAND_COLORS.PRIMARY, 0.2),
                  }}
                >
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Navigate to the product blueprint to explore ROI dimensions,
                    intents, and comprehensive metrics across all modules.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-1 mt-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                  style={{
                    backgroundColor: BRAND_COLORS.PRIMARY,
                    boxShadow: `0 0 6px ${hexToRgba(BRAND_COLORS.PRIMARY, 0.5)}`,
                  }}
                />
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Blueprint View
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub Module Flow Card */}
        <div
          onClick={handleSubModuleFlow}
          className={`group relative overflow-hidden ${CARD_STYLES.BORDER_RADIUS} border border-border/50 bg-card ${CARD_STYLES.SHADOW} hover:${CARD_STYLES.HOVER_SHADOW} ${CARD_STYLES.TRANSITION} cursor-pointer`}
        >
          <div className="p-4">
            <div
              className="rounded-lg p-4 shadow-sm border relative overflow-hidden"
              style={{
                backgroundColor: hexToRgba(BRAND_COLORS.PURPLE, 0.1),
                borderColor: hexToRgba(BRAND_COLORS.PURPLE, 0.3),
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at top right, ${hexToRgba(
                    BRAND_COLORS.PURPLE,
                    0.2
                  )}, transparent 70%)`,
                }}
              />

              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-lg shrink-0 shadow-sm"
                    style={{
                      backgroundColor: BRAND_COLORS.PURPLE,
                    }}
                  >
                    <Layers className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-foreground leading-tight">
                      Sub Module Flow
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Access module-specific ROI cockpit and KPIs
                    </p>
                  </div>
                  <ArrowRight
                    className="h-5 w-5 text-muted-foreground group-hover:text-purple-600 transition-colors group-hover:translate-x-1 transition-transform"
                    style={{ color: BRAND_COLORS.PURPLE }}
                  />
                </div>

                <div
                  className="pt-3 border-t"
                  style={{
                    borderColor: hexToRgba(BRAND_COLORS.PURPLE, 0.2),
                  }}
                >
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Navigate to the module cockpit to view detailed KPIs, metrics,
                    and performance data specific to this module.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-1 mt-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                  style={{
                    backgroundColor: BRAND_COLORS.PURPLE,
                    boxShadow: `0 0 6px ${hexToRgba(BRAND_COLORS.PURPLE, 0.5)}`,
                  }}
                />
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Module Cockpit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

