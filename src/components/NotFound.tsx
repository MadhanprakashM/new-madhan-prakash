import React from 'react';
import { Compass, MoveLeft, Home, MessageSquare } from 'lucide-react';

interface NotFoundProps {
  onBackToHome: () => void;
}

export default function NotFound({ onBackToHome }: NotFoundProps) {
  return (
    <div 
      id="not-found-screen"
      className="min-h-screen bg-[#F2F1ED] dark:bg-[#0F1D1D] flex items-center justify-center p-4 sm:p-6 font-sans transition-colors duration-300 relative"
    >
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A363608_1px,transparent_1px),linear-gradient(to_bottom,#1A363608_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#D6BD9808_1px,transparent_1px),linear-gradient(to_bottom,#D6BD9808_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      
      <div 
        id="not-found-card"
        className="relative w-full max-w-lg bg-white/90 dark:bg-[#1A3636]/90 backdrop-blur-xl rounded-3xl border border-[#40534C]/15 dark:border-[#D6BD98]/20 shadow-2xl p-8 sm:p-12 text-center space-y-6"
      >
        {/* Animated Icon Container */}
        <div className="mx-auto w-20 h-20 rounded-3xl bg-[#677D6A]/10 dark:bg-[#D6BD98]/10 flex items-center justify-center text-[#1A3636] dark:text-[#D6BD98]">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        {/* 404 Heading */}
        <div className="space-y-2">
          <div className="inline-block py-1 px-3 bg-[#710014]/10 dark:bg-[#710014]/30 text-[#710014] dark:text-[#f87171] text-[10px] font-bold uppercase rounded-full w-fit">
            Error 404
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-brand-dark dark:text-[#F2F1ED] tracking-tight leading-none">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-brand-paragraph dark:text-[#A8B8AE] leading-relaxed max-w-xs mx-auto">
            The campaign route or resource directory you tried to access does not exist or has migrated to a different sector.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            id="not-found-home-btn"
            onClick={onBackToHome}
            className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-[#1A3636] hover:bg-[#40534C] dark:bg-[#D6BD98] dark:hover:bg-[#B38F6F] text-white dark:text-[#1A3636] font-bold rounded-xl text-xs transition-all shadow-sm focus:outline-none cursor-pointer"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </button>

          <a
            id="not-found-contact-btn"
            href="mailto:classictamilofficial@gmail.com"
            className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 dark:bg-[#40534C]/40 dark:hover:bg-[#40534C]/60 dark:text-[#F2F1ED] border border-[#40534C]/20 dark:border-[#D6BD98]/20 font-bold rounded-xl text-xs transition-all shadow-xs focus:outline-none cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 mr-2 text-[#D6BD98]" />
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
