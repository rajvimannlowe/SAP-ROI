import { CheckCircle2, AlertTriangle, XCircle, LucideIcon } from "lucide-react";

// Centralized Status Types for the entire project
export type StatusType =
  | "Optimal"
  | "Warning"
  | "Error"
  | "Active"
  | "Planned"
  | "Monitor"
  | "Action";

// Centralized Status Configuration
export interface StatusConfig {
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

// Base status configurations
const WARNING_CONFIG: StatusConfig = {
  icon: AlertTriangle,
  iconColor: "text-amber-600",
  bgColor: "bg-amber-50",
  textColor: "text-amber-700",
  borderColor: "border-amber-200",
};

const OPTIMAL_CONFIG: StatusConfig = {
  icon: CheckCircle2,
  iconColor: "text-emerald-600",
  bgColor: "bg-emerald-50",
  textColor: "text-emerald-700",
  borderColor: "border-emerald-200",
};

const ERROR_CONFIG: StatusConfig = {
  icon: XCircle,
  iconColor: "text-red-600",
  bgColor: "bg-red-50",
  textColor: "text-red-700",
  borderColor: "border-red-200",
};

// Status Mapping - Single source of truth for all statuses
export const STATUS_MAPPING: Record<StatusType, StatusConfig> = {
  Optimal: OPTIMAL_CONFIG,
  Warning: WARNING_CONFIG,
  Error: ERROR_CONFIG,
  Active: OPTIMAL_CONFIG, // Same as Optimal
  Planned: WARNING_CONFIG, // Same as Warning
  Monitor: WARNING_CONFIG, // Same as Warning
  Action: ERROR_CONFIG, // Same as Error
};

// Helper to get status config
export const getStatusConfig = (status: StatusType): StatusConfig => {
  return STATUS_MAPPING[status];
};

// Helper to check if value is a valid status
export const isStatusType = (value: unknown): value is StatusType => {
  return typeof value === "string" && value in STATUS_MAPPING;
};

// Helper to get hex color from status (for components that need hex values)
export const getStatusColor = (status: StatusType): string => {
  const colorMap: Record<StatusType, string> = {
    Optimal: "#10b981", // emerald-600
    Active: "#10b981", // Same as Optimal
    Warning: "#f59e0b", // amber-600
    Monitor: "#f59e0b", // Same as Warning
    Planned: "#f59e0b", // Same as Warning
    Error: "#ef4444", // red-600
    Action: "#ef4444", // Same as Error
  };
  return colorMap[status] || "#6b7280";
};
