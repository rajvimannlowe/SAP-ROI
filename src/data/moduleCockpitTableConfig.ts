import { renderCellByType } from "./tableColumnTypes";
import { KPIDetail, ModuleCockpitData } from "./moduleCockpitData";
import { TableColumn } from "../components/roi/DrilldownTable";
import { User } from "lucide-react";

const roiPotentialColorMap = {
  "Very High": "#DC2626",
  High: "#EA580C",
  Medium: "#D97706",
  Low: "#65A30D",
};

// Get KPI table columns with required columns only - same structure as ROI Intent table
export const getKPITableColumns = (
  cockpitData: ModuleCockpitData | null,
  onKpiClick?: (kpi: KPIDetail) => void
): TableColumn<KPIDetail>[] => {
  // Create a map of sub-module ID to name
  const subModuleMap = new Map<string, string>();
  if (cockpitData) {
    cockpitData.subModules.forEach((subModule) => {
      subModuleMap.set(subModule.id, subModule.name);
    });
  }

  return [
    {
      key: "module",
      header: "Module",
      accessor: () =>
        renderCellByType(cockpitData?.moduleName || "", "badge", {
          badgeConfig: { defaultColor: "#4160F0" },
        }),
    },
    {
      key: "subModule",
      header: "Sub-Module",
      accessor: (row) =>
        renderCellByType(
          subModuleMap.get(row.subModuleId) || row.subModuleId,
          "text",
          {
            textStyle: "long",
          }
        ),
    },
    {
      key: "id",
      header: "KPI ID",
      accessor: (row) =>
        renderCellByType(row.id, "textWithLink", {
          textStyle: "short",
          onClick: () => {
            if (onKpiClick) {
              onKpiClick(row);
            }
          },
        }),
    },
    {
      key: "name",
      header: "KPI Name",
      accessor: (row) =>
        renderCellByType(row.name, "text", {
          textStyle: "short",
        }),
    },
    {
      key: "businessObjective",
      header: "Business Objectives",
      accessor: (row) =>
        renderCellByType(row.businessObjective || "N/A", "text", {
          textStyle: "long",
        }),
    },
    {
      key: "businessRiskPrevented",
      header: "Business Impact Summary",
      accessor: (row) =>
        renderCellByType(row.businessRiskPrevented, "text", {
          textStyle: "long",
        }),
    },
    {
      key: "roiDimension",
      header: "ROI Intent",
      accessor: (row) =>
        renderCellByType(row.roiDimension || "N/A", "badge", {
          badgeConfig: { defaultColor: "#7C3AED" },
        }),
    },
    {
      key: "targetValue",
      header: "Expected Condition",
      accessor: (row) =>
        renderCellByType(row.targetValue || "N/A", "text", {
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
      accessor: () =>
        renderCellByType("N/A", "badge", {
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
      key: "owner",
      header: "Owner",
      accessor: (row) =>
        renderCellByType(row.owner, "textWithIcon", {
          textStyle: "long",
          badgeConfig: {
            defaultColor: "#6B7280",
            icon: User,
          },
        }),
    },
  ];
};
