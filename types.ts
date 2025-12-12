
export interface FusionRecipe {
  id?: string;
  savedAt?: number;
  dishName: string;
  description: string;
  ingredients: string[];
  instructions: {
    phase: string;
    steps: string[];
  }[];
  flavorProfile: string[];
  difficulty: 'Easy' | 'Moderate' | 'Experimental';
  viralScore: number;
  viralReason: string;
  imageUrl?: string;
}

export interface FusionRequest {
  food1: string;
  food2: string;
}
