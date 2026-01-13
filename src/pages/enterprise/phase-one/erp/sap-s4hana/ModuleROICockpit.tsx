import { useState, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Info, TrendingUp, Filter } from "lucide-react";
import { PageHeader } from "../../../../../components/layout/PageHeader";
import { MODULE_COCKPIT_DATA } from "../../../../../data/moduleCockpitData";
import { MetricCard } from "../../../../../components/roi/cards/MetricCard";
import { InfoCard } from "../../../../../components/roi/cards/InfoCard";
import { StatusBadge } from "../../../../../components/roi/StatusBadge";
import { DrilldownTable } from "../../../../../components/roi/DrilldownTable";
import { getKPITableColumns } from "../../../../../data/moduleCockpitTableConfig";
import {
  getMetricCards,
  getSubModuleCardConfig,
} from "../../../../../data/moduleCockpitConfig";
import { gradientStyles } from "./components/constants";
import { Button } from "../../../../../components/ui/button";

// Mapping blueprint ID to catalog ID
const blueprintToCatalogMap: Record<string, string> = {
  "sap-s4hana": "1",
  // Add more mappings as needed
};

const getCatalogId = (blueprintId: string): string => {
  return blueprintToCatalogMap[blueprintId] || blueprintId;
};

export function ModuleROICockpit() {
  const { moduleId, id: blueprintId } = useParams<{
    moduleId: string;
    id: string;
  }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get catalogId from location state or calculate from blueprintId
  const stateCatalogId = (location.state as { catalogId?: string })?.catalogId;
  const catalogId = stateCatalogId || (blueprintId ? getCatalogId(blueprintId) : "1");
  
  // Determine back navigation path
  const getBackPath = () => {
    // Always go back to flow selection if we have moduleId
    if (moduleId) {
      return `/phase-i/catalog/${catalogId}/modules/${moduleId}/flow`;
    }
    // Fallback to blueprint if no moduleId
    return `/phase-i/catalog/${blueprintId || "sap-s4hana"}/blueprint`;
  };
  const [selectedSubModuleIds, setSelectedSubModuleIds] = useState<string[]>(
    []
  );

  const cockpitData = moduleId ? MODULE_COCKPIT_DATA[moduleId] : null;

  // Get unique sub-modules (ensure no duplicates)
  const uniqueSubModules = useMemo(() => {
    if (!cockpitData) return [];
    const seen = new Set<string>();
    return cockpitData.subModules.filter((subModule) => {
      if (seen.has(subModule.id)) {
        return false;
      }
      seen.add(subModule.id);
      return true;
    });
  }, [cockpitData]);

  // Get KPI table columns from data config with navigation
  const kpiColumns = useMemo(
    () =>
      getKPITableColumns(
        cockpitData,
        (kpi) => {
          navigate(
            `/phase-i/catalog/${
              blueprintId || "sap-s4hana"
            }/blueprint/${moduleId}/cockpit/${kpi.id}`
          );
        }
      ),
    [navigate, blueprintId, moduleId, cockpitData]
  );

  // Filter KPIs based on selected sub-modules
  const filteredKPIs = useMemo(() => {
    if (!cockpitData) return [];
    return selectedSubModuleIds.length === 0
      ? cockpitData.kpiDetails
      : cockpitData.kpiDetails.filter((kpi) =>
          selectedSubModuleIds.includes(kpi.subModuleId)
        );
  }, [cockpitData, selectedSubModuleIds]);

  // Calculate metrics based on filtered KPIs
  const calculateFilteredMetrics = useMemo(() => {
    if (!cockpitData) return null;

    const kpisToUse = selectedSubModuleIds.length === 0 
      ? cockpitData.kpiDetails 
      : filteredKPIs;
    const totalKPIs = kpisToUse.length;
    
    // Calculate KPI status counts based on StatusType
    const greenCount = kpisToUse.filter((kpi) => {
      return kpi.status === "Optimal" || kpi.status === "Active";
    }).length;
    const amberCount = kpisToUse.filter((kpi) => {
      return kpi.status === "Monitor" || kpi.status === "Warning" || kpi.status === "Planned";
    }).length;
    const redCount = kpisToUse.filter((kpi) => {
      return kpi.status === "Error" || kpi.status === "Action";
    }).length;
    
    // Calculate overall ROI health (percentage of green KPIs)
    const overallHealth = totalKPIs > 0 ? Math.round((greenCount / totalKPIs) * 100) : 0;
    const healthStatus = overallHealth >= 80 ? "Optimal" : overallHealth >= 60 ? "Monitor" : "Critical";
    
    // Calculate control coverage (active controls / total)
    const activeControls = kpisToUse.filter((kpi) => {
      return kpi.status !== "Planned" && kpi.status !== "Action";
    }).length;
    const controlCoverage = totalKPIs > 0 ? Math.round((activeControls / totalKPIs) * 100) : 0;
    
    // Estimate financial value at risk (proportional to selected KPIs)
    const baseValue = parseFloat(cockpitData.summaryMetrics.financialValueAtRisk.value.replace(/[^0-9.]/g, "")) || 0;
    const valueAtRisk = selectedSubModuleIds.length === 0 
      ? baseValue 
      : Math.round((baseValue * totalKPIs) / cockpitData.kpiDetails.length * 100) / 100;

    return {
      overallROIHealth: {
        value: `${overallHealth}%`,
        status: healthStatus,
        description: selectedSubModuleIds.length === 0 
          ? cockpitData.summaryMetrics.overallROIHealth.description
          : `Based on ${totalKPIs} KPIs from selected sub-modules`,
      },
      financialValueAtRisk: {
        value: `$${valueAtRisk}M`,
        description: selectedSubModuleIds.length === 0
          ? cockpitData.summaryMetrics.financialValueAtRisk.description
          : `Estimated value protected for selected sub-modules`,
      },
      controlCoverage: {
        value: `${controlCoverage}%`,
        total: totalKPIs,
        active: activeControls,
        description: selectedSubModuleIds.length === 0
          ? cockpitData.summaryMetrics.controlCoverage.description
          : `${activeControls} of ${totalKPIs} controls active in selected sub-modules`,
      },
      kpiStatus: {
        green: greenCount,
        amber: amberCount,
        red: redCount,
        total: totalKPIs,
        description: selectedSubModuleIds.length === 0
          ? cockpitData.summaryMetrics.kpiStatus.description
          : `${totalKPIs} KPIs in selected sub-modules`,
      },
    };
  }, [cockpitData, filteredKPIs, selectedSubModuleIds]);

  // Get metric cards based on filtered data
  const metricCards = useMemo(() => {
    if (!cockpitData || !calculateFilteredMetrics) return [];
    
    // Create a temporary cockpit data object with filtered metrics
    const filteredCockpitData = {
      ...cockpitData,
      summaryMetrics: {
        overallROIHealth: calculateFilteredMetrics.overallROIHealth,
        financialValueAtRisk: calculateFilteredMetrics.financialValueAtRisk,
        controlCoverage: calculateFilteredMetrics.controlCoverage,
        kpiStatus: calculateFilteredMetrics.kpiStatus,
      },
    };
    
    return getMetricCards(filteredCockpitData);
  }, [cockpitData, calculateFilteredMetrics]);

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
    if (!cockpitData) return;
    const allSelected =
      selectedSubModuleIds.length === 0 ||
      selectedSubModuleIds.length === uniqueSubModules.length;
    setSelectedSubModuleIds(
      allSelected ? [] : uniqueSubModules.map((sm) => sm.id)
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`SAP ${cockpitData.moduleName} - ROI Cockpit`}
        subtitle={`SAP S/4HANA ${cockpitData.moduleLabel}`}
        backTo={getBackPath()}
        backLabel="Back to Flow Selection"
        rightContent={
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <Button
                className="gap-2"
                style={{ backgroundColor: "#4160F0" }}
                onClick={() => {
                  navigate("/roi-aggregation");
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
            selectedSubModuleIds.length === uniqueSubModules.length
              ? "Deselect All"
              : "Select All"}
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {uniqueSubModules.map((subModule) => {
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
        onRowClick={(kpi) => {
          navigate(
            `/phase-i/catalog/${
              blueprintId || "sap-s4hana"
            }/blueprint/${moduleId}/cockpit/${kpi.id}`
          );
        }}
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
