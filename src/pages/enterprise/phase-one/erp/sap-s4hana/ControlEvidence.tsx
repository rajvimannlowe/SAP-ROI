import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FileText,
  Download,
  Printer,
  ClipboardList,
  Database,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "../../../../../components/layout/PageHeader";
import { MODULE_COCKPIT_DATA } from "../../../../../data/moduleCockpitData";
import { Button } from "../../../../../components/ui/button";
import { getControlEvidenceData } from "../../../../../data/controlEvidenceData";
import ControlOverviewTab from "./components/ControlOverviewTab";
import EvidenceSourcesTab from "./components/EvidenceSourcesTab";
import EffectivenessTab from "./components/EffectivenessTab";
import AssessmentTab from "./components/AssessmentTab";

type TabType = "overview" | "evidence" | "effectiveness" | "assessment";

const tabs = [
  { id: "overview" as TabType, label: "Overview", icon: FileText },
  { id: "evidence" as TabType, label: "Evidence Sources", icon: Database },
  {
    id: "effectiveness" as TabType,
    label: "Effectiveness",
    icon: BarChart3,
  },
  {
    id: "assessment" as TabType,
    label: "Assessment",
    icon: CheckCircle2,
  },
];

export function ControlEvidence() {
  const {
    moduleId,
    kpiId,
    id: blueprintId,
  } = useParams<{
    moduleId: string;
    kpiId: string;
    id: string;
  }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const cockpitData = moduleId ? MODULE_COCKPIT_DATA[moduleId] : null;
  // Find by id (slug) or by converting name to slug format for ROI Intent table navigation
  const kpiDetail = cockpitData?.kpiDetails.find((kpi) => {
    // First try exact id match (for cockpit table navigation)
    if (kpi.id === kpiId) return true;

    // Convert kpi.name to slug format and compare (for ROI Intent table navigation)
    const nameSlug = kpi.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    if (nameSlug === kpiId) return true;

    // Try partial match - check if key words match
    // This handles cases like "duplicate-payment-detection" matching "duplicate-payment-prevention"
    const kpiIdLower = (kpiId || "").toLowerCase();
    const nameSlugLower = nameSlug.toLowerCase();

    // Extract key words (remove common suffixes like -detection, -prevention, -monitoring)
    const normalizeSlug = (slug: string) => {
      return slug
        .replace(/-detection$/, "")
        .replace(/-prevention$/, "")
        .replace(/-monitoring$/, "")
        .replace(/-compliance$/, "")
        .replace(/-coverage$/, "")
        .replace(/-accuracy$/, "");
    };

    const normalizedKpiId = normalizeSlug(kpiIdLower);
    const normalizedNameSlug = normalizeSlug(nameSlugLower);

    // If normalized versions match, consider it a match
    if (normalizedKpiId === normalizedNameSlug) return true;

    // Also check if one contains the other (for partial matches)
    if (
      normalizedKpiId.includes(normalizedNameSlug) ||
      normalizedNameSlug.includes(normalizedKpiId)
    ) {
      return true;
    }

    return false;
  });

  if (!cockpitData || !kpiDetail) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Control Not Found
          </h2>
          <p className="text-muted-foreground mb-4">
            The requested control evidence is not available.
          </p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  // Get data from data folder
  const evidenceData = getControlEvidenceData(
    kpiDetail.name,
    kpiDetail.owner,
    kpiDetail.controlType
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${cockpitData.moduleName} - Control & Compliance Evidence`}
        subtitle={`${evidenceData.controlName} • Control ID: ${evidenceData.controlId}`}
        backTo={`/phase-i/catalog/${
          blueprintId || "sap-s4hana"
        }/blueprint/${moduleId}/cockpit/${kpiId}`}
        backLabel="Back to KPI Detail"
        rightContent={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="default"
              size="sm"
              className="gap-2"
              style={{ backgroundColor: "#10b981" }}
              onClick={() => {
                navigate(
                  `/phase-i/catalog/${
                    blueprintId || "sap-s4hana"
                  }/blueprint/${moduleId}/cockpit/${kpiId}/actions`
                );
              }}
            >
              <ClipboardList className="h-4 w-4" />
              <span className="hidden sm:inline">Action Tracker</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => {}}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => {}}
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print</span>
            </Button>
          </div>
        }
      />

      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm -mx-6 lg:-mx-8 px-6 lg:px-8 py-2.5 border-b border-border/50">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-gradient-to-r from-[#4160F0] to-[#FF6700] text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : ""}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        {activeTab === "overview" && (
          <ControlOverviewTab evidenceData={evidenceData} />
        )}
        {activeTab === "evidence" && (
          <EvidenceSourcesTab evidenceData={evidenceData} />
        )}
        {activeTab === "effectiveness" && (
          <EffectivenessTab evidenceData={evidenceData} />
        )}
        {activeTab === "assessment" && (
          <AssessmentTab evidenceData={evidenceData} />
        )}
      </div>
    </div>
  );
}
