import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Info, TrendingUp, Filter } from "lucide-react";
import { PageHeader } from "../../../../../components/layout/PageHeader";
import { MODULE_COCKPIT_DATA } from "../../../../../data/moduleCockpitData";
import { MetricCard } from "../../../../../components/dashboard/MetricCard";
import { InfoCard } from "../../../../../components/roi/InfoCard";
import { StatusBadge } from "../../../../../components/roi/StatusBadge";
import { DrilldownTable } from "../../../../../components/roi/DrilldownTable";
import { getKPITableColumns } from "../../../../../data/moduleCockpitTableConfig";
import {
  getMetricCards,
  getSubModuleCardConfig,
} from "../../../../../data/moduleCockpitConfig";
import { gradientStyles } from "./components/constants";
import { Button } from "../../../../../components/ui/button";

export function ModuleROICockpit() {
  const { moduleId, id: blueprintId } = useParams<{
    moduleId: string;
    id: string;
  }>();
  const navigate = useNavigate();
  const [selectedSubModuleIds, setSelectedSubModuleIds] = useState<string[]>(
    []
  );

  const cockpitData = moduleId ? MODULE_COCKPIT_DATA[moduleId] : null;

  // Get metric cards from data config
  const metricCards = useMemo(() => {
    return cockpitData ? getMetricCards(cockpitData) : [];
  }, [cockpitData]);

  // Get KPI table columns from data config
  const kpiColumns = useMemo(() => getKPITableColumns(), []);

  // Filter KPIs based on selected sub-modules
  const filteredKPIs = useMemo(() => {
    if (!cockpitData) return [];
    return selectedSubModuleIds.length === 0
      ? cockpitData.kpiDetails
      : cockpitData.kpiDetails.filter((kpi) =>
          selectedSubModuleIds.includes(kpi.subModuleId)
        );
  }, [cockpitData, selectedSubModuleIds]);

  if (!cockpitData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Module Not Found
          </h2>
          <p className="text-muted-foreground mb-4">
            The requested module cockpit data is not available.
          </p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const handleSubModuleToggle = (subModuleId: string) => {
    setSelectedSubModuleIds((prev) =>
      prev.includes(subModuleId)
        ? prev.filter((id) => id !== subModuleId)
        : [...prev, subModuleId]
    );
  };

  const handleSelectAll = () => {
    const allSelected =
      selectedSubModuleIds.length === 0 ||
      selectedSubModuleIds.length === cockpitData.subModules.length;
    setSelectedSubModuleIds(
      allSelected ? [] : cockpitData.subModules.map((sm) => sm.id)
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`SAP ${cockpitData.moduleName} - ROI Cockpit`}
        subtitle={`SAP S/4HANA ${cockpitData.moduleLabel}`}
        backTo={`/phase-i/catalog/${blueprintId || "sap-s4hana"}/blueprint`}
        backLabel="Back to Blueprint"
        rightContent={
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <Button
                className="gap-2"
                style={{ backgroundColor: "#4160F0" }}
                onClick={() => {
                  // Navigate to ROI aggregation view if needed
                }}
              >
                <TrendingUp className="h-4 w-4" />
                View ROI Aggregation
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Last Updated: {cockpitData.lastUpdated}
            </p>
          </div>
        }
      />

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {metricCards.map((card, index) => (
          <MetricCard
            key={index}
            icon={card.icon}
            value={card.value}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>

      {/* Sub-Module Health Monitor (as filters) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">
              Sub-Module Health Monitor
            </h3>
            <p className="text-sm text-muted-foreground">
              Click on sub-modules to filter KPI details below
            </p>
          </div>
          <button
            onClick={handleSelectAll}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[#4160F0] bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
          >
            <Filter className="h-3.5 w-3.5" />
            {selectedSubModuleIds.length === 0 ||
            selectedSubModuleIds.length === cockpitData.subModules.length
              ? "Deselect All"
              : "Select All"}
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {cockpitData.subModules.map((subModule) => {
            const isSelected = selectedSubModuleIds.includes(subModule.id);
            const config = getSubModuleCardConfig(
              subModule,
              isSelected,
              handleSubModuleToggle
            );

            return (
              <InfoCard
                key={subModule.id}
                title={config.title}
                value={config.value}
                description={
                  <div className="flex items-center justify-between">
                    <StatusBadge status={subModule.status} size="sm" />
                  </div>
                }
                borderColor={config.borderColor}
                bgColor={config.bgColor}
                onClick={config.onClick}
                isSelected={config.isSelected}
                filterLabel={{
                  active: "Active Filter",
                  inactive: "Click to Filter",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* KPI Drilldown Table */}
      <DrilldownTable
        title="KPI Drilldown - Control & Risk Prevention Detail"
        subtitle={(data) =>
          `${data.length} of ${cockpitData.kpiDetails.length} financial controls`
        }
        columns={kpiColumns}
        data={filteredKPIs}
      />

      {/* Learning Dashboard */}
      <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-md hover:shadow-xl transition-all duration-300">
        <div className="p-4">
          <div
            className="rounded-lg p-4 shadow-sm border relative overflow-hidden"
            style={{
              backgroundColor: "rgba(139, 92, 246, 0.08)",
              borderColor: "rgba(139, 92, 246, 0.3)",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-sm"
                style={{
                  background: gradientStyles.purple,
                  boxShadow: "0 2px 8px rgba(139, 92, 246, 0.4)",
                }}
              >
                <Info className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-foreground mb-1.5">
                  View Repeat Deviations & Learning Dashboard
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Analyze patterns in repeat deviations to identify systemic
                  root causes and drive strategic improvements in automation,
                  tooling, and control design. Persistent deviations include
                  design issues, and execution failures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="pt-5 border-t border-border/50">
        <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-md hover:shadow-lg transition-all duration-300">
          <div className="p-4">
            <div
              className="rounded-lg p-4 shadow-sm border relative overflow-hidden"
              style={{
                borderColor: "rgba(65, 96, 240, 0.2)",
                background: gradientStyles.footerBg,
              }}
            >
              <h3 className="text-sm font-bold text-foreground mb-2.5">
                Executive Summary
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {cockpitData.executiveSummary}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
