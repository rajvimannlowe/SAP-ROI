import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
  rightContent?: ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  backTo,
  backLabel = "Back",
  rightContent,
}: PageHeaderProps) {
  return (
    <div className="pb-4 border-b border-border/50">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          {backTo && (
            <>
              <Link
                to={backTo}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>{backLabel}</span>
              </Link>
              <div className="h-4 w-px bg-border" />
            </>
          )}
          <div className="flex items-center gap-3">
            <div
              className="w-1 h-10 rounded-full"
              style={{
                background: "linear-gradient(to bottom, #4160F0, #FF6700)",
              }}
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-muted-foreground text-sm mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
        {rightContent && <div className="flex items-center gap-3">{rightContent}</div>}
      </div>
    </div>
  );
}


