import { DeviationTicketData } from "./ticketDeviationTableConfig";

export const deviationTicketData: DeviationTicketData[] = [
  {
    ticketId: "TKT-2025-1043",
    relatedKPI: "Vendor Master Data Quality",
    subProcess: "Accounts Payable",
    deviationType: "Threshold Breach",
    severity: "High",
    businessImpact: "Duplicate payment risk, vendor fraud exposure",
    estCost: "$180K",
    assignedTo: "Michael Torres",
    status: "Open",
    dueDate: "30/12/2025"
  },
  {
    ticketId: "TKT-2025-1044",
    relatedKPI: "Invoice Processing Accuracy",
    subProcess: "Accounts Payable",
    deviationType: "Data Quality Issue",
    severity: "Medium",
    businessImpact: "Manual intervention required, processing delays",
    estCost: "$95K",
    assignedTo: "Sarah Chen",
    status: "In Progress",
    dueDate: "28/12/2025"
  },
  {
    ticketId: "TKT-2025-1045",
    relatedKPI: "Payment Authorization Controls",
    subProcess: "Treasury Management",
    deviationType: "Control Bypass",
    severity: "High",
    businessImpact: "Unauthorized payments, compliance violation",
    estCost: "$250K",
    assignedTo: "David Rodriguez",
    status: "Open",
    dueDate: "25/12/2025"
  },
  {
    ticketId: "TKT-2025-1046",
    relatedKPI: "Reconciliation Timeliness",
    subProcess: "General Ledger",
    deviationType: "Process Deviation",
    severity: "Low",
    businessImpact: "Delayed month-end close, reporting delays",
    estCost: "$45K",
    assignedTo: "Emma Wilson",
    status: "Closed",
    dueDate: "20/12/2025"
  },
  {
    ticketId: "TKT-2025-1047",
    relatedKPI: "Expense Approval Workflow",
    subProcess: "Expense Management",
    deviationType: "Approval Bypass",
    severity: "Medium",
    businessImpact: "Policy violations, budget overruns",
    estCost: "$120K",
    assignedTo: "James Park",
    status: "In Progress",
    dueDate: "02/01/2026"
  },
  {
    ticketId: "TKT-2025-1048",
    relatedKPI: "Asset Depreciation Accuracy",
    subProcess: "Fixed Assets",
    deviationType: "Calculation Error",
    severity: "Low",
    businessImpact: "Financial statement misstatement risk",
    estCost: "$35K",
    assignedTo: "Lisa Thompson",
    status: "Open",
    dueDate: "15/01/2026"
  },
  {
    ticketId: "TKT-2025-1049",
    relatedKPI: "Cash Flow Forecasting",
    subProcess: "Treasury Management",
    deviationType: "Data Inconsistency",
    severity: "Medium",
    businessImpact: "Liquidity planning issues, investment delays",
    estCost: "$85K",
    assignedTo: "Robert Kim",
    status: "Open",
    dueDate: "08/01/2026"
  },
  {
    ticketId: "TKT-2025-1050",
    relatedKPI: "Tax Compliance Monitoring",
    subProcess: "Tax Management",
    deviationType: "Regulatory Breach",
    severity: "High",
    businessImpact: "Tax penalties, audit risk, compliance issues",
    estCost: "$300K",
    assignedTo: "Maria Garcia",
    status: "Open",
    dueDate: "31/12/2025"
  }
];