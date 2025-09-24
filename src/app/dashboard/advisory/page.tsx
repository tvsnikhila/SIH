'use client';

import { useState } from 'react';
import { AdvisoryForm } from '@/components/dashboard/advisory-form';
import { AdvisoryDisplay } from '@/components/dashboard/advisory-display';
import type { PersonalizedCropAdvisoryOutput } from '@/ai/flows/personalized-crop-advisory';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdvisoryPage() {
  const [advisory, setAdvisory] = useState<PersonalizedCropAdvisoryOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Personalized Advisory</CardTitle>
          <CardDescription>
            Fill in the details below to get AI-powered, location-aware advice for your farm. 
            Your saved farm profile is used as a baseline.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdvisoryForm setAdvisory={setAdvisory} setIsLoading={setIsLoading} isLoading={isLoading} />
        </CardContent>
      </Card>
      
      <AdvisoryDisplay advisory={advisory} isLoading={isLoading} />
    </div>
  );
}
