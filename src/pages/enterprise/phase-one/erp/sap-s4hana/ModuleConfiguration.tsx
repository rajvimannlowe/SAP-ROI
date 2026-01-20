import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader } from "../../../../../components/layout/PageHeader";
import { MODULE_COCKPIT_DATA } from "../../../../../data/moduleCockpitData";
import { SAP_S4HANA_BLUEPRINT } from "../../../../../data/productBlueprintData";
import { CONFIGURATION_QUESTIONS } from "../../../../../data/configurationQuestionsData";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import { Badge } from "../../../../../components/ui/badge";
import { Progress } from "../../../../../components/ui/progress";
import {
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

const QUESTIONS_PER_PAGE = 5;

export function ModuleConfiguration() {
  const {
    moduleId,
    id: blueprintId,
  } = useParams<{
    moduleId: string;
    id: string;
  }>();
  const navigate = useNavigate();

  const [responses, setResponses] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);

  const cockpitData = moduleId ? MODULE_COCKPIT_DATA[moduleId] : null;
  const blueprint = SAP_S4HANA_BLUEPRINT;
  const selectedModule = blueprint?.subModules.find(m => m.id === moduleId);

  if (!cockpitData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Module Not Found
          </h2>
          <p className="text-muted-foreground mb-4">
            The requested module is not available.
          </p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const handleResponseChange = (questionId: string, value: string, questionIndex: number) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    
    // Auto-advance to next question after a short delay
    setTimeout(() => {
      const nextQuestionIndex = questionIndex + 1;
      if (nextQuestionIndex < CONFIGURATION_QUESTIONS.length) {
        const nextQuestion = CONFIGURATION_QUESTIONS[nextQuestionIndex];
        const nextPage = Math.floor(nextQuestionIndex / QUESTIONS_PER_PAGE) + 1;
        const currentPageStart = (currentPage - 1) * QUESTIONS_PER_PAGE;
        const currentPageEnd = currentPageStart + QUESTIONS_PER_PAGE;
        
        // Check if next question is on current page
        if (nextQuestionIndex >= currentPageStart && nextQuestionIndex < currentPageEnd) {
          // Scroll to next question on same page
          const nextQuestionElement = document.getElementById(`question-${nextQuestion.id}`);
          if (nextQuestionElement) {
            nextQuestionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          // Navigate to next page
          setCurrentPage(nextPage);
          // Scroll to top after page change
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 100);
        }
      }
    }, 300);
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
    localStorage.setItem(`module-config-${moduleId}`, JSON.stringify(responses));
    // Navigate based on eligibility
    if (isEligible) {
      // Navigate to flow selection page
      const catalogId = blueprintId || "sap-s4hana";
      navigate(`/phase-i/catalog/${catalogId}/modules/${moduleId}/flow`);
    } else {
      // Show message that it's not applicable
      // The message is already shown in the UI, but we can add a toast notification if needed
    }
  };

  const loadSavedResponses = () => {
    const saved = localStorage.getItem(`module-config-${moduleId}`);
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
  }, [moduleId]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Calculate pagination
  const totalPages = Math.ceil(CONFIGURATION_QUESTIONS.length / QUESTIONS_PER_PAGE);
  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const endIndex = startIndex + QUESTIONS_PER_PAGE;
  const currentQuestions = CONFIGURATION_QUESTIONS.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleQuestionClick = (questionIndex: number) => {
    const page = Math.floor(questionIndex / QUESTIONS_PER_PAGE) + 1;
    setCurrentPage(page);
    // Scroll to top after page change
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const getQuestionStatus = (questionId: string) => {
    return responses[questionId] ? "answered" : "unanswered";
  };

  const renderConfigurationTab = () => {
    const answeredCount = CONFIGURATION_QUESTIONS.filter((q) => responses[q.id]).length;
    const allAnswered = answeredCount === CONFIGURATION_QUESTIONS.length;

    return (
      <div className="space-y-4">
        {/* Compact Progress Section */}
        <Card className="border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-foreground">
                Assessment Progress
              </h3>
              <Badge variant="secondary" className="text-xs">
                {answeredCount} / {CONFIGURATION_QUESTIONS.length}
              </Badge>
            </div>
            <Progress value={(answeredCount / CONFIGURATION_QUESTIONS.length) * 100} className="h-2" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Quick Navigation Sidebar - White Buttons with Checkmarks */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="sticky top-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-5 gap-1.5">
                  {CONFIGURATION_QUESTIONS.map((question, index) => {
                    const status = getQuestionStatus(question.id);
                    const isCurrent = index >= startIndex && index < endIndex;
                    const isAnswered = status === "answered";
                    return (
                      <button
                        key={question.id}
                        onClick={() => handleQuestionClick(index)}
                        className={`relative aspect-square p-1.5 rounded border-2 text-xs font-medium transition-all ${
                          isCurrent
                            ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
                            : "bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                        }`}
                        title={question.id}
                      >
                        {question.id}
                        {isAnswered && (
                          <Check className="absolute -top-1 -right-1 h-3.5 w-3.5 text-green-600 bg-white rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>
                
                {/* Threshold Section Below Navigation */}
                <div className="pt-3 border-t space-y-2">
                  <div className="p-2 rounded bg-gray-50 border border-gray-200">
                    <p className="text-xs font-semibold text-foreground mb-1">Score</p>
                    <p className="text-lg font-bold text-blue-600">
                      {totalScore} / {maxScore}
                    </p>
                    <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</p>
                  </div>
                  <div className="p-2 rounded bg-gray-50 border border-gray-200">
                    <p className="text-xs font-semibold text-foreground mb-1">Threshold</p>
                    <div className="flex items-center gap-1">
                      {percentage >= 70 ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-red-600" />
                      )}
                      <span className={`text-xs font-medium ${percentage >= 70 ? "text-green-600" : "text-red-600"}`}>
                        ≥ 70% {percentage >= 70 ? "Met" : "Not Met"}
                      </span>
                    </div>
                  </div>
                  <div className="p-2 rounded bg-gray-50 border border-gray-200">
                    <p className="text-xs font-semibold text-foreground mb-1.5">Requirements</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        {responses["Q1"] === "fully_implemented" ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <XCircle className="h-3 w-3 text-red-600" />
                        )}
                        <span className="text-xs text-foreground">Q1: Fully Implemented</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {responses["Q2"] === "fully_integrated" ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <XCircle className="h-3 w-3 text-red-600" />
                        )}
                        <span className="text-xs text-foreground">Q2: Fully Integrated</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Eligibility Status */}
                  <div className={`p-2 rounded border ${isEligible ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                    {isEligible ? (
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-green-700">Eligible</p>
                          <p className="text-xs text-green-600">Can proceed</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-red-700">Not Eligible</p>
                          <p className="text-xs text-red-600">
                            {percentage < 70 ? "Score < 70%" : "Check Q1 & Q2"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Questions Section - More Compact */}
          <div className="lg:col-span-3 space-y-4">
            {currentQuestions.map((question, qIndex) => {
              const questionIndex = startIndex + qIndex;
              return (
                <Card key={question.id} id={`question-${question.id}`} className="shadow-sm border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <span className="text-blue-600 font-bold">
                          {question.id}
                        </span>
                        <span className="text-sm">{question.question}</span>
                      </CardTitle>
                      {responses[question.id] && (
                        <Check className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {question.options.map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
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
                              handleResponseChange(question.id, e.target.value, questionIndex)
                            }
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="flex-1 text-sm font-medium">
                            {option.label}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {option.score}
                          </Badge>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Compact Pagination Controls */}
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="text-xs text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              className="w-full"
              size="lg"
              disabled={!allAnswered}
            >
              {allAnswered ? "Submit Configuration" : `Answer ${CONFIGURATION_QUESTIONS.length - answeredCount} more question(s) to submit`}
            </Button>
          </div>
        </div>
      </div>
    );
  };

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
        title={cockpitData.moduleName}
        subtitle={`Configuration Assessment - ${cockpitData.moduleLabel}`}
        backTo={`/phase-i/catalog/${
          blueprintId || "sap-s4hana"
        }/modules/${moduleId}`}
        backLabel="Back to Configuration Selection"
      />

      {/* Configuration Content */}
      <div className="mt-6">
        {renderConfigurationTab()}
      </div>
    </div>
  );
}
