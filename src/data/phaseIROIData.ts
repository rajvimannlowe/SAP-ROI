import { DollarSign, TrendingUp, Shield, TrendingDown } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface ROIDimension {
  label: string;
  icon: LucideIcon;
  active: boolean;
  color?: string;
}

export interface Persona {
  label: string;
  active: boolean;
}

export interface InvestmentCard {
  id: string;
  title: string;
  company: string;
  category: string;
  phase: "Phase I" | "Phase 2";
  roiDimensions: ROIDimension[];
  keyPersonas: Persona[];
  bottomText?: string;
  bottomLink?: string;
  highlighted?: boolean;
}

export interface CategorySection {
  category: string;
  investments: InvestmentCard[];
}

export const PHASE_I_ROI_CATEGORIES: CategorySection[] = [
  {
    category: "ERP",
    investments: [
      {
        id: "sap-s4hana",
        title: "SAP S/4HANA",
        company: "SAP",
        category: "ERP",
        phase: "Phase I",
        roiDimensions: [
          { label: "Cost", icon: DollarSign, active: true, color: "#4160F0" },
          {
            label: "Efficiency",
            icon: TrendingUp,
            active: true,
            color: "#4160F0",
          },
          { label: "Compliance", icon: Shield, active: true },
          {
            label: "Revenue",
            icon: TrendingDown,
            active: true,
            color: "#FF6700",
          },
        ],
        keyPersonas: [
          { label: "CEO", active: true },
          { label: "CFO", active: true },
          { label: "CIO", active: true },
        ],
        bottomLink: "Click to view Product ROI Blueprint →",
        highlighted: true,
      },
    ],
  },
  {
    category: "CRM",
    investments: [
      {
        id: "salesforce",
        title: "Salesforce",
        company: "Salesforce",
        category: "CRM",
        phase: "Phase 2",
        roiDimensions: [
          { label: "Cost", icon: DollarSign, active: false },
          {
            label: "Efficiency",
            icon: TrendingUp,
            active: true,
            color: "#4160F0",
          },
          { label: "Compliance", icon: Shield, active: false },
          { label: "Revenue", icon: TrendingDown, active: false },
        ],
        keyPersonas: [
          { label: "CEO", active: true },
          { label: "CFO", active: false },
          { label: "CIO", active: false },
        ],
        bottomText: "Future Phases",
      },
    ],
  },
  {
    category: "Data & Analytics",
    investments: [
      {
        id: "snowflake",
        title: "Snowflake",
        company: "Snowflake",
        category: "Data Platform",
        phase: "Phase 2",
        roiDimensions: [
          { label: "Cost", icon: DollarSign, active: false },
          {
            label: "Efficiency",
            icon: TrendingUp,
            active: true,
            color: "#4160F0",
          },
          { label: "Compliance", icon: Shield, active: false },
          { label: "Revenue", icon: TrendingDown, active: false },
        ],
        keyPersonas: [
          { label: "CEO", active: false },
          { label: "CFO", active: false },
          { label: "CIO", active: true },
        ],
        bottomText: "Future Phases",
      },
    ],
  },
];


