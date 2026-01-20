import { useMemo } from "react";
import { Package, Target, Layers, CheckCircle2 } from "lucide-react";
// import { MOCK_DD_ITEMS } from "../../data/mockData";
import { MetricCard } from "../../components/roi/cards/MetricCard";
import { BRAND_COLORS } from "../../components/roi/cards/index";
import { PortfolioPhasingStructure } from "../../components/roi/PortfolioPhasingStructure";
import { ROIValueLegend } from "../../components/roi/ROIValueLegend";
import { PageHeader } from "../../components/layout/PageHeader";

export function EnterpriseOverview() {
  // ROI Dashboard statistics - using dummy data values
  const roiStats = useMemo(() => {
    // Set dummy data values as specified
    const totalItems = 104;
    const phaseIProducts = 1;
    // const roiDimensionsCount = 11;
    const executionReady = 0;
    const quarterlyIncrease = 2;

    // Calculate percentages
    const phaseIPercentage =
      totalItems > 0 ? Math.round((phaseIProducts / totalItems) * 100) : 0;
    const executionReadyPercentage =
      totalItems > 0 ? Math.round((executionReady / totalItems) * 100) : 0;

    // ROI dimensions list
    const roiDimensions = [
      "Revenue",
      "Efficiency",
      "Experience",
      "Compliance",
      "Cost",
      "Risk",
      "Innovation",
      "Agility",
      "Resilience",
      "Quality",
      "Safety",
    ];

    // Calculate remaining products for Phase II and Phase III
    const remainingProducts = totalItems - phaseIProducts - executionReady;
    const phaseIIProducts = Math.floor(remainingProducts / 2);
    const phaseIIIProducts = remainingProducts - phaseIIProducts;

    // Calculate value distribution percentages
    const valueProtection =
      totalItems > 0 ? Math.round((phaseIProducts / totalItems) * 100) : 0;
    const valueRealization =
      totalItems > 0 ? Math.round((phaseIIProducts / totalItems) * 100) : 0;
    const strategicPosition =
      totalItems > 0 ? Math.round((phaseIIIProducts / totalItems) * 100) : 0;

    return {
      totalItems,
      phaseIProducts,
      phaseIPercentage,
      roiDimensions,
      executionReady,
      executionReadyPercentage,
      phaseIIProducts,
      phaseIIIProducts,
      valueProtection,
      valueRealization,
      strategicPosition,
      quarterlyIncrease,
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <PageHeader
        title="Enterprise ROI Dashboard"
        subtitle="Portfolio-wide value realization and governance view"
      />

      {/* ROI Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          title="Total Products in ROI Catalog"
          value={roiStats.totalItems}
          subtitle={roiStats.quarterlyIncrease > 0 ? `+${roiStats.quarterlyIncrease} this quarter` : undefined}
          icon={Package}
          color={BRAND_COLORS.PRIMARY}
        />
        <MetricCard
          title="Phase I Products"
          value={roiStats.phaseIProducts}
          subtitle={`${roiStats.phaseIPercentage}% of portfolio`}
          icon={Target}
          highlight={true}
          onClickPath="/phase-i"
          color={BRAND_COLORS.PRIMARY}
        />
        <MetricCard
          title="ROI Dimensions Covered"
          value={roiStats.roiDimensions.length}
          icon={Layers}
          dimensions={roiStats.roiDimensions}
          color={BRAND_COLORS.PURPLE}
        />
        <MetricCard
          title="Execution-Ready Products"
          value={roiStats.executionReady}
          subtitle={`${roiStats.executionReadyPercentage}% readiness`}
          icon={CheckCircle2}
          color="#16A34A"
        />
      </div>

      {/* Portfolio Phasing Structure */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">
          Portfolio Phasing Structure
        </h2>
        <PortfolioPhasingStructure
          phaseI={{
            count: roiStats.phaseIProducts,
            description: "Critical Value",
          }}
          phaseII={{
            count: roiStats.phaseIIProducts,
            description: "Strategic Growth",
          }}
          phaseIII={{
            count: roiStats.phaseIIIProducts,
            description: "Future Optimization",
          }}
        />
      </div>

      {/* ROI Value Legend */}
      <div>
        <ROIValueLegend
          valueProtection={roiStats.valueProtection}
          valueRealization={roiStats.valueRealization}
          strategicPosition={roiStats.strategicPosition}
        />
      </div>

      {/* Footer Message */}
      <div className="text-center pt-3">
        <p className="text-xs text-muted-foreground italic">
          ROI is tracked as value protection and realization, not just cost
          savings.
        </p>
      </div>
    </div>
  );
}
