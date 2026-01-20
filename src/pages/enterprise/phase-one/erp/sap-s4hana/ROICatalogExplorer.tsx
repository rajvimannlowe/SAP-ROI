import { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { CatalogCard } from "../../../../../components/roi/cards/CatalogCard";
import { SearchAndFilters } from "../../../../../components/roi/SearchAndFilters";
import { PageHeader } from "../../../../../components/layout/PageHeader";
import {
  CATEGORY_OPTIONS,
  VENDOR_OPTIONS,
  ROI_DIMENSION_OPTIONS,
  PERSONA_OPTIONS,
  INTEGRATION_METHOD_OPTIONS,
} from "../../../../../data/roiCatalogData";
import { PHASE_I_ROI_CATEGORIES, InvestmentCard } from "../../../../../data/phaseIROIData";
import { CatalogItem } from "../../../../../data/roiCatalogData";
import { ModulesSection } from "./components/ModulesSection";
import { ModuleConfigurationSelection } from "./components/ModuleConfigurationSelection";
import { ModuleFlowSelection } from "./components/ModuleFlowSelection";
import { SAP_S4HANA_BLUEPRINT } from "../../../../../data/productBlueprintData";

// Convert InvestmentCard to CatalogItem format
const convertInvestmentToCatalogItem = (investment: InvestmentCard): CatalogItem => {
  return {
    id: investment.id,
    category: investment.category,
    productSuite: investment.title,
    vendor: investment.company,
    roiDimensions: investment.roiDimensions.map(dim => ({
      label: dim.label,
      icon: dim.icon,
      color: dim.color || "#4160F0",
    })),
    primaryROIMetrics: [], // Not displayed but required by interface
    dataSources: ["System Integration", "Data Warehouse", "Analytics Platform"], // Default data sources
    integrationMethod: "API + Database", // Default integration method
    updateFrequency: "Real-time", // Default update frequency
  };
};

// Get all catalog items from portfolio data
const getAllCatalogItems = (): CatalogItem[] => {
  return PHASE_I_ROI_CATEGORIES.flatMap(category =>
    category.investments.map(convertInvestmentToCatalogItem)
  );
};

interface FilterState {
  category: string;
  vendor: string;
  roiDimension: string;
  persona: string;
  integrationMethod: string;
  search: string;
}

const DEFAULT_FILTERS: FilterState = {
  category: "all",
  vendor: "all",
  roiDimension: "all",
  persona: "all",
  integrationMethod: "all",
  search: "",
};

// Helper to convert options to dropdown format
const toDropdownOptions = (options: typeof CATEGORY_OPTIONS) =>
  options.map((opt) => ({ value: opt.value, label: opt.label }));

// Mapping catalog item IDs to blueprint data
// Portfolio data uses blueprint IDs (like "sap-s4hana"), so we map them directly
const catalogToBlueprintMap: Record<string, string> = {
  "1": "sap-s4hana",
  "sap-s4hana": "sap-s4hana",
  "salesforce": "salesforce",
  "snowflake": "snowflake",
  // Add more mappings as needed
};

// Reverse mapping: blueprint ID to catalog ID
const blueprintToCatalogMap: Record<string, string> = {
  "sap-s4hana": "sap-s4hana", // Use blueprint ID directly for portfolio data
  "salesforce": "salesforce",
  "snowflake": "snowflake",
  // Add more mappings as needed
};

const getBlueprintByCatalogId = (catalogId: string) => {
  // For portfolio data, catalogId is the blueprint ID
  if (catalogId === "sap-s4hana") {
    return SAP_S4HANA_BLUEPRINT;
  }
  // Check if it's a mapped ID
  const blueprintId = catalogToBlueprintMap[catalogId];
  if (blueprintId === "sap-s4hana") {
    return SAP_S4HANA_BLUEPRINT;
  }
  return null;
};

// Get catalog ID from blueprint ID or return the ID if it's already a catalog ID
// For portfolio data, IDs are blueprint IDs (like "sap-s4hana"), so we return them as-is
const getCatalogId = (id: string): string => {
  // For portfolio data, IDs are already blueprint IDs, so return as-is
  // Only map if it's a legacy numeric ID
  if (blueprintToCatalogMap[id]) {
    return blueprintToCatalogMap[id];
  }
  // Otherwise, return the ID as-is (it's already a blueprint ID from portfolio data)
  return id;
};

export function ROICatalogExplorer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: productIdFromRoute, moduleId: moduleIdFromRoute } = useParams<{ 
    id?: string;
    moduleId?: string;
  }>();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    productIdFromRoute || null
  );
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(
    moduleIdFromRoute || null
  );

  // Sync selectedProductId and selectedModuleId with route parameters
  useEffect(() => {
    if (productIdFromRoute) {
      // Convert blueprint ID to catalog ID if needed
      const catalogId = getCatalogId(productIdFromRoute);
      setSelectedProductId((prev) => {
        if (prev !== catalogId) {
          return catalogId;
        }
        return prev;
      });
    } else {
      // Clear selection if route doesn't have product ID
      setSelectedProductId((prev) => {
        if (prev !== null) {
          return null;
        }
        return prev;
      });
    }
    
    // Sync moduleId from route
    if (moduleIdFromRoute) {
      setSelectedModuleId(moduleIdFromRoute);
    } else if (!moduleIdFromRoute && selectedModuleId) {
      // Clear module selection if route doesn't have moduleId
      setSelectedModuleId(null);
    }
  }, [productIdFromRoute, moduleIdFromRoute]);

  // Update route when product is selected
  useEffect(() => {
    if (selectedProductId && selectedProductId !== productIdFromRoute) {
      // Use the selectedProductId as-is (it's already converted to catalog ID in the sync effect)
      navigate(`/phase-i/catalog/${selectedProductId}/modules`, { replace: true });
    } else if (!selectedProductId && productIdFromRoute) {
      // If productId is cleared but route still has it, navigate back
      navigate(`/phase-i/catalog`, { replace: true });
    }
  }, [selectedProductId, productIdFromRoute, navigate]);

  const allCatalogItems = useMemo(() => getAllCatalogItems(), []);

  const filteredItems = useMemo(() => {
    return allCatalogItems.filter((item) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (
          !item.productSuite.toLowerCase().includes(searchLower) &&
          !item.vendor.toLowerCase().includes(searchLower) &&
          !item.category.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Category filter
      if (filters.category !== "all" && item.category !== filters.category) {
        return false;
      }

      // Vendor filter (maps to company in portfolio data)
      if (filters.vendor !== "all" && item.vendor !== filters.vendor) {
        return false;
      }

      // ROI Dimension filter
      if (filters.roiDimension !== "all") {
        const hasDimension = item.roiDimensions.some((dim) =>
          dim.label.toLowerCase().includes(filters.roiDimension.toLowerCase())
        );
        if (!hasDimension) return false;
      }

      // Integration Method filter (skip if not available in portfolio data)
      if (
        filters.integrationMethod !== "all" &&
        item.integrationMethod &&
        item.integrationMethod !== filters.integrationMethod
      ) {
        return false;
      }

      return true;
    });
  }, [filters, allCatalogItems]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  const activeFiltersCount = Object.values(filters).filter(
    (v) => v !== "all" && v !== ""
  ).length;

  // Filter configurations for SearchAndFilters component
  const filterConfigs = [
    {
      label: "Category",
      value: filters.category,
      options: toDropdownOptions(CATEGORY_OPTIONS),
      onChange: (value: string) => updateFilter("category", value),
      placeholder: "All Categories",
    },
    {
      label: "Vendor",
      value: filters.vendor,
      options: toDropdownOptions(VENDOR_OPTIONS),
      onChange: (value: string) => updateFilter("vendor", value),
      placeholder: "All Vendors",
    },
    {
      label: "ROI Dimension",
      value: filters.roiDimension,
      options: toDropdownOptions(ROI_DIMENSION_OPTIONS),
      onChange: (value: string) => updateFilter("roiDimension", value),
      placeholder: "All ROI Dimensions",
    },
    {
      label: "Persona",
      value: filters.persona,
      options: toDropdownOptions(PERSONA_OPTIONS),
      onChange: (value: string) => updateFilter("persona", value),
      placeholder: "All Personas",
    },
    {
      label: "Integration Method",
      value: filters.integrationMethod,
      options: toDropdownOptions(INTEGRATION_METHOD_OPTIONS),
      onChange: (value: string) => updateFilter("integrationMethod", value),
      placeholder: "All Methods",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <PageHeader
        title="ROI Catalog Explorer"
        backTo="/phase-i"
        rightContent={
          <>
            <span className="px-2.5 py-0.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200">
              Phase I
            </span>
            <span className="text-sm text-muted-foreground">
              {filteredItems.length} product
              {filteredItems.length !== 1 ? "s" : ""}
            </span>
          </>
        }
      />

      {/* Show flow selection when on /flow route, configuration selection when module is selected, modules when product is selected, otherwise show catalog */}
      {selectedModuleId && selectedProductId ? (() => {
        // Convert to catalog ID if needed
        const catalogId = getCatalogId(selectedProductId);
        const blueprint = getBlueprintByCatalogId(catalogId);
        const selectedModule = blueprint?.subModules.find(m => m.id === selectedModuleId);
        
        if (selectedModule && blueprint) {
          // Use the blueprint ID for navigation, not the catalog ID
          const blueprintId = blueprint.id || selectedProductId;
          
          // Check if we're on the flow route
          const isFlowRoute = location.pathname.includes("/flow");
          
          if (isFlowRoute) {
            // Show flow selection page (2 buttons: ROI Dimension Flow, Sub Module Flow)
            return (
              <ModuleFlowSelection
                blueprintId={blueprintId}
                moduleId={selectedModuleId}
                moduleName={selectedModule.name}
                moduleLabel={selectedModule.label}
                catalogId={catalogId}
                onBack={() => {
                  // Go back to configuration selection page
                  navigate(`/phase-i/catalog/${catalogId}/modules/${selectedModuleId}`);
                }}
              />
            );
          }
          
          // Otherwise, show configuration selection page (3 buttons: Configuration, Report, Action)
          return (
            <ModuleConfigurationSelection
              blueprintId={blueprintId}
              moduleId={selectedModuleId}
              moduleName={selectedModule.name}
              moduleLabel={selectedModule.label}
              catalogId={catalogId}
              onBack={() => {
                setSelectedModuleId(null);
                navigate(`/phase-i/catalog/${catalogId}/modules`);
              }}
            />
          );
        }
        return null;
      })() : selectedProductId ? (() => {
        // Convert to catalog ID if needed
        const catalogId = getCatalogId(selectedProductId);
        const blueprint = getBlueprintByCatalogId(catalogId);
        const selectedItem = allCatalogItems.find(item => item.id === selectedProductId || item.id === catalogId);
        
        if (blueprint && blueprint.subModules) {
          return (
            <div className="space-y-6">
              {/* Product Header */}
              <div className="pb-4 border-b border-border/50">
                <h2 className="text-2xl font-bold text-foreground">
                  {selectedItem?.productSuite || "Product Modules"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Select a module to view detailed ROI cockpit and metrics
                </p>
              </div>

              {/* Modules Section */}
              <ModulesSection
                subModules={blueprint.subModules}
                activeModuleId="fi"
                onModuleClick={(moduleId) => {
                  // Navigate to configuration selection page (not flow page)
                  navigate(`/phase-i/catalog/${selectedProductId}/modules/${moduleId}`);
                }}
                blueprintId={selectedProductId}
              />
            </div>
          );
        }
        return (
          <div className="text-center py-12 bg-card border border-border/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Modules not available for this product.
            </p>
          </div>
        );
      })() : (
        <>
          {/* Search and Filters */}
          <SearchAndFilters
            searchValue={filters.search}
            onSearchChange={(value) => updateFilter("search", value)}
            searchPlaceholder="Search products, vendors, categories..."
            filters={filterConfigs}
            onClearFilters={clearFilters}
            activeFiltersCount={activeFiltersCount}
          />

          {/* Compact Product Cards Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                No products found matching your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredItems.map((item) => (
                <CatalogCard
                  key={item.id}
                  item={item}
                  onClick={() => setSelectedProductId(item.id)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
