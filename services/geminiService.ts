import { GoogleGenAI } from "@google/genai";
import { WellnessLog } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAthleteAnalysis = async (athleteName: string, logs: WellnessLog[]) => {
  try {
    const prompt = `
      As a high-performance sports scientist, analyze the following wellness logs for athlete ${athleteName}.
      
      Logs (Last few days):
      ${JSON.stringify(logs, null, 2)}
      
      Identify trends in fatigue vs sleep quality. 
      Is the athlete at risk of overtraining?
      Provide a concise summary in 3 bullet points.
      Suggest one actionable adjustment for their coach.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return "AI Analysis currently unavailable. Please check API Key configuration.";
  }
};

export const generateSessionAdjustment = async (fatigue: number, sleep: number, blockName: string) => {
  try {
    const prompt = `
      Act as an elite strength and conditioning coach.
      Athlete Readiness Report:
      - Fatigue Level: ${fatigue}/5 (High is tired)
      - Sleep Quality: ${sleep}/10 (Low is bad)
      
      Scheduled Training Block: "${blockName}".
      
      Task: Provide a specific, actionable auto-regulation instruction for today's session based on this readiness.
      Constraint: Keep it under 25 words. Direct command style.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    return "Listen to your body. Reduce volume by 20% if feeling drained.";
  }
};

export const generateMealSuggestion = async (mealName: string, slots: Record<string, number>) => {
  try {
    const prompt = `
      Act as a Performance Nutritionist.
      Suggest a single, specific, appetizing meal for "${mealName}" that fits exactly these Exchange System slots:
      ${JSON.stringify(slots)}
      
      Constraint: Return ONLY the meal name and key ingredients. Max 15 words. Do not list the slots back.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    return "Grilled Chicken Bowl with Rice and Avocado.";
  }
};