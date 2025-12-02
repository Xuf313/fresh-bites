"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, Clock, Users, Heart, Sparkles, Grid3x3, List, MoreVertical, ChevronDown, Leaf, Star, MessageCircle, Github, Twitter, Instagram, Send, User } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useRecipes } from '@/app/context/RecipeContext';

interface Comment {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatarColor: string;
}

export default function Home() {
  const { recipes, likedRecipes, toggleLike } = useRecipes();

  // --- STATE ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(6);
  
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: "Sarah Kim",
      role: "Home Cook",
      text: "I never thought I could make authentic Bibimbap at home, but this recipe made it so easy! The stone bowl tip changed everything.",
      rating: 5,
      avatarColor: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300"
    },
    {
      id: 2,
      name: "David Chen",
      role: "Foodie",
      text: "The Kimchi Jjigae recipe is legitimately restaurant quality. My family asks me to make it every weekend now!",
      rating: 5,
      avatarColor: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
    },
    {
      id: 3,
      name: "Emily Parker",
      role: "Beginner",
      text: "Finally, a Tteokbokki recipe that has the perfect balance of sweet and spicy. The step-by-step instructions were perfect.",
      rating: 4,
      avatarColor: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
    }
  ]);

  // --- CONFIG ---
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

  // --- HANDLERS ---
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterCategory === 'all' || recipe.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const displayedRecipes = filteredRecipes.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      name: "You",
      role: "Guest",
      text: newComment,
      rating: newRating,
      avatarColor: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setNewRating(5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 transition-colors">
      
      {/* --- HERO SECTION --- */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900"></div>
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-10 left-10 w-48 h-48 md:w-72 md:h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-20 right-10 w-48 h-48 md:w-72 md:h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full border border-emerald-200 dark:border-emerald-800 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs md:text-sm text-emerald-700 dark:text-emerald-300 font-medium">Discover Authentic Flavors</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight px-2">
            <span className="text-slate-900 dark:text-white">Taste of </span>
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">Korea</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 px-4">
            From Bibimbap to Bulgogi, browse our curated collection of traditional and modern Korean recipes.
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-20 pt-10">
        
        {/* --- CONTROLS BAR (UPDATED DESIGN) --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          
          {/* 1. Search Bar & Filter (Combined Pill - Left Side) */}
          <div className="w-full flex-1 flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 shadow-sm transition-colors">
            <Search className="w-5 h-5 text-slate-400 flex-shrink-0 mr-3" />
            <input
              type="text"
              placeholder="Search recipes..."
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

          {/* 2. Mobile Filter Dropdown (Stacked on Mobile) */}
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

          {/* 3. View Toggles (Desktop Only - Right Side) */}
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

        {/* Recipe Display */}
        {filteredRecipes.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 md:p-20 text-center border border-slate-200 dark:border-slate-800">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl md:text-2xl text-slate-900 dark:text-white mb-2">No recipes found</h3>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">Try adjusting your search</p>
          </div>
        ) : (
          <>
            {/* GRID VIEW (Desktop Only) */}
            <div className={`${viewMode === 'grid' ? 'hidden md:grid' : 'hidden'} grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
              {displayedRecipes.map(recipe => {
                const categoryStyles = categoryConfig[recipe.category] || categoryConfig.dinner;
                const difficultyStyles = difficultyConfig[recipe.difficulty];
                const isLiked = likedRecipes.has(recipe.id);
                  
                  return (
                    <div key={recipe.id} className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all">
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <button onClick={(e) => { e.stopPropagation(); toggleLike(recipe.id); }} className={`absolute top-3 right-3 p-2 rounded-xl transition-all backdrop-blur-sm z-10 ${isLiked ? 'bg-red-500 text-white' : 'bg-white/90 dark:bg-slate-900/90 text-slate-400 hover:text-red-500'}`}>
                          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
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
              {displayedRecipes.map(recipe => {
                const categoryStyles = categoryConfig[recipe.category] || categoryConfig.dinner;
                const difficultyStyles = difficultyConfig[recipe.difficulty];
                const isLiked = likedRecipes.has(recipe.id);
                
                return (
                  <div key={recipe.id} className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-emerald-500/10 transition-all">
                    <div className="flex items-center gap-4 md:gap-6 p-4">
                      {/* Recipe Image */}
                      <div className="relative w-20 h-20 md:w-28 md:h-28 flex-shrink-0 rounded-2xl overflow-hidden">
                        <ImageWithFallback src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleLike(recipe.id); }} 
                          className={`absolute top-2 right-2 p-1.5 rounded-lg transition-all backdrop-blur-sm ${isLiked ? 'bg-red-500 text-white' : 'bg-white/90 dark:bg-slate-900/90 text-slate-400 hover:text-red-500'}`}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      {/* Recipe Info */}
                      <Link href={`/recipe/${recipe.id}`} className="flex-1 min-w-0">
                        <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">{categoryStyles.label}</div>
                        <h3 className="text-base md:text-lg text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 transition-colors">{recipe.title}</h3>
                        <p className="text-sm text-slate-500 line-clamp-1">{recipe.description}</p>
                      </Link>

                      {/* Meta Info (Hidden on Mobile) */}
                      <div className="hidden md:flex items-center gap-8 text-sm">
                        <div className="text-center">
                          <div className="text-slate-900 dark:text-white mb-1">{recipe.prepTime}</div>
                          <div className="text-xs text-slate-500">Time</div>
                        </div>
                        <div className="text-center">
                          <div className="text-slate-900 dark:text-white mb-1">{recipe.servings}</div>
                          <div className="text-xs text-slate-500">Servings</div>
                        </div>
                        <div className="text-center min-w-[80px]">
                          <div className={`${difficultyStyles.color} mb-1`}>{difficultyStyles.label}</div>
                          <div className="text-xs text-slate-500">Difficulty</div>
                        </div>
                      </div>

                      {/* More Options */}
                      <div className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {filteredRecipes.length > visibleCount && (
              <div className="mt-12 text-center">
                <button onClick={handleShowMore} className="group inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-600 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm hover:shadow-lg">
                  <span>Show More Recipes</span>
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* --- COMMUNITY FEEDBACK SECTION --- */}
      <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 mb-4 shadow-sm">
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300">Community Love</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">What Our Cooks Say</h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">Join thousands of happy home chefs discovering new flavors.</p>
          </div>

          {/* Comment Input Form */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Leave a Comment</h3>
              <form onSubmit={handlePostComment}>
                <div className="mb-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your experience..."
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white placeholder-slate-400 transition-colors resize-none"
                  />
                </div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Rate:</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Guest</span>
                  <button 
                    type="submit"
                    disabled={!newComment.trim()}
                    className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
                  >
                    Post <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Comments Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative flex flex-col transition-colors">
                <div className="flex gap-1 mb-4 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < comment.rating ? "fill-current" : "text-slate-300 dark:text-slate-700"}`} />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed flex-grow text-sm md:text-base">
                  "{comment.text}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl ${comment.avatarColor}`}>
                    <User className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm md:text-base">{comment.name}</div>
                    <div className="text-xs md:text-sm text-slate-500 dark:text-slate-500">{comment.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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