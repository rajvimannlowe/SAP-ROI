import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { EnhancedCard } from "../../components/ui/enhanced-card";
import { Button } from "../../components/ui/button";
import { BackButton } from "../../components/ui/BackButton";
import { SAP_MODULES, MOCK_DD_ITEMS } from "../../data/mockData";
import {
  ArrowRight,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUp,
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subModuleStats.map((subModule) => (
            <EnhancedCard
              key={subModule.id}
              icon={FileText}
              iconColor="white"
              title={subModule.code}
              subtitle={subModule.name}
              accentColor="#4160F0"
              badge={
                subModule.itemCount > 0
                  ? {
                      label: `${subModule.itemCount} items`,
                      color: "#4160F0",
                      icon: ArrowUp,
                    }
                  : undefined
              }
              className="hover:shadow-xl"
            >
              <div className="space-y-4">
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
              </div>
            </EnhancedCard>
          ))}
        </div>
      </div>
    </div>
  );
}
