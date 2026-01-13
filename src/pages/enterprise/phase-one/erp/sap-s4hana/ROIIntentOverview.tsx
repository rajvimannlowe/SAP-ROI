import { useState, useMemo } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { SAP_S4HANA_BLUEPRINT } from "@/data/productBlueprintData";
import { ROI_INTENT_COUNTS } from "@/data/roiIntentCountsData";
import { DrilldownTable } from "@/components/roi/DrilldownTable";
import { SearchAndFilters } from "@/components/roi/SearchAndFilters";
import { MetricCard } from "@/components/roi/cards/MetricCard";
import { roiIntentTableConfig } from "@/data/roiIntentTableConfig";
import {
  getROIIntentDataByCategory,
  ROIIntentTableRow,
} from "@/data/roiIntentData";
import { TrendingUp, Shield, CheckCircle, Activity } from "lucide-react";
import { getStatusColor } from "@/data/statusMapping";

const RoiIntentOverview = () => {
  const { intentId } = useParams<{ intentId: string }>();
  const navigate = useNavigate();

  // Search and filter state
  const [searchValue, setSearchValue] = useState("");
  const [selectedSubModule, setSelectedSubModule] = useState("");
  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedImpactLevel, setSelectedImpactLevel] = useState("");

  // Find the intent data - first check ROI_INTENT_COUNTS, then fall back to blueprint
  const intentData = useMemo(() => {
    // First try to find in ROI_INTENT_COUNTS
    const intentWithCount = ROI_INTENT_COUNTS.find(
      (intent) => intent.id === intentId
    );
    if (intentWithCount) {
      return {
        id: intentWithCount.id,
        label: intentWithCount.label,
        description: intentWithCount.description,
        color: intentWithCount.color,
      };
    }
    // Fall back to blueprint intents
    const blueprintIntent = SAP_S4HANA_BLUEPRINT.roiIntents.find(
      (intent) => intent.id === intentId
    );
    return blueprintIntent
      ? {
          id: blueprintIntent.id,
          label: blueprintIntent.label,
          description: blueprintIntent.description,
          color: blueprintIntent.color,
        }
      : null;
  }, [intentId]);

  // Get base table data based on the selected intent category
  const baseTableData = useMemo(() => {
    return intentData ? getROIIntentDataByCategory(intentData.label) : [];
  }, [intentData]);

  // Get unique values for filter options
  const subModuleOptions = useMemo(() => {
    const unique = [...new Set(baseTableData.map((item) => item.subModule))];
    return unique.map((value) => ({ value, label: value }));
  }, [baseTableData]);

  const ownerOptions = useMemo(() => {
    const unique = [
      ...new Set(baseTableData.map((item) => item.ownerResponsibleRole)),
    ];
    return unique.map((value) => ({ value, label: value }));
  }, [baseTableData]);

  const statusOptions = useMemo(() => {
    const unique = [...new Set(baseTableData.map((item) => item.status))];
    return unique.map((value) => ({ value, label: value }));
  }, [baseTableData]);

  const impactLevelOptions = useMemo(() => {
    const unique = [
      ...new Set(baseTableData.map((item) => item.impactCategory)),
    ];
    return unique.map((value) => ({ value, label: value }));
  }, [baseTableData]);

  // Filter and search logic
  const filteredTableData = useMemo(() => {
    return baseTableData.filter((item: ROIIntentTableRow) => {
      // Search filter
      const searchMatch =
        !searchValue ||
        item.kpiId.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.kpiTitle.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.descriptionLogic.toLowerCase().includes(searchValue.toLowerCase());

      // Filter matches
      const subModuleMatch =
        !selectedSubModule || item.subModule === selectedSubModule;
      const ownerMatch =
        !selectedOwner || item.ownerResponsibleRole === selectedOwner;
      const statusMatch = !selectedStatus || item.status === selectedStatus;
      const impactMatch =
        !selectedImpactLevel || item.impactCategory === selectedImpactLevel;

      return (
        searchMatch &&
        subModuleMatch &&
        ownerMatch &&
        statusMatch &&
        impactMatch
      );
    });
  }, [
    baseTableData,
    searchValue,
    selectedSubModule,
    selectedOwner,
    selectedStatus,
    selectedImpactLevel,
  ]);

  // Count active filters
  const activeFiltersCount = [
    selectedSubModule,
    selectedOwner,
    selectedStatus,
    selectedImpactLevel,
  ].filter(Boolean).length;

  // Clear all filters
  const clearFilters = () => {
    setSearchValue("");
    setSelectedSubModule("");
    setSelectedOwner("");
    setSelectedStatus("");
    setSelectedImpactLevel("");
  };

  // Handle KPI ID click navigation - convert kpiTitle to slug format (like cockpit table uses kpi.id)
  const handleKpiClick = useMemo(
    () => (_kpiId: string, row: ROIIntentTableRow) => {
      const moduleId = row.module.toLowerCase(); // Map module code to moduleId (e.g., "FI" -> "fi")
      const blueprintId = "sap-s4hana";
      // Convert kpiTitle to slug format (lowercase, replace spaces with hyphens)
      const kpiSlug = row.kpiTitle
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      navigate(
        `/phase-i/catalog/${blueprintId}/blueprint/${moduleId}/cockpit/${kpiSlug}`
      );
    },
    [navigate]
  );

  // Get table columns with navigation
  const tableColumns = useMemo(
    () => roiIntentTableConfig.getColumns(handleKpiClick),
    [handleKpiClick]
  );

  // If intent not found, redirect back to blueprint
  if (!intentData) {
    return <Navigate to="/phase-i/catalog/sap-s4hana/blueprint" replace />;
  }

  // Calculate metrics from filtered table data (similar to cockpit page)
  const calculatedMetrics = useMemo(() => {
    const totalKPIs = filteredTableData.length;
    
    // Calculate KPI status counts
    const activeCount = filteredTableData.filter(
      (kpi) => kpi.status === "Active" || kpi.status === "Optimal"
    ).length;
    const plannedCount = filteredTableData.filter(
      (kpi) => kpi.status === "Planned"
    ).length;
    const warningCount = filteredTableData.filter(
      (kpi) => kpi.status === "Warning" || kpi.status === "Monitor"
    ).length;
    const errorCount = filteredTableData.filter(
      (kpi) => kpi.status === "Error" || kpi.status === "Action"
    ).length;
    
    // Calculate overall health (percentage of active/optimal KPIs)
    const overallHealth = totalKPIs > 0 
      ? Math.round((activeCount / totalKPIs) * 100) 
      : 0;
    const healthStatus: "Optimal" | "Monitor" | "Error" = overallHealth >= 80 ? "Optimal" : overallHealth >= 60 ? "Monitor" : "Error";
    
    // Calculate control coverage (active controls / total)
    const activeControls = filteredTableData.filter(
      (kpi) => kpi.status !== "Planned" && kpi.status !== "Action"
    ).length;
    const controlCoverage = totalKPIs > 0 
      ? Math.round((activeControls / totalKPIs) * 100) 
      : 0;
    
    // Map statuses to green/amber/red
    const greenCount = activeCount;
    const amberCount = warningCount + plannedCount;
    const redCount = errorCount;
    
    // Calculate financial value at risk protected based on ROI potential
    // Estimate value based on ROI potential levels and number of KPIs
    const veryHighCount = filteredTableData.filter(kpi => kpi.roiPotential === "Very High").length;
    const highCount = filteredTableData.filter(kpi => kpi.roiPotential === "High").length;
    const mediumCount = filteredTableData.filter(kpi => kpi.roiPotential === "Medium").length;
    const lowCount = filteredTableData.filter(kpi => kpi.roiPotential === "Low").length;
    
    // Estimate value: Very High = $50M, High = $20M, Medium = $10M, Low = $5M per KPI
    const estimatedValue = (veryHighCount * 50) + (highCount * 20) + (mediumCount * 10) + (lowCount * 5);
    const financialValueAtRisk = estimatedValue > 0 ? `$${estimatedValue}M` : "$0M";
    
    return {
      overallHealth: {
        value: `${overallHealth}%`,
        status: healthStatus,
        description: `${activeCount} of ${totalKPIs} KPIs active`,
      },
      financialValueAtRisk: {
        value: financialValueAtRisk,
        description: "Fraud prevention & error reduction",
      },
      controlCoverage: {
        value: `${controlCoverage}%`,
        total: totalKPIs,
        active: activeControls,
        description: `${activeControls} of ${totalKPIs} controls active`,
      },
      kpiStatus: {
        green: greenCount,
        amber: amberCount,
        red: redCount,
        total: totalKPIs,
        description: `${totalKPIs} total KPIs monitored`,
      },
    };
  }, [filteredTableData]);

  // Create metric cards matching cockpit page format
  const metricCards = useMemo(() => {
    return [
      {
        icon: TrendingUp,
        value: calculatedMetrics.overallHealth.value,
        title: "Total KPI's Health",
        description: calculatedMetrics.overallHealth.description,
        color: getStatusColor(calculatedMetrics.overallHealth.status),
        showStatusDot: false,
      },
      {
        icon: Shield,
        value: calculatedMetrics.financialValueAtRisk.value,
        title: "Financial Value at Risk Protected",
        description: calculatedMetrics.financialValueAtRisk.description,
        color: "#10b981", // Green - matching Cockpit page
        showStatusDot: false,
      },
      {
        icon: CheckCircle,
        value: calculatedMetrics.controlCoverage.value,
        title: "Control Coverage Percentage",
        description: calculatedMetrics.controlCoverage.description,
        color: "#2563eb", // Blue - matching Cockpit page
        showStatusDot: false,
      },
      {
        icon: Activity,
        value: `${calculatedMetrics.kpiStatus.green} / ${calculatedMetrics.kpiStatus.amber} / ${calculatedMetrics.kpiStatus.red}`,
        title: "KPIs in Green / Amber / Red",
        description: calculatedMetrics.kpiStatus.description,
        color: "#6366f1", // Indigo - matching Cockpit page
        showStatusDot: false,
      },
    ];
  }, [calculatedMetrics]);

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header Section */}
      <div>
        <PageHeader
          title={intentData.label}
          subtitle={intentData.description}
          backTo="/phase-i/catalog/sap-s4hana/blueprint"
          backLabel="ROI Blueprint"
          rightContent={""}
        />
      </div>

      {/* ROI Intent Cards Section - Matching Cockpit Page Format */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {metricCards.map((card, index) => (
          <MetricCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            value={card.value}
            color={card.color}
            showStatusDot={card.showStatusDot}
          />
        ))}
      </div>

      {/* Filter & Search Section */}
      <div>
        <SearchAndFilters
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search KPI ID or name..."
          filters={[
            {
              label: "Sub-Modules",
              value: selectedSubModule,
              options: subModuleOptions,
              onChange: setSelectedSubModule,
              placeholder: "All Sub-Modules",
            },
            {
              label: "Owners",
              value: selectedOwner,
              options: ownerOptions,
              onChange: setSelectedOwner,
              placeholder: "All Owners",
            },
            {
              label: "Statuses",
              value: selectedStatus,
              options: statusOptions,
              onChange: setSelectedStatus,
              placeholder: "All Statuses",
            },
            {
              label: "Impact Levels",
              value: selectedImpactLevel,
              options: impactLevelOptions,
              onChange: setSelectedImpactLevel,
              placeholder: "All Impact Levels",
            },
          ]}
          onClearFilters={clearFilters}
          activeFiltersCount={activeFiltersCount}
        />
      </div>

      {/* Table Section */}
      <div>
        <DrilldownTable
          columns={tableColumns}
          data={filteredTableData}
          title={roiIntentTableConfig.title}
          subtitle={roiIntentTableConfig.subtitle}
          emptyMessage={roiIntentTableConfig.emptyMessage}
          emptyDescription={roiIntentTableConfig.emptyDescription}
          accentColor={intentData.color}
        />
      </div>

      {/* Learning Dashboard Section */}
      <div></div>
    </div>
  );
};

export default RoiIntentOverview;
