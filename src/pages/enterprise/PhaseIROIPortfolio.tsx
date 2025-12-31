import { Link } from "react-router-dom";
import { ArrowLeft, Grid, ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  PHASE_I_ROI_CATEGORIES,
  InvestmentCard,
} from "../../data/phaseIROIData";

export function PhaseIROIPortfolio() {
  const categories = PHASE_I_ROI_CATEGORIES;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-4 flex-1">
          {/* Back Link */}
          <Link
            to="/enterprise"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Enterprise Dashboard
          </Link>

          {/* Title Section with Gradient Background */}
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-foreground">
              Phase I ROI Portfolio
            </h1>
            <span className="px-4 py-1.5 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200 shadow-sm">
              Phase I
            </span>
          </div>
          <p className="text-muted-foreground text-base max-w-2xl">
            Critical value investments grouped by business category
          </p>
        </div>

        {/* View Catalog Button */}
        <Link to="/phase-i/catalog">
          <Button
            className="gap-2 shadow-md hover:shadow-lg transition-all"
            style={{ backgroundColor: "#4160F0" }}
          >
            <Grid className="h-4 w-4" />
            View Catalog
          </Button>
        </Link>
      </div>

      {/* Categories and Investment Cards */}
      <div className="space-y-10">
        {categories.map((categorySection) => (
          <div key={categorySection.category} className="space-y-5">
            {/* Category Heading with Accent */}
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-blue-500 to-blue-600" />
              <h2 className="text-2xl font-bold text-foreground">
                {categorySection.category}
              </h2>
            </div>

            {/* Investment Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categorySection.investments.map((investment) => (
                <InvestmentCardComponent
                  key={investment.id}
                  investment={investment}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

function InvestmentCardComponent({
  investment,
}: {
  investment: InvestmentCard;
}) {
  const isHighlighted = investment.highlighted;
  const borderColor = isHighlighted ? "#4160F0" : undefined;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border bg-card shadow-md transition-all duration-300 hover:shadow-lg ${
        isHighlighted ? "ring-2 ring-blue-500/30" : ""
      }`}
      style={{
        borderColor: borderColor || undefined,
        borderWidth: borderColor ? "2px" : "1px",
      }}
    >
      {/* Phase Tag */}
      {investment.phase !== "Phase I" && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 text-xs font-semibold text-muted-foreground bg-background/95 backdrop-blur-sm rounded-full border border-border shadow-sm">
            {investment.phase}
          </span>
        </div>
      )}

      <div className="relative p-5 space-y-4">
        {/* Title and Details Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-foreground leading-tight">
            {investment.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">{investment.company}</span>
            <span className="text-muted-foreground/50">•</span>
            <span>{investment.category}</span>
          </div>
        </div>

        {/* ROI Dimensions Section */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            ROI DIMENSIONS
          </p>
          <div className="flex flex-wrap gap-2">
            {investment.roiDimensions.map((dim, index) => {
              const Icon = dim.icon;
              const isActive = dim.active;
              // Map dimensions to their standard fresh colors (matching catalog data)
              const getDimensionColor = (label: string): string => {
                const colorMap: Record<string, string> = {
                  Cost: "#16A34A",
                  Efficiency: "#4160F0",
                  Compliance: "#6B7280",
                  Revenue: "#FF6700",
                  Experience: "#9333EA",
                };
                return colorMap[label] || dim.color || "#4160F0";
              };
              const color = getDimensionColor(dim.label);

              return (
                <div
                  key={index}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border shadow-sm transition-all ${
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
        <div className="space-y-2 pt-1">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            KEY PERSONAS
          </p>
          <div className="flex flex-wrap gap-2">
            {investment.keyPersonas.map((persona, index) => (
              <span
                key={index}
                className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
                  persona.active
                    ? "text-blue-600 bg-blue-50 border-blue-200 shadow-sm hover:bg-blue-100"
                    : "text-muted-foreground bg-muted/50 border-border"
                }`}
              >
                {persona.label}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Link/Text Section */}
        <div className="pt-3 border-t border-border/40">
          {investment.bottomLink ? (
            <Link
              to={`/phase-i/${investment.id}`}
              className="group inline-flex items-center gap-2 w-full px-4 py-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 transition-all duration-200 hover:shadow-sm"
            >
              <span className="text-sm font-semibold text-blue-700 group-hover:text-blue-800">
                {investment.bottomLink.replace(" →", "")}
              </span>
              <ArrowRight className="h-4 w-4 text-blue-600 group-hover:text-blue-700 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>
          ) : investment.bottomText ? (
            <p className="text-sm text-muted-foreground italic">
              {investment.bottomText}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
