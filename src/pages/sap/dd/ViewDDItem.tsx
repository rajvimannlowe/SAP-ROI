import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { BackButton } from '../../../components/ui/BackButton';
import { Badge } from '../../../components/ui/badge';
import { Label } from '../../../components/ui/label';
import { MOCK_DD_ITEMS, getModuleBySubModule } from '../../../data/mockData';
import { useAuth } from '../../../contexts/AuthContext';
import { Edit, FileText, Calendar } from 'lucide-react';

export function ViewDDItem() {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const { hasPermission } = useAuth();

  const item = MOCK_DD_ITEMS.find((i) => i.id === itemId);

  if (!item) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">DD Item not found</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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

  const module = getModuleBySubModule(item.subModuleId);
  const backPath = module ? `/sap/${module.id}/${item.subModuleId}` : '/sap';

  return (
    <div className="space-y-6">
      <BackButton to={backPath} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{item.itemId}</h1>
          <p className="text-muted-foreground mt-2">{item.kpiName}</p>
        </div>
        {hasPermission('edit') && (
          <Button
            onClick={() => navigate(`/sap/dd-item/${item.id}/edit`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">Item ID</Label>
              <p className="text-sm font-medium mt-1">{item.itemId}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Sub-Module</Label>
              <p className="text-sm font-medium mt-1">{item.subModuleName}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">KPI Name</Label>
              <p className="text-sm font-medium mt-1">{item.kpiName}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Control Objective</Label>
              <p className="text-sm mt-1">{item.controlObjective}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status & Risk</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">DD Domain</Label>
              <div className="mt-1">
                <Badge variant="outline">{item.ddDomain}</Badge>
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Severity</Label>
              <div className="mt-1">
                <Badge variant={getSeverityVariant(item.severity)}>
                  {item.severity}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Status</Label>
              <div className="mt-1">
                <Badge variant={getStatusVariant(item.status)}>
                  {item.status}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Threshold</Label>
              <p className="text-sm font-medium mt-1">{item.thresholdText}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Current Value</Label>
              <p className="text-sm font-medium mt-1">{item.currentValue}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Metadata</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label className="text-sm text-muted-foreground">Created At</Label>
                <p className="text-sm font-medium">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label className="text-sm text-muted-foreground">Updated At</Label>
                <p className="text-sm font-medium">
                  {new Date(item.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label className="text-sm text-muted-foreground">Created By</Label>
                <p className="text-sm font-medium">{item.createdBy}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

