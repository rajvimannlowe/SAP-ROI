import { DollarSign, TrendingUp, Shield, TrendingDown, User } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface ROIDimensionBadge {
  label: string;
  icon: LucideIcon;
  color: string;
}

export interface CatalogItem {
  id: string;
  category: string;
  productSuite: string;
  vendor: string;
  roiDimensions: ROIDimensionBadge[];
  primaryROIMetrics: string[];
  dataSources: string[];
  integrationMethod: string;
  updateFrequency: string;
}

export const ROI_CATALOG_ITEMS: CatalogItem[] = [
  {
    id: "1",
    category: "ERP",
    productSuite: "SAP S/4HANA",
    vendor: "SAP",
    roiDimensions: [
      { label: "Cost", icon: DollarSign, color: "#16A34A" },
      { label: "Efficiency", icon: TrendingUp, color: "#4160F0" },
      { label: "Compliance", icon: Shield, color: "#6B7280" },
      { label: "Revenue", icon: TrendingDown, color: "#FF6700" },
    ],
    primaryROIMetrics: [
      "Process Cycle Time",
      "Transaction Processing Time",
      "Month-End Close Time",
    ],
    dataSources: ["SAP Tables", "SAP Analytics Cloud", "SAP BW"],
    integrationMethod: "API + Database",
    updateFrequency: "Real-time",
  },
  {
    id: "2",
    category: "Procurement",
    productSuite: "SAP Ariba",
    vendor: "SAP",
    roiDimensions: [
      { label: "Cost", icon: DollarSign, color: "#16A34A" },
      { label: "Efficiency", icon: TrendingUp, color: "#4160F0" },
      { label: "Compliance", icon: Shield, color: "#6B7280" },
    ],
    primaryROIMetrics: [
      "Spend Under Management",
      "Cost Savings Rate",
      "Supplier Compliance Rate",
    ],
    dataSources: ["Ariba Network", "SAP Tables", "Ariba Analytics"],
    integrationMethod: "API",
    updateFrequency: "Daily",
  },
  {
    id: "3",
    category: "HCM",
    productSuite: "SAP SuccessFactors",
    vendor: "SAP",
    roiDimensions: [
      { label: "Efficiency", icon: TrendingUp, color: "#4160F0" },
      { label: "Experience", icon: User, color: "#9333EA" },
    ],
    primaryROIMetrics: [
      "Time to Hire",
      "Employee Satisfaction Score",
      "Training Completion Rate",
    ],
    dataSources: ["SuccessFactors API", "HR Analytics", "LMS Data"],
    integrationMethod: "API",
    updateFrequency: "Weekly",
  },
  {
    id: "4",
    category: "HCM",
    productSuite: "Workday HCM",
    vendor: "Workday",
    roiDimensions: [
      { label: "Efficiency", icon: TrendingUp, color: "#4160F0" },
      { label: "Compliance", icon: Shield, color: "#6B7280" },
      { label: "Experience", icon: User, color: "#9333EA" },
    ],
    primaryROIMetrics: [
      "Time to Hire",
      "Employee Turnover Rate",
      "Performance Review Completion",
    ],
    dataSources: ["Workday API", "HR Analytics", "People Analytics"],
    integrationMethod: "API + Flat Files",
    updateFrequency: "Daily",
  },
  {
    id: "5",
    category: "ERP",
    productSuite: "Oracle E-Business Suite",
    vendor: "Oracle",
    roiDimensions: [
      { label: "Cost", icon: DollarSign, color: "#16A34A" },
      { label: "Efficiency", icon: TrendingUp, color: "#4160F0" },
      { label: "Compliance", icon: Shield, color: "#6B7280" },
    ],
    primaryROIMetrics: [
      "Process Cycle Time",
      "Transaction Volume",
      "System Uptime",
    ],
    dataSources: ["Oracle Tables", "Oracle BI", "ERP Reports"],
    integrationMethod: "Database",
    updateFrequency: "Real-time",
  },
];

export const CATEGORY_OPTIONS = [
  { value: "all", label: "All Categories" },
  { value: "ERP", label: "ERP" },
  { value: "HCM", label: "HCM" },
  { value: "Procurement", label: "Procurement" },
  { value: "CRM", label: "CRM" },
  { value: "Data & Analytics", label: "Data & Analytics" },
];

export const VENDOR_OPTIONS = [
  { value: "all", label: "All Vendors" },
  { value: "SAP", label: "SAP" },
  { value: "Workday", label: "Workday" },
  { value: "Oracle", label: "Oracle" },
];

export const ROI_DIMENSION_OPTIONS = [
  { value: "all", label: "All ROI Dimensions" },
  { value: "Cost", label: "Cost" },
  { value: "Efficiency", label: "Efficiency" },
  { value: "Compliance", label: "Compliance" },
  { value: "Revenue", label: "Revenue" },
  { value: "Experience", label: "Experience" },
];

export const PERSONA_OPTIONS = [
  { value: "all", label: "All Personas" },
  { value: "CEO", label: "CEO" },
  { value: "CFO", label: "CFO" },
  { value: "CIO", label: "CIO" },
];

export const INTEGRATION_METHOD_OPTIONS = [
  { value: "all", label: "All Integration Methods" },
  { value: "API", label: "API" },
  { value: "Database", label: "Database" },
  { value: "API + Database", label: "API + Database" },
  { value: "API + Flat Files", label: "API + Flat Files" },
];
