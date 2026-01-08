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
    dateRaised: "20/12/2025",
    dueDate: "30/12/2025",
    businessImpactDescription: "Data quality dropped to 94.2%, below the 95% threshold. This creates duplicate payment risk estimated at $180K annually, increases vendor fraud exposure, and impacts 1099 filing accuracy. Approximately 127 vendor records require remediation including 48 missing W-9 forms.",
    rootCause: {
      rootCauseCategory: "Process",
      rootCauseDescription: "Analysis reveals that vendor onboarding volume increased by 35% in Q4 due to new product line expansion, but vendor master data governance processes were not scaled accordingly. The vendor creation workflow lacks mandatory field validation at point of entry, allowing incomplete records to enter the system. Additionally, W-9 collection is managed manually via email, with no systematic follow-up process. The annual vendor data quality review was postponed twice due to resource constraints, allowing data degradation to accumulate undetected.",
      contributingFactors: [
        "Vendor onboarding volume increased 35% without corresponding process capacity adjustment",
        "Lack of mandatory field validation in vendor creation workflow (SAP MM module)",
        "Manual W-9 collection process with no automated reminders or escalation",
        "Annual vendor data quality review postponed in Q2 and Q3 2024",
        "No real-time data quality monitoring dashboard available to AP team",
        "Shared services team turnover resulted in 3 new staff members unfamiliar with data quality standards"
      ]
    },
    actions: {
      correctiveAction: "Initiated 30-day vendor data remediation project with dedicated resources assigned. Implemented daily monitoring of data quality score with escalation protocol if score drops below 95%. Launched emergency W-9 collection campaign targeting 48 missing forms with legal compliance team support. Added data quality checkpoints to weekly AP team meetings.",
      preventiveAction: "Implement mandatory field validation in SAP vendor master transaction (XK01/XK02) to prevent incomplete record creation. Deploy automated W-9 collection workflow integrated with vendor onboarding, including automated reminders at 7, 14, and 21 days. Establish quarterly vendor data quality review cadence with ownership assigned to AP Supervisor. Create real-time data quality dashboard visible to AP team. Develop vendor onboarding capacity model to scale resources with volume changes.",
      controlEnhancement: {
        isRequired: true,
        description: "Enhance FI-CTL-003 (Vendor Master Data Quality Review) to include: (1) automated data quality monitoring with threshold alerts, (2) mandatory W-9 validation before vendor approval, (3) quarterly rather than annual review frequency, (4) escalation protocol for quality scores below 96%.",    
      }
    },
    approval: {
      isRequired: true,
      approver: "Michael Torres",
      approverDesignation: "Finance Controller",
      approvalStatus: "Pending",
      approvalDate: "20/12/2025",
      closureNotes: "Pending completion of remediation project and implementation of enhanced controls. Requires IT development effort estimated at 40 hours for SAP validation logic."
    },
    learnings: {
      learningDescription: "Vendor onboarding volume increased 35% without corresponding process capacity adjustment",
      relatedTickets: ["TKT-2025-1043", "TKT-2025-1048"],
    },
    auditTrail: {
      trails: [
        {
          timestamp: "20/12/2025 10:00",
          user: "System Alert",
          action: "Ticket auto-created: Data quality threshold breach detected",
        },
        {
          timestamp: "21/12/2025 11:12", 
          user: "Sarah Chen",
          action: "Ticket assigned and acknowledged",
        },
        {
          timestamp: "22/12/2025 22:20",
          user: "Sarah Chen",
          action: "Root cause analysis completed and documented",
        },
        {
          timestamp: "23/12/2025 13:00",
          user: "Sarah Chen",
          action: "Corrective action plan submitted for approval",
        },
        {
          timestamp: "24/12/2025 14:32",
          user: "Michael Torres",
          action: "Corrective action plan approved by Finance Controller",
        },
      ]
    }
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
    dateRaised: "18/12/2025",
    dueDate: "28/12/2025",
    businessImpactDescription: "Invoice processing accuracy dropped to 87.3%, below the 90% threshold. This requires manual intervention for 156 invoices weekly, causing 2-day processing delays and impacting vendor payment terms. Estimated annual cost of $95K includes overtime costs and potential early payment discount losses.",
    rootCause: {
      rootCauseCategory: "System",
      rootCauseDescription: "Recent SAP system upgrade (ECC 6.0 to S/4HANA) introduced changes to invoice validation logic. The new system requires additional mandatory fields that were not configured during migration. OCR scanning accuracy decreased due to incompatible document templates from key vendors. Integration with expense management system is causing duplicate invoice entries.",
      contributingFactors: [
        "SAP S/4HANA migration incomplete - missing field mappings for 23 vendor templates",
        "OCR scanning engine not optimized for new document formats",
        "Integration middleware between AP and expense systems creating duplicate entries",
        "User training on new system delayed by 3 weeks due to resource constraints",
        "Vendor master data cleanup not completed before system go-live"
      ]
    },
    actions: {
      correctiveAction: "Deployed dedicated team to manually process backlog of 156 invoices. Implemented temporary bypass for problematic vendor templates. Initiated emergency vendor outreach to update document formats. Added daily monitoring dashboard for processing accuracy metrics.",
      preventiveAction: "Complete SAP field mapping configuration for all vendor templates. Upgrade OCR engine with AI-enhanced document recognition. Implement duplicate detection logic in middleware integration. Schedule comprehensive user training program. Establish vendor template standardization project.",
      controlEnhancement: {
        isRequired: true,
        description: "Enhance FI-CTL-007 (Invoice Processing Controls) to include: (1) automated accuracy monitoring with real-time alerts, (2) mandatory template validation before vendor onboarding, (3) duplicate detection controls in system integration points."
      }
    },
    approval: {
      isRequired: true,
      approver: "Sarah Chen",
      approverDesignation: "AP Manager",
      approvalStatus: "In Progress",
      approvalDate: "19/12/2025",
      closureNotes: "Corrective actions 60% complete. System configuration changes require IT development estimated at 80 hours. Vendor template updates in progress with 15 of 23 vendors confirmed."
    },
    learnings: {
      learningDescription: "System migrations require comprehensive testing of all vendor document formats and integration points before go-live",
      relatedTickets: ["TKT-2025-1043", "TKT-2025-1049"]
    },
    auditTrail: {
      trails: [
        {
          timestamp: "18/12/2025 14:30",
          user: "System Alert",
          action: "Ticket auto-created: Invoice processing accuracy threshold breach"
        },
        {
          timestamp: "18/12/2025 15:45",
          user: "Sarah Chen",
          action: "Ticket assigned and root cause analysis initiated"
        },
        {
          timestamp: "19/12/2025 09:15",
          user: "Sarah Chen",
          action: "Corrective action plan approved and implementation started"
        },
        {
          timestamp: "20/12/2025 16:20",
          user: "IT Support Team",
          action: "System configuration changes initiated"
        }
      ]
    }
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
    dateRaised: "16/12/2025",
    dueDate: "25/12/2025",
    businessImpactDescription: "Critical control bypass detected in payment authorization workflow. 12 payments totaling $250K were processed without proper dual authorization, violating SOX compliance requirements. This creates significant audit risk and potential regulatory penalties. Emergency review identified gaps in segregation of duties controls.",
    rootCause: {
      rootCauseCategory: "Behaviour",
      rootCauseDescription: "Investigation revealed that during year-end payment rush, senior treasury staff bypassed standard dual authorization controls to expedite vendor payments. The system allows emergency payment processing with single authorization when users have elevated privileges. Two staff members used emergency override codes without proper documentation or subsequent approval. Root cause stems from inadequate training on compliance requirements and pressure to meet year-end payment deadlines.",
      contributingFactors: [
        "Year-end payment volume increased 40% creating time pressure on treasury team",
        "Emergency override functionality lacks proper audit trail and approval workflow",
        "Insufficient training on SOX compliance requirements for new treasury staff",
        "Segregation of duties matrix not updated after recent organizational changes",
        "No real-time monitoring of control overrides or exception reporting",
        "Management pressure to complete payments before year-end created compliance shortcuts"
      ]
    },
    actions: {
      correctiveAction: "Immediately suspended emergency override privileges for all staff. Initiated comprehensive review of all payments processed in December. Implemented temporary dual authorization requirement for all payments above $10K. Engaged external compliance consultant to assess control gaps. Scheduled emergency SOX compliance training for all treasury staff.",
      preventiveAction: "Redesign emergency payment workflow to require subsequent approval within 24 hours. Implement real-time monitoring dashboard for control overrides. Update segregation of duties matrix and system access controls. Establish quarterly compliance training program. Create escalation protocol for high-volume periods that maintains control integrity.",
      controlEnhancement: {
        isRequired: true,
        description: "Enhance TR-CTL-001 (Payment Authorization Controls) to include: (1) mandatory dual authorization for all payments above $5K with no override capability, (2) real-time monitoring of control exceptions, (3) automated escalation for emergency payments requiring post-approval within 4 hours."
      }
    },
    approval: {
      isRequired: true,
      approver: "David Rodriguez",
      approverDesignation: "Treasury Director",
      approvalStatus: "Pending",
      approvalDate: "17/12/2025",
      closureNotes: "High priority remediation required before year-end. External audit notification required due to SOX implications. Estimated 120 hours for system configuration and process redesign."
    },
    learnings: {
      learningDescription: "High-pressure periods require enhanced controls, not relaxed ones. Emergency overrides must maintain audit trail integrity",
      relatedTickets: ["TKT-2025-1049", "TKT-2025-1050"]
    },
    auditTrail: {
      trails: [
        {
          timestamp: "16/12/2025 08:45",
          user: "System Alert",
          action: "Ticket auto-created: Multiple payment authorization overrides detected"
        },
        {
          timestamp: "16/12/2025 09:30",
          user: "David Rodriguez",
          action: "Critical priority assigned - SOX compliance impact identified"
        },
        {
          timestamp: "16/12/2025 11:00",
          user: "Compliance Team",
          action: "External auditor notification initiated"
        },
        {
          timestamp: "17/12/2025 14:15",
          user: "David Rodriguez",
          action: "Emergency controls implemented - override privileges suspended"
        }
      ]
    }
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
    dateRaised: "10/12/2025",
    dueDate: "20/12/2025",
    businessImpactDescription: "Bank reconciliation process delayed by 3 days, impacting month-end close timeline. This creates reporting delays for management and affects quarterly financial statement preparation. Estimated cost of $45K includes overtime and external accounting support.",
    rootCause: {
      rootCauseCategory: "Process",
      rootCauseDescription: "Manual reconciliation process became bottleneck due to increased transaction volume and staff shortage. Key reconciliation analyst was on extended leave, and backup procedures were not adequately documented. New banking system integration created additional reconciling items that required manual investigation.",
      contributingFactors: [
        "Primary reconciliation analyst on medical leave for 2 weeks",
        "Backup procedures not documented or tested",
        "New banking system integration created 47 unidentified reconciling items",
        "Transaction volume increased 25% due to year-end activity",
        "Reconciliation software license expired causing manual processing"
      ]
    },
    actions: {
      correctiveAction: "Engaged temporary accounting staff to complete backlog. Documented all reconciliation procedures and created backup analyst training program. Resolved banking system integration issues and cleared reconciling items.",
      preventiveAction: "Implement automated reconciliation tools. Cross-train additional staff on reconciliation procedures. Establish monthly reconciliation process review. Create early warning system for high transaction volume periods.",
      controlEnhancement: {
        isRequired: false,
        description: "Current controls adequate - process improvements focused on automation and backup procedures."
      }
    },
    approval: {
      isRequired: true,
      approver: "Emma Wilson",
      approverDesignation: "GL Manager",
      approvalStatus: "Approved",
      approvalDate: "20/12/2025",
      closureNotes: "All reconciliations completed. Process improvements implemented. Backup procedures tested and documented."
    },
    learnings: {
      learningDescription: "Critical processes require documented backup procedures and cross-trained staff",
      relatedTickets: ["TKT-2025-1049"]
    },
    auditTrail: {
      trails: [
        {
          timestamp: "10/12/2025 16:00",
          user: "System Alert",
          action: "Ticket auto-created: Reconciliation deadline missed"
        },
        {
          timestamp: "11/12/2025 08:30",
          user: "Emma Wilson",
          action: "Ticket assigned and temporary staff engaged"
        },
        {
          timestamp: "15/12/2025 14:20",
          user: "Emma Wilson",
          action: "Reconciliation backlog cleared - process improvements initiated"
        },
        {
          timestamp: "20/12/2025 17:00",
          user: "Emma Wilson",
          action: "Ticket closed - all actions completed successfully"
        }
      ]
    }
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
    dateRaised: "14/12/2025",
    dueDate: "02/01/2026",
    businessImpactDescription: "Multiple expense reports totaling $120K were processed without proper manager approval, violating expense policy. This includes 23 reports exceeding individual approval limits and 8 reports with missing receipts. Budget overruns detected in 5 departments due to unauthorized expense approvals.",
    rootCause: {
      rootCauseCategory: "System",
      rootCauseDescription: "Expense management system upgrade introduced workflow bugs that allowed expense reports to bypass approval steps. System integration with HR for manager hierarchy was incomplete, causing approval routing failures. Additionally, mobile app version had a bug that marked expenses as approved when they were only submitted.",
      contributingFactors: [
        "Expense system upgrade deployed without adequate testing of approval workflows",
        "HR system integration incomplete - manager hierarchy not synchronized",
        "Mobile app bug marking submitted expenses as approved",
        "User training on new system delayed causing confusion about approval process",
        "Temporary approval limits not configured during system transition"
      ]
    },
    actions: {
      correctiveAction: "Immediately rolled back expense system to previous version. Manually reviewed all expenses processed during bug period. Implemented temporary manual approval process for expenses above $500. Engaged vendor for emergency bug fixes.",
      preventiveAction: "Implement comprehensive testing protocol for system upgrades. Establish parallel approval tracking during system transitions. Create automated monitoring for approval workflow exceptions. Develop rollback procedures for critical system updates.",
      controlEnhancement: {
        isRequired: true,
        description: "Enhance EX-CTL-002 (Expense Approval Controls) to include: (1) automated monitoring of approval workflow exceptions, (2) mandatory testing of approval routing before system updates, (3) parallel manual approval process during system transitions."
      }
    },
    approval: {
      isRequired: true,
      approver: "James Park",
      approverDesignation: "Expense Manager",
      approvalStatus: "In Progress",
      approvalDate: "15/12/2025",
      closureNotes: "System rollback completed. Bug fixes 70% complete. Manual review of affected expenses ongoing. Estimated completion by 02/01/2026."
    },
    learnings: {
      learningDescription: "Critical system updates require comprehensive testing of all workflow scenarios before deployment",
      relatedTickets: ["TKT-2025-1044", "TKT-2025-1045"]
    },
    auditTrail: {
      trails: [
        {
          timestamp: "14/12/2025 11:20",
          user: "System Alert",
          action: "Ticket auto-created: Multiple approval bypass exceptions detected"
        },
        {
          timestamp: "14/12/2025 13:45",
          user: "James Park",
          action: "Emergency response initiated - system rollback authorized"
        },
        {
          timestamp: "15/12/2025 09:30",
          user: "IT Support Team",
          action: "System rollback completed - manual approval process activated"
        },
        {
          timestamp: "18/12/2025 16:15",
          user: "James Park",
          action: "Manual expense review 40% complete - vendor engaged for bug fixes"
        }
      ]
    }
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
    dateRaised: "12/12/2025",
    dueDate: "15/01/2026",
    businessImpactDescription: "Depreciation calculations for 15 assets totaling $2.3M in book value contain errors, resulting in $35K overstatement of depreciation expense. This creates financial statement misstatement risk and impacts asset valuation accuracy for year-end reporting.",
    rootCause: {
      rootCauseCategory: "Data",
      rootCauseDescription: "Asset master data contains incorrect useful life and salvage value information for assets acquired in Q3 2024. Data entry errors occurred during bulk asset upload when new ERP module was implemented. Additionally, depreciation method changes for certain asset classes were not properly configured in the system.",
      contributingFactors: [
        "Bulk asset upload contained data validation errors for 15 assets",
        "Useful life data incorrectly entered as months instead of years for 8 assets",
        "Salvage values not updated for assets with revised estimates",
        "Depreciation method changes not configured in system for new asset classes",
        "Monthly depreciation review process not catching calculation errors"
      ]
    },
    actions: {
      correctiveAction: "Corrected asset master data for all affected assets. Recalculated depreciation from acquisition date. Prepared journal entries to correct year-to-date depreciation expense. Implemented monthly asset register review process.",
      preventiveAction: "Establish data validation rules for asset master data entry. Implement automated depreciation calculation verification. Create monthly asset depreciation variance analysis. Develop asset data quality monitoring dashboard.",
      controlEnhancement: {
        isRequired: true,
        description: "Enhance FA-CTL-001 (Asset Depreciation Controls) to include: (1) automated data validation for asset master data, (2) monthly depreciation calculation verification, (3) variance analysis for unusual depreciation amounts."
      }
    },
    approval: {
      isRequired: true,
      approver: "Lisa Thompson",
      approverDesignation: "Fixed Assets Manager",
      approvalStatus: "Pending",
      approvalDate: "13/12/2025",
      closureNotes: "Asset data corrections in progress. Journal entries prepared for year-end adjustment. Control enhancements to be implemented in Q1 2026."
    },
    learnings: {
      learningDescription: "Asset master data quality is critical for accurate financial reporting - validation rules must be comprehensive",
      relatedTickets: ["TKT-2025-1043", "TKT-2025-1044"]
    },
    auditTrail: {
      trails: [
        {
          timestamp: "12/12/2025 10:15",
          user: "System Alert",
          action: "Ticket auto-created: Depreciation variance threshold exceeded"
        },
        {
          timestamp: "12/12/2025 14:30",
          user: "Lisa Thompson",
          action: "Ticket assigned and asset data analysis initiated"
        },
        {
          timestamp: "13/12/2025 16:45",
          user: "Lisa Thompson",
          action: "Root cause identified - asset master data corrections started"
        },
        {
          timestamp: "16/12/2025 11:20",
          user: "Lisa Thompson",
          action: "Corrective journal entries prepared - pending approval"
        }
      ]
    }
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
    dateRaised: "15/12/2025",
    dueDate: "08/01/2026",
    businessImpactDescription: "Cash flow forecasting accuracy dropped to 78%, below the 85% threshold. Variance of $2.1M between forecasted and actual cash flows caused liquidity planning issues and delayed $85K investment opportunity. This impacts treasury management effectiveness and working capital optimization.",
    rootCause: {
      rootCauseCategory: "Data",
      rootCauseDescription: "Data feeds from multiple systems (AP, AR, Payroll) contain timing inconsistencies and duplicate entries. Sales forecast integration with cash flow model is not real-time, causing outdated revenue projections. Additionally, manual adjustments for seasonal patterns are not being applied consistently.",
      contributingFactors: [
        "AP system data feed has 2-day delay causing payment timing errors",
        "AR aging reports not synchronized with collection forecasts",
        "Sales forecast system integration runs weekly instead of daily",
        "Manual seasonal adjustments not documented or consistently applied",
        "Foreign exchange rate updates not automated in cash flow model",
        "Capital expenditure forecasts not integrated with cash flow projections"
      ]
    },
    actions: {
      correctiveAction: "Implemented daily data synchronization from all source systems. Created manual reconciliation process for data inconsistencies. Updated cash flow model with current seasonal adjustment factors. Engaged IT team to resolve data feed timing issues.",
      preventiveAction: "Establish real-time data integration for all cash flow inputs. Implement automated data quality checks and exception reporting. Create standardized seasonal adjustment methodology. Develop cash flow forecasting accuracy monitoring dashboard.",
      controlEnhancement: {
        isRequired: true,
        description: "Enhance TR-CTL-005 (Cash Flow Forecasting Controls) to include: (1) real-time data integration monitoring, (2) automated accuracy variance analysis, (3) standardized seasonal adjustment procedures."
      }
    },
    approval: {
      isRequired: true,
      approver: "Robert Kim",
      approverDesignation: "Treasury Manager",
      approvalStatus: "Pending",
      approvalDate: "16/12/2025",
      closureNotes: "Data integration improvements 30% complete. IT development estimated at 60 hours for real-time feeds. Accuracy monitoring to be implemented by Q1 2026."
    },
    learnings: {
      learningDescription: "Cash flow forecasting requires real-time data integration and standardized adjustment methodologies",
      relatedTickets: ["TKT-2025-1044", "TKT-2025-1045"]
    },
    auditTrail: {
      trails: [
        {
          timestamp: "15/12/2025 09:30",
          user: "System Alert",
          action: "Ticket auto-created: Cash flow forecast accuracy below threshold"
        },
        {
          timestamp: "15/12/2025 11:15",
          user: "Robert Kim",
          action: "Ticket assigned and data source analysis initiated"
        },
        {
          timestamp: "16/12/2025 14:20",
          user: "Robert Kim",
          action: "Root cause analysis completed - IT engagement for data feed fixes"
        },
        {
          timestamp: "18/12/2025 10:45",
          user: "IT Support Team",
          action: "Data integration project initiated - daily sync implementation started"
        }
      ]
    }
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
    dateRaised: "13/12/2025",
    dueDate: "31/12/2025",
    businessImpactDescription: "Critical tax compliance breach identified: quarterly sales tax filings for 3 states were submitted late, and withholding tax calculations contain errors affecting 156 employees. Estimated penalties and interest of $300K, plus significant audit risk and potential regulatory sanctions.",
    rootCause: {
      rootCauseCategory: "Process",
      rootCauseDescription: "Tax compliance calendar was not updated after organizational changes and new business locations. Key tax personnel changes resulted in knowledge gaps about multi-state filing requirements. Additionally, payroll system integration with tax calculation engine has been producing incorrect withholding amounts due to outdated tax tables.",
      contributingFactors: [
        "Tax compliance calendar not updated for new business locations in 3 states",
        "Senior tax manager departure created knowledge gap in multi-state requirements",
        "Payroll system tax tables not updated for 2025 tax year changes",
        "Integration between payroll and tax systems producing calculation errors",
        "No backup procedures for critical tax filing deadlines",
        "Tax compliance monitoring system not configured for new jurisdictions"
      ]
    },
    actions: {
      correctiveAction: "Engaged external tax consultant for immediate compliance remediation. Filed amended returns and penalty abatement requests. Corrected payroll tax calculations and processed adjustment payments for affected employees. Implemented emergency tax compliance monitoring.",
      preventiveAction: "Update comprehensive tax compliance calendar for all jurisdictions. Implement automated tax deadline monitoring system. Establish quarterly tax compliance review process. Create backup procedures for all critical tax functions. Engage tax technology consultant for system integration fixes.",
      controlEnhancement: {
        isRequired: true,
        description: "Enhance TX-CTL-001 (Tax Compliance Controls) to include: (1) automated deadline monitoring with escalation alerts, (2) quarterly multi-jurisdiction compliance review, (3) real-time tax calculation validation, (4) backup personnel for all critical tax functions."
      }
    },
    approval: {
      isRequired: true,
      approver: "Maria Garcia",
      approverDesignation: "Tax Director",
      approvalStatus: "Pending",
      approvalDate: "14/12/2025",
      closureNotes: "Critical priority - year-end deadline. External consultant engaged. Penalty abatement requests submitted. System fixes estimated at 100 hours development time."
    },
    learnings: {
      learningDescription: "Tax compliance requires robust backup procedures and automated monitoring systems - personnel changes create significant risk",
      relatedTickets: ["TKT-2025-1045", "TKT-2025-1047"]
    },
    auditTrail: {
      trails: [
        {
          timestamp: "13/12/2025 07:30",
          user: "System Alert",
          action: "Ticket auto-created: Multiple tax filing deadlines missed"
        },
        {
          timestamp: "13/12/2025 08:15",
          user: "Maria Garcia",
          action: "Critical priority assigned - external consultant engagement authorized"
        },
        {
          timestamp: "13/12/2025 12:00",
          user: "External Tax Consultant",
          action: "Compliance assessment initiated - penalty abatement strategy developed"
        },
        {
          timestamp: "14/12/2025 16:30",
          user: "Maria Garcia",
          action: "Amended returns filed - payroll tax corrections processing"
        }
      ]
    }
  }
];