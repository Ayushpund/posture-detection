'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, ArrowRightFromLine } from 'lucide-react';

type SensorType = 'pitch' | 'flex';

interface SensorDataProps {
  sensorType: SensorType;
}

const config = {
  pitch: {
    title: 'Pitch Angle',
    icon: TrendingUp,
    unit: '°',
    min: -25,
    max: 10,
    goodThreshold: 5,
  },
  flex: {
    title: 'Flex Sensor',
    icon: ArrowRightFromLine,
    unit: '',
    min: 200,
    max: 400,
    goodThreshold: 280,
  },
};

export default function SensorData({ sensorType }: SensorDataProps) {
  const { title, icon: Icon, unit, min, max, goodThreshold } = config[sensorType];
  const [value, setValue] = useState(min);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
      setValue(randomValue);
    }, 2000); // Updates every 2 seconds

    return () => clearInterval(interval);
  }, [min, max]);

  const isGood = sensorType === 'pitch' ? value >= -goodThreshold && value <= goodThreshold : value <= goodThreshold;
  const color = isGood ? 'text-green-500' : 'text-red-500';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${color}`}>
          {value}
          {unit}
        </div>
        <p className="text-xs text-muted-foreground">
          Live data from sensor
        </p>
      </CardContent>
    </Card>
  );
}
