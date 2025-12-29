import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { DDDashboardSummary } from '../../types';
import { AlertTriangle, CheckCircle, Clock, TrendingUp, Shield } from 'lucide-react';

interface DashboardCardsProps {
  summary: DDDashboardSummary;
}

export function DashboardCards({ summary }: DashboardCardsProps) {
  const cards = [
    {
      title: 'Total Items',
      value: summary.totalItems,
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'High Risk',
      value: summary.highRisk,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Needs Review',
      value: summary.needsReview,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Comfortable',
      value: summary.comfortable,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'High Severity',
      value: summary.highSeverity,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`p-2 rounded-md ${card.bgColor}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

