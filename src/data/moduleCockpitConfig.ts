import { ReactNode } from "react";
import { TrendingUp, Shield, CheckCircle, Activity, Clock, BarChart3, LucideIcon } from "lucide-react";
import { SummaryCard } from "../components/roi/cards/SummaryCards";
import { getStatusColor } from "./statusMapping";
import { ModuleCockpitData, SubModule } from "./moduleCockpitData";

// Metric Card Props
export interface MetricCardData {
  icon: LucideIcon;
  value: string;
  title: string;
  description: string;
  color?: string;
  showStatusDot?: boolean;
}

// Metric Colors - Centralized
const METRIC_COLORS = {
  financialValue: "#10b981",
  controlCoverage: "#2563eb",
  kpiStatus: "#6366f1",
} as const;

// Helper: Convert hex to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Summary Cards Configuration
export const getSummaryCards = (
  cockpitData: ModuleCockpitData
): SummaryCard[] => {
  return [
    {
      title: "Overall ROI Health",
      value: cockpitData.summaryMetrics.overallROIHealth.value,
      icon: TrendingUp,
      color: getStatusColor(cockpitData.summaryMetrics.overallROIHealth.status),
    },
    {
      title: "Financial Value at Risk Protected",
      value: cockpitData.summaryMetrics.financialValueAtRisk.value,
      icon: Shield,
      color: METRIC_COLORS.financialValue,
    },
    {
      title: "Control Coverage Percentage",
      value: cockpitData.summaryMetrics.controlCoverage.value,
      icon: Clock,
      color: METRIC_COLORS.controlCoverage,
    },
    {
      title: "KPIs in Green / Amber / Red",
      value: `${cockpitData.summaryMetrics.kpiStatus.green} / ${cockpitData.summaryMetrics.kpiStatus.amber} / ${cockpitData.summaryMetrics.kpiStatus.red}`,
      icon: BarChart3,
      color: METRIC_COLORS.kpiStatus,
    },
  ];
};

// Metric Cards Configuration - New design matching image
export const getMetricCards = (
  cockpitData: ModuleCockpitData
): MetricCardData[] => {
  return [
    {
      icon: TrendingUp,
      value: cockpitData.summaryMetrics.overallROIHealth.value,
      title: `${cockpitData.moduleName} Overall ROI Health`,
      description: cockpitData.summaryMetrics.overallROIHealth.description,
      color: getStatusColor(cockpitData.summaryMetrics.overallROIHealth.status),
      showStatusDot: true,
    },
    {
      icon: Shield,
      value: cockpitData.summaryMetrics.financialValueAtRisk.value,
      title: "Financial Value at Risk Protected",
      description: cockpitData.summaryMetrics.financialValueAtRisk.description,
      color: METRIC_COLORS.financialValue,
      showStatusDot: true,
    },
    {
      icon: CheckCircle,
      value: cockpitData.summaryMetrics.controlCoverage.value,
      title: "Control Coverage Percentage",
      description: cockpitData.summaryMetrics.controlCoverage.description,
      color: METRIC_COLORS.controlCoverage,
      showStatusDot: true,
    },
    {
      icon: Activity,
      value: `${cockpitData.summaryMetrics.kpiStatus.green} / ${cockpitData.summaryMetrics.kpiStatus.amber} / ${cockpitData.summaryMetrics.kpiStatus.red}`,
      title: "KPIs in Green / Amber / Red",
      description: cockpitData.summaryMetrics.kpiStatus.description,
      color: METRIC_COLORS.kpiStatus,
      showStatusDot: false,
    },
  ];
};

// Sub-Module Card Config - Reusable
export interface SubModuleCardConfig {
  title: string;
  value: string;
  description: ReactNode;
  borderColor: string;
  bgColor: string;
  onClick: () => void;
  isSelected: boolean;
}

export const getSubModuleCardConfig = (
  subModule: SubModule,
  isSelected: boolean,
  onToggle: (id: string) => void
): SubModuleCardConfig => {
  const statusColor = getStatusColor(subModule.status);
  const selectedColor = "#4160F0";

  return {
    title: subModule.name,
    value: `${subModule.healthPercentage}%`,
    description: null, // Will be set in component with StatusBadge
    borderColor: isSelected
      ? hexToRgba(selectedColor, 0.3)
      : hexToRgba(statusColor, 0.3),
    bgColor: isSelected
      ? hexToRgba(selectedColor, 0.1)
      : hexToRgba(statusColor, 0.1),
    onClick: () => onToggle(subModule.id),
    isSelected,
  };
};

