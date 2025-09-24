// src/ai/flows/personalized-crop-advisory.ts
'use server';

/**
 * @fileOverview Personalized crop advisory flow providing guidance to farmers.
 *
 * - personalizedCropAdvisory - A function that provides personalized advice.
 * - PersonalizedCropAdvisoryInput - The input type for the personalizedCropAdvisory function.
 * - PersonalizedCropAdvisoryOutput - The return type for the personalizedCropAdvisory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCropAdvisoryInputSchema = z.object({
  location: z
    .string()
    .describe('The geographical location of the farm (e.g., city, state).'),
  cropType: z.string().describe('The type of crop being cultivated.'),
  farmSize: z.string().describe('The size of the farm in acres'),
  soilConditions: z.string().describe('Description of the soil conditions on the farm.'),
  irrigationMethods: z.string().describe('Description of the irrigation methods used on the farm.'),
  weatherPatterns: z.string().describe('Local weather patterns including recent weather conditions and forecast.'),
  historicalData: z.string().describe('Historical crop yield and farming data for the farm.'),
});
export type PersonalizedCropAdvisoryInput = z.infer<
  typeof PersonalizedCropAdvisoryInputSchema
>;

const PersonalizedCropAdvisoryOutputSchema = z.object({
  cropManagementAdvice: z.string().describe('Personalized advice on crop management practices.'),
  pestControlAdvice: z.string().describe('Personalized advice on pest control measures.'),
  optimalFarmingPractices: z
    .string()
    .describe('Guidance on optimal farming practices specific to the farm.'),
});
export type PersonalizedCropAdvisoryOutput = z.infer<
  typeof PersonalizedCropAdvisoryOutputSchema
>;

export async function personalizedCropAdvisory(
  input: PersonalizedCropAdvisoryInput
): Promise<PersonalizedCropAdvisoryOutput> {
  return personalizedCropAdvisoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCropAdvisoryPrompt',
  input: {schema: PersonalizedCropAdvisoryInputSchema},
  output: {schema: PersonalizedCropAdvisoryOutputSchema},
  prompt: `You are an AI-powered agricultural advisor providing personalized advice to farmers.

  Based on the following information about the farm, provide personalized advisory on crop management, pest control, and optimal farming practices.

  Farm Location: {{{location}}}
  Crop Type: {{{cropType}}}
  Farm Size: {{{farmSize}}}
  Soil Conditions: {{{soilConditions}}}
  Irrigation Methods: {{{irrigationMethods}}}
  Weather Patterns: {{{weatherPatterns}}}
  Historical Data: {{{historicalData}}}

  Consider weather patterns, local crop calendars, and historical data to refine your guidance.
  Provide actionable recommendations that the farmer can implement to optimize their farming practices and improve crop yields.
  Focus on providing specific advice related to crop management, pest control, and general optimal farming practices.
  Ensure that the advice is contextual and location-aware.
  Strictly adhere to the schema descriptions and constraints.
  `,
});

const personalizedCropAdvisoryFlow = ai.defineFlow(
  {
    name: 'personalizedCropAdvisoryFlow',
    inputSchema: PersonalizedCropAdvisoryInputSchema,
    outputSchema: PersonalizedCropAdvisoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
