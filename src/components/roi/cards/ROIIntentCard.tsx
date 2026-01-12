import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { hexToRgba, CARD_STYLES } from "./index";

interface ROIIntentCardProps {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
  value: string;
  color: string;
}

export function ROIIntentCard({
  id,
  icon: Icon,
  label,
  description,
  value,
  color,
}: ROIIntentCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/roi-intent-overview/${id}`);
  };

  return (
    <div
      className={`group relative overflow-hidden ${CARD_STYLES.BORDER_RADIUS} border border-border/50 bg-card ${CARD_STYLES.SHADOW} hover:${CARD_STYLES.HOVER_SHADOW} ${CARD_STYLES.TRANSITION} cursor-pointer`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="p-3">
        <div
          className="rounded-lg p-3.5 mb-3 shadow-sm border relative overflow-hidden"
          style={{
            backgroundColor: hexToRgba(color, 0.1),
            borderColor: hexToRgba(color, 0.35),
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at top right, ${hexToRgba(
                color,
                0.25
              )}, transparent 70%)`,
            }}
          />

          <div className="relative z-10">
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
              {value && (
                <div className="shrink-0">
                  <p
                    className="text-lg font-bold leading-none"
                    style={{ color }}
                  >
                    {value}
                  </p>
                </div>
              )}
            </div>

            <div
              className="pt-2 border-t"
              style={{ borderColor: hexToRgba(color, 0.25) }}
            >
              <p className="text-xs text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


