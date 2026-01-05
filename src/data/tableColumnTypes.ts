import React, { ReactNode } from "react";
import { StatusBadge, StatusType } from "../components/roi/StatusBadge";

// Column Types - Easy to extend
export type ColumnType =
  | "text"
  | "status"
  | "badge"
  | "number"
  | "currency"
  | "percentage"
  | "date"
  | "custom";

// Column Configuration
export interface SimpleColumnConfig<T = object> {
  key: keyof T;
  header: string;
  type: ColumnType;
  align?: "left" | "center" | "right";
  width?: string;
  badgeConfig?: {
    colorMap?: Record<string, string>;
    defaultColor?: string;
  };
  textStyle?: "short" | "long" | "auto";
  customAccessor?: (row: T) => ReactNode;
}

// Helper: Convert hex to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Helper: Get badge color
const getBadgeColor = (
  value: string,
  colorMap?: Record<string, string>,
  defaultColor = "#6366f1"
): string => {
  return colorMap?.[value] || defaultColor;
};

// Text Styles
const TEXT_STYLES = {
  short: "text-sm font-semibold text-foreground leading-tight",
  long: "text-xs text-muted-foreground leading-relaxed",
  auto: "",
} as const;

// Column Renderers - Add new types here
type RendererConfig = {
  textStyle?: "short" | "long" | "auto";
  badgeConfig?: SimpleColumnConfig["badgeConfig"];
};

const columnRenderers = {
  text: (value: string, config?: RendererConfig) => {
    const textStyle = config?.textStyle || "auto";
    const style =
      textStyle === "auto"
        ? value.length > 50
          ? TEXT_STYLES.long
          : TEXT_STYLES.short
        : TEXT_STYLES[textStyle];
    return React.createElement("p", { className: style }, value);
  },

  status: (value: unknown) => {
    return React.createElement(
      "div",
      { className: "flex items-center justify-center" },
      React.createElement(StatusBadge, {
        status: value as StatusType,
        size: "md",
        showIcon: true,
      })
    );
  }, // Config not used, but kept for consistency

  badge: (value: string, config?: RendererConfig) => {
    const badgeColor = getBadgeColor(
      value,
      config?.badgeConfig?.colorMap,
      config?.badgeConfig?.defaultColor
    );
    return React.createElement(
      "span",
      {
        className:
          "inline-block px-2.5 py-1 rounded-md text-[10px] font-semibold border",
        style: {
          color: badgeColor,
          backgroundColor: hexToRgba(badgeColor, 0.15),
          borderColor: hexToRgba(badgeColor, 0.3),
        },
      },
      value
    );
  },

  number: (value: string) =>
    React.createElement(
      "p",
      {
        className: "text-sm font-medium text-foreground",
      },
      value
    ),

  currency: (value: string) =>
    React.createElement(
      "p",
      {
        className: "text-sm font-bold text-foreground",
      },
      value
    ),

  percentage: (value: string) =>
    React.createElement(
      "p",
      {
        className: "text-sm font-bold text-foreground",
      },
      value
    ),

  date: (value: string) =>
    React.createElement(
      "p",
      {
        className: "text-xs text-muted-foreground",
      },
      value
    ),

  custom: (value: string) =>
    React.createElement(
      "span",
      {
        className: "text-sm text-foreground",
      },
      value
    ),
};

// Main Renderer - Renders cell based on column type
export const renderCellByType = (
  value: unknown,
  type: ColumnType,
  config?: RendererConfig
): ReactNode => {
  const stringValue = String(value || "");
  const renderer = columnRenderers[type] || columnRenderers.custom;
  return renderer(stringValue, config);
};
