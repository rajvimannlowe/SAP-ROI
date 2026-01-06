import { feedbackLoopSteps } from "@/data/roiAggregationData";
import {
  ArrowRight,
  ArrowDown,
  Activity,
  CheckCircle2,
  Target,
  TrendingUp as TrendingUpIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const FeedbackLoopTab = () => {
  // Step configuration with proper colors and icons
  const steps = [
    {
      ...feedbackLoopSteps[0],
      number: 1,
      color: "#2563eb",
      icon: Activity,
      description: "Continuous tracking of 16 financial controls KPIs",
    },
    {
      ...feedbackLoopSteps[1],
      number: 2,
      color: "#6366f1",
      icon: CheckCircle2,
      description: "Automated evidence collection and exception analysis",
    },
    {
      ...feedbackLoopSteps[2],
      number: 3,
      color: "#10b981",
      icon: Target,
      description: "10 remediation actions with clear ownership",
    },
    {
      id: "improvement",
      title: "4. Improvement",
      status: "pending" as const,
      number: 4,
      color: "#9333ea",
      icon: TrendingUpIcon,
      description: "Process enhancements and control optimization",
    },
    {
      id: "roi-outcome",
      title: "5. ROI Outcome",
      status: "completed" as const,
      number: 5,
      color: "#14b8a6",
      icon: TrendingUpIcon,
      description: "$18.4M value protected, 96.0% health",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-foreground">
          ROI Feedback Loop
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Continuous improvement cycle from monitoring to value realization
        </p>
      </div>

      {/* Desktop Cycle Flow - All Steps in One Line */}
      <div className="hidden lg:block">
        <div className="relative max-w-7xl mx-auto">
          {/* Single Row: All Steps 1, 2, 3, 4, 5 */}
          <div className="flex items-start justify-center gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;

              return (
                <div key={step.id} className="relative">
                  {/* Step Card */}
                  <div className="relative w-56">
                    {/* Number Badge */}
                    <div
                      className="absolute -top-4 -left-4 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-white z-20"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.number}
                    </div>

                    {/* Card Content */}
                    <Card className="p-5 pt-8 border-2 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group relative">
                      {/* Animated Gradient Background */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${hexToRgba(
                            step.color,
                            0.12
                          )} 0%, transparent 50%, ${hexToRgba(
                            step.color,
                            0.05
                          )} 100%)`,
                        }}
                      />

                      {/* Decorative Corner Accent - Top Right */}
                      <div
                        className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-15 group-hover:opacity-20 transition-opacity duration-300"
                        style={{ backgroundColor: step.color }}
                      />

                      {/* Decorative Corner Accent - Bottom Left */}
                      <div
                        className="absolute bottom-0 left-0 w-16 h-16 rounded-tr-full opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                        style={{ backgroundColor: step.color }}
                      />

                      {/* Subtle Border Glow on Hover */}
                      <div
                        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          boxShadow: `inset 0 0 0 1px ${hexToRgba(
                            step.color,
                            0.2
                          )}`,
                        }}
                      />

                      <div className="relative z-10">
                        {/* Icon Section with Enhanced Design */}
                        <div className="mb-3">
                          <div
                            className="inline-flex p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                            style={{
                              background: `linear-gradient(135deg, ${hexToRgba(
                                step.color,
                                0.15
                              )}, ${hexToRgba(step.color, 0.08)})`,
                              border: `2px solid ${hexToRgba(
                                step.color,
                                0.25
                              )}`,
                            }}
                          >
                            <Icon
                              className="w-6 h-6"
                              style={{ color: step.color }}
                            />
                          </div>
                        </div>

                        {/* Title and Description */}
                        <div className="space-y-2">
                          <h3
                            className="font-bold text-base text-foreground group-hover:scale-105 transition-transform duration-300 inline-block"
                            style={{ color: step.color }}
                          >
                            {step.title.split(". ")[1] || step.title}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Horizontal Arrow Between Steps */}
                  {idx < steps.length - 1 && (
                    <div className="absolute top-1/2 -right-10 z-10">
                      <div className="flex items-center">
                        <div
                          className="h-0.5 w-8"
                          style={{ backgroundColor: step.color }}
                        />
                        <ArrowRight
                          className="w-5 h-5"
                          style={{ color: step.color }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet: Vertical Flow */}
      <div className="lg:hidden space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="relative">
              {/* Step Card */}
              <div className="relative">
                {/* Number Badge */}
                <div
                  className="absolute -top-4 -left-4 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-white z-20"
                  style={{ backgroundColor: step.color }}
                >
                  {step.number}
                </div>

                {/* Card Content */}
                <Card className="p-5 pt-8 border-2 shadow-xl overflow-hidden group relative">
                  {/* Animated Gradient Background */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${hexToRgba(
                        step.color,
                        0.12
                      )} 0%, transparent 50%, ${hexToRgba(
                        step.color,
                        0.05
                      )} 100%)`,
                    }}
                  />

                  {/* Decorative Corner Accent - Top Right */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-15 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ backgroundColor: step.color }}
                  />

                  {/* Decorative Corner Accent - Bottom Left */}
                  <div
                    className="absolute bottom-0 left-0 w-16 h-16 rounded-tr-full opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ backgroundColor: step.color }}
                  />

                  {/* Subtle Border Glow on Hover */}
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${hexToRgba(
                        step.color,
                        0.2
                      )}`,
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon Section with Enhanced Design */}
                    <div className="mb-3">
                      <div
                        className="inline-flex p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${hexToRgba(
                            step.color,
                            0.15
                          )}, ${hexToRgba(step.color, 0.08)})`,
                          border: `2px solid ${hexToRgba(step.color, 0.25)}`,
                        }}
                      >
                        <Icon
                          className="w-6 h-6"
                          style={{ color: step.color }}
                        />
                      </div>
                    </div>

                    {/* Title and Description */}
                    <div className="space-y-2">
                      <h3
                        className="font-bold text-base text-foreground group-hover:scale-105 transition-transform duration-300 inline-block"
                        style={{ color: step.color }}
                      >
                        {step.title.split(". ")[1] || step.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Arrow Connector */}
              {!isLast && (
                <div className="flex justify-center my-3">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-0.5 h-6"
                      style={{ backgroundColor: step.color }}
                    />
                    <ArrowDown
                      className="w-5 h-5"
                      style={{ color: step.color }}
                    />
                  </div>
                </div>
              )}

              {/* Cycle Indicator */}
              {isLast && (
                <div className="flex justify-center mt-4">
                  <div className="px-4 py-2 rounded-full bg-blue-50 border border-blue-200/50 shadow-sm">
                    <span className="text-xs font-medium text-blue-700">
                      Continuous feedback loop
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Message */}
      <div className="text-center pt-4 border-t border-border/50">
        <p className="text-sm text-muted-foreground">
          Continuous feedback loop driving sustained performance and value
          realization
        </p>
      </div>
    </div>
  );
};

export default FeedbackLoopTab;
