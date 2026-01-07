import { Package, Target, Layers, CheckCircle2 } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { hexToRgba, BRAND_COLORS, CARD_STYLES } from "./index";

interface ROIMetricCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  highlight?: boolean;
  dimensions?: string[];
  color?: string;
}

function ROIMetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  highlight = false,
  dimensions,
  color = BRAND_COLORS.PRIMARY,
}: ROIMetricCardProps) {
  const cardColor = highlight ? BRAND_COLORS.PRIMARY : color;
  const navigate = useNavigate();

  const handleClick = () => {
    if (highlight) {
      navigate("/phase-i");
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative overflow-hidden ${CARD_STYLES.BORDER_RADIUS} border border-border/50 bg-card ${CARD_STYLES.SHADOW} hover:${CARD_STYLES.HOVER_SHADOW} ${CARD_STYLES.TRANSITION} ${
        highlight ? "ring-2 ring-blue-500/30 border-blue-500/60 cursor-pointer" : ""
      }`}
    >
      <div className="p-3">
        <div
          className="rounded-lg p-3.5 mb-3 shadow-sm border relative overflow-hidden"
          style={{
            backgroundColor: hexToRgba(cardColor, highlight ? 0.12 : 0.1),
            borderColor: hexToRgba(cardColor, 0.3),
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at top right, ${hexToRgba(
                cardColor,
                0.2
              )}, transparent 70%)`,
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 group-hover:scale-105 shrink-0 shadow-sm"
                style={{
                  background: cardColor,
                }}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>

              <p
                className="text-2xl font-bold leading-none"
                style={{ color: cardColor }}
              >
                {value}
              </p>
            </div>

            <p className="text-sm font-semibold text-foreground leading-tight mb-1">
              {title}
            </p>

            {subtitle && (
              <p className="text-xs text-muted-foreground leading-tight">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {dimensions && dimensions.length > 0 && (
          <div className="px-1">
            <div className="flex flex-wrap gap-1.5">
              {dimensions.map((dim, index) => (
                <span
                  key={index}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground font-medium border border-border/50"
                >
                  {dim}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ROIMetricCardsProps {
  totalProducts: number;
  phaseIProducts: number;
  phaseIPercentage: number;
  roiDimensions: string[];
  executionReady: number;
  executionReadyPercentage: number;
  quarterlyGrowth?: number;
}

export function ROIMetricCards({
  totalProducts,
  phaseIProducts,
  phaseIPercentage,
  roiDimensions,
  executionReady,
  executionReadyPercentage,
  quarterlyGrowth = 0,
}: ROIMetricCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <ROIMetricCard
        title="Total Products in ROI Catalog"
        value={totalProducts}
        subtitle={
          quarterlyGrowth > 0 ? `+${quarterlyGrowth} this quarter` : undefined
        }
        icon={Package}
        color={BRAND_COLORS.PRIMARY}
      />

      <ROIMetricCard
        title="Phase I Products"
        value={phaseIProducts}
        subtitle={`${phaseIPercentage}% of portfolio`}
        icon={Target}
        highlight={true}
        color={BRAND_COLORS.PRIMARY}
      />

      <ROIMetricCard
        title="ROI Dimensions Covered"
        value={roiDimensions.length}
        icon={Layers}
        dimensions={roiDimensions}
        color={BRAND_COLORS.PURPLE}
      />

      <ROIMetricCard
        title="Execution-Ready Products"
        value={executionReady}
        subtitle={`${executionReadyPercentage}% readiness`}
        icon={CheckCircle2}
        color="#16A34A"
      />
    </div>
  );
}

