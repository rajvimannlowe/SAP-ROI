import { LucideIcon } from "lucide-react";
import { IconBadge } from "./IconBadge";

interface InfoCardProps {
  icon: LucideIcon;
  iconGradient: string;
  title: string;
  value?: string;
  description?: string;
  borderColor?: string;
  bgColor?: string;
}

export function InfoCard({
  icon: Icon,
  iconGradient,
  title,
  value,
  description,
  borderColor = "rgba(65, 96, 240, 0.2)",
  bgColor = "rgba(65, 96, 240, 0.05)",
}: InfoCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-md hover:shadow-xl hover:border-border/70 transition-all duration-300">
      <div className="p-3">
        {/* Inner Card with Solid Color Background - Consistent with other cards */}
        <div
          className="rounded-lg p-3.5 shadow-sm border relative overflow-hidden"
          style={{
            backgroundColor: bgColor,
            borderColor: borderColor,
          }}
        >
          {/* Subtle hover effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at top right, ${bgColor.replace('0.05', '0.15')}, transparent 70%)`,
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-3">
              <IconBadge gradient={iconGradient} icon={Icon} />
              <h3 className="text-sm font-bold text-foreground">{title}</h3>
            </div>
            {value && (
              <p className="text-sm font-bold text-foreground mb-1.5">{value}</p>
            )}
            {description && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

