
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export const sendMessageToGemini = async (
  history: string[], 
  newMessage: string, 
  customInstruction?: string
): Promise<string> => {
  try {
    // Initializing Gemini client using the mandatory named parameter and directly accessing process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using 'gemini-3-flash-preview' for basic text chat tasks as per recommendations
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Previous conversation:\n${history.join('\n')}\nUser: ${newMessage}`,
      config: {
        systemInstruction: customInstruction || `আপনি মাওলানা মাহফুজুর রহমানের ডিজিটাল প্রতিনিধি।`,
        temperature: 0.7,
        // Thinking budget set to 0 to prioritize response speed for chat
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    // Access the 'text' property directly as per the latest SDK spec
    return response.text || "দুঃখিত, আমি এখন উত্তর দিতে পারছি না। পরে আবার চেষ্টা করুন।";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "সংযোগ সমস্যা হচ্ছে। দয়া করে ইন্টারনেট সংযোগ পরীক্ষা করুন।";
  }
};
