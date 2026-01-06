import { Database, CheckCircle2, Clock } from "lucide-react";
import {
  ControlEvidenceData,
  EvidenceSource,
} from "../../../../../../data/controlEvidenceData";

interface EvidenceSourcesTabProps {
  evidenceData: ControlEvidenceData;
}

// Evidence Source Card styled like CatalogCard
function EvidenceSourceCard({ source }: { source: EvidenceSource }) {
  const getEvidenceTypeColor = (type: string): string => {
    const colorMap: Record<string, string> = {
      "System Configuration": "#2563EB",
      "Exception Report": "#EA580C",
      "System Log": "#7C3AED",
      "Transaction Data": "#059669",
    };
    return colorMap[type] || "#6366F1";
  };

  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const typeColor = getEvidenceTypeColor(source.evidenceType);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-md hover:shadow-xl hover:border-border/70 transition-all duration-300">
      <div className="p-3">
        {/* Inner Card with Fresh Vibrant Background */}
        <div
          className="rounded-lg p-3 mb-3 shadow-sm border"
          style={{
            background:
              "linear-gradient(135deg, rgba(147, 197, 253, 0.15) 0%, rgba(196, 181, 253, 0.12) 50%, rgba(251, 146, 60, 0.08) 100%)",
            borderColor: "rgba(191, 219, 254, 0.4)",
          }}
        >
          {/* Evidence Type with Label */}
          <div className="mb-2">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider inline-block mr-2">
              Type:{" "}
            </span>
            <span
              className="inline-block px-2 py-0.5 text-[10px] font-semibold rounded border"
              style={{
                backgroundColor: hexToRgba(typeColor, 0.15),
                color: typeColor,
                borderColor: hexToRgba(typeColor, 0.4),
              }}
            >
              {source.evidenceType}
            </span>
          </div>

          {/* Source Name with Label */}
          <div className="mb-2">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider inline-block mr-2">
              Source:{" "}
            </span>
            <h3 className="text-sm font-bold text-foreground leading-tight inline">
              {source.source}
            </h3>
          </div>

          {/* Availability Badge */}
          <div className="mb-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-green-100 text-green-700 border border-green-200 flex items-center gap-1 w-fit">
              <CheckCircle2 className="h-3 w-3" />
              {source.availability}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-2">
          {/* Description */}
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
              Description
            </p>
            <p className="text-xs text-foreground leading-relaxed">
              {source.description}
            </p>
          </div>

          {/* Footer Info - Clear Labels */}
          <div className="space-y-1 pt-2 border-t border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Retention:{" "}
              </span>
              <span className="text-[10px] text-foreground font-medium">
                {source.retention}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Database className="h-3 w-3" />
                Updated:{" "}
              </span>
              <span className="text-[10px] text-foreground font-medium">
                {source.lastUpdated}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EvidenceSourcesTab({
  evidenceData,
}: EvidenceSourcesTabProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">
          Evidence Sources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {evidenceData.evidenceSources.map((source) => (
            <EvidenceSourceCard key={source.id} source={source} />
          ))}
        </div>
      </div>
    </div>
  );
}
