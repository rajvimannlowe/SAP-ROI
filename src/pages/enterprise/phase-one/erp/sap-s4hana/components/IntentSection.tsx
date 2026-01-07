import { ROIIntent } from "../../../../../../data/productBlueprintData";
import { ROIIntentCard } from "../../../../../../components/roi/cards/ROIIntentCard";
import { SectionHeader } from "./SectionHeader";

interface IntentSectionProps {
  roiIntents: ROIIntent[];
}

export function IntentSection({ roiIntents }: IntentSectionProps) {
  return (
    <div className="space-y-5 animate-in fade-in-50 duration-300">
      <SectionHeader
        title="ROI Dimensions & Intent"
        subtitle="Strategic ROI dimensions and their value realization intents"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {roiIntents.map((intent) => (
          <ROIIntentCard key={intent.id} {...intent} />
        ))}
      </div>
    </div>
  );
}


