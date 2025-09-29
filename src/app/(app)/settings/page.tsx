import SettingsForm from '@/components/settings/settings-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile, device, and alert preferences.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>
            Update your settings below. The new threshold settings will be sent to your device.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm />
        </CardContent>
      </Card>
    </div>
  );
}
