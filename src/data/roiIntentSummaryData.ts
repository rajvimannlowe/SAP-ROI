import { Target, CheckCircle, Zap, LucideIcon } from "lucide-react";

export interface ROIIntentSummaryCard {
    id: string;
    title: string;
    value: string;
    subtitle: string;
    icon: LucideIcon;
    color: string;
    backgroundColor: string;
}

export const getROIIntentSummaryCards = (intentLabel: string): ROIIntentSummaryCard[] => {
    // Base template for all intents
    const baseCards: ROIIntentSummaryCard[] = [
        {
            id: "total-kpis",
            title: "TOTAL KPIS",
            value: "8",
            subtitle: "Contributing to this ROI intent",
            icon: Target,
            color: "#3B82F6",
            backgroundColor: "#EBF4FF"
        },
        {
            id: "overall-status",
            title: "OVERALL STATUS",
            value: "Strong",
            subtitle: "75% Active, 25% Planned",
            icon: CheckCircle,
            color: "#10B981",
            backgroundColor: "#ECFDF5"
        },
        {
            id: "value-focus",
            title: "VALUE FOCUS",
            value: "Cash & Efficiency",
            subtitle: "Primary business outcomes",
            icon: Zap,
            color: "#8B5CF6",
            backgroundColor: "#F3F4F6"
        }
    ];

    // Customize based on intent
    switch (intentLabel) {
        case "Accelerate Cash Flow":
            return [
                {
                    ...baseCards[0],
                    value: "12",
                    subtitle: "Cash flow optimization KPIs"
                },
                {
                    ...baseCards[1],
                    value: "Excellent",
                    subtitle: "85% Active, 15% Planned"
                },
                {
                    ...baseCards[2],
                    value: "Cash Velocity",
                    subtitle: "Faster payment cycles"
                }
            ];

        case "Reduce Manual Effort":
            return [
                {
                    ...baseCards[0],
                    value: "15",
                    subtitle: "Automation & efficiency KPIs"
                },
                {
                    ...baseCards[1],
                    value: "Good",
                    subtitle: "70% Active, 30% Planned"
                },
                {
                    ...baseCards[2],
                    value: "Process Automation",
                    subtitle: "Reduced manual tasks"
                }
            ];

        case "Improve Compliance":
            return [
                {
                    ...baseCards[0],
                    value: "10",
                    subtitle: "Compliance & control KPIs"
                },
                {
                    ...baseCards[1],
                    value: "Strong",
                    subtitle: "80% Active, 20% Planned"
                },
                {
                    ...baseCards[2],
                    value: "Risk Mitigation",
                    subtitle: "Enhanced compliance controls"
                }
            ];

        case "Enhance Decision Making":
            return [
                {
                    ...baseCards[0],
                    value: "9",
                    subtitle: "Analytics & insights KPIs"
                },
                {
                    ...baseCards[1],
                    value: "Moderate",
                    subtitle: "60% Active, 40% Planned"
                },
                {
                    ...baseCards[2],
                    value: "Data Intelligence",
                    subtitle: "Better decision insights"
                }
            ];

        default:
            return baseCards;
    }
};
