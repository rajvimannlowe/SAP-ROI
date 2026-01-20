import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  HeatmapData,
  getUniqueSubProcesses,
  getUniqueRootCauses,
} from "@/data/deviationAnalysisData";
import { AlertTriangle, Info } from "lucide-react";
import { hexToRgba } from "./cards/index";

interface DeviationHeatmapProps {
  data: HeatmapData[];
  title?: string;
}

export function DeviationHeatmap({
  data,
  title = "Sub-Process vs Root Cause Heatmap",
}: DeviationHeatmapProps) {
  const subProcesses = getUniqueSubProcesses();
  const rootCauses = getUniqueRootCauses();

  // Create a map for quick lookup
  const dataMap = new Map<string, HeatmapData>();
  data.forEach((item) => {
    const key = `${item.subProcess}|${item.rootCause}`;
    dataMap.set(key, item);
  });

  // Get cell data
  const getCellData = (
    subProcess: string,
    rootCause: string
  ): HeatmapData | null => {
    const key = `${subProcess}|${rootCause}`;
    return dataMap.get(key) || null;
  };

  // New improved color scheme
  const getCircleColor = (
    severity: HeatmapData["severity"] | null,
    count: number
  ): string => {
    if (!severity || count === 0) return "#E5E7EB"; // Light gray for empty

    const colors = {
      Critical: "#EF4444", // Bright Red
      High: "#F97316", // Bright Orange
      Medium: "#EAB308", // Bright Yellow
      Low: "#84CC16", // Green
    };

    return colors[severity];
  };

  // Get circle size based on count
  const getCircleSize = (count: number): string => {
    if (count >= 8) return "w-14 h-14 text-base";
    if (count >= 5) return "w-12 h-12 text-sm";
    if (count >= 2) return "w-10 h-10 text-sm";
    return "w-9 h-9 text-xs";
  };

  // Get circle opacity/intensity based on count
  // const getCircleIntensity = (count: number): number => {
  //   const maxCount = 8;
  //   return 0.3 + Math.min(count / maxCount, 1) * 0.7; // 0.3 to 1.0
  // };

  // Get background circle color (lighter)
  // const getCircleBgColor = (
  //   severity: HeatmapData["severity"] | null,
  //   count: number
  // ): string => {
  //   if (!severity || count === 0) return "#F9FAFB";
  //   const intensity = getCircleIntensity(count);
  //   return hexToRgba(getCircleColor(severity, count), intensity * 0.3);
  // };

  return (
    <Card className="border border-border/50 shadow-lg overflow-hidden">
      <CardHeader className="pb-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-[#9909e0] to-[#8b5cf6]">
              <AlertTriangle className="h-4 w-4 text-white" />
            </div>
            <span>{title}</span>
          </CardTitle>

          {/* Legend in Header - Better UX */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs font-semibold text-muted-foreground">
              Severity:
            </span>
            {[
              {
                severity: "Critical" as const,
                label: "Critical (8+)",
                color: "#EF4444",
                count: 8,
              },
              {
                severity: "High" as const,
                label: "High (5-7)",
                color: "#F97316",
                count: 6,
              },
              {
                severity: "Medium" as const,
                label: "Medium (2-4)",
                color: "#EAB308",
                count: 3,
              },
              {
                severity: "Low" as const,
                label: "Low (1)",
                color: "#84CC16",
                count: 1,
              },
            ].map((item) => (
              <div key={item.severity} className="flex items-center gap-1.5">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${hexToRgba(
                      item.color,
                      1
                    )}, ${hexToRgba(item.color, 0.85)} 50%, ${hexToRgba(
                      item.color,
                      0.7
                    )})`,
                    boxShadow: `
                      0 2px 4px ${hexToRgba(item.color, 0.4)},
                      inset 0 1px 2px rgba(255,255,255,0.3),
                      inset 0 -1px 2px rgba(0,0,0,0.2)
                    `,
                    border: `1px solid rgba(255,255,255,0.25)`,
                  }}
                >
                  {item.count >= 8
                    ? "8"
                    : item.count >= 5
                    ? "6"
                    : item.count >= 2
                    ? "3"
                    : "1"}
                </div>
                <span
                  className="text-[10px] font-semibold"
                  style={{ color: item.color }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        {/* Well-Organized Grid with Better Spacing */}
        <div className="overflow-x-auto rounded-lg border border-border/30 bg-muted/10">
          <div className="inline-block min-w-full">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-muted/50 to-muted/30">
                  <th className="sticky left-0 z-10 bg-gradient-to-r from-muted/50 to-muted/30 border-r-2 border-border/40 p-3 text-left text-xs font-bold text-foreground min-w-[160px]">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-4 rounded-full bg-[#9909e0]" />
                      <span>Sub-Process</span>
                    </div>
                  </th>
                  {rootCauses.map((rootCause) => (
                    <th
                      key={rootCause}
                      className="border-l border-border/30 p-3 text-center text-xs font-semibold text-foreground min-w-[120px]"
                    >
                      <div className="max-w-[110px] mx-auto leading-tight">
                        {rootCause}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subProcesses.map((subProcess, rowIndex) => (
                  <tr
                    key={subProcess}
                    className={`transition-colors ${
                      rowIndex % 2 === 0
                        ? "bg-white hover:bg-muted/30"
                        : "bg-muted/10 hover:bg-muted/40"
                    }`}
                  >
                    <td className="sticky left-0 z-10 bg-inherit border-r-2 border-border/40 p-3 text-xs font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#9909e0]/60" />
                        <span>{subProcess}</span>
                      </div>
                    </td>
                    {rootCauses.map((rootCause) => {
                      const cellData = getCellData(subProcess, rootCause);
                      const count = cellData?.count || 0;
                      const severity = cellData?.severity || null;

                      return (
                        <td
                          key={`${subProcess}-${rootCause}`}
                          className="border-l border-border/20 p-3 text-center align-middle group transition-all duration-200 hover:bg-muted/20"
                        >
                          {count > 0 ? (
                            <div className="flex flex-col items-center justify-center gap-1.5">
                              {/* 3D Circle with Better Visual */}
                              <div
                                className={`${getCircleSize(
                                  count
                                )} rounded-full flex items-center justify-center font-extrabold text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg cursor-pointer relative`}
                                style={{
                                  background: `radial-gradient(circle at 30% 30%, ${hexToRgba(
                                    getCircleColor(severity, count),
                                    1
                                  )}, ${hexToRgba(
                                    getCircleColor(severity, count),
                                    0.85
                                  )} 50%, ${hexToRgba(
                                    getCircleColor(severity, count),
                                    0.7
                                  )})`,
                                  boxShadow: `
                                    0 4px 12px ${hexToRgba(
                                      getCircleColor(severity, count),
                                      0.4
                                    )},
                                    inset 0 2px 4px rgba(255,255,255,0.3),
                                    inset 0 -2px 4px rgba(0,0,0,0.2)
                                  `,
                                  border: `2px solid rgba(255,255,255,0.25)`,
                                }}
                              >
                                {count}
                              </div>
                              {/* Severity Label */}
                              {severity && (
                                <span
                                  className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                                  style={{
                                    color: getCircleColor(severity, count),
                                    backgroundColor: hexToRgba(
                                      getCircleColor(severity, count),
                                      0.1
                                    ),
                                  }}
                                >
                                  {severity}
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-full min-h-[60px]">
                              <div className="w-6 h-6 rounded-full border border-dashed border-muted-foreground/20" />
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Legend (shown on small screens) */}
        <div className="mt-4 md:hidden flex flex-wrap items-center gap-2.5 px-3 py-2 rounded-lg bg-muted/20 border border-border/40">
          <span className="text-xs font-semibold text-muted-foreground">
            Severity:
          </span>
          {[
            {
              severity: "Critical" as const,
              label: "Critical (8+)",
              color: "#EF4444",
              count: 8,
            },
            {
              severity: "High" as const,
              label: "High (5-7)",
              color: "#F97316",
              count: 6,
            },
            {
              severity: "Medium" as const,
              label: "Medium (2-4)",
              color: "#EAB308",
              count: 3,
            },
            {
              severity: "Low" as const,
              label: "Low (1)",
              color: "#84CC16",
              count: 1,
            },
          ].map((item) => (
            <div key={item.severity} className="flex items-center gap-1.5">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${hexToRgba(
                    item.color,
                    1
                  )}, ${hexToRgba(item.color, 0.85)} 50%, ${hexToRgba(
                    item.color,
                    0.7
                  )})`,
                  boxShadow: `
                    0 2px 4px ${hexToRgba(item.color, 0.4)},
                    inset 0 1px 2px rgba(255,255,255,0.3),
                    inset 0 -1px 2px rgba(0,0,0,0.2)
                  `,
                  border: `1px solid rgba(255,255,255,0.25)`,
                }}
              >
                {item.count >= 8
                  ? "8"
                  : item.count >= 5
                  ? "6"
                  : item.count >= 2
                  ? "3"
                  : "1"}
              </div>
              <span
                className="text-[10px] font-semibold"
                style={{ color: item.color }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Interpretation Box - Better UX */}
        <div className="mt-4 relative overflow-hidden rounded-xl border border-[#9909e0]/30 bg-gradient-to-br from-[#9909e0]/8 to-[#8b5cf6]/5 p-4">
          <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[#9909e0]/10 blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 rounded-full bg-gradient-to-br from-[#9909e0] to-[#8b5cf6] shadow-md">
                <Info className="h-3.5 w-3.5 text-white" />
              </div>
              <h4 className="text-sm font-bold text-foreground">
                Key Insights
              </h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-[#EF4444] font-semibold">
                Critical concentration
              </strong>{" "}
              in{" "}
              <strong className="text-foreground">
                Vendor Onboarding &gt; Insufficient Process Capacity
              </strong>{" "}
              (8 occurrences) signals structural undersourcing requiring
              immediate capacity augmentation or automation. Invoice Processing
              shows balanced distribution across validation and policy gaps,
              indicating need for both systems controls and policy
              clarification.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
