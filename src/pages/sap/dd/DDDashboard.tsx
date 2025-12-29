import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { BackButton } from "../../../components/ui/BackButton";
import { DashboardCards } from "../../../components/dd/DashboardCards";
import { DDItemList } from "../../../components/dd/DDItemList";
import {
  MOCK_DD_ITEMS,
  getAllSubModules,
  getModuleBySubModule,
} from "../../../data/mockData";
import { DDDashboardSummary, DDFilters } from "../../../types";
import { useAuth } from "../../../contexts/AuthContext";
import { Plus, Download, FileText, CheckCircle2 } from "lucide-react";

export function DDDashboard() {
  const { moduleId, subModuleId } = useParams<{
    moduleId: string;
    subModuleId: string;
  }>();
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  const [filters, setFilters] = useState<DDFilters>({
    subModuleId: subModuleId || undefined,
  });

  // Filter items
  const filteredItems = useMemo(() => {
    let items = MOCK_DD_ITEMS;

    if (filters.subModuleId) {
      items = items.filter((item) => item.subModuleId === filters.subModuleId);
    }

    if (filters.ddDomain) {
      items = items.filter((item) => item.ddDomain === filters.ddDomain);
    }

    if (filters.severity) {
      items = items.filter((item) => item.severity === filters.severity);
    }

    if (filters.status) {
      items = items.filter((item) => item.status === filters.status);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      items = items.filter(
        (item) =>
          item.itemId.toLowerCase().includes(searchLower) ||
          item.kpiName.toLowerCase().includes(searchLower) ||
          item.controlObjective.toLowerCase().includes(searchLower)
      );
    }

    return items;
  }, [filters]);

  // Calculate summary
  const summary: DDDashboardSummary = useMemo(() => {
    return {
      totalItems: filteredItems.length,
      highRisk: filteredItems.filter((item) => item.status === "High Risk")
        .length,
      needsReview: filteredItems.filter(
        (item) => item.status === "Needs Review"
      ).length,
      comfortable: filteredItems.filter((item) => item.status === "Comfortable")
        .length,
      highSeverity: filteredItems.filter(
        (item) => item.severity === "High" || item.severity === "Critical"
      ).length,
    };
  }, [filteredItems]);

  const subModules = getAllSubModules();
  const module = subModuleId ? getModuleBySubModule(subModuleId) : null;
  const currentSubModule = subModuleId
    ? subModules.find((sm) => sm.id === subModuleId)
    : null;

  const handleExportCSV = () => {
    const headers = [
      "Item ID",
      "Sub-Module",
      "KPI Name",
      "Control Objective",
      "Domain",
      "Severity",
      "Status",
      "Threshold",
      "Current Value",
    ];
    const rows = filteredItems.map((item) => [
      item.itemId,
      item.subModuleName,
      item.kpiName,
      item.controlObjective,
      item.ddDomain,
      item.severity,
      item.status,
      item.thresholdText,
      item.currentValue,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dd-items-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const jsonContent = JSON.stringify(filteredItems, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dd-items-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <BackButton to={`/sap/${moduleId}`} />

      {/* Header Section with Enhanced Design */}
      <div className="relative overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-card via-card to-card/95 p-6 shadow-sm">
        {/* Background gradient accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#4160F0]/5 to-[#FF6700]/5 rounded-full blur-3xl"></div>

        <div className="relative flex items-start justify-between gap-6">
          {/* Left Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4160F0] to-[#FF6700] rounded-xl blur-md opacity-30"></div>
                <div className="relative p-3 rounded-xl bg-gradient-to-br from-[#4160F0]/10 to-[#FF6700]/10 border border-[#4160F0]/20">
                  <FileText className="h-6 w-6 text-[#4160F0]" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                  Due Diligence Dashboard
                </h1>
                {currentSubModule && module && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#4160F0]/10 border border-[#4160F0]/20">
                      <CheckCircle2 className="h-4 w-4 text-[#4160F0]" />
                      <span className="text-sm font-semibold text-foreground">
                        {currentSubModule.code}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {currentSubModule.name}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {module.code} - {module.name}
                    </span>
                  </div>
                )}
                {!currentSubModule && module && (
                  <p className="text-sm font-medium text-muted-foreground">
                    {module.code} - {module.name}
                  </p>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Manage and monitor Due Diligence items, KPIs, and control checks
              to ensure risk management, compliance, and process integrity
              across SAP modules.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {hasPermission("export") && (
              <>
                <Button
                  variant="outline"
                  onClick={handleExportCSV}
                  className="border-2 border-border hover:border-[#4160F0]/50 hover:bg-[#4160F0]/5 transition-all duration-200"
                >
                  <Download className="h-4 w-4 mr-2" />
                  CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={handleExportJSON}
                  className="border-2 border-border hover:border-[#4160F0]/50 hover:bg-[#4160F0]/5 transition-all duration-200"
                >
                  <Download className="h-4 w-4 mr-2" />
                  JSON
                </Button>
              </>
            )}
            {hasPermission("create") && (
              <Button
                onClick={() =>
                  navigate(`/sap/${moduleId}/${subModuleId}/create`)
                }
                className="bg-gradient-to-r from-[#4160F0] to-[#FF6700] hover:from-[#3a55d8] hover:to-[#e65c00] text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create DD Item
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <DashboardCards summary={summary} />

      {/* DD Items List with Filters */}
      <DDItemList
        items={filteredItems}
        onFilterChange={setFilters}
        filters={filters}
        subModules={subModules}
      />
    </div>
  );
}
