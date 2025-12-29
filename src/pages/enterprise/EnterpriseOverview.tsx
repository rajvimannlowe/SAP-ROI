import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Database, ArrowRight, Building2 } from 'lucide-react';
import { MOCK_DD_ITEMS, SAP_MODULES, getModuleBySubModule } from '../../data/mockData';
import { EnterpriseSummaryCards } from '../../components/dashboard/EnterpriseSummaryCards';
import { StatusPieChart } from '../../components/dashboard/StatusPieChart';
import { SeverityBarChart } from '../../components/dashboard/SeverityBarChart';
import { DomainBarChart } from '../../components/dashboard/DomainBarChart';
import { ModuleBarChart } from '../../components/dashboard/ModuleBarChart';

export function EnterpriseOverview() {
  const departments = [
    {
      id: 'sap',
      name: 'SAP ROI',
      description: 'SAP Due Diligence Management',
      status: 'active',
      icon: Database,
    },
    {
      id: 'marketing',
      name: 'Marketing ROI',
      description: 'Marketing Due Diligence (Coming Soon)',
      status: 'coming-soon',
      icon: Building2,
    },
    {
      id: 'erp',
      name: 'ERP ROI',
      description: 'ERP Due Diligence (Coming Soon)',
      status: 'coming-soon',
      icon: Building2,
    },
  ];

  // Calculate summary statistics
  const summary = useMemo(() => {
    const totalItems = MOCK_DD_ITEMS.length;
    const highRisk = MOCK_DD_ITEMS.filter((item) => item.status === 'High Risk').length;
    const needsReview = MOCK_DD_ITEMS.filter((item) => item.status === 'Needs Review').length;
    const comfortable = MOCK_DD_ITEMS.filter((item) => item.status === 'Comfortable').length;
    const highSeverity = MOCK_DD_ITEMS.filter(
      (item) => item.severity === 'High' || item.severity === 'Critical'
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
      <div>
        <h1 className="text-3xl font-bold">Enterprise Overview</h1>
        <p className="text-muted-foreground mt-2">
          Manage Due Diligence across all departments
        </p>
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
      <div className="grid gap-6 md:grid-cols-2">
        <StatusPieChart data={statusData} />
        <SeverityBarChart data={severityData} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <DomainBarChart data={domainData} />
        <ModuleBarChart data={moduleData} />
      </div>

      {/* Departments Section */}
      <Card>
        <CardHeader>
          <CardTitle>Departments</CardTitle>
          <CardDescription>Access Due Diligence by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {departments.map((dept) => {
              const Icon = dept.icon;
              return (
                <Card key={dept.id} className={dept.status === 'coming-soon' ? 'opacity-60' : ''}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{dept.name}</CardTitle>
                        {dept.status === 'coming-soon' && (
                          <span className="text-xs text-muted-foreground">Coming Soon</span>
                        )}
                      </div>
                    </div>
                    <CardDescription>{dept.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {dept.status === 'active' ? (
                      <Link to={`/${dept.id}`}>
                        <Button className="w-full" variant="default">
                          Access Department
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    ) : (
                      <Button className="w-full" variant="outline" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle>About Due Diligence</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This is an Automated Due Diligence system where each KPI represents a control used to assess 
            SAP process risk and compliance. Each Due Diligence item is a control check that monitors 
            risk, compliance, and process integrity within your SAP modules.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
