"use client";

import { useRecipes } from '@/app/context/RecipeContext';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { ArrowLeft, Clock, Users, ChefHat, Tag, Flame, Star, Heart, Share2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function RecipeDetailPage() {
  const { recipes, likedRecipes, toggleLike } = useRecipes();
  const params = useParams();
  const router = useRouter();
  
  const recipe = recipes.find(r => r.id === params.id);
  
  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Recipe not found</h1>
        <button onClick={() => router.push('/')} className="text-emerald-600 hover:underline">
          Return Home
        </button>
      </div>
    );
  }

  const isLiked = likedRecipes.has(recipe.id);

  const categoryColors: Record<string, any> = {
    breakfast: { gradient: 'from-amber-500 to-orange-500', icon: '🌅' },
    lunch: { gradient: 'from-blue-500 to-cyan-500', icon: '☀️' },
    dinner: { gradient: 'from-purple-500 to-pink-500', icon: '🌙' },
    dessert: { gradient: 'from-pink-500 to-rose-500', icon: '🍰' },
    snack: { gradient: 'from-green-500 to-emerald-500', icon: '🍿' }
  };

  const difficultyColors: Record<string, string> = {
    easy: 'text-emerald-600 dark:text-emerald-400',
    medium: 'text-amber-600 dark:text-amber-400',
    hard: 'text-red-600 dark:text-red-400'
  };

  const categoryStyle = categoryColors[recipe.category] || categoryColors.dinner;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 md:mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        {/* Header Card Container */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 mb-8 shadow-xl">
          
          {/* Hero Image Section - Mobile Height Fixed */}
          <div className="relative h-64 md:h-[400px] w-full group">
            <ImageWithFallback 
              src={recipe.imageUrl || ''} 
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(recipe.id);
              }}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-red-500 transition-all transform hover:scale-110 shadow-lg"
            >
              <Heart className={`w-5 h-5 md:w-6 md:h-6 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
          
          <div className={`h-2 bg-gradient-to-r ${categoryStyle.gradient}`}></div>
          
          <div className="p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="text-2xl md:text-3xl">{categoryStyle.icon}</span>
                  <span className="px-3 py-1 md:px-4 md:py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs md:text-sm font-medium capitalize">
                    {recipe.category}
                  </span>
                  <span className={`px-3 py-1 md:px-4 md:py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-xs md:text-sm font-medium capitalize ${difficultyColors[recipe.difficulty]}`}>
                    {recipe.difficulty}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-5xl mb-3 tracking-tight text-slate-900 dark:text-white font-bold leading-tight">
                  {recipe.title}
                </h1>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium">{recipe.cuisine} Cuisine</p>
              </div>

              <div className="flex gap-2">
                <button className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950/30 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              {recipe.description}
            </p>

            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-col md:flex-row items-center md:gap-4 text-center md:text-left">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20 mb-2 md:mb-0">
                  <Clock className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Prep</div>
                  <div className="text-sm md:text-lg text-slate-900 dark:text-white font-bold">{recipe.prepTime}</div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:gap-4 text-center md:text-left">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/20 mb-2 md:mb-0">
                  <Flame className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Cook</div>
                  <div className="text-sm md:text-lg text-slate-900 dark:text-white font-bold">{recipe.cookTime}</div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:gap-4 text-center md:text-left">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-cyan-500 to-emerald-600 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20 mb-2 md:mb-0">
                  <Users className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Serves</div>
                  <div className="text-sm md:text-lg text-slate-900 dark:text-white font-bold">{recipe.servings}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 sticky top-24 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                  <ChefHat className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl text-slate-900 dark:text-white tracking-tight font-bold">
                  Ingredients
                </h2>
              </div>
              
              <ul className="space-y-4">
                {recipe.ingredients.map((ingredient, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3 text-slate-600 dark:text-slate-400 group hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded-lg transition-colors"
                  >
                    <input 
                      type="checkbox" 
                      className="mt-1 w-4 h-4 md:w-5 md:h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 shrink-0 cursor-pointer"
                    />
                    <span className="flex-1 group-hover:text-slate-900 dark:group-hover:text-white transition-colors leading-relaxed font-medium text-sm md:text-base">
                      {ingredient}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl md:text-2xl mb-8 text-slate-900 dark:text-white tracking-tight font-bold border-b border-slate-100 dark:border-slate-800 pb-4">
                Instructions
              </h2>
              
              <div className="space-y-8">
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-4 md:gap-5 group">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 font-bold text-base md:text-lg group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        {instruction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {recipe.tags.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Tag className="w-5 h-5 text-slate-400" />
                  <h2 className="text-lg md:text-xl text-slate-900 dark:text-white tracking-tight font-bold">
                    Tags
                  </h2>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {recipe.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs md:text-sm font-semibold hover:shadow-md transition-shadow cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 md:p-8 text-white overflow-hidden shadow-xl shadow-emerald-500/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
              
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-6 h-6 fill-white animate-pulse" />
                  <h3 className="text-lg md:text-xl font-bold">Chef's Pro Tips</h3>
                </div>
                <p className="text-emerald-50 leading-relaxed text-base md:text-lg">
                  For best results, prep all ingredients before starting (mise en place). 
                  This makes cooking smoother and more enjoyable. Don't hesitate to adjust 
                  seasonings to match your taste preferences. Happy cooking! 👨‍🍳
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}