'use server';

/**
 * @fileOverview Voice-based translation flow from English to Malayalam.
 *
 * - translateEnglishToMalayalam - A function that translates English speech to Malayalam text.
 * - TranslateEnglishToMalayalamInput - The input type for the translateEnglishToMalayalam function.
 * - TranslateEnglishToMalayalamOutput - The return type for the translateEnglishToMalayalam function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateEnglishToMalayalamInputSchema = z.object({
  englishSpeechDataUri: z
    .string()
    .describe(
      "The English speech to be translated, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type TranslateEnglishToMalayalamInput = z.infer<typeof TranslateEnglishToMalayalamInputSchema>;

const TranslateEnglishToMalayalamOutputSchema = z.object({
  malayalamText: z.string().describe('The translated Malayalam text.'),
});
export type TranslateEnglishToMalayalamOutput = z.infer<typeof TranslateEnglishToMalayalamOutputSchema>;

export async function translateEnglishToMalayalam(
  input: TranslateEnglishToMalayalamInput
): Promise<TranslateEnglishToMalayalamOutput> {
  return translateEnglishToMalayalamFlow(input);
}

const translateEnglishToMalayalamPrompt = ai.definePrompt({
  name: 'translateEnglishToMalayalamPrompt',
  input: {schema: TranslateEnglishToMalayalamInputSchema},
  output: {schema: TranslateEnglishToMalayalamOutputSchema},
  prompt: `You are a real-time translation expert. Please translate the following English speech to Malayalam text.

Speech: {{media url=englishSpeechDataUri}}`,
});

const translateEnglishToMalayalamFlow = ai.defineFlow(
  {
    name: 'translateEnglishToMalayalamFlow',
    inputSchema: TranslateEnglishToMalayalamInputSchema,
    outputSchema: TranslateEnglishToMalayalamOutputSchema,
  },
  async input => {
    const {output} = await translateEnglishToMalayalamPrompt(input);
    return output!;
  }
);
