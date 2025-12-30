import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Top section props
  topBgColor?: string; // Light color for top section background
  icon?: LucideIcon;
  iconColor?: string;
  badge?: {
    label: string;
    color?: string;
    icon?: LucideIcon;
  };
  
  // Content props
  title: string;
  subtitle?: string;
  
  // Bottom section props (optional)
  footerContent?: React.ReactNode;
  
  // Styling
  accentColor?: string; // Main accent color for the card
  hoverEffect?: boolean;
}

const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  (
    {
      className,
      topBgColor,
      icon: Icon,
      iconColor,
      badge,
      title,
      subtitle,
      footerContent,
      accentColor = "#4160F0",
      hoverEffect = true,
      children,
      ...props
    },
    ref
  ) => {
    // Generate light background color if not provided
    const defaultTopBg = topBgColor || hexToRgba(accentColor, 0.08);
    const badgeBg = badge?.color 
      ? hexToRgba(badge.color, 0.15) 
      : hexToRgba(accentColor, 0.15);
    const badgeBorder = badge?.color || accentColor;
    const badgeTextColor = badge?.color || accentColor;
    const BadgeIcon = badge?.icon;

    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-md transition-all duration-300 ease-out",
          hoverEffect && "hover:shadow-xl hover:border-border/70",
          className
        )}
        style={{
          borderColor: `${accentColor}30`,
        }}
        {...props}
      >
        {/* Subtle gradient background overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${hexToRgba(accentColor, 0.03)} 0%, transparent 100%)`,
          }}
        />

        {/* Top Section with Light Background */}
        <div
          className="relative px-5 pt-5 pb-4 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${defaultTopBg} 0%, ${hexToRgba(accentColor, 0.1)} 100%)`,
          }}
        >
          <div className="flex items-start justify-between gap-3">
            {/* Icon Section */}
            {Icon && (
              <div
                className="relative flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 transition-all duration-300 ease-out group-hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${accentColor} 0%, ${hexToRgba(accentColor, 0.9)} 100%)`,
                  boxShadow: `0 4px 12px ${hexToRgba(accentColor, 0.25)}`,
                }}
              >
                <Icon
                  className="h-7 w-7 text-white drop-shadow-md"
                  style={{ color: iconColor || "white" }}
                />
              </div>
            )}

            {/* Title and Subtitle */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-foreground mb-1 leading-tight">
                {title}
              </h3>
              {subtitle && (
                <p className="text-sm text-muted-foreground leading-tight">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Badge Section */}
            {badge && (
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl shrink-0 border transition-shadow duration-300 group-hover:shadow-sm"
                style={{
                  background: `linear-gradient(135deg, ${badgeBg} 0%, ${hexToRgba(badgeBorder, 0.15)} 100%)`,
                  borderColor: `${badgeBorder}40`,
                }}
              >
                {BadgeIcon && (
                  <BadgeIcon
                    className="h-3.5 w-3.5"
                    style={{ color: badgeTextColor }}
                  />
                )}
                <span
                  className="text-xs font-semibold"
                  style={{ color: badgeTextColor }}
                >
                  {badge.label}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Section */}
        {children && (
          <div className="relative px-5 py-4 bg-card">
            {/* Subtle inner shadow for depth */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
            {children}
          </div>
        )}

        {/* Footer Section */}
        {footerContent && (
          <div className="relative px-5 pb-4 bg-card border-t border-border/30">
            {footerContent}
          </div>
        )}
      </div>
    );
  }
);
EnhancedCard.displayName = "EnhancedCard";

// Enhanced Card with nested inner card
export interface NestedCardProps extends EnhancedCardProps {
  innerCard?: {
    content: React.ReactNode;
    className?: string;
  };
}

const NestedEnhancedCard = React.forwardRef<HTMLDivElement, NestedCardProps>(
  ({ innerCard, children, accentColor = "#4160F0", ...props }, ref) => {
    return (
      <EnhancedCard ref={ref} accentColor={accentColor} {...props}>
        {children}
        {innerCard && (
          <div
            className={cn(
              "mt-4 p-4 rounded-xl border border-border/40 bg-gradient-to-br from-muted/40 to-muted/20 backdrop-blur-sm transition-all duration-300 group-hover:shadow-lg group-hover:border-border/60",
              innerCard.className
            )}
            style={{
              boxShadow: `inset 0 2px 4px ${hexToRgba(accentColor, 0.05)}, 0 2px 8px ${hexToRgba(accentColor, 0.1)}`,
            }}
          >
            {innerCard.content}
          </div>
        )}
      </EnhancedCard>
    );
  }
);
NestedEnhancedCard.displayName = "NestedEnhancedCard";

export { EnhancedCard, NestedEnhancedCard };

