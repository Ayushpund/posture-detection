'use server';
/**
 * @fileOverview A flow for generating posture correction exercise videos.
 *
 * - generateExerciseVideo - A function that handles the video generation process.
 * - ExerciseVideoInput - The input type for the generateExerciseVideo function.
 * - ExerciseVideoOutput - The return type for the generateExerciseVideo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import * as fs from 'fs';
import {Readable} from 'stream';
import {MediaPart} from 'genkit';

const ExerciseVideoInputSchema = z.object({
  exercise: z
    .string()
    .describe('The name of the posture correction exercise.'),
  focusArea: z.string().describe('The body area the exercise focuses on.'),
});
export type ExerciseVideoInput = z.infer<typeof ExerciseVideoInputSchema>;

const ExerciseVideoOutputSchema = z.object({
  videoUrl: z.string().describe('The data URI of the generated exercise video.'),
});
export type ExerciseVideoOutput = z.infer<typeof ExerciseVideoOutputSchema>;

export async function generateExerciseVideo(
  input: ExerciseVideoInput
): Promise<ExerciseVideoOutput> {
  return generateExerciseVideoFlow(input);
}

async function toBase64(video: MediaPart): Promise<string> {
    const fetch = (await import('node-fetch')).default;
    const videoDownloadResponse = await fetch(
      `${video.media!.url}&key=${process.env.GEMINI_API_KEY}`
    );
  
    if (
      !videoDownloadResponse ||
      videoDownloadResponse.status !== 200 ||
      !videoDownloadResponse.body
    ) {
      throw new Error('Failed to fetch video');
    }
    
    const buffer = await videoDownloadResponse.arrayBuffer();
    return Buffer.from(buffer).toString('base64');
  }

const generateExerciseVideoFlow = ai.defineFlow(
  {
    name: 'generateExerciseVideoFlow',
    inputSchema: ExerciseVideoInputSchema,
    outputSchema: ExerciseVideoOutputSchema,
  },
  async input => {
    let {operation} = await ai.generate({
      model: googleAI.model('veo-2.0-generate-001'),
      prompt: `Generate a clear, instructional video of a person demonstrating the '${input.exercise}' exercise. The focus should be on proper form for ${input.focusArea}. The background should be a simple, well-lit fitness studio.`,
      config: {
        durationSeconds: 8,
        aspectRatio: '16:9',
        personGeneration: 'allow_adult',
      },
    });

    if (!operation) {
      throw new Error('Expected the model to return an operation');
    }

    // Wait until the operation completes.
    while (!operation.done) {
      operation = await ai.checkOperation(operation);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    if (operation.error) {
      throw new Error('failed to generate video: ' + operation.error.message);
    }

    const video = operation.output?.message?.content.find(p => !!p.media);
    if (!video) {
      throw new Error('Failed to find the generated video');
    }

    const base64Video = await toBase64(video);

    return {
      videoUrl: `data:video/mp4;base64,${base64Video}`,
    };
  }
);
