import { STATUS_MAPPING, StatusType } from "../../data/statusMapping";

export type { StatusType };

export interface StatusBadgeProps {
  status: StatusType;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: {
    icon: "h-3 w-3",
    text: "text-[9px]",
    padding: "px-1.5 py-0.5",
    gap: "gap-1",
  },
  md: {
    icon: "h-4 w-4",
    text: "text-[10px]",
    padding: "px-2.5 py-1",
    gap: "gap-2",
  },
  lg: {
    icon: "h-5 w-5",
    text: "text-xs",
    padding: "px-3 py-1.5",
    gap: "gap-2.5",
  },
};

export function StatusBadge({
  status,
  showIcon = true,
  size = "md",
  className = "",
}: StatusBadgeProps) {
  const config = STATUS_MAPPING[status];
  const sizes = sizeClasses[size];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center ${sizes.gap} ${sizes.padding} rounded-md border font-semibold ${config.bgColor} ${config.textColor} ${config.borderColor} ${className}`}
    >
      {showIcon && (
        <Icon
          className={`${sizes.icon} ${config.iconColor} drop-shadow-sm shrink-0`}
        />
      )}
      <span className={sizes.text}>{status}</span>
    </div>
  );
}
