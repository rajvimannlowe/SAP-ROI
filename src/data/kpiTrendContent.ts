export interface InterpretationItem {
  icon: string;
  label: string;
  value: string;
  color: string;
  badge?: boolean;
}

export interface KPITrendContent {
  interpretationSummary: InterpretationItem[];
  businessInsight: string;
  positiveSignals: string[];
  keyObservations: string[];
}

// Mock content for different KPIs
export const KPI_TREND_CONTENT: Record<string, KPITrendContent> = {
  "duplicate-payment": {
    interpretationSummary: [
      {
        icon: "TrendingDown",
        label: "RISK TREND",
        value: "Decreasing",
        color: "#10b981",
      },
      {
        icon: "TrendingUp",
        label: "CONTROL EFFECTIVENESS",
        value: "Improving",
        color: "#10b981",
      },
      {
        icon: "CheckCircle2",
        label: "ROI STATUS",
        value: "Captured",
        color: "#10b981",
        badge: true,
      },
    ],
    businessInsight:
      "Duplicate payment screening has shown consistent improvement over the past 6 months, with screening rate increasing from 98.2% to 99.8%. Control effectiveness is strengthening, reducing fraud exposure by an estimated $420K annually. ROI is being fully captured with zero duplicate payments processed in the last 90 days.",
    positiveSignals: [
      "Consistent upward trend demonstrates control maturity",
      "Approaching theoretical maximum of 100% screening coverage",
      "No system downtime or processing delays impacting coverage",
    ],
    keyObservations: [
      "Screening rate has improved 1.6 percentage points since January",
      "All monthly values now exceed the 99.5% green threshold",
      "Zero false negatives detected in monthly audit sampling",
      "System performance remains stable during peak payment processing periods",
      "Vendor master data quality improvements contributing to better matching",
    ],
  },
  "vendor-master-validation": {
    interpretationSummary: [
      {
        icon: "TrendingDown",
        label: "RISK TREND",
        value: "Decreasing",
        color: "#10b981",
      },
      {
        icon: "TrendingUp",
        label: "CONTROL EFFECTIVENESS",
        value: "Improving",
        color: "#10b981",
      },
      {
        icon: "CheckCircle2",
        label: "ROI STATUS",
        value: "On Track",
        color: "#f59e0b",
        badge: true,
      },
    ],
    businessInsight:
      "Vendor master data validation has improved significantly, with validation rates climbing from 94.2% to 97.4% over six months. This improvement reduces the risk of vendor fraud and payment errors, contributing to better financial controls.",
    positiveSignals: [
      "Steady month-over-month improvement in validation rates",
      "Enhanced data quality processes showing positive results",
      "Automated validation workflows functioning effectively",
    ],
    keyObservations: [
      "Validation rate increased by 3.2 percentage points since January",
      "All months exceeded the 93% baseline threshold",
      "Data quality improvements accelerating validation accuracy",
      "Automation reducing manual review workload",
      "No critical vendor data errors detected in recent audits",
    ],
  },
  "invoice-matching": {
    interpretationSummary: [
      {
        icon: "TrendingUp",
        label: "RISK TREND",
        value: "Stable",
        color: "#f59e0b",
      },
      {
        icon: "TrendingUp",
        label: "CONTROL EFFECTIVENESS",
        value: "Improving",
        color: "#10b981",
      },
      {
        icon: "CheckCircle2",
        label: "ROI STATUS",
        value: "In Progress",
        color: "#f59e0b",
        badge: true,
      },
    ],
    businessInsight:
      "Invoice matching rates have steadily improved from 88.5% to 92.5%, showing consistent progress. While below target, the upward trend indicates effective control implementation and process optimization efforts.",
    positiveSignals: [
      "Continuous improvement trajectory maintained",
      "Matching accuracy improving with system enhancements",
      "Processing efficiency gains reducing manual intervention",
    ],
    keyObservations: [
      "Match rate improved by 4 percentage points since January",
      "All monthly values exceed the 87% baseline",
      "System enhancements contributing to better matching algorithms",
      "Reduced manual invoice processing requirements",
      "Error rates decreasing month over month",
    ],
  },
};

// Default fallback content
export const getDefaultTrendContent = (): KPITrendContent => ({
  interpretationSummary: [
    {
      icon: "TrendingUp",
      label: "RISK TREND",
      value: "Stable",
      color: "#10b981",
    },
    {
      icon: "TrendingUp",
      label: "CONTROL EFFECTIVENESS",
      value: "Improving",
      color: "#10b981",
    },
    {
      icon: "CheckCircle2",
      label: "ROI STATUS",
      value: "In Progress",
      color: "#f59e0b",
      badge: true,
    },
  ],
  businessInsight:
    "KPI performance is showing positive trends with consistent improvements in control effectiveness and risk reduction.",
  positiveSignals: [
    "Positive trend in performance metrics",
    "Control effectiveness improving",
    "System stability maintained",
  ],
  keyObservations: [
    "Performance metrics showing upward trajectory",
    "All values meeting baseline thresholds",
    "Control processes functioning as expected",
  ],
});

// Helper function to get content by KPI ID
export const getTrendContent = (kpiId: string): KPITrendContent => {
  return KPI_TREND_CONTENT[kpiId] || getDefaultTrendContent();
};



