import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, 
  ArrowRight, 
  Mail, 
  Linkedin, 
  Youtube, 
  Instagram, 
  Phone,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { personalInfo } from '../data/portfolioData';
import AnimatedCounter from './AnimatedCounter';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export default function Hero({ onOpenResumeModal }: HeroProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Subtle 3D portrait tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Parallax translation
  const { scrollY } = useScroll();
  const rawGridY = useTransform(scrollY, [0, 600], [0, -40]);
  const gridY = prefersReducedMotion ? 0 : rawGridY;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12 lg:pt-28 lg:pb-16 overflow-hidden bg-transparent"
    >
      {/* Editorial matrix grid with subtle translation */}
      <motion.div 
        style={{ y: gridY }}
        className="absolute inset-0 matrix-grid-pattern opacity-30 pointer-events-none" 
      />

      {/* Floating ambient gradient orbs */}
      <div className="absolute top-[10%] left-[-8%] w-[380px] h-[380px] rounded-full bg-[#1A3636]/5 dark:bg-[#D6BD98]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[320px] h-[320px] rounded-full bg-[#D6BD98]/10 dark:bg-[#40534C]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Left Column: Typography Stack */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Availability Pill Badge */}
            <motion.div 
              variants={itemVariants} 
              className="inline-flex items-center space-x-2.5 px-4 py-2 bg-white/85 dark:bg-[#1A3636]/50 border border-[#1A3636]/20 dark:border-[#D6BD98]/30 rounded-full shadow-sm backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              
              <span className="text-brand-dark font-sans text-xs font-semibold tracking-wide flex items-center gap-1.5">
                <span className="bg-[#1A3636]/10 dark:bg-[#D6BD98]/15 text-[#1A3636] dark:text-[#D6BD98] px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider uppercase">Active</span>
                <span>Open to <span className="text-[#1A3636] dark:text-[#D6BD98] font-bold">Marketing & Analytics Roles</span></span>
              </span>
            </motion.div>

            {/* Title Block */}
            <div className="space-y-2.5">
              <motion.span 
                variants={itemVariants} 
                className="block text-xs font-mono font-bold tracking-[0.22em] text-[#40534C] dark:text-[#D6BD98] uppercase"
              >
                MBA Candidate | Marketing & Business Analytics
              </motion.span>
              
              <motion.h1 
                id="hero-title" 
                variants={itemVariants}
                className="text-4xl sm:text-6xl lg:text-[62px] font-display font-extrabold tracking-tight text-brand-dark leading-[1.08]"
              >
                M. Madhan Prakash
              </motion.h1>

              <motion.div variants={itemVariants} className="space-y-1 pt-1">
                <p className="text-base sm:text-lg lg:text-xl font-display font-bold text-[#1A3636] dark:text-[#D6BD98] tracking-tight">
                  B2B Sales • Digital Marketing • Market Research • Business Analytics
                </p>
              </motion.div>
            </div>

            {/* Tagline Statement */}
            <motion.p 
              id="hero-tagline" 
              variants={itemVariants}
              className="text-[15px] sm:text-[17px] text-slate-700/90 dark:text-slate-200/90 max-w-[620px] mx-auto lg:mx-0 font-normal leading-[1.8] text-balance"
            >
              Combining strategic marketing intuition, structured market research, and analytical problem-solving to build high-converting campaigns and viable commercial pipelines.
            </motion.p>

            {/* Strategic Highlight Pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              {['Digital Marketing', 'B2B Lead Gen', 'Meta Ads', 'Business Analytics', 'SEO Strategy', 'Power BI'].map((badge) => (
                <span 
                  key={badge} 
                  className="px-3.5 py-1.5 bg-white/70 dark:bg-[#1A3636]/40 border border-[#40534C]/15 dark:border-[#D6BD98]/20 rounded-full text-xs font-semibold text-brand-paragraph dark:text-[#A8B8AE] shadow-3xs"
                >
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
              <a
                id="hero-btn-work"
                href="#academic"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 bg-[#1A3636] hover:bg-[#40534C] dark:bg-[#D6BD98] dark:hover:bg-[#B38F6F] text-[#F2F1ED] dark:text-[#161616] font-semibold rounded-full text-sm tracking-wider uppercase shadow-md hover:scale-[1.02] hover:shadow-lg transition-all duration-250 ease-out active:scale-98 group min-h-[46px]"
              >
                <span>View My Journey</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-250" />
              </a>

              <button
                id="hero-btn-resume"
                onClick={onOpenResumeModal}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 bg-white/85 dark:bg-[#1A3636]/50 border border-[#40534C]/25 dark:border-[#D6BD98]/30 text-brand-dark hover:border-[#1A3636] dark:hover:border-[#D6BD98] hover:text-[#1A3636] dark:hover:text-[#D6BD98] rounded-full text-sm font-semibold hover:scale-[1.02] hover:shadow-md transition-all duration-250 ease-out cursor-pointer active:scale-98 group min-h-[46px]"
              >
                <Download className="w-4 h-4 mr-2 text-[#1A3636] dark:text-[#D6BD98] group-hover:-translate-y-0.5 transition-transform duration-250" />
                View / Download Resume
              </button>
            </motion.div>

            {/* Social Channels Row */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1 select-none">
                Connect:
              </span>
              {personalInfo.linkedin && (
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/70 dark:bg-[#1A3636]/40 border border-slate-200/60 dark:border-[#40534C]/30 hover:border-[#0077B5] text-[#0077B5] dark:text-[#3babeb] rounded-xl hover:scale-105 transition-all shadow-3xs cursor-pointer"
                  title="LinkedIn"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {personalInfo.youtube && (
                <a
                  href={personalInfo.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/70 dark:bg-[#1A3636]/40 border border-slate-200/60 dark:border-[#40534C]/30 hover:border-[#FF0000] text-[#FF0000] dark:text-[#ff3b3b] rounded-xl hover:scale-105 transition-all shadow-3xs cursor-pointer"
                  title="YouTube"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {personalInfo.instagram && (
                <a
                  href={personalInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/70 dark:bg-[#1A3636]/40 border border-slate-200/60 dark:border-[#40534C]/30 hover:border-[#E1306C] text-[#E1306C] dark:text-[#f25287] rounded-xl hover:scale-105 transition-all shadow-3xs cursor-pointer"
                  title="Instagram"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {personalInfo.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2.5 bg-white/70 dark:bg-[#1A3636]/40 border border-slate-200/60 dark:border-[#40534C]/30 hover:border-[#EA4335] text-[#EA4335] dark:text-[#ff5e50] rounded-xl hover:scale-105 transition-all shadow-3xs cursor-pointer"
                  title="Email"
                  aria-label="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          </div>

          {/* Right Column: Prominent Portrait & 4 Floating Stat Chips */}
          <motion.div 
            className="lg:col-span-5 flex flex-col items-center justify-center"
            variants={itemVariants}
          >
            <div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[360px] aspect-square flex items-center justify-center select-none"
              style={{
                perspective: 1000,
              }}
            >
              {/* Background ambient circular rings */}
              <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
                <div className="w-[110%] h-[110%] rounded-full border border-dashed border-[#1A3636]/15 dark:border-[#D6BD98]/20 animate-spin" style={{ animationDuration: '45s' }} />
                <div className="absolute inset-4 bg-gradient-to-tr from-[#1A3636]/10 to-[#D6BD98]/15 blur-2xl rounded-full opacity-70" />
              </div>

              {/* Portrait Container with 3D Tilt */}
              <motion.div
                animate={{
                  rotateX: prefersReducedMotion ? 0 : -mousePos.y * 14,
                  rotateY: prefersReducedMotion ? 0 : mousePos.x * 14,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="relative w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] rounded-full overflow-hidden border-4 border-white/90 dark:border-[#1A3636] shadow-2xl z-10 bg-[#F2F1ED] dark:bg-[#1A3636] group"
              >
                {personalInfo.avatarUrl ? (
                  <img
                    src={personalInfo.avatarUrl}
                    alt="M. Madhan Prakash — MBA candidate in Marketing and Business Analytics at Vivekananda Institute of Management Studies, Coimbatore"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    width="300"
                    height="300"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#1A3636]/20 to-[#D6BD98]/20 flex items-center justify-center text-[#1A3636] dark:text-[#D6BD98] font-display font-black text-4xl">
                    MP
                  </div>
                )}
              </motion.div>

              {/* Chip 1 (Top Left): 300+ Qualified Leads */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-2 -left-3 sm:-left-6 bg-white/95 dark:bg-[#1A3636]/95 border border-[#40534C]/20 dark:border-[#D6BD98]/30 backdrop-blur-md py-1.5 px-3.5 rounded-2xl shadow-lg flex items-center gap-2 z-20 hover:scale-105 transition-transform"
              >
                <span className="text-sm">📊</span>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[11px] font-bold text-brand-dark">
                    <AnimatedCounter target={300} suffix="+" duration={1200} />
                  </span>
                  <span className="text-[9px] text-brand-paragraph font-medium">Qualified Leads</span>
                </div>
              </motion.div>

              {/* Chip 2 (Top Right): 150+ Units Sold */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="absolute top-14 -right-3 sm:-right-8 bg-white/95 dark:bg-[#1A3636]/95 border border-[#40534C]/20 dark:border-[#D6BD98]/30 backdrop-blur-md py-1.5 px-3.5 rounded-2xl shadow-lg flex items-center gap-2 z-20 hover:scale-105 transition-transform"
              >
                <span className="text-sm">🛍️</span>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[11px] font-bold text-brand-dark">
                    <AnimatedCounter target={150} suffix="+" duration={1200} />
                  </span>
                  <span className="text-[9px] text-brand-paragraph font-medium">Units Sold</span>
                </div>
              </motion.div>

              {/* Chip 3 (Bottom Left): 3 Research Publications */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
                className="absolute bottom-10 -left-2 sm:-left-6 bg-white/95 dark:bg-[#1A3636]/95 border border-[#40534C]/20 dark:border-[#D6BD98]/30 backdrop-blur-md py-1.5 px-3.5 rounded-2xl shadow-lg flex items-center gap-2 z-20 hover:scale-105 transition-transform"
              >
                <span className="text-sm">🏆</span>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[11px] font-bold text-brand-dark">
                    <AnimatedCounter target={3} duration={1200} />
                  </span>
                  <span className="text-[9px] text-brand-paragraph font-medium">Research Papers</span>
                </div>
              </motion.div>

              {/* Chip 4 (Bottom Right): MBA Marketing */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
                className="absolute bottom-6 -right-2 sm:-right-6 bg-white/95 dark:bg-[#1A3636]/95 border border-[#40534C]/20 dark:border-[#D6BD98]/30 backdrop-blur-md py-1.5 px-3.5 rounded-2xl shadow-lg flex items-center gap-2 z-20 hover:scale-105 transition-transform"
              >
                <span className="text-sm">🎓</span>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[11px] font-bold text-brand-dark">
                    MBA Candidate
                  </span>
                  <span className="text-[9px] text-brand-paragraph font-medium">Marketing & Analytics</span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Smooth Scroll Indicator at the bottom */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-6 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 select-none z-10"
      >
        <a 
          href="#impact" 
          aria-label="Scroll to measurable marketing and analytics impact"
          className="flex flex-col items-center gap-1 group text-[11px] font-mono font-medium tracking-wider uppercase hover:text-[#1A3636] dark:hover:text-[#D6BD98] transition-colors"
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-current" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
