import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select } from '../../../components/ui/select';
import { Textarea } from '../../../components/ui/textarea';
import { DDDomain, Severity, DDStatus } from '../../../types';
import { getAllSubModules } from '../../../data/mockData';
import { ArrowLeft } from 'lucide-react';

export function CreateDDItem() {
  const { moduleId, subModuleId } = useParams<{ moduleId: string; subModuleId: string }>();
  const navigate = useNavigate();
  const allSubModules = getAllSubModules();

  const [formData, setFormData] = useState({
    itemId: '',
    subModuleId: subModuleId || '',
    kpiName: '',
    controlObjective: '',
    ddDomain: '' as DDDomain | '',
    severity: '' as Severity | '',
    status: '' as DDStatus | '',
    thresholdText: '',
    currentValue: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
    console.log('Creating DD Item:', formData);
    
    // Navigate back to dashboard
    navigate(`/sap/${moduleId}/${subModuleId}`);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate(`/sap/${moduleId}/${subModuleId}`)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Due Diligence Item</h1>
          <p className="text-muted-foreground mt-2">
            Add a new KPI/Control check for Due Diligence
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>DD Item Details</CardTitle>
          <CardDescription>
            Fill in all required fields to create a new Due Diligence item
          </CardDescription>
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
                {errors.itemId && (
                  <p className="text-sm text-destructive">{errors.itemId}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subModuleId">
                  Sub-Module <span className="text-destructive">*</span>
                </Label>
                <Select
                  id="subModuleId"
                  value={formData.subModuleId}
                  onChange={(e) => handleChange('subModuleId', e.target.value)}
                  className={errors.subModuleId ? 'border-destructive' : ''}
                  disabled={!!subModuleId}
                >
                  <option value="">Select Sub-Module</option>
                  {allSubModules.map((subModule) => (
                    <option key={subModule.id} value={subModule.id}>
                      {subModule.code} - {subModule.name}
                    </option>
                  ))}
                </Select>
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
              {errors.kpiName && (
                <p className="text-sm text-destructive">{errors.kpiName}</p>
              )}
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
                <Select
                  id="ddDomain"
                  value={formData.ddDomain}
                  onChange={(e) => handleChange('ddDomain', e.target.value as DDDomain)}
                  className={errors.ddDomain ? 'border-destructive' : ''}
                >
                  <option value="">Select Domain</option>
                  <option value="Risk Management">Risk Management</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Process Integrity">Process Integrity</option>
                  <option value="Data Quality">Data Quality</option>
                  <option value="Security">Security</option>
                </Select>
                {errors.ddDomain && (
                  <p className="text-sm text-destructive">{errors.ddDomain}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity">
                  Severity <span className="text-destructive">*</span>
                </Label>
                <Select
                  id="severity"
                  value={formData.severity}
                  onChange={(e) => handleChange('severity', e.target.value as Severity)}
                  className={errors.severity ? 'border-destructive' : ''}
                >
                  <option value="">Select Severity</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </Select>
                {errors.severity && (
                  <p className="text-sm text-destructive">{errors.severity}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">
                  Status <span className="text-destructive">*</span>
                </Label>
                <Select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value as DDStatus)}
                  className={errors.status ? 'border-destructive' : ''}
                >
                  <option value="">Select Status</option>
                  <option value="Comfortable">Comfortable</option>
                  <option value="Needs Review">Needs Review</option>
                  <option value="High Risk">High Risk</option>
                </Select>
                {errors.status && (
                  <p className="text-sm text-destructive">{errors.status}</p>
                )}
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
                onClick={() => navigate(`/sap/${moduleId}/${subModuleId}`)}
              >
                Cancel
              </Button>
              <Button type="submit">Create DD Item</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

