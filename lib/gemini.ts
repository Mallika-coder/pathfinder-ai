
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export interface AnalysisResult {
    ambulance_ready: boolean;
    lane_width_estimate_m: number;
    obstacles: string[];
    summary: string;
}

export const analyzeLaneImage = async (base64Image: string): Promise<AnalysisResult> => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const prompt = `
      Analyze this image of a street or lane for emergency vehicle accessibility.
      Output ONLY valid JSON in this format:
      {
        "ambulance_ready": boolean, // true if a standard ambulance (approx 2.5m wide) can pass
        "lane_width_estimate_m": number, // estimated width in meters
        "obstacles": string[], // list of visible obstacles (e.g., "cart", "debris", "construction")
        "summary": "string" // max 10 words, concise reason like "Clear path" or "Blocked by cart"
      }
    `;

        // Remove data:image/xxx;base64, prefix if present
        const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

        const imagePart = {
            inlineData: {
                data: cleanBase64,
                mimeType: "image/jpeg",
            },
        };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if Gemini sends them
        const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(cleanJson);
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        // Fallback for demo if API fails or key is missing
        return {
            ambulance_ready: false,
            lane_width_estimate_m: 0,
            obstacles: ["Analysis Failed"],
            summary: "Could not analyze image",
        };
    }
};
