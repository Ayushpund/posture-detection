import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smile, Frown, AlertCircle } from 'lucide-react';

export default function PostureSummary() {
  const stats = [
    {
      title: 'Good Posture',
      value: '82%',
      icon: Smile,
      color: 'text-green-500',
    },
    {
      title: 'Bad Posture',
      value: '18%',
      icon: Frown,
      color: 'text-red-500',
    },
    {
      title: 'Times Slouched Today',
      value: '7',
      icon: AlertCircle,
      color: 'text-yellow-500',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              Based on today's data
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
