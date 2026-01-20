import { useNavigate } from "react-router-dom";
import { Settings, FileText, ClipboardList, ArrowRight } from "lucide-react";
import { hexToRgba, BRAND_COLORS, CARD_STYLES } from "../../../../../../components/roi/cards/index";
import { MODULE_COCKPIT_DATA } from "../../../../../../data/moduleCockpitData";

interface ModuleConfigurationSelectionProps {
  blueprintId: string;
  moduleId: string;
  moduleName: string;
  moduleLabel: string;
  catalogId?: string;
  onBack?: () => void;
}

export function ModuleConfigurationSelection({
  blueprintId,
  moduleId,
  moduleName,
  moduleLabel,
  catalogId,
  onBack,
}: ModuleConfigurationSelectionProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (catalogId) {
      // Navigate back to module selection
      navigate(`/phase-i/catalog/${catalogId}/modules`);
    }
  };

  const handleConfiguration = () => {
    navigate(`/phase-i/catalog/${blueprintId}/blueprint/${moduleId}/configuration`);
  };

  const handleReport = () => {
    navigate(`/phase-i/catalog/${blueprintId}/blueprint/${moduleId}/report`);
  };

  const handleAction = () => {
    // Get the first KPI from the module to navigate to Action Tracker
    const cockpitData = MODULE_COCKPIT_DATA[moduleId];
    if (cockpitData && cockpitData.kpiDetails.length > 0) {
      const firstKPI = cockpitData.kpiDetails[0];
      // Use KPI ID or create slug from name
      const kpiId = firstKPI.id || firstKPI.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      navigate(`/phase-i/catalog/${blueprintId}/blueprint/${moduleId}/cockpit/${kpiId}/actions`);
    } else {
      // Fallback to cockpit if no KPIs found
      navigate(`/phase-i/catalog/${blueprintId}/blueprint/${moduleId}/cockpit`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-border/50">
        <h2 className="text-2xl font-bold text-foreground mb-1">
          {moduleName} - {moduleLabel}
        </h2>
        <p className="text-sm text-muted-foreground">
          Select an option to continue
        </p>
      </div>

      {/* Three Button Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Configuration Card */}
        <div
          onClick={handleConfiguration}
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
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-foreground leading-tight">
                      Configuration
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Complete configuration assessment
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
                    Answer configuration questions to assess module readiness and eligibility for ROI measurement.
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
                  Assessment
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Report Card */}
        <div
          onClick={handleReport}
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
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-foreground leading-tight">
                      Report
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      View configuration responses
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
                    Review your configuration assessment responses and scores in detail.
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
                  Responses
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Card */}
        <div
          onClick={handleAction}
          className={`group relative overflow-hidden ${CARD_STYLES.BORDER_RADIUS} border border-border/50 bg-card ${CARD_STYLES.SHADOW} hover:${CARD_STYLES.HOVER_SHADOW} ${CARD_STYLES.TRANSITION} cursor-pointer`}
        >
          <div className="p-4">
            <div
              className="rounded-lg p-4 shadow-sm border relative overflow-hidden"
              style={{
                backgroundColor: hexToRgba("#10b981", 0.1),
                borderColor: hexToRgba("#10b981", 0.3),
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at top right, ${hexToRgba(
                    "#10b981",
                    0.2
                  )}, transparent 70%)`,
                }}
              />

              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-lg shrink-0 shadow-sm"
                    style={{
                      backgroundColor: "#10b981",
                    }}
                  >
                    <ClipboardList className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-foreground leading-tight">
                      Action
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Access action tracker
                    </p>
                  </div>
                  <ArrowRight
                    className="h-5 w-5 text-muted-foreground group-hover:text-green-600 transition-colors group-hover:translate-x-1 transition-transform"
                    style={{ color: "#10b981" }}
                  />
                </div>

                <div
                  className="pt-3 border-t"
                  style={{
                    borderColor: hexToRgba("#10b981", 0.2),
                  }}
                >
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Navigate to the module cockpit to view KPIs and access the action tracker for remediation.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-1 mt-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                  style={{
                    backgroundColor: "#10b981",
                    boxShadow: `0 0 6px ${hexToRgba("#10b981", 0.5)}`,
                  }}
                />
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Tracker
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

