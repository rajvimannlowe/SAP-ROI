import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { IconBadge } from "./IconBadge";

interface InfoCardProps {
  icon?: LucideIcon;
  iconGradient?: string;
  title: string;
  value?: string;
  description?: string | ReactNode;
  borderColor?: string;
  bgColor?: string;
  // Filter functionality (optional)
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
  borderColor = "rgba(65, 96, 240, 0.2)",
  bgColor = "rgba(65, 96, 240, 0.05)",
  onClick,
  isSelected = false,
  filterLabel,
}: InfoCardProps) {
  const Component = onClick ? "button" : "div";
  const hasFilter = onClick !== undefined;

  return (
    <Component
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-md transition-all duration-300 text-left ${
        hasFilter
          ? isSelected
            ? "ring-2 ring-[#4160F0]/30 border-[#4160F0]/50 shadow-lg"
            : "hover:shadow-xl hover:border-[#4160F0]/40"
          : "hover:shadow-xl hover:border-border/70"
      }`}
    >
      <div className="p-3">
        {/* Inner Card with Solid Color Background - Consistent with other cards */}
        <div
          className="rounded-lg p-3.5 shadow-sm border relative overflow-hidden"
          style={{
            backgroundColor: bgColor,
            borderColor: borderColor,
          }}
        >
          {/* Subtle hover effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at top right, ${bgColor.replace('0.05', '0.15')}, transparent 70%)`,
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-3">
              {Icon && iconGradient && (
                <IconBadge gradient={iconGradient} icon={Icon} />
              )}
              <h3 className="text-sm font-bold text-foreground">{title}</h3>
            </div>
            {value && (
              <p className="text-sm font-bold text-foreground mb-1.5">{value}</p>
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
            {/* Filter indicator */}
            {hasFilter && filterLabel && (
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? "opacity-100" : "opacity-50"
                  }`}
                  style={{
                    backgroundColor: isSelected ? "#4160F0" : "#94a3b8",
                  }}
                />
                <span
                  className={`text-[9px] font-medium ${
                    isSelected
                      ? "text-[#4160F0]"
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

