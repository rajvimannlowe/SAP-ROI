import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download, Bell, AlertTriangle } from "lucide-react";
import { PageHeader } from "../../../../../components/layout/PageHeader";
import { Button } from "../../../../../components/ui/button";
import { SummaryCards } from "../../../../../components/roi/cards/SummaryCards";
import { SearchAndFilters } from "../../../../../components/roi/SearchAndFilters";
import {
  getActionTrackerData,
  getSummaryCards,
  getCategorySummaryCards,
  convertActionToCatalogItem,
} from "../../../../../data/actionTrackerData";
import { MODULE_COCKPIT_DATA } from "../../../../../data/moduleCockpitData";
import { CatalogCard } from "../../../../../components/roi/cards/CatalogCard";

export function ActionTracker() {
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

  // Filter state - must be before early return
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [roiDimensionFilter, setRoiDimensionFilter] = useState<string>("");

  const cockpitData = moduleId ? MODULE_COCKPIT_DATA[moduleId] : null;
  const normalizeSlug = (slug: string) =>
    slug.replace(
      /-detection$|-prevention$|-monitoring$|-compliance$|-coverage$|-accuracy$/,
      ""
    );

  const kpiDetail = cockpitData?.kpiDetails.find((kpi) => {
    if (kpi.id === kpiId) return true;
    const nameSlug = kpi.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    if (nameSlug === kpiId) return true;
    const normalized = normalizeSlug((kpiId || "").toLowerCase());
    const normalizedName = normalizeSlug(nameSlug);
    return (
      normalized === normalizedName ||
      normalized.includes(normalizedName) ||
      normalizedName.includes(normalized)
    );
  });

  // Get action data if available, otherwise empty
  const actionData =
    cockpitData && kpiDetail
      ? getActionTrackerData(kpiDetail.name, cockpitData.moduleName)
      : {
          actions: [],
          summary: {
            openActions: 0,
            highRiskActions: 0,
            overdueActions: 0,
            totalActions: 0,
          },
          categorySummary: { PROCESS: 0, DATA: 0, SYSTEM: 0, BEHAVIOUR: 0 },
          kpiName: "",
          moduleName: "",
        };

  // Filter options
  const statusOptions = [
    { value: "", label: "All Status" },
    ...Array.from(new Set(actionData.actions.map((a) => a.status))).map(
      (s) => ({ value: s, label: s.replace("_", " ") })
    ),
  ];
  const priorityOptions = [
    { value: "", label: "All Priority" },
    ...Array.from(new Set(actionData.actions.map((a) => a.priority))).map(
      (p) => ({ value: p, label: p })
    ),
  ];
  const categoryOptions = [
    { value: "", label: "All Categories" },
    ...Array.from(
      new Set(actionData.actions.map((a) => a.rootCauseCategory))
    ).map((c) => ({ value: c, label: c })),
  ];
  const roiDimensionOptions = [
    { value: "", label: "All ROI Dimensions" },
    ...Array.from(
      new Set(actionData.actions.map((a) => a.impactedROIDimension))
    ).map((d) => ({ value: d, label: d })),
  ];

  // Filtered actions - must be before early return
  const filteredActions = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return actionData.actions.filter((action) => {
      const matchesSearch =
        !searchTerm ||
        [
          action.title,
          action.issueDescription,
          action.actionOwner,
          action.id,
        ].some((field) => field.toLowerCase().includes(searchLower));
      return (
        matchesSearch &&
        (!statusFilter || action.status === statusFilter) &&
        (!priorityFilter || action.priority === priorityFilter) &&
        (!categoryFilter || action.rootCauseCategory === categoryFilter) &&
        (!roiDimensionFilter ||
          action.impactedROIDimension === roiDimensionFilter)
      );
    });
  }, [
    actionData.actions,
    searchTerm,
    statusFilter,
    priorityFilter,
    categoryFilter,
    roiDimensionFilter,
  ]);

  const activeFiltersCount = [
    statusFilter,
    priorityFilter,
    categoryFilter,
    roiDimensionFilter,
  ].filter(Boolean).length;

  if (!cockpitData || !kpiDetail) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Action Tracker Not Found
          </h2>
          <p className="text-muted-foreground mb-4">
            The requested action tracker is not available.
          </p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setPriorityFilter("");
    setCategoryFilter("");
    setRoiDimensionFilter("");
  };

  const summaryCards = getSummaryCards(actionData.summary);
  const categorySummaryCards = getCategorySummaryCards(
    actionData.categorySummary
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${cockpitData.moduleName} - ROI Action & Remediation Tracker`}
        subtitle={`Actions for ${actionData.kpiName}`}
        backTo={`/phase-i/catalog/${
          blueprintId || "sap-s4hana"
        }/blueprint/${moduleId}/cockpit/${kpiId}/evidence`}
        backLabel="Back to KPI Detail"
        rightContent={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              className="gap-2 bg-linear-to-r from-[#4160F0] to-[#FF6700] text-white hover:from-[#3550D9] hover:to-[#E65C00] shadow-sm"
              onClick={() => navigate(`/phase-i/catalog/${blueprintId || "sap-s4hana"}/blueprint/${moduleId}/cockpit/${kpiId}/actions/deviation-tickets`)}
            >
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Deviation Tickets</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Set Alert</span>
            </Button>
          </div>
        }
      />

      {/* Unified Summary Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">
          Action Summary Overview
        </h3>
        <SummaryCards
          cards={[...summaryCards, ...categorySummaryCards]}
          columns={6}
        />
      </div>

      {/* Search and Filters */}
      <SearchAndFilters
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search actions by title, description, owner, or ID..."
        filters={[
          {
            label: "Status",
            value: statusFilter,
            options: statusOptions,
            onChange: setStatusFilter,
            placeholder: "All Status",
          },
          {
            label: "Priority",
            value: priorityFilter,
            options: priorityOptions,
            onChange: setPriorityFilter,
            placeholder: "All Priority",
          },
          {
            label: "Category",
            value: categoryFilter,
            options: categoryOptions,
            onChange: setCategoryFilter,
            placeholder: "All Categories",
          },
          {
            label: "ROI Dimension",
            value: roiDimensionFilter,
            options: roiDimensionOptions,
            onChange: setRoiDimensionFilter,
            placeholder: "All ROI Dimensions",
          },
        ]}
        onClearFilters={handleClearFilters}
        activeFiltersCount={activeFiltersCount}
      />

      {/* Action Items List - Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">
            Action Items
            {filteredActions.length !== actionData.actions.length && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({filteredActions.length} of {actionData.actions.length})
              </span>
            )}
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredActions.length}{" "}
            {filteredActions.length === 1 ? "action" : "actions"}
          </span>
        </div>
        {filteredActions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredActions.map((action) => (
              <CatalogCard
                key={action.id}
                item={convertActionToCatalogItem(action)}
                variant="action"
                actionData={action}
                kpiDetailPath={`/phase-i/catalog/${
                  blueprintId || "sap-s4hana"
                }/blueprint/${moduleId}/cockpit/${kpiId}`}
                evidencePath={`/phase-i/catalog/${
                  blueprintId || "sap-s4hana"
                }/blueprint/${moduleId}/cockpit/${kpiId}/evidence`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-xl border border-border/50">
            <p className="text-muted-foreground">
              No actions found matching your filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
