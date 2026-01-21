import { useState } from "react";
import { CheckCircle2, User, FileText, Calendar, Save, Edit2, AlertCircle, XCircle } from "lucide-react";
import { Card } from "../../../../../../components/ui/card";
import { Input } from "../../../../../../components/ui/input";
import { Textarea } from "../../../../../../components/ui/textarea";
import { Button } from "../../../../../../components/ui/button";
import { Dropdown, DropdownOption } from "../../../../../../components/ui/dropdown";
import { ControlEvidenceData } from "../../../../../../data/controlEvidenceData";

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

interface AssessmentTabProps {
  evidenceData: ControlEvidenceData;
  onUpdate?: (updatedData: Partial<ControlEvidenceData>) => void;
}

// Dummy role check - in real app, this would come from auth context
const hasEditPermission = () => {
  // TODO: Replace with actual role check from auth context
  // For now, return true for demo purposes
  return true;
};

export default function AssessmentTab({
  evidenceData,
  onUpdate,
}: AssessmentTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Entry Screen Fields - Human Governance Inputs
  const [lastReviewDate, setLastReviewDate] = useState(evidenceData.lastReviewDate);
  const [reviewedBy, setReviewedBy] = useState(evidenceData.reviewedBy);
  const [approvedBy, setApprovedBy] = useState(evidenceData.approvedBy);
  const [assessmentNarrative, setAssessmentNarrative] = useState(evidenceData.remarks);
  const [finalAssessmentStatus, setFinalAssessmentStatus] = useState(
    evidenceData.complianceStatus === "COMPLIANT" 
      ? "Control Operating Effectively" 
      : "Control Not Operating Effectively"
  );

  const canEdit = hasEditPermission();

  const handleSave = async () => {
    setIsSaving(true);
    
    // TODO: Replace with actual API call to backend
    // This is where Entry Screen Fields would be saved
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedData: Partial<ControlEvidenceData> = {
        lastReviewDate,
        reviewedBy,
        approvedBy,
        remarks: assessmentNarrative,
        complianceStatus: finalAssessmentStatus.includes("Operating Effectively") 
          ? "COMPLIANT" 
          : "NON-COMPLIANT",
      };

      // Call parent callback if provided
      onUpdate?.(updatedData);
      
      setIsEditing(false);
      // TODO: Show success toast notification
    } catch (error) {
      // TODO: Show error toast notification
      console.error("Failed to save assessment:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset to original values
    setLastReviewDate(evidenceData.lastReviewDate);
    setReviewedBy(evidenceData.reviewedBy);
    setApprovedBy(evidenceData.approvedBy);
    setAssessmentNarrative(evidenceData.remarks);
    setFinalAssessmentStatus(
      evidenceData.complianceStatus === "COMPLIANT" 
        ? "Control Operating Effectively" 
        : "Control Not Operating Effectively"
    );
    setIsEditing(false);
  };

  // Convert date format for input (DD-MMM-YY to YYYY-MM-DD)
  const formatDateForInput = (dateStr: string): string => {
    // Simple conversion - in real app, use proper date library
    const months: Record<string, string> = {
      "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04",
      "May": "05", "Jun": "06", "Jul": "07", "Aug": "08",
      "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
    };
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const day = parts[0].padStart(2, "0");
      const month = months[parts[1]] || "01";
      const year = "20" + parts[2];
      return `${year}-${month}-${day}`;
    }
    return "";
  };

  const formatDateForDisplay = (dateStr: string): string => {
    // Convert YYYY-MM-DD to DD-MMM-YY
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const day = date.getDate().toString().padStart(2, "0");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
  };
  const getStatusColor = (status: string) => {
    if (status.includes("Operating Effectively")) {
      return {
        bg: "from-green-50 to-green-100/50",
        border: "border-green-300",
        iconBg: "bg-green-100",
        iconBorder: "border-green-200",
        iconColor: "text-green-700",
        textColor: "text-green-900",
        textMuted: "text-green-700",
      };
    } else if (status.includes("Not Operating")) {
      return {
        bg: "from-red-50 to-red-100/50",
        border: "border-red-300",
        iconBg: "bg-red-100",
        iconBorder: "border-red-200",
        iconColor: "text-red-700",
        textColor: "text-red-900",
        textMuted: "text-red-700",
      };
    } else {
      return {
        bg: "from-amber-50 to-amber-100/50",
        border: "border-amber-300",
        iconBg: "bg-amber-100",
        iconBorder: "border-amber-200",
        iconColor: "text-amber-700",
        textColor: "text-amber-900",
        textMuted: "text-amber-700",
      };
    }
  };

  const statusColors = getStatusColor(finalAssessmentStatus);

  // Dropdown options for Assessment Status
  const assessmentStatusOptions: DropdownOption[] = [
    {
      value: "Control Operating Effectively",
      label: "Control Operating Effectively",
      icon: <CheckCircle2 className="h-4 w-4 text-green-600" />,
    },
    {
      value: "Control Not Operating Effectively",
      label: "Control Not Operating Effectively",
      icon: <XCircle className="h-4 w-4 text-red-600" />,
    },
    {
      value: "Control Design Deficiency",
      label: "Control Design Deficiency",
      icon: <AlertCircle className="h-4 w-4 text-amber-600" />,
    },
    {
      value: "Control Operating Deficiency",
      label: "Control Operating Deficiency",
      icon: <AlertCircle className="h-4 w-4 text-amber-600" />,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Assessment</h2>
        {canEdit && !isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="gap-2"
          >
            <Edit2 className="h-4 w-4" />
            Edit Assessment
          </Button>
        )}
      </div>

      {/* Final Assessment Status - Prominent Display */}
      <Card className={`p-4 border-2 ${statusColors.border} bg-gradient-to-br ${statusColors.bg} shadow-sm`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${statusColors.iconBg} border ${statusColors.iconBorder}`}>
              <CheckCircle2 className={`h-5 w-5 ${statusColors.iconColor}`} />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Final Assessment Status
              </p>
              {isEditing ? (
                <Dropdown
                  options={assessmentStatusOptions}
                  value={finalAssessmentStatus}
                  onChange={setFinalAssessmentStatus}
                  className="min-w-[320px]"
                />
              ) : (
                <p className={`text-base font-bold ${statusColors.textColor}`}>
                  {finalAssessmentStatus}
                </p>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-medium text-muted-foreground/80 uppercase tracking-wider mb-1">
              Source
            </p>
            <p className="text-[10px] text-muted-foreground/70">
              Entry Screen
            </p>
            <p className="text-[10px] text-muted-foreground/70">
              (Computed + Override)
            </p>
          </div>
        </div>
      </Card>

      {/* Entry Screen Fields Card */}
      <Card className="p-5 border border-border/50 shadow-sm">
        <div className="space-y-4">
          {/* Review Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Last Review Date */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#4160F0]" />
                Last Review Date
                <span className="text-red-500">*</span>
              </label>
              {isEditing ? (
                <Input
                  type="date"
                  value={formatDateForInput(lastReviewDate)}
                  onChange={(e) => setLastReviewDate(formatDateForDisplay(e.target.value))}
                  className="h-9 text-sm"
                  required
                />
              ) : (
                <div className="px-3 py-2 bg-muted/20 rounded-md border border-border/30">
                  <p className="text-sm font-medium text-foreground">{lastReviewDate}</p>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/70">
                <span className="font-medium">Source:</span>
                <span>Entry Screen (Human Governance Input)</span>
              </div>
            </div>

            {/* Reviewed By */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-[#4160F0]" />
                Reviewed By
                <span className="text-red-500">*</span>
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={reviewedBy}
                  onChange={(e) => setReviewedBy(e.target.value)}
                  placeholder="Enter reviewer name"
                  className="h-9 text-sm"
                  required
                />
              ) : (
                <div className="px-3 py-2 bg-muted/20 rounded-md border border-border/30">
                  <p className="text-sm font-medium text-foreground">{reviewedBy}</p>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/70">
                <span className="font-medium">Source:</span>
                <span>Entry Screen (Human Governance Input)</span>
              </div>
            </div>

            {/* Approved By */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-[#4160F0]" />
                Approved By
                <span className="text-red-500">*</span>
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={approvedBy}
                  onChange={(e) => setApprovedBy(e.target.value)}
                  placeholder="Enter approver name"
                  className="h-9 text-sm"
                  required
                />
              ) : (
                <div className="px-3 py-2 bg-muted/20 rounded-md border border-border/30">
                  <p className="text-sm font-medium text-foreground">{approvedBy}</p>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/70">
                <span className="font-medium">Source:</span>
                <span>Entry Screen (Human Governance Input)</span>
              </div>
            </div>
          </div>

          {/* Assessment Narrative */}
          <div className="space-y-2 pt-2 border-t border-border/30">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-[#4160F0]" />
              Assessment Narrative
              <span className="text-red-500">*</span>
            </label>
            {isEditing ? (
              <Textarea
                value={assessmentNarrative}
                onChange={(e) => setAssessmentNarrative(e.target.value)}
                placeholder="Enter detailed assessment narrative describing the control's operating effectiveness, any exceptions identified, and remediation actions taken..."
                rows={4}
                className="resize-none text-sm"
                required
              />
            ) : (
              <div className="p-3 bg-muted/10 rounded-md border border-border/30">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {assessmentNarrative}
                </p>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/70">
              <span className="font-medium">Source:</span>
              <span>Entry Screen (Human Governance Input)</span>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex items-center gap-3 pt-4 border-t border-border/50">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                size="sm"
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save Assessment"}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
                size="sm"
              >
                Cancel
              </Button>
              <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                <span>Audit trail will be recorded on save</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

