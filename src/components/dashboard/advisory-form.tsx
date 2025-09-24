'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { personalizedCropAdvisory, type PersonalizedCropAdvisoryOutput } from '@/ai/flows/personalized-crop-advisory';
import { Loader2 } from 'lucide-react';

const advisoryFormSchema = z.object({
  weatherPatterns: z.string().min(10, { message: 'Please describe the recent weather and forecast.' }),
  historicalData: z.string().min(10, { message: 'Please provide some historical context.' }),
});

type AdvisoryFormValues = z.infer<typeof advisoryFormSchema>;

interface AdvisoryFormProps {
  setAdvisory: (advisory: PersonalizedCropAdvisoryOutput | null) => void;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
}

export function AdvisoryForm({ setAdvisory, setIsLoading, isLoading }: AdvisoryFormProps) {
  const { toast } = useToast();
  const form = useForm<AdvisoryFormValues>({
    resolver: zodResolver(advisoryFormSchema),
    defaultValues: {
      weatherPatterns: 'Sunny with occasional showers. Forecast predicts more rain in the coming week.',
      historicalData: 'Last year, this time was peak monsoon. Yield was slightly lower due to waterlogging in some areas.',
    },
    mode: 'onChange',
  });

  async function onSubmit(data: AdvisoryFormValues) {
    setIsLoading(true);
    setAdvisory(null);
    
    // This is mock data from a typical profile. In a real app, you'd fetch this.
    const farmProfile = {
      location: 'Kerala, India',
      farmSize: '5 acres',
      cropType: 'Rice',
      soilConditions: 'Alluvial soil, slightly acidic',
      irrigationMethods: 'Canal irrigation and monsoon rains',
    };

    try {
      const result = await personalizedCropAdvisory({
        ...farmProfile,
        ...data,
      });
      setAdvisory(result);
    } catch (error) {
      console.error('Failed to get advisory:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch advisory. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="weatherPatterns"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Weather & Forecast</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Sunny for the past week, forecast predicts heavy rain..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe recent weather and any upcoming forecast you know of.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="historicalData"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Historical Context / Recent Issues</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Last year's yield, any recent pest problems..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide any relevant history about your farm for this season.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Get Advisory
        </Button>
      </form>
    </Form>
  );
}
