"use client";

import { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import type { Recipe } from '@/lib/data';

interface AddRecipeModalProps {
  onClose: () => void;
  onAdd: (recipe: Omit<Recipe, 'id'>) => void;
}

export function AddRecipeModal({ onClose, onAdd }: AddRecipeModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'dinner' as Recipe['category'],
    cuisine: '',
    prepTime: '',
    cookTime: '',
    servings: 4,
    difficulty: 'medium' as Recipe['difficulty'],
    description: '',
    ingredients: [''],
    instructions: [''],
    tags: ['']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanedData = {
      ...formData,
      ingredients: formData.ingredients.filter(i => i.trim() !== ''),
      instructions: formData.instructions.filter(i => i.trim() !== ''),
      tags: formData.tags.filter(t => t.trim() !== '')
    };
    
    onAdd(cleanedData);
  };

  const addIngredient = () => setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
  const removeIngredient = (index: number) => setFormData({ ...formData, ingredients: formData.ingredients.filter((_, i) => i !== index) });
  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addInstruction = () => setFormData({ ...formData, instructions: [...formData.instructions, ''] });
  const removeInstruction = (index: number) => setFormData({ ...formData, instructions: formData.instructions.filter((_, i) => i !== index) });
  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData({ ...formData, instructions: newInstructions });
  };

  const addTag = () => setFormData({ ...formData, tags: [...formData.tags, ''] });
  const removeTag = (index: number) => setFormData({ ...formData, tags: formData.tags.filter((_, i) => i !== index) });
  const updateTag = (index: number, value: string) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData({ ...formData, tags: newTags });
  };

  const inputClass = "w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400";
  const labelClass = "block text-slate-700 dark:text-slate-300 mb-2 font-medium";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-6 md:px-8 md:py-8 shrink-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
          
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl text-white mb-1">Add New Recipe</h2>
              <p className="text-emerald-50 text-sm md:text-base">Share your culinary creation with the community</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white/20 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 overflow-y-auto">
          <div className="mb-8">
            <h3 className="text-lg text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-800 font-bold">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={labelClass}>Recipe Title *</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputClass} placeholder="e.g., Chocolate Chip Cookies" />
              </div>
              <div>
                <label className={labelClass}>Cuisine *</label>
                <input type="text" required value={formData.cuisine} onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })} className={inputClass} placeholder="e.g., Italian, Thai, American" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Category</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as Recipe['category'] })} className={inputClass}>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="dessert">Dessert</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Difficulty</label>
                <select value={formData.difficulty} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as Recipe['difficulty'] })} className={inputClass}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Servings</label>
                <input type="number" min="1" value={formData.servings} onChange={(e) => setFormData({ ...formData, servings: parseInt(e.target.value) || 1 })} className={inputClass} />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-800 font-bold">
              Timing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Prep Time *</label>
                <input type="text" required value={formData.prepTime} onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })} className={inputClass} placeholder="e.g., 15 min" />
              </div>
              <div>
                <label className={labelClass}>Cook Time *</label>
                <input type="text" required value={formData.cookTime} onChange={(e) => setFormData({ ...formData, cookTime: e.target.value })} className={inputClass} placeholder="e.g., 30 min" />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-800 font-bold">
              Description
            </h3>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className={inputClass} placeholder="Brief description of the recipe..." />
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg text-slate-900 dark:text-white font-bold">Ingredients</h3>
              <button type="button" onClick={addIngredient} className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium text-sm">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <input type="text" value={ingredient} onChange={(e) => updateIngredient(index, e.target.value)} className={inputClass} placeholder="e.g., 2 cups flour" />
                  {formData.ingredients.length > 1 && (
                    <button type="button" onClick={() => removeIngredient(index)} className="p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors">
                      <Minus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg text-slate-900 dark:text-white font-bold">Instructions</h3>
              <button type="button" onClick={addInstruction} className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium text-sm">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {formData.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-shrink-0 w-8 h-10 flex items-center justify-center text-slate-600 dark:text-slate-400 font-bold">{index + 1}.</div>
                  <textarea value={instruction} onChange={(e) => updateInstruction(index, e.target.value)} rows={2} className={inputClass} placeholder="Describe this step..." />
                  {formData.instructions.length > 1 && (
                    <button type="button" onClick={() => removeInstruction(index)} className="p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors">
                      <Minus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg text-slate-900 dark:text-white font-bold">Tags (Optional)</h3>
              <button type="button" onClick={addTag} className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium text-sm">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex gap-2">
                  <input type="text" value={tag} onChange={(e) => updateTag(index, e.target.value)} className={inputClass} placeholder="e.g., Vegetarian, Quick" />
                  {formData.tags.length > 1 && (
                    <button type="button" onClick={() => removeTag(index)} className="p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors">
                      <Minus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
            <button type="button" onClick={onClose} className="px-6 py-3 border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium">Cancel</button>
            <button type="submit" className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-xl hover:shadow-emerald-500/25 transition-all font-bold">Add Recipe</button>
          </div>
        </form>
      </div>
    </div>
  );
}