import { SummaryCards } from "@/components/dashboard/SummaryCards"
import { PageHeader } from "@/components/layout/PageHeader"
import { useParams, Navigate } from "react-router-dom"
import { SAP_S4HANA_BLUEPRINT } from "@/data/productBlueprintData"
import { DrilldownTable } from "@/components/roi/DrilldownTable"
import { roiIntentTableConfig } from "@/data/roiIntentTableConfig"
import { getROIIntentDataByCategory } from "@/data/roiIntentData"

const RoiIntentOverview = () => {
    const { intentId } = useParams<{ intentId: string }>();
    
    // Find the intent data based on the intentId
    const intentData = SAP_S4HANA_BLUEPRINT.roiIntents.find(intent => intent.id === intentId);
    
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

    // Get filtered table data based on the selected intent category
    const tableData = getROIIntentDataByCategory(intentData.label);

    return (
        <>
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

            </div>

            {/* Table Section */}
            <div>
                <DrilldownTable
                    columns={roiIntentTableConfig.columns}
                    data={tableData}
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
        </>
    )
}

export default RoiIntentOverview