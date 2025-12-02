"use client";

import { Leaf, Heart, Users, Sparkles, Award, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900"></div>
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full border border-emerald-200 dark:border-emerald-800 mb-8">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm text-emerald-700 dark:text-emerald-300">Our Story</span>
          </div>
          
          <h1 className="text-6xl lg:text-7xl mb-6 tracking-tight text-slate-900 dark:text-white font-bold">
            About <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">FreshBites</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Bringing the joy of fresh, wholesome cooking to kitchens around the world.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1717838206417-c4fe2b9fb043?auto=format&fit=crop&w=1080&q=80"
                alt="Chef cooking"
                className="w-full h-[500px] object-cover"
              />
            </div>

            <div>
              <h2 className="text-4xl lg:text-5xl mb-6 tracking-tight text-slate-900 dark:text-white font-bold">
                Our Mission
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                At FreshBites, we believe that cooking should be a joyful, accessible experience for everyone. 
                Our mission is to inspire home cooks with recipes that celebrate fresh, wholesome ingredients 
                and simple techniques that deliver extraordinary results.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Every recipe is crafted with care, tested thoroughly, and designed to help you create memorable 
                meals that nourish both body and soul. We're here to make your kitchen the heart of your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600"></div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-5xl lg:text-6xl mb-6 tracking-tight text-white font-bold">
            Join Our Community
          </h2>
          <p className="text-xl text-emerald-50 mb-12 max-w-2xl mx-auto">
            Discover recipes that will transform your cooking and bring joy to your table.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-emerald-600 rounded-2xl hover:bg-emerald-50 transition-all shadow-2xl text-lg font-bold"
          >
            Explore All Recipes
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-black py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl text-white font-bold">FreshBites</span>
            </div>
            <p className="text-slate-400">
              &copy; 2025 FreshBites. Cooking made fresh & simple.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}