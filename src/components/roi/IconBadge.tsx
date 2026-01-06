import { LucideIcon } from "lucide-react";

interface IconBadgeProps {
  gradient: string;
  icon: LucideIcon;
}

export function IconBadge({ gradient, icon: Icon }: IconBadgeProps) {
  return (
    <div className="p-1.5 rounded-lg" style={{ background: gradient }}>
      <Icon className="h-4 w-4 text-white" />
    </div>
  );
}


