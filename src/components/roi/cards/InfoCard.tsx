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
      className={`group relative overflow-hidden ${CARD_STYLES.BORDER_RADIUS} border border-border/50 bg-card ${CARD_STYLES.SHADOW} ${CARD_STYLES.TRANSITION} text-left ${
        hasFilter
          ? isSelected
            ? `ring-2 ring-[${BRAND_COLORS.PRIMARY}]/30 border-[${BRAND_COLORS.PRIMARY}]/50 ${CARD_STYLES.HOVER_SHADOW}`
            : `hover:${CARD_STYLES.HOVER_SHADOW} hover:border-[${BRAND_COLORS.PRIMARY}]/40`
          : `hover:${CARD_STYLES.HOVER_SHADOW} hover:border-border/70`
      }`}
    >
      <div className="p-3">
        <div
          className="rounded-lg p-3.5 shadow-sm border relative overflow-hidden"
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
            <div className="flex items-center gap-2.5 mb-3 pl-0">
              {Icon && iconGradient && (
                <div className="p-1.5 rounded-lg" style={{ background: iconGradient }}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              )}
              <h3 className="text-sm font-bold text-foreground flex-1">
                {title}
              </h3>
            </div>
            {value && (
              <p className="text-sm font-bold text-foreground mb-1.5">
                {value}
              </p>
            )}
            {description && (
              <div className="text-xs text-muted-foreground leading-relaxed">
                {typeof description === "string" ? (
                  <p>{description}</p>
                ) : (
                  description
                )}
              </div>
            )}
            {hasFilter && filterLabel && (
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? "opacity-100" : "opacity-50"
                  }`}
                  style={{
                    backgroundColor: isSelected
                      ? BRAND_COLORS.PRIMARY
                      : "#94a3b8",
                  }}
                />
                <span
                  className={`text-[9px] font-medium ${
                    isSelected
                      ? `text-[${BRAND_COLORS.PRIMARY}]`
                      : "text-muted-foreground"
                  }`}
                >
                  {isSelected ? filterLabel.active : filterLabel.inactive}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Component>
  );
}

