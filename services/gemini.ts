
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize GoogleGenAI using process.env.API_KEY directly
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeText = async (text: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the following text and provide a concise summary, sentiment score (1-10), and key takeaways: "${text}"`,
    config: {
      temperature: 0.7,
      topP: 0.95,
    }
  });
  // Access .text property directly
  return response.text || "No response received.";
};

export const analyzeImage = async (base64Data: string, prompt: string): Promise<string> => {
  const ai = getAI();
  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: base64Data.split(',')[1],
    },
  };
  const textPart = { text: prompt };
  // Using gemini-3-flash-preview for vision analysis (Basic Text Task with image input)
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { parts: [imagePart, textPart] },
  });
  return response.text || "I couldn't analyze the image.";
};

export const complexReasoning = async (query: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: query,
    config: {
      thinkingConfig: { thinkingBudget: 4000 }
    }
  });
  return response.text || "Deep thinking failed.";
};

export const chatStream = async (message: string, onChunk: (chunk: string) => void) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are a helpful AI assistant integrated into a modern SaaS platform landing page. Keep responses professional, helpful, and concise."
    }
  });
  const result = await chat.sendMessageStream({ message });
  for await (const chunk of result) {
    // Cast chunk to GenerateContentResponse and access .text property
    const text = (chunk as GenerateContentResponse).text;
    if (text) onChunk(text);
  }
};
