import { Database, FileText, AlertTriangle, CheckCircle, TrendingUp, Layers } from 'lucide-react';
import { SummaryCards, SummaryCard } from './SummaryCards';

interface SAPSummaryCardsProps {
  totalItems: number;
  totalModules: number;
  totalSubModules: number;
  highRisk: number;
  needsReview: number;
  comfortable: number;
}

export function SAPSummaryCards({
  totalItems,
  totalModules,
  totalSubModules,
  highRisk,
  needsReview,
  comfortable,
}: SAPSummaryCardsProps) {
  const cards: SummaryCard[] = [
    {
      title: 'Total DD Items',
      value: totalItems,
      icon: Database,
      color: '#4160F0',
    },
    {
      title: 'SAP Modules',
      value: totalModules,
      icon: Layers,
      color: '#9333EA',
    },
    {
      title: 'Sub-Modules',
      value: totalSubModules,
      icon: FileText,
      color: '#6366F1',
    },
    {
      title: 'High Risk',
      value: highRisk,
      icon: AlertTriangle,
      color: '#DC2626',
    },
    {
      title: 'Needs Review',
      value: needsReview,
      icon: TrendingUp,
      color: '#FF6700',
    },
    {
      title: 'Comfortable',
      value: comfortable,
      icon: CheckCircle,
      color: '#16A34A',
    },
  ];

  return <SummaryCards cards={cards} columns={6} />;
}
