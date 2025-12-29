import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { BackButton } from '../../../components/ui/BackButton';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Dropdown } from '../../../components/ui/dropdown';
import { Textarea } from '../../../components/ui/textarea';
import { DDDomain, Severity, DDStatus } from '../../../types';
import { MOCK_DD_ITEMS } from '../../../data/mockData';
import { getAllSubModules } from '../../../data/mockData';

export function EditDDItem() {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const item = MOCK_DD_ITEMS.find((i) => i.id === itemId);
  const allSubModules = getAllSubModules();

  const [formData, setFormData] = useState({
    itemId: '',
    subModuleId: '',
    kpiName: '',
    controlObjective: '',
    ddDomain: '' as DDDomain | '',
    severity: '' as Severity | '',
    status: '' as DDStatus | '',
    thresholdText: '',
    currentValue: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (item) {
      setFormData({
        itemId: item.itemId,
        subModuleId: item.subModuleId,
        kpiName: item.kpiName,
        controlObjective: item.controlObjective,
        ddDomain: item.ddDomain,
        severity: item.severity,
        status: item.status,
        thresholdText: item.thresholdText,
        currentValue: item.currentValue,
      });
    }
  }, [item]);

  if (!item) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">DD Item not found</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation
    if (!formData.itemId.trim()) newErrors.itemId = 'Item ID is required';
    if (!formData.subModuleId) newErrors.subModuleId = 'Sub-Module is required';
    if (!formData.kpiName.trim()) newErrors.kpiName = 'KPI Name is required';
    if (!formData.controlObjective.trim()) newErrors.controlObjective = 'Control Objective is required';
    if (!formData.ddDomain) newErrors.ddDomain = 'DD Domain is required';
    if (!formData.severity) newErrors.severity = 'Severity is required';
    if (!formData.status) newErrors.status = 'Status is required';
    if (!formData.thresholdText.trim()) newErrors.thresholdText = 'Threshold Text is required';
    if (!formData.currentValue.trim()) newErrors.currentValue = 'Current Value is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // In a real app, this would call an API
    console.log('Updating DD Item:', formData);
    
    // Navigate back to view
    navigate(`/sap/dd-item/${item.id}`);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const ddDomainOptions = [
    { value: '', label: 'Select Domain' },
    { value: 'Risk Management', label: 'Risk Management' },
    { value: 'Compliance', label: 'Compliance' },
    { value: 'Process Integrity', label: 'Process Integrity' },
    { value: 'Data Quality', label: 'Data Quality' },
    { value: 'Security', label: 'Security' },
  ];

  const severityOptions = [
    { value: '', label: 'Select Severity' },
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
    { value: 'Critical', label: 'Critical' },
  ];

  const statusOptions = [
    { value: '', label: 'Select Status' },
    { value: 'Comfortable', label: 'Comfortable' },
    { value: 'Needs Review', label: 'Needs Review' },
    { value: 'High Risk', label: 'High Risk' },
  ];

  const subModuleOptions = [
    { value: '', label: 'Select Sub-Module' },
    ...allSubModules.map((subModule) => ({
      value: subModule.id,
      label: `${subModule.code} - ${subModule.name}`,
    })),
  ];

  return (
    <div className="space-y-6">
      <BackButton to={`/sap/dd-item/${item.id}`} />
      <div>
        <h1 className="text-3xl font-bold">Edit Due Diligence Item</h1>
        <p className="text-muted-foreground mt-2">Update DD item details</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>DD Item Details</CardTitle>
          <CardDescription>Update the Due Diligence item information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="itemId">
                  Item ID <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="itemId"
                  value={formData.itemId}
                  onChange={(e) => handleChange('itemId', e.target.value)}
                  placeholder="DD-FI-GL-001"
                  className={errors.itemId ? 'border-destructive' : ''}
                />
                {errors.itemId && <p className="text-sm text-destructive">{errors.itemId}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subModuleId">
                  Sub-Module <span className="text-destructive">*</span>
                </Label>
                <Dropdown
                  options={subModuleOptions}
                  value={formData.subModuleId}
                  onChange={(value) => handleChange('subModuleId', value)}
                  placeholder="Select Sub-Module"
                  className={errors.subModuleId ? '[&>button]:border-destructive' : ''}
                />
                {errors.subModuleId && (
                  <p className="text-sm text-destructive">{errors.subModuleId}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="kpiName">
                KPI Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="kpiName"
                value={formData.kpiName}
                onChange={(e) => handleChange('kpiName', e.target.value)}
                placeholder="e.g., Journal Entry Approval Rate"
                className={errors.kpiName ? 'border-destructive' : ''}
              />
              {errors.kpiName && <p className="text-sm text-destructive">{errors.kpiName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="controlObjective">
                Control Objective <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="controlObjective"
                value={formData.controlObjective}
                onChange={(e) => handleChange('controlObjective', e.target.value)}
                placeholder="Describe the control objective..."
                rows={3}
                className={errors.controlObjective ? 'border-destructive' : ''}
              />
              {errors.controlObjective && (
                <p className="text-sm text-destructive">{errors.controlObjective}</p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="ddDomain">
                  DD Domain <span className="text-destructive">*</span>
                </Label>
                <Dropdown
                  options={ddDomainOptions}
                  value={formData.ddDomain || ''}
                  onChange={(value) => handleChange('ddDomain', value as DDDomain)}
                  placeholder="Select Domain"
                  className={errors.ddDomain ? '[&>button]:border-destructive' : ''}
                />
                {errors.ddDomain && (
                  <p className="text-sm text-destructive">{errors.ddDomain}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity">
                  Severity <span className="text-destructive">*</span>
                </Label>
                <Dropdown
                  options={severityOptions}
                  value={formData.severity || ''}
                  onChange={(value) => handleChange('severity', value as Severity)}
                  placeholder="Select Severity"
                  className={errors.severity ? '[&>button]:border-destructive' : ''}
                />
                {errors.severity && (
                  <p className="text-sm text-destructive">{errors.severity}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">
                  Status <span className="text-destructive">*</span>
                </Label>
                <Dropdown
                  options={statusOptions}
                  value={formData.status || ''}
                  onChange={(value) => handleChange('status', value as DDStatus)}
                  placeholder="Select Status"
                  className={errors.status ? '[&>button]:border-destructive' : ''}
                />
                {errors.status && <p className="text-sm text-destructive">{errors.status}</p>}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="thresholdText">
                  Threshold Text <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="thresholdText"
                  value={formData.thresholdText}
                  onChange={(e) => handleChange('thresholdText', e.target.value)}
                  placeholder="e.g., Approval rate must be >= 95%"
                  className={errors.thresholdText ? 'border-destructive' : ''}
                />
                {errors.thresholdText && (
                  <p className="text-sm text-destructive">{errors.thresholdText}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentValue">
                  Current Value <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="currentValue"
                  value={formData.currentValue}
                  onChange={(e) => handleChange('currentValue', e.target.value)}
                  placeholder="e.g., 87%"
                  className={errors.currentValue ? 'border-destructive' : ''}
                />
                {errors.currentValue && (
                  <p className="text-sm text-destructive">{errors.currentValue}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/sap/dd-item/${item.id}`)}
              >
                Cancel
              </Button>
              <Button type="submit">Update DD Item</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

