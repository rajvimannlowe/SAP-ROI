import { LucideIcon } from "lucide-react";
import { hexToRgba, DEFAULT_COLORS, CARD_STYLES } from "./index";

interface MetricCardProps {
  icon: LucideIcon;
  value: string;
  title: string;
  description: string;
  color?: string;
  showStatusDot?: boolean;
}

export function MetricCard({
  icon: Icon,
  value,
  title,
  description,
  color = DEFAULT_COLORS.SUCCESS,
  showStatusDot = false,
}: MetricCardProps) {
  return (
    <div
      className={`group relative overflow-hidden ${CARD_STYLES.BORDER_RADIUS} border border-border/50 bg-card ${CARD_STYLES.SHADOW} hover:${CARD_STYLES.HOVER_SHADOW} ${CARD_STYLES.TRANSITION}`}
    >
      <div className="p-3">
        <div
          className="rounded-lg p-3.5 shadow-sm border relative overflow-hidden"
          style={{
            backgroundColor: hexToRgba(color, 0.1),
            borderColor: hexToRgba(color, 0.3),
          }}
        >
          {showStatusDot && (
            <div className="absolute top-3 right-3 w-2 h-2 bg-green-500 rounded-full z-10" />
          )}

          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at top right, ${hexToRgba(
                color,
                0.2
              )}, transparent 70%)`,
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 group-hover:scale-105 shrink-0 shadow-sm"
                style={{
                  background: color,
                }}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>

              <p
                className="text-2xl font-bold leading-none"
                style={{ color: color }}
              >
                {value}
              </p>
            </div>

            <p className="text-sm font-semibold text-foreground leading-tight mb-1">
              {title}
            </p>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

