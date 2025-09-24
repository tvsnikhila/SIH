'use client';

import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Mic, Square, Loader2, Languages } from 'lucide-react';
import { useToast } from './ui/use-toast';
import { translateEnglishToMalayalam } from '@/ai/flows/voice-based-translation';
import { Card, CardContent } from './ui/card';

export function VoiceTranslator() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const handleStartRecording = async () => {
    setTranslatedText('');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          await handleTranslation(audioBlob);
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Error accessing microphone:', err);
        toast({
          variant: 'destructive',
          title: 'Microphone Error',
          description: 'Could not access the microphone. Please check your permissions.',
        });
      }
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsLoading(true);
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleTranslation = async (audioBlob: Blob) => {
    try {
      const audioDataUri = await blobToBase64(audioBlob);
      const result = await translateEnglishToMalayalam({ englishSpeechDataUri: audioDataUri });
      setTranslatedText(result.malayalamText);
    } catch (error) {
      console.error('Translation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Translation Failed',
        description: 'Could not translate audio. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Mic className="h-4 w-4" />
          <span className="sr-only">Voice Translator</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Voice Translator</DialogTitle>
          <DialogDescription>
            Speak in English, and we&apos;ll translate it to Malayalam for you in real-time.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <Button
            size="lg"
            className="w-24 h-24 rounded-full"
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            disabled={isLoading}
          >
            {isRecording ? (
              <Square className="h-8 w-8" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
          </Button>
          <p className="text-sm text-muted-foreground">
            {isRecording ? 'Recording... Click to stop.' : 'Click to start recording.'}
          </p>
        </div>
        {(isLoading || translatedText) && (
            <Card>
                <CardContent className="p-6">
                    {isLoading && (
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Translating...</span>
                        </div>
                    )}
                    {translatedText && !isLoading && (
                        <div>
                            <div className='flex items-center gap-2 mb-2'>
                                <Languages className='h-5 w-5 text-primary' />
                                <h3 className='font-semibold'>Malayalam Translation:</h3>
                            </div>
                            <p className="text-lg font-headline">{translatedText}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        )}
        <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
