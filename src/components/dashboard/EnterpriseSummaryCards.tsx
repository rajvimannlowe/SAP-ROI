import { Shield, AlertTriangle, Clock, CheckCircle, TrendingUp, Database } from 'lucide-react';
import { SummaryCards, SummaryCard } from './SummaryCards';

interface EnterpriseSummaryCardsProps {
  totalItems: number;
  highRisk: number;
  needsReview: number;
  comfortable: number;
  highSeverity: number;
  totalModules: number;
}

export function EnterpriseSummaryCards({
  totalItems,
  highRisk,
  needsReview,
  comfortable,
  highSeverity,
  totalModules,
}: EnterpriseSummaryCardsProps) {
  const cards: SummaryCard[] = [
    {
      title: 'Total DD Items',
      value: totalItems,
      icon: Shield,
      color: '#4160F0',
    },
    {
      title: 'High Risk Items',
      value: highRisk,
      icon: AlertTriangle,
      color: '#DC2626',
    },
    {
      title: 'Needs Review',
      value: needsReview,
      icon: Clock,
      color: '#FF6700',
    },
    {
      title: 'Comfortable',
      value: comfortable,
      icon: CheckCircle,
      color: '#16A34A',
    },
    {
      title: 'High Severity',
      value: highSeverity,
      icon: TrendingUp,
      color: '#F59E0B',
    },
    {
      title: 'SAP Modules',
      value: totalModules,
      icon: Database,
      color: '#9333EA',
    },
  ];

  return <SummaryCards cards={cards} columns={6} />;
}
