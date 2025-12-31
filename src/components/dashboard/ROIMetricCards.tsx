import { Package, Target, Layers, CheckCircle2 } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

interface ROIMetricCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  highlight?: boolean;
  dimensions?: string[];
  color?: string;
}

function ROIMetricCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  highlight = false,
  dimensions,
  color = '#4160F0',
}: ROIMetricCardProps) {
  const cardColor = highlight ? '#4160F0' : color;
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
    >
      {/* Light colorful background section */}
      <div
        className="px-4 pt-4 pb-3"
        style={{
          background: highlight 
            ? `linear-gradient(135deg, ${hexToRgba(cardColor, 0.12)} 0%, ${hexToRgba(cardColor, 0.06)} 50%, transparent 100%)`
            : `linear-gradient(135deg, ${hexToRgba(cardColor, 0.1)} 0%, ${hexToRgba(cardColor, 0.05)} 50%, transparent 100%)`,
        }}
      >
        {/* Icon and Value Row */}
        <div className="flex items-center justify-between gap-3 mb-3">
          {/* Icon Square - Solid color background */}
          <div
            className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 group-hover:scale-105 shrink-0 shadow-sm"
            style={{
              background: cardColor,
            }}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>
          
          {/* Value - Right aligned */}
          <p
            className="text-2xl font-bold leading-none"
            style={{ color: cardColor }}
          >
            {value}
          </p>
        </div>
        
        {/* Title */}
        <p className="text-sm font-semibold text-foreground leading-tight mb-1">
          {title}
        </p>
        
        {/* Subtitle */}
        {subtitle && (
          <p className="text-xs text-muted-foreground leading-tight">{subtitle}</p>
        )}
      </div>

      {/* Dimensions section with subtle background */}
      {dimensions && dimensions.length > 0 && (
        <div 
          className="px-4 pb-4 pt-2.5"
          style={{
            background: hexToRgba(cardColor, 0.02),
          }}
        >
          <div className="flex flex-wrap gap-1.5">
            {dimensions.map((dim, index) => (
              <span
                key={index}
                className="text-[10px] px-2 py-0.5 rounded-md bg-background/80 text-muted-foreground font-medium border border-border/30"
              >
                {dim}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface ROIMetricCardsProps {
  totalProducts: number;
  phaseIProducts: number;
  phaseIPercentage: number;
  roiDimensions: string[];
  executionReady: number;
  executionReadyPercentage: number;
  quarterlyGrowth?: number;
}

export function ROIMetricCards({
  totalProducts,
  phaseIProducts,
  phaseIPercentage,
  roiDimensions,
  executionReady,
  executionReadyPercentage,
  quarterlyGrowth = 0,
}: ROIMetricCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <ROIMetricCard
        title="Total Products in ROI Catalog"
        value={totalProducts}
        subtitle={quarterlyGrowth > 0 ? `+${quarterlyGrowth} this quarter` : undefined}
        icon={Package}
        color="#4160F0"
      />
      
      <ROIMetricCard
        title="Phase I Products"
        value={phaseIProducts}
        subtitle={`${phaseIPercentage}% of portfolio`}
        icon={Target}
        highlight={true}
        color="#4160F0"
      />
      
      <ROIMetricCard
        title="ROI Dimensions Covered"
        value={roiDimensions.length}
        icon={Layers}
        dimensions={roiDimensions}
        color="#9333EA"
      />
      
      <ROIMetricCard
        title="Execution-Ready Products"
        value={executionReady}
        subtitle={`${executionReadyPercentage}% readiness`}
        icon={CheckCircle2}
        color="#16A34A"
      />
    </div>
  );
}
