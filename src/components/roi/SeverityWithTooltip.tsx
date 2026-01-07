import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { renderCellByType } from "@/data/tableColumnTypes";

interface SeverityWithTooltipProps {
  severity: string;
  colorMap: Record<string, string>;
}

const severityCriteria = {
  High: {
    title: "High Severity",
    criteria: [
      "Control failure detected",
      "Business impact > $100K",
      "Regulatory compliance risk",
      "SLA: 3 business days"
    ]
  },
  Medium: {
    title: "Medium Severity", 
    criteria: [
      "Threshold breach identified",
      "Business impact $25K-$100K",
      "Process inefficiency",
      "SLA: 7 business days"
    ]
  },
  Low: {
    title: "Low Severity",
    criteria: [
      "Minor process deviation",
      "Business impact < $25K", 
      "Documentation gap",
      "SLA: 14 business days"
    ]
  }
};

export const SeverityWithTooltip: React.FC<SeverityWithTooltipProps> = ({ 
  severity, 
  colorMap 
}) => {
  const severityInfo = severityCriteria[severity as keyof typeof severityCriteria];
  
  const badgeElement = renderCellByType(severity, "badge", {
    badgeConfig: {
      colorMap: colorMap,
      defaultColor: "#6366F1",
    },
  });

  if (!severityInfo) {
    return badgeElement;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="cursor-help inline-block">
          {badgeElement}
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <div className="space-y-2">
          <div className="font-semibold text-sm flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: colorMap[severity] }}
            />
            {severityInfo.title}
          </div>
          <ul className="text-xs space-y-1">
            {severityInfo.criteria.map((criterion, index) => (
              <li key={index} className="flex items-start gap-1">
                <span className="text-muted-foreground">•</span>
                <span>{criterion}</span>
              </li>
            ))}
          </ul>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
