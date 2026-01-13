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
    businessImpactSummary: "Improves financial control",
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
    descriptionLogic: "Validate GL balances",
    sapTableDataSource: "BSEG, BKPF, SKA1",
    extractionMethod: "RFC / API",
    expectedCondition: "Variance ≤ 0.5%",
    detectionMethod: "SQL / Algorithm",
    impactCategory: "Compliance & Control",
    businessImpactSummary: "Ensures accurate reporting",
    recommendedAction: "Implement balance checks",
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
    descriptionLogic: "Identify duplicate payments",
    sapTableDataSource: "BSEG, REGUH, LFA1",
    extractionMethod: "ABAP / RFC",
    expectedCondition: "Zero duplicates",
    detectionMethod: "Machine Learning",
    impactCategory: "Cost Optimization",
    businessImpactSummary: "Prevents financial losses",
    recommendedAction: "Block duplicates automatically",
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
    descriptionLogic: "Track payment patterns",
    sapTableDataSource: "BSID, KNA1, VBAK",
    extractionMethod: "API / OData",
    expectedCondition: "DSO ≤ 45 days",
    detectionMethod: "Statistical Analysis",
    impactCategory: "Cost Optimization",
    businessImpactSummary: "Improves cash flow",
    recommendedAction: "Implement dunning process",
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
    descriptionLogic: "Analyze cost variances",
    sapTableDataSource: "COSP, CSKS, CSKA",
    extractionMethod: "RFC / BW Extraction",
    expectedCondition: "Variance ≤ 10%",
    detectionMethod: "Statistical Analysis",
    impactCategory: "Operational Efficiency",
    businessImpactSummary: "Enables cost management",
    recommendedAction: "Set up variance alerts",
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
    descriptionLogic: "Monitor tax compliance",
    sapTableDataSource: "BSET, MWST, A003",
    extractionMethod: "API / ABAP",
    expectedCondition: "Score > 95%",
    detectionMethod: "Rule Engine",
    impactCategory: "Compliance & Control",
    businessImpactSummary: "Reduces tax penalties",
    recommendedAction: "Implement tax validation",
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