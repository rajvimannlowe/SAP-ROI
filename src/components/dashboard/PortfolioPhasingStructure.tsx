import { ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

interface PhaseBoxProps {
  phase: string;
  count: number;
  description: string;
  highlight?: boolean;
}

function PhaseBox({ phase, count, description, highlight = false }: PhaseBoxProps) {
  const accentColor = '#4160F0';
  const phaseColor = highlight ? accentColor : '#9333EA';
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (highlight) {
      navigate('/phase-i');
    }
  };
  
  return (
    <div
      onClick={handleClick}
      className={`group relative overflow-hidden rounded-lg border border-border/50 bg-card shadow-sm transition-all duration-200 hover:shadow-md ${
        highlight ? 'ring-2 ring-blue-500/30 border-blue-500/60 cursor-pointer' : ''
      }`}
      style={highlight ? {
        borderColor: `${accentColor}60`,
      } : undefined}
    >
      {/* Light colorful background */}
      <div 
        className="p-4"
        style={{
          background: highlight 
            ? `linear-gradient(135deg, ${hexToRgba(accentColor, 0.12)} 0%, ${hexToRgba(accentColor, 0.06)} 50%, transparent 100%)`
            : `linear-gradient(135deg, ${hexToRgba(phaseColor, 0.1)} 0%, ${hexToRgba(phaseColor, 0.05)} 50%, transparent 100%)`,
        }}
      >
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span 
              className="text-2xl font-bold"
              style={{ color: phaseColor }}
            >
              {count}
            </span>
            {highlight && (
              <span 
                className="px-1.5 py-0.5 text-[10px] font-semibold rounded border"
                style={{
                  color: accentColor,
                  backgroundColor: hexToRgba(accentColor, 0.15),
                  borderColor: `${accentColor}40`,
                }}
              >
                Phase I
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-foreground mb-0.5">{phase}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PortfolioPhasingStructureProps {
  phaseI: {
    count: number;
    description: string;
  };
  phaseII: {
    count: number;
    description: string;
  };
  phaseIII: {
    count: number;
    description: string;
  };
}

export function PortfolioPhasingStructure({
  phaseI,
  phaseII,
  phaseIII,
}: PortfolioPhasingStructureProps) {
  const accentColor = '#4160F0';
  
  return (
    <div className="space-y-3">
      {/* Enterprise ROI Central Box */}
      <div className="flex justify-center">
        <div
          className="relative overflow-hidden rounded-lg border border-border/50 bg-card shadow-sm px-4 py-3 transition-all duration-200 hover:shadow-md"
          style={{
            borderColor: `${accentColor}60`,
            background: `linear-gradient(135deg, ${hexToRgba(accentColor, 0.1)} 0%, ${hexToRgba(accentColor, 0.05)} 50%, transparent 100%)`,
          }}
        >
          <h3 className="text-lg font-bold text-foreground text-center">Enterprise ROI</h3>
        </div>
      </div>

      {/* Connector Line */}
      <div className="flex justify-center -my-0.5">
        <ArrowDown className="h-4 w-4 text-muted-foreground/50" />
      </div>

      {/* Three Phase Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <PhaseBox
          phase="Phase I"
          count={phaseI.count}
          description={phaseI.description}
          highlight={true}
        />
        <PhaseBox
          phase="Phase II"
          count={phaseII.count}
          description={phaseII.description}
        />
        <PhaseBox
          phase="Phase III"
          count={phaseIII.count}
          description={phaseIII.description}
        />
      </div>
    </div>
  );
}
