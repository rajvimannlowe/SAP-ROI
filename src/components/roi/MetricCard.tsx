import { LucideIcon } from "lucide-react";

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

interface MetricCardProps {
  icon: LucideIcon;
  value: string;
  title: string;
  description: string;
  color?: string;
  backgroundColor?: string;
  showStatusDot?: boolean;
}

export function MetricCard({
  icon: Icon,
  value,
  title,
  description,
  color = "#10b981",
  backgroundColor,
  showStatusDot = false,
}: MetricCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-md hover:shadow-xl hover:border-border/70 transition-all duration-300">
      <div className="p-3">
        {/* Inner Card with Solid Color Background - Consistent with other cards */}
        <div
          className="rounded-lg p-3.5 shadow-sm border relative overflow-hidden"
          style={{
            backgroundColor: backgroundColor || hexToRgba(color, 0.1),
            borderColor: hexToRgba(color, 0.3),
          }}
        >
          {/* Status dot in top right */}
          {showStatusDot && (
            <div className="absolute top-3 right-3 w-2 h-2 bg-green-500 rounded-full z-10" />
          )}

          {/* Subtle hover effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at top right, ${hexToRgba(color, 0.2)}, transparent 70%)`,
            }}
          />

          <div className="relative z-10">
            {/* Icon and Value Row */}
            <div className="flex items-center justify-between gap-3 mb-3">
              {/* Icon Square - Solid color background */}
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 group-hover:scale-105 shrink-0 shadow-sm"
                style={{
                  background: color,
                }}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>

              {/* Value - Right aligned */}
              <p
                className="text-2xl font-bold leading-none"
                style={{ color: color }}
              >
                {value}
              </p>
            </div>

            {/* Title */}
            <p className="text-sm font-semibold text-foreground leading-tight mb-1">
              {title}
            </p>

            {/* Description */}
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

