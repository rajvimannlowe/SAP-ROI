import { StatusType } from "./statusMapping";

export interface SubModule {
  id: string;
  name: string;
  status: StatusType;
  healthPercentage: number;
}

export interface KPIDetail {
  id: string;
  name: string;
  businessRiskPrevented: string;
  controlType: "Preventive" | "Detective";
  status: StatusType;
  owner: string;
  recommendedAction: string;
  subModuleId: string;
  // Extended fields for detail view
  businessObjective?: string;
  roiDimension?: string;
  businessContext?: string;
  calculationLogic?: string;
  dataSources?: string[];
  updateFrequency?: string;
  targetValue?: string;
  thresholds?: {
    green: string;
    amber: string;
    red: string;
  };
  currentMeasuredValue?: string;
  statusAnalysis?: string;
  ownerDepartment?: string;
  lastUpdated?: string;
}

export interface ModuleCockpitData {
  moduleId: string;
  moduleName: string;
  moduleLabel: string;
  lastUpdated: string;
  summaryMetrics: {
    overallROIHealth: {
      value: string;
      status: StatusType;
      description: string;
    };
    financialValueAtRisk: {
      value: string;
      description: string;
    };
    controlCoverage: {
      value: string;
      total: number;
      active: number;
      description: string;
    };
    kpiStatus: {
      green: number;
      amber: number;
      red: number;
      total: number;
      description: string;
    };
  };
  subModules: SubModule[];
  kpiDetails: KPIDetail[];
  executiveSummary: string;
}

// Mock data for SAP FI module
export const FI_MODULE_COCKPIT: ModuleCockpitData = {
  moduleId: "fi",
  moduleName: "FI",
  moduleLabel: "Financial Accounting",
  lastUpdated: "Jan 5, 2025",
  summaryMetrics: {
    overallROIHealth: {
      value: "87%",
      status: "Optimal",
      description: "Strong performance across all controls",
    },
    financialValueAtRisk: {
      value: "$124M",
      description: "Fraud prevention & error reduction",
    },
    controlCoverage: {
      value: "92%",
      total: 200,
      active: 184,
      description: "184 of 200 critical controls active",
    },
    kpiStatus: {
      green: 24,
      amber: 3,
      red: 1,
      total: 28,
      description: "28 total KPIs monitored",
    },
  },
  subModules: [
    {
      id: "gl",
      name: "General Ledger",
      status: "Optimal",
      healthPercentage: 87,
    },
    {
      id: "ap",
      name: "Accounts Payable",
      status: "Monitor",
      healthPercentage: 70,
    },
    {
      id: "ar",
      name: "Accounts Receivable",
      status: "Optimal",
      healthPercentage: 87,
    },
    {
      id: "aa",
      name: "Asset Accounting",
      status: "Optimal",
      healthPercentage: 87,
    },
    { id: "tax", name: "Tax", status: "Action", healthPercentage: 87 },
  ],
  kpiDetails: [
    {
      id: "duplicate-payment",
      name: "Duplicate Payment Prevention",
      businessRiskPrevented: "Payment fraud and duplicate vendor invoices",
      controlType: "Preventive",
      status: "Optimal",
      owner: "AP Manager",
      recommendedAction: "None - performing as expected",
      subModuleId: "ap",
      businessObjective:
        "Prevent duplicate vendor payments and eliminate payment fraud by validating invoice uniqueness before processing",
      roiDimension: "Control",
      businessContext:
        "This control protects approximately $850M in annual vendor payments. Historical baseline shows 0.3% duplicate invoice rate without controls, representing $2.5M annual exposure.",
      calculationLogic:
        "Count of invoice payments blocked due to matching vendor number, invoice number, amount, and payment date within system-defined tolerance window. Measured as percentage of total invoice volume screened.",
      dataSources: [
        "SAP FI Document Tables (BKPF, BSEG)",
        "Vendor Master Data (LFA1, LFB1)",
        "Payment Run Logs",
        "System Workflow Tables",
      ],
      updateFrequency: "Real-time validation at payment processing",
      targetValue: "100% of invoices screened",
      thresholds: {
        green: ">99.5% screened",
        amber: "97-99.5%",
        red: "<97%",
      },
      currentMeasuredValue: "99.8% screening rate",
      statusAnalysis:
        "All payment runs executing successfully with automated duplicate checks. Zero false negatives detected in monthly audit sampling.",
      ownerDepartment: "Finance Shared Services",
      lastUpdated: "Jan 6, 2026, 10:49 AM",
    },
    {
      id: "period-close",
      name: "Period End Close Cycle Time",
      businessRiskPrevented:
        "Delayed financial reporting and regulatory penalties",
      controlType: "Detective",
      status: "Optimal",
      owner: "Finance Manager",
      recommendedAction: "None - within 5 day target",
      subModuleId: "gl",
    },
    {
      id: "vendor-master",
      name: "Vendor Master Data Quality",
      businessRiskPrevented: "Payment making errors and duplicate vendors",
      controlType: "Preventive",
      status: "Warning",
      owner: "Master Data Team",
      recommendedAction: "Review 117 records flagged for cleanup",
      subModuleId: "ap",
    },
    {
      id: "tax-filing",
      name: "Tax Filing Deadline Compliance",
      businessRiskPrevented: "Regulatory penalties and interest charges",
      controlType: "Detective",
      status: "Error",
      owner: "Tax Manager",
      recommendedAction: "Immediate: 2 filings overdue, escalate to CFO",
      subModuleId: "tax",
    },
    {
      id: "aging-invoice",
      name: "Aging Invoice Escalation",
      businessRiskPrevented: "Supplier relationship issues and late fees",
      controlType: "Detective",
      status: "Warning",
      owner: "AP Team Lead",
      recommendedAction: "Follow up on 16 invoices aged >60 days",
      subModuleId: "ap",
    },
    {
      id: "annual-accrual",
      name: "Annual Accrual and Completions",
      businessRiskPrevented: "Period misstatement and audit adjustments",
      controlType: "Detective",
      status: "Warning",
      owner: "Finance Controller",
      recommendedAction: "Review accruals flagged by variance analysis",
      subModuleId: "gl",
    },
    {
      id: "three-way-match",
      name: "Three Way Match Compliance",
      businessRiskPrevented: "Invoice payment errors and fraud",
      controlType: "Preventive",
      status: "Optimal",
      owner: "AP Manager",
      recommendedAction: "None - performing as expected",
      subModuleId: "ap",
    },
    {
      id: "gl-reconciliation",
      name: "GL Account Reconciliation Coverage",
      businessRiskPrevented: "Account misstatements and audit findings",
      controlType: "Detective",
      status: "Optimal",
      owner: "Finance Controller",
      recommendedAction: "None - performing as expected",
      subModuleId: "gl",
    },
    {
      id: "sod-violations",
      name: "Segregation of Duties Violations",
      businessRiskPrevented: "Internal fraud and control weaknesses",
      controlType: "Detective",
      status: "Optimal",
      owner: "Security Admin",
      recommendedAction: "None - performing as expected",
      subModuleId: "gl",
    },
    {
      id: "dso",
      name: "Days Sales Outstanding (DSO)",
      businessRiskPrevented: "Cash flow delays and bad debt exposure",
      controlType: "Detective",
      status: "Optimal",
      owner: "AR Manager",
      recommendedAction: "None - performing as expected",
      subModuleId: "ar",
    },
    {
      id: "invoice-automation",
      name: "Invoice Processing Automation Rate",
      businessRiskPrevented: "Processing delays and manual errors",
      controlType: "Preventive",
      status: "Optimal",
      owner: "AP Manager",
      recommendedAction: "None - performing as expected",
      subModuleId: "ap",
    },
    {
      id: "asset-depreciation",
      name: "Asset Depreciation Accuracy",
      businessRiskPrevented: "Financial misstatement and tax errors",
      controlType: "Detective",
      status: "Optimal",
      owner: "Asset Accountant",
      recommendedAction: "None - performing as expected",
      subModuleId: "aa",
    },
    {
      id: "credit-limit",
      name: "Customer Credit Limit Breaches",
      businessRiskPrevented: "Bad debt exposure and collection issues",
      controlType: "Preventive",
      status: "Optimal",
      owner: "Credit Manager",
      recommendedAction: "None - performing as expected",
      subModuleId: "ar",
    },
    {
      id: "bank-reconciliation",
      name: "Bank Reconciliation Timeliness",
      businessRiskPrevented: "Cash flow visibility and fraud detection delays",
      controlType: "Detective",
      status: "Optimal",
      owner: "Treasury Manager",
      recommendedAction: "None - performing as expected",
      subModuleId: "gl",
    },
    {
      id: "fx-exposure",
      name: "Foreign Exchange Exposure Management",
      businessRiskPrevented: "Currency fluctuation losses",
      controlType: "Detective",
      status: "Optimal",
      owner: "Treasury Manager",
      recommendedAction: "None - performing as expected",
      subModuleId: "gl",
    },
    {
      id: "intercompany",
      name: "Intercompany Transaction Reconciliation",
      businessRiskPrevented: "Consolidation errors and audit findings",
      controlType: "Detective",
      status: "Optimal",
      owner: "Consolidation Team",
      recommendedAction: "None - performing as expected",
      subModuleId: "gl",
    },
    {
      id: "revenue-recognition",
      name: "Revenue Recognition Policy Compliance",
      businessRiskPrevented: "Revenue misstatement and regulatory issues",
      controlType: "Detective",
      status: "Optimal",
      owner: "Revenue Accountant",
      recommendedAction: "None - performing as expected",
      subModuleId: "ar",
    },
    {
      id: "unauthorized-journal",
      name: "Unauthorized Journal Entry Detection",
      businessRiskPrevented: "Fraud and unauthorized transactions",
      controlType: "Detective",
      status: "Optimal",
      owner: "Finance Controller",
      recommendedAction: "None - performing as expected",
      subModuleId: "gl",
    },
    {
      id: "payment-terms",
      name: "Supplier Payment Terms Optimization",
      businessRiskPrevented:
        "Cash flow inefficiencies and late payment penalties",
      controlType: "Preventive",
      status: "Optimal",
      owner: "AP Manager",
      recommendedAction: "None - performing as expected",
      subModuleId: "ap",
    },
    {
      id: "chart-of-accounts",
      name: "Chart of Accounts Governance",
      businessRiskPrevented: "Account proliferation and reporting errors",
      controlType: "Preventive",
      status: "Optimal",
      owner: "Finance Controller",
      recommendedAction: "None - performing as expected",
      subModuleId: "gl",
    },
  ],
  executiveSummary:
    "SAP FI delivers measurable ROI through automated controls that prevent $124M in financial risk exposure annually. With 92% control coverage and 87% overall health, the system provides strong fiscal protection, regulatory compliance, and operational efficiency. Current action items: 1 red KPI requiring immediate escalation, 3 amber KPIs under active monitoring.",
};

// Map of module IDs to their cockpit data
export const MODULE_COCKPIT_DATA: Record<string, ModuleCockpitData> = {
  fi: FI_MODULE_COCKPIT,
  // Add other modules as needed
};
