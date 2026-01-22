import React from "react";
import {
  LucideIcon,
  AlertTriangle,
  Clock,
  TrendingUp,
  User,
  DollarSign,
  Gauge,
  Settings,
  Database,
} from "lucide-react";
import { SummaryCard } from "../components/roi/cards/SummaryCards";
import { CatalogItem } from "./roiCatalogData";
 
export type ActionStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CLOSED";
export type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type RootCauseCategory = "PROCESS" | "DATA" | "SYSTEM" | "BEHAVIOUR";
export type ROIDimension =
  | "Process Efficiency"
  | "Cash Flow & Working Capital"
  | "Compliance Risk"
  | "Technology Optimization";
 
export interface ActionCardInfo {
  icon: LucideIcon;
  iconGradient: string;
  title: string;
  value?: string;
  description: string | React.ReactNode;
  borderColor: string;
  bgColor: string;
}
 
export interface ActionItem {
  id: string;
  title: string;
  status: ActionStatus;
  priority: Priority;
  issueDescription: string;
  rootCauseCategory: RootCauseCategory;
  impactedROIDimension: ROIDimension;
  recommendedAction: string;
  actionOwner: string;
  dueDate: string;
  estimatedImpact: string;
  linkedEvidence: string;
  progressNotes: string;
  isOverdue: boolean;
  isHighRisk: boolean;
}
 
export interface ActionSummary {
  openActions: number;
  highRiskActions: number;
  overdueActions: number;
  totalActions: number;
}
 
export interface ActionTrackerData {
  kpiName: string;
  moduleName: string;
  summary: ActionSummary;
  actions: ActionItem[];
  categorySummary: {
    PROCESS: number;
    DATA: number;
    SYSTEM: number;
    BEHAVIOUR: number;
  };
}
 
export const getActionTrackerData = (
  kpiName: string,
  moduleName: string
): ActionTrackerData => {
  // Mock data based on the image description
  const actions: ActionItem[] = [
    {
      id: "ACT-004",
      title: "Duplicate Payment Prevention",
      status: "OPEN",
      priority: "LOW",
      issueDescription:
        "Control operating effectively with 90.59%+ detection rate, but false positive rate of 2.8% creates unnecessary AP workload investigating 1,200+ blocked invoices annually that are actually legitimate.",
      rootCauseCategory: "SYSTEM",
      impactedROIDimension: "Process Efficiency",
      recommendedAction:
        "Refine duplicate detection algorithm to exclude invoices with different PO line items. Implement machine learning scoring to prioritize high-confidence duplicates. Add vendor-specific tolerance rules for recurring charges.",
      actionOwner: "IT Applications Team - Financial Systems",
      dueDate: "September 30, 2024",
      estimatedImpact:
        "Reduce false positives by 60%, save 280 AP processing hours annually",
      linkedEvidence: "FI-CTL-001 (Duplicate Payment Detection)",
      progressNotes:
        "Business requirements approved. Technical design phase scheduled for July. Development resources allocated for Q1.",
      isOverdue: true,
      isHighRisk: false,
    },
    {
      id: "ACT-009",
      title: "Duplicate Payment Prevention",
      status: "OPEN",
      priority: "MEDIUM",
      issueDescription:
        "Recovery process for actual duplicate payments detected post-payment averages 45 days and achieves only 73% recovery rate. $127K in unrecovered duplicates over past 12 months.",
      rootCauseCategory: "PROCESS",
      impactedROIDimension: "Cash Flow & Working Capital",
      recommendedAction:
        "Establish dedicated duplicate recovery workflow with automated vendor notifications. Implement systematic offset against future invoices where legally permitted. Engage collections agency for aged unrecovered amounts over $5K.",
      actionOwner: "Sarah Chen (AP Manager)",
      dueDate: "July 31, 2024",
      estimatedImpact: "Improve recovery rate to 95%, recover $95K annually",
      linkedEvidence: "FI-CTL-001 (Duplicate Payment Detection)",
      progressNotes:
        "Initiative just approved. Process design and resource allocation in planning stage.",
      isOverdue: true,
      isHighRisk: true,
    },
    {
      id: "ACT-001",
      title: "Vendor Master Data Quality",
      status: "OPEN",
      priority: "HIGH",
      issueDescription:
        "Incomplete vendor master data fields causing delays in payment processing and compliance checks.",
      rootCauseCategory: "DATA",
      impactedROIDimension: "Process Efficiency",
      recommendedAction:
        "Implement automated data validation rules and vendor onboarding checklist. Schedule quarterly data quality audits.",
      actionOwner: "Data Management Team",
      dueDate: "August 15, 2024",
      estimatedImpact:
        "Reduce payment processing time by 25%, eliminate 150+ manual interventions monthly",
      linkedEvidence: "FI-CTL-002 (Vendor Master Management)",
      progressNotes:
        "Data validation rules drafted. Awaiting IT approval for implementation.",
      isOverdue: false,
      isHighRisk: true,
    },
    {
      id: "ACT-005",
      title: "Three-Way Match Automation",
      status: "IN_PROGRESS",
      priority: "MEDIUM",
      issueDescription:
        "Manual three-way matching process taking 4-6 hours per batch, causing payment delays.",
      rootCauseCategory: "SYSTEM",
      impactedROIDimension: "Process Efficiency",
      recommendedAction:
        "Deploy automated three-way matching system with exception handling workflow.",
      actionOwner: "IT Applications Team - Financial Systems",
      dueDate: "October 31, 2024",
      estimatedImpact:
        "Reduce processing time by 80%, enable same-day payment processing",
      linkedEvidence: "FI-CTL-003 (Three-Way Match Control)",
      progressNotes:
        "System testing in progress. User acceptance testing scheduled for mid-September.",
      isOverdue: false,
      isHighRisk: false,
    },
    {
      id: "ACT-007",
      title: "Payment Approval Workflow",
      status: "OPEN",
      priority: "HIGH",
      issueDescription:
        "Payment approvals stuck in workflow bottlenecks, causing vendor relationship issues.",
      rootCauseCategory: "PROCESS",
      impactedROIDimension: "Process Efficiency",
      recommendedAction:
        "Redesign approval matrix with escalation rules. Implement automated reminders and delegation capabilities.",
      actionOwner: "Finance Process Owner",
      dueDate: "September 15, 2024",
      estimatedImpact:
        "Reduce approval cycle time by 40%, improve vendor satisfaction",
      linkedEvidence: "FI-CTL-004 (Payment Authorization)",
      progressNotes:
        "Approval matrix review completed. Stakeholder alignment in progress.",
      isOverdue: false,
      isHighRisk: true,
    },
    {
      id: "ACT-012",
      title: "Fraud Detection Training",
      status: "OPEN",
      priority: "LOW",
      issueDescription:
        "AP staff lacking awareness of fraud indicators and detection techniques.",
      rootCauseCategory: "BEHAVIOUR",
      impactedROIDimension: "Compliance Risk",
      recommendedAction:
        "Develop comprehensive fraud awareness training program. Conduct quarterly refresher sessions.",
      actionOwner: "HR & Compliance Team",
      dueDate: "November 30, 2024",
      estimatedImpact:
        "Improve fraud detection rate by 30%, reduce false positives",
      linkedEvidence: "FI-CTL-005 (Fraud Prevention)",
      progressNotes:
        "Training content under development. Pilot session scheduled for October.",
      isOverdue: false,
      isHighRisk: false,
    },
    {
      id: "ACT-003",
      title: "Bank Reconciliation Automation",
      status: "OPEN",
      priority: "MEDIUM",
      issueDescription:
        "Monthly bank reconciliation taking 3-4 days with high manual effort.",
      rootCauseCategory: "SYSTEM",
      impactedROIDimension: "Process Efficiency",
      recommendedAction:
        "Implement automated bank reconciliation tool with exception management.",
      actionOwner: "Treasury Operations",
      dueDate: "December 31, 2024",
      estimatedImpact:
        "Reduce reconciliation time to 4 hours, free up 35 hours monthly",
      linkedEvidence: "FI-CTL-006 (Bank Reconciliation)",
      progressNotes:
        "Tool evaluation completed. Procurement process initiated.",
      isOverdue: false,
      isHighRisk: false,
    },
    {
      id: "ACT-008",
      title: "AP Aging Analysis",
      status: "OPEN",
      priority: "MEDIUM",
      issueDescription:
        "Lack of real-time visibility into AP aging affecting cash flow planning.",
      rootCauseCategory: "DATA",
      impactedROIDimension: "Cash Flow & Working Capital",
      recommendedAction:
        "Develop automated AP aging dashboard with drill-down capabilities.",
      actionOwner: "Finance Analytics Team",
      dueDate: "September 30, 2024",
      estimatedImpact: "Improve cash flow forecasting accuracy by 20%",
      linkedEvidence: "FI-CTL-007 (AP Management)",
      progressNotes:
        "Dashboard design approved. Development starting next week.",
      isOverdue: false,
      isHighRisk: false,
    },
    {
      id: "ACT-011",
      title: "Vendor Payment Terms Optimization",
      status: "IN_PROGRESS",
      priority: "HIGH",
      issueDescription:
        "Suboptimal payment terms negotiation causing early payments and cash flow inefficiencies.",
      rootCauseCategory: "PROCESS",
      impactedROIDimension: "Cash Flow & Working Capital",
      recommendedAction:
        "Establish vendor payment terms negotiation framework. Review and renegotiate top 100 vendor terms.",
      actionOwner: "Procurement & Finance",
      dueDate: "October 15, 2024",
      estimatedImpact:
        "Improve working capital by $2.5M, extend payment terms by average 15 days",
      linkedEvidence: "FI-CTL-008 (Payment Terms Management)",
      progressNotes:
        "Framework approved. Top 20 vendors renegotiated. Continuing with remaining vendors.",
      isOverdue: false,
      isHighRisk: true,
    },
    {
      id: "ACT-006",
      title: "1099 Reporting Compliance",
      status: "OPEN",
      priority: "LOW",
      issueDescription:
        "Manual 1099 preparation process prone to errors and delays.",
      rootCauseCategory: "PROCESS",
      impactedROIDimension: "Compliance Risk",
      recommendedAction:
        "Automate 1099 reporting process with integrated validation checks.",
      actionOwner: "Tax Compliance Team",
      dueDate: "November 15, 2024",
      estimatedImpact:
        "Eliminate reporting errors, reduce preparation time by 60%",
      linkedEvidence: "FI-CTL-009 (Tax Reporting)",
      progressNotes:
        "Requirements gathering phase. Vendor evaluation in progress.",
      isOverdue: false,
      isHighRisk: false,
    },
    {
      id: "ACT-010",
      title: "E-Invoicing Implementation",
      status: "OPEN",
      priority: "MEDIUM",
      issueDescription:
        "High volume of paper invoices requiring manual data entry.",
      rootCauseCategory: "SYSTEM",
      impactedROIDimension: "Process Efficiency",
      recommendedAction:
        "Deploy e-invoicing portal with OCR capabilities for remaining paper invoices.",
      actionOwner: "IT Applications Team - Financial Systems",
      dueDate: "January 31, 2025",
      estimatedImpact:
        "Reduce manual data entry by 70%, improve processing accuracy",
      linkedEvidence: "FI-CTL-010 (Invoice Processing)",
      progressNotes: "Vendor selected. Implementation planning phase.",
      isOverdue: false,
      isHighRisk: false,
    },
    {
      id: "ACT-002",
      title: "Internal Controls Documentation",
      status: "OPEN",
      priority: "LOW",
      issueDescription:
        "Outdated internal controls documentation requiring comprehensive review and update.",
      rootCauseCategory: "BEHAVIOUR",
      impactedROIDimension: "Compliance Risk",
      recommendedAction:
        "Conduct comprehensive documentation review. Update all control narratives and flowcharts.",
      actionOwner: "Internal Audit Team",
      dueDate: "December 31, 2024",
      estimatedImpact: "Ensure SOX compliance, improve audit readiness",
      linkedEvidence: "FI-CTL-011 (Internal Controls)",
      progressNotes: "Audit scope defined. Documentation review initiated.",
      isOverdue: false,
      isHighRisk: false,
    },
  ];
 
  const openActions = actions.filter(
    (a) => a.status === "OPEN" || a.status === "IN_PROGRESS"
  ).length;
  const highRiskActions = actions.filter((a) => a.isHighRisk).length;
  const overdueActions = actions.filter((a) => a.isOverdue).length;
 
  const categorySummary = {
    PROCESS: actions.filter((a) => a.rootCauseCategory === "PROCESS").length,
    DATA: actions.filter((a) => a.rootCauseCategory === "DATA").length,
    SYSTEM: actions.filter((a) => a.rootCauseCategory === "SYSTEM").length,
    BEHAVIOUR: actions.filter((a) => a.rootCauseCategory === "BEHAVIOUR")
      .length,
  };
 
  return {
    kpiName: kpiName || "Duplicate Payment Prevention",
    moduleName: moduleName || "SAP FI",
    summary: {
      openActions,
      highRiskActions,
      overdueActions,
      totalActions: actions.length,
    },
    actions,
    categorySummary,
  };
};
 
export const getCategoryIcon = (category: RootCauseCategory): LucideIcon => {
  const iconMap: Record<RootCauseCategory, LucideIcon> = {
    PROCESS: Settings,
    DATA: Database,
    SYSTEM: Gauge,
    BEHAVIOUR: User,
  };
  return iconMap[category];
};
 
export const getROIDimensionIcon = (dimension: ROIDimension): LucideIcon => {
  const iconMap: Record<ROIDimension, LucideIcon> = {
    "Process Efficiency": TrendingUp,
    "Cash Flow & Working Capital": DollarSign,
    "Compliance Risk": AlertTriangle,
    "Technology Optimization": Gauge,
  };
  return iconMap[dimension];
};
 
export const getCategoryColor = (category: RootCauseCategory): string => {
  const colorMap: Record<RootCauseCategory, string> = {
    PROCESS: "#4160F0",
    DATA: "#10b981",
    SYSTEM: "#FF6700",
    BEHAVIOUR: "#f59e0b",
  };
  return colorMap[category];
};
 
export const getPriorityColor = (priority: Priority): string => {
  const colorMap: Record<Priority, string> = {
    LOW: "#10b981",
    MEDIUM: "#f59e0b",
    HIGH: "#ef4444",
    CRITICAL: "#dc2626",
  };
  return colorMap[priority];
};
 
export const getStatusColor = (status: ActionStatus): string => {
  const colorMap: Record<ActionStatus, string> = {
    OPEN: "#10b981",
    IN_PROGRESS: "#4160F0",
    COMPLETED: "#6b7280",
    CLOSED: "#9ca3af",
  };
  return colorMap[status];
};
 
export interface ActionCardData {
  id: string;
  category: RootCauseCategory;
  title: string;
  status: ActionStatus;
  priority: Priority;
  isOverdue: boolean;
  rootCauseCategory: RootCauseCategory;
  impactedROIDimension: ROIDimension;
  issueDescription: string;
  recommendedActions: string[];
  estimatedImpact: string[];
  owner: string;
  dueDate: string;
  linkedEvidence: string;
  progressNotes: string;
}
 
export const convertActionToCardData = (action: ActionItem): ActionCardData => {
  return {
    id: action.id,
    category: action.rootCauseCategory,
    title: action.title,
    status: action.status,
    priority: action.priority,
    isOverdue: action.isOverdue,
    rootCauseCategory: action.rootCauseCategory,
    impactedROIDimension: action.impactedROIDimension,
    issueDescription: action.issueDescription,
    recommendedActions: action.recommendedAction.split(". ").filter(Boolean),
    estimatedImpact: [action.estimatedImpact],
    owner: action.actionOwner,
    dueDate: action.dueDate,
    linkedEvidence: action.linkedEvidence,
    progressNotes: action.progressNotes,
  };
};
 
export const getSummaryCards = (summary: ActionSummary): SummaryCard[] => [
  {
    title: "OPEN ACTIONS",
    value: summary.openActions,
    icon: TrendingUp,
    color: "#4160F0",
    description: "Requiring attention or in progress",
  },
  {
    title: "HIGH-RISK ACTIONS",
    value: summary.highRiskActions,
    icon: AlertTriangle,
    color: "#ef4444",
    description: "Critical priority requiring immediate focus",
  },
  {
    title: "OVERDUE ACTIONS",
    value: summary.overdueActions,
    icon: Clock,
    color: "#dc2626",
    description: "Past due date and require escalation",
  },
];
 
export const getCategorySummaryCards = (categorySummary: {
  PROCESS: number;
  DATA: number;
  SYSTEM: number;
  BEHAVIOUR: number;
}): SummaryCard[] => [
  {
    title: "PROCESS",
    value: categorySummary.PROCESS,
    icon: Settings,
    color: "#4160F0",
    description: "Workflow & procedure issues",
  }
];
 
export const convertActionToCatalogItem = (action: ActionItem): CatalogItem => {
  const ROIIcon = getROIDimensionIcon(action.impactedROIDimension);
 
  return {
    id: action.id,
    category: action.rootCauseCategory,
    productSuite: action.title,
    vendor: action.actionOwner,
    roiDimensions: [
      {
        label: action.impactedROIDimension,
        icon: ROIIcon,
        color: "#4160F0",
      },
    ],
    primaryROIMetrics: action.recommendedAction.split(". ").filter(Boolean),
    dataSources: [action.issueDescription, action.estimatedImpact],
    integrationMethod: `${action.status.replace("_", " ")} | ${
      action.priority
    }${action.isOverdue ? " | OVERDUE" : ""}`,
    updateFrequency: action.dueDate,
  };
};