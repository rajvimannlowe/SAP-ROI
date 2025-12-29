import * as React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DropdownCheckboxOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface DropdownWithCheckboxProps {
  options: DropdownCheckboxOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  multiple?: boolean;
}

export function DropdownWithCheckbox({
  options,
  selectedValues,
  onSelectionChange,
  placeholder = 'Select options...',
  label,
  className,
  disabled = false,
  multiple = true,
}: DropdownWithCheckboxProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = (value: string) => {
    if (multiple) {
      if (selectedValues.includes(value)) {
        onSelectionChange(selectedValues.filter((v) => v !== value));
      } else {
        onSelectionChange([...selectedValues, value]);
      }
    } else {
      onSelectionChange([value]);
      setIsOpen(false);
    }
  };

  const displayText = React.useMemo(() => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) {
      return options.find((opt) => opt.value === selectedValues[0])?.label || placeholder;
    }
    return `${selectedValues.length} selected`;
  }, [selectedValues, options, placeholder]);

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'flex items-center justify-between gap-2 w-full px-3 py-2 text-sm font-medium',
          'rounded-md border-2 border-input bg-background',
          'hover:border-[#4160F0] hover:bg-accent',
          'focus:outline-none focus:ring-2 focus:ring-[#4160F0] focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'transition-colors',
          selectedValues.length > 0 && 'border-[#4160F0]'
        )}
      >
        <span className="truncate text-left flex-1">{displayText}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute z-20 mt-2 w-full min-w-[200px] rounded-md border bg-popover shadow-lg max-h-[300px] overflow-auto">
            <div className="p-1">
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleToggle(option.value)}
                    className={cn(
                      'flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md',
                      'hover:bg-accent hover:text-accent-foreground',
                      'focus:bg-accent focus:text-accent-foreground',
                      'focus:outline-none',
                      'transition-colors',
                      'text-left'
                    )}
                  >
                    <div
                      className={cn(
                        'flex items-center justify-center h-4 w-4 rounded border-2 transition-colors',
                        isSelected
                          ? 'bg-gradient-to-r from-[#4160F0] to-[#FF6700] border-transparent'
                          : 'border-input bg-background'
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3 text-white" />}
                    </div>
                    {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                    <span className="flex-1">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

