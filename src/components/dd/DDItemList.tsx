import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { DDItem } from '../../types';
import { Search, Eye, Edit, FileText } from 'lucide-react';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { useAuth } from '../../contexts/AuthContext';

interface DDItemListProps {
  items: DDItem[];
  onFilterChange: (filters: any) => void;
  filters: {
    subModuleId?: string;
    ddDomain?: string;
    severity?: string;
    status?: string;
    search?: string;
  };
  subModules: Array<{ id: string; name: string; code: string }>;
}

export function DDItemList({ items, onFilterChange, filters, subModules }: DDItemListProps) {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();

  const getSeverityVariant = (severity: string): 'default' | 'warning' | 'danger' | 'success' => {
    switch (severity) {
      case 'Critical':
        return 'danger';
      case 'High':
        return 'warning';
      case 'Medium':
        return 'default';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

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
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={filters.search || ''}
                onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                className="pl-9"
              />
            </div>
            <Select
              value={filters.subModuleId || ''}
              onChange={(e) => onFilterChange({ ...filters, subModuleId: e.target.value || undefined })}
            >
              <option value="">All Sub-Modules</option>
              {subModules.map((sm) => (
                <option key={sm.id} value={sm.id}>
                  {sm.code} - {sm.name}
                </option>
              ))}
            </Select>
            <Select
              value={filters.ddDomain || ''}
              onChange={(e) => onFilterChange({ ...filters, ddDomain: e.target.value || undefined })}
            >
              <option value="">All Domains</option>
              <option value="Risk Management">Risk Management</option>
              <option value="Compliance">Compliance</option>
              <option value="Process Integrity">Process Integrity</option>
              <option value="Data Quality">Data Quality</option>
              <option value="Security">Security</option>
            </Select>
            <Select
              value={filters.severity || ''}
              onChange={(e) => onFilterChange({ ...filters, severity: e.target.value || undefined })}
            >
              <option value="">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Select>
            <Select
              value={filters.status || ''}
              onChange={(e) => onFilterChange({ ...filters, status: e.target.value || undefined })}
            >
              <option value="">All Statuses</option>
              <option value="High Risk">High Risk</option>
              <option value="Needs Review">Needs Review</option>
              <option value="Comfortable">Comfortable</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Items List */}
      <div className="grid gap-4">
        {items.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No Due Diligence items found.
            </CardContent>
          </Card>
        ) : (
          items.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{item.itemId}</CardTitle>
                      <Badge variant={getSeverityVariant(item.severity)}>
                        {item.severity}
                      </Badge>
                      <Badge variant={getStatusVariant(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    <h3 className="text-base font-semibold mb-1">{item.kpiName}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.controlObjective}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {item.subModuleName}
                      </span>
                      <span>Domain: {item.ddDomain}</span>
                      <span>Threshold: {item.thresholdText}</span>
                      <span>Current: {item.currentValue}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => navigate(`/sap/dd-item/${item.id}`)}
                      className="p-2 rounded-md hover:bg-accent transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {hasPermission('edit') && (
                      <button
                        onClick={() => navigate(`/sap/dd-item/${item.id}/edit`)}
                        className="p-2 rounded-md hover:bg-accent transition-colors"
                        title="Edit Item"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

