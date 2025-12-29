import { Shield, AlertTriangle, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { SummaryCards, SummaryCard } from '../dashboard/SummaryCards';
import { DDDashboardSummary } from '../../types';

interface DashboardCardsProps {
  summary: DDDashboardSummary;
}

export function DashboardCards({ summary }: DashboardCardsProps) {
  const cards: SummaryCard[] = [
    {
      title: 'Total Items',
      value: summary.totalItems,
      icon: Shield,
      color: '#4160F0',
    },
    {
      title: 'High Risk',
      value: summary.highRisk,
      icon: AlertTriangle,
      color: '#DC2626',
    },
    {
      title: 'Needs Review',
      value: summary.needsReview,
      icon: Clock,
      color: '#FF6700',
    },
    {
      title: 'Comfortable',
      value: summary.comfortable,
      icon: CheckCircle,
      color: '#16A34A',
    },
    {
      title: 'High Severity',
      value: summary.highSeverity,
      icon: TrendingUp,
      color: '#F59E0B',
    },
  ];

  return <SummaryCards cards={cards} columns={5} />;
}
