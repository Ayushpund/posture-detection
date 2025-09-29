import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const settingsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.coerce.number().min(1, 'Age is required').max(120),
  occupation: z.string().min(1, 'Occupation is required'),
  postureGoals: z.string().min(1, 'Posture goals are required').max(500),

  wifiSsid: z.string().optional(),
  wifiPassword: z.string().optional(),

  pitchAngleThreshold: z.coerce.number().min(-90).max(90),
  flexSensorThreshold: z.coerce.number().min(0).max(1023),

  vibrationEnabled: z.boolean(),
});
