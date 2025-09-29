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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getExerciseVideo } from '@/lib/actions';
import { Video, Loader2, AlertTriangle, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ExerciseVideoGenerator() {
  const [isPending, startTransition] = useTransition();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [exercise, setExercise] = useState('Neck Retraction');
  const [focusArea, setFocusArea] = useState('Neck and Shoulders');

  const handleGenerateVideo = () => {
    startTransition(async () => {
      setError(null);
      setVideoUrl(null);
      const result = await getExerciseVideo(exercise, focusArea);
      if (result.success) {
        setVideoUrl(result.videoUrl);
      } else {
        setError(result.error || 'An unexpected error occurred.');
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Exercise Video Generator</CardTitle>
        <CardDescription>
          Create a video for a specific posture correction exercise.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="exercise">Exercise Name</Label>
          <Input
            id="exercise"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            placeholder="e.g., Cat-Cow Stretch"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="focus-area">Focus Area</Label>
          <Input
            id="focus-area"
            value={focusArea}
            onChange={(e) => setFocusArea(e.target.value)}
            placeholder="e.g., Lower Back"
          />
        </div>

        <Button onClick={handleGenerateVideo} disabled={isPending} className="w-full">
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Video className="mr-2 h-4 w-4" />
          )}
          {isPending ? 'Generating Video...' : 'Generate Exercise Video'}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Video Generation Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {videoUrl && (
          <div className="space-y-2">
            <Alert>
                <Wand2 className="h-4 w-4" />
                <AlertTitle>Your Exercise Video</AlertTitle>
            </Alert>
            <div className="overflow-hidden rounded-lg border">
                <video controls autoPlay key={videoUrl} className="aspect-video w-full">
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
