import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export interface LaneAnalysis {
  ambulance_ready: boolean;
  lane_width_estimate_m: number;
  obstacles: string[];
  summary: string;
  severity: 'low' | 'medium' | 'high';
  confidence: number;
}

export async function analyzeLane(imageBase64: string): Promise<LaneAnalysis> {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
      temperature: 0.1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 512,
    },
  });

const prompt = `
You are an emergency response AI.

STRICT RULES:
- Respond with ONLY minified JSON
- Do NOT explain anything
- Do NOT use markdown
- Do NOT add extra text

Return JSON in EXACT structure:

{
  "ambulance_ready": true,
  "lane_width_estimate_m": 2.5,
  "obstacles": ["string"],
  "summary": "string",
  "severity": "low",
  "confidence": 0.0
}

Conditions:
- Ambulance width minimum = 2.5 meters
- If unclear, set ambulance_ready=false
`;


  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBase64,
          mimeType: "image/jpeg"
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    // const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    // const jsonString = jsonMatch ? jsonMatch[1] : text;
    
    // return JSON.parse(jsonString);
    return JSON.parse(text.trim());

  } catch (error) {
    console.error('Error analyzing image with Gemini:', error);
    throw new Error('Failed to analyze image');
  }
}