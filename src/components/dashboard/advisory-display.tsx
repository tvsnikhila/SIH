'use client';

import type { PersonalizedCropAdvisoryOutput } from '@/ai/flows/personalized-crop-advisory';
import { generateVoiceResponse } from '@/ai/flows/ai-generated-voice-responses';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import { Loader2, Play, SlidersHorizontal, Syringe, Wheat } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AdvisoryDisplayProps {
  advisory: PersonalizedCropAdvisoryOutput | null;
  isLoading: boolean;
}

export function AdvisoryDisplay({ advisory, isLoading }: AdvisoryDisplayProps) {
  const { language } = useLanguage();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePlayAudio = async (text: string, id: string) => {
    setPlayingId(id);
    try {
      const result = await generateVoiceResponse({ text, language });
      const audio = new Audio(result.voiceResponse);
      audio.play();
      audio.onended = () => setPlayingId(null);
    } catch (error) {
      console.error('Failed to generate voice response:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate voice. Please try again.',
      });
      setPlayingId(null);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-12 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Generating your personalized advice...</p>
        </CardContent>
      </Card>
    );
  }

  if (!advisory) {
    return null;
  }

  const adviceSections = [
    {
      id: 'cropManagement',
      title: 'Crop Management',
      content: advisory.cropManagementAdvice,
      icon: <Wheat className="h-5 w-5" />,
    },
    {
      id: 'pestControl',
      title: 'Pest Control',
      content: advisory.pestControlAdvice,
      icon: <Syringe className="h-5 w-5" />,
    },
    {
      id: 'optimalPractices',
      title: 'Optimal Farming Practices',
      content: advisory.optimalFarmingPractices,
      icon: <SlidersHorizontal className="h-5 w-5" />,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-headline">Your Advisory</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="cropManagement" className="w-full">
          {adviceSections.map((section) => (
            <AccordionItem value={section.id} key={section.id}>
              <AccordionTrigger className="text-lg">
                <div className="flex items-center gap-3">
                  {section.icon}
                  {section.title}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base prose max-w-none">
                <div className="flex justify-end mb-2">
                    <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handlePlayAudio(section.content, section.id)}
                        disabled={playingId === section.id}
                    >
                        {playingId === section.id ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Play className="mr-2 h-4 w-4" />
                        )}
                        Listen
                    </Button>
                </div>
                {section.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
