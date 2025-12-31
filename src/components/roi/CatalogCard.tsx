import { CatalogItem } from "../../data/roiCatalogData";

interface CatalogCardProps {
  item: CatalogItem;
}

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export function CatalogCard({ item }: CatalogCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-md hover:shadow-xl hover:border-border/70 transition-all duration-300">
      <div className="p-3">
        {/* Inner Card with Brand Colors Light Shades - Fresh Look */}
        <div
          className="rounded-lg p-3 mb-3 shadow-sm border"
          style={{
            background:
              "linear-gradient(135deg, rgba(65, 96, 240, 0.10) 0%, rgba(65, 96, 240, 0.08) 50%, rgba(255, 103, 0, 0.06) 100%)",
            borderColor: "rgba(65, 96, 240, 0.18)",
          }}
        >
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

          {/* ROI Dimensions - Colorful Badges in One Line (Smaller Size) */}
          <div>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
              ROI Dimensions:{" "}
            </span>
            <div className="flex gap-1 items-center flex-nowrap">
              {item.roiDimensions.map((dim, idx) => {
                const Icon = dim.icon;
                const color = dim.color || "#4160F0";
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-0.5 px-1.5 py-0.5 rounded border shadow-sm transition-all shrink-0"
                    style={{
                      color: color,
                      backgroundColor: hexToRgba(color, 0.15),
                      borderColor: hexToRgba(color, 0.35),
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
        </div>

        {/* Content Section */}
        <div className="space-y-2">
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
                  <span className="w-1 h-1 rounded-full bg-blue-600 mt-1.5 mr-1.5 shrink-0" />
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
                  <span className="w-1 h-1 rounded-full bg-purple-600 mt-1.5 mr-1.5 shrink-0" />
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
        </div>
      </div>
    </div>
  );
}
