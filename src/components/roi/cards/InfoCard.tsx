import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { hexToRgba, BRAND_COLORS, CARD_STYLES } from "./index";

interface InfoCardProps {
  icon?: LucideIcon;
  iconGradient?: string;
  title: string;
  value?: string;
  description?: string | ReactNode;
  borderColor?: string;
  bgColor?: string;
  onClick?: () => void;
  isSelected?: boolean;
  filterLabel?: {
    active: string;
    inactive: string;
  };
}

export function InfoCard({
  icon: Icon,
  iconGradient,
  title,
  value,
  description,
  borderColor = hexToRgba(BRAND_COLORS.PRIMARY, 0.2),
  bgColor = hexToRgba(BRAND_COLORS.PRIMARY, 0.05),
  onClick,
  isSelected = false,
  filterLabel,
}: InfoCardProps) {
  const Component = onClick ? "button" : "div";
  const hasFilter = onClick !== undefined;

  return (
    <Component
      onClick={onClick}
      className={`group relative overflow-hidden ${
        CARD_STYLES.BORDER_RADIUS
      } border bg-card ${CARD_STYLES.SHADOW} ${
        CARD_STYLES.TRANSITION
      } text-left cursor-pointer ${
        hasFilter && !isSelected
          ? `border-border/50 hover:${CARD_STYLES.HOVER_SHADOW}`
          : hasFilter && isSelected
          ? `${CARD_STYLES.HOVER_SHADOW}`
          : `border-border/50 hover:${CARD_STYLES.HOVER_SHADOW} hover:border-border/70`
      }`}
      style={
        hasFilter && isSelected
          ? {
              borderColor: BRAND_COLORS.PRIMARY,
              borderWidth: "2px",
              boxShadow: `0 0 0 2px ${hexToRgba(
                BRAND_COLORS.PRIMARY,
                0.2
              )}, 0 4px 12px ${hexToRgba(BRAND_COLORS.PRIMARY, 0.15)}`,
            }
          : hasFilter && !isSelected
          ? {
              borderColor: "rgba(148, 163, 184, 0.5)",
            }
          : undefined
      }
    >
      <div className="p-4">
        <div
          className="rounded-lg p-4 shadow-sm border relative overflow-hidden"
          style={{
            backgroundColor: bgColor,
            borderColor: borderColor,
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at top right, ${bgColor.replace(
                "0.05",
                "0.15"
              )}, transparent 70%)`,
            }}
          />

          <div className="relative z-10">
            {value ? (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  {Icon && iconGradient && (
                    <div
                      className="p-1.5 rounded-md shrink-0"
                      style={{ background: iconGradient }}
                    >
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <h3 className="text-sm font-bold text-foreground leading-tight">
                    {title}
                  </h3>
                </div>
                <p className="text-sm font-medium text-foreground leading-tight">
                  {value}
                </p>
              </div>
            ) : (
              <div className="flex items-start gap-2 mb-1.5">
                {Icon && iconGradient && (
                  <div
                    className="p-1.5 rounded-md shrink-0"
                    style={{ background: iconGradient }}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                )}
                <h3 className="text-sm font-bold text-foreground leading-tight flex-1">
                  {title}
                </h3>
              </div>
            )}
            {description && (
              <div className="text-sm text-foreground leading-relaxed mt-3">
                {typeof description === "string" ? (
                  <p className="whitespace-normal break-words">{description}</p>
                ) : (
                  description
                )}
              </div>
            )}
            {hasFilter && filterLabel && (
              <div className="mt-1.5">
                {isSelected ? (
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#4160F0]/10 border border-[#4160F0]/30">
                    <div
                      className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                      style={{
                        backgroundColor: BRAND_COLORS.PRIMARY,
                      }}
                    />
                    <span
                      className="text-[9px] font-semibold uppercase tracking-wider"
                      style={{
                        color: BRAND_COLORS.PRIMARY,
                      }}
                    >
                      {filterLabel.active}
                    </span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-50 border border-blue-200/60 group-hover:bg-blue-100 group-hover:border-blue-300 transition-colors">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: "#64748b",
                      }}
                    />
                    <span className="text-[9px] font-semibold text-blue-700">
                      {filterLabel.inactive}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Component>
  );
}
