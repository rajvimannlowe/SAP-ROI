import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { BackButton } from "../../components/ui/BackButton";
import { SAP_MODULES, MOCK_DD_ITEMS } from "../../data/mockData";
import {
  ArrowRight,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  SummaryCards,
  SummaryCard,
} from "../../components/dashboard/SummaryCards";

export function ModuleView() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const module = SAP_MODULES.find((m) => m.id === moduleId);

  // Calculate module-level statistics
  const moduleStats = useMemo(() => {
    if (!module)
      return { totalItems: 0, highRisk: 0, needsReview: 0, comfortable: 0 };

    const moduleItems = MOCK_DD_ITEMS.filter((item) => {
      const itemModule = module.subModules.some(
        (sm) => sm.id === item.subModuleId
      );
      return itemModule;
    });

    return {
      totalItems: moduleItems.length,
      highRisk: moduleItems.filter((item) => item.status === "High Risk")
        .length,
      needsReview: moduleItems.filter((item) => item.status === "Needs Review")
        .length,
      comfortable: moduleItems.filter((item) => item.status === "Comfortable")
        .length,
    };
  }, [module]);

  // Count DD items and status breakdown per sub-module
  const subModuleStats = useMemo(() => {
    if (!module) return [];

    return module.subModules.map((subModule) => {
      const subModuleItems = MOCK_DD_ITEMS.filter(
        (item) => item.subModuleId === subModule.id
      );

      return {
        ...subModule,
        itemCount: subModuleItems.length,
        highRiskCount: subModuleItems.filter(
          (item) => item.status === "High Risk"
        ).length,
        needsReviewCount: subModuleItems.filter(
          (item) => item.status === "Needs Review"
        ).length,
        comfortableCount: subModuleItems.filter(
          (item) => item.status === "Comfortable"
        ).length,
      };
    });
  }, [module]);

  if (!module) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Module not found</p>
      </div>
    );
  }

  // Prepare summary cards data
  const summaryCards: SummaryCard[] = [
    {
      title: "Total DD Items",
      value: moduleStats.totalItems,
      icon: FileText,
      color: "#4160F0",
    },
    {
      title: "High Risk",
      value: moduleStats.highRisk,
      icon: AlertTriangle,
      color: "#DC2626",
    },
    {
      title: "Needs Review",
      value: moduleStats.needsReview,
      icon: Clock,
      color: "#FF6700",
    },
    {
      title: "Comfortable",
      value: moduleStats.comfortable,
      icon: CheckCircle,
      color: "#16A34A",
    },
  ];

  return (
    <div className="space-y-6">
      <BackButton to="/sap" />

      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold">
          {module.code} - {module.name}
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage Due Diligence items across {module.name} sub-modules
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCards cards={summaryCards} columns={4} />

      {/* Sub-Modules Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Sub-Modules</h2>
          <p className="text-muted-foreground text-sm mt-1">
            {subModuleStats.length} sub-modules available for Due Diligence
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {subModuleStats.map((subModule) => (
            <Card
              key={subModule.id}
              className="group hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-[#4160F0]/40 overflow-hidden bg-gradient-to-br from-card to-card/50"
            >
              {/* Gradient top border */}
              <div className="h-1.5 bg-gradient-to-r from-[#4160F0] to-[#FF6700]"></div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#4160F0]/10 to-[#FF6700]/10 group-hover:from-[#4160F0]/20 group-hover:to-[#FF6700]/20 transition-all">
                      <FileText className="h-5 w-5 text-[#4160F0]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-bold mb-0.5">
                        {subModule.code}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground truncate">
                        {subModule.name}
                      </p>
                    </div>
                  </div>
                  {subModule.itemCount > 0 && (
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#4160F0]/10 to-[#FF6700]/10 group-hover:from-[#4160F0]/20 group-hover:to-[#FF6700]/20 transition-all shrink-0">
                      <span className="text-base font-bold text-[#4160F0]">
                        {subModule.itemCount}
                      </span>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Status Breakdown */}
                {subModule.itemCount > 0 ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-px flex-1 bg-border"></div>
                      <span className="text-xs font-semibold text-muted-foreground px-2">
                        Status Breakdown
                      </span>
                      <div className="h-px flex-1 bg-border"></div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {subModule.highRiskCount > 0 && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/30">
                          <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
                          <span className="text-xs font-semibold text-red-600">
                            High Risk: {subModule.highRiskCount}
                          </span>
                        </div>
                      )}
                      {subModule.needsReviewCount > 0 && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/30">
                          <Clock className="h-3.5 w-3.5 text-orange-600" />
                          <span className="text-xs font-semibold text-orange-600">
                            Review: {subModule.needsReviewCount}
                          </span>
                        </div>
                      )}
                      {subModule.comfortableCount > 0 && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/30">
                          <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                          <span className="text-xs font-semibold text-green-600">
                            Comfortable: {subModule.comfortableCount}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-3">
                    <p className="text-xs text-muted-foreground italic">
                      No DD items in this sub-module
                    </p>
                  </div>
                )}

                {/* Action Button */}
                <Link to={`/sap/${moduleId}/${subModule.id}`} className="block">
                  <Button
                    className="w-full bg-gradient-to-r from-[#4160F0] to-[#FF6700] hover:from-[#3a55d8] hover:to-[#e65c00] text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
                    size="sm"
                  >
                    View Due Diligence
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
