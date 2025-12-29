import { SAPModule, DDItem, SubModule } from '../types';

// SAP Modules and Sub-Modules
export const SAP_MODULES: SAPModule[] = [
  {
    id: 'fi',
    name: 'Financial Accounting',
    code: 'FI',
    subModules: [
      { id: 'fi-gl', name: 'General Ledger', code: 'FI-GL', moduleId: 'fi' },
      { id: 'fi-ap', name: 'Accounts Payable', code: 'FI-AP', moduleId: 'fi' },
      { id: 'fi-ar', name: 'Accounts Receivable', code: 'FI-AR', moduleId: 'fi' },
      { id: 'fi-aa', name: 'Asset Accounting', code: 'FI-AA', moduleId: 'fi' },
      { id: 'fi-bc', name: 'Bank Accounting', code: 'FI-BC', moduleId: 'fi' },
    ],
  },
  {
    id: 'co',
    name: 'Controlling',
    code: 'CO',
    subModules: [
      { id: 'co-om', name: 'Overhead Management', code: 'CO-OM', moduleId: 'co' },
      { id: 'co-pc', name: 'Product Costing', code: 'CO-PC', moduleId: 'co' },
      { id: 'co-pa', name: 'Profitability Analysis', code: 'CO-PA', moduleId: 'co' },
    ],
  },
  {
    id: 'sd',
    name: 'Sales & Distribution',
    code: 'SD',
    subModules: [
      { id: 'sd-sls', name: 'Sales', code: 'SD-SLS', moduleId: 'sd' },
      { id: 'sd-shi', name: 'Shipping', code: 'SD-SHI', moduleId: 'sd' },
      { id: 'sd-bil', name: 'Billing', code: 'SD-BIL', moduleId: 'sd' },
    ],
  },
  {
    id: 'mm',
    name: 'Materials Management',
    code: 'MM',
    subModules: [
      { id: 'mm-pur', name: 'Purchasing', code: 'MM-PUR', moduleId: 'mm' },
      { id: 'mm-im', name: 'Inventory Management', code: 'MM-IM', moduleId: 'mm' },
      { id: 'mm-iv', name: 'Invoice Verification', code: 'MM-IV', moduleId: 'mm' },
    ],
  },
];

// Mock DD Items
export const MOCK_DD_ITEMS: DDItem[] = [
  {
    id: '1',
    itemId: 'DD-FI-GL-001',
    subModuleId: 'fi-gl',
    subModuleName: 'FI-GL',
    kpiName: 'Journal Entry Approval Rate',
    controlObjective: 'Ensure all journal entries are properly approved before posting',
    ddDomain: 'Process Integrity',
    severity: 'High',
    status: 'Needs Review',
    thresholdText: 'Approval rate must be >= 95%',
    currentValue: '87%',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    createdBy: 'admin@enterprise.com',
  },
  {
    id: '2',
    itemId: 'DD-FI-GL-002',
    subModuleId: 'fi-gl',
    subModuleName: 'FI-GL',
    kpiName: 'Month-End Close Timeliness',
    controlObjective: 'Monitor and ensure timely month-end closing processes',
    ddDomain: 'Compliance',
    severity: 'Critical',
    status: 'High Risk',
    thresholdText: 'Close must be completed within 5 business days',
    currentValue: '8 days',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-22T16:00:00Z',
    createdBy: 'admin@enterprise.com',
  },
  {
    id: '3',
    itemId: 'DD-FI-AP-001',
    subModuleId: 'fi-ap',
    subModuleName: 'FI-AP',
    kpiName: 'Duplicate Invoice Detection',
    controlObjective: 'Prevent duplicate invoice payments',
    ddDomain: 'Risk Management',
    severity: 'High',
    status: 'Comfortable',
    thresholdText: 'Duplicate invoices must be < 0.1%',
    currentValue: '0.05%',
    createdAt: '2024-01-12T11:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z',
    createdBy: 'admin@enterprise.com',
  },
  {
    id: '4',
    itemId: 'DD-FI-AP-002',
    subModuleId: 'fi-ap',
    subModuleName: 'FI-AP',
    kpiName: 'Vendor Master Data Accuracy',
    controlObjective: 'Maintain accurate vendor master data',
    ddDomain: 'Data Quality',
    severity: 'Medium',
    status: 'Comfortable',
    thresholdText: 'Data accuracy must be >= 98%',
    currentValue: '99.2%',
    createdAt: '2024-01-08T08:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z',
    createdBy: 'admin@enterprise.com',
  },
  {
    id: '5',
    itemId: 'DD-FI-AR-001',
    subModuleId: 'fi-ar',
    subModuleName: 'FI-AR',
    kpiName: 'Credit Limit Compliance',
    controlObjective: 'Ensure customer credit limits are not exceeded',
    ddDomain: 'Risk Management',
    severity: 'High',
    status: 'Needs Review',
    thresholdText: 'Credit limit violations must be < 2%',
    currentValue: '3.5%',
    createdAt: '2024-01-14T13:00:00Z',
    updatedAt: '2024-01-21T15:00:00Z',
    createdBy: 'admin@enterprise.com',
  },
  {
    id: '6',
    itemId: 'DD-FI-AA-001',
    subModuleId: 'fi-aa',
    subModuleName: 'FI-AA',
    kpiName: 'Asset Depreciation Accuracy',
    controlObjective: 'Ensure accurate asset depreciation calculations',
    ddDomain: 'Process Integrity',
    severity: 'Medium',
    status: 'Comfortable',
    thresholdText: 'Depreciation accuracy must be >= 99%',
    currentValue: '99.8%',
    createdAt: '2024-01-11T10:30:00Z',
    updatedAt: '2024-01-19T11:00:00Z',
    createdBy: 'admin@enterprise.com',
  },
  {
    id: '7',
    itemId: 'DD-FI-BC-001',
    subModuleId: 'fi-bc',
    subModuleName: 'FI-BC',
    kpiName: 'Bank Reconciliation Timeliness',
    controlObjective: 'Ensure timely bank reconciliations',
    ddDomain: 'Compliance',
    severity: 'High',
    status: 'High Risk',
    thresholdText: 'Reconciliation must be completed within 3 days',
    currentValue: '6 days',
    createdAt: '2024-01-13T09:00:00Z',
    updatedAt: '2024-01-22T17:00:00Z',
    createdBy: 'admin@enterprise.com',
  },
];

// Get sub-modules for a specific module
export function getSubModulesByModule(moduleId: string): SubModule[] {
  const module = SAP_MODULES.find((m) => m.id === moduleId);
  return module ? module.subModules : [];
}

// Get all sub-modules
export function getAllSubModules(): SubModule[] {
  return SAP_MODULES.flatMap((module) => module.subModules);
}

// Get module by sub-module ID
export function getModuleBySubModule(subModuleId: string): SAPModule | undefined {
  return SAP_MODULES.find((module) =>
    module.subModules.some((sm) => sm.id === subModuleId)
  );
}

