"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'My Recipes', path: '/dashboard' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-800/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* --- 1. LOGO (Far Left) --- */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 group z-50">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl md:rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative w-9 h-9 md:w-11 md:h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl md:rounded-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <Leaf className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              FreshBites
            </span>
          </Link>
          
          {/* --- 2. RIGHT SIDE CONTAINER (Links + Actions) --- */}
          <div className="flex items-center gap-4">
            
            {/* A. Desktop Links (Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-8 mr-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative text-sm uppercase tracking-wider transition-colors font-medium ${
                    isActive(link.path) 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* B. Dark Mode Toggle (ALWAYS VISIBLE - Shared) */}
            {/* We only render this ONCE now, so no duplicates! */}
            <button
              onClick={toggleDarkMode}
              className="p-2 md:p-2.5 rounded-lg md:rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* C. Hamburger Menu (Mobile Only) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 shadow-xl animate-in slide-in-from-top-5 z-40">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}