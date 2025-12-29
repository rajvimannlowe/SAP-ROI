import * as React from 'react';
import { Search, X, Filter as FilterIcon } from 'lucide-react';
import { Input } from './input';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { Card, CardContent } from './card';

export interface FilterOption {
  id: string;
  label: string;
  type: 'select' | 'multiselect' | 'search' | 'date';
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
}

interface FilterProps {
  filters: FilterOption[];
  values: Record<string, string | string[]>;
  onChange: (id: string, value: string | string[]) => void;
  onReset?: () => void;
  className?: string;
  showResetButton?: boolean;
}

export function Filter({
  filters,
  values,
  onChange,
  onReset,
  className,
  showResetButton = true,
}: FilterProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const searchFilter = filters.find((f) => f.type === 'search');

  const hasActiveFilters = React.useMemo(() => {
    return Object.values(values).some((value) => {
      if (Array.isArray(value)) return value.length > 0;
      return value && value !== '';
    });
  }, [values]);

  const handleReset = () => {
    if (onReset) {
      onReset();
    } else {
      filters.forEach((filter) => {
        onChange(filter.id, filter.type === 'multiselect' ? [] : '');
      });
    }
    setSearchTerm('');
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Search Input */}
          {searchFilter && (
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={searchFilter.placeholder || 'Search...'}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  onChange(searchFilter.id, e.target.value);
                }}
                className="pl-9"
              />
            </div>
          )}

          {/* Filter Options */}
          {filters
            .filter((f) => f.type !== 'search')
            .map((filter) => (
              <div key={filter.id} className="min-w-[150px]">
                {filter.type === 'select' && filter.options && (
                  <select
                    value={(values[filter.id] as string) || ''}
                    onChange={(e) => onChange(filter.id, e.target.value)}
                    className={cn(
                      'flex h-10 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm',
                      'hover:border-[#4160F0] focus:border-[#4160F0]',
                      'focus:outline-none focus:ring-2 focus:ring-[#4160F0]/20',
                      'transition-colors'
                    )}
                  >
                    <option value="">{filter.placeholder || 'All'}</option>
                    {filter.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}

                {filter.type === 'multiselect' && filter.options && (
                  <select
                    multiple
                    value={(values[filter.id] as string[]) || []}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
                      onChange(filter.id, selected);
                    }}
                    className={cn(
                      'flex min-h-[40px] w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm',
                      'hover:border-[#4160F0] focus:border-[#4160F0]',
                      'focus:outline-none focus:ring-2 focus:ring-[#4160F0]/20',
                      'transition-colors'
                    )}
                  >
                    {filter.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}

          {/* Reset Button */}
          {showResetButton && hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Reset
            </Button>
          )}

          {/* Filter Indicator */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FilterIcon className="h-4 w-4" />
              <span>
                {Object.values(values).reduce((count, value) => {
                  if (Array.isArray(value)) return count + value.length;
                  return count + (value && value !== '' ? 1 : 0);
                }, 0)}{' '}
                active
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

