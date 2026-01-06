import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { IconBadge } from "@/components/roi/IconBadge";
import { feedbackLoopSteps, additionalMetrics } from "@/data/roiAggregationData";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getGradient = (color: string) =>
  `linear-gradient(135deg, ${color} 0%, ${hexToRgba(color, 0.8)} 100%)`;

const FeedbackLoopTab = () => {
  const getStepStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#10B981";
      case "in_progress":
        return "#F59E0B";
      case "pending":
        return "#6B7280";
      default:
        return "#6B7280";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-2">
          ROI Feedback Loop Visualization
        </h2>
        <p className="text-muted-foreground">
          Continuous improvement cycle for maximizing ROI through systematic
          feedback
        </p>
      </div>

      {/* Feedback Loop Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {feedbackLoopSteps.map((step, index) => {
          const StepIcon = step.icon;
          const isLast = index === feedbackLoopSteps.length - 1;

          return (
            <div key={step.id} className="relative">
              <Card
                style={{
                  borderColor: hexToRgba(step.color, 0.3),
                  backgroundColor: hexToRgba(step.color, 0.02),
                }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 flex-1">
                      <IconBadge
                        gradient={getGradient(step.color)}
                        icon={StepIcon}
                      />
                      <div className="flex-1">
                        <CardTitle className="text-base">{step.title}</CardTitle>
                        <CardDescription>{step.description}</CardDescription>
                      </div>
                    </div>
                    <span
                      className="px-2 py-1 rounded text-xs font-semibold text-white"
                      style={{ backgroundColor: getStepStatusColor(step.status) }}
                    >
                      {step.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Status Indicator */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Progress
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: step.color }}
                        ></div>
                        <span className="text-sm font-medium capitalize">
                          {step.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          backgroundColor: step.color,
                          width:
                            step.status === "completed"
                              ? "100%"
                              : step.status === "in_progress"
                              ? "60%"
                              : "20%",
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Arrow connector (except for last item) */}
              {!isLast && (
                <div className="hidden xl:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Continuous Feedback Loop Indicator */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-4 p-4 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
          <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-sm font-medium text-blue-700">
            Continuous Feedback Loop Active
          </span>
          <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {additionalMetrics.map((metric, index) => {
          const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;

          return (
            <Card
              key={index}
              style={{
                borderColor: hexToRgba(metric.color, 0.3),
                backgroundColor: hexToRgba(metric.color, 0.02),
              }}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 flex-1">
                    <IconBadge
                      gradient={getGradient(metric.color)}
                      icon={TrendIcon}
                    />
                    <div className="flex-1">
                      <CardTitle className="text-lg">{metric.value}</CardTitle>
                      <CardDescription>{metric.title}</CardDescription>
                    </div>
                  </div>
                  <span
                    className="px-2 py-1 rounded text-xs font-semibold text-white"
                    style={{ backgroundColor: metric.color }}
                  >
                    {metric.change}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    {metric.description}
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: metric.color }}
                    ></div>
                    <span className="text-xs font-medium">
                      {metric.trend === "up" ? "Improving" : "Declining"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Implementation Status */}
      <Card
        className="mt-8"
        style={{
          borderColor: hexToRgba("#4160F0", 0.3),
          backgroundColor: hexToRgba("#4160F0", 0.02),
        }}
      >
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <IconBadge gradient={getGradient("#4160F0")} icon={TrendingUp} />
            <div>
              <CardTitle>Implementation Status</CardTitle>
              <CardDescription>
                Current state of ROI feedback loop implementation
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Active Components</h4>
              <div className="space-y-2">
                {feedbackLoopSteps
                  .filter((step) => step.status === "completed")
                  .map((step) => (
                    <div key={step.id} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm">{step.title}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">In Development</h4>
              <div className="space-y-2">
                {feedbackLoopSteps
                  .filter((step) => step.status !== "completed")
                  .map((step) => (
                    <div key={step.id} className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          step.status === "in_progress"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                        }`}
                      ></div>
                      <span className="text-sm">{step.title}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackLoopTab;

