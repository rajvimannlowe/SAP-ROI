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
            className="group relative overflow-hidden rounded-xl border border-border/60 bg-card hover:border-[#4160F0]/50 hover:shadow-lg transition-all duration-300"
          >
            {/* Colored top border */}
            <div 
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: card.color }}
            ></div>
            
            {/* Content */}
            <div className="p-4 pt-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground mb-2 leading-tight">
                    {card.title}
                  </p>
                  <p 
                    className="text-2xl font-bold leading-none"
                    style={{ color: card.color }}
                  >
                    {card.value}
                  </p>
                  {card.description && (
                    <p className="text-[10px] text-muted-foreground leading-tight mt-1">
                      {card.description}
                    </p>
                  )}
                </div>
                <div 
                  className="p-2.5 rounded-lg shrink-0"
                  style={{ 
                    backgroundColor: hexToRgba(card.color, 0.08),
                  }}
                >
                  <Icon 
                    className="h-5 w-5" 
                    style={{ color: card.color }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
