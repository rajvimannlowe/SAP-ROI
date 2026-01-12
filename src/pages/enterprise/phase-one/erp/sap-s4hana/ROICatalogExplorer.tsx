import { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CatalogCard } from "../../../../../components/roi/cards/CatalogCard";
import { SearchAndFilters } from "../../../../../components/roi/SearchAndFilters";
import { PageHeader } from "../../../../../components/layout/PageHeader";
import {
  ROI_CATALOG_ITEMS,
  CATEGORY_OPTIONS,
  VENDOR_OPTIONS,
  ROI_DIMENSION_OPTIONS,
  PERSONA_OPTIONS,
  INTEGRATION_METHOD_OPTIONS,
} from "../../../../../data/roiCatalogData";
import { ModulesSection } from "./components/ModulesSection";
import { ModuleFlowSelection } from "./components/ModuleFlowSelection";
import { SAP_S4HANA_BLUEPRINT } from "../../../../../data/productBlueprintData";

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
const catalogToBlueprintMap: Record<string, string> = {
  "1": "sap-s4hana",
  // Add more mappings as needed
};

// Reverse mapping: blueprint ID to catalog ID
const blueprintToCatalogMap: Record<string, string> = {
  "sap-s4hana": "1",
  // Add more mappings as needed
};

const getBlueprintByCatalogId = (catalogId: string) => {
  const blueprintId = catalogToBlueprintMap[catalogId];
  if (blueprintId === "sap-s4hana") {
    return SAP_S4HANA_BLUEPRINT;
  }
  return null;
};

// Get catalog ID from blueprint ID or return the ID if it's already a catalog ID
const getCatalogId = (id: string): string => {
  // If it's already a catalog ID (numeric), return it
  if (catalogToBlueprintMap[id]) {
    return id;
  }
  // Otherwise, try to map from blueprint ID
  return blueprintToCatalogMap[id] || id;
};

export function ROICatalogExplorer() {
  const navigate = useNavigate();
  const { id: productIdFromRoute } = useParams<{ id?: string }>();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    productIdFromRoute || null
  );
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  // Sync selectedProductId with route parameter
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
  }, [productIdFromRoute]);

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

  const filteredItems = useMemo(() => {
    return ROI_CATALOG_ITEMS.filter((item) => {
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

      // Vendor filter
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

      // Integration Method filter
      if (
        filters.integrationMethod !== "all" &&
        item.integrationMethod !== filters.integrationMethod
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

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

      {/* Show flow selection when module is selected, modules when product is selected, otherwise show catalog */}
      {selectedModuleId && selectedProductId ? (() => {
        // Convert to catalog ID if needed
        const catalogId = getCatalogId(selectedProductId);
        const blueprint = getBlueprintByCatalogId(catalogId);
        const selectedModule = blueprint?.subModules.find(m => m.id === selectedModuleId);
        
        if (selectedModule && blueprint) {
          // Use the blueprint ID for navigation, not the catalog ID
          const blueprintId = blueprint.id || selectedProductId;
          return (
            <ModuleFlowSelection
              blueprintId={blueprintId}
              moduleId={selectedModuleId}
              moduleName={selectedModule.name}
              moduleLabel={selectedModule.label}
              onBack={() => setSelectedModuleId(null)}
            />
          );
        }
        return null;
      })() : selectedProductId ? (() => {
        // Convert to catalog ID if needed
        const catalogId = getCatalogId(selectedProductId);
        const blueprint = getBlueprintByCatalogId(catalogId);
        const selectedItem = ROI_CATALOG_ITEMS.find(item => item.id === catalogId);
        
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
                onModuleClick={(moduleId) => setSelectedModuleId(moduleId)}
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
