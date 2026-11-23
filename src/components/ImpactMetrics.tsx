import React from 'react';
import { motion } from 'motion/react';
import { Users, ShoppingBag, BookOpen, Award, Sparkles, TrendingUp } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

interface MetricItem {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
  gradient: string;
  borderHover: string;
}

const metrics: MetricItem[] = [
  {
    id: 'leads',
    value: 300,
    suffix: '+',
    label: 'Qualified B2B Leads',
    description: 'Generated across manufacturing & industrial sectors using Apollo AI, LinkedIn, and market intelligence.',
    icon: <Users className="w-5 h-5 text-[#1A3636] dark:text-[#D6BD98]" />,
    tag: 'B2B Pipeline',
    gradient: 'from-[#1A3636]/10 to-[#40534C]/5 dark:from-[#D6BD98]/10 dark:to-transparent',
    borderHover: 'hover:border-[#1A3636] dark:hover:border-[#D6BD98]'
  },
  {
    id: 'sales',
    value: 150,
    suffix: '+',
    label: 'Product Units Sold',
    description: 'Direct customer conversions driven through targeted Meta ads campaigns under ₹10,000 budget.',
    icon: <ShoppingBag className="w-5 h-5 text-[#1A3636] dark:text-[#D6BD98]" />,
    tag: 'E-Commerce Growth',
    gradient: 'from-[#D6BD98]/15 to-[#B38F6F]/5 dark:from-[#D6BD98]/10 dark:to-transparent',
    borderHover: 'hover:border-[#B38F6F] dark:hover:border-[#D6BD98]'
  },
  {
    id: 'research',
    value: 3,
    suffix: '',
    label: 'Research Publications',
    description: 'Peer-reviewed studies & ISBN-indexed conference publications in marketing, digital currency & consumer behavior.',
    icon: <BookOpen className="w-5 h-5 text-[#1A3636] dark:text-[#D6BD98]" />,
    tag: 'Academic Rigor',
    gradient: 'from-[#40534C]/10 to-[#677D6A]/5 dark:from-[#40534C]/20 dark:to-transparent',
    borderHover: 'hover:border-[#40534C] dark:hover:border-[#D6BD98]'
  },
  {
    id: 'certs',
    value: 20,
    suffix: '+',
    label: 'Verified Certifications',
    description: 'Industry qualifications from Google, AICTE ATAL, HubSpot Academy, SEMrush, and IIT Madras.',
    icon: <Award className="w-5 h-5 text-[#1A3636] dark:text-[#D6BD98]" />,
    tag: 'Skill Mastery',
    gradient: 'from-[#677D6A]/10 to-[#1A3636]/5 dark:from-[#677D6A]/20 dark:to-transparent',
    borderHover: 'hover:border-[#677D6A] dark:hover:border-[#D6BD98]'
  }
];

export default function ImpactMetrics() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <section id="impact" className="py-12 sm:py-16 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/80 dark:bg-[#1A3636]/70 border border-[#40534C]/20 dark:border-[#D6BD98]/25 rounded-full text-[#1A3636] dark:text-[#D6BD98] text-xs font-semibold uppercase tracking-[0.24em] shadow-2xs backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#677D6A] dark:text-[#D6BD98]" />
            <span>REAL IMPACT IN NUMBERS</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-brand-dark tracking-tight">
            Turning Effort into Measurable Results
          </h2>
          <div className="w-12 h-1 bg-[#1A3636] dark:bg-[#D6BD98] mx-auto rounded-full mt-2" />
        </motion.div>

        {/* 4 Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className={`p-6 sm:p-7 rounded-[22px] bg-white/85 dark:bg-[#1A3636]/40 border border-[#40534C]/15 dark:border-[#D6BD98]/20 backdrop-blur-md shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden text-left ${metric.borderHover}`}
            >
              {/* Soft ambient background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-50 pointer-events-none group-hover:opacity-80 transition-opacity duration-300`} />

              <div className="space-y-4 relative z-10">
                {/* Top row: Icon + Category tag */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0F1D1D]/70 border border-[#40534C]/15 dark:border-[#D6BD98]/20 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-250">
                    {metric.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#40534C] dark:text-[#D6BD98] bg-[#1A3636]/5 dark:bg-[#D6BD98]/10 px-2 py-0.5 rounded-md border border-[#1A3636]/10 dark:border-[#D6BD98]/20">
                    {metric.tag}
                  </span>
                </div>

                {/* Big Stat Counter */}
                <div className="space-y-1 pt-1">
                  <div className="text-3xl sm:text-4xl lg:text-[44px] font-display font-extrabold text-[#1A3636] dark:text-[#D6BD98] tracking-tight leading-none flex items-baseline">
                    <AnimatedCounter target={metric.value} suffix={metric.suffix} duration={1400} />
                  </div>
                  <h3 className="font-sans font-bold text-base text-brand-dark tracking-tight leading-snug">
                    {metric.label}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {metric.description}
                </p>
              </div>

              {/* Bottom pulse bar */}
              <div className="mt-5 pt-3 border-t border-[#40534C]/10 dark:border-[#D6BD98]/15 flex items-center justify-between text-[11px] text-[#40534C] dark:text-[#D6BD98] font-medium relative z-10">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Verified Performance
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
