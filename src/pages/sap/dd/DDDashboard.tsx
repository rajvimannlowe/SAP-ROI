import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { DashboardCards } from '../../../components/dd/DashboardCards';
import { DDItemList } from '../../../components/dd/DDItemList';
import { MOCK_DD_ITEMS, getAllSubModules, getModuleBySubModule } from '../../../data/mockData';
import { DDDashboardSummary, DDFilters } from '../../../types';
import { useAuth } from '../../../contexts/AuthContext';
import { Plus, Download } from 'lucide-react';

export function DDDashboard() {
  const { moduleId, subModuleId } = useParams<{ moduleId: string; subModuleId: string }>();
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  const [filters, setFilters] = useState<DDFilters>({
    subModuleId: subModuleId || undefined,
  });

  // Filter items
  const filteredItems = useMemo(() => {
    let items = MOCK_DD_ITEMS;

    if (filters.subModuleId) {
      items = items.filter((item) => item.subModuleId === filters.subModuleId);
    }

    if (filters.ddDomain) {
      items = items.filter((item) => item.ddDomain === filters.ddDomain);
    }

    if (filters.severity) {
      items = items.filter((item) => item.severity === filters.severity);
    }

    if (filters.status) {
      items = items.filter((item) => item.status === filters.status);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      items = items.filter(
        (item) =>
          item.itemId.toLowerCase().includes(searchLower) ||
          item.kpiName.toLowerCase().includes(searchLower) ||
          item.controlObjective.toLowerCase().includes(searchLower)
      );
    }

    return items;
  }, [filters]);

  // Calculate summary
  const summary: DDDashboardSummary = useMemo(() => {
    return {
      totalItems: filteredItems.length,
      highRisk: filteredItems.filter((item) => item.status === 'High Risk').length,
      needsReview: filteredItems.filter((item) => item.status === 'Needs Review').length,
      comfortable: filteredItems.filter((item) => item.status === 'Comfortable').length,
      highSeverity: filteredItems.filter(
        (item) => item.severity === 'High' || item.severity === 'Critical'
      ).length,
    };
  }, [filteredItems]);

  const subModules = getAllSubModules();
  const module = subModuleId ? getModuleBySubModule(subModuleId) : null;

  const handleExportCSV = () => {
    const headers = ['Item ID', 'Sub-Module', 'KPI Name', 'Control Objective', 'Domain', 'Severity', 'Status', 'Threshold', 'Current Value'];
    const rows = filteredItems.map((item) => [
      item.itemId,
      item.subModuleName,
      item.kpiName,
      item.controlObjective,
      item.ddDomain,
      item.severity,
      item.status,
      item.thresholdText,
      item.currentValue,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dd-items-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const jsonContent = JSON.stringify(filteredItems, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dd-items-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Due Diligence Dashboard</h1>
          {module && (
            <p className="text-muted-foreground mt-2">
              {module.code} - {module.name}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasPermission('export') && (
            <>
              <Button variant="outline" onClick={handleExportCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" onClick={handleExportJSON}>
                <Download className="h-4 w-4 mr-2" />
                Export JSON
              </Button>
            </>
          )}
          {hasPermission('create') && (
            <Button onClick={() => navigate(`/sap/${moduleId}/${subModuleId}/create`)}>
              <Plus className="h-4 w-4 mr-2" />
              Create DD Item
            </Button>
          )}
        </div>
      </div>

      <DashboardCards summary={summary} />

      <DDItemList
        items={filteredItems}
        onFilterChange={setFilters}
        filters={filters}
        subModules={subModules}
      />
    </div>
  );
}

