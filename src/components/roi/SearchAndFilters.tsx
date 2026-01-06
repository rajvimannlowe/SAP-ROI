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
    <div className="bg-card rounded-xl border border-border/50 shadow-sm p-3">
      <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md group w-full lg:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70 group-focus-within:text-[#4160F0] transition-colors duration-200 z-10" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="relative w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border-2 border-[#4160F0]/40 bg-gradient-to-br from-[#4160F0]/8 to-[#4160F0]/3 text-foreground placeholder:text-muted-foreground/70 placeholder:font-normal focus:outline-none focus:bg-gradient-to-br focus:from-[#4160F0]/12 focus:to-[#4160F0]/5 transition-all duration-200 shadow-sm"
          />
        </div>

        {/* Filter Toggle Button */}
        <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap overflow-hidden ${
              showFilters || activeFiltersCount > 0
                ? "bg-gradient-to-r from-[#4160F0] to-[#FF6700] text-white shadow-sm hover:shadow-md"
                : "bg-gradient-to-r from-[#4160F0] to-[#FF6700] text-white shadow-sm hover:shadow-md hover:from-[#3550D9] hover:to-[#E65C00]"
            }`}
          >
            <Filter className="relative h-4 w-4 text-white z-10" />
            <span className="relative text-white z-10">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="relative px-2 py-0.5 text-xs font-bold bg-white/25 backdrop-blur-sm text-white rounded-full border border-white/30 shadow-sm z-10">
                {activeFiltersCount}
              </span>
            )}
          </button>
          {activeFiltersCount > 0 && (
            <button
              onClick={onClearFilters}
              className="px-4 py-2.5 text-sm font-medium rounded-lg border-2 border-border/60 bg-background text-foreground hover:bg-muted/80 hover:border-border transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              <X className="h-4 w-4" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-border/50 animate-in fade-in-50 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {filters.map((filter, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
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
