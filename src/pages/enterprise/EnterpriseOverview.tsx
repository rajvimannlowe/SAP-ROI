import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Database, ArrowRight, Building2, TrendingUp } from "lucide-react";
import {
  MOCK_DD_ITEMS,
  SAP_MODULES,
  getModuleBySubModule,
} from "../../data/mockData";
import { EnterpriseSummaryCards } from "../../components/dashboard/EnterpriseSummaryCards";
import { StatusPieChart } from "../../components/dashboard/StatusPieChart";
import { SeverityBarChart } from "../../components/dashboard/SeverityBarChart";
import { DomainBarChart } from "../../components/dashboard/DomainBarChart";
import { ModuleBarChart } from "../../components/dashboard/ModuleBarChart";

export function EnterpriseOverview() {
  const departments = [
    {
      id: "sap",
      name: "SAP ROI",
      description: "SAP Due Diligence Management",
      status: "active",
      icon: Database,
      color: "#4160F0",
    },
    {
      id: "marketing",
      name: "Marketing ROI",
      description: "Marketing Due Diligence (Coming Soon)",
      status: "coming-soon",
      icon: TrendingUp,
      color: "#9333EA",
    },
    {
      id: "erp",
      name: "ERP ROI",
      description: "ERP Due Diligence (Coming Soon)",
      status: "coming-soon",
      icon: Building2,
      color: "#6366F1",
    },
  ];

  // Calculate summary statistics
  const summary = useMemo(() => {
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
    const highSeverity = MOCK_DD_ITEMS.filter(
      (item) => item.severity === "High" || item.severity === "Critical"
    ).length;
    const totalModules = SAP_MODULES.length;

    return {
      totalItems,
      highRisk,
      needsReview,
      comfortable,
      highSeverity,
      totalModules,
    };
  }, []);

  // Prepare chart data
  const statusData = useMemo(() => {
    const statusCounts = MOCK_DD_ITEMS.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCounts).map(([status, value]) => ({
      id: status,
      label: status,
      value,
    }));
  }, []);

  const severityData = useMemo(() => {
    const severityCounts = MOCK_DD_ITEMS.reduce((acc, item) => {
      acc[item.severity] = (acc[item.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(severityCounts).map(([severity, value]) => ({
      severity,
      value,
    }));
  }, []);

  const domainData = useMemo(() => {
    const domainCounts = MOCK_DD_ITEMS.reduce((acc, item) => {
      acc[item.ddDomain] = (acc[item.ddDomain] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(domainCounts).map(([domain, value]) => ({
      domain,
      value,
    }));
  }, []);

  const moduleData = useMemo(() => {
    const moduleCounts = MOCK_DD_ITEMS.reduce((acc, item) => {
      const module = getModuleBySubModule(item.subModuleId);
      if (module) {
        acc[module.code] = (acc[module.code] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(moduleCounts).map(([module, value]) => ({
      module,
      value,
    }));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold">Enterprise Overview</h1>
        <p className="text-muted-foreground mt-2">
          Manage and monitor Due Diligence across all departments and modules
        </p>
      </div>

      {/* Departments Section - Moved to Top */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Departments</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Access Due Diligence management by department
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {departments.map((dept) => {
            const Icon = dept.icon;
            const isActive = dept.status === "active";

            return (
              <Card
                key={dept.id}
                className={`group hover:shadow-xl transition-all duration-300 border border-border/50 overflow-hidden bg-gradient-to-br from-card to-card/50 ${
                  !isActive ? "opacity-70" : ""
                }`}
                style={{
                  borderColor: isActive ? `${dept.color}40` : undefined,
                }}
              >
                {/* Gradient top border */}
                <div
                  className="h-1.5"
                  style={{
                    background: isActive
                      ? `linear-gradient(to right, ${dept.color}, #FF6700)`
                      : `linear-gradient(to right, ${dept.color}40, ${dept.color}20)`,
                  }}
                ></div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className="p-2.5 rounded-lg group-hover:scale-110 transition-transform"
                        style={{
                          background: `linear-gradient(to bottom right, ${dept.color}15, ${dept.color}08)`,
                        }}
                      >
                        <Icon
                          className="h-5 w-5"
                          style={{ color: dept.color }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg font-bold mb-0.5">
                          {dept.name}
                        </CardTitle>
                        {!isActive && (
                          <span className="text-xs font-medium text-muted-foreground">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {dept.description}
                  </p>
                  {isActive ? (
                    <Link to={`/${dept.id}`} className="block">
                      <Button
                        className="w-full bg-gradient-to-r from-[#4160F0] to-[#FF6700] hover:from-[#3a55d8] hover:to-[#e65c00] text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
                        size="sm"
                      >
                        Access Department
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      className="w-full border-2 border-border/50 bg-muted/30 text-muted-foreground cursor-not-allowed"
                      variant="outline"
                      disabled
                      size="sm"
                    >
                      Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Summary Cards */}
      <EnterpriseSummaryCards
        totalItems={summary.totalItems}
        highRisk={summary.highRisk}
        needsReview={summary.needsReview}
        comfortable={summary.comfortable}
        highSeverity={summary.highSeverity}
        totalModules={summary.totalModules}
      />

      {/* Charts Grid */}
      <div className="space-y-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Analytics & Insights</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Visual representation of Due Diligence metrics and trends
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <StatusPieChart data={statusData} />
          <SeverityBarChart data={severityData} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <DomainBarChart data={domainData} />
          <ModuleBarChart data={moduleData} />
        </div>
      </div>

      {/* About Section */}
      <Card className="border-2 border-border/60">
        <CardHeader>
          <CardTitle className="text-xl">About Due Diligence</CardTitle>
          <CardDescription>
            Understanding the Automated Due Diligence System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              This is an{" "}
              <strong className="text-foreground">
                Automated Due Diligence system
              </strong>{" "}
              where each KPI represents a control used to assess SAP process
              risk and compliance. Each Due Diligence item is a control check
              that monitors risk, compliance, and process integrity within your
              SAP modules.
            </p>
            <div className="grid gap-4 md:grid-cols-3 mt-6">
              <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                <h4 className="font-semibold text-sm mb-2">Risk Management</h4>
                <p className="text-xs text-muted-foreground">
                  Monitor and identify potential risks across your SAP processes
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                <h4 className="font-semibold text-sm mb-2">Compliance</h4>
                <p className="text-xs text-muted-foreground">
                  Ensure adherence to regulatory requirements and standards
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                <h4 className="font-semibold text-sm mb-2">
                  Process Integrity
                </h4>
                <p className="text-xs text-muted-foreground">
                  Maintain and verify the integrity of business processes
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
