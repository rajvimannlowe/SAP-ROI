import { 
  TrendingUp, 
  CheckCircle2, 
  DollarSign, 
  Target,
  BarChart3,
  Activity,
  FileText,
  Shield,
  LucideIcon
} from "lucide-react";

// Overall ROI Score Data
export interface ROIScoreData {
  score: string;
  description: string;
  criticalRisks: number;
  moderateRisks: number;
  valueProtected: string;
  valueExposed: string;
  activeRemediations: number;
}

export const roiScoreData: ROIScoreData = {
  score: "96.0%",
  description: "Aggregate health across 16 KPIs",
  criticalRisks: 1,
  moderateRisks: 2,
  valueProtected: "$18.4M",
  valueExposed: "$1.2M",
  activeRemediations: 10
};

// Sub-Process ROI Aggregation Data
export interface SubProcessData {
  id: string;
  name: string;
  roiScore: string;
  status: "Healthy" | "At Risk" | "Critical";
  keyRiskIndicator: string;
  riskDescription: string;
  valueAtRisk: string;
  actionItems: number;
  targets: number;
  color: string;
  icon: LucideIcon;
}

export const subProcessData: SubProcessData[] = [
  {
    id: "general-ledger",
    name: "General Ledger",
    roiScore: "85.5%",
    status: "At Risk",
    keyRiskIndicator: "KEY RISK INDICATOR",
    riskDescription: "Vendor Master Data Quality",
    valueAtRisk: "$2.8M",
    actionItems: 4,
    targets: 3,
    color: "#F59E0B",
    icon: FileText
  },
  {
    id: "accounts-payable",
    name: "Accounts Payable",
    roiScore: "94.2%",
    status: "Healthy",
    keyRiskIndicator: "KEY RISK INDICATOR",
    riskDescription: "Invoice Master Data Quality",
    valueAtRisk: "$4.2M",
    actionItems: 2,
    targets: 1,
    color: "#F97316",
    icon: DollarSign
  },
  {
    id: "accounts-receivable",
    name: "Accounts Receivable",
    roiScore: "98.8%",
    status: "Healthy",
    keyRiskIndicator: "KEY RISK INDICATOR",
    riskDescription: "Customer Master Data Quality",
    valueAtRisk: "$2.1M",
    actionItems: 1,
    targets: 2,
    color: "#10B981",
    icon: TrendingUp
  },
  {
    id: "asset-accounting",
    name: "Asset Accounting",
    roiScore: "99.2%",
    status: "Healthy",
    keyRiskIndicator: "KEY RISK INDICATOR",
    riskDescription: "Asset Depreciation Accuracy",
    valueAtRisk: "$1.5M",
    actionItems: 1,
    targets: 1,
    color: "#10B981",
    icon: BarChart3
  },
  {
    id: "tax",
    name: "Tax",
    roiScore: "92.4%",
    status: "At Risk",
    keyRiskIndicator: "KEY RISK INDICATOR",
    riskDescription: "Filing Deadline Compliance",
    valueAtRisk: "$6.8M",
    actionItems: 3,
    targets: 2,
    color: "#EF4444",
    icon: Shield
  }
];

// Sub-Process Summary Statistics
export interface SubProcessSummary {
  healthyProcesses: number;
  atRiskProcesses: number;
  totalValueAtRisk: string;
  activeActionItems: number;
}

export const subProcessSummary: SubProcessSummary = {
  healthyProcesses: 3,
  atRiskProcesses: 2,
  totalValueAtRisk: "$13.4M",
  activeActionItems: 11,
};

// ROI Feedback Loop Visualization Data
export interface FeedbackLoopStep {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in_progress" | "pending";
  icon: LucideIcon;
  color: string;
}

export const feedbackLoopSteps: FeedbackLoopStep[] = [
  {
    id: "kpi-monitoring",
    title: "1. KPI Monitoring",
    description: "Continuous tracking of financial performance indicators",
    status: "completed",
    icon: Activity,
    color: "#10B981"
  },
  {
    id: "control-evidence",
    title: "2. Control Evidence",
    description: "Automated evidence collection for compliance controls",
    status: "completed",
    icon: CheckCircle2,
    color: "#10B981"
  },
  {
    id: "action-tracking",
    title: "3. Action Tracking",
    description: "Real-time monitoring of remediation activities",
    status: "in_progress",
    icon: Target,
    color: "#F59E0B"
  },
  {
    id: "roi-outcome",
    title: "4. ROI Outcome",
    description: "Quantified business value from control improvements",
    status: "pending",
    icon: TrendingUp,
    color: "#6B7280"
  }
];

// Additional metrics for enhanced visualization
export interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  color: string;
  description: string;
}

export const additionalMetrics: MetricCard[] = [
  {
    title: "Process Efficiency",
    value: "87.3%",
    change: "+2.1%",
    trend: "up",
    color: "#10B981",
    description: "Month-over-month improvement"
  },
  {
    title: "Control Coverage",
    value: "94.7%",
    change: "+1.8%",
    trend: "up",
    color: "#3B82F6",
    description: "Automated control monitoring"
  },
  {
    title: "Risk Mitigation",
    value: "$15.2M",
    change: "+$2.3M",
    trend: "up",
    color: "#8B5CF6",
    description: "Value protected this quarter"
  }
];

// Action items data
export interface ActionItem {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  assignee: string;
  dueDate: string;
  status: "Open" | "In Progress" | "Completed";
  impact: string;
}

export const actionItems: ActionItem[] = [
  {
    id: "1",
    title: "Review vendor master data quality controls",
    priority: "High",
    assignee: "Finance Team",
    dueDate: "2024-01-15",
    status: "In Progress",
    impact: "$2.8M"
  },
  {
    id: "2",
    title: "Implement automated invoice validation",
    priority: "Medium",
    assignee: "IT Team",
    dueDate: "2024-01-20",
    status: "Open",
    impact: "$1.2M"
  },
  {
    id: "3",
    title: "Update tax compliance procedures",
    priority: "High",
    assignee: "Tax Team",
    dueDate: "2024-01-10",
    status: "In Progress",
    impact: "$6.8M"
  }
];
