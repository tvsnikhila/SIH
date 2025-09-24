'use server';
/**
 * @fileOverview An AI agent that provides voice-based responses in addition to text replies.
 *
 * - generateVoiceResponse - A function that generates voice responses.
 * - GenerateVoiceResponseInput - The input type for the generateVoiceResponse function.
 * - GenerateVoiceResponseOutput - The return type for the generateVoiceResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const GenerateVoiceResponseInputSchema = z.object({
  text: z.string().describe('The text to be converted to speech.'),
  language: z.enum(['en', 'ml']).describe('The language of the text (en for English, ml for Malayalam).'),
});
export type GenerateVoiceResponseInput = z.infer<typeof GenerateVoiceResponseInputSchema>;

const GenerateVoiceResponseOutputSchema = z.object({
  voiceResponse: z.string().describe('The voice response in base64 encoded WAV format.'),
});
export type GenerateVoiceResponseOutput = z.infer<typeof GenerateVoiceResponseOutputSchema>;

export async function generateVoiceResponse(input: GenerateVoiceResponseInput): Promise<GenerateVoiceResponseOutput> {
  return generateVoiceResponseFlow(input);
}

const generateVoiceResponseFlow = ai.defineFlow(
  {
    name: 'generateVoiceResponseFlow',
    inputSchema: GenerateVoiceResponseInputSchema,
    outputSchema: GenerateVoiceResponseOutputSchema,
  },
  async (input) => {
    const {
      text,
      language,
    } = input;

    const voiceName = language === 'ml' ? 'Anjali' : 'Algenib';
    const {
      media
    } = await ai.generate({
      model: ai.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {voiceName: voiceName},
          },
        },
      },
      prompt: text,
    });

    if (!media) {
      throw new Error('No media returned from TTS model.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    const voiceResponse = 'data:audio/wav;base64,' + (await toWav(audioBuffer));

    return {
      voiceResponse,
    };
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
