import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { hexToRgba, DEFAULT_COLORS, BRAND_COLORS, CARD_STYLES } from "./index";

interface MetricCardProps {
  icon: LucideIcon;
  value: string | number;
  title: string;
  description?: string;
  subtitle?: string;
  color?: string;
  backgroundColor?: string;
  showStatusDot?: boolean;
  highlight?: boolean;
  dimensions?: string[];
  onClick?: () => void;
  onClickPath?: string;
}

export function MetricCard({
  icon: Icon,
  value,
  title,
  description,
  subtitle,
  color = DEFAULT_COLORS.SUCCESS,
  backgroundColor,
  showStatusDot = false,
  highlight = false,
  dimensions,
  onClick,
  onClickPath,
}: MetricCardProps) {
  const navigate = useNavigate();
  const cardColor = highlight ? BRAND_COLORS.PRIMARY : color;

  const handleClick = () => {
    if (onClickPath) {
      navigate(onClickPath);
    } else if (onClick) {
      onClick();
    }
  };

  const hasClick = highlight || onClick || onClickPath;

  return (
    <div
      onClick={hasClick ? handleClick : undefined}
      className={`group relative overflow-hidden ${
        CARD_STYLES.BORDER_RADIUS
      } border border-border/50 bg-card ${CARD_STYLES.SHADOW} hover:${
        CARD_STYLES.HOVER_SHADOW
      } ${CARD_STYLES.TRANSITION} ${
        highlight
          ? "ring-2 ring-blue-500/30 border-blue-500/60 cursor-pointer"
          : hasClick
          ? "cursor-pointer"
          : ""
      }`}
      role={hasClick ? "button" : undefined}
      tabIndex={hasClick ? 0 : undefined}
      onKeyDown={
        hasClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
    >
      <div className="p-3">
        <div
          className="rounded-lg p-3.5 shadow-sm border relative overflow-hidden"
          style={{
            backgroundColor:
              backgroundColor || hexToRgba(cardColor, highlight ? 0.12 : 0.1),
            borderColor: hexToRgba(cardColor, 0.3),
          }}
        >
          {showStatusDot && (
            <div className="absolute top-3 right-3 w-2 h-2 bg-green-500 rounded-full z-10" />
          )}

          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at top right, ${hexToRgba(
                cardColor,
                0.2
              )}, transparent 70%)`,
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 group-hover:scale-105 shrink-0 shadow-sm"
                style={{
                  background: cardColor,
                }}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>

              <p
                className="text-2xl font-bold leading-none"
                style={{ color: cardColor }}
              >
                {value}
              </p>
            </div>

            <p className="text-sm font-semibold text-foreground leading-tight mb-1">
              {title}
            </p>

            {subtitle && (
              <p className="text-xs text-muted-foreground leading-tight">
                {subtitle}
              </p>
            )}

            {description && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        {dimensions && dimensions.length > 0 && (
          <div className="px-1">
            <div className="flex flex-wrap gap-1.5">
              {dimensions.map((dim, index) => (
                <span
                  key={index}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground font-medium border border-border/50"
                >
                  {dim}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
