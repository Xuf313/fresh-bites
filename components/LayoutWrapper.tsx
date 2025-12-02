"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  // 1. Start with a default value (false) so Server & Client match initially
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 2. Only check localStorage AFTER the component has mounted in the browser
  useEffect(() => {
    setMounted(true); // We are now on the client!
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setDarkMode(JSON.parse(saved));
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
       // Optional: Auto-detect system preference if no save found
       setDarkMode(true);
    }
  }, []);

  // 3. Update the HTML class whenever darkMode changes
  useEffect(() => {
    if (!mounted) return; // Don't run on server

    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode, mounted]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // 4. Prevent hydration mismatch by not rendering the specific icon until mounted
  // (The Navbar handles the rendering, so we just pass the safe state)
  if (!mounted) {
    // Optional: Return a loading state or just the children to prevent flash
    // For now, we render with default (light) to match server
    return (
        <div className="min-h-screen bg-slate-50 transition-colors">
            <Navbar darkMode={false} toggleDarkMode={toggleDarkMode} /> 
            {children}
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {children}
    </div>
  );
}