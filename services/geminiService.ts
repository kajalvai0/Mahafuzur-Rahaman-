import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export const sendMessageToGemini = async (
  history: string[], 
  newMessage: string, 
  customInstruction?: string
): Promise<string> => {
  try {
    // Obtain the API key exclusively from the environment variable process.env.API_KEY.
    // Initialization must use a named parameter: new GoogleGenAI({ apiKey: process.env.API_KEY }).
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Previous conversation:\n${history.join('\n')}\nUser: ${newMessage}`,
      config: {
        systemInstruction: customInstruction || `আপনি মাওলানা মাহফুজুর রহমানের ডিজিটাল প্রতিনিধি।`,
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    // Extracting text from the response using the .text property.
    return response.text || "দুঃখিত, আমি এখন উত্তর দিতে পারছি না। পরে আবার চেষ্টা করুন।";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "সংযোগ সমস্যা হচ্ছে। দয়া করে ইন্টারনেট সংযোগ পরীক্ষা করুন।";
  }
};
