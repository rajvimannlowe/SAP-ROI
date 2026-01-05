import {
  Target,
  BarChart3,
  Database,
  Brain,
  Layers,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export type Section = "intent" | "metrics" | "data" | "intelligence" | "modules";

export interface SectionConfig {
  id: Section;
  label: string;
  icon: LucideIcon;
}

export const sections: SectionConfig[] = [
  { id: "intent", label: "ROI Intent", icon: Target },
  { id: "metrics", label: "Metrics", icon: BarChart3 },
  { id: "data", label: "Data & Integration", icon: Database },
  { id: "intelligence", label: "Intelligence", icon: Brain },
  { id: "modules", label: "Modules", icon: Layers },
];

export const gradientStyles = {
  primary: "linear-gradient(135deg, #4160F0 0%, #2563eb 100%)",
  brand: "linear-gradient(135deg, #4160F0 0%, #FF6700 100%)",
  emerald: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  purple: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
  indigo: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
  amber: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
  blueBg:
    "linear-gradient(135deg, rgba(65, 96, 240, 0.05) 0%, rgba(65, 96, 240, 0.02) 100%)",
  purpleBg:
    "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(139, 92, 246, 0.02) 100%)",
  brandBg:
    "linear-gradient(135deg, rgba(65, 96, 240, 0.05) 0%, rgba(255, 103, 0, 0.05) 100%)",
  amberBg:
    "linear-gradient(135deg, rgba(254, 243, 199, 0.5) 0%, rgba(253, 230, 138, 0.3) 100%)",
  footerBg:
    "linear-gradient(135deg, rgba(65, 96, 240, 0.03) 0%, rgba(255, 103, 0, 0.03) 100%)",
};

