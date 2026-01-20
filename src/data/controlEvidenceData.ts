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

export const getControlEvidenceData = (
  kpiName?: string,
  kpiOwner?: string,
  controlType?: "Preventive" | "Detective"
): ControlEvidenceData => {
  return {
    controlId: "FI-CTL-001",
    controlName: "Automated Duplicate Payment Detection",
    associatedKPI: kpiName || "Duplicate Payment Prevention",
    controlType: controlType || "Preventive",
    frequency: "Real-time (every payment run)",
    riskRating: "High",
    controlObjective:
      "Prevent duplicate payments by implementing automated screening to identify and block invoices with matching vendor, amount, and invoice number combinations before payment processing.",
    controlOwner: kpiOwner || "AP Manager - Sarah Chen",
    lastReviewDate: "June 15, 2024",
    complianceStatus: "COMPLIANT",
    soxRelevant: true,
    overallPassRate: "100.00%",
    totalTests: 94000,
    totalPassed: 94000,
    totalExceptions: 0,
    nextReviewDate: "Sep 15, 2024",
    reviewedBy: "Financial Controller - Michael Torres",
    approvedBy: "CFO - Jennifer Martinez",
    remarks:
      "Control is operating effectively with zero false negatives identified in quarterly audit sampling. System uptime 99.97% with no material exceptions. Enhanced vendor master data quality improvements have reduced false positive detections by 34%.",
    evidenceSources: [
      {
        id: "ev-1",
        source: "SAP FI (F110 Payment Program)",
        evidenceType: "System Configuration",
        description:
          "Duplicate invoice check configuration in payment program variant ZAP01",
        availability: "AVAILABLE",
        retention: "10 years",
        lastUpdated: "6/30/2024",
      },
      {
        id: "ev-2",
        source: "SAP FI Custom Report (ZDUPE_CHECK)",
        evidenceType: "Exception Report",
        description:
          "Daily duplicate payment screening results with blocked invoices",
        availability: "AVAILABLE",
        retention: "7 years",
        lastUpdated: "6/30/2024",
      },
      {
        id: "ev-3",
        source: "SAP Application Log (Transaction SLG1)",
        evidenceType: "System Log",
        description:
          "Duplicate detection event log with timestamp and user information",
        availability: "AVAILABLE",
        retention: "3 years",
        lastUpdated: "6/30/2024",
      },
      {
        id: "ev-4",
        source: "SAP FI (Table REGUH)",
        evidenceType: "Transaction Data",
        description:
          "Payment history table with duplicate flag indicators",
        availability: "AVAILABLE",
        retention: "10 years",
        lastUpdated: "6/30/2024",
      },
    ],
    periodPerformance: [
      {
        id: "period-1",
        period: "2024-Q1",
        testsPerformed: 45680,
        passed: 45680,
        failed: 0,
        passRate: "100.00%",
        exceptionsIdentified: 23,
        exceptionsClosed: 23,
      },
      {
        id: "period-2",
        period: "2024-Q2",
        testsPerformed: 48320,
        passed: 48320,
        failed: 0,
        passRate: "100.00%",
        exceptionsIdentified: 18,
        exceptionsClosed: 18,
      },
    ],
  };
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


