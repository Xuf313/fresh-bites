"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Recipe, INITIAL_RECIPES } from '@/lib/data';

interface RecipeContextType {
  recipes: Recipe[];
  likedRecipes: Set<string>;
  toggleLike: (id: string) => void;
  addRecipe: (recipe: Omit<Recipe, 'id'>) => void;
}

const RecipeContext = createContext<RecipeContextType | null>(null);

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  // Track whether recipes were loaded from storage to avoid overwriting on first render
  const recipesLoaded = useRef(false);
  
  // FIX 1: Start with an empty Set to match the Server's output exactly
  const [likedRecipes, setLikedRecipes] = useState<Set<string>>(new Set());
  
  // FIX 2: Use a ref to track if we have loaded from storage yet
  // (This prevents us from overwriting your saved likes with an empty set on the first render)
  const isLoaded = useRef(false);

  // FIX 3: Load from localStorage ONLY after the component has mounted in the browser
  useEffect(() => {
    const saved = localStorage.getItem('likedRecipes');
    if (saved) {
      setLikedRecipes(new Set(JSON.parse(saved)));
    }
    isLoaded.current = true; // Mark as loaded so we can start saving changes
  }, []);

  // Load recipes from localStorage on mount (if present)
  useEffect(() => {
    const saved = localStorage.getItem('freshBitesRecipes');
    if (saved) {
      try {
        const parsed: Recipe[] = JSON.parse(saved);
        setRecipes(parsed);
      } catch (e) {
        console.error('Failed to parse saved recipes:', e);
        setRecipes(INITIAL_RECIPES);
      }
    }
    recipesLoaded.current = true;
  }, []);

  // Effect: Save likes to localStorage (Only if we have finished loading!)
  useEffect(() => {
    if (isLoaded.current) {
      localStorage.setItem('likedRecipes', JSON.stringify([...likedRecipes]));
    }
  }, [likedRecipes]);

  // Persist recipes to localStorage whenever they change (after initial load)
  useEffect(() => {
    if (recipesLoaded.current) {
      try {
        localStorage.setItem('freshBitesRecipes', JSON.stringify(recipes));
      } catch (e) {
        console.error('Failed to save recipes to localStorage:', e);
      }
    }
  }, [recipes]);

  // Action: Toggle Like
  const toggleLike = (recipeId: string) => {
    setLikedRecipes(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(recipeId)) {
        newLiked.delete(recipeId);
      } else {
        newLiked.add(recipeId);
      }
      return newLiked;
    });
  };

  // Action: Add Recipe
  const addRecipe = (newRecipe: Omit<Recipe, 'id'>) => {
    const recipe: Recipe = {
      ...newRecipe,
      id: Date.now().toString()
    };
    setRecipes(prev => [recipe, ...prev]);
  };

  return (
    <RecipeContext.Provider value={{ recipes, likedRecipes, toggleLike, addRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
}

// Custom hook to use the context easily
export function useRecipes() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
}