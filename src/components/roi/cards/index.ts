// Centralized Card Configuration - All colors, status mappings, and helper functions for ROI card components

// BRAND COLORS
export const BRAND_COLORS = {
  PRIMARY: "#4160F0", // Brand blue
  PURPLE: "#8b5cf6", // Purple accent
  INDIGO: "#6366F1", // Indigo fallback
} as const;

// STATUS COLORS
export const STATUS_COLORS = {
  OPEN: "#4160F0", // Brand blue - open items need attention
  IN_PROGRESS: "#FF6700", // Brand orange - work in progress
  COMPLETED: "#10b981", // Green - successfully completed
  CLOSED: "#6b7280", // Gray - closed/archived
} as const;

// PRIORITY COLORS
export const PRIORITY_COLORS = {
  LOW: "#6b7280", // Gray - low priority, less urgent
  MEDIUM: "#FF6700", // Brand orange - medium urgency
  HIGH: "#ef4444", // Bright red - high urgency
  CRITICAL: "#dc2626", // Red - critical urgency
  OVERDUE: "#dc2626", // Red for overdue items
} as const;

// CATEGORY COLORS (Root Cause Categories)
export const CATEGORY_COLORS = {
  PROCESS: "#4160F0", // Brand blue
  DATA: "#10b981", // Emerald green
  SYSTEM: "#FF6700", // Brand orange
  BEHAVIOUR: "#8b5cf6", // Purple
} as const;

// ROI DIMENSION COLORS
export const ROI_DIMENSION_COLORS = {
  Cost: "#059669", // Emerald green
  Efficiency: "#2563EB", // Blue
  Compliance: "#7C3AED", // Purple
  Revenue: "#EA580C", // Orange
  Experience: "#DB2777", // Pink
  "Process Efficiency": "#2563EB", // Blue
  "Cash Flow & Working Capital": "#059669", // Emerald green
  "Compliance Risk": "#7C3AED", // Purple
  "Technology Optimization": "#EA580C", // Orange
} as const;

// HELPER FUNCTIONS

// Convert hex color to rgba format
export const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Get status color
export const getStatusColor = (status: string): string => {
  const statusUpper = status.toUpperCase().replace(/\s/g, "_");
  return (
    STATUS_COLORS[statusUpper as keyof typeof STATUS_COLORS] ||
    BRAND_COLORS.PRIMARY
  );
};

// Get priority color
export const getPriorityColor = (priority: string): string => {
  const priorityUpper = priority.toUpperCase();
  return (
    PRIORITY_COLORS[priorityUpper as keyof typeof PRIORITY_COLORS] ||
    BRAND_COLORS.PRIMARY
  );
};

// Get category color (Root Cause Category)
export const getCategoryColor = (category: string): string => {
  const categoryUpper = category.toUpperCase();
  return (
    CATEGORY_COLORS[categoryUpper as keyof typeof CATEGORY_COLORS] ||
    BRAND_COLORS.INDIGO
  );
};

// Get ROI dimension color
export const getROIDimensionColor = (dimension: string): string => {
  return (
    ROI_DIMENSION_COLORS[dimension as keyof typeof ROI_DIMENSION_COLORS] ||
    BRAND_COLORS.INDIGO
  );
};

// CARD STYLING CONSTANTS
export const CARD_STYLES = {
  DEFAULT_HEIGHT: "580px",
  BORDER_RADIUS: "rounded-xl",
  SHADOW: "shadow-md",
  HOVER_SHADOW: "shadow-xl",
  TRANSITION: "transition-all duration-300",
} as const;

// GRADIENT COLORS
export const CARD_GRADIENTS = {
  DEFAULT:
    "linear-gradient(135deg, rgba(147, 197, 253, 0.15) 0%, rgba(196, 181, 253, 0.12) 50%, rgba(251, 146, 60, 0.08) 100%)",
} as const;

// DEFAULT VALUES
export const DEFAULT_COLORS = {
  PRIMARY: BRAND_COLORS.PRIMARY,
  SUCCESS: "#10b981", // Emerald green
} as const;

// Export all as a single object for convenience
export const CARD_CONFIG = {
  BRAND_COLORS,
  STATUS_COLORS,
  PRIORITY_COLORS,
  CATEGORY_COLORS,
  ROI_DIMENSION_COLORS,
  CARD_STYLES,
  CARD_GRADIENTS,
  DEFAULT_COLORS,
  helpers: {
    hexToRgba,
    getStatusColor,
    getPriorityColor,
    getCategoryColor,
    getROIDimensionColor,
  },
} as const;
