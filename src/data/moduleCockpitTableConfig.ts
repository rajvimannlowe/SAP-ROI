import { SimpleColumnConfig, renderCellByType } from "./tableColumnTypes";
import { KPIDetail } from "./moduleCockpitData";
import { TableColumn } from "../components/roi/DrilldownTable";

// KPI Table Column Configuration - Simple and Easy to Understand
export const KPI_TABLE_COLUMNS: SimpleColumnConfig<KPIDetail>[] = [
  {
    key: "name",
    header: "KPI Name",
    type: "text",
  },
  {
    key: "businessRiskPrevented",
    header: "Business Risk Prevented",
    type: "text",
    textStyle: "long", // Auto-applies long text styling
  },
  {
    key: "controlType",
    header: "Control Type",
    type: "badge",
    badgeConfig: {
      colorMap: {
        Preventive: "#2563eb",
        Detective: "#9333ea",
      },
    },
  },
  {
    key: "status",
    header: "Status",
    type: "status",
    align: "center",
  },
  {
    key: "owner",
    header: "Owner",
    type: "text",
  },
  {
    key: "recommendedAction",
    header: "Recommended Action",
    type: "text",
    textStyle: "long", // Auto-applies long text styling
  },
];

// Convert column config to table format
const createColumnAccessor = <T extends object>(
  config: SimpleColumnConfig<T>
) => {
  return (row: T) => {
    const value = row[config.key];
    return renderCellByType(value, config.type, {
      textStyle: config.textStyle,
      badgeConfig: config.badgeConfig,
    });
  };
};

// Get KPI table columns
export const getKPITableColumns = (): TableColumn<KPIDetail>[] => {
  return KPI_TABLE_COLUMNS.map((config) => ({
    key: String(config.key),
    header: config.header,
    align: config.align || "left",
    width: config.width,
    accessor: config.customAccessor || createColumnAccessor(config),
  }));
};
