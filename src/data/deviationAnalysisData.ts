// Deviation Analysis Data

export interface TopRepeatingKPI {
  id: string;
  name: string;
  deviationCount: number;
  lastUpdated: string;
  estimatedAnnualRisk: string;
}

export interface TopRepeatingRootCause {
  id: string;
  name: string;
  occurrences: number;
  lastUpdated: string;
  affectedItems: number;
  affectedType: string;
}

export interface ProcessWithFrequency {
  id: string;
  name: string;
  occurrences: number;
  lastUpdated: string;
  kpisImpacted: number;
}

export interface HeatmapData {
  subProcess: string;
  rootCause: string;
  count: number;
  severity: "Critical" | "High" | "Medium" | "Low";
}

export interface RepeatTicketTrend {
  month: string;
  repeatTickets: number;
  totalTickets: number;
  percentage: number;
}

export interface StrategicInsight {
  type: "system" | "control" | "training";
  title: string;
  issue: string;
  recommendation: string;
  expectedImpact?: string;
  timeline?: string;
}

export const topRepeatingKPIs: TopRepeatingKPI[] = [
  {
    id: "1",
    name: "Vendor Master Data Quality",
    deviationCount: 8,
    lastUpdated: "Dec 26",
    estimatedAnnualRisk: "$100K",
  },
  {
    id: "2",
    name: "Invoice Processing Accuracy",
    deviationCount: 12,
    lastUpdated: "Dec 28",
    estimatedAnnualRisk: "$210K",
  },
  {
    id: "3",
    name: "Payment Terms Compliance",
    deviationCount: 6,
    lastUpdated: "Dec 29",
    estimatedAnnualRisk: "$90K",
  },
  {
    id: "4",
    name: "GL Coding Accuracy",
    deviationCount: 5,
    lastUpdated: "Dec 24",
    estimatedAnnualRisk: "$70K",
  },
];

export const topRepeatingRootCauses: TopRepeatingRootCause[] = [
  {
    id: "1",
    name: "Insufficient Process Capacity",
    occurrences: 15,
    lastUpdated: "Dec 29",
    affectedItems: 6,
    affectedType: "sub-processes",
  },
  {
    id: "2",
    name: "Inadequate System Validation",
    occurrences: 11,
    lastUpdated: "Dec 28",
    affectedItems: 4,
    affectedType: "SAP transactions",
  },
  {
    id: "3",
    name: "Policy Ambiguity/Gap",
    occurrences: 9,
    lastUpdated: "Dec 29",
    affectedItems: 3,
    affectedType: "policy areas",
  },
  {
    id: "4",
    name: "Training Gap",
    occurrences: 7,
    lastUpdated: "Dec 18",
    affectedItems: 12,
    affectedType: "users",
  },
];

export const processesWithFrequency: ProcessWithFrequency[] = [
  {
    id: "1",
    name: "Vendor Master Management",
    occurrences: 14,
    lastUpdated: "Dec 26",
    kpisImpacted: 3,
  },
  {
    id: "2",
    name: "Invoice to Cash Application",
    occurrences: 18,
    lastUpdated: "Dec 20",
    kpisImpacted: 4,
  },
  {
    id: "3",
    name: "General Ledger Operations",
    occurrences: 9,
    lastUpdated: "Dec 29",
    kpisImpacted: 2,
  },
];

export const heatmapData: HeatmapData[] = [
  // Vendor Onboarding
  {
    subProcess: "Vendor Onboarding",
    rootCause: "Insufficient Process Capacity",
    count: 8,
    severity: "Critical",
  },
  {
    subProcess: "Vendor Onboarding",
    rootCause: "Inadequate System Validation",
    count: 4,
    severity: "Medium",
  },
  {
    subProcess: "Vendor Onboarding",
    rootCause: "Training Gap",
    count: 2,
    severity: "Medium",
  },

  // Invoice Processing
  {
    subProcess: "Invoice Processing",
    rootCause: "Inadequate System Validation",
    count: 6,
    severity: "High",
  },
  {
    subProcess: "Invoice Processing",
    rootCause: "Policy Ambiguity/Gap",
    count: 5,
    severity: "High",
  },
  {
    subProcess: "Invoice Processing",
    rootCause: "Training Gap",
    count: 3,
    severity: "Medium",
  },

  // Payment Processing
  {
    subProcess: "Payment Processing",
    rootCause: "Insufficient Process Capacity",
    count: 4,
    severity: "Medium",
  },
  {
    subProcess: "Payment Processing",
    rootCause: "Policy Ambiguity/Gap",
    count: 3,
    severity: "Medium",
  },

  // GL Posting
  {
    subProcess: "GL Posting",
    rootCause: "Insufficient Process Capacity",
    count: 3,
    severity: "Medium",
  },
  {
    subProcess: "GL Posting",
    rootCause: "Training Gap",
    count: 2,
    severity: "Medium",
  },

  // Reconciliation
  {
    subProcess: "Reconciliation",
    rootCause: "Inadequate System Validation",
    count: 1,
    severity: "Low",
  },
  {
    subProcess: "Reconciliation",
    rootCause: "Policy Ambiguity/Gap",
    count: 1,
    severity: "Low",
  },
];

export const repeatTicketTrendData: RepeatTicketTrend[] = [
  { month: "Jul 2024", repeatTickets: 8, totalTickets: 15, percentage: 53 },
  { month: "Aug 2024", repeatTickets: 10, totalTickets: 18, percentage: 56 },
  { month: "Sep 2024", repeatTickets: 9, totalTickets: 14, percentage: 64 },
  { month: "Oct 2024", repeatTickets: 7, totalTickets: 13, percentage: 54 },
  { month: "Nov 2024", repeatTickets: 5, totalTickets: 11, percentage: 45 },
  { month: "Dec 2024", repeatTickets: 3, totalTickets: 8, percentage: 38 },
];

export const strategicInsights: StrategicInsight[] = [
  {
    type: "system",
    title: "What the System Is Trying to Tell Us",
    issue:
      "The concentration of repeat deviations in Vendor Onboarding and Invoice Processing, combined with 'Insufficient Process Capacity,' points to structural undersourcing rather than control execution failures.",
    recommendation:
      "Capacity augmentation or automation investment, not just tightening existing controls.",
  },
  {
    type: "control",
    title: "Vendor Master Data Quality",
    issue:
      "Manual validation cannot keep pace with onboarding volume (30+ new vendors/month).",
    recommendation:
      "Implement an SAP vendor master validation workflow with mandatory field checks, automated W-9 collection, and risk-based approval routing.",
    expectedImpact: "Eliminate 80% of data quality repeat tickets.",
  },
  {
    type: "control",
    title: "Invoice Processing Accuracy",
    issue:
      "Three-way matching is performed manually, leading to systemic matching failures not being caught until payment.",
    recommendation:
      "Configure SAP for automatic three-way matching with tolerance-based exception routing and automated vendor notification.",
    expectedImpact: "Reduce invoice exception rate from 18% to <5%.",
  },
  {
    type: "training",
    title: "Training Gap",
    issue:
      "GL coding errors are concentrated among 12 users who received initial SAP training 3+ years ago.",
    recommendation:
      "Mandatory annual SAP FI refresher training for all users with <95% accuracy scores in the previous quarter.",
    timeline: "Q1 2025 implementation.",
  },
  {
    type: "training",
    title: "Policy Ambiguity",
    issue:
      "Payment terms compliance failures stem from an unclear policy on early payment discount approval authority ($10K threshold ambiguous).",
    recommendation:
      "Update Corporate Finance Policy CFP-210 with an explicit dollar-based approval matrix and SAP workflow enforcement.",
    timeline: "Immediate - draft under CFO review.",
  },
];

// Get unique sub-processes and root causes for heatmap
export const getUniqueSubProcesses = (): string[] => {
  return Array.from(new Set(heatmapData.map((item) => item.subProcess)));
};

export const getUniqueRootCauses = (): string[] => {
  return Array.from(new Set(heatmapData.map((item) => item.rootCause)));
};

// Get severity color
export const getSeverityColor = (severity: HeatmapData["severity"]): string => {
  switch (severity) {
    case "Critical":
      return "#DC2626"; // Red
    case "High":
      return "#EA580C"; // Orange
    case "Medium":
      return "#F59E0B"; // Yellow
    case "Low":
      return "#FEF3C7"; // Light Yellow
    default:
      return "#E5E7EB"; // Gray
  }
};

// Get severity background color (lighter)
export const getSeverityBgColor = (
  severity: HeatmapData["severity"]
): string => {
  switch (severity) {
    case "Critical":
      return "#FEE2E2"; // Light Red
    case "High":
      return "#FFEDD5"; // Light Orange
    case "Medium":
      return "#FEF3C7"; // Light Yellow
    case "Low":
      return "#FFFBEB"; // Very Light Yellow
    default:
      return "#F3F4F6"; // Light Gray
  }
};

