import { GoogleGenAI, Type } from "@google/genai";
import { FusionRecipe, FusionRequest } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    dishName: {
      type: Type.STRING,
      description: "A creative, catchy name for the fusion dish.",
    },
    description: {
      type: Type.STRING,
      description: "A short, mouth-watering description of the result.",
    },
    ingredients: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of ingredients with exact quantities (cups, grams, spoons).",
    },
    instructions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          phase: { type: Type.STRING, description: "e.g., Preparation, Mixing, Cooking" },
          steps: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
      },
      description: "Step-by-step cooking instructions grouped by phase.",
    },
    flavorProfile: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Adjectives describing the taste (e.g., Sweet, Spicy, Umami).",
    },
    difficulty: {
      type: Type.STRING,
      enum: ["Easy", "Moderate", "Experimental"],
    },
    viralScore: {
      type: Type.INTEGER,
      description: "A score from 1 to 100 indicating how viral this recipe would be on social media.",
    },
    viralReason: {
      type: Type.STRING,
      description: "A short sentence explaining why it got this score.",
    },
  },
  required: ["dishName", "ingredients", "instructions", "flavorProfile", "difficulty", "viralScore", "viralReason"],
};

const generateRecipeText = async (inputs: FusionRequest): Promise<Omit<FusionRecipe, 'imageUrl'>> => {
  const prompt = `
    Create a unique, delicious fusion recipe by combining "${inputs.food1}" and "${inputs.food2}".
    
    The recipe should be realistic and edible. 
    Focus on how the textures and flavors of these two items can work together.
    Provide exact measurements for ingredients.
    Write the instructions in simple, friendly, and easy-to-understand language.
    The viral score should reflect how interesting or appetizing the combination is.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
        systemInstruction: "You are a friendly, professional chef who creates innovative fusion recipes. Write in clear, accessible language suitable for home cooks.",
        temperature: 0.8,
      },
    });

    if (response.text) {
      try {
        return JSON.parse(response.text) as Omit<FusionRecipe, 'imageUrl'>;
      } catch (jsonError) {
        console.error("JSON Parse Error:", jsonError);
        throw new Error("The AI cooked up something, but the recipe format was a bit off. Please try again.");
      }
    }

    throw new Error("No recipe could be generated. This might be due to safety filters for the requested ingredients.");
  } catch (error: any) {
    throw error;
  }
};

const generateRecipeImage = async (inputs: FusionRequest): Promise<string | undefined> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `A professional, appetizing food photography close-up of a fusion dish combining ${inputs.food1} and ${inputs.food2}. High resolution, culinary magazine style, delicious, 4k.`
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.warn("Image generation failed:", error);
    // Fail silently for image, return undefined so the recipe still loads
    return undefined;
  }
  return undefined;
};

export const generateFusionRecipe = async (inputs: FusionRequest): Promise<FusionRecipe> => {
  try {
    const [recipeData, imageUrl] = await Promise.all([
      generateRecipeText(inputs),
      generateRecipeImage(inputs)
    ]);

    return {
      ...recipeData,
      imageUrl
    };
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    let userMessage = "Whoops! We couldn't cook that up. Please try again.";
    const errorMsg = (error.message || error.toString()).toLowerCase();

    // Map technical errors to friendly user messages
    if (errorMsg.includes("403") || errorMsg.includes("api key")) {
      userMessage = "Configuration Error: Invalid API Key. Please check your settings.";
    } else if (errorMsg.includes("429") || errorMsg.includes("quota") || errorMsg.includes("exhausted")) {
      userMessage = "The kitchen is too busy! (Rate Limit Reached). Please wait a minute and try again.";
    } else if (errorMsg.includes("503") || errorMsg.includes("overloaded")) {
      userMessage = "The AI service is currently overloaded. Please try again shortly.";
    } else if (errorMsg.includes("safety") || errorMsg.includes("blocked")) {
      userMessage = "Safety Filter: These ingredients flagged our safety guidelines. Please try different foods.";
    } else if (errorMsg.includes("network") || errorMsg.includes("fetch") || errorMsg.includes("failed to fetch")) {
      userMessage = "Network Error: Please check your internet connection.";
    } else if (error.message && !error.message.includes("Failed to generate")) {
      // Use the specific error message if it was thrown intentionally from helper functions
      userMessage = error.message;
    }

    throw new Error(userMessage);
  }
};