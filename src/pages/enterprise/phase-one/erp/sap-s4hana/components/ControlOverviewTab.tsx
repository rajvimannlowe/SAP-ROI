import { FileText } from "lucide-react";
import { InfoCard } from "../../../../../../components/roi/cards/InfoCard";
import { SectionHeader } from "./SectionHeader";
import {
  ControlEvidenceData,
  getControlOverviewIcon,
} from "../../../../../../data/controlEvidenceData";

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getGradient = (color: string) =>
  `linear-gradient(135deg, ${color} 0%, ${hexToRgba(color, 0.8)} 100%)`;

interface ControlOverviewTabProps {
  evidenceData: ControlEvidenceData;
}

export default function ControlOverviewTab({
  evidenceData,
}: ControlOverviewTabProps) {
  const kpiIcon = getControlOverviewIcon("kpi");
  const typeIcon = getControlOverviewIcon("type");
  const frequencyIcon = getControlOverviewIcon("frequency");
  const riskIcon = getControlOverviewIcon("risk");
  const ownerIcon = getControlOverviewIcon("owner");
  const reviewIcon = getControlOverviewIcon("review");

  return (
    <div className="space-y-3">
      {/* Section Header */}
      <SectionHeader
        title="Control Overview"
        subtitle="Control identification and configuration details"
      />

      {/* Control Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Associated KPI */}
        <InfoCard
          icon={kpiIcon.icon}
          iconGradient={getGradient(kpiIcon.color)}
          title="Associated KPI"
          value={evidenceData.associatedKPI}
          borderColor={hexToRgba(kpiIcon.color, 0.3)}
          bgColor={hexToRgba(kpiIcon.color, 0.05)}
        />

        {/* Control Type */}
        <InfoCard
          icon={typeIcon.icon}
          iconGradient={getGradient(typeIcon.color)}
          title="Control Type"
          description={
            <div className="mt-1">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                {evidenceData.controlType}
              </span>
            </div>
          }
          borderColor={hexToRgba(typeIcon.color, 0.3)}
          bgColor={hexToRgba(typeIcon.color, 0.05)}
        />

        {/* Frequency of Execution */}
        <InfoCard
          icon={frequencyIcon.icon}
          iconGradient={getGradient(frequencyIcon.color)}
          title="Frequency of Execution"
          value={evidenceData.frequency}
          borderColor={hexToRgba(frequencyIcon.color, 0.3)}
          bgColor={hexToRgba(frequencyIcon.color, 0.05)}
        />

        {/* Risk Rating */}
        <InfoCard
          icon={riskIcon.icon}
          iconGradient={getGradient(riskIcon.color)}
          title="Risk Rating"
          description={
            <div className="mt-1">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                {evidenceData.riskRating}
              </span>
            </div>
          }
          borderColor={hexToRgba(riskIcon.color, 0.3)}
          bgColor={hexToRgba(riskIcon.color, 0.05)}
        />
      </div>

      {/* Control Objective - Full Width */}
      <InfoCard
        icon={FileText}
        iconGradient={getGradient("#2563eb")}
        title="Control Objective"
        description={
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            {evidenceData.controlObjective}
          </p>
        }
        borderColor={hexToRgba("#2563eb", 0.3)}
        bgColor={hexToRgba("#2563eb", 0.05)}
      />

      {/* Control Owner & Last Review - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Control Owner */}
        <InfoCard
          icon={ownerIcon.icon}
          iconGradient={getGradient(ownerIcon.color)}
          title="Control Owner"
          value={evidenceData.controlOwner}
          borderColor={hexToRgba(ownerIcon.color, 0.3)}
          bgColor={hexToRgba(ownerIcon.color, 0.05)}
        />

        {/* Last Review Date */}
        <InfoCard
          icon={reviewIcon.icon}
          iconGradient={getGradient(reviewIcon.color)}
          title="Last Review Date"
          value={evidenceData.lastReviewDate}
          borderColor={hexToRgba(reviewIcon.color, 0.3)}
          bgColor={hexToRgba(reviewIcon.color, 0.05)}
        />
      </div>
    </div>
  );
}
