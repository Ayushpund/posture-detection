import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostureChart from '@/components/analytics/posture-chart';
import PostureSummary from '@/components/analytics/posture-summary';
import PersonalizedTips from '@/components/analytics/personalized-tips';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Review your posture history and get insights.
        </p>
      </div>
      <PostureSummary />
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          <PostureChart timeRange="daily" />
        </TabsContent>
        <TabsContent value="weekly">
          <PostureChart timeRange="weekly" />
        </TabsContent>
        <TabsContent value="monthly">
          <PostureChart timeRange="monthly" />
        </TabsContent>
      </Tabs>
      <PersonalizedTips />
    </div>
  );
}
