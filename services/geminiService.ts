
import { GoogleGenAI, Type } from "@google/genai";
import { BabyName } from "../types";

// Use Vite's define replacement
declare const process: any;
const API_KEY = process.env.API_KEY;

export const getGeminiInsights = async (name: string, category: string) => {
  if (!API_KEY) {
    console.error("API Key not found");
    return null;
  }
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `For the baby name "${name}" (category: "${category}"), provide detailed etymological and cultural insights. 
      Include a deep meaning, historical origin (etymology), a fascinating curiosity, likely gender (M/F/U), and up to 2 famous personalities with this name.
      Return only a JSON object.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            meaning: { type: Type.STRING, description: "Detailed meaning of the name in Portuguese" },
            origin: { type: Type.STRING, description: "Historical/Etymological origin in Portuguese" },
            curiosity: { type: Type.STRING, description: "A unique or historical fact about the name in Portuguese" },
            gender: { type: Type.STRING, description: "One of: M, F, U" },
            famousPersonalities: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of famous people with this name"
            }
          },
          required: ["meaning", "origin", "curiosity", "gender"]
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini service error:", error);
    return null;
  }
};

export interface AiPreferences {
  gender: 'M' | 'F' | 'U';
  theme: string;
  origin?: string;
  details?: string;
}

export const generateCreativeNames = async (prefs: AiPreferences): Promise<BabyName[]> => {
  if (!API_KEY) return [];
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const prompt = `Generate 3 unique and beautiful baby names based on these preferences:
    - Gender: ${prefs.gender === 'M' ? 'Male' : prefs.gender === 'F' ? 'Female' : 'Unisex'}
    - Vibe/Theme: ${prefs.theme}
    - Origin preference: ${prefs.origin || 'Any'}
    - Specific details: ${prefs.details || 'None'}

    For each name, provide the meaning, origin, a curiosity, and tags in Portuguese.
    Ensure the names are culturally appropriate for Brazil but unique.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              meaning: { type: Type.STRING },
              origin: { type: Type.STRING },
              curiosity: { type: Type.STRING },
              gender: { type: Type.STRING, description: "M, F, or U" },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["name", "meaning", "origin", "curiosity", "gender", "tags"]
          }
        }
      }
    });

    const rawData = JSON.parse(response.text.trim());

    // Map to BabyName interface adding fake IDs
    return rawData.map((item: any, index: number) => ({
      id: `ai-gen-${Date.now()}-${index}`,
      name: item.name,
      meaning: item.meaning,
      origin: item.origin,
      curiosity: item.curiosity,
      gender: item.gender as 'M' | 'F' | 'U',
      category: 'api',
      tags: item.tags || ['ia'],
      famousPersonalities: []
    }));

  } catch (error) {
    console.error("Gemini creative error:", error);
    return [];
  }
};
