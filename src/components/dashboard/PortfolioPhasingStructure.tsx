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
      className={`group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-md hover:shadow-xl hover:border-border/70 transition-all duration-300 ${
        highlight ? 'ring-2 ring-blue-500/30 border-blue-500/60 cursor-pointer' : ''
      }`}
    >
      <div className="p-3">
        {/* Inner Card with Solid Color Background - Consistent with other cards */}
        <div 
          className="rounded-lg p-3.5 mb-3 shadow-sm border relative overflow-hidden"
          style={{
            backgroundColor: hexToRgba(phaseColor, highlight ? 0.12 : 0.1),
            borderColor: hexToRgba(phaseColor, 0.3),
          }}
        >
          {/* Subtle hover effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at top right, ${hexToRgba(phaseColor, 0.2)}, transparent 70%)`,
            }}
          />

          <div className="relative z-10 text-center space-y-2">
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
                    borderColor: hexToRgba(accentColor, 0.35),
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
        <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-md hover:shadow-xl transition-all duration-300">
          <div className="p-3">
            <div 
              className="rounded-lg p-3.5 shadow-sm border relative overflow-hidden"
              style={{
                backgroundColor: hexToRgba(accentColor, 0.1),
                borderColor: hexToRgba(accentColor, 0.3),
              }}
            >
              <h3 className="text-lg font-bold text-foreground text-center">Enterprise ROI</h3>
            </div>
          </div>
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
