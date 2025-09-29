'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';

const chartData = {
  daily: [
    { hour: '12am', good: 15, bad: 5 },
    { hour: '3am', good: 18, bad: 2 },
    { hour: '6am', good: 20, bad: 0 },
    { hour: '9am', good: 45, bad: 15 },
    { hour: '12pm', good: 30, bad: 30 },
    { hour: '3pm', good: 40, bad: 20 },
    { hour: '6pm', good: 55, bad: 5 },
    { hour: '9pm', good: 50, bad: 10 },
  ],
  weekly: [
    { day: 'Mon', good: 380, bad: 100 },
    { day: 'Tue', good: 420, bad: 60 },
    { day: 'Wed', good: 350, bad: 130 },
    { day: 'Thu', good: 450, bad: 30 },
    { day: 'Fri', good: 320, bad: 160 },
    { day: 'Sat', good: 500, bad: 80 },
    { day: 'Sun', good: 550, bad: 30 },
  ],
  monthly: [
    { week: 'Week 1', good: 2000, bad: 500 },
    { week: 'Week 2', good: 2200, bad: 300 },
    { week: 'Week 3', good: 2100, bad: 400 },
    { week: 'Week 4', good: 2500, bad: 200 },
  ],
};

const chartConfig = {
  good: {
    label: 'Good Posture',
    color: 'hsl(var(--chart-2))',
  },
  bad: {
    label: 'Bad Posture',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

type PostureChartProps = {
  timeRange: 'daily' | 'weekly' | 'monthly';
};

export default function PostureChart({ timeRange }: PostureChartProps) {
  const data = chartData[timeRange];
  const dataKey =
    timeRange === 'daily'
      ? 'hour'
      : timeRange === 'weekly'
      ? 'day'
      : 'week';

  return (
    <Card>
      <CardHeader>
        <CardTitle>{timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} Posture Breakdown</CardTitle>
        <CardDescription>Time in minutes</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={dataKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="good" fill="var(--color-good)" radius={4} />
            <Bar dataKey="bad" fill="var(--color-bad)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
