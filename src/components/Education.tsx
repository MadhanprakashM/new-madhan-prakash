import React from 'react';
import { educationHistory } from '../data/portfolioData';
import { Calendar, GraduationCap, Award, CheckCircle } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-24 bg-white dark:bg-[#0b101c] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-slate-600 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-blue-900 dark:text-blue-400 tracking-tight">
            Education Timeline
          </h2>
          <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            A background in Business Administration, specialized Marketing studies, and core Commerce disciplines.
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="relative max-w-4xl mx-auto pl-4 sm:pl-8 border-l border-slate-200 dark:border-slate-800 space-y-12">
          {educationHistory.map((edu, idx) => {
            return (
              <div
                id={`education-timeline-card-${edu.id}`}
                key={edu.id}
                className="relative group transition-all duration-300"
              >
                {/* Timeline Dot Indicator */}
                <div className="absolute -left-[21px] sm:-left-[37px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-4 border-orange-500 group-hover:bg-orange-500 group-hover:scale-125 transition-all duration-300 z-10" />

                {/* Info Card Grid */}
                <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/50 dark:border-slate-800/50 hover:border-orange-500/30 dark:hover:border-orange-500/20 shadow-xs hover:shadow-md transition-all duration-300">
                  
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/50">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-semibold text-[10px] uppercase tracking-wider rounded-md">
                          {idx === 0 ? 'Current Program' : 'Completed Program'}
                        </span>
                        <h3 className="text-lg sm:text-xl font-display font-bold text-blue-900 dark:text-blue-400">
                          {edu.degree}
                        </h3>
                      </div>
                      <p className="font-display font-bold text-blue-950 dark:text-blue-300 text-sm sm:text-base flex items-center">
                        {edu.institution}
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs text-slate-500 dark:text-slate-400 font-semibold space-y-1 sm:space-y-1.5">
                      <span className="flex items-center sm:justify-end text-slate-600 dark:text-slate-300">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-orange-500" />
                        {edu.period}
                      </span>
                      <span className="flex items-center sm:justify-end text-orange-600 dark:text-orange-400 font-mono text-sm">
                        <Award className="w-3.5 h-3.5 mr-1.5" />
                        {edu.grade}
                      </span>
                    </div>
                  </div>

                  {/* Highlights section if available */}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <div className="pt-4 space-y-2.5">
                      <h4 className="font-display font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
                        Core Focus & Curricular Achievements:
                      </h4>
                      <div className="space-y-2">
                        {edu.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            <CheckCircle className="w-4 h-4 mr-2.5 text-green-500 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
