'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

type PostureState = 'Good' | 'Bad';

export default function PostureStatus() {
  const [status, setStatus] = useState<PostureState>('Good');

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prevStatus) => (prevStatus === 'Good' ? 'Bad' : 'Good'));
    }, 5000); // Toggles every 5 seconds for demonstration

    return () => clearInterval(interval);
  }, []);

  const isGoodPosture = status === 'Good';

  return (
    <Card
      className={cn(
        'flex h-full min-h-[280px] flex-col items-center justify-center transition-colors duration-500',
        isGoodPosture ? 'bg-green-500/20' : 'bg-red-500/20'
      )}
    >
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        {isGoodPosture ? (
          <CheckCircle2 className="h-24 w-24 text-green-500" />
        ) : (
          <AlertTriangle className="h-24 w-24 text-red-500" />
        )}
        <p
          className={cn(
            'mt-4 text-4xl font-bold',
            isGoodPosture ? 'text-green-400' : 'text-red-400'
          )}
        >
          {status} Posture
        </p>
        <p className="mt-2 text-muted-foreground">
          {isGoodPosture
            ? 'Keep it up! Your posture is great.'
            : 'Warning: Adjust your posture immediately.'}
        </p>
      </CardContent>
    </Card>
  );
}
