import { Link } from "react-router-dom";
import { CatalogItem } from "../../data/roiCatalogData";
import { Badge } from "../ui/badge";
import {
  Calendar,
  User,
  Target,
  TrendingUp,
  FileText,
  ExternalLink,
} from "lucide-react";
import { ActionItem } from "../../data/actionTrackerData";

interface CatalogCardProps {
  item: CatalogItem;
  onClick?: () => void;
  variant?: "default" | "action";
  actionData?: ActionItem;
  kpiDetailPath?: string;
  evidencePath?: string;
}

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export function CatalogCard({
  item,
  onClick,
  variant = "default",
  actionData,
  kpiDetailPath,
  evidencePath,
}: CatalogCardProps) {
  const isActionVariant = variant === "action" && actionData;

  // Get category color for action cards
  const getCategoryColor = (category: string): string => {
    const colorMap: Record<string, string> = {
      PROCESS: "#4160F0", // Brand blue
      DATA: "#10b981", // Emerald green
      SYSTEM: "#FF6700", // Brand orange
      BEHAVIOUR: "#8b5cf6", // Purple
    };
    return colorMap[category] || "#6366F1";
  };

  // Get status color - suitable colors
  const getStatusColor = (status: string): string => {
    const colorMap: Record<string, string> = {
      OPEN: "#4160F0", // Brand blue - open items need attention
      IN_PROGRESS: "#FF6700", // Brand orange - work in progress
      COMPLETED: "#10b981", // Green - successfully completed
      CLOSED: "#6b7280", // Gray - closed/archived
    };
    return colorMap[status] || "#4160F0";
  };

  const categoryColor = isActionVariant
    ? getCategoryColor(actionData.rootCauseCategory)
    : "#4160F0";
  const statusColor = isActionVariant
    ? getStatusColor(actionData.status)
    : "#4160F0";

  const content = (
    <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-md hover:shadow-lg transition-all duration-300 h-[580px] flex flex-col">
      <div className="p-4 flex flex-col flex-1 overflow-hidden min-h-0">
        {/* Action Header with ID and Badges */}
        {isActionVariant && (
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold text-muted-foreground bg-muted/50 px-2 py-0.5 rounded border border-border/40">
              {actionData.id}
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge
                className="text-[9px] font-semibold px-1.5 py-0.5 text-white border-0"
                style={{
                  backgroundColor: statusColor,
                }}
              >
                {actionData.status.replace("_", " ")}
              </Badge>
              <Badge
                className="text-[9px] font-semibold px-1.5 py-0.5 text-white border-0"
                style={{
                  backgroundColor:
                    actionData.priority === "CRITICAL"
                      ? "#dc2626"
                      : actionData.priority === "HIGH"
                      ? "#ef4444"
                      : actionData.priority === "MEDIUM"
                      ? "#FF6700"
                      : "#6b7280",
                }}
              >
                {actionData.priority}
              </Badge>
              {actionData.isOverdue && (
                <Badge
                  className="text-[9px] font-semibold px-1.5 py-0.5 text-white border-0"
                  style={{
                    backgroundColor: "#dc2626",
                  }}
                >
                  OVERDUE
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Inner Card with Fresh Vibrant Background */}
        <div
          className="rounded-lg p-3 mb-3 shadow-sm border shrink-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(147, 197, 253, 0.15) 0%, rgba(196, 181, 253, 0.12) 50%, rgba(251, 146, 60, 0.08) 100%)",
            borderColor: "rgba(191, 219, 254, 0.4)",
          }}
        >
          {/* Action Title and View KPI */}
          {isActionVariant ? (
            <div className="mb-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-foreground leading-tight flex-1">
                  {item.productSuite}
                </h3>
                {kpiDetailPath && (
                  <Link
                    to={kpiDetailPath}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[10px] font-medium text-[#4160F0] hover:text-[#3550D9] flex items-center gap-1 whitespace-nowrap transition-colors shrink-0"
                  >
                    <span>View KPI</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Category with Label */}
              <div className="mb-2">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider inline-block mr-2">
                  Category:{" "}
                </span>
                <span className="inline-block px-2 py-0.5 text-[10px] font-semibold rounded bg-muted/60 text-muted-foreground border border-border/50">
                  {item.category}
                </span>
              </div>

              {/* Product Name with Label */}
              <div className="mb-2">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider inline-block mr-2">
                  Product:{" "}
                </span>
                <h3 className="text-sm font-bold text-foreground leading-tight inline">
                  {item.productSuite}
                </h3>
              </div>

              {/* Vendor - Clear Label */}
              <div className="mb-2">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider inline-block mr-2">
                  Vendor:{" "}
                </span>
                <span className="text-xs text-foreground font-medium">
                  {item.vendor}
                </span>
              </div>
            </>
          )}

          {/* ROI Dimensions & Category */}
          {isActionVariant ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                  IMPACTED ROI DIMENSION
                </span>
                <div className="flex gap-1 items-center flex-wrap">
                  {item.roiDimensions.map((dim, idx) => {
                    const Icon = dim.icon;
                    const getDimensionColor = (label: string): string => {
                      const colorMap: Record<string, string> = {
                        "Process Efficiency": "#2563EB",
                        "Cash Flow & Working Capital": "#059669",
                        "Compliance Risk": "#7C3AED",
                        "Technology Optimization": "#EA580C",
                      };
                      return colorMap[label] || "#6366F1";
                    };
                    const color = getDimensionColor(dim.label);
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-1 px-2 py-1 rounded border shadow-sm"
                        style={{
                          color: color,
                          backgroundColor: hexToRgba(color, 0.15),
                          borderColor: hexToRgba(color, 0.4),
                        }}
                      >
                        <Icon className="h-3 w-3" />
                        <span className="text-[9px] font-medium whitespace-nowrap">
                          {dim.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                  ROOT CAUSE CATEGORY
                </span>
                <Badge
                  className="text-[10px] font-semibold px-2 py-1 text-white border-0"
                  style={{
                    backgroundColor: categoryColor,
                  }}
                >
                  {actionData.rootCauseCategory}
                </Badge>
              </div>
            </div>
          ) : (
            <div>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                ROI Dimensions:{" "}
              </span>
              <div className="flex gap-1 items-center flex-nowrap">
                {item.roiDimensions.map((dim, idx) => {
                  const Icon = dim.icon;
                  // Fresh, vibrant colors for ROI dimensions
                  const getDimensionColor = (label: string): string => {
                    const colorMap: Record<string, string> = {
                      Cost: "#059669",
                      Efficiency: "#2563EB",
                      Compliance: "#7C3AED",
                      Revenue: "#EA580C",
                      Experience: "#DB2777",
                      "Process Efficiency": "#2563EB",
                      "Cash Flow & Working Capital": "#059669",
                      "Compliance Risk": "#7C3AED",
                      "Technology Optimization": "#EA580C",
                    };
                    return colorMap[label] || "#6366F1";
                  };
                  const color = getDimensionColor(dim.label);
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-0.5 px-1.5 py-0.5 rounded border shadow-sm transition-all shrink-0"
                      style={{
                        color: color,
                        backgroundColor: hexToRgba(color, 0.15),
                        borderColor: hexToRgba(color, 0.4),
                      }}
                    >
                      <Icon className="h-2.5 w-2.5" />
                      <span className="text-[9px] font-medium whitespace-nowrap">
                        {dim.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Content Section - Scrollable */}
        <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-1">
          {isActionVariant ? (
            <>
              {/* Issue Description - Compact */}
              <div className="shrink-0">
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                  ISSUE DESCRIPTION
                </p>
                <p className="text-xs text-foreground leading-snug line-clamp-2">
                  {actionData.issueDescription}
                </p>
              </div>

              {/* Recommended Action - Compact */}
              <div className="shrink-0">
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                  RECOMMENDED ACTION
                </p>
                <ul className="space-y-1">
                  {item.primaryROIMetrics.slice(0, 2).map((metric, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-xs text-foreground"
                    >
                      <Target className="w-2.5 h-2.5 text-purple-600 mt-0.5 mr-1.5 shrink-0" />
                      <span className="leading-snug line-clamp-2">
                        {metric}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column Info */}
              <div className="grid grid-cols-1 gap-3 pt-3 border-t border-border/50 shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    ACTION OWNER
                  </span>
                  <span className="text-xs text-foreground font-medium flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    {item.vendor}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    DUE DATE
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-xs font-medium flex items-center gap-1.5 ${
                        actionData.isOverdue
                          ? "text-red-600"
                          : "text-foreground"
                      }`}
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      {item.updateFrequency}
                    </span>
                    {actionData.isOverdue && (
                      <Badge
                        className="text-[9px] font-semibold px-1.5 py-0.5 text-white border-0"
                        style={{
                          backgroundColor: "#dc2626",
                        }}
                      >
                        OVERDUE
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    ESTIMATED IMPACT
                  </span>
                  <span
                    className="text-xs font-medium flex items-start gap-1.5 max-w-[70%] text-right"
                    style={{ color: "#10b981" }}
                  >
                    <TrendingUp className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    <span className="leading-relaxed line-clamp-2">
                      {item.dataSources[1] || actionData.estimatedImpact}
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    LINKED EVIDENCE
                  </span>
                  {evidencePath ? (
                    <Link
                      to={evidencePath}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-medium flex items-center gap-1.5 hover:underline transition-colors"
                      style={{ color: "#4160F0" }}
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span className="truncate">
                        {actionData.linkedEvidence}
                      </span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  ) : (
                    <span
                      className="text-xs font-medium flex items-center gap-1.5"
                      style={{ color: "#4160F0" }}
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span className="truncate">
                        {actionData.linkedEvidence}
                      </span>
                    </span>
                  )}
                </div>
              </div>
              {/* Progress Notes */}
              <div className="pt-3 border-t border-border/50 shrink-0">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  PROGRESS NOTES
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {actionData.progressNotes}
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Primary ROI Metrics */}
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                  Primary ROI Metrics
                </p>
                <ul className="space-y-0.5">
                  {item.primaryROIMetrics.map((metric, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-xs text-foreground"
                    >
                      <span className="w-1 h-1 rounded-full bg-emerald-600 mt-1.5 mr-1.5 shrink-0" />
                      <span className="leading-tight">{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Data Sources */}
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                  Data Sources
                </p>
                <ul className="space-y-0.5">
                  {item.dataSources.map((source, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-xs text-foreground"
                    >
                      <span className="w-1 h-1 rounded-full bg-violet-600 mt-1.5 mr-1.5 shrink-0" />
                      <span className="leading-tight">{source}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Info - Clear Labels */}
              <div className="space-y-1 pt-2 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Integration:{" "}
                  </span>
                  <span className="px-1.5 py-0.5 text-[9px] font-medium rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {item.integrationMethod}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Update:{" "}
                  </span>
                  <span className="text-[10px] text-foreground font-medium">
                    {item.updateFrequency}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  if (variant === "action") {
    return <div>{content}</div>;
  }

  if (onClick) {
    return <div onClick={onClick}>{content}</div>;
  }

  return <Link to={`/phase-i/catalog/${item.id}/blueprint`}>{content}</Link>;
}
