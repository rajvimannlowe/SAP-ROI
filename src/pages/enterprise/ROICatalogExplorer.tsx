import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Filter, X, Search } from "lucide-react";
import { Dropdown } from "../../components/ui/dropdown";
import { CatalogCard } from "../../components/roi/CatalogCard";
import {
  ROI_CATALOG_ITEMS,
  CATEGORY_OPTIONS,
  VENDOR_OPTIONS,
  ROI_DIMENSION_OPTIONS,
  PERSONA_OPTIONS,
  INTEGRATION_METHOD_OPTIONS,
} from "../../data/roiCatalogData";

interface FilterState {
  category: string;
  vendor: string;
  roiDimension: string;
  persona: string;
  integrationMethod: string;
  search: string;
}

export function ROICatalogExplorer() {
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    vendor: "all",
    roiDimension: "all",
    persona: "all",
    integrationMethod: "all",
    search: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = useMemo(() => {
    return ROI_CATALOG_ITEMS.filter((item) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          item.productSuite.toLowerCase().includes(searchLower) ||
          item.vendor.toLowerCase().includes(searchLower) ||
          item.category.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (filters.category !== "all" && item.category !== filters.category) {
        return false;
      }
      if (filters.vendor !== "all" && item.vendor !== filters.vendor) {
        return false;
      }
      if (filters.roiDimension !== "all") {
        const hasDimension = item.roiDimensions.some((dim) =>
          dim.label.toLowerCase().includes(filters.roiDimension.toLowerCase())
        );
        if (!hasDimension) return false;
      }
      if (filters.integrationMethod !== "all") {
        if (item.integrationMethod !== filters.integrationMethod) {
          return false;
        }
      }
      return true;
    });
  }, [filters]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: "all",
      vendor: "all",
      roiDimension: "all",
      persona: "all",
      integrationMethod: "all",
      search: "",
    });
  };

  const activeFiltersCount = Object.values(filters).filter(
    (v) => v !== "all" && v !== ""
  ).length;

  // Convert options to dropdown format
  const categoryDropdownOptions = CATEGORY_OPTIONS.map((opt) => ({
    value: opt.value,
    label: opt.label,
  }));

  const vendorDropdownOptions = VENDOR_OPTIONS.map((opt) => ({
    value: opt.value,
    label: opt.label,
  }));

  const roiDimensionDropdownOptions = ROI_DIMENSION_OPTIONS.map((opt) => ({
    value: opt.value,
    label: opt.label,
  }));

  const personaDropdownOptions = PERSONA_OPTIONS.map((opt) => ({
    value: opt.value,
    label: opt.label,
  }));

  const integrationMethodDropdownOptions = INTEGRATION_METHOD_OPTIONS.map((opt) => ({
    value: opt.value,
    label: opt.label,
  }));

  return (
    <div className="space-y-4">
      {/* Compact Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/phase-i"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <h1 className="text-2xl font-bold text-foreground">
            ROI Catalog Explorer
          </h1>
          <span className="px-2.5 py-0.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200">
            Phase I
          </span>
          <span className="text-sm text-muted-foreground">
            {filteredItems.length} product{filteredItems.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Enhanced Search and Filters Bar */}
      <div className="bg-card border border-border/50 rounded-lg shadow-sm p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products, vendors, categories..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Filter Toggle Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg border-2 transition-all flex items-center gap-2 ${
                showFilters || activeFiltersCount > 0
                  ? "bg-blue-50 border-blue-200 text-blue-700 shadow-sm"
                  : "bg-background border-border text-foreground hover:bg-muted/50"
              }`}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold bg-blue-600 text-white rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="px-4 py-2.5 text-sm font-medium rounded-lg border-2 border-border bg-background text-foreground hover:bg-muted/50 transition-all flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Category
                </label>
                <Dropdown
                  options={categoryDropdownOptions}
                  value={filters.category}
                  onChange={(value) => updateFilter("category", value)}
                  placeholder="All Categories"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Vendor
                </label>
                <Dropdown
                  options={vendorDropdownOptions}
                  value={filters.vendor}
                  onChange={(value) => updateFilter("vendor", value)}
                  placeholder="All Vendors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  ROI Dimension
                </label>
                <Dropdown
                  options={roiDimensionDropdownOptions}
                  value={filters.roiDimension}
                  onChange={(value) => updateFilter("roiDimension", value)}
                  placeholder="All ROI Dimensions"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Persona
                </label>
                <Dropdown
                  options={personaDropdownOptions}
                  value={filters.persona}
                  onChange={(value) => updateFilter("persona", value)}
                  placeholder="All Personas"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Integration Method
                </label>
                <Dropdown
                  options={integrationMethodDropdownOptions}
                  value={filters.integrationMethod}
                  onChange={(value) => updateFilter("integrationMethod", value)}
                  placeholder="All Methods"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Compact Product Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border/50 rounded-lg">
          <p className="text-sm text-muted-foreground">No products found matching your filters.</p>
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
