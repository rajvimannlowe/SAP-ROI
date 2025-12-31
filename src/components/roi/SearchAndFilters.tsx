import { useState } from "react";
import { Filter, X, Search } from "lucide-react";
import { Dropdown } from "../ui/dropdown";

export interface FilterOption {
  value: string;
  label: string;
}

export interface SearchAndFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters: {
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
    placeholder?: string;
  }[];
  onClearFilters: () => void;
  activeFiltersCount: number;
}

export function SearchAndFilters({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search products, vendors, categories...",
  filters,
  onClearFilters,
  activeFiltersCount,
}: SearchAndFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
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
              onClick={onClearFilters}
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
            {filters.map((filter, index) => (
              <div key={index}>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {filter.label}
                </label>
                <Dropdown
                  options={filter.options}
                  value={filter.value}
                  onChange={filter.onChange}
                  placeholder={filter.placeholder || `All ${filter.label}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
