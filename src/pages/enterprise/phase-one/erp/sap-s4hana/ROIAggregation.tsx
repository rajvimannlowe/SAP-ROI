import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import OverviewTab from "./components/OverviewTab";
import SubProcessTab from "./components/SubProcessTab";
import FeedbackLoopTab from "./components/FeedbackLoopTab";
import { BarChart3, Target, Activity } from "lucide-react";

type TabType = "overview" | "subprocess" | "feedback";

const tabs = [
  { id: "overview" as TabType, label: "Overview", icon: BarChart3 },
  { id: "subprocess" as TabType, label: "Sub-Process ROI", icon: Target },
  { id: "feedback" as TabType, label: "Feedback Loop", icon: Activity },
];

export function ROIAggregation() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Financial Controls ROI Synthesis"
        subtitle="SAP FI – ROI Aggregation & Feedback Loop"
        backTo="/phase-i/catalog/sap-s4hana/blueprint/fi/cockpit"
        backLabel="Back to FI ROI Cockpit"
      />

      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm -mx-6 lg:-mx-8 px-6 lg:px-8 py-2.5 border-b border-border/50">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-gradient-to-r from-[#4160F0] to-[#FF6700] text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : ""}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "subprocess" && <SubProcessTab />}
        {activeTab === "feedback" && <FeedbackLoopTab />}
      </div>
    </div>
  );
}
