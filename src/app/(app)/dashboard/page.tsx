import PostureStatus from '@/components/dashboard/posture-status';
import SensorData from '@/components/dashboard/sensor-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time monitoring of your posture.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PostureStatus />
        </div>
        <div className="space-y-6">
          <SensorData sensorType="pitch" />
          <SensorData sensorType="flex" />
        </div>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <CardTitle>Quick Tip</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Remember to take a short break and stretch every 30 minutes to
            prevent muscle strain. Your back will thank you!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
