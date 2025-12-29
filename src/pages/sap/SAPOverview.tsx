import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { BackButton } from "../../components/ui/BackButton";
import {
  ArrowRight,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  SAP_MODULES,
  MOCK_DD_ITEMS,
  getModuleBySubModule,
} from "../../data/mockData";
import { SAPSummaryCards } from "../../components/dashboard/SAPSummaryCards";
import { ModuleBarChart } from "../../components/dashboard/ModuleBarChart";
import { SubModuleBarChart } from "../../components/dashboard/SubModuleBarChart";
import { ModuleStatusChart } from "../../components/dashboard/ModuleStatusChart";

export function SAPOverview() {
  // Calculate summary statistics
  const summary = useMemo(() => {
    const totalItems = MOCK_DD_ITEMS.length;
    const totalModules = SAP_MODULES.length;
    const totalSubModules = SAP_MODULES.reduce(
      (sum, module) => sum + module.subModules.length,
      0
    );
    const highRisk = MOCK_DD_ITEMS.filter(
      (item) => item.status === "High Risk"
    ).length;
    const needsReview = MOCK_DD_ITEMS.filter(
      (item) => item.status === "Needs Review"
    ).length;
    const comfortable = MOCK_DD_ITEMS.filter(
      (item) => item.status === "Comfortable"
    ).length;

    return {
      totalItems,
      totalModules,
      totalSubModules,
      highRisk,
      needsReview,
      comfortable,
    };
  }, []);

  // Prepare module data with item counts
  const moduleData = useMemo(() => {
    const moduleCounts = MOCK_DD_ITEMS.reduce((acc, item) => {
      const module = getModuleBySubModule(item.subModuleId);
      if (module) acc[module.code] = (acc[module.code] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(moduleCounts).map(([module, value]) => ({
      module,
      value,
    }));
  }, []);

  // Prepare sub-module data
  const subModuleData = useMemo(() => {
    const subModuleCounts = MOCK_DD_ITEMS.reduce((acc, item) => {
      acc[item.subModuleName] = (acc[item.subModuleName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(subModuleCounts)
      .map(([subModule, value]) => ({ subModule, value }))
      .sort((a, b) => b.value - a.value);
  }, []);

  // Prepare module status data (stacked bar chart)
  const moduleStatusData = useMemo(() => {
    return SAP_MODULES.map((module) => {
      const moduleItems = MOCK_DD_ITEMS.filter((item) => {
        const itemModule = getModuleBySubModule(item.subModuleId);
        return itemModule?.id === module.id;
      });

      return {
        module: module.code,
        "High Risk": moduleItems.filter((item) => item.status === "High Risk")
          .length,
        "Needs Review": moduleItems.filter(
          (item) => item.status === "Needs Review"
        ).length,
        Comfortable: moduleItems.filter((item) => item.status === "Comfortable")
          .length,
      };
    });
  }, []);

  // Enhanced module cards with statistics and sub-module breakdowns
  const moduleCards = useMemo(() => {
    return SAP_MODULES.map((module) => {
      const moduleItems = MOCK_DD_ITEMS.filter((item) => {
        const itemModule = getModuleBySubModule(item.subModuleId);
        return itemModule?.id === module.id;
      });

      // Get sub-module statistics
      const subModuleStats = module.subModules.map((subModule) => {
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

      return {
        ...module,
        itemCount: moduleItems.length,
        highRiskCount: moduleItems.filter((item) => item.status === "High Risk")
          .length,
        needsReviewCount: moduleItems.filter(
          (item) => item.status === "Needs Review"
        ).length,
        comfortableCount: moduleItems.filter(
          (item) => item.status === "Comfortable"
        ).length,
        subModuleStats,
      };
    });
  }, []);

  return (
    <div className="space-y-6">
      <BackButton to="/enterprise" />
      <div>
        <h1 className="text-3xl font-bold">SAP ROI Overview</h1>
        <p className="text-muted-foreground mt-2">
          Manage Due Diligence across SAP modules and sub-modules
        </p>
      </div>

      {/* Summary Cards */}
      <SAPSummaryCards
        totalItems={summary.totalItems}
        totalModules={summary.totalModules}
        totalSubModules={summary.totalSubModules}
        highRisk={summary.highRisk}
        needsReview={summary.needsReview}
        comfortable={summary.comfortable}
      />

      {/* SAP Modules Grid */}
      <div>
        <div className="mb-5">
          <h2 className="text-2xl font-bold">SAP Modules</h2>
          <p className="text-muted-foreground text-sm mt-1">
            View and manage Due Diligence by module
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {moduleCards.map((module) => (
            <Card
              key={module.id}
              className="group hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-[#4160F0]/40 overflow-hidden bg-gradient-to-br from-card to-card/50"
            >
              <div className="h-1.5 bg-gradient-to-r from-[#4160F0] to-[#FF6700]"></div>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#4160F0]/10 to-[#FF6700]/10 group-hover:from-[#4160F0]/20 group-hover:to-[#FF6700]/20 transition-all">
                      <FileText className="h-5 w-5 text-[#4160F0]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-bold mb-0.5">
                        {module.code}
                      </CardTitle>
                      <CardDescription className="text-xs font-medium truncate">
                        {module.name}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#4160F0]/10 to-[#FF6700]/10 group-hover:from-[#4160F0]/20 group-hover:to-[#FF6700]/20 transition-all">
                    <span className="text-base font-bold text-[#4160F0]">
                      {module.itemCount}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {/* Sub-Modules List with Status Breakdown */}
                {module.subModuleStats && module.subModuleStats.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-border/60">
                      <h3 className="text-xs font-semibold text-foreground">
                        Sub-Modules
                      </h3>
                      <span className="text-[10px] text-muted-foreground font-medium">
                        {module.subModuleStats.length} total
                      </span>
                    </div>
                    <div className="space-y-1.5 max-h-72 overflow-y-auto custom-scrollbar pr-1.5">
                      {module.subModuleStats.map((subModule) => (
                        <div
                          key={subModule.id}
                          className="p-2 rounded-md border border-border/50 bg-card hover:border-[#4160F0]/40 hover:bg-accent/30 transition-all"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-foreground">
                                  {subModule.code}
                                </span>
                                <span className="text-[10px] text-muted-foreground truncate">
                                  {subModule.name}
                                </span>
                              </div>
                            </div>
                            <span
                              className="text-[10px] font-semibold text-[#4160F0] bg-blue-50 dark:bg-blue-950/20 px-1.5 py-0.5 rounded shrink-0"
                              title="Total Due Diligence Items"
                            >
                              {subModule.itemCount} DD{" "}
                              {subModule.itemCount === 1 ? "item" : "items"}
                            </span>
                          </div>
                          {subModule.itemCount > 0 ? (
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {subModule.highRiskCount > 0 && (
                                <span
                                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-50 dark:bg-red-950/30 text-red-600 border border-red-200 dark:border-red-900/30"
                                  title="High Risk Items"
                                >
                                  <AlertTriangle className="h-2.5 w-2.5" />
                                  <span>High Risk:</span>
                                  {subModule.highRiskCount}
                                </span>
                              )}
                              {subModule.needsReviewCount > 0 && (
                                <span
                                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-orange-50 dark:bg-orange-950/30 text-orange-600 border border-orange-200 dark:border-orange-900/30"
                                  title="Items Needing Review"
                                >
                                  <Clock className="h-2.5 w-2.5" />
                                  <span>Review:</span>
                                  {subModule.needsReviewCount}
                                </span>
                              )}
                              {subModule.comfortableCount > 0 && (
                                <span
                                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-green-50 dark:bg-green-950/30 text-green-600 border border-green-200 dark:border-green-900/30"
                                  title="Comfortable Items"
                                >
                                  <CheckCircle className="h-2.5 w-2.5" />
                                  <span>Comfortable:</span>
                                  {subModule.comfortableCount}
                                </span>
                              )}
                            </div>
                          ) : (
                            <p className="text-[10px] text-muted-foreground italic">
                              No items
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Link to={`/sap/${module.id}`} className="block">
                  <Button
                    className="w-full bg-gradient-to-r from-[#4160F0] to-[#FF6700] hover:from-[#3a55d8] hover:to-[#e65c00] text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
                    size="sm"
                  >
                    View Module <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="space-y-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Analytics & Insights</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Visual representation of Due Diligence metrics
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <ModuleBarChart data={moduleData} />
          <ModuleStatusChart data={moduleStatusData} />
        </div>
        <SubModuleBarChart data={subModuleData} />
      </div>
    </div>
  );
}
