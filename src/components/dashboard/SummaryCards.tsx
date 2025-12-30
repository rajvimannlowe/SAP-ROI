import { LucideIcon } from 'lucide-react';

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export interface SummaryCard {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
  bgColor?: string;
  description?: string;
}

interface SummaryCardsProps {
  cards: SummaryCard[];
  className?: string;
  columns?: 3 | 4 | 5 | 6;
}

export function SummaryCards({ 
  cards, 
  className = '',
  columns = 6 
}: SummaryCardsProps) {
  const gridCols = {
    3: 'grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-5',
    6: 'grid-cols-3 md:grid-cols-6',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-3 ${className}`}>
      {cards.map((card, index) => {
        const Icon = card.icon;
        
        return (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl border border-border/40 bg-card shadow-md transition-all duration-300 hover:shadow-lg"
          >
            {/* Colored top section */}
            <div
              className="relative px-3 pt-3 pb-2"
              style={{
                background: `linear-gradient(135deg, ${hexToRgba(card.color, 0.12)} 0%, ${hexToRgba(card.color, 0.06)} 100%)`,
              }}
            >
              <div className="flex items-center justify-between gap-2">
                {/* Icon */}
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: card.color,
                    boxShadow: `0 2px 8px ${hexToRgba(card.color, 0.4)}`,
                  }}
                >
                  <Icon
                    className="h-4 w-4 text-white"
                  />
                </div>
                
                {/* Value */}
                <p
                  className="text-2xl font-bold leading-none"
                  style={{ color: card.color }}
                >
                  {card.value}
                </p>
              </div>
            </div>

            {/* Bottom section with title */}
            <div className="px-3 pb-3 pt-1.5 bg-card">
              <p className="text-xs font-semibold text-muted-foreground truncate">
                {card.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
