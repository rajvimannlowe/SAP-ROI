import { ROIIntentCard } from "../../../../../../components/roi/cards/ROIIntentCard";
import { ROI_INTENT_COUNTS } from "../../../../../../data/roiIntentCountsData";
import { SectionHeader } from "./SectionHeader";

export function IntentSection() {
  // Use the intent counts data instead of the blueprint intents
  return (
    <div className="space-y-5 animate-in fade-in-50 duration-300">
      <SectionHeader
        title="ROI Dimensions & Intent"
        subtitle="Strategic ROI dimensions and their value realization intents"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {ROI_INTENT_COUNTS.map((intent) => (
          <ROIIntentCard
            key={intent.id}
            id={intent.id}
            icon={intent.icon}
            label={intent.label}
            description={intent.description}
            value={intent.count.toString()}
            color={intent.color}
          />
        ))}
      </div>
    </div>
  );
}


