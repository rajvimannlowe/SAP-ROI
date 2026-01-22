import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader } from "../../../../../components/layout/PageHeader";
import { MODULE_COCKPIT_DATA } from "../../../../../data/moduleCockpitData";
// import { SAP_S4HANA_BLUEPRINT } from "../../../../../data/productBlueprintData";
import { CONFIGURATION_QUESTIONS } from "../../../../../data/configurationQuestionsData";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import { Badge } from "../../../../../components/ui/badge";
import { Progress } from "../../../../../components/ui/progress";
import { Textarea } from "../../../../../components/ui/textarea";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  XCircle,
  // FileText,
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
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);

  const cockpitData = moduleId ? MODULE_COCKPIT_DATA[moduleId] : null;
  // const blueprint = SAP_S4HANA_BLUEPRINT;
  // const selectedModule = blueprint?.subModules.find(m => m.id === moduleId);

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
    
    // Clear remark if not "not_applicable"
    if (value !== "not_applicable") {
      setRemarks((prev) => {
        const newRemarks = { ...prev };
        delete newRemarks[questionId];
        return newRemarks;
      });
    }
    
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

  const handleRemarkChange = (questionId: string, value: string) => {
    setRemarks((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const calculateScore = () => {
    let yesCount = 0;
    let noCount = 0;
    let notApplicableCount = 0;
    
    CONFIGURATION_QUESTIONS.forEach((question) => {
      const response = responses[question.id];
      if (response === "yes") {
        yesCount++;
      } else if (response === "no") {
        noCount++;
      } else if (response === "not_applicable") {
        notApplicableCount++;
      }
    });
    
    return { yesCount, noCount, notApplicableCount };
  };

  const { yesCount, noCount, notApplicableCount } = calculateScore();

  const handleSubmit = () => {
    // Save responses and remarks
    const dataToSave = {
      responses,
      remarks,
    };
    localStorage.setItem(`module-config-${moduleId}`, JSON.stringify(dataToSave));
    // Navigate to flow selection page
    const catalogId = blueprintId || "sap-s4hana";
    navigate(`/phase-i/catalog/${catalogId}/modules/${moduleId}/flow`);
  };

  const loadSavedResponses = () => {
    const saved = localStorage.getItem(`module-config-${moduleId}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setResponses(data.responses || data || {});
        setRemarks(data.remarks || {});
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
    const allAnswered = CONFIGURATION_QUESTIONS.every((q) => {
      const response = responses[q.id];
      if (response === "not_applicable") {
        return remarks[q.id] && remarks[q.id].trim().length > 0;
      }
      return !!response;
    });

    return (
      <div className="flex flex-col h-full min-h-0">
        {/* Fixed Grid Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-3 min-h-0">
          {/* Fixed Navigation Sidebar */}
          <div className="lg:col-span-1 flex-shrink-0 space-y-3 flex flex-col min-h-0">
            {/* Progress Card */}
            <Card>
              <CardHeader className="pb-2 pt-3 px-3">
                <CardTitle className="text-xs font-medium">Progress</CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">
                    Questions
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {answeredCount}/{CONFIGURATION_QUESTIONS.length}
                  </Badge>
                </div>
                <Progress value={(answeredCount / CONFIGURATION_QUESTIONS.length) * 100} className="h-1.5" />
              </CardContent>
            </Card>

            {/* Quick Navigation Card */}
            <Card className="flex-1 flex flex-col min-h-0">
              <CardHeader className="pb-2 pt-3 px-3">
                <CardTitle className="text-xs font-medium">Quick Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 px-3 pb-3 flex-1 overflow-y-auto">
                <div className="grid grid-cols-10 gap-1">
                  {CONFIGURATION_QUESTIONS.map((question, index) => {
                    const status = getQuestionStatus(question.id);
                    const isCurrent = index >= startIndex && index < endIndex;
                    const isAnswered = status === "answered";
                    return (
                      <button
                        key={question.id}
                        onClick={() => handleQuestionClick(index)}
                        className={`aspect-square p-1 rounded border text-xs font-medium transition-all ${
                          isAnswered
                            ? "bg-green-500 border-green-600 text-white shadow-sm"
                            : isCurrent
                            ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
                            : "bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                        }`}
                        title={question.id}
                      >
                        {question.id}
                      </button>
                    );
                  })}
                </div>
                
                {/* Score Section Below Navigation */}
                <div className="pt-3 border-t space-y-2.5 mt-3">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200 shadow-sm">
                    <p className="text-xs font-bold text-foreground mb-2.5 uppercase tracking-wide">Response Summary</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded-md bg-green-50 border border-green-200">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-600"></div>
                          <span className="text-xs font-medium text-green-900">Yes</span>
                        </div>
                        <span className="text-sm font-bold text-green-700">{yesCount}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-md bg-red-50 border border-red-200">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-600"></div>
                          <span className="text-xs font-medium text-red-900">No</span>
                        </div>
                        <span className="text-sm font-bold text-red-700">{noCount}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-md bg-amber-50 border border-amber-200">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                          <span className="text-xs font-medium text-amber-900">Not Applicable</span>
                        </div>
                        <span className="text-sm font-bold text-amber-700">{notApplicableCount}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Response Descriptions */}
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 shadow-sm">
                    <p className="text-xs font-bold text-foreground mb-2.5 uppercase tracking-wide">Response Guide</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 flex-shrink-0"></div>
                        <p className="text-muted-foreground leading-relaxed">
                          <span className="font-semibold text-green-700">Yes:</span> The requirement is met or implemented.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></div>
                        <p className="text-muted-foreground leading-relaxed">
                          <span className="font-semibold text-red-700">No:</span> The requirement is not met or not implemented.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0"></div>
                        <p className="text-muted-foreground leading-relaxed">
                          <span className="font-semibold text-amber-700">Not Applicable:</span> The requirement does not apply to your organization. Please provide a reason.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scrollable Questions Section */}
          <div className="lg:col-span-3 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {currentQuestions.map((question, qIndex) => {
                const questionIndex = startIndex + qIndex;
                return (
                  <Card key={question.id} id={`question-${question.id}`} className="shadow-sm border hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3 pt-4 px-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2.5">
                          <span className="text-blue-600 font-bold text-base">
                            {question.id}
                          </span>
                          <span className="text-sm text-foreground leading-relaxed">{question.question}</span>
                        </CardTitle>
                        <div className="flex-shrink-0">
                          {responses[question.id] === "yes" && (
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-100 border border-green-200">
                              <Check className="h-4 w-4 text-green-600" />
                              <span className="text-xs font-semibold text-green-700">Yes</span>
                            </div>
                          )}
                          {responses[question.id] === "no" && (
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-100 border border-red-200">
                              <XCircle className="h-4 w-4 text-red-600" />
                              <span className="text-xs font-semibold text-red-700">No</span>
                            </div>
                          )}
                          {responses[question.id] === "not_applicable" && (
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-100 border border-amber-200">
                              <Check className="h-4 w-4 text-amber-600" />
                              <span className="text-xs font-semibold text-amber-700">N/A</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 px-3 pb-3">
                      <div className="space-y-2">
                        <label
                          className={`group flex items-center gap-3 p-3.5 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            responses[question.id] === "yes"
                              ? "border-green-500 bg-green-50 shadow-md ring-2 ring-green-200"
                              : "border-gray-200 hover:border-green-300 hover:bg-green-50/30 hover:shadow-sm"
                          }`}
                        >
                          <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                            <input
                              type="radio"
                              name={question.id}
                              value="yes"
                              checked={responses[question.id] === "yes"}
                              onChange={(e) =>
                                handleResponseChange(question.id, e.target.value, questionIndex)
                              }
                              className="w-5 h-5 text-green-600 border-2 border-gray-300 focus:ring-2 focus:ring-green-500 focus:ring-offset-1 cursor-pointer appearance-none rounded-full checked:border-green-600 checked:bg-white"
                            />
                            {responses[question.id] === "yes" && (
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <span className={`text-sm font-semibold ${
                              responses[question.id] === "yes" ? "text-green-700" : "text-foreground"
                            }`}>
                              Yes
                            </span>
                          </div>
                          {responses[question.id] === "yes" && (
                            <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                          )}
                        </label>
                        
                        <label
                          className={`group flex items-center gap-3 p-3.5 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            responses[question.id] === "no"
                              ? "border-red-500 bg-red-50 shadow-md ring-2 ring-red-200"
                              : "border-gray-200 hover:border-red-300 hover:bg-red-50/30 hover:shadow-sm"
                          }`}
                        >
                          <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                            <input
                              type="radio"
                              name={question.id}
                              value="no"
                              checked={responses[question.id] === "no"}
                              onChange={(e) =>
                                handleResponseChange(question.id, e.target.value, questionIndex)
                              }
                              className="w-5 h-5 text-red-600 border-2 border-gray-300 focus:ring-2 focus:ring-red-500 focus:ring-offset-1 cursor-pointer appearance-none rounded-full checked:border-red-600 checked:bg-white"
                            />
                            {responses[question.id] === "no" && (
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <span className={`text-sm font-semibold ${
                              responses[question.id] === "no" ? "text-red-700" : "text-foreground"
                            }`}>
                              No
                            </span>
                          </div>
                          {responses[question.id] === "no" && (
                            <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                          )}
                        </label>
                        
                        <label
                          className={`group flex items-center gap-3 p-3.5 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            responses[question.id] === "not_applicable"
                              ? "border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-200"
                              : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/30 hover:shadow-sm"
                          }`}
                        >
                          <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                            <input
                              type="radio"
                              name={question.id}
                              value="not_applicable"
                              checked={responses[question.id] === "not_applicable"}
                              onChange={(e) =>
                                handleResponseChange(question.id, e.target.value, questionIndex)
                              }
                              className="w-5 h-5 text-amber-600 border-2 border-gray-300 focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 cursor-pointer appearance-none rounded-full checked:border-amber-600 checked:bg-white"
                            />
                            {responses[question.id] === "not_applicable" && (
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <span className={`text-sm font-semibold ${
                              responses[question.id] === "not_applicable" ? "text-amber-700" : "text-foreground"
                            }`}>
                              Not Applicable
                            </span>
                          </div>
                          {responses[question.id] === "not_applicable" && (
                            <Check className="h-5 w-5 text-amber-600 flex-shrink-0" />
                          )}
                        </label>
                        
                        {/* Remark input for Not Applicable */}
                        {responses[question.id] === "not_applicable" && (
                          <div className="mt-3 p-4 rounded-lg border-2 border-amber-200 bg-amber-50/50 shadow-sm animate-in fade-in slide-in-from-top-2">
                            <label className="text-sm font-semibold text-amber-900 mb-2 block">
                              Reason for Not Applicable <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                              value={remarks[question.id] || ""}
                              onChange={(e) => handleRemarkChange(question.id, e.target.value)}
                              placeholder="Please provide a detailed reason why this requirement is not applicable to your organization..."
                              className="min-h-[100px] text-sm border-amber-300 focus:border-amber-500 focus:ring-amber-500 bg-white"
                              required
                            />
                            {!remarks[question.id]?.trim() && (
                              <p className="text-xs text-amber-700 mt-1.5">
                                This field is required when selecting "Not Applicable"
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Fixed Pagination Controls */}
            <div className="flex-shrink-0 flex items-center justify-between pt-2 border-t mt-2">
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

            {/* Fixed Submit Button */}
            <div className="flex-shrink-0 pt-2">
              <Button
                onClick={handleSubmit}
                className="w-full"
                size="default"
                disabled={!allAnswered}
              >
                {allAnswered ? "Submit Configuration" : `Complete all questions to submit`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // const renderReportTab = () => {
  //   const answeredCount = CONFIGURATION_QUESTIONS.filter(
  //     (q) => responses[q.id]
  //   ).length;

  //   return (
  //     <div className="space-y-6">
  //       <div className="bg-purple-50/80 border border-purple-200/60 rounded-xl p-6">
  //         <div className="flex items-start gap-3">
  //           <FileText className="h-5 w-5 text-purple-600 mt-0.5" />
  //           <div>
  //             <h3 className="text-lg font-semibold text-foreground mb-2">
  //               Configuration Responses Report
  //             </h3>
  //             <p className="text-sm text-muted-foreground">
  //               View all your configuration assessment responses and scores.
  //             </p>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Summary Card */}
  //       <Card>
  //         <CardHeader>
  //           <CardTitle>Assessment Summary</CardTitle>
  //         </CardHeader>
  //         <CardContent>
  //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  //             <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
  //               <p className="text-sm text-muted-foreground mb-1">
  //                 Questions Answered
  //               </p>
  //               <p className="text-2xl font-bold text-blue-600">
  //                 {answeredCount} / {CONFIGURATION_QUESTIONS.length}
  //               </p>
  //             </div>
  //             <div className="p-4 rounded-lg bg-green-50 border border-green-200">
  //               <p className="text-sm text-muted-foreground mb-1">Total Score</p>
  //               <p className="text-2xl font-bold text-green-600">
  //                 {totalScore} / {maxScore}
  //               </p>
  //             </div>
  //             <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
  //               <p className="text-sm text-muted-foreground mb-1">Percentage</p>
  //               <p className="text-2xl font-bold text-purple-600">
  //                 {percentage.toFixed(1)}%
  //               </p>
  //             </div>
  //           </div>
  //         </CardContent>
  //       </Card>

  //       {/* Detailed Responses */}
  //       <div className="space-y-4">
  //         <h3 className="text-lg font-semibold">Detailed Responses</h3>
  //         {CONFIGURATION_QUESTIONS.map((question) => {
  //           const response = responses[question.id];
  //           const selectedOption = question.options.find(
  //             (opt) => opt.value === response
  //           );

  //           return (
  //             <Card key={question.id}>
  //               <CardContent className="p-4">
  //                 <div className="flex items-start justify-between gap-4">
  //                   <div className="flex-1">
  //                     <p className="font-medium text-foreground mb-2">
  //                       {question.id}: {question.question}
  //                     </p>
  //                     {selectedOption ? (
  //                       <div className="flex items-center gap-2">
  //                         <Badge
  //                           variant="secondary"
  //                           className="bg-blue-100 text-blue-700 border-blue-200"
  //                         >
  //                           {selectedOption.label}
  //                         </Badge>
  //                         <span className="text-xs text-muted-foreground">
  //                           Score: {selectedOption.score}/3
  //                         </span>
  //                       </div>
  //                     ) : (
  //                       <Badge variant="outline" className="text-muted-foreground">
  //                         Not Answered
  //                       </Badge>
  //                     )}
  //                   </div>
  //                 </div>
  //               </CardContent>
  //             </Card>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem-3rem)] min-h-0">
      {/* Fixed Header */}
      <div className="flex-shrink-0 pb-2">
        <PageHeader
          title={cockpitData.moduleName}
          subtitle={`Configuration Assessment - ${cockpitData.moduleLabel}`}
          backTo={`/phase-i/catalog/${
            blueprintId || "sap-s4hana"
          }/modules/${moduleId}`}
          backLabel="Back to Configuration Selection"
        />
      </div>

      {/* Configuration Content - Fixed Layout */}
      <div className="flex-1 flex flex-col min-h-0">
        {renderConfigurationTab()}
      </div>
    </div>
  );
}
