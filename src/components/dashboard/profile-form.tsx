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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';

const profileFormSchema = z.object({
  location: z.string().min(2, { message: 'Location is required.' }),
  farmSize: z.string().min(1, { message: 'Farm size is required.' }),
  cropType: z.string().min(2, { message: 'Crop type is required.' }),
  soilConditions: z.string().optional(),
  irrigationMethods: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  location: 'Kerala, India',
  farmSize: '5 acres',
  cropType: 'Rice',
  soilConditions: 'Alluvial soil, slightly acidic',
  irrigationMethods: 'Canal irrigation and monsoon rains',
};

export function ProfileForm() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    // In a real app, you would save this data to a database.
    console.log(data);
    toast({
      title: 'Profile Updated',
      description: 'Your farm profile has been saved successfully.',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Thrissur, Kerala" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="farmSize"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Farm Size</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., 5 acres" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="cropType"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Main Crop Type</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Rice, Coconut" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="soilConditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Soil Conditions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your farm's soil (e.g., clay, sandy, loamy)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="irrigationMethods"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Irrigation Methods</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your irrigation methods (e.g., drip, sprinkler, rain-fed)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{t('save')}</Button>
      </form>
    </Form>
  );
}
