import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { BackButton } from '../../components/ui/BackButton';
import { ArrowRight, FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { SAP_MODULES, MOCK_DD_ITEMS, getModuleBySubModule } from '../../data/mockData';
import { SAPSummaryCards } from '../../components/dashboard/SAPSummaryCards';
import { ModuleBarChart } from '../../components/dashboard/ModuleBarChart';
import { SubModuleBarChart } from '../../components/dashboard/SubModuleBarChart';
import { ModuleStatusChart } from '../../components/dashboard/ModuleStatusChart';
import { Badge } from '../../components/ui/badge';

export function SAPOverview() {
  // Calculate summary statistics
  const summary = useMemo(() => {
    const totalItems = MOCK_DD_ITEMS.length;
    const totalModules = SAP_MODULES.length;
    const totalSubModules = SAP_MODULES.reduce((sum, module) => sum + module.subModules.length, 0);
    const highRisk = MOCK_DD_ITEMS.filter((item) => item.status === 'High Risk').length;
    const needsReview = MOCK_DD_ITEMS.filter((item) => item.status === 'Needs Review').length;
    const comfortable = MOCK_DD_ITEMS.filter((item) => item.status === 'Comfortable').length;

    return {
      totalItems,
      totalModules,
      totalSubModules,
      highRisk,
      needsReview,
      comfortable,
    };
  }, []);

  // Prepare module data with item counts
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

  // Prepare sub-module data
  const subModuleData = useMemo(() => {
    const subModuleCounts = MOCK_DD_ITEMS.reduce((acc, item) => {
      acc[item.subModuleName] = (acc[item.subModuleName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(subModuleCounts)
      .map(([subModule, value]) => ({
        subModule,
        value,
      }))
      .sort((a, b) => b.value - a.value); // Sort by value descending
  }, []);

  // Prepare module status data (stacked bar chart)
  const moduleStatusData = useMemo(() => {
    return SAP_MODULES.map((module) => {
      const moduleItems = MOCK_DD_ITEMS.filter((item) => {
        const itemModule = getModuleBySubModule(item.subModuleId);
        return itemModule?.id === module.id;
      });

      return {
        module: module.code,
        'High Risk': moduleItems.filter((item) => item.status === 'High Risk').length,
        'Needs Review': moduleItems.filter((item) => item.status === 'Needs Review').length,
        'Comfortable': moduleItems.filter((item) => item.status === 'Comfortable').length,
      };
    });
  }, []);

  // Enhanced module cards with statistics
  const moduleCards = useMemo(() => {
    return SAP_MODULES.map((module) => {
      const moduleItems = MOCK_DD_ITEMS.filter((item) => {
        const itemModule = getModuleBySubModule(item.subModuleId);
        return itemModule?.id === module.id;
      });

      const highRiskCount = moduleItems.filter((item) => item.status === 'High Risk').length;
      const needsReviewCount = moduleItems.filter((item) => item.status === 'Needs Review').length;
      const comfortableCount = moduleItems.filter((item) => item.status === 'Comfortable').length;

      return {
        ...module,
        itemCount: moduleItems.length,
        highRiskCount,
        needsReviewCount,
        comfortableCount,
      };
    });
  }, []);

  const getStatusVariant = (status: string): 'default' | 'warning' | 'danger' | 'success' => {
    switch (status) {
      case 'High Risk':
        return 'danger';
      case 'Needs Review':
        return 'warning';
      case 'Comfortable':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <BackButton to="/enterprise" />
      <div>
        <h1 className="text-3xl font-bold">SAP ROI Overview</h1>
        <p className="text-muted-foreground mt-2">
          Manage Due Diligence across SAP modules and sub-modules
        </p>
      </div>

      {/* Summary Cards */}
      <SAPSummaryCards
        totalItems={summary.totalItems}
        totalModules={summary.totalModules}
        totalSubModules={summary.totalSubModules}
        highRisk={summary.highRisk}
        needsReview={summary.needsReview}
        comfortable={summary.comfortable}
      />

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <ModuleBarChart data={moduleData} />
        <ModuleStatusChart data={moduleStatusData} />
      </div>

      <SubModuleBarChart data={subModuleData} />

      {/* Modules Grid with Enhanced Stats */}
      <Card>
        <CardHeader>
          <CardTitle>SAP Modules</CardTitle>
          <CardDescription>View and manage Due Diligence by module</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {moduleCards.map((module) => (
              <Card key={module.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{module.code}</CardTitle>
                      <CardDescription className="text-xs">{module.name}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Items</span>
                      <span className="font-semibold">{module.itemCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Sub-Modules</span>
                      <span className="font-semibold">{module.subModules.length}</span>
                    </div>
                  </div>

                  {module.itemCount > 0 && (
                    <div className="space-y-2 pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-3 w-3 text-red-600" />
                          <span className="text-xs text-muted-foreground">High Risk</span>
                        </div>
                        <Badge variant="danger" className="text-xs">
                          {module.highRiskCount}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-yellow-600" />
                          <span className="text-xs text-muted-foreground">Needs Review</span>
                        </div>
                        <Badge variant="warning" className="text-xs">
                          {module.needsReviewCount}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span className="text-xs text-muted-foreground">Comfortable</span>
                        </div>
                        <Badge variant="success" className="text-xs">
                          {module.comfortableCount}
                        </Badge>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 pt-2 border-t">
                    {module.subModules.slice(0, 3).map((sm) => (
                      <span key={sm.id} className="text-xs px-2 py-1 bg-muted rounded">
                        {sm.code}
                      </span>
                    ))}
                    {module.subModules.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-muted rounded">
                        +{module.subModules.length - 3}
                      </span>
                    )}
                  </div>

                  <Link to={`/sap/${module.id}`} className="block">
                    <Button className="w-full" variant="outline">
                      View Module
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>SAP Due Diligence</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Navigate through SAP modules to access Due Diligence dashboards and manage control checks 
            for risk assessment, compliance monitoring, and process integrity validation. Each module 
            contains multiple sub-modules with dedicated Due Diligence items.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
