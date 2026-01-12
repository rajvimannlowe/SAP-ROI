export interface TrendDataPoint {
  x: string;
  y: number;
}

export interface TrendDataSeries {
  id: string;
  data: TrendDataPoint[];
}

export interface ThresholdLine {
  id: string;
  value: number;
  color: string;
  style?: { strokeDasharray: string };
  label: string;
}

export interface KPITrendConfig {
  kpiId: string;
  data: TrendDataSeries[];
  thresholds: ThresholdLine[];
  yAxisConfig: {
    min: number;
    max: number;
    unit: string;
  };
  xAxisLabel: string;
  yAxisLabel: string;
}

// Mock trend data for different KPIs
const duplicatePaymentTrend: TrendDataSeries[] = [
  {
    id: "screeningRate",
    data: [
      { x: "Jan", y: 97.8 },
      { x: "Feb", y: 98.5 },
      { x: "Mar", y: 99.3 },
      { x: "Apr", y: 99.5 },
      { x: "May", y: 99.6 },
      { x: "Jun", y: 99.8 },
    ],
  },
];

const vendorMasterTrend: TrendDataSeries[] = [
  {
    id: "validationRate",
    data: [
      { x: "Jan", y: 94.2 },
      { x: "Feb", y: 95.1 },
      { x: "Mar", y: 95.8 },
      { x: "Apr", y: 96.3 },
      { x: "May", y: 96.9 },
      { x: "Jun", y: 97.4 },
    ],
  },
];

const invoiceMatchingTrend: TrendDataSeries[] = [
  {
    id: "matchRate",
    data: [
      { x: "Jan", y: 88.5 },
      { x: "Feb", y: 89.2 },
      { x: "Mar", y: 90.1 },
      { x: "Apr", y: 91.0 },
      { x: "May", y: 91.8 },
      { x: "Jun", y: 92.5 },
    ],
  },
];

// Mock trend configurations
export const KPI_TREND_CONFIGS: Record<string, KPITrendConfig> = {
  "duplicate-payment": {
    kpiId: "duplicate-payment",
    data: duplicatePaymentTrend,
    thresholds: [
      {
        id: "target",
        value: 100,
        color: "#1e40af",
        style: { strokeDasharray: "5 5" },
        label: "Target (100%)",
      },
      {
        id: "greenThreshold",
        value: 99.5,
        color: "#10b981",
        style: { strokeDasharray: "5 5" },
        label: "Green Threshold (99.5%)",
      },
    ],
    yAxisConfig: {
      min: 97,
      max: 100.5,
      unit: "Screening Rate %",
    },
    xAxisLabel: "Month",
    yAxisLabel: "Screening Rate %",
  },
  "vendor-master-validation": {
    kpiId: "vendor-master-validation",
    data: vendorMasterTrend,
    thresholds: [
      {
        id: "target",
        value: 98,
        color: "#1e40af",
        style: { strokeDasharray: "5 5" },
        label: "Target (98%)",
      },
      {
        id: "greenThreshold",
        value: 95,
        color: "#10b981",
        style: { strokeDasharray: "5 5" },
        label: "Green Threshold (95%)",
      },
    ],
    yAxisConfig: {
      min: 93,
      max: 98.5,
      unit: "Validation Rate %",
    },
    xAxisLabel: "Month",
    yAxisLabel: "Validation Rate %",
  },
  "invoice-matching": {
    kpiId: "invoice-matching",
    data: invoiceMatchingTrend,
    thresholds: [
      {
        id: "target",
        value: 95,
        color: "#1e40af",
        style: { strokeDasharray: "5 5" },
        label: "Target (95%)",
      },
      {
        id: "greenThreshold",
        value: 90,
        color: "#10b981",
        style: { strokeDasharray: "5 5" },
        label: "Green Threshold (90%)",
      },
    ],
    yAxisConfig: {
      min: 87,
      max: 93.5,
      unit: "Match Rate %",
    },
    xAxisLabel: "Month",
    yAxisLabel: "Match Rate %",
  },
};

// Default fallback config
export const getDefaultTrendConfig = (): KPITrendConfig => ({
  kpiId: "default",
  data: duplicatePaymentTrend,
  thresholds: [
    {
      id: "target",
      value: 100,
      color: "#1e40af",
      style: { strokeDasharray: "5 5" },
      label: "Target (100%)",
    },
    {
      id: "greenThreshold",
      value: 99.5,
      color: "#10b981",
      style: { strokeDasharray: "5 5" },
      label: "Green Threshold (99.5%)",
    },
  ],
  yAxisConfig: {
    min: 97,
    max: 100.5,
    unit: "Performance %",
  },
  xAxisLabel: "Month",
  yAxisLabel: "Performance %",
});

// Helper function to get trend config by KPI ID
export const getTrendConfig = (kpiId: string): KPITrendConfig => {
  return KPI_TREND_CONFIGS[kpiId] || getDefaultTrendConfig();
};


