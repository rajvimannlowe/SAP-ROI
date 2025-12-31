import { useState, useMemo } from "react";
import { CatalogCard } from "../../../../../components/roi/CatalogCard";
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

export function ROICatalogExplorer() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

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
            <CatalogCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
