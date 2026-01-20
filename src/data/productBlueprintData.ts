import {
  DollarSign,
  Zap,
  Shield,
  TrendingUp,
  User,
  // CheckCircle,
  // Clock,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface ROIIntent {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

export interface SupportingKPI {
  kpiId: string;
  kpiName: string;
  subModule: string;
  contributionType: string;
  status: "Active" | "In Progress" | "Planned";
  owner: string;
}

export interface ROIMetric {
  id: string;
  title: string;
  unit: string;
  dimension: string;
  owner: string;
  metricDefinition: string;
  businessRationale: string;
  computationSection: string[];
  dataSource: string[];
  calculationMethod: string[];
  target: string;
  amberThreshold: string;
  redThreshold: string;
  refresh: string;
  status: "Active" | "Planned";
  supportingKPI: SupportingKPI[];
  indirectKPI?: SupportingKPI[];
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
      id: "FI-MET-PR-001",
      title: "Compliance Exception Rate",
      unit: "Percentage",
      dimension: "Compliance",
      owner: "Head – Compliance / CFO",
      metricDefinition:
        "Percentage of finance transactions that trigger compliance exceptions (tax, SoD, approval, policy, or statutory rule breaches) during posting, payment, or reporting processes within the measurement period",
      businessRationale:
        "Direct indicator of regulatory and audit exposure; sustained exceptions typically translate to penalties, delayed audits, qualified reports, and reputational risk",
      computationSection: [
        "Identify total relevant FI transactions in-scope",
        "Identify transactions flagged as compliance exceptions (hard blocks + soft exceptions requiring remediation)",
        "Compute exception rate and trend",
      ],
      dataSource: [
        "SAP FI (BKPF, BSEG)",
        "Tax tables (BSET / J_1I*)",
        "Workflow logs",
        "GRC/SoD reports",
        "Audit exception logs",
      ],
      calculationMethod: [
        "(Count of Compliance Exceptions ÷ Count of In-scope Transactions) × 100; slice by company code, process (AP/AR/GL), exception type, and recurrence",
      ],
      target: "≤ 0.50%",
      amberThreshold: "> 0.50% and ≤ 1.00%",
      redThreshold: "> 1.00%",
      refresh: "Weekly",
      status: "Active",
      supportingKPI: [
        {
          kpiId: "	FI-AA-020",
          kpiName: "Asset Capitalization Policy Check",
          subModule: "AA",
          contributionType: "Direct",
          status: "Planned",
          owner: "FI Lead / IT Analyst",
        },
        {
          kpiId: "FI-AA-021",
          kpiName: "Depreciation Method Validation",
          subModule: "AA",
          contributionType: "Direct",
          status: "Planned",
          owner: "FI Lead / IT Analyst",
        },
        {
          kpiId: "FI-AP-015",
          kpiName: "Vendor Master GST Validation",
          subModule: "AP",
          contributionType: "Direct",
          status: "Planned",
          owner: "FI Lead / IT Analyst",
        },
        {
          kpiId: "FI-AP-016",
          kpiName: "Blocked Invoice Compliance Review",
          subModule: "AP",
          contributionType: "Direct",
          status: "Planned",
          owner: "FI Lead / IT Analyst",
        },
      ],
      indirectKPI: [
        {
          kpiId: "	FI-AP-017",
          kpiName: "Automatic Duplicate Invoice Detection",
          subModule: "AP",
          contributionType: "Indirect",
          status: "Planned",
          owner: "FI Lead / IT Analyst",
        },
      ],
    },
    {
      id: "FI-MET-PR-002",
      title: "FI Cycle Time Effectiveness",
      unit: "Percentage",
      dimension: "Value Realization",
      owner: "Head - Finance Operations",
      metricDefinition:
        "Measures how efficiently core FI processes complete end-to-end within the expected timeline (posting-to-clearance / invoice-to-payment / close activities), expressed as an effectiveness score or % of transactions meeting SLA.",
      businessRationale:
        "Cycle time is the operational 'speed of finance'; improvements translate to lower cost, fewer escalations, better vendor/customer experience, and faster management visibility.",
      computationSection: [
        "Track cycle time per in-scope process; compare actual cycle time vs target SLA",
        "compute % within SLA and derive effectiveness score",
      ],
      dataSource: [
        "SAP FI (BKPF, BSEG)",
        "AP (F110 logs)",
        "AR clearing logs",
        "GR/IR (WRX/BSX)",
        "closing cockpit tasks",
        "workflow timestamps",
      ],
      calculationMethod: [
        "Primary: (% Transactions within SLA)",
        "Optional score: Weighted average of (SLA met %) across AP/AR/Close with defined weights",
      ],
      target: "≥ 90% within SLA",
      amberThreshold: "≥ 80% and < 90%",
      redThreshold: "< 80%",
      refresh: "Weekly",
      status: "Active",
      supportingKPI: [
        {
          kpiId: "KPI-CYC-01",
          kpiName: "Invoice Processing Time",
          subModule: "AP",
          contributionType: "Reduces invoice-to-payment cycle time",
          status: "Active",
          owner: "AP Manager",
        },
        {
          kpiId: "KPI-CYC-02",
          kpiName: "Month-end Close Duration",
          subModule: "GL",
          contributionType: "Accelerates financial reporting timeline",
          status: "Active",
          owner: "Financial Controller",
        },
      ],
      indirectKPI: [
        {
          kpiId: "KPI-CYC-01",
          kpiName: "Invoice Processing Time",
          subModule: "AP",
          contributionType: "Invoice to posting",
          status: "Planned",
          owner: "AP Manager",
        },
        {
          kpiId: "KPI-CYC-02",
          kpiName: "Month-end Close Duration",
          subModule: "AP",
          contributionType: "Reconciliation lag",
          status: "Planned",
          owner: "AP Manager",
        },
        {
          kpiId: "KPI-CYC-01",
          kpiName: "Invoice Processing Time",
          subModule: "AP",
          contributionType: "Payment readiness",
          status: "Planned",
          owner: "AP Manager",
        },
        {
          kpiId: "KPI-CYC-02",
          kpiName: "Month-end Close Duration",
          subModule: "GL",
          contributionType: "Core close metric",
          status: "Planned",
          owner: "Financial Controller",
        },
      ],
    },
    {
      id: "FI-MET-PR-003",
      title: "Financial Control Risk Score",
      unit: "Score (0-100)",
      dimension: "Control",
      owner: "CFO / Head – Internal Audit",
      metricDefinition:
        "Composite risk score representing the health of financial controls based on control breaches, overrides, SoD conflicts, exception ageing, and repeat findings, normalized to a 0–100 scale (lower is better)",
      businessRationale:
        "Converts multiple control signals into a single executive view; supports audit readiness and reduces 'unknown unknowns' that surface late in audit/closing",
      computationSection: [
        "Aggregate weighted control risk events (breaches, overrides, SoD conflicts, unresolved exceptions)",
        "apply weights by severity and recurrence",
        "produce score by entity and overall",
      ],
      dataSource: [
        "SAP FI (BKPF, BSEG)",
        "GRC/SoD reports",
        "workflow approvals",
        "change logs (CDHDR/CDPOS)",
        "audit issue tracker",
      ],
      calculationMethod: [
        "Risk Score = Σ(Events × Weight × Severity Factor × Recurrence Factor)",
        "normalize to 0–100",
        "thresholds by risk appetite",
      ],
      target: "≤ 25",
      amberThreshold: "> 25 and ≤ 40",
      redThreshold: "> 40",
      refresh: "Daily",
      status: "Active",
      supportingKPI: [
        {
          kpiId: "KPI-CTL-01",
          kpiName: "SoD Violation Count",
          subModule: "GRC",
          contributionType: "Identifies segregation of duties conflicts",
          status: "Active",
          owner: "Internal Audit Manager",
        },
        {
          kpiId: "KPI-CTL-02",
          kpiName: "Control Override Frequency",
          subModule: "FI",
          contributionType: "Tracks manual control bypasses and exceptions",
          status: "Active",
          owner: "CFO / Head – Internal Audit",
        },
      ],
    },
    {
      id: "FI-MET-PR-004",
      title: "Posting Accuracy Score",
      unit: "Score (0-100)",
      dimension: "Value Protection",
      owner: "Financial Controller",
      metricDefinition:
        "Accuracy of financial postings measured as the proportion of postings that are correct the first time (no reversals, reclassifications, or correction journals attributable to posting error)",
      businessRationale:
        "Directly impacts financial statement reliability, close effort, audit queries, and management decision quality; 'posting quality' is a leading indicator of control maturity",
      computationSection: [
        "Identify total postings in-scope",
        "identify postings reversed/corrected due to errors (wrong GL, wrong cost center, wrong tax code, wrong period, wrong assignment)",
        "compute accuracy score",
      ],
      dataSource: [
        "SAP FI (BKPF, BSEG)",
        "reversal docs",
        "correction journal logs",
        "tax code tables",
        "master data (SKA1/CSKS/LFA1/KNA1)",
      ],
      calculationMethod: [
        "Posting Accuracy Score = 100 − [(Incorrect Postings ÷ Total Postings) × 100]",
      ],
      target: "≥ 99.0",
      amberThreshold: "≥ 98.0 and < 99.0",
      redThreshold: "< 98.0",
      refresh: "Weekly",
      status: "Active",
      supportingKPI: [],
    },
    {
      id: "FI-MET-PR-005",
      title: "Control Coverage Score",
      unit: "Percentage",
      dimension: "Strategic Position",
      owner: "CFO / Head – Governance",
      metricDefinition:
        "Measures how completely critical FI risk areas are covered by configured and operating controls (preventive + detective), expressed as a % coverage score",
      businessRationale:
        "Ensures there are no 'blind spots' in finance governance; high coverage reduces reliance on heroics and manual checks, improving scalability post-growth/acquisitions",
      computationSection: [
        "Define FI risk-control library",
        "map risks to controls",
        "mark controls as implemented + operating",
        "compute coverage by process and overall",
      ],
      dataSource: [
        "Control library / GRC control matrix",
        "SAP configuration evidence",
        "workflow logs",
        "audit testing results",
        "monitoring dashboards",
      ],
      calculationMethod: [
        "Control Coverage Score = (Risks with Active Controls ÷ Total In-scope Risks) × 100",
        "optionally weighted by risk criticality",
      ],
      target: "≥ 95%",
      amberThreshold: "≥ 85% and < 95%",
      redThreshold: "< 85%",
      refresh: "Monthly",
      status: "Planned",
      supportingKPI: [
        {
          kpiId: "KPI-COV-01",
          kpiName: "Risk Assessment Completion Rate",
          subModule: "GRC",
          contributionType:
            "Ensures comprehensive risk identification and mapping",
          status: "Planned",
          owner: "Risk Manager",
        },
        {
          kpiId: "KPI-COV-02",
          kpiName: "Control Testing Coverage",
          subModule: "FI",
          contributionType: "Validates effectiveness of implemented controls",
          status: "Planned",
          owner: "CFO / Head – Governance",
        },
      ],
      indirectKPI: [
        {
          kpiId: "KPI-COV-01",
          kpiName: "Risk Assessment Completion Rate",
          subModule: "GL",
          contributionType: "Control completeness",
          status: "Planned",
          owner: "Financial Controller",
        },
        {
          kpiId: "KPI-COV-02",
          kpiName: "Control Testing Coverage",
          subModule: "GL",
          contributionType: "IC reconciliation governance",
          status: "Planned",
          owner: "Financial Controller",
        },
      ],
    },
    {
      id: "FI-MET-PR-006",
      title: "Cash Visibility Coverage",
      unit: "Percentage",
      dimension: "Strategic Position",
      owner: "CFO / Treasurer",
      metricDefinition:
        "Measures the extent to which enterprise cash balances are visible, timely, and reconciled across all bank accounts, entities, and currencies within defined SLAs",
      businessRationale:
        "Incomplete cash visibility leads to sub-optimal borrowing, idle cash, missed investment opportunities, and liquidity risk during stress situations",
      computationSection: [
        "Identify total in-scope bank accounts",
        "assess accounts with daily balance visibility and timely reconciliation",
        "compute coverage percentage",
      ],
      dataSource: [
        "SAP Bank Accounting",
        "Cash Management",
        "Bank Statements (MT940/BAI2)",
        "Treasury systems",
      ],
      calculationMethod: [
        "(Bank Accounts with Timely Visibility & Reconciliation ÷ Total In-scope Bank Accounts) × 100",
      ],
      target: "≥ 98%",
      amberThreshold: "≥ 95% and < 98%",
      redThreshold: "< 95%",
      refresh: "Monthly",
      status: "Active",
      supportingKPI: [
        {
          kpiId: "KPI-CSH-01",
          kpiName: "Bank Reconciliation Timeliness",
          subModule: "Treasury",
          contributionType: "Ensures timely cash position updates",
          status: "Active",
          owner: "Treasury Analyst",
        },
        {
          kpiId: "KPI-CSH-02",
          kpiName: "Multi-currency Exposure Tracking",
          subModule: "FI",
          contributionType:
            "Provides real-time foreign exchange risk visibility",
          status: "Active",
          owner: "CFO / Treasurer",
        },
      ],
    },
  ],
  secondaryMetrics: [
    {
      id: "FI-MET-SR-016",
      title: "Integration Success Rate",
      unit: "Percentage",
      dimension: "Operational Efficiency",
      owner: "Head - IT Integration",
      metricDefinition:
        "Percentage of successful data integrations between SAP FI and connected systems without errors, timeouts, or data quality issues during the measurement period",
      businessRationale:
        "Integration reliability ensures real-time data availability, reduces manual interventions, and maintains data consistency across business processes",
      computationSection: [
        "Track all integration attempts and outcomes",
        "Identify failed integrations and root causes",
        "Calculate success rate by integration type",
        "Monitor performance trends",
      ],
      dataSource: [
        "Integration monitoring logs",
        "SAP PI/PO logs",
        "API gateway metrics",
        "Error handling systems",
      ],
      calculationMethod: [
        "(Successful integrations / Total integration attempts) × 100",
        "Segmented by system, data type, and time period",
      ],
      target: "> 99.5%",
      amberThreshold: "≥ 98% and ≤ 99.5%",
      redThreshold: "< 98%",
      refresh: "Real-time",
      status: "Active",
      supportingKPI: [
        {
          kpiId: "KPI-INT-01",
          kpiName: "API Response Time",
          subModule: "Integration",
          contributionType: "Monitors integration performance and latency",
          status: "Active",
          owner: "Integration Specialist",
        },
        {
          kpiId: "KPI-INT-02",
          kpiName: "Data Quality Score",
          subModule: "FI",
          contributionType: "Ensures data integrity across integrated systems",
          status: "Active",
          owner: "Head - IT Integration",
        },
      ],
    },
    {
      id: "FI-MET-SR-017",
      title: "Master Data Quality Index",
      unit: "Score (0-100)",
      dimension: "Control",
      owner: "Head – Master Data / CFO",
      metricDefinition:
        "Composite index reflecting completeness, accuracy, consistency, and governance of FI-relevant master data (GL, vendor, customer, cost objects)",
      businessRationale:
        "Master data quality is a root cause driver for posting errors, control breaches, and rework across all FI processes",
      computationSection: [
        "Assess master data attributes against defined quality rules",
        "aggregate defect rates and normalize into an index",
      ],
      dataSource: [
        "SAP Master Data (SKA1, LFA1, KNA1, CSKS)",
        "Change logs",
        "MDG rules",
      ],
      calculationMethod: [
        "Quality Index = 100 − (Weighted Defect Score)",
        "defects include missing fields, invalid values, duplicates, and unauthorized changes",
      ],
      target: "≥ 95",
      amberThreshold: "≥ 85 and < 95",
      redThreshold: "< 85",
      refresh: "Monthly",
      status: "Active",
      supportingKPI: [
        {
          kpiId: "KPI-MDQ-01",
          kpiName: "Vendor Master Completeness",
          subModule: "AP",
          contributionType:
            "Ensures complete vendor information for accurate processing",
          status: "Active",
          owner: "Master Data Specialist",
        },
        {
          kpiId: "KPI-MDQ-02",
          kpiName: "GL Account Hierarchy Accuracy",
          subModule: "GL",
          contributionType: "Maintains proper chart of accounts structure",
          status: "Active",
          owner: "Head – Master Data / CFO",
        },
      ],
    },
    {
      id: "FI-MET-SR-018",
      title: "User Adoption Rate",
      unit: "Percentage",
      dimension: "Value Realization",
      owner: "CIO / Head – Integration",
      metricDefinition:
        "Measures the percentage of FI-related integrations (inbound and outbound) that execute successfully without errors, retries, or manual intervention",
      businessRationale:
        "Integration failures create downstream posting errors, delays, and manual work, undermining automation and reliability of the finance ecosystem",
      computationSection: [
        "Identify total FI integration messages",
        "identify successful end-to-end executions",
        "compute success rate by interface and criticality",
      ],
      dataSource: [
        "SAP CPI/PI",
        "Middleware logs",
        "SAP FI error logs",
        "Interface monitoring tools",
      ],
      calculationMethod: [
        "(Successful Integration Executions ÷ Total Integration Executions) × 100",
      ],
      target: "≥ 99.0%",
      amberThreshold: "≥ 97.0% and < 99.0%",
      redThreshold: "< 97.0%",
      refresh: "Weekly",
      status: "Active",
      supportingKPI: [
        {
          kpiId: "KPI-USR-01",
          kpiName: "System Login Frequency",
          subModule: "FI",
          contributionType: "Tracks active user engagement with SAP FI modules",
          status: "Active",
          owner: "System Administrator",
        },
        {
          kpiId: "KPI-USR-02",
          kpiName: "Training Completion Rate",
          subModule: "Training",
          contributionType:
            "Ensures users are properly trained on new processes",
          status: "Active",
          owner: "CIO / Head – Integration",
        },
      ],
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
