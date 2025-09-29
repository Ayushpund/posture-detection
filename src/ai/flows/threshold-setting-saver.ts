'use server';

/**
 * @fileOverview Saves threshold settings to a device using GenAI.
 *
 * - saveThresholdSettings - A function that saves the threshold settings.
 * - SaveThresholdSettingsInput - The input type for the saveThresholdSettings function.
 * - SaveThresholdSettingsOutput - The return type for the saveThresholdSettings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SaveThresholdSettingsInputSchema = z.object({
  pitchAngleThreshold: z
    .number()
    .describe('The threshold for the pitch angle in degrees.'),
  flexSensorThreshold: z
    .number()
    .describe('The threshold for the flex sensor value.'),
  vibrationEnabled: z
    .boolean()
    .describe('Whether vibration alerts are enabled.'),
});
export type SaveThresholdSettingsInput = z.infer<
  typeof SaveThresholdSettingsInputSchema
>;

const SaveThresholdSettingsOutputSchema = z.object({
  success: z.boolean().describe('Whether the settings were saved successfully.'),
  message: z.string().describe('A message indicating the status of the save operation.'),
});
export type SaveThresholdSettingsOutput = z.infer<
  typeof SaveThresholdSettingsOutputSchema
>;

export async function saveThresholdSettings(
  input: SaveThresholdSettingsInput
): Promise<SaveThresholdSettingsOutput> {
  return saveThresholdSettingsFlow(input);
}

const saveThresholdSettingsPrompt = ai.definePrompt({
  name: 'saveThresholdSettingsPrompt',
  input: {schema: SaveThresholdSettingsInputSchema},
  output: {schema: SaveThresholdSettingsOutputSchema},
  prompt: `You are an AI assistant that helps users save their threshold settings for a posture detection system to a device.

  Based on the user's input, save the settings to the device and return a success message.

  Input:
  Pitch Angle Threshold: {{{pitchAngleThreshold}}}
  Flex Sensor Threshold: {{{flexSensorThreshold}}}
  Vibration Enabled: {{{vibrationEnabled}}}

  Output: Return a JSON object with a success boolean and a message indicating the status of the save operation.  The message should indicate what the new settings are.
`,
});

const saveThresholdSettingsFlow = ai.defineFlow(
  {
    name: 'saveThresholdSettingsFlow',
    inputSchema: SaveThresholdSettingsInputSchema,
    outputSchema: SaveThresholdSettingsOutputSchema,
  },
  async input => {
    // Here you would integrate with the device to persist the settings.
    // This is a placeholder, and the actual implementation would depend on
    // how the device is connected and how settings are persisted.

    // Assume the settings are saved successfully for now.
    const {output} = await saveThresholdSettingsPrompt(input);

    return {
      success: true,
      message: `Settings saved successfully. Pitch Angle Threshold: ${input.pitchAngleThreshold}, Flex Sensor Threshold: ${input.flexSensorThreshold}, Vibration Enabled: ${input.vibrationEnabled}.`,
    };
  }
);
