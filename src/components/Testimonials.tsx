import React from 'react';
import { testimonials } from '../data/portfolioData';
import { Quote, Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-transparent relative overflow-hidden border-t border-[#40534C]/15 dark:border-[#D6BD98]/15">
      {/* Editorial matrix grid overlays */}
      <div className="absolute inset-0 matrix-grid-pattern opacity-35 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#1A3636]/5 dark:bg-[#D6BD98]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/80 dark:bg-[#1A3636]/70 border border-[#40534C]/20 dark:border-[#D6BD98]/25 rounded-full text-[#1A3636] dark:text-[#D6BD98] text-xs font-semibold uppercase tracking-[0.24em] shadow-2xs backdrop-blur-md">
            <span>Endorsements</span>
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-display font-bold text-brand-dark tracking-[-0.03em] leading-tight">
            Reference Testimonials
          </h2>
          <div className="w-12 h-1 bg-[#1A3636] dark:bg-[#D6BD98] mx-auto rounded-full" />
          <p className="text-slate-700/85 dark:text-slate-300/85 text-[16px] sm:text-[18px] font-sans font-normal leading-relaxed max-w-[680px] mx-auto">
            Professional feedback and academic character recommendations from campaign sponsors, founders, and academic partners.
          </p>
        </div>

        {/* Centered Single Testimonial Layout */}
        <div className="max-w-2xl mx-auto">
          {testimonials.map((test) => {
            return (
              <div
                id={`testimonial-card-${test.id}`}
                key={test.id}
                className="p-8 sm:p-12 rounded-3xl bg-white/80 dark:bg-[#1A3636]/40 border border-[#40534C]/15 dark:border-[#D6BD98]/20 shadow-xs hover:border-[#1A3636]/30 dark:hover:border-[#D6BD98]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group overflow-hidden backdrop-blur-md"
              >
                {/* Soft gradient glow in background on hover */}
                <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-[#D6BD98] blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

                {/* Quote Icon Overlay */}
                <div className="absolute top-8 right-8 text-slate-100 dark:text-white/5 group-hover:text-[#1A3636]/10 dark:group-hover:text-[#D6BD98]/10 transition-colors duration-300">
                  <Quote className="w-16 h-16 transform rotate-180" />
                </div>

                <div className="space-y-6 relative z-10">
                  {/* Star rating row */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-[#B38F6F] text-[#B38F6F] dark:fill-[#D6BD98] dark:text-[#D6BD98]" />
                    ))}
                  </div>

                  {/* Feedback text */}
                  <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed italic font-medium">
                    "{test.feedback}"
                  </p>
                </div>

                {/* Profile Card Footer */}
                <div className="flex items-center space-x-4 pt-6 border-t border-[#40534C]/10 dark:border-[#D6BD98]/15 mt-8 relative z-10">
                  {/* Letter Avatar */}
                  <div className="w-12 h-12 rounded-full bg-[#1A3636] dark:bg-[#D6BD98] text-white dark:text-[#1A3636] flex items-center justify-center font-display font-bold text-base shadow-inner shrink-0">
                    {test.avatarLetter}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="font-display font-bold text-brand-dark text-sm sm:text-base">
                      {test.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-[#A8B8AE]">
                      {test.role} at <span className="font-semibold text-slate-700 dark:text-slate-300">{test.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
