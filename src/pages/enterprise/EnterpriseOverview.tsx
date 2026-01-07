import { useMemo } from "react";
import { MOCK_DD_ITEMS } from "../../data/mockData";
import { ROIMetricCards } from "../../components/roi/cards/ROIMetricCards";
import { PortfolioPhasingStructure } from "../../components/roi/PortfolioPhasingStructure";
import { ROIValueLegend } from "../../components/roi/ROIValueLegend";
import { PageHeader } from "../../components/layout/PageHeader";

export function EnterpriseOverview() {
  // Calculate ROI Dashboard statistics
  const roiStats = useMemo(() => {
    const totalItems = MOCK_DD_ITEMS.length;
    const highRisk = MOCK_DD_ITEMS.filter(
      (item) => item.status === "High Risk"
    ).length;
    const needsReview = MOCK_DD_ITEMS.filter(
      (item) => item.status === "Needs Review"
    ).length;
    const comfortable = MOCK_DD_ITEMS.filter(
      (item) => item.status === "Comfortable"
    ).length;

    // Get unique ROI dimensions (DD Domains)
    const uniqueDomains = Array.from(
      new Set(MOCK_DD_ITEMS.map((item) => item.ddDomain))
    );

    // Calculate percentages
    const phaseIPercentage =
      totalItems > 0 ? Math.round((highRisk / totalItems) * 100) : 0;
    const executionReadyPercentage =
      totalItems > 0 ? Math.round((comfortable / totalItems) * 100) : 0;

    // Calculate value distribution percentages (simulated based on status distribution)
    // High Risk = Value Protection, Needs Review = Value Realization, Comfortable = Strategic Position
    const valueProtection =
      totalItems > 0 ? Math.round((highRisk / totalItems) * 100) : 0;
    const valueRealization =
      totalItems > 0 ? Math.round((needsReview / totalItems) * 100) : 0;
    const strategicPosition =
      totalItems > 0 ? Math.round((comfortable / totalItems) * 100) : 0;

    return {
      totalItems,
      phaseIProducts: highRisk,
      phaseIPercentage,
      roiDimensions: uniqueDomains,
      executionReady: comfortable,
      executionReadyPercentage,
      phaseIIProducts: needsReview,
      phaseIIIProducts: comfortable,
      valueProtection,
      valueRealization,
      strategicPosition,
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
      <div>
        <ROIMetricCards
          totalProducts={roiStats.totalItems}
          phaseIProducts={roiStats.phaseIProducts}
          phaseIPercentage={roiStats.phaseIPercentage}
          roiDimensions={roiStats.roiDimensions}
          executionReady={roiStats.executionReady}
          executionReadyPercentage={roiStats.executionReadyPercentage}
          quarterlyGrowth={2}
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
