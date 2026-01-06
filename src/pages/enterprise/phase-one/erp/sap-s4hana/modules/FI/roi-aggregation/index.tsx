import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Heading from "./Heading";
import OverviewTab from "./components/OverviewTab";
import SubProcessTab from "./components/SubProcessTab";
import FeedbackLoopTab from "./components/FeedbackLoopTab";
import { BarChart3, Target, Activity } from "lucide-react";

const RoiAggregation = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <Heading />
                    
                    <div className="p-6">
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
                </div>
            </div>
        </div>
    )
}

export default RoiAggregation