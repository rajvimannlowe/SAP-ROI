import { useState, useMemo } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { SAP_S4HANA_BLUEPRINT } from "@/data/productBlueprintData";
import { DrilldownTable } from "@/components/roi/DrilldownTable";
import { SearchAndFilters } from "@/components/roi/SearchAndFilters";
import { MetricCard } from "@/components/roi/MetricCard";
import { roiIntentTableConfig } from "@/data/roiIntentTableConfig";
import {
  getROIIntentDataByCategory,
  ROIIntentTableRow,
} from "@/data/roiIntentData";
import { getROIIntentSummaryCards } from "@/data/roiIntentSummaryData";

const RoiIntentOverview = () => {
  const { intentId } = useParams<{ intentId: string }>();
  const navigate = useNavigate();

  // Search and filter state
  const [searchValue, setSearchValue] = useState("");
  const [selectedSubModule, setSelectedSubModule] = useState("");
  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedImpactLevel, setSelectedImpactLevel] = useState("");

  // Find the intent data based on the intentId
  const intentData = SAP_S4HANA_BLUEPRINT.roiIntents.find(
    (intent) => intent.id === intentId
  );

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

  // Get ROI intent summary cards data
  const roiSummaryCards = getROIIntentSummaryCards(intentData.label);

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

      {/* ROI Intent Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roiSummaryCards.map((card) => (
          <MetricCard
            key={card.id}
            icon={card.icon}
            title={card.title}
            description={card.subtitle}
            value={card.value}
            color={card.color}
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
