import React from 'react';
import { motion } from 'motion/react';
import { personalInfo } from '../data/portfolioData';
import { 
  Target, 
  BarChart2, 
  Award, 
  BookOpen, 
  Sparkles, 
  TrendingUp, 
  ArrowRight,
  Quote,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';

export default function About() {
  const mindsets = [
    {
      title: 'Marketing Thinking',
      description: 'Understanding buyer psychology, audience positioning, SEO discovery, and conversion funnels.',
      icon: <Target className="w-4 h-4 text-[#1A3636] dark:text-[#D6BD98]" />
    },
    {
      title: 'Analytics Mindset',
      description: 'Using quantitative metrics, Power BI dashboards, and campaign data to test and validate decisions.',
      icon: <BarChart2 className="w-4 h-4 text-[#1A3636] dark:text-[#D6BD98]" />
    },
    {
      title: 'Growth Focused',
      description: 'Iterating through hands-on live projects, outbound B2B pipelines, and team event leadership.',
      icon: <TrendingUp className="w-4 h-4 text-[#1A3636] dark:text-[#D6BD98]" />
    }
  ];

  const animateFadeUp = {
    hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as any } 
    }
  };

  return (
    <section id="about" aria-labelledby="about-heading" className="py-14 sm:py-20 bg-transparent relative overflow-hidden">
      {/* Matrix background */}
      <div className="absolute inset-0 matrix-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-14 space-y-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={animateFadeUp}
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/80 dark:bg-[#1A3636]/70 border border-[#40534C]/20 dark:border-[#D6BD98]/25 rounded-full text-[#1A3636] dark:text-[#D6BD98] text-xs font-semibold uppercase tracking-[0.24em] shadow-2xs backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#677D6A] dark:text-[#D6BD98]" />
            <span>GET TO KNOW ME</span>
          </div>
          
          <h2 id="about-heading" className="text-2xl sm:text-4xl lg:text-[42px] font-display font-bold text-brand-dark tracking-tight">
            More Than a Student, A Problem Solver
          </h2>
          <div className="w-12 h-1 bg-[#1A3636] dark:bg-[#D6BD98] mx-auto rounded-full" />
        </motion.div>

        {/* 2-Column Split: Story & Mindsets (Left) + Portrait & Quote Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Narrative & Mindset Cards */}
          <motion.div 
            className="lg:col-span-7 space-y-6 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={animateFadeUp}
          >
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-brand-dark leading-snug tracking-tight">
                Bridging marketing strategy, data intelligence, and execution to build viable commercial solutions.
              </h3>
              
              <p className="text-slate-700 dark:text-slate-200 text-base sm:text-[17px] font-sans font-normal leading-[1.8] text-balance">
                I am an MBA candidate specializing in Marketing and Business Analytics, driven by how customer behavior, digital discovery, and market research intersect. My work focuses on designing high-impact digital campaigns, building structured B2B sales pipelines, and translating business data into actionable marketing initiatives.
              </p>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Beyond digital execution, I am deeply committed to academic research and campus leadership—leading inter-collegiate events, coordinating student immersion programs, and authoring research studies in consumer psychology and digital economics.
              </p>
            </div>

            {/* 3 Core Mindsets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {mindsets.map((item) => (
                <div 
                  key={item.title}
                  className="p-4 rounded-2xl bg-white/80 dark:bg-[#1A3636]/40 border border-[#40534C]/15 dark:border-[#D6BD98]/20 shadow-xs hover:border-[#1A3636]/40 dark:hover:border-[#D6BD98]/40 transition-all duration-200 text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1A3636]/5 dark:bg-[#D6BD98]/10 flex items-center justify-center mb-2.5">
                    {item.icon}
                  </div>
                  <h4 className="font-display font-bold text-sm text-brand-dark mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Languages, Institution & Core Strengths Bar */}
            <div className="pt-4 border-t border-[#40534C]/15 dark:border-[#D6BD98]/20 flex flex-wrap items-center justify-between gap-x-6 gap-y-2.5 text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-400 dark:text-slate-400 uppercase font-bold">Institution:</span>
                <span className="text-slate-700 dark:text-slate-200">Vivekananda Institute of Management Studies (VIMS), Coimbatore</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-400 dark:text-slate-400 uppercase font-bold">Location:</span>
                <span className="text-slate-700 dark:text-slate-200">Coimbatore &amp; Sivakasi, Tamil Nadu</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-400 dark:text-slate-400 uppercase font-bold">Languages:</span>
                <span className="text-slate-700 dark:text-slate-200">Tamil (Native), English (Professional)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-400 dark:text-slate-400 uppercase font-bold">Focus:</span>
                <span className="text-[#1A3636] dark:text-[#D6BD98] font-semibold">B2B Strategy &amp; Analytics</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Quote & Visual Card */}
          <motion.div 
            className="lg:col-span-5 flex flex-col items-center justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={animateFadeUp}
          >
            <div className="w-full max-w-[380px] p-6 sm:p-7 rounded-[26px] bg-white/90 dark:bg-[#1A3636]/50 border border-[#40534C]/20 dark:border-[#D6BD98]/25 backdrop-blur-md shadow-xl relative overflow-hidden text-left space-y-5">
              
              {/* Top Card Bar */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400 dark:text-slate-400">
                  PERSONAL CREED
                </span>
                <Quote className="w-5 h-5 text-[#1A3636]/30 dark:text-[#D6BD98]/40" />
              </div>

              {/* Central Philosophy Quote */}
              <div className="space-y-3">
                <p className="font-display italic font-bold text-xl sm:text-2xl text-brand-dark leading-snug">
                  "Discipline today, success tomorrow."
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  Continuous learning, real-world experimentation, and consistency turn small milestones into enduring business value.
                </p>
              </div>

              {/* Signature Row */}
              <div className="pt-4 border-t border-[#40534C]/15 dark:border-[#D6BD98]/20 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-display font-extrabold text-sm text-[#1A3636] dark:text-[#D6BD98]">
                    Madhan Prakash
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-[#A8B8AE]">
                    MBA Candidate • Marketing & Analytics
                  </span>
                </div>
                
                <a
                  href="#academic"
                  className="inline-flex items-center text-xs font-bold text-[#1A3636] dark:text-[#D6BD98] hover:underline gap-1"
                >
                  My Journey <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
