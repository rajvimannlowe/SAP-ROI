import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/layout/PageHeader";
import OverviewTab from "./components/OverviewTab";
import SubProcessTab from "./components/SubProcessTab";
import FeedbackLoopTab from "./components/FeedbackLoopTab";
import { BarChart3, Target, Activity } from "lucide-react";

export function ROIAggregation() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Financial Controls ROI Synthesis"
        subtitle="SAP FI – ROI Aggregation & Feedback Loop"
        backTo="/phase-i/catalog/sap-s4hana/blueprint/fi/cockpit"
        backLabel="Back to FI ROI Cockpit"
      />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="subprocess" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Sub-Process ROI
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Feedback Loop
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="subprocess" className="space-y-6">
          <SubProcessTab />
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <FeedbackLoopTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

