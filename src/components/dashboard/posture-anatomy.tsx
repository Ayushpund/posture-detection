// src/components/dashboard/posture-anatomy.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

const pitchConfig = {
    goodThreshold: 5,
    min: -25,
    max: 10,
};

const flexConfig = {
    goodThreshold: 280,
    min: 200,
    max: 400,
};

export default function PostureAnatomy() {
  const [pitchValue, setPitchValue] = useState(pitchConfig.min);
  const [flexValue, setFlexValue] = useState(flexConfig.min);

  useEffect(() => {
    const pitchInterval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * (pitchConfig.max - pitchConfig.min + 1)) + pitchConfig.min;
      setPitchValue(randomValue);
    }, 2000);

    const flexInterval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * (flexConfig.max - flexConfig.min + 1)) + flexConfig.min;
      setFlexValue(randomValue);
    }, 2000);

    return () => {
      clearInterval(pitchInterval);
      clearInterval(flexInterval);
    };
  }, []);

  const isNeckGood = pitchValue >= -pitchConfig.goodThreshold && pitchValue <= pitchConfig.goodThreshold;
  const isBackGood = flexValue <= flexConfig.goodThreshold;
  const isGoodPosture = isNeckGood && isBackGood;

  const neckColor = isNeckGood ? 'fill-green-500' : 'fill-red-500';
  const backColor = isBackGood ? 'fill-green-500' : 'fill-red-500';

  return (
    <Card className="flex h-full flex-col items-center justify-center">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 400"
          className="h-full max-h-[280px] w-auto"
        >
          {/* Head */}
          <circle cx="100" cy="50" r="30" className={cn("transition-colors", neckColor)} />
          {/* Neck */}
          <rect x="90" y="80" width="20" height="20" className={cn("transition-colors", neckColor)} />
          {/* Body */}
          <path d="M 70 100 L 70 250 L 130 250 L 130 100 C 130 100 110 90 100 90 C 90 90 70 100 70 100 Z" className={cn("transition-colors", backColor)} />
          {/* Arms */}
          <path d="M 70 110 L 50 220 L 60 220 L 80 110 Z" className="fill-muted-foreground" />
          <path d="M 130 110 L 150 220 L 140 220 L 120 110 Z" className="fill-muted-foreground" />
          {/* Legs */}
          <rect x="70" y="250" width="25" height="100" className="fill-muted-foreground" />
          <rect x="105" y="250" width="25" height="100" className="fill-muted-foreground" />
        </svg>

        <div className="mt-4">
            {isGoodPosture ? (
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                    <p className="text-xl font-bold text-green-400">Good Posture</p>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                    <p className="text-xl font-bold text-red-400">Adjust Posture</p>
                </div>
            )}
             <p className="mt-1 text-xs text-muted-foreground">
                {isGoodPosture ? "Keep it up!" : "Check highlighted areas."}
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
