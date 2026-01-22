import { useParams, useNavigate } from "react-router-dom";
import {
  TrendingUp,
  FileText,
  ClipboardList,
  CheckCircle2,
  Target,
  Shield,
  // Database,
  RefreshCw,
  BarChart3,
  User,
  Clock,
  AlertCircle,
  // Settings,
  LucideIcon,
} from "lucide-react";
import { PageHeader } from "../../../../../components/layout/PageHeader";
import { MODULE_COCKPIT_DATA } from "../../../../../data/moduleCockpitData";
import { InfoCard } from "../../../../../components/roi/cards/InfoCard";
import { MetricCard } from "../../../../../components/roi/cards/MetricCard";
import { Button } from "../../../../../components/ui/button";
import { getStatusColor } from "../../../../../data/statusMapping";

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getGradient = (color: string) =>
  `linear-gradient(135deg, ${color} 0%, ${hexToRgba(color, 0.8)} 100%)`;

const createInfoCardProps = (
  icon: LucideIcon,
  title: string,
  description: string | React.ReactNode,
  color: string
) => ({
  icon,
  iconGradient: getGradient(color),
  title,
  description,
  borderColor: hexToRgba(color, 0.3),
  bgColor: hexToRgba(color, 0.05),
});

const COLORS = {
  blue: "#2563eb",
  red: "#ef4444",
  purple: "#9333ea",
  green: "#10b981",
  indigo: "#6366f1",
  amber: "#f59e0b",
  primary: "#4160F0",
} as const;

export function KPIDetailView() {
  const {
    moduleId,
    kpiId,
    id: blueprintId,
  } = useParams<{
    moduleId: string;
    kpiId: string;
    id: string;
  }>();
  const navigate = useNavigate();

  const cockpitData = moduleId ? MODULE_COCKPIT_DATA[moduleId] : null;
  // Find by id (slug) or by converting name to slug format for ROI Intent table navigation
  const kpiDetail = cockpitData?.kpiDetails.find((kpi) => {
    // First try exact id match (for cockpit table navigation)
    if (kpi.id === kpiId) return true;
    
    // Convert kpi.name to slug format and compare (for ROI Intent table navigation)
    const nameSlug = kpi.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    if (nameSlug === kpiId) return true;
    
    // Try partial match - check if key words match
    // This handles cases like "duplicate-payment-detection" matching "duplicate-payment-prevention"
    const kpiIdLower = kpiId?.toLowerCase();
    const nameSlugLower = nameSlug.toLowerCase();
    
    // Return false if kpiIdLower is undefined
    if (!kpiIdLower) return false;
    
    // Extract key words (remove common suffixes like -detection, -prevention, -monitoring)
    const normalizeSlug = (slug: string) => {
      return slug
        .replace(/-detection$/, "")
        .replace(/-prevention$/, "")
        .replace(/-monitoring$/, "")
        .replace(/-compliance$/, "")
        .replace(/-coverage$/, "")
        .replace(/-accuracy$/, "");
    };
    
    const normalizedKpiId = normalizeSlug(kpiIdLower);
    const normalizedNameSlug = normalizeSlug(nameSlugLower);
    
    // If normalized versions match, consider it a match
    if (normalizedKpiId === normalizedNameSlug) return true;
    
    // Also check if one contains the other (for partial matches)
    if (normalizedKpiId.includes(normalizedNameSlug) || normalizedNameSlug.includes(normalizedKpiId)) {
      return true;
    }
    
    return false;
  });
  const subModule = kpiDetail
    ? cockpitData?.subModules.find((sm) => sm.id === kpiDetail.subModuleId)
    : null;

  if (!cockpitData || !kpiDetail) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            KPI Not Found
          </h2>
          <p className="text-muted-foreground mb-4">
            The requested KPI detail is not available.
          </p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const statusColor = getStatusColor(kpiDetail.status);
  const statusBg = hexToRgba(statusColor, 0.1);
  const statusBorder = hexToRgba(statusColor, 0.3);

  const actionButtons = [
    {
      icon: TrendingUp,
      label: "Trend Analysis",
      variant: "outline" as const,
      onClick: () => {
        navigate(
          `/phase-i/catalog/${
            blueprintId || "sap-s4hana"
          }/blueprint/${moduleId}/cockpit/${kpiId}/trend`
        );
      },
    },
    {
      icon: FileText,
      label: "Control Evidence",
      variant: "outline" as const,
      onClick: () => {
        navigate(
          `/phase-i/catalog/${
            blueprintId || "sap-s4hana"
          }/blueprint/${moduleId}/cockpit/${kpiId}/evidence`
        );
      },
    },
    {
      icon: ClipboardList,
      label: "Action Tracker",
      variant: "default" as const,
      style: { backgroundColor: "#10b981" },
      onClick: () => {
        navigate(
          `/phase-i/catalog/${
            blueprintId || "sap-s4hana"
          }/blueprint/${moduleId}/cockpit/${kpiId}/actions`
        );
      },
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title={kpiDetail.name}
        subtitle={`SAP ${cockpitData.moduleName} - KPI Detail View`}
        backTo={`/phase-i/catalog/${
          blueprintId || "sap-s4hana"
        }/blueprint/${moduleId}/cockpit`}
        backLabel="Back to ROI Cockpit"
        rightContent={
          <div className="flex flex-wrap items-center gap-2">
            {actionButtons.map((btn) => (
              <Button
                key={btn.label}
                variant={btn.variant}
                size="sm"
                className="gap-2"
                style={btn.style}
                onClick={btn.onClick}
              >
                <btn.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{btn.label}</span>
              </Button>
            ))}
          </div>
        }
      />

      {/* Section 1: Content Cards - Objectives, Risk, Context */}
      <div className="space-y-6">
        {kpiDetail.businessObjective && (
          <InfoCard
            {...createInfoCardProps(
              Target,
              "Business Objective",
              <p className="text-sm text-foreground leading-relaxed whitespace-normal break-words">
                {kpiDetail.businessObjective}
              </p>,
              COLORS.blue
            )}
          />
        )}
        <InfoCard
          {...createInfoCardProps(
            Shield,
            "Business Risk / Leakage Prevented",
            <p className="text-sm text-foreground leading-relaxed whitespace-normal break-words">
              {kpiDetail.businessRiskPrevented}
            </p>,
            COLORS.red
          )}
        />
        {kpiDetail.businessContext && (
          <InfoCard
            {...createInfoCardProps(
              AlertCircle,
              "Business Context",
              <p className="text-sm text-foreground leading-relaxed whitespace-normal break-words">
                {kpiDetail.businessContext}
              </p>,
              COLORS.purple
            )}
          />
        )}
      </div>

      {/* Section 2: Threshold / Tolerance */}
      {kpiDetail.thresholds && (
        <InfoCard
          {...createInfoCardProps(
            BarChart3,
            "Threshold / Tolerance",
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-600" />
                  <span className="text-sm font-semibold text-green-700">
                    Green
                  </span>
                </div>
                <span className="text-sm font-semibold text-green-700">
                  {kpiDetail.thresholds.green}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-600" />
                  <span className="text-sm font-semibold text-amber-700">
                    Amber
                  </span>
                </div>
                <span className="text-sm font-semibold text-amber-700">
                  {kpiDetail.thresholds.amber}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-red-50 border border-red-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-600" />
                  <span className="text-sm font-semibold text-red-700">
                    Red
                  </span>
                </div>
                <span className="text-sm font-semibold text-red-700">
                  {kpiDetail.thresholds.red}
                </span>
              </div>
            </div>,
            COLORS.amber
          )}
        />
      )}

      {/* Section 3: Tags */}
      <div className="flex items-center gap-2 flex-wrap">
        {subModule && (
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            {subModule.name}
          </span>
        )}
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
          {kpiDetail.controlType} Control
        </span>
        {kpiDetail.roiDimension && (
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
            ROI: {kpiDetail.roiDimension}
          </span>
        )}
      </div>

      {/* Section 4: Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          icon={CheckCircle2}
          value={kpiDetail.currentMeasuredValue || "N/A"}
          title="Current Value"
          description={`Status: ${kpiDetail.status}`}
          color={statusColor}
        />
        {kpiDetail.targetValue && (
          <MetricCard
            icon={Target}
            value={kpiDetail.targetValue}
            title="Target Value"
            description="Target performance metric"
            color={COLORS.blue}
          />
        )}
        {kpiDetail.updateFrequency && (
          <MetricCard
            icon={RefreshCw}
            value={kpiDetail.updateFrequency}
            title="Update Frequency"
            description="Measurement update cadence"
            color={COLORS.purple}
          />
        )}
      </div>

      {/* Section 5: Status Analysis */}
      {kpiDetail.statusAnalysis && (
        <div
          className="rounded-xl border p-6 shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${statusBg} 0%, ${hexToRgba(
              statusColor,
              0.15
            )} 100%)`,
            borderColor: statusBorder,
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-full shrink-0"
              style={{ backgroundColor: statusColor }}
            >
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-foreground mb-3">
                Status Analysis
              </p>
              <p className="text-sm text-foreground leading-relaxed whitespace-normal break-words">
                {kpiDetail.statusAnalysis}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <InfoCard
        {...createInfoCardProps(
          User,
          "KPI Information",
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2 pt-4 border-t border-border/30">
            {[
              {
                icon: User,
                label: "KPI Owner",
                value: kpiDetail.owner,
                subValue: kpiDetail.ownerDepartment,
              },
              {
                icon: ClipboardList,
                label: "Recommended Action",
                value: kpiDetail.recommendedAction,
              },
              {
                icon: Clock,
                label: "Last Updated",
                value: kpiDetail.lastUpdated || cockpitData.lastUpdated,
              },
            ].map(({ icon: Icon, label, value, subValue }) => (
              <div key={label} className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {label}
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    subValue ? "font-semibold" : ""
                  } text-foreground ${!subValue ? "leading-relaxed whitespace-normal break-words" : ""}`}
                >
                  {value}
                </p>
                {subValue && (
                  <p className="text-xs text-muted-foreground whitespace-normal break-words">{subValue}</p>
                )}
              </div>
            ))}
          </div>,
          COLORS.primary
        )}
      />
    </div>
  );
}
