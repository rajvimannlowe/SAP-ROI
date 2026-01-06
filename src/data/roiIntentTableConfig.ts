import { TableColumn } from "../components/roi/DrilldownTable";
import { ROIIntentTableRow } from "./roiIntentData";
import { renderCellByType } from "./tableColumnTypes";
import { User, Calendar } from "lucide-react";

const roiPotentialColorMap = {
    "Very High": "#DC2626",
    High: "#EA580C",
    Medium: "#D97706",
    Low: "#65A30D",
};

const complexityColorMap = {
    High: "#DC2626",
    Medium: "#D97706",
    Low: "#16A34A",
};

const ruleTypeColorMap = {
    Control: "#2563EB",
    Validation: "#059669",
    Prevention: "#DC2626",
    Monitoring: "#7C3AED",
    Analysis: "#DB2777",
    Compliance: "#0891B2",
};

export const roiIntentTableColumns: TableColumn<ROIIntentTableRow>[] = [
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
            }),
    },
    {
        key: "kpiTitle",
        header: "KPI Title",
        accessor: (row) =>
            renderCellByType(row.kpiTitle, "text", {
                textStyle: "short",
            }),
    },
    {
        key: "ruleType",
        header: "Rule Type",
        accessor: (row) =>
            renderCellByType(row.ruleType, "badge", {
                badgeConfig: {
                    colorMap: ruleTypeColorMap,
                    defaultColor: "#6366F1",
                },
            }),
    },
    {
        key: "descriptionLogic",
        header: "Description",
        accessor: (row) =>
            renderCellByType(row.descriptionLogic, "text", {
                textStyle: "long",
            }),
    },
    {
        key: "sapTableDataSource",
        header: "Data Source",
        accessor: (row) =>
            renderCellByType(row.sapTableDataSource, "text", {
                textStyle: "long",
            }),
    },
    {
        key: "extractionMethod",
        header: "Extraction Method",
        accessor: (row) =>
            renderCellByType(row.extractionMethod, "text", {
                textStyle: "long",
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
        key: "detectionMethod",
        header: "Detection Method",
        accessor: (row) =>
            renderCellByType(row.detectionMethod, "text", {
                textStyle: "long",
            }),
    },
    {
        key: "impactCategory",
        header: "Impact Category",
        accessor: (row) =>
            renderCellByType(row.impactCategory, "badge", {
                badgeConfig: { defaultColor: "#7C3AED" },
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
        key: "technicalComplexity",
        header: "Technical Complexity",
        accessor: (row) =>
            renderCellByType(row.technicalComplexity, "badge", {
                badgeConfig: {
                    colorMap: complexityColorMap,
                    defaultColor: "#D97706",
                },
            }),
    },
    {
        key: "dependencies",
        header: "Dependencies",
        accessor: (row) =>
            renderCellByType(row.dependencies, "text", {
                textStyle: "long",
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
        header: "Owner / Responsible Role",
        accessor: (row) =>
            renderCellByType(row.ownerResponsibleRole, "textWithIcon", {
                textStyle: "long",
                badgeConfig: {
                    defaultColor: "#6B7280",
                    icon: User
                },
            }),
    },
    {
        key: "remarks",
        header: "Remarks",
        accessor: (row) =>
            renderCellByType(row.remarks, "text", {
                textStyle: "long",
            }),
    },
    {
        key: "lastUpdated",
        header: "Last Updated",
        align: "center",
        accessor: (row) => renderCellByType(row.lastUpdated, "textWithIcon", {
            textStyle: "long",
            badgeConfig: {
                defaultColor: "#6B7280",
                icon: Calendar
            },
        }),
    },
];

// Table configuration with metadata
export const roiIntentTableConfig = {
    columns: roiIntentTableColumns,
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
