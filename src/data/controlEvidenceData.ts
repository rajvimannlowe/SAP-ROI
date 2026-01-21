import {
  TrendingUp,
  Shield,
  Clock,
  AlertCircle,
  User,
  Database,
  // CheckCircle2,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface EvidenceSource {
  id: string;
  source: string;
  evidenceType: string;
  description: string;
  availability: "AVAILABLE" | "UNAVAILABLE";
  retention: string;
  lastUpdated: string;
}

export interface PeriodPerformance {
  id: string;
  period: string;
  testsPerformed: number;
  passed: number;
  failed: number;
  passRate: string;
  exceptionsIdentified: number;
  exceptionsClosed: number;
}

export interface ControlEvidenceData {
  controlId: string;
  controlName: string;
  associatedKPI: string;
  controlType: "Preventive" | "Detective";
  frequency: string;
  riskRating: string;
  controlObjective: string;
  controlOwner: string;
  lastReviewDate: string;
  complianceStatus: "COMPLIANT" | "NON-COMPLIANT";
  soxRelevant: boolean;
  overallPassRate: string;
  totalTests: number;
  totalPassed: number;
  totalExceptions: number;
  nextReviewDate: string;
  reviewedBy: string;
  approvedBy: string;
  remarks: string;
  evidenceSources: EvidenceSource[];
  periodPerformance: PeriodPerformance[];
}

// Computed Field: Calculate Overall Pass Rate from SAP-derived data
export const calculatePassRate = (
  totalTests: number,
  totalExceptions: number
): string => {
  if (totalTests === 0) return "0.00%";
  const passRate = ((totalTests - totalExceptions) / totalTests) * 100;
  return `${passRate.toFixed(2)}%`;
};

// TODO: This function will be replaced with SAP API call
// SAP-Derived Fields: Read from SAP tables (ANLA, BKPF/BSEG, REGUH, etc.)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSAPDerivedData = async (_controlId: string) => {
  // TODO: Replace with actual SAP API call
  // Example: Read from SAP table ANLA for asset count
  // Example: Read from exception reports for exception count
  return {
    totalTests: 12480, // TODO: From SAP - ANLA count
    totalExceptions: 100, // TODO: From SAP - Exception report count
  };
};

export const getControlEvidenceData = (
  _kpiName?: string,
  kpiOwner?: string,
  controlType?: "Preventive" | "Detective"
): ControlEvidenceData => {
  // TODO: Static Fields should come from configuration/metadata layer
  // For now, using dummy data - these will be stored in config table
  const staticFields = {
    controlId: "FI-AA-001",
    controlName: "Depreciation key configuration",
    associatedKPI: "Depreciation key configuration",
    controlType: controlType || "Preventive",
    frequency: "Configuration-time with periodic review",
    riskRating: "High",
    controlObjective:
      "Ensure depreciation keys are correctly configured and consistently applied to avoid asset valuation and depreciation misstatement",
  };

  // TODO: SAP-Derived Fields - Replace with actual SAP API call
  // For now, using dummy data
  const sapDerivedData = {
    totalTests: 12480, // TODO: From SAP - ANLA count
    totalExceptions: 100, // TODO: From SAP - Exception report count
  };

  // Computed Field: Calculate from SAP-derived data
  const overallPassRate = calculatePassRate(
    sapDerivedData.totalTests,
    sapDerivedData.totalExceptions
  );
  const totalPassed = sapDerivedData.totalTests - sapDerivedData.totalExceptions;

  // TODO: Entry Screen Fields - These will come from database (user input)
  // For now, using dummy data
  const entryScreenFields = {
    lastReviewDate: "15-Jun-24",
    reviewedBy: "Financial Controller",
    approvedBy: "CFO",
    remarks:
      "Depreciation keys are consistently applied; identified exceptions corrected without material impact",
    complianceStatus: "COMPLIANT" as const,
  };

  return {
    ...staticFields,
    controlOwner: kpiOwner || "Entity Screen",
    ...entryScreenFields,
    soxRelevant: true,
    overallPassRate, // Computed field
    totalTests: sapDerivedData.totalTests, // SAP-derived
    totalPassed, // Computed
    totalExceptions: sapDerivedData.totalExceptions, // SAP-derived
    nextReviewDate: "15-Sep-24", // TODO: Calculated from lastReviewDate + review frequency
    reviewedBy: "Financial Controller",
    approvedBy: "CFO",
    remarks:
      "Depreciation keys are consistently applied; identified exceptions corrected without material impact",
    evidenceSources: [
      {
        id: "ev-1",
        source: "SAP FI-AA",
        evidenceType: "System Configuration",
        description:
          "Depreciation key setup (method, useful life, posting parameters) and detection of assets with incorrect or inconsistent keys",
        availability: "AVAILABLE",
        retention: "10 years",
        lastUpdated: "15-Jun-24",
      },
      {
        id: "ev-2",
        source: "SAP FI-AA",
        evidenceType: "Exception Report",
        description:
          "Exception report identifying assets with incorrect or inconsistent depreciation keys",
        availability: "AVAILABLE",
        retention: "7 years",
        lastUpdated: "15-Jun-24",
      },
      {
        id: "ev-3",
        source: "SAP FI-AA",
        evidenceType: "Transaction Data",
        description:
          "Transaction data showing depreciation key assignments and postings",
        availability: "AVAILABLE",
        retention: "10 years",
        lastUpdated: "15-Jun-24",
      },
    ],
    periodPerformance: [
      {
        id: "period-1",
        period: "2024-Q2",
        testsPerformed: 12480,
        passed: 12380,
        failed: 100,
        passRate: "99.20%",
        exceptionsIdentified: 100,
        exceptionsClosed: 100,
      },
    ],
  };
};

// Control Evidence Flow Rule Interface
export interface ControlRule {
  id: string;
  module: string;
  subModule: string;
  ruleId: string;
  ruleTitle: string;
  associatedKPI: string;
  controlType: string;
  frequency: string;
  riskRating: string;
  controlObjective: string;
  evidenceType: string;
  evidenceSystem: string;
  evidenceAvailability: string;
  evidenceDescription: string;
  overallPassRate: string;
  totalItems: number;
  totalExceptions: number;
  lastReviewDate: string;
  reviewedBy: string;
  approvedBy: string;
  finalAssessmentStatus: string;
  assessmentNarrative: string;
}

// Get dummy control evidence flow data
export const getControlEvidenceFlowData = (): ControlRule[] => {
  return [
    {
      id: "1",
      module: "FI",
      subModule: "AA",
      ruleId: "FI-AA-001",
      ruleTitle: "Depreciation key configuration",
      associatedKPI: "Depreciation key configuration",
      controlType: "Preventive",
      frequency: "Configuration-time with periodic review",
      riskRating: "High",
      controlObjective:
        "Ensure depreciation keys are correctly configured and consistently applied to avoid asset valuation and depreciation misstatement",
      evidenceType: "System Configuration / Exception Report / Transaction Data",
      evidenceSystem: "SAP FI-AA",
      evidenceAvailability: "Available",
      evidenceDescription:
        "Depreciation key setup (method, useful life, posting parameters) and detection of assets with incorrect or inconsistent keys",
      overallPassRate: "97.50%",
      totalItems: 12000,
      totalExceptions: 300,
      lastReviewDate: "19-Jul-24",
      reviewedBy: "Entity Screen",
      approvedBy: "Entity Screen",
      finalAssessmentStatus: "Control Operating effectively",
      assessmentNarrative:
        "Depreciation keys are consistently applied, identified exceptions corrected without material impact",
    },
    {
      id: "2",
      module: "FI",
      subModule: "AA",
      ruleId: "FI-AA-002",
      ruleTitle: "Capitalization threshold",
      associatedKPI: "Capitalization threshold",
      controlType: "Preventive",
      frequency: "Transaction-time with periodic review",
      riskRating: "High",
      controlObjective:
        "Ensure capitalization thresholds are enforced to prevent inaccurate capitalization of expenses",
      evidenceType: "Transaction Data / Exception Report",
      evidenceSystem: "SAP FI-AA",
      evidenceAvailability: "Available",
      evidenceDescription:
        "Detection of assets below capitalization threshold incorrectly capitalized or vice versa",
      overallPassRate: "98.20%",
      totalItems: 8260,
      totalExceptions: 150,
      lastReviewDate: "20-Jul-24",
      reviewedBy: "Entity Screen",
      approvedBy: "Entity Screen",
      finalAssessmentStatus: "Control Operating effectively",
      assessmentNarrative:
        "Capitalization threshold consistently enforced, minor exceptions identified and corrected",
    },
    {
      id: "3",
      module: "FI",
      subModule: "AA",
      ruleId: "FI-AA-003",
      ruleTitle: "Asset retirement validation",
      associatedKPI: "Asset retirement validation",
      controlType: "Preventive + Detective",
      frequency: "Event-driven with periodic review",
      riskRating: "Medium",
      controlObjective:
        "Ensure asset retirements are properly authorized and recorded to prevent asset valuation misstatement",
      evidenceType: "Transaction Data / Exception Report",
      evidenceSystem: "SAP FI-AA",
      evidenceAvailability: "Available",
      evidenceDescription:
        "Validation of retirement transactions with authorization check and completeness verification",
      overallPassRate: "99.80%",
      totalItems: 560,
      totalExceptions: 1,
      lastReviewDate: "22-Jul-24",
      reviewedBy: "Entity Screen",
      approvedBy: "Entity Screen",
      finalAssessmentStatus: "Control Operating effectively",
      assessmentNarrative:
        "All retirement transactions properly authorized and recorded, no material exceptions",
    },
    {
      id: "4",
      module: "FI",
      subModule: "AA",
      ruleId: "FI-AA-004",
      ruleTitle: "Reconciliation with GL",
      associatedKPI: "Reconciliation with GL",
      controlType: "Detective",
      frequency: "Periodic (monthly/quarterly)",
      riskRating: "High",
      controlObjective:
        "Ensure fixed asset subledger balances reconcile with GL balances",
      evidenceType: "Transaction Data / Exception Report",
      evidenceSystem: "SAP FI-AA / GL",
      evidenceAvailability: "Available",
      evidenceDescription:
        "Reconciliation of asset balances between FI-AA and GL with variance identification",
      overallPassRate: "100.00%",
      totalItems: 12,
      totalExceptions: 0,
      lastReviewDate: "03-Aug-24",
      reviewedBy: "Entity Screen",
      approvedBy: "Entity Screen",
      finalAssessmentStatus: "Control Operating effectively",
      assessmentNarrative:
        "FI-AA and GL balances fully reconciled with no differences",
    },
    {
      id: "5",
      module: "FI",
      subModule: "AA",
      ruleId: "FI-AA-005",
      ruleTitle: "CWIP aging analysis",
      associatedKPI: "CWIP aging analysis",
      controlType: "Detective",
      frequency: "Periodic (monthly)",
      riskRating: "Medium",
      controlObjective:
        "Monitor and manage capital work in progress (CWIP) to prevent misclassification and ensure timely capitalization",
      evidenceType: "Transaction Data / Exception Report",
      evidenceSystem: "SAP FI-AA",
      evidenceAvailability: "Available",
      evidenceDescription:
        "Aging analysis of CWIP assets with identification of long-duration items requiring review",
      overallPassRate: "96.00%",
      totalItems: 2560,
      totalExceptions: 102,
      lastReviewDate: "15-Jul-24",
      reviewedBy: "Entity Screen",
      approvedBy: "Entity Screen",
      finalAssessmentStatus: "Control Operating effectively",
      assessmentNarrative:
        "CWIP aging monitored effectively, exceptions reviewed and resolved appropriately",
    },
    {
      id: "6",
      module: "FI",
      subModule: "AA",
      ruleId: "FI-AA-006",
      ruleTitle: "Duplicate asset master detection",
      associatedKPI: "Duplicate asset master detection",
      controlType: "Detective",
      frequency: "Continuous with periodic review",
      riskRating: "Medium",
      controlObjective:
        "Prevent duplicate asset master records that could lead to misstatement and control weaknesses",
      evidenceType: "Master Data / Exception Report",
      evidenceSystem: "SAP FI-AA",
      evidenceAvailability: "Available",
      evidenceDescription:
        "Detection of potential duplicate assets based on description, acquisition date, cost, and asset class",
      overallPassRate: "99.60%",
      totalItems: 12500,
      totalExceptions: 50,
      lastReviewDate: "18-Jul-24",
      reviewedBy: "Entity Screen",
      approvedBy: "Entity Screen",
      finalAssessmentStatus: "Control Operating effectively",
      assessmentNarrative:
        "Duplicate asset candidates reviewed and remediated where applicable",
    },
    {
      id: "7",
      module: "FI",
      subModule: "AA",
      ruleId: "FI-AA-007",
      ruleTitle: "Asset class governance",
      associatedKPI: "Asset class governance",
      controlType: "Preventive",
      frequency: "Configuration-time with periodic review",
      riskRating: "Medium",
      controlObjective:
        "Ensure asset classes are properly configured and consistently used for accurate categorization and reporting",
      evidenceType: "System Configuration / Exception Report",
      evidenceSystem: "SAP FI-AA",
      evidenceAvailability: "Available",
      evidenceDescription:
        "Asset class configuration review and detection of assets assigned to incorrect or inconsistent asset classes",
      overallPassRate: "98.50%",
      totalItems: 11000,
      totalExceptions: 165,
      lastReviewDate: "25-Jul-24",
      reviewedBy: "Entity Screen",
      approvedBy: "Entity Screen",
      finalAssessmentStatus: "Control Operating effectively",
      assessmentNarrative:
        "Asset class governance maintained effectively, exceptions reviewed and corrected",
    },
    {
      id: "8",
      module: "FI",
      subModule: "AA",
      ruleId: "FI-AA-008",
      ruleTitle: "Depreciation run automation",
      associatedKPI: "Depreciation run automation",
      controlType: "Preventive",
      frequency: "Periodic (monthly)",
      riskRating: "High",
      controlObjective:
        "Ensure depreciation is calculated and posted accurately and timely through automated processes",
      evidenceType: "System Configuration / Transaction Data / Exception Report",
      evidenceSystem: "SAP FI-AA",
      evidenceAvailability: "Available",
      evidenceDescription:
        "Automated depreciation run configuration and execution logs with exception identification",
      overallPassRate: "99.95%",
      totalItems: 12000,
      totalExceptions: 6,
      lastReviewDate: "01-Aug-24",
      reviewedBy: "Entity Screen",
      approvedBy: "Entity Screen",
      finalAssessmentStatus: "Control Operating effectively",
      assessmentNarrative:
        "Depreciation runs executed successfully with minimal exceptions, all resolved timely",
    },
    {
      id: "9",
      module: "FI",
      subModule: "AA",
      ruleId: "FI-AA-009",
      ruleTitle: "Lease or Buy Accounting",
      associatedKPI: "Lease or Buy Accounting",
      controlType: "Detective",
      frequency: "Periodic (quarterly/annual)",
      riskRating: "High",
      controlObjective:
        "Ensure lease vs buy decisions are properly evaluated and lease accounting standards are correctly applied",
      evidenceType: "Contract Data / Exception Report",
      evidenceSystem: "SAP FI-AA / Lease Module",
      evidenceAvailability: "Available",
      evidenceDescription:
        "Review of lease agreements and lease accounting application compliance with IFRS 16 / ASC 842",
      overallPassRate: "97.80%",
      totalItems: 250,
      totalExceptions: 5,
      lastReviewDate: "28-Jul-24",
      reviewedBy: "Entity Screen",
      approvedBy: "Entity Screen",
      finalAssessmentStatus: "Control Operating effectively",
      assessmentNarrative:
        "Lease accounting properly applied, exceptions reviewed and corrected",
    },
    {
      id: "10",
      module: "FI",
      subModule: "AP",
      ruleId: "FI-AP-016",
      ruleTitle: "Vendor duplicate check",
      associatedKPI: "Vendor duplicate check",
      controlType: "Preventive + Detective",
      frequency: "Transaction-time with periodic review",
      riskRating: "High",
      controlObjective:
        "Prevent duplicate vendor payments and fraud risk through vendor master data duplicate detection",
      evidenceType: "Master Data / Exception Report",
      evidenceSystem: "SAP FI-AP",
      evidenceAvailability: "Available",
      evidenceDescription:
        "Duplicate vendor searches based on vendor name, PAN/VAT, bank account, and address",
      overallPassRate: "98.75%",
      totalItems: 8500,
      totalExceptions: 106,
      lastReviewDate: "05-Aug-24",
      reviewedBy: "Entity Screen",
      approvedBy: "Entity Screen",
      finalAssessmentStatus: "Control Operating effectively",
      assessmentNarrative:
        "Duplicate vendor detection effective, potential duplicates reviewed and merged where appropriate",
    },
  ];
};

// Helper function to get icon for control overview
export const getControlOverviewIcon = (
  type: string
): { icon: LucideIcon; color: string } => {
  const iconMap: Record<string, { icon: LucideIcon; color: string }> = {
    kpi: { icon: TrendingUp, color: "#2563eb" },
    type: { icon: Shield, color: "#6366f1" },
    frequency: { icon: Clock, color: "#10b981" },
    risk: { icon: AlertCircle, color: "#ef4444" },
    owner: { icon: User, color: "#9333ea" },
    review: { icon: Clock, color: "#f59e0b" },
  };
  return iconMap[type] || { icon: Database, color: "#6b7280" };
};



