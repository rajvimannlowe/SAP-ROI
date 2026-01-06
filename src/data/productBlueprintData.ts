import {
  DollarSign,
  Zap,
  Shield,
  TrendingUp,
  User,
  CheckCircle,
  Clock,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface ROIIntent {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

export interface ROIMetric {
  id: string;
  title: string;
  unit: string;
  target: string;
  refresh: string;
  status: "Active" | "Planned";
  dimension: string;
}

export interface DataSource {
  type: "Internal" | "External";
  sources: string[];
}

export interface ProductBlueprint {
  id: string;
  productSuite: string;
  vendor: string;
  category: string;
  phase: string;
  roiIntents: ROIIntent[];
  primaryMetrics: ROIMetric[];
  secondaryMetrics: ROIMetric[];
  dataSources: DataSource;
  integrationMethod: string;
  integrationDetails: string;
  updateFrequency: string;
  updateFrequencyDetails: string;
  algorithmLogic: string;
  aiMlOverlay: string;
  dependencies: string[];
  subModules: { id: string; name: string; label: string; phase?: string }[];
}

export const SAP_S4HANA_BLUEPRINT: ProductBlueprint = {
  id: "sap-s4hana",
  productSuite: "SAP S/4HANA",
  vendor: "SAP",
  category: "ERP",
  phase: "Phase I",
  roiIntents: [
    {
      id: "cost",
      label: "Cost Optimization",
      icon: DollarSign,
      color: "#059669",
      description:
        "Reduce operational expenses and improve resource utilization",
    },
    {
      id: "efficiency",
      label: "Operational Efficiency",
      icon: Zap,
      color: "#2563EB",
      description: "Streamline processes and accelerate business operations",
    },
    {
      id: "compliance",
      label: "Compliance & Control",
      icon: Shield,
      color: "#6B7280",
      description: "Ensure regulatory adherence and governance standards",
    },
    {
      id: "revenue",
      label: "Revenue Enablement",
      icon: TrendingUp,
      color: "#EA580C",
      description: "Drive top-line growth and market expansion",
    },
    {
      id: "experience",
      label: "Business Experience",
      icon: User,
      color: "#DB2777",
      description: "Enhance user satisfaction and stakeholder engagement",
    },
  ],
  primaryMetrics: [
    {
      id: "financial-close",
      title: "Financial Close Cycle Time",
      unit: "Days",
      target: "< 5 days",
      refresh: "Monthly",
      status: "Active",
      dimension: "Cost Optimization",
    },
    {
      id: "sod-violation",
      title: "SOD Violation Rate",
      unit: "Percentage",
      target: "< 0.1%",
      refresh: "Weekly",
      status: "Active",
      dimension: "Compliance & Control",
    },
    {
      id: "duplicate-payment",
      title: "Duplicate Payment Prevention Rate",
      unit: "Percentage",
      target: "100%",
      refresh: "Daily",
      status: "Active",
      dimension: "Cost Optimization",
    },
    {
      id: "dso",
      title: "Days Sales Outstanding (DSO)",
      unit: "Days",
      target: "< 45 days",
      refresh: "Weekly",
      status: "Active",
      dimension: "Cost Optimization",
    },
    {
      id: "tax-compliance",
      title: "Tax Compliance Score",
      unit: "Score (0-100)",
      target: "> 95",
      refresh: "Monthly",
      status: "Planned",
      dimension: "Compliance & Control",
    },
    {
      id: "working-capital",
      title: "Working Capital Efficiency Ratio",
      unit: "Ratio",
      target: "> 1.5",
      refresh: "Monthly",
      status: "Active",
      dimension: "Cost Optimization",
    },
  ],
  secondaryMetrics: [
    {
      id: "system-uptime",
      title: "System Uptime & Availability",
      unit: "Percentage",
      target: "> 99.5%",
      refresh: "Real-time",
      status: "Active",
      dimension: "Operational Efficiency",
    },
    {
      id: "user-adoption",
      title: "User Adoption Rate",
      unit: "Percentage",
      target: "> 80%",
      refresh: "Monthly",
      status: "Active",
      dimension: "Business Experience",
    },
    {
      id: "data-quality",
      title: "Data Quality Index",
      unit: "Score (0-100)",
      target: "> 95",
      refresh: "Weekly",
      status: "Active",
      dimension: "Operational Efficiency",
    },
  ],
  dataSources: {
    type: "Internal",
    sources: [
      "SAP Financial Accounting Tables (BSEG, BKPF)",
      "Controlling Module (CO-PA)",
      "Materials Management (MARA, MARC)",
      "Sales & Distribution (VBAK, VBAP)",
      "Master Data (Customers, Vendors, Materials)",
    ],
  },
  integrationMethod: "API + Direct Database Access",
  integrationDetails: "RESTful APIs, OData services, and RFC connections",
  updateFrequency: "Real-time & Daily Batch",
  updateFrequencyDetails: "Transactional data: real-time | Analytics: daily",
  algorithmLogic:
    "ROI calculations aggregate transactional data across modules, applying time-series analysis for trend identification. Cost optimization metrics derive from GL-level expenditure tracking, while efficiency metrics leverage process mining algorithms to identify bottlenecks and cycle time improvements. Compliance scores are computed through rule-based validation against regulatory frameworks.",
  aiMlOverlay:
    "Machine learning models provide predictive analytics for cash flow forecasting, anomaly detection in financial transactions, and intelligent automation recommendations. Natural language processing enables automated invoice processing and contract analysis.",
  dependencies: [
    "Master data quality must maintain 95%+ accuracy for reliable ROI measurement",
    "Integration with banking systems required for real-time cash flow metrics",
    "User adoption rate directly impacts efficiency realization (target: 80%+)",
    "Dependent on data governance framework and security policies",
  ],
  subModules: [
    { id: "fi", name: "FI", label: "Financial Accounting" },
    { id: "co", name: "CO", label: "Controlling" },
    { id: "sd", name: "SD", label: "Sales & Distribution" },
    { id: "mm", name: "MM", label: "Materials Management" },
    { id: "pp", name: "PP", label: "Production Planning", phase: "Phase 2" },
    { id: "qm", name: "QM", label: "Quality Management", phase: "Phase 2" },
  ],
};
