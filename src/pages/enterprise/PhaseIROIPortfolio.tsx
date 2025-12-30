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
        <Button
          className="gap-2 shadow-md hover:shadow-lg transition-all"
          style={{ backgroundColor: "#4160F0" }}
        >
          <Grid className="h-4 w-4" />
          View Catalog
        </Button>
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
  const cardBg = isHighlighted
    ? `linear-gradient(135deg, ${hexToRgba("#4160F0", 0.08)} 0%, ${hexToRgba(
        "#4160F0",
        0.03
      )} 50%, transparent 100%)`
    : `linear-gradient(135deg, ${hexToRgba(
        "#9333EA",
        0.05
      )} 0%, transparent 100%)`;

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
      {/* Light colorful gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: cardBg,
        }}
      />

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
          <h3 className="text-xl font-bold text-foreground leading-tight">
            {investment.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">{investment.company}</span>
            <span className="text-muted-foreground/50">•</span>
            <span>{investment.category}</span>
          </div>
        </div>

        {/* ROI Dimensions Section */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            ROI DIMENSIONS
          </p>
          <div className="flex flex-wrap gap-2">
            {investment.roiDimensions.map((dim, index) => {
              const Icon = dim.icon;
              const isActive = dim.active;
              const color = isActive ? dim.color || "#4160F0" : undefined;

              const labelMap: Record<string, string> = {
                Cost: "$ Cost",
                Efficiency: "+ Efficiency",
                Compliance: "O Compliance",
                Revenue: "~ Revenue",
              };

              return (
                <div
                  key={index}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all ${
                    isActive
                      ? "bg-background/80 border border-border/50 shadow-sm"
                      : "opacity-50"
                  }`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 ${
                      isActive ? "" : "text-muted-foreground/50"
                    }`}
                    style={isActive && color ? { color } : undefined}
                  />
                  <span
                    className={`text-xs font-medium ${
                      isActive ? "" : "text-muted-foreground/60"
                    }`}
                    style={isActive && color ? { color } : undefined}
                  >
                    {labelMap[dim.label] || dim.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Personas Section */}
        <div className="space-y-3 pt-1">
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
        <div className="pt-2 border-t border-border/40">
          {investment.bottomLink ? (
            <Link
              to={`/phase-i/${investment.id}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
            >
              <span>{investment.bottomLink.replace(" →", "")}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
