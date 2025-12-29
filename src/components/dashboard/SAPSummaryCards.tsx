import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Database, FileText, AlertTriangle, CheckCircle, TrendingUp, Layers } from 'lucide-react';

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
  const cards = [
    {
      title: 'Total DD Items',
      value: totalItems,
      icon: Database,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'SAP Modules',
      value: totalModules,
      icon: Layers,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Sub-Modules',
      value: totalSubModules,
      icon: FileText,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'High Risk',
      value: highRisk,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Needs Review',
      value: needsReview,
      icon: TrendingUp,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Comfortable',
      value: comfortable,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
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

