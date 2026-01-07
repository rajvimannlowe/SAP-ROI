import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  label,
  className,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.value === value);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setIsOpen(false);
      });
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

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
          'hover:bg-accent',
          'focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'transition-all',
          isOpen && 'border-[#4160F0]'
        )}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {selectedOption?.icon && (
            <span className="flex-shrink-0">{selectedOption.icon}</span>
          )}
          <span className="truncate text-left">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[100]" onClick={() => setIsOpen(false)} />
          <div className="absolute z-[101] mt-2 w-full min-w-[200px] rounded-md border-2 border-[#4160F0]/20 bg-popover shadow-lg">
            <div className="p-1 max-h-[300px] overflow-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  disabled={option.disabled}
                  className={cn(
                    'flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md',
                    'hover:bg-gradient-to-r hover:from-[#4160F0]/10 hover:to-[#FF6700]/10',
                    'focus:bg-gradient-to-r focus:from-[#4160F0]/10 focus:to-[#FF6700]/10',
                    'focus:outline-none',
                    'transition-colors',
                    'text-left',
                    value === option.value &&
                      'bg-gradient-to-r from-[#4160F0]/20 to-[#FF6700]/20 font-medium',
                    option.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                  <span className="flex-1">{option.label}</span>
                  {value === option.value && (
                    <span className="flex-shrink-0 text-[#4160F0]">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

