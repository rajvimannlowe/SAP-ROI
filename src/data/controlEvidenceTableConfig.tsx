import { SimpleColumnConfig, renderCellByType } from "./tableColumnTypes";
import { PeriodPerformance } from "./controlEvidenceData";
import { TableColumn } from "../components/roi/DrilldownTable";

// Period Performance Table Column Configuration
const PERIOD_PERFORMANCE_COLUMNS: SimpleColumnConfig<PeriodPerformance>[] = [
  {
    key: "period",
    header: "Period",
    type: "text",
  },
  {
    key: "testsPerformed",
    header: "Tests Performed",
    type: "number",
  },
  {
    key: "passed",
    header: "Passed",
    type: "number",
    customAccessor: (row) => (
      <span className="text-green-600 font-semibold">
        {row.passed.toLocaleString()}
      </span>
    ),
  },
  {
    key: "failed",
    header: "Failed",
    type: "number",
    customAccessor: (row) => (
      <span className="text-red-600 font-semibold">
        {row.failed.toLocaleString()}
      </span>
    ),
  },
  {
    key: "passRate",
    header: "Pass Rate",
    type: "percentage",
    customAccessor: (row) => (
      <span className="text-green-700 font-bold">{row.passRate}</span>
    ),
  },
  {
    key: "exceptionsIdentified",
    header: "Exceptions",
    type: "number",
    customAccessor: (row) => (
      <span className="text-orange-600">{row.exceptionsIdentified}</span>
    ),
  },
  {
    key: "exceptionsClosed",
    header: "Closed",
    type: "number",
    customAccessor: (row) => (
      <span className="text-green-600">{row.exceptionsClosed}</span>
    ),
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

// Get Period Performance table columns
export const periodPerformanceColumns =
  (): TableColumn<PeriodPerformance>[] => {
    return PERIOD_PERFORMANCE_COLUMNS.map((config) => ({
      key: String(config.key),
      header: config.header,
      align: config.align || "left",
      width: config.width,
      accessor: config.customAccessor || createColumnAccessor(config),
    }));
  };
