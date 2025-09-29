// src/ai/flows/personalized-posture-tips.ts
'use server';

/**
 * @fileOverview Generates personalized posture improvement tips based on user's historical posture data.
 *
 * - generatePostureTips - A function that generates posture tips.
 * - PostureTipsInput - The input type for the generatePostureTips function.
 * - PostureTipsOutput - The return type for the generatePostureTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PostureTipsInputSchema = z.object({
  postureData: z.string().describe('Historical posture data in JSON format, including timestamps, pitch angles, and flex sensor values.'),
  userProfile: z.string().describe('User profile information in JSON format, including name, age, occupation, and posture goals.'),
});
export type PostureTipsInput = z.infer<typeof PostureTipsInputSchema>;

const PostureTipsOutputSchema = z.object({
  tips: z.string().describe('Personalized posture improvement tips based on the provided data.'),
});
export type PostureTipsOutput = z.infer<typeof PostureTipsOutputSchema>;

export async function generatePostureTips(input: PostureTipsInput): Promise<PostureTipsOutput> {
  return generatePostureTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'postureTipsPrompt',
  input: {schema: PostureTipsInputSchema},
  output: {schema: PostureTipsOutputSchema},
  prompt: `You are a posture expert. Analyze the user's posture data and profile to provide personalized tips for improvement.

Posture Data: {{{postureData}}}
User Profile: {{{userProfile}}}

Provide specific and actionable tips tailored to the user's situation.`,
});

const generatePostureTipsFlow = ai.defineFlow(
  {
    name: 'generatePostureTipsFlow',
    inputSchema: PostureTipsInputSchema,
    outputSchema: PostureTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
