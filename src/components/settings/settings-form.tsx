'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { settingsSchema } from '@/lib/schemas';
import { saveSettings } from '@/lib/actions';
import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';

export default function SettingsForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: 'Alex Doe',
      age: 30,
      occupation: 'Software Developer',
      postureGoals: 'Reduce neck pain and improve focus during work.',
      wifiSsid: 'MyHomeNetwork',
      wifiPassword: '',
      pitchAngleThreshold: -10,
      flexSensorThreshold: 300,
      vibrationEnabled: true,
    },
  });

  function onSubmit(values: z.infer<typeof settingsSchema>) {
    startTransition(async () => {
      const result = await saveSettings(values);
      if (result.success) {
        toast({
          title: 'Settings Saved',
          description: result.message,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">User Profile</h3>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occupation</FormLabel>
                <FormControl>
                  <Input placeholder="Software Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <FormField
            control={form.control}
            name="postureGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Posture Goals</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your posture goals..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Device Wi-Fi Credentials</h3>
           <div className="grid grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="wifiSsid"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Wi-Fi Name (SSID)</FormLabel>
                    <FormControl>
                    <Input placeholder="Your Wi-Fi network" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="wifiPassword"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Wi-Fi Password</FormLabel>
                    <FormControl>
                    <Input type="password" placeholder="Leave blank to keep unchanged" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
          </div>
        </div>

        <Separator />
        
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Thresholds & Alerts</h3>
          <FormField
            control={form.control}
            name="pitchAngleThreshold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pitch Angle Threshold: {field.value}°</FormLabel>
                <FormControl>
                  <Slider
                    min={-30}
                    max={0}
                    step={1}
                    onValueChange={(value) => field.onChange(value[0])}
                    value={[field.value]}
                  />
                </FormControl>
                <FormDescription>
                  The forward head tilt angle that triggers a bad posture alert.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="flexSensorThreshold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Flex Sensor Threshold: {field.value}</FormLabel>
                <FormControl>
                  <Slider
                    min={250}
                    max={500}
                    step={5}
                    onValueChange={(value) => field.onChange(value[0])}
                    value={[field.value]}
                  />
                </FormControl>
                 <FormDescription>
                  The back slouch value that triggers a bad posture alert.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="vibrationEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Vibration/Buzzer Alerts</FormLabel>
                  <FormDescription>
                    Enable haptic feedback on your device for bad posture.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? 'Saving...' : 'Save Settings'}
        </Button>
      </form>
    </Form>
  );
}
