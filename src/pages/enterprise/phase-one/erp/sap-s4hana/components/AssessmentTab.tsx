import { CheckCircle2, User, FileText, Calendar } from "lucide-react";
import { Card } from "../../../../../../components/ui/card";
import { InfoCard } from "../../../../../../components/roi/cards/InfoCard";
import { ControlEvidenceData } from "../../../../../../data/controlEvidenceData";

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getGradient = (color: string) =>
  `linear-gradient(135deg, ${color} 0%, ${hexToRgba(color, 0.8)} 100%)`;

interface AssessmentTabProps {
  evidenceData: ControlEvidenceData;
}

export default function AssessmentTab({
  evidenceData,
}: AssessmentTabProps) {
  return (
    <div className="space-y-6">
      {/* Reviewer & Approver Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard
          icon={User}
          iconGradient={getGradient("#2563eb")}
          title="Reviewed By"
          value={evidenceData.reviewedBy}
          borderColor={hexToRgba("#2563eb", 0.3)}
          bgColor={hexToRgba("#2563eb", 0.05)}
        />
        <InfoCard
          icon={User}
          iconGradient={getGradient("#10b981")}
          title="Approved By"
          value={evidenceData.approvedBy}
          borderColor={hexToRgba("#10b981", 0.3)}
          bgColor={hexToRgba("#10b981", 0.05)}
        />
      </div>

      {/* Remarks Card */}
      <InfoCard
        icon={FileText}
        iconGradient={getGradient("#9333ea")}
        title="Review Remarks"
        description={
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            {evidenceData.remarks}
          </p>
        }
        borderColor={hexToRgba("#9333ea", 0.3)}
        bgColor={hexToRgba("#9333ea", 0.05)}
      />

      {/* Assessment Status Card */}
      <Card className="p-6 border-2 bg-gradient-to-br from-green-50/40 to-green-100/20 border-green-300 shadow-lg">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-100 border-2 border-green-200 shadow-sm">
              <CheckCircle2 className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Control Assessment
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Final Assessment Status
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-gradient-to-r from-green-100 to-green-50 border-2 border-green-300">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-green-200 shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-700" />
              </div>
              <div className="flex-1">
                <p className="text-base font-bold text-green-900 mb-2">
                  Control Operating Effectively
                </p>
                <p className="text-sm text-green-700 leading-relaxed">
                  No deficiencies identified. Control design and operating
                  effectiveness are adequate. The control has been tested and
                  verified to meet all compliance requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Document Info Footer */}
      <Card className="p-4 border border-border/50 bg-muted/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              Document Generated:{" "}
              <span className="font-medium text-foreground">
                {new Date().toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </span>
          </div>
          <div className="px-3 py-1 rounded-md bg-muted/60 border border-border/50">
            <span className="font-medium">Classification: Internal Use Only</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

