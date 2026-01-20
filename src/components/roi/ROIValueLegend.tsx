interface ValueItemProps {
  label: string;
  percentage: number;
  color: string;
}

function ValueItem({ label, percentage, color }: ValueItemProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-semibold text-foreground">{label}:</span>
        <span className="text-xs font-bold" style={{ color }}>{percentage}%</span>
      </div>
    </div>
  );
}

interface ROIValueLegendProps {
  valueProtection: number;
  valueRealization: number;
  strategicPosition: number;
}

export function ROIValueLegend({
  valueProtection,
  valueRealization,
  strategicPosition,
}: ROIValueLegendProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5 px-4 py-3 rounded-lg border border-border/50 bg-card shadow-sm">
      <ValueItem
        label="Value Protection"
        percentage={valueProtection}
        color="#16A34A"
      />
      <ValueItem
        label="Value Realization"
        percentage={valueRealization}
        color="#4160F0"
      />
      <ValueItem
        label="Strategic Position"
        percentage={strategicPosition}
        color="#FF6700"
      />
    </div>
  );
}



