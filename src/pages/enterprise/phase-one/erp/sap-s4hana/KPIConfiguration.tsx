import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader } from "../../../../../components/layout/PageHeader";
import { MODULE_COCKPIT_DATA } from "../../../../../data/moduleCockpitData";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import { Badge } from "../../../../../components/ui/badge";
import {
  Settings,
  FileText,
  ClipboardList,
  CheckCircle2,
  XCircle,
  // AlertCircle,
  ArrowRight,
} from "lucide-react";
// import { getStatusColor } from "../../../../../data/statusMapping";

interface ConfigurationQuestion {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    score: number; // Score for threshold calculation
  }[];
}

const CONFIGURATION_QUESTIONS: ConfigurationQuestion[] = [
  {
    id: "Q1",
    question: "Is this product implemented in your organization?",
    options: [
      { value: "fully_implemented", label: "Fully Implemented", score: 3 },
      { value: "partially_implemented", label: "Partially Implemented", score: 2 },
      { value: "planned", label: "Planned", score: 1 },
      { value: "not_implemented", label: "Not Implemented", score: 0 },
    ],
  },
  {
    id: "Q2",
    question: "Is the product integration acceptable and fully integrated?",
    options: [
      { value: "fully_integrated", label: "Fully Integrated", score: 3 },
      { value: "partially_integrated", label: "Partially Integrated", score: 2 },
      { value: "acceptable", label: "Acceptable", score: 1 },
      { value: "not_acceptable", label: "Not Acceptable", score: 0 },
    ],
  },
  {
    id: "Q3",
    question: "Are all required modules configured and operational?",
    options: [
      { value: "all_configured", label: "All Configured", score: 3 },
      { value: "most_configured", label: "Most Configured", score: 2 },
      { value: "some_configured", label: "Some Configured", score: 1 },
      { value: "none_configured", label: "None Configured", score: 0 },
    ],
  },
  {
    id: "Q4",
    question: "Is the data quality acceptable for ROI measurement?",
    options: [
      { value: "excellent", label: "Excellent", score: 3 },
      { value: "good", label: "Good", score: 2 },
      { value: "acceptable", label: "Acceptable", score: 1 },
      { value: "poor", label: "Poor", score: 0 },
    ],
  },
  {
    id: "Q5",
    question: "Are users trained and adopting the system?",
    options: [
      { value: "high_adoption", label: "High Adoption", score: 3 },
      { value: "moderate_adoption", label: "Moderate Adoption", score: 2 },
      { value: "low_adoption", label: "Low Adoption", score: 1 },
      { value: "no_adoption", label: "No Adoption", score: 0 },
    ],
  },
  {
    id: "Q6",
    question: "Is the system performance acceptable?",
    options: [
      { value: "excellent", label: "Excellent", score: 3 },
      { value: "good", label: "Good", score: 2 },
      { value: "acceptable", label: "Acceptable", score: 1 },
      { value: "poor", label: "Poor", score: 0 },
    ],
  },
  {
    id: "Q7",
    question: "Are compliance and security controls in place?",
    options: [
      { value: "fully_compliant", label: "Fully Compliant", score: 3 },
      { value: "mostly_compliant", label: "Mostly Compliant", score: 2 },
      { value: "partially_compliant", label: "Partially Compliant", score: 1 },
      { value: "not_compliant", label: "Not Compliant", score: 0 },
    ],
  },
  {
    id: "Q8",
    question: "Is the system maintenance and support adequate?",
    options: [
      { value: "excellent", label: "Excellent", score: 3 },
      { value: "good", label: "Good", score: 2 },
      { value: "acceptable", label: "Acceptable", score: 1 },
      { value: "inadequate", label: "Inadequate", score: 0 },
    ],
  },
  {
    id: "Q9",
    question: "Are business processes aligned with the system?",
    options: [
      { value: "fully_aligned", label: "Fully Aligned", score: 3 },
      { value: "mostly_aligned", label: "Mostly Aligned", score: 2 },
      { value: "partially_aligned", label: "Partially Aligned", score: 1 },
      { value: "not_aligned", label: "Not Aligned", score: 0 },
    ],
  },
  {
    id: "Q10",
    question: "Is the ROI measurement framework ready?",
    options: [
      { value: "ready", label: "Ready", score: 3 },
      { value: "mostly_ready", label: "Mostly Ready", score: 2 },
      { value: "partially_ready", label: "Partially Ready", score: 1 },
      { value: "not_ready", label: "Not Ready", score: 0 },
    ],
  },
];

type TabType = "configuration" | "report" | "action";

export function KPIConfiguration() {
  const {
    moduleId,
    kpiId,
    id: blueprintId,
  } = useParams<{
    moduleId: string;
    kpiId: string;
    id: string;
  }>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabType>("configuration");
  const [responses, setResponses] = useState<Record<string, string>>({});

  const cockpitData = moduleId ? MODULE_COCKPIT_DATA[moduleId] : null;
  const kpiDetail = cockpitData?.kpiDetails.find((kpi) => {
    if (kpi.id === kpiId) return true;
    const nameSlug = kpi.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    return nameSlug === kpiId;
  });

  if (!cockpitData || !kpiDetail) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            KPI Not Found
          </h2>
          <p className="text-muted-foreground mb-4">
            The requested KPI detail is not available.
          </p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    let maxScore = 0;
    CONFIGURATION_QUESTIONS.forEach((question) => {
      maxScore += 3; // Max score per question is 3
      const response = responses[question.id];
      if (response) {
        const option = question.options.find((opt) => opt.value === response);
        if (option) {
          totalScore += option.score;
        }
      }
    });
    return { totalScore, maxScore, percentage: (totalScore / maxScore) * 100 };
  };

  const { totalScore, maxScore, percentage } = calculateScore();
  
  // Threshold: Need at least 70% score AND Q1 and Q2 must be "fully_implemented" and "fully_integrated"
  const isEligible = 
    percentage >= 70 &&
    responses["Q1"] === "fully_implemented" &&
    responses["Q2"] === "fully_integrated";

  const handleSubmit = () => {
    // Save responses (can be stored in localStorage or sent to backend)
    localStorage.setItem(`kpi-config-${kpiId}`, JSON.stringify(responses));
    // Navigate based on eligibility
    if (isEligible) {
      // Allow proceeding with ROI dimension and sub module flow
      navigate(
        `/phase-i/catalog/${blueprintId || "sap-s4hana"}/blueprint/${moduleId}/cockpit`
      );
    } else {
      // Show message that it's not applicable
      // The message is already shown in the UI, but we can add a toast notification if needed
    }
  };

  const loadSavedResponses = () => {
    const saved = localStorage.getItem(`kpi-config-${kpiId}`);
    if (saved) {
      try {
        setResponses(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading saved responses", e);
      }
    }
  };

  // Load saved responses on mount
  useEffect(() => {
    loadSavedResponses();
  }, [kpiId]);

  const renderConfigurationTab = () => (
    <div className="space-y-6">
      <div className="bg-blue-50/80 border border-blue-200/60 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Settings className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Configuration Assessment
            </h3>
            <p className="text-sm text-muted-foreground">
              Please answer all questions to assess if this KPI is applicable for your organization.
              You need at least 70% score and must have the product fully implemented and integrated
              to proceed with ROI dimension and sub-module flow.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {CONFIGURATION_QUESTIONS.map((question) => (
          <Card key={question.id} className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <span className="text-blue-600 font-bold">
                  {question.id}
                </span>
                <span>{question.question}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {question.options.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      responses[question.id] === option.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option.value}
                      checked={responses[question.id] === option.value}
                      onChange={(e) =>
                        handleResponseChange(question.id, e.target.value)
                      }
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="flex-1 text-sm font-medium">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Score Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Assessment Score
              </h3>
              <p className="text-sm text-muted-foreground">
                {CONFIGURATION_QUESTIONS.filter((q) => responses[q.id]).length} of{" "}
                {CONFIGURATION_QUESTIONS.length} questions answered
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {totalScore} / {maxScore}
              </div>
              <div className="text-sm text-muted-foreground">
                {percentage.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Eligibility Status */}
          <div className="mt-4 p-4 rounded-lg bg-white border-2">
            {isEligible ? (
              <div className="flex items-center gap-3 text-green-700">
                <CheckCircle2 className="h-5 w-5" />
                <div>
                  <p className="font-semibold">Eligible to Proceed</p>
                  <p className="text-sm text-green-600">
                    You can proceed with ROI dimension and sub-module flow.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-red-700">
                <XCircle className="h-5 w-5" />
                <div>
                  <p className="font-semibold">Not Applicable</p>
                  <p className="text-sm text-red-600">
                    {percentage < 70
                      ? "Score is below 70%. Please improve your configuration."
                      : "Product must be fully implemented and integrated to proceed."}
                  </p>
                </div>
              </div>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full mt-4"
            size="lg"
            disabled={
              CONFIGURATION_QUESTIONS.filter((q) => responses[q.id]).length !==
              CONFIGURATION_QUESTIONS.length
            }
          >
            Save Configuration
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderReportTab = () => {
    const answeredCount = CONFIGURATION_QUESTIONS.filter(
      (q) => responses[q.id]
    ).length;

    return (
      <div className="space-y-6">
        <div className="bg-purple-50/80 border border-purple-200/60 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Configuration Responses Report
              </h3>
              <p className="text-sm text-muted-foreground">
                View all your configuration assessment responses and scores.
              </p>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle>Assessment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-sm text-muted-foreground mb-1">
                  Questions Answered
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {answeredCount} / {CONFIGURATION_QUESTIONS.length}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <p className="text-sm text-muted-foreground mb-1">Total Score</p>
                <p className="text-2xl font-bold text-green-600">
                  {totalScore} / {maxScore}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                <p className="text-sm text-muted-foreground mb-1">Percentage</p>
                <p className="text-2xl font-bold text-purple-600">
                  {percentage.toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Responses */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Detailed Responses</h3>
          {CONFIGURATION_QUESTIONS.map((question) => {
            const response = responses[question.id];
            const selectedOption = question.options.find(
              (opt) => opt.value === response
            );

            return (
              <Card key={question.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-2">
                        {question.id}: {question.question}
                      </p>
                      {selectedOption ? (
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-700 border-blue-200"
                          >
                            {selectedOption.label}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Score: {selectedOption.score}/3
                          </span>
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Not Answered
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={kpiDetail.name}
        subtitle={`Configuration Assessment - ${cockpitData.moduleName}`}
        backTo={`/phase-i/catalog/${
          blueprintId || "sap-s4hana"
        }/blueprint/${moduleId}/cockpit/${kpiId}`}
        backLabel="Back to KPI Detail"
      />

      {/* Tab Buttons */}
      <div className="flex gap-4 border-b">
        <Button
          variant={activeTab === "configuration" ? "default" : "ghost"}
          onClick={() => setActiveTab("configuration")}
          className="rounded-b-none"
        >
          <Settings className="h-4 w-4 mr-2" />
          Configuration
        </Button>
        <Button
          variant={activeTab === "report" ? "default" : "ghost"}
          onClick={() => setActiveTab("report")}
          className="rounded-b-none"
        >
          <FileText className="h-4 w-4 mr-2" />
          Report
        </Button>
        <Button
          variant={activeTab === "action" ? "default" : "ghost"}
          onClick={() => {
            navigate(
              `/phase-i/catalog/${
                blueprintId || "sap-s4hana"
              }/blueprint/${moduleId}/cockpit/${kpiId}/actions`
            );
          }}
          className="rounded-b-none"
        >
          <ClipboardList className="h-4 w-4 mr-2" />
          Action
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "configuration" && renderConfigurationTab()}
        {activeTab === "report" && renderReportTab()}
      </div>
    </div>
  );
}

