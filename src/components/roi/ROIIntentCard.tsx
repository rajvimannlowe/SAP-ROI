import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ROIIntentCardProps {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
  color: string;
}

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export function ROIIntentCard({
  id,
  icon: Icon,
  label,
  description,
  color,
}: ROIIntentCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/roi-intent-overview/${id}`);
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-md hover:shadow-xl hover:border-border/70 transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="p-3">
        {/* Inner Card with Solid Color Background */}
        <div
          className="rounded-lg p-3.5 mb-3 shadow-sm border relative overflow-hidden"
          style={{
            backgroundColor: hexToRgba(color, 0.1),
            borderColor: hexToRgba(color, 0.35),
          }}
        >
          {/* Animated gradient overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at top right, ${hexToRgba(color, 0.25)}, transparent 70%)`,
            }}
          />
          
          <div className="relative z-10">
            {/* Icon and Label Row */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                style={{
                  backgroundColor: hexToRgba(color, 0.2),
                  border: `2px solid ${hexToRgba(color, 0.4)}`,
                  boxShadow: `0 2px 8px ${hexToRgba(color, 0.2)}`,
                }}
              >
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="text-sm font-bold leading-tight"
                  style={{ color }}
                >
                  {label}
                </h3>
              </div>
            </div>

            {/* Description */}
            <div className="pt-2 border-t" style={{ borderColor: hexToRgba(color, 0.25) }}>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Footer with Fresh Accent */}
        <div className="px-1">
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-125"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 8px ${hexToRgba(color, 0.5)}`,
              }}
            />
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              ROI Dimension
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
