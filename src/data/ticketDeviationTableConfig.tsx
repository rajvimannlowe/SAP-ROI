import { TableColumn } from "@/components/roi/DrilldownTable";
import { renderCellByType } from "./tableColumnTypes";
import { User, Calendar } from "lucide-react";
import { SeverityWithTooltip } from "@/components/roi/SeverityWithTooltip";

export interface DeviationTicketData {
  ticketId: string;
  relatedKPI: string;
  subProcess: string;
  deviationType: string;
  severity: string;
  businessImpact: string;
  estCost: string;
  assignedTo: string;
  status: string;
  dateRaised: string;
  dueDate: string;
  businessImpactDescription: string;
  rootCause: {
    rootCauseCategory: string;
    rootCauseDescription: string;
    contributingFactors: string[];
  };
  actions: {
    correctiveAction: string;
    preventiveAction: string;
    controlEnhancement: {
      isRequired: boolean;
      description: string;
    };
  };
  approval: {
    isRequired: boolean;
    approver: string;
    approverDesignation: string;
    approvalStatus: string;
    approvalDate: string;
    closureNotes: string;
  };
  learnings: {
    learningDescription: string;
    relatedTickets: string[];
  };
  auditTrail: {
    trails: Array<{
      timestamp: string;
      user: string;
      action: string;
    }>;
  };
}

const severityColorMap = {
  High: "#DC2626",
  Medium: "#EA580C",
  Low: "#059669",
};

const statusColorMap = {
  Open: "#DC2626",
  "In Progress": "#EA580C",
  Closed: "#059669",
};


export const getDeviationTicketColumns = (navigate: (path: string) => void): TableColumn<DeviationTicketData>[] => [
  {
    key: "ticketId",
    header: "Ticket ID",
    accessor: (row) =>
      renderCellByType(row.ticketId, "textWithLink", {
        textStyle: "short",
        onClick: () => {
          navigate(`/phase-i/catalog/sap-s4hana/blueprint/fi/cockpit/duplicate-payment-detection/actions/deviation-tickets/${row.ticketId}`);
        },
      }),
    align: "left",
    width: "120px",
  },
  {
    key: "relatedKPI",
    header: "Related KPI",
    accessor: (row) =>
      renderCellByType(row.relatedKPI, "text", {
        textStyle: "short",
      }),
    align: "left",
    width: "180px",
  },
  {
    key: "subProcess",
    header: "Sub-Process",
    accessor: (row) =>
      renderCellByType(row.subProcess, "text", {
        textStyle: "long",
      }),
    align: "left",
    width: "140px",
  },
  {
    key: "deviationType",
    header: "Deviation Type",
    accessor: (row) =>
      renderCellByType(row.deviationType, "text", {
        textStyle: "long",
      }),
    align: "left",
    width: "140px",
  },
  {
    key: "severity",
    header: "Severity",
    accessor: (row) => (
      <SeverityWithTooltip 
        severity={row.severity} 
        colorMap={severityColorMap} 
      />
    ),
    align: "center",
    width: "100px",
  },
  {
    key: "businessImpact",
    header: "Business Impact",
    accessor: (row) =>
      renderCellByType(row.businessImpact, "text", {
        textStyle: "long",
      }),
    align: "left",
    width: "200px",
  },
  {
    key: "estCost",
    header: "Est. Cost",
    accessor: (row) => renderCellByType(row.estCost, "currency"),
    align: "right",
    width: "100px",
  },
  {
    key: "assignedTo",
    header: "Assigned To",
    accessor: (row) =>
      renderCellByType(row.assignedTo, "textWithIcon", {
        textStyle: "long",
        badgeConfig: {
          defaultColor: "#6366F1",
          icon: User,
        },
      }),
    align: "left",
    width: "140px",
  },
  {
    key: "status",
    header: "Status",
    accessor: (row) =>
      renderCellByType(row.status, "badge", {
        badgeConfig: {
          colorMap: statusColorMap,
          defaultColor: "#6366F1",
        },
      }),
    align: "center",
    width: "120px",
  },
  {
    key: "dueDate",
    header: "Due Date",
    accessor: (row) =>
      renderCellByType(row.dueDate, "textWithIcon", {
        textStyle: "long",
        badgeConfig: {
          defaultColor: "#6B7280",
          icon: Calendar,
        },
      }),
    align: "center",
    width: "100px",
  },
];
