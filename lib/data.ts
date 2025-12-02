// Import the JSON file directly
import recipes from '@/data/recipes.json';

// Keep the interface for Type Safety
export interface Recipe {
  id: string;
  title: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack';
  cuisine: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: string[];
  instructions: string[];
  description: string;
  imageUrl?: string;
  tags: string[];
}

// Cast the JSON to the Recipe[] type to ensure it matches
export const INITIAL_RECIPES: Recipe[] = recipes as Recipe[];