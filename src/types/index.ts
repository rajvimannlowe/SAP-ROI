// User Roles
export type UserRole = 'admin' | 'manager' | 'auditor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// DD Domain Types
export type DDDomain = 
  | 'Risk Management' 
  | 'Compliance' 
  | 'Process Integrity' 
  | 'Data Quality' 
  | 'Security';

export type Severity = 'Low' | 'Medium' | 'High' | 'Critical';

export type DDStatus = 'Comfortable' | 'Needs Review' | 'High Risk';

// SAP Module Structure
export interface SAPModule {
  id: string;
  name: string;
  code: string;
  subModules: SubModule[];
}

export interface SubModule {
  id: string;
  name: string;
  code: string;
  moduleId: string;
}

// Due Diligence Item
export interface DDItem {
  id: string;
  itemId: string;
  subModuleId: string;
  subModuleName: string;
  kpiName: string;
  controlObjective: string;
  ddDomain: DDDomain;
  severity: Severity;
  status: DDStatus;
  thresholdText: string;
  currentValue: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// Dashboard Summary
export interface DDDashboardSummary {
  totalItems: number;
  highRisk: number;
  needsReview: number;
  comfortable: number;
  highSeverity: number;
}

// Filter Options
export interface DDFilters {
  subModuleId?: string;
  ddDomain?: DDDomain;
  severity?: Severity;
  status?: DDStatus;
  search?: string;
}

