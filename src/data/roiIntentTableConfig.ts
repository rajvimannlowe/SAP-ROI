import { TableColumn } from "../components/roi/DrilldownTable";
import { ROIIntentTableRow } from "./roiIntentData";
import { renderCellByType } from "./tableColumnTypes";
import { User } from "lucide-react";

const roiPotentialColorMap = {
    "Very High": "#DC2626",
    High: "#EA580C",
    Medium: "#D97706",
    Low: "#65A30D",
};

// Function to get table columns with navigation support
export const getROIIntentTableColumns = (
    onKpiClick?: (kpiId: string, row: ROIIntentTableRow) => void
): TableColumn<ROIIntentTableRow>[] => [
    {
        key: "module",
        header: "Module",
        accessor: (row) =>
            renderCellByType(row.module, "badge", {
                badgeConfig: { defaultColor: "#4160F0" },
            }),
    },
    {
        key: "subModule",
        header: "Sub-Module",
        accessor: (row) =>
            renderCellByType(row.subModule, "text", {
                textStyle: "long",
            }),
    },
    {
        key: "kpiId",
        header: "KPI ID",
        accessor: (row) =>
            renderCellByType(row.kpiId, "textWithLink", {
                textStyle: "short",
                onClick: () => {
                    if (onKpiClick) {
                        onKpiClick(row.kpiId, row);
                    }
                },
            }),
    },
    {
        key: "kpiTitle",
        header: "KPI Name",
        accessor: (row) =>
            renderCellByType(row.kpiTitle, "text", {
                textStyle: "short",
            }),
    },
    {
        key: "descriptionLogic",
        header: "Business Objectives",
        accessor: (row) =>
            renderCellByType(row.descriptionLogic, "text", {
                textStyle: "long",
            }),
    },
    {
        key: "businessImpactSummary",
        header: "Business Impact Summary",
        accessor: (row) =>
            renderCellByType(row.businessImpactSummary, "text", {
                textStyle: "long",
            }),
    },
    {
        key: "impactCategory",
        header: "ROI Intent",
        accessor: (row) =>
            renderCellByType(row.impactCategory, "badge", {
                badgeConfig: { defaultColor: "#7C3AED" },
            }),
    },
    {
        key: "expectedCondition",
        header: "Expected Condition",
        accessor: (row) =>
            renderCellByType(row.expectedCondition, "text", {
                textStyle: "long",
            }),
    },
    {
        key: "recommendedAction",
        header: "Recommended Action",
        accessor: (row) =>
            renderCellByType(row.recommendedAction, "text", {
                textStyle: "long",
            }),
    },
    {
        key: "roiPotential",
        header: "ROI Potential",
        accessor: (row) =>
            renderCellByType(row.roiPotential, "badge", {
                badgeConfig: {
                    colorMap: roiPotentialColorMap,
                    defaultColor: "#D97706",
                },
            }),
    },
    {
        key: "status",
        header: "Status",
        accessor: (row) =>
            renderCellByType(row.status, "status", {
                textStyle: "short",
            }),
    },
    {
        key: "ownerResponsibleRole",
        header: "Owner",
        accessor: (row) =>
            renderCellByType(row.ownerResponsibleRole, "textWithIcon", {
                textStyle: "long",
                badgeConfig: {
                    defaultColor: "#6B7280",
                    icon: User
                },
            }),
    },
];

// Table configuration with metadata
export const roiIntentTableConfig = {
    getColumns: getROIIntentTableColumns,
    title: "ROI Intent KPI Details",
    subtitle:
        "Comprehensive view of KPI rules, controls, and ROI impact analysis",
    emptyMessage: "No ROI intent data available",
    emptyDescription: "Configure KPI rules and controls to see detailed analysis",
    accentColor: "#4160F0",
    showHeader: true,
    stripedRows: true,
    compact: false,
};
