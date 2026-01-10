import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private static getAiClient() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  /**
   * Edits an image based on a text prompt using gemini-2.5-flash-image
   */
  static async editImage(base64Image: string, prompt: string): Promise<string | null> {
    const ai = this.getAiClient();
    const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, '');

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: cleanBase64,
                mimeType: 'image/png',
              },
            },
            {
              text: prompt,
            },
          ],
        },
      });

      if (!response.candidates?.[0]?.content?.parts) {
        throw new Error('No parts in response');
      }

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      return null;
    } catch (error) {
      console.error('Error editing image with Gemini:', error);
      throw error;
    }
  }

  /**
   * Generates a travel vlog using the Veo model.
   */
  static async generateVlog(prompt: string, base64StartImage?: string): Promise<string | null> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt || 'A beautiful cinematic travel montage vlog of a vacation',
        image: base64StartImage ? {
          imageBytes: base64StartImage.replace(/^data:image\/\w+;base64,/, ''),
          mimeType: 'image/png'
        } : undefined,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) return null;

      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error generating vlog with Veo:', error);
      throw error;
    }
  }
}