import { EnhancedCard } from "@/components/ui/enhanced-card";
import { feedbackLoopSteps, additionalMetrics } from "@/data/roiAggregationData";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";

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
        <h2 className="text-xl font-bold text-foreground mb-2">ROI Feedback Loop Visualization</h2>
        <p className="text-muted-foreground">
          Continuous improvement cycle for maximizing ROI through systematic feedback
        </p>
      </div>

      {/* Feedback Loop Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {feedbackLoopSteps.map((step, index) => {
          const StepIcon = step.icon;
          const isLast = index === feedbackLoopSteps.length - 1;
          
          return (
            <div key={step.id} className="relative">
              <EnhancedCard
                title={step.title}
                subtitle={step.description}
                icon={StepIcon}
                accentColor={step.color}
                badge={{
                  label: step.status.replace('_', ' ').toUpperCase(),
                  color: getStepStatusColor(step.status)
                }}
              >
                <div className="space-y-3">
                  {/* Status Indicator */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: step.color }}
                      ></div>
                      <span className="text-sm font-medium capitalize">
                        {step.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        backgroundColor: step.color,
                        width: step.status === 'completed' ? '100%' : 
                               step.status === 'in_progress' ? '60%' : '20%'
                      }}
                    ></div>
                  </div>
                </div>
              </EnhancedCard>

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
          <span className="text-sm font-medium text-blue-700">Continuous Feedback Loop Active</span>
          <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {additionalMetrics.map((metric, index) => {
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <EnhancedCard
              key={index}
              title={metric.value}
              subtitle={metric.title}
              icon={TrendIcon}
              accentColor={metric.color}
              badge={{
                label: metric.change,
                icon: TrendIcon,
                color: metric.color
              }}
            >
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
                    {metric.trend === 'up' ? 'Improving' : 'Declining'}
                  </span>
                </div>
              </div>
            </EnhancedCard>
          );
        })}
      </div>

      {/* Implementation Status */}
      <EnhancedCard
        title="Implementation Status"
        subtitle="Current state of ROI feedback loop implementation"
        icon={TrendingUp}
        accentColor="#4160F0"
        className="mt-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Active Components</h4>
            <div className="space-y-2">
              {feedbackLoopSteps.filter(step => step.status === 'completed').map(step => (
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
              {feedbackLoopSteps.filter(step => step.status !== 'completed').map(step => (
                <div key={step.id} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${step.status === 'in_progress' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
                  <span className="text-sm">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </EnhancedCard>
    </div>
  );
};

export default FeedbackLoopTab;
