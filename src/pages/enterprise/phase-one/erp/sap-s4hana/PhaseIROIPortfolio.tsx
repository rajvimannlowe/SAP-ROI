import { Link } from "react-router-dom";
import { Grid } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { PHASE_I_ROI_CATEGORIES } from "../../../../../data/phaseIROIData";
import { PageHeader } from "../../../../../components/layout/PageHeader";
import { InvestmentCard } from "../../../../../components/roi/InvestmentCard";

export function PhaseIROIPortfolio() {
  const categories = PHASE_I_ROI_CATEGORIES;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <PageHeader
            title="Phase I ROI Portfolio"
            subtitle="Critical value investments grouped by business category"
            backTo="/enterprise"
            backLabel="Back to Enterprise Dashboard"
            rightContent={
              <Link to="/phase-i/catalog">
                <Button
                  className="gap-2 shadow-md hover:shadow-lg transition-all"
                  style={{ backgroundColor: "#4160F0" }}
                >
                  <Grid className="h-4 w-4" />
                  View Catalog
                </Button>
              </Link>
            }
          />
        </div>
      </div>

      {/* Categories and Investment Cards */}
      <div className="space-y-10">
        {categories.map((categorySection) => (
          <div key={categorySection.category} className="space-y-5">
            {/* Category Heading with Accent */}
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 rounded-full bg-linear-to-b from-blue-500 to-blue-600" />
              <h2 className="text-xl font-bold text-foreground">
                {categorySection.category}
              </h2>
            </div>

            {/* Investment Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {categorySection.investments.map((investment) => (
                <InvestmentCard key={investment.id} investment={investment} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
