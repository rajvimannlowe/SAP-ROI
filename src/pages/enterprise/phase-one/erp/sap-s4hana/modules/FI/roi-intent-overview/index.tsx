import { useState, useMemo } from "react";
import { SummaryCards } from "@/components/dashboard/SummaryCards"
import { PageHeader } from "@/components/layout/PageHeader"
import { useParams, Navigate } from "react-router-dom"
import { SAP_S4HANA_BLUEPRINT } from "@/data/productBlueprintData"
import { DrilldownTable } from "@/components/roi/DrilldownTable"
import { SearchAndFilters } from "@/components/roi/SearchAndFilters"
import { roiIntentTableConfig } from "@/data/roiIntentTableConfig"
import { getROIIntentDataByCategory, ROIIntentTableRow } from "@/data/roiIntentData"

const RoiIntentOverview = () => {
    const { intentId } = useParams<{ intentId: string }>();
    
    // Search and filter state
    const [searchValue, setSearchValue] = useState("");
    const [selectedSubModule, setSelectedSubModule] = useState("");
    const [selectedOwner, setSelectedOwner] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedImpactLevel, setSelectedImpactLevel] = useState("");
    
    // Find the intent data based on the intentId
    const intentData = SAP_S4HANA_BLUEPRINT.roiIntents.find(intent => intent.id === intentId);
    
    // Get base table data based on the selected intent category
    const baseTableData = useMemo(() => {
        return intentData ? getROIIntentDataByCategory(intentData.label) : [];
    }, [intentData]);

    // Get unique values for filter options
    const subModuleOptions = useMemo(() => {
        const unique = [...new Set(baseTableData.map(item => item.subModule))];
        return unique.map(value => ({ value, label: value }));
    }, [baseTableData]);

    const ownerOptions = useMemo(() => {
        const unique = [...new Set(baseTableData.map(item => item.ownerResponsibleRole))];
        return unique.map(value => ({ value, label: value }));
    }, [baseTableData]);

    const statusOptions = useMemo(() => {
        const unique = [...new Set(baseTableData.map(item => item.status))];
        return unique.map(value => ({ value, label: value }));
    }, [baseTableData]);

    const impactLevelOptions = useMemo(() => {
        const unique = [...new Set(baseTableData.map(item => item.impactCategory))];
        return unique.map(value => ({ value, label: value }));
    }, [baseTableData]);

    // Filter and search logic
    const filteredTableData = useMemo(() => {
        return baseTableData.filter((item: ROIIntentTableRow) => {
            // Search filter
            const searchMatch = !searchValue || 
                item.kpiId.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.kpiTitle.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.descriptionLogic.toLowerCase().includes(searchValue.toLowerCase());

            // Filter matches
            const subModuleMatch = !selectedSubModule || item.subModule === selectedSubModule;
            const ownerMatch = !selectedOwner || item.ownerResponsibleRole === selectedOwner;
            const statusMatch = !selectedStatus || item.status === selectedStatus;
            const impactMatch = !selectedImpactLevel || item.impactCategory === selectedImpactLevel;

            return searchMatch && subModuleMatch && ownerMatch && statusMatch && impactMatch;
        });
    }, [baseTableData, searchValue, selectedSubModule, selectedOwner, selectedStatus, selectedImpactLevel]);

    // Count active filters
    const activeFiltersCount = [selectedSubModule, selectedOwner, selectedStatus, selectedImpactLevel]
        .filter(Boolean).length;

    // Clear all filters
    const clearFilters = () => {
        setSearchValue("");
        setSelectedSubModule("");
        setSelectedOwner("");
        setSelectedStatus("");
        setSelectedImpactLevel("");
    };
    
    // If intent not found, redirect back to blueprint
    if (!intentData) {
        return <Navigate to="/phase-i/catalog/sap-s4hana/blueprint" replace />;
    }

    // Filter metrics related to this intent
    const relatedMetrics = [
        ...SAP_S4HANA_BLUEPRINT.primaryMetrics,
        ...SAP_S4HANA_BLUEPRINT.secondaryMetrics
    ].filter(metric => metric.dimension === intentData.label);

    // Create summary cards from related metrics
    const summaryCards = relatedMetrics.map(metric => ({
        title: metric.title,
        value: metric.target,
        icon: intentData.icon,
        color: intentData.color
    }));

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

            {/* Summary Cards Section */}
            <div>
                <SummaryCards cards={summaryCards} columns={4} />
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
                            placeholder: "All Sub-Modules"
                        },
                        {
                            label: "Owners",
                            value: selectedOwner,
                            options: ownerOptions,
                            onChange: setSelectedOwner,
                            placeholder: "All Owners"
                        },
                        {
                            label: "Statuses",
                            value: selectedStatus,
                            options: statusOptions,
                            onChange: setSelectedStatus,
                            placeholder: "All Statuses"
                        },
                        {
                            label: "Impact Levels",
                            value: selectedImpactLevel,
                            options: impactLevelOptions,
                            onChange: setSelectedImpactLevel,
                            placeholder: "All Impact Levels"
                        }
                    ]}
                    onClearFilters={clearFilters}
                    activeFiltersCount={activeFiltersCount}
                />
            </div>

            {/* Table Section */}
            <div>
                <DrilldownTable
                    columns={roiIntentTableConfig.columns}
                    data={filteredTableData}
                    title={roiIntentTableConfig.title}
                    subtitle={roiIntentTableConfig.subtitle}
                    emptyMessage={roiIntentTableConfig.emptyMessage}
                    emptyDescription={roiIntentTableConfig.emptyDescription}
                    accentColor={intentData.color}
                    showHeader={roiIntentTableConfig.showHeader}
                    stripedRows={roiIntentTableConfig.stripedRows}
                    compact={roiIntentTableConfig.compact}
                />
            </div>

            {/* Learning Dashboard Section */}
            <div>

            </div>
        </div>
    )
}

export default RoiIntentOverview