'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { settingsSchema } from '@/lib/schemas';
import { saveThresholdSettings } from '@/ai/flows/threshold-setting-saver';
import { generatePostureTips } from '@/ai/flows/personalized-posture-tips';
import { generateExerciseVideo } from '@/ai/flows/exercise-video-generator';

export async function login(formData: FormData) {
  redirect('/dashboard');
}

export async function saveSettings(data: z.infer<typeof settingsSchema>) {
  // Save user profile data (e.g., to Firestore)
  console.log('Saving profile data:', {
    name: data.name,
    age: data.age,
    occupation: data.occupation,
    postureGoals: data.postureGoals,
  });

  // Save Wi-Fi credentials (e.g., to device via Firebase)
  console.log('Saving Wi-Fi credentials:', {
    ssid: data.wifiSsid,
  });

  try {
    const result = await saveThresholdSettings({
      pitchAngleThreshold: data.pitchAngleThreshold,
      flexSensorThreshold: data.flexSensorThreshold,
      vibrationEnabled: data.vibrationEnabled,
    });
    return { success: true, message: result.message };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to save settings via AI: ${errorMessage}` };
  }
}

export async function getPersonalizedPostureTips() {
  try {
    const postureData = JSON.stringify([
      { timestamp: '2023-10-27T10:00:00Z', pitch: -15, flex: 300 },
      { timestamp: '2023-10-27T10:01:00Z', pitch: 5, flex: 250 },
      { timestamp: '2023-10-27T10:02:00Z', pitch: -20, flex: 310 },
      { timestamp: '2023-10-27T11:30:00Z', pitch: -18, flex: 305 },
      { timestamp: '2023-10-27T11:31:00Z', pitch: -25, flex: 320 },
      { timestamp: '2023-10-27T14:05:00Z', pitch: 2, flex: 240 },
    ]);
    const userProfile = JSON.stringify({
      name: 'Alex Doe',
      age: 30,
      occupation: 'Software Developer',
      postureGoals: 'Reduce neck pain and improve focus during work.',
    });

    const result = await generatePostureTips({ postureData, userProfile });
    return { success: true, tips: result.tips };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to generate tips: ${errorMessage}` };
  }
}

export async function getExerciseVideo(exercise: string, focusArea: string) {
    try {
        const result = await generateExerciseVideo({exercise, focusArea});
        return { success: true, videoUrl: result.videoUrl };
    } catch (error) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, error: `Failed to generate video: ${errorMessage}` };
    }
}
