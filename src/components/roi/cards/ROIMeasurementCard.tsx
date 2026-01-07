import {
  Database,
  Target,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { hexToRgba, CARD_STYLES } from "./index";

interface ROIMeasurementCardProps {
  title: string;
  unit: string;
  target: string;
  refresh: string;
  status: "Active" | "Planned";
  dimension: string;
  dimensionColor: string;
}

export function ROIMeasurementCard({
  title,
  unit,
  target,
  refresh,
  status,
  dimension,
  dimensionColor,
}: ROIMeasurementCardProps) {
  return (
    <div
      className={`group relative overflow-hidden ${CARD_STYLES.BORDER_RADIUS} border border-border/50 bg-card ${CARD_STYLES.SHADOW} hover:${CARD_STYLES.HOVER_SHADOW} ${CARD_STYLES.TRANSITION}`}
    >
      <div className="p-3">
        <div
          className="rounded-lg p-3.5 mb-3 shadow-sm border relative overflow-hidden"
          style={{
            backgroundColor: hexToRgba(dimensionColor, 0.12),
            borderColor: hexToRgba(dimensionColor, 0.3),
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at top right, ${hexToRgba(
                dimensionColor,
                0.2
              )}, transparent 70%)`,
            }}
          />

          <div className="relative z-10 space-y-3">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-xs font-bold text-foreground leading-tight flex-1">
                  {title}
                </h4>
                <div className="flex items-center gap-1 shrink-0">
                  {status === "Active" ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 drop-shadow-sm" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5 text-amber-600 drop-shadow-sm" />
                  )}
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-semibold border ${
                      status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                  style={{
                    backgroundColor: dimensionColor,
                    boxShadow: `0 0 6px ${hexToRgba(dimensionColor, 0.5)}`,
                  }}
                />
                <span
                  className="inline-block px-2 py-0.5 rounded text-[9px] font-semibold"
                  style={{
                    color: dimensionColor,
                    backgroundColor: hexToRgba(dimensionColor, 0.15),
                    border: `1px solid ${hexToRgba(dimensionColor, 0.35)}`,
                  }}
                >
                  {dimension}
                </span>
              </div>
            </div>

            <div
              className="grid grid-cols-3 gap-2 pt-2 border-t"
              style={{ borderColor: hexToRgba(dimensionColor, 0.2) }}
            >
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <div
                    className="p-1.5 rounded-lg transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: hexToRgba(dimensionColor, 0.12),
                      border: `1px solid ${hexToRgba(dimensionColor, 0.25)}`,
                    }}
                  >
                    <Database
                      className="h-3.5 w-3.5"
                      style={{ color: dimensionColor }}
                    />
                  </div>
                </div>
                <p className="text-[9px] text-muted-foreground mb-0.5 font-semibold uppercase tracking-wide">
                  Unit
                </p>
                <p className="text-xs font-bold text-foreground leading-tight">
                  {unit}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <div
                    className="p-1.5 rounded-lg transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: hexToRgba(dimensionColor, 0.12),
                      border: `1px solid ${hexToRgba(dimensionColor, 0.25)}`,
                    }}
                  >
                    <Target
                      className="h-3.5 w-3.5"
                      style={{ color: dimensionColor }}
                    />
                  </div>
                </div>
                <p className="text-[9px] text-muted-foreground mb-0.5 font-semibold uppercase tracking-wide">
                  Target
                </p>
                <p
                  className="text-xs font-bold leading-tight"
                  style={{ color: dimensionColor }}
                >
                  {target}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <div
                    className="p-1.5 rounded-lg transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: hexToRgba(dimensionColor, 0.12),
                      border: `1px solid ${hexToRgba(dimensionColor, 0.25)}`,
                    }}
                  >
                    <Clock
                      className="h-3.5 w-3.5"
                      style={{ color: dimensionColor }}
                    />
                  </div>
                </div>
                <p className="text-[9px] text-muted-foreground mb-0.5 font-semibold uppercase tracking-wide">
                  Refresh
                </p>
                <p className="text-xs font-bold text-foreground leading-tight">
                  {refresh}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-1">
          <div className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-150"
              style={{
                backgroundColor: dimensionColor,
                boxShadow: `0 0 6px ${hexToRgba(dimensionColor, 0.6)}`,
              }}
            />
            <span className="text-[9px] text-muted-foreground font-medium">
              Measurement Metric
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

