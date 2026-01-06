export interface ROIIntentTableRow {
  module: string;
  subModule: string;
  kpiId: string;
  kpiTitle: string;
  ruleType: string;
  descriptionLogic: string;
  sapTableDataSource: string;
  extractionMethod: string;
  expectedCondition: string;
  detectionMethod: string;
  impactCategory: string;
  businessImpactSummary: string;
  recommendedAction: string;
  roiPotential: string;
  technicalComplexity: string;
  dependencies: string;
  status: string;
  ownerResponsibleRole: string;
  remarks: string;
  lastUpdated: string;
}

export const roiIntentTableData: ROIIntentTableRow[] = [
  {
    module: "FI",
    subModule: "Bank",
    kpiId: "FI-BK-005",
    kpiTitle: "Bank charges reconciliation",
    ruleType: "Control",
    descriptionLogic: "Check GL entries vs statement",
    sapTableDataSource: "BSEG, FEBEP",
    extractionMethod: "RFC / API / ABAP",
    expectedCondition: "Variance ≤ 1%",
    detectionMethod: "Algorithm / SQL",
    impactCategory: "Cost Optimization",
    businessImpactSummary: "Improves financial control and reduces leakage",
    recommendedAction: "Auto-reconcile charges",
    roiPotential: "High",
    technicalComplexity: "Medium",
    dependencies: "Dependent on CO, MM",
    status: "Planned",
    ownerResponsibleRole: "FI Lead / IT Analyst",
    remarks: "Align with ROI framework",
    lastUpdated: "2025-10-09"
  },
  {
    module: "FI",
    subModule: "GL",
    kpiId: "FI-GL-001",
    kpiTitle: "General Ledger Balance Validation",
    ruleType: "Validation",
    descriptionLogic: "Validate GL account balances against source documents",
    sapTableDataSource: "BSEG, BKPF, SKA1",
    extractionMethod: "RFC / API",
    expectedCondition: "Balance variance ≤ 0.5%",
    detectionMethod: "SQL / Algorithm",
    impactCategory: "Compliance & Control",
    businessImpactSummary: "Ensures accurate financial reporting and compliance",
    recommendedAction: "Implement automated balance checks",
    roiPotential: "High",
    technicalComplexity: "Low",
    dependencies: "Master data quality",
    status: "Active",
    ownerResponsibleRole: "FI Controller / System Admin",
    remarks: "Critical for month-end close",
    lastUpdated: "2025-11-15"
  },
  {
    module: "FI",
    subModule: "AP",
    kpiId: "FI-AP-003",
    kpiTitle: "Duplicate Payment Detection",
    ruleType: "Prevention",
    descriptionLogic: "Identify potential duplicate payments before processing",
    sapTableDataSource: "BSEG, REGUH, LFA1",
    extractionMethod: "ABAP / RFC",
    expectedCondition: "Zero duplicate payments",
    detectionMethod: "Machine Learning",
    impactCategory: "Cost Optimization",
    businessImpactSummary: "Prevents financial losses from duplicate payments",
    recommendedAction: "Block duplicate payments automatically",
    roiPotential: "Very High",
    technicalComplexity: "High",
    dependencies: "Vendor master data accuracy",
    status: "Active",
    ownerResponsibleRole: "AP Manager / IT Developer",
    remarks: "High priority for cash flow optimization",
    lastUpdated: "2025-12-01"
  },
  {
    module: "FI",
    subModule: "AR",
    kpiId: "FI-AR-007",
    kpiTitle: "Days Sales Outstanding Tracking",
    ruleType: "Monitoring",
    descriptionLogic: "Track and analyze customer payment patterns",
    sapTableDataSource: "BSID, KNA1, VBAK",
    extractionMethod: "API / OData",
    expectedCondition: "DSO ≤ 45 days",
    detectionMethod: "Statistical Analysis",
    impactCategory: "Cost Optimization",
    businessImpactSummary: "Improves cash flow and working capital efficiency",
    recommendedAction: "Implement automated dunning process",
    roiPotential: "High",
    technicalComplexity: "Medium",
    dependencies: "Customer master data, SD integration",
    status: "Planned",
    ownerResponsibleRole: "AR Specialist / Business Analyst",
    remarks: "Requires customer segmentation logic",
    lastUpdated: "2025-10-20"
  },
  {
    module: "FI",
    subModule: "CO",
    kpiId: "FI-CO-002",
    kpiTitle: "Cost Center Variance Analysis",
    ruleType: "Analysis",
    descriptionLogic: "Analyze budget vs actual cost variances by cost center",
    sapTableDataSource: "COSP, CSKS, CSKA",
    extractionMethod: "RFC / BW Extraction",
    expectedCondition: "Variance ≤ 10%",
    detectionMethod: "Statistical Analysis",
    impactCategory: "Operational Efficiency",
    businessImpactSummary: "Enables proactive cost management and budget control",
    recommendedAction: "Set up automated variance alerts",
    roiPotential: "Medium",
    technicalComplexity: "Medium",
    dependencies: "CO module configuration, budget planning",
    status: "Active",
    ownerResponsibleRole: "Cost Controller / FI Analyst",
    remarks: "Monthly reporting requirement",
    lastUpdated: "2025-11-30"
  },
  {
    module: "FI",
    subModule: "Tax",
    kpiId: "FI-TX-004",
    kpiTitle: "Tax Compliance Score Monitoring",
    ruleType: "Compliance",
    descriptionLogic: "Monitor tax calculation accuracy and compliance status",
    sapTableDataSource: "BSET, MWST, A003",
    extractionMethod: "API / ABAP",
    expectedCondition: "Compliance score > 95%",
    detectionMethod: "Rule Engine",
    impactCategory: "Compliance & Control",
    businessImpactSummary: "Reduces tax penalties and ensures regulatory compliance",
    recommendedAction: "Implement real-time tax validation",
    roiPotential: "High",
    technicalComplexity: "High",
    dependencies: "Tax configuration, legal updates",
    status: "Planned",
    ownerResponsibleRole: "Tax Manager / Compliance Officer",
    remarks: "Critical for audit readiness",
    lastUpdated: "2025-09-15"
  }
];

// Helper function to filter data by intent category
export const getROIIntentDataByCategory = (category: string): ROIIntentTableRow[] => {
  return roiIntentTableData.filter(row => 
    row.impactCategory.toLowerCase().includes(category.toLowerCase())
  );
};

// Helper function to get data by status
export const getROIIntentDataByStatus = (status: string): ROIIntentTableRow[] => {
  return roiIntentTableData.filter(row => 
    row.status.toLowerCase() === status.toLowerCase()
  );
};