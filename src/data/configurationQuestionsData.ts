export interface ConfigurationQuestion {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    score: number; // Score for threshold calculation
  }[];
}

export const CONFIGURATION_QUESTIONS: ConfigurationQuestion[] = [
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

