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
  const recipesLoaded = useRef(false);
  const [likedRecipes, setLikedRecipes] = useState<Set<string>>(new Set());
  const isLoaded = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem('likedRecipes');
    if (saved) {
      setLikedRecipes(new Set(JSON.parse(saved)));
    }
    isLoaded.current = true; // Mark as loaded so we can start saving changes
  }, []);

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

  useEffect(() => {
    if (isLoaded.current) {
      localStorage.setItem('likedRecipes', JSON.stringify([...likedRecipes]));
    }
  }, [likedRecipes]);

  useEffect(() => {
    if (recipesLoaded.current) {
      try {
        localStorage.setItem('freshBitesRecipes', JSON.stringify(recipes));
      } catch (e) {
        console.error('Failed to save recipes to localStorage:', e);
      }
    }
  }, [recipes]);

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