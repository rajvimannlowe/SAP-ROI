import { ReactNode } from "react";

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export interface TableColumn<T = object> {
  key: string;
  header: string;
  accessor?: (row: T) => ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  headerClassName?: string;
  width?: string;
  sortable?: boolean;
  sticky?: boolean;
  renderHeader?: () => ReactNode;
}

export interface DrilldownTableProps<T = object> {
  // Required
  columns: TableColumn<T>[];
  data: T[];

  // Optional - Auto-generated if not provided
  title?: string;
  subtitle?: string | ((data: T[]) => string);

  // Optional - Smart defaults
  emptyMessage?: string | ((data: T[]) => string);
  emptyDescription?: string;
  className?: string;
  onRowClick?: (row: T) => void;
  getRowKey?: (row: T, index?: number) => string;
  accentColor?: string;
  showHeader?: boolean;
  stripedRows?: boolean;
  compact?: boolean;
}

export function DrilldownTable<T extends object = object>({
  columns,
  data,
  title,
  subtitle,
  emptyMessage = "No data available",
  emptyDescription,
  className = "",
  onRowClick,
  getRowKey = (row: T, index?: number) => {
    const r = row as Record<string, unknown>;
    return (r.id || r.key || index?.toString() || "") as string;
  },
  accentColor = "#4160F0",
  showHeader = true,
  stripedRows = true,
  compact = false,
}: DrilldownTableProps<T>) {
  // Process subtitle
  const finalSubtitle =
    typeof subtitle === "function" ? subtitle(data) : subtitle;

  // Auto-generate empty message if function
  const finalEmptyMessage =
    typeof emptyMessage === "function" ? emptyMessage(data) : emptyMessage;
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header Section */}
      {(title || finalSubtitle) && showHeader && (
        <div className="flex items-center justify-between">
          <div>
            {title && (
              <h3 className="text-lg font-bold text-foreground mb-1">
                {title}
              </h3>
            )}
            {finalSubtitle && (
              <p className="text-sm text-muted-foreground">{finalSubtitle}</p>
            )}
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-md hover:shadow-xl hover:border-border/70 transition-all duration-300">
        {/* Subtle gradient overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top right, ${hexToRgba(
              accentColor,
              0.05
            )}, transparent 70%)`,
          }}
        />

        <div className="relative overflow-x-auto">
          <table
            className="w-full border-collapse"
            style={{ tableLayout: "auto", width: "100%" }}
          >
            <thead
              style={{
                backgroundColor: "hsl(var(--card))",
              }}
            >
              <tr className="border-b border-border/50">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`${
                      compact ? "px-3 py-3" : "px-4 py-4"
                    } text-xs font-semibold text-muted-foreground uppercase tracking-wider ${
                      alignClasses[column.align || "left"]
                    } ${column.headerClassName || ""}`}
                    style={{
                      backgroundColor: "hsl(var(--card))",
                      background: `linear-gradient(135deg, ${hexToRgba(
                        accentColor,
                        0.08
                      )} 0%, ${hexToRgba(accentColor, 0.03)} 100%)`,
                    }}
                  >
                    {column.renderHeader ? (
                      column.renderHeader()
                    ) : (
                      <div
                        className={`flex items-center gap-2 ${
                          column.align === "right"
                            ? "justify-end"
                            : column.align === "center"
                            ? "justify-center"
                            : ""
                        }`}
                      >
                        <div
                          className="w-1 h-4 rounded-full shrink-0"
                          style={{
                            backgroundColor: accentColor,
                            boxShadow: `0 0 4px ${hexToRgba(accentColor, 0.5)}`,
                          }}
                        />
                        <span>{column.header}</span>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 bg-card">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-16 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: hexToRgba(accentColor, 0.1),
                          border: `2px solid ${hexToRgba(accentColor, 0.2)}`,
                        }}
                      >
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{
                            backgroundColor: accentColor,
                            opacity: 0.3,
                          }}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-1">
                          {finalEmptyMessage}
                        </p>
                        {emptyDescription && (
                          <p className="text-xs text-muted-foreground/70">
                            {emptyDescription}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((row, index) => {
                  const rowKey = getRowKey(row, index);
                  const isEven = stripedRows && index % 2 === 0;
                  const rowBg = isEven
                    ? "bg-card"
                    : stripedRows
                    ? "bg-muted/20"
                    : "bg-card";

                  return (
                    <tr
                      key={rowKey}
                      onClick={() => onRowClick?.(row)}
                      className={`transition-all duration-200 ${rowBg} ${
                        onRowClick
                          ? "cursor-pointer hover:bg-muted/50 hover:shadow-sm"
                          : "hover:bg-muted/30"
                      }`}
                      style={{
                        borderLeft: onRowClick
                          ? `3px solid transparent`
                          : undefined,
                      }}
                      onMouseEnter={(e) => {
                        if (onRowClick) {
                          e.currentTarget.style.borderLeftColor = accentColor;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (onRowClick) {
                          e.currentTarget.style.borderLeftColor = "transparent";
                        }
                      }}
                    >
                      {columns.map((column) => {
                        const rowData = row as Record<string, unknown>;
                        const content = column.accessor
                          ? column.accessor(row)
                          : (rowData[column.key] as ReactNode);
                        const stickyBg = column.sticky
                          ? isEven
                            ? "var(--card)"
                            : stripedRows
                            ? "hsl(var(--muted) / 0.2)"
                            : "var(--card)"
                          : undefined;

                        return (
                          <td
                            key={column.key}
                            className={`${
                              compact ? "px-3 py-2.5" : "px-4 py-3.5"
                            } ${alignClasses[column.align || "left"]} ${
                              column.sticky ? "sticky left-0 z-10" : ""
                            } ${column.className || ""}`}
                            style={{
                              backgroundColor: stickyBg,
                              textAlign: column.align || "left",
                            }}
                          >
                            {content}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with subtle border */}
        {data.length > 0 && (
          <div
            className="h-px"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${hexToRgba(
                accentColor,
                0.2
              )} 50%, transparent 100%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}
