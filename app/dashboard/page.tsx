"use client";

import { useState, useMemo } from 'react';
import { Plus, Search, Clock, Users, Heart, Sparkles, Grid3x3, List, MoreVertical, ChevronDown, Leaf, Star, MessageCircle, Github, Twitter, Instagram, Send, User } from 'lucide-react';
import Link from 'next/link';
import { useRecipes } from '@/app/context/RecipeContext';
import { AddRecipeModal } from '@/components/AddRecipeModal';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

export default function DashboardPage() {
  const { recipes, likedRecipes, toggleLike, addRecipe } = useRecipes();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categoryConfig: Record<string, any> = {
    breakfast: { gradient: 'from-amber-500 to-orange-500', bg: 'bg-amber-50 dark:bg-amber-950/20', text: 'text-amber-700 dark:text-amber-300', icon: '🌅', label: 'BREAKFAST' },
    lunch: { gradient: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50 dark:bg-blue-950/20', text: 'text-blue-700 dark:text-blue-300', icon: '☀️', label: 'LUNCH' },
    dinner: { gradient: 'from-purple-500 to-pink-500', bg: 'bg-purple-50 dark:bg-purple-950/20', text: 'text-purple-700 dark:text-purple-300', icon: '🌙', label: 'MAIN COURSE' },
    dessert: { gradient: 'from-pink-500 to-rose-500', bg: 'bg-pink-50 dark:bg-pink-950/20', text: 'text-pink-700 dark:text-pink-300', icon: '🍰', label: 'DESSERT' },
    snack: { gradient: 'from-green-500 to-emerald-500', bg: 'bg-green-50 dark:bg-green-950/20', text: 'text-green-700 dark:text-green-300', icon: '🍿', label: 'SNACK' }
  };

  const difficultyConfig: Record<string, any> = {
    easy: { color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/20', label: 'Easy' },
    medium: { color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/20', label: 'Medium' },
    hard: { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/20', label: 'Hard' }
  };

  const myRecipes = recipes.filter((recipe) => likedRecipes.has(recipe.id));

  const stats = useMemo(() => {
    const totalRecipes = myRecipes.length;
    const breakfastCount = myRecipes.filter(r => r.category === 'breakfast').length;
    const dinnerCount = myRecipes.filter(r => r.category === 'dinner').length;
    const dessertCount = myRecipes.filter(r => r.category === 'dessert').length;

    return { totalRecipes, breakfastCount, dinnerCount, dessertCount };
  }, [myRecipes]);

  const filteredRecipes = myRecipes.filter(recipe => {
    const matchesSearch = 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterCategory === 'all' || recipe.category === filterCategory;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-20">
        
        {/* --- HEADER SECTION --- */}
        {/* FIXED: Added 'md:flex-row' to make it horizontal on desktop */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-6 h-6 md:w-8 md:h-8 text-red-500 fill-current" />
              <h1 className="text-3xl md:text-5xl tracking-tight text-slate-900 dark:text-white font-bold">My Recipes</h1>
            </div>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">Your favorite recipes in one place</p>
          </div>
          
          {/* FIXED: Wrapped button in w-full md:w-auto container */}
          <div className="w-full md:w-auto">
            <button
              onClick={() => setIsAddModalOpen(!isAddModalOpen)}
              className="w-full md:w-auto group flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-500/20 transition-all font-medium"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              {isAddModalOpen ? 'Close' : 'Add Recipe'}
            </button>
          </div>
        </div>

        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          {[
            { label: 'Saved Recipes', value: stats.totalRecipes, color: 'bg-red-100 dark:bg-red-500/20' },
            { label: 'Breakfast', value: stats.breakfastCount, color: 'bg-orange-100 dark:bg-orange-500/20' },
            { label: 'Dinner', value: stats.dinnerCount, color: 'bg-purple-100 dark:bg-purple-500/20' },
            { label: 'Desserts', value: stats.dessertCount, color: 'bg-pink-100 dark:bg-pink-500/20' },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-4 md:p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-12 h-12 ${stat.color} rounded-bl-full`}></div>
              <div className="flex flex-col items-center relative z-10">
                <div className="text-3xl md:text-4xl text-slate-900 dark:text-white mb-1 md:mb-2 font-bold">{stat.value}</div>
                <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* --- CONTROLS BAR --- */}
        {/* FIXED: Added 'md:flex-row' to force side-by-side layout on desktop */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          
          {/* 1. Search & Filter (Flex-1 fills remaining space on left) */}
          <div className="w-full flex-1 flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 shadow-sm transition-colors">
            <Search className="w-5 h-5 text-slate-400 flex-shrink-0 mr-3" />
            <input
              type="text"
              placeholder="Search your saved recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none text-slate-900 dark:text-white placeholder-slate-400 min-w-0"
            />
            
            {/* Desktop Filter (Inside Search Pill) */}
            <div className="hidden md:flex items-center">
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-4"></div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-transparent focus:outline-none text-slate-900 dark:text-white text-sm font-medium cursor-pointer hover:text-emerald-600 transition-colors"
              >
                <option value="all">All Categories</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="dessert">Dessert</option>
                <option value="snack">Snack</option>
              </select>
            </div>
          </div>

          {/* 2. Mobile Filter Dropdown (Visible only on Mobile) */}
          <div className="md:hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 shadow-sm">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-slate-900 dark:text-white text-sm font-medium"
            >
              <option value="all">All Categories</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="dessert">Dessert</option>
              <option value="snack">Snack</option>
            </select>
          </div>

          {/* 3. View Toggles (Visible only on Desktop) */}
          <div className="hidden md:flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1.5 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Add Recipe Modal */}
        {isAddModalOpen && (
          <AddRecipeModal 
            onClose={() => setIsAddModalOpen(false)} 
            onAdd={(recipe) => {
              addRecipe(recipe);
              setIsAddModalOpen(false);
            }}
          />
        )}

        {/* RECIPE DISPLAY */}
        {filteredRecipes.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 md:p-20 text-center border border-slate-200 dark:border-slate-800">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-950/30 dark:to-pink-950/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl md:text-2xl text-slate-900 dark:text-white mb-2">No saved recipes yet</h3>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8">
              {searchTerm || filterCategory !== 'all' 
                ? 'No recipes match your search' 
                : 'Start exploring recipes and save your favorites!'}
            </p>
            {!searchTerm && filterCategory === 'all' && (
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl hover:shadow-xl hover:shadow-emerald-500/25 transition-all font-medium"
              >
                Browse All Recipes
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* GRID VIEW (Desktop Only) */}
            <div className={`${viewMode === 'grid' ? 'hidden md:grid' : 'hidden'} grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
              {filteredRecipes.map(recipe => {
                const categoryStyles = categoryConfig[recipe.category] || categoryConfig.dinner;
                const difficultyStyles = difficultyConfig[recipe.difficulty];
                
                return (
                  <div key={recipe.id} className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <button onClick={(e) => { e.stopPropagation(); toggleLike(recipe.id); }} className="absolute top-3 right-3 p-2 rounded-xl bg-red-500 text-white transition-all backdrop-blur-sm hover:scale-110 z-10">
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                    <Link href={`/recipe/${recipe.id}`} className="block p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`flex items-center gap-2 px-3 py-1.5 ${categoryStyles.bg} rounded-full`}>
                          <span>{categoryStyles.icon}</span>
                          <span className={`text-xs md:text-sm capitalize ${categoryStyles.text}`}>{recipe.category}</span>
                        </div>
                      </div>
                      <h3 className="text-lg md:text-xl mb-2 text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">{recipe.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{recipe.cuisine} Cuisine</p>
                      <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed text-sm">{recipe.description}</p>
                      <div className="flex items-center gap-4 text-xs md:text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /><span>{recipe.prepTime}</span></div>
                        <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /><span>{recipe.servings}</span></div>
                        <div className={`px-2.5 py-1 ${difficultyStyles.bg} rounded-lg`}><span className={`text-xs capitalize ${difficultyStyles.color}`}>{recipe.difficulty}</span></div>
                      </div>
                    </Link>
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryStyles.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`}></div>
                  </div>
                );
              })}
            </div>

            {/* LIST VIEW (Visible on Mobile ALWAYS, or Desktop if List Mode) */}
            <div className={`space-y-4 ${viewMode === 'list' ? 'block' : 'md:hidden'}`}>
              {filteredRecipes.map(recipe => {
                const categoryStyles = categoryConfig[recipe.category] || categoryConfig.dinner;
                const difficultyStyles = difficultyConfig[recipe.difficulty];
                
                return (
                  <div key={recipe.id} className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-emerald-500/10 transition-all">
                    <div className="flex items-center gap-4 md:gap-6 p-4">
                      <div className="relative w-20 h-20 md:w-28 md:h-28 flex-shrink-0 rounded-2xl overflow-hidden">
                        <ImageWithFallback src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleLike(recipe.id); }} className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500 text-white transition-all backdrop-blur-sm hover:scale-110">
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                      <Link href={`/recipe/${recipe.id}`} className="flex-1 min-w-0">
                        <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">{categoryStyles.label}</div>
                        <h3 className="text-base md:text-lg text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 transition-colors">{recipe.title}</h3>
                        <p className="text-sm text-slate-500 line-clamp-1">{recipe.description}</p>
                      </Link>
                      <div className="hidden md:flex items-center gap-8 text-sm">
                        <div className="text-center"><div className="text-slate-900 dark:text-white mb-1">{recipe.prepTime}</div><div className="text-xs text-slate-500">Time</div></div>
                        <div className="text-center"><div className="text-slate-900 dark:text-white mb-1">{recipe.servings}</div><div className="text-xs text-slate-500">Servings</div></div>
                        <div className="text-center min-w-[80px]"><div className={`${difficultyStyles.color} mb-1`}>{difficultyStyles.label}</div><div className="text-xs text-slate-500">Difficulty</div></div>
                      </div>
                      <div className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <Link href={`/recipe/${recipe.id}`} className="flex-1 min-w-0">
                          <MoreVertical className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
            {/* --- FOOTER SECTION --- */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 md:pt-20 pb-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">FreshBites</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm leading-relaxed text-sm">
                Celebrating the art of Korean cooking. We bring authentic flavors and modern techniques to your kitchen.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-emerald-500 hover:text-white transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-emerald-500 hover:text-white transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-emerald-500 hover:text-white transition-all">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:col-span-2">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-6">Discover</h3>
                <ul className="space-y-4 text-sm">
                  <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors">All Recipes</a></li>
                  <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors">Popular</a></li>
                  <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors">Video Tutorials</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-6">Company</h3>
                <ul className="space-y-4 text-sm">
                  <li><Link href="/about" className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors">About Us</Link></li>
                  <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors">Contact</a></li>
                  <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              &copy; 2025 FreshBites. Made with ❤️ in Korea.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-emerald-500">Terms</a>
              <a href="#" className="hover:text-emerald-500">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}