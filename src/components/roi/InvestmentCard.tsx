import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";
import { InvestmentCard as InvestmentCardType } from "../../../data/phaseIROIData";

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

interface InvestmentCardProps {
  investment: InvestmentCardType;
}

export function InvestmentCard({ investment }: InvestmentCardProps) {
  const isHighlighted = investment.highlighted;
  const accentColor = isHighlighted ? "#4160F0" : "#9333EA";

  // Map dimensions to their standard fresh colors (matching catalog data)
  const getDimensionColor = (label: string): string => {
    const colorMap: Record<string, string> = {
      Cost: "#16A34A",
      Efficiency: "#4160F0",
      Compliance: "#6B7280",
      Revenue: "#FF6700",
      Experience: "#9333EA",
    };
    return colorMap[label] || "#4160F0";
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-md hover:shadow-xl hover:border-border/70 transition-all duration-300 ${
        isHighlighted ? "ring-2 ring-blue-500/30 border-blue-500/60" : ""
      }`}
    >
      {/* Phase Tag */}
      <div className="absolute top-4 right-4 z-10">
        <span className="px-3 py-1 text-xs font-semibold text-muted-foreground bg-background/95 backdrop-blur-sm rounded-full border border-border shadow-sm">
          {investment.phase}
        </span>
      </div>

      <div className="p-3">
        {/* Inner Card with Solid Color Background - Consistent with other cards */}
        <div
          className="rounded-lg p-3.5 mb-3 shadow-sm border relative overflow-hidden"
          style={{
            backgroundColor: hexToRgba(accentColor, 0.1),
            borderColor: hexToRgba(accentColor, 0.3),
          }}
        >
          {/* Subtle hover effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at top right, ${hexToRgba(accentColor, 0.2)}, transparent 70%)`,
            }}
          />

          <div className="relative z-10 space-y-3">
            {/* Title Section */}
            <div>
              <h3 className="text-base font-bold text-foreground leading-tight">
                {investment.title}
              </h3>
            </div>

            {/* ROI Dimensions */}
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                ROI Dimensions
              </p>
              <div className="flex flex-wrap gap-2">
                {investment.roiDimensions.map((dim, index) => {
                  const Icon = dim.icon as LucideIcon;
                  const isActive = dim.active;
                  const color = getDimensionColor(dim.label);

                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-md border shadow-sm transition-all ${
                        !isActive ? "opacity-60" : ""
                      }`}
                      style={{
                        color: color,
                        backgroundColor: hexToRgba(color, 0.15),
                        borderColor: hexToRgba(color, 0.35),
                      }}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span className="text-xs font-medium">{dim.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Personas Section */}
            <div className="space-y-2 pt-2 border-t" style={{ borderColor: hexToRgba(accentColor, 0.2) }}>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Key Personas
              </p>
              <div className="flex flex-wrap gap-2">
                {investment.keyPersonas.map((persona, idx) => {
                  const personaLabel =
                    typeof persona === "string" ? persona : persona.label;
                  return (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-xs font-medium rounded-md bg-muted/60 text-muted-foreground border border-border/50"
                    >
                      {personaLabel}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="px-1">
          <Link
            to={`/phase-i/catalog/${investment.id}/blueprint`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#4160F0] hover:text-[#3a55d8] transition-colors group"
          >
            <span>Click to view Product ROI Blueprint</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

