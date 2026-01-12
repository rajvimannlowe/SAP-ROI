import { Link } from "react-router-dom";
import { CatalogItem } from "../../../data/roiCatalogData";
import { Badge } from "../../ui/badge";
import {
  Calendar,
  User,
  Target,
  TrendingUp,
  FileText,
  ExternalLink,
} from "lucide-react";
import { ActionItem } from "../../../data/actionTrackerData";
import {
  hexToRgba,
  getStatusColor,
  getPriorityColor,
  getCategoryColor,
  getROIDimensionColor,
  BRAND_COLORS,
  PRIORITY_COLORS,
  DEFAULT_COLORS,
  CARD_GRADIENTS,
  CARD_STYLES,
} from "./index";

interface CatalogCardProps {
  item: CatalogItem;
  onClick?: () => void;
  variant?: "default" | "action";
  actionData?: ActionItem;
  kpiDetailPath?: string;
  evidencePath?: string;
}

export function CatalogCard({
  item,
  onClick,
  variant = "default",
  actionData,
  kpiDetailPath,
  evidencePath,
}: CatalogCardProps) {
  const isActionVariant = variant === "action" && actionData;

  const categoryColor = isActionVariant
    ? getCategoryColor(actionData.rootCauseCategory)
    : BRAND_COLORS.PRIMARY;
  const statusColor = isActionVariant
    ? getStatusColor(actionData.status)
    : BRAND_COLORS.PRIMARY;

  const content = (
    <div
      className={`group relative overflow-hidden ${CARD_STYLES.BORDER_RADIUS} border border-border/50 bg-card ${CARD_STYLES.SHADOW} hover:${CARD_STYLES.HOVER_SHADOW} ${CARD_STYLES.TRANSITION} flex flex-col`}
    >
      <div className="p-4 flex flex-col">
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
                  backgroundColor: getPriorityColor(actionData.priority),
                }}
              >
                {actionData.priority}
              </Badge>
              {actionData.isOverdue && (
                <Badge
                  className="text-[9px] font-semibold px-1.5 py-0.5 text-white border-0"
                  style={{
                    backgroundColor: PRIORITY_COLORS.OVERDUE,
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
            background: CARD_GRADIENTS.DEFAULT,
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
                    const color = getROIDimensionColor(dim.label);
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
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
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
                  const color = getROIDimensionColor(dim.label);
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

        {/* Content Section */}
        <div className="space-y-3">
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
                      <span className="leading-snug line-clamp-2">{metric}</span>
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
                          backgroundColor: PRIORITY_COLORS.OVERDUE,
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
                    style={{ color: DEFAULT_COLORS.SUCCESS }}
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
                      className="text-xs font-medium flex items-center gap-1.5 hover:underline transition-colors cursor-pointer"
                      style={{ color: BRAND_COLORS.PRIMARY }}
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span className="truncate">
                        {actionData.linkedEvidence}
                      </span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  ) : (
                    <span
                      className="text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                      style={{ color: BRAND_COLORS.PRIMARY }}
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
    return <div onClick={onClick} className="cursor-pointer">{content}</div>;
  }

  return <Link to={`/phase-i/catalog/${item.id}/modules`} className="cursor-pointer">{content}</Link>;
}

