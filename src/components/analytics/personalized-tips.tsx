'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getPersonalizedPostureTips } from '@/lib/actions';
import { Wand2, Loader2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function PersonalizedTips() {
  const [isPending, startTransition] = useTransition();
  const [tips, setTips] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetTips = () => {
    startTransition(async () => {
      setError(null);
      setTips(null);
      const result = await getPersonalizedPostureTips();
      if (result.success) {
        setTips(result.tips);
      } else {
        setError(result.error || 'An unexpected error occurred.');
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Personalized Feedback</CardTitle>
        <CardDescription>
          Generate personalized tips based on your posture data.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleGetTips} disabled={isPending}>
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          {isPending ? 'Generating...' : 'Get My Tips'}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {tips && (
          <Alert>
            <Wand2 className="h-4 w-4" />
            <AlertTitle>Your Personalized Tips</AlertTitle>
            <AlertDescription>
              <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: tips.replace(/\n/g, '<br />') }} />
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
