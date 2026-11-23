import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { experiences } from '../data/portfolioData';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Award,
  Video,
  Users,
  Trophy,
  Megaphone,
  Landmark,
  TrendingUp,
  ChevronLeft
} from 'lucide-react';
import { TabSwitcher, AnimatedPanel } from './InteractiveComponents';

type FilterType = 'all' | 'internship' | 'live-project' | 'work' | 'leadership';

const timelineMilestones = [
  {
    year: '2021',
    period: 'Jan 2021 - Present',
    role: 'YouTube Creator & Video Producer',
    company: 'Classic Tamil Channel',
    icon: Video,
    unlockedSkill: 'YouTube SEO & Audience Analytics',
    description: 'Built sports gaming channel to 93.5K+ views and 717+ subscribers with 48 videos using Canva and CapCut.',
    type: 'content',
    color: 'from-[#40534C] to-[#1A3636]',
    accentColor: 'text-[#1A3636] dark:text-[#D6BD98] bg-[#1A3636]/10 border-[#1A3636]/20 dark:border-[#D6BD98]/30'
  },
  {
    year: '2021',
    period: '2021 - 2022',
    role: 'NSS Blood Donation Camp Leader',
    company: 'National Service Scheme',
    icon: Users,
    unlockedSkill: 'Logistics & Volunteer Mobilization',
    description: 'Coordinated regional donor drives, managed volunteer committees, and practiced public mobilization.',
    type: 'leadership',
    color: 'from-[#710014] to-[#B38F6F]',
    accentColor: 'text-[#710014] dark:text-[#D6BD98] bg-[#710014]/10 border-[#710014]/20 dark:border-[#710014]/30'
  },
  {
    year: '2024',
    period: '2024 - Present',
    role: 'Member',
    company: 'Young Indians (YI)',
    icon: Users,
    unlockedSkill: 'Youth Leadership & Networking',
    description: 'Active member participating in youth and professional leadership ecosystems, community initiatives, and corporate networking.',
    type: 'leadership',
    color: 'from-[#677D6A] to-[#40534C]',
    accentColor: 'text-[#40534C] dark:text-[#D6BD98] bg-[#40534C]/10 border-[#40534C]/20 dark:border-[#D6BD98]/30'
  },
  {
    year: '2024',
    period: '2024',
    role: 'Adzap Competition Champion',
    company: 'Ayya Nadar College & Regionals',
    icon: Trophy,
    unlockedSkill: 'Ad Strategy & Creative Pitching',
    description: 'Won 1st Prize in Adzap, designing marketing strategy and presenting ad campaigns on-the-spot under intense pressure.',
    type: 'leadership',
    color: 'from-[#B38F6F] to-[#D6BD98]',
    accentColor: 'text-[#B38F6F] bg-[#B38F6F]/10 border-[#B38F6F]/20 dark:border-[#B38F6F]/30'
  },
  {
    year: '2024',
    period: '2024',
    role: 'RYLA Entrepreneurship Scholar',
    company: 'Rotary International',
    icon: Award,
    unlockedSkill: 'Business Model Pitching',
    description: 'Selected for intensive leadership camp. Collaborated with a group of 5 to draft and pitch a startup concept to a panel of entrepreneurs.',
    type: 'leadership',
    color: 'from-[#40534C] to-[#677D6A]',
    accentColor: 'text-[#40534C] dark:text-[#D6BD98] bg-[#40534C]/10 border-[#40534C]/20 dark:border-[#D6BD98]/30'
  },
  {
    year: '2024',
    period: 'Jun 2024 - Jan 2026',
    role: 'Freelance Video Editor & Advisor',
    company: 'Mosi Trading Company',
    icon: Briefcase,
    unlockedSkill: 'Engagement Pacing & Reel SEO',
    description: 'Edited 15+ educational finance videos and reels, structuring scripts and pacing to maximize watch retention.',
    type: 'content',
    color: 'from-[#677D6A] to-[#40534C]',
    accentColor: 'text-[#677D6A] dark:text-[#D6BD98] bg-[#677D6A]/10 border-[#677D6A]/20 dark:border-[#677D6A]/30'
  },
  {
    year: '2025',
    period: '2025 - Present',
    role: 'Student Coordinator',
    company: 'VIP - VIMS Immersion Programme',
    icon: Users,
    unlockedSkill: 'Peer Learning & Executive Presentations',
    description: 'Coordinated student-led immersion sessions; delivered presentations on the Nike Fall & Rise Case Study and the Ikigai framework.',
    type: 'leadership',
    color: 'from-[#1A3636] to-[#40534C]',
    accentColor: 'text-[#1A3636] dark:text-[#D6BD98] bg-[#1A3636]/10 border-[#1A3636]/20 dark:border-[#D6BD98]/30'
  },
  {
    year: '2025',
    period: 'Dec 2025 - Feb 2026',
    role: 'Digital Marketing Live Project',
    company: 'Vetikaaran',
    icon: Megaphone,
    unlockedSkill: 'Meta Ads & Campaign Optimization',
    description: 'Managed 4 Meta Ads campaigns on a ₹10,000 budget, achieving 2.5M+ views and 150+ product sales.',
    type: 'marketing',
    color: 'from-[#1A3636] to-[#677D6A]',
    accentColor: 'text-[#1A3636] dark:text-[#D6BD98] bg-[#1A3636]/10 border-[#1A3636]/20 dark:border-[#D6BD98]/30'
  },
  {
    year: '2026',
    period: '2026',
    role: 'IPL Auction Event – 2nd Prize',
    company: 'PSG College of Arts and Science',
    icon: Trophy,
    unlockedSkill: 'Valuation & Auction Strategy',
    description: 'Secured 2nd Prize in the IPL Auction event, demonstrating strategic bidding, player valuation analysis, and team budget optimization under constraints.',
    type: 'leadership',
    color: 'from-[#B38F6F] to-[#D6BD98]',
    accentColor: 'text-[#B38F6F] bg-[#B38F6F]/10 border-[#B38F6F]/20 dark:border-[#B38F6F]/30'
  },
  {
    year: '2026',
    period: 'Feb 2026',
    role: 'Overall Event Coordinator',
    company: 'VIMSMART 2K26 Intercollege Festival',
    icon: Landmark,
    unlockedSkill: 'Large-scale Project Management',
    description: 'Led student team of 80 volunteers across 17 teams for 400+ participants and won Best Event Manager Award.',
    type: 'leadership',
    color: 'from-[#40534C] to-[#1A3636]',
    accentColor: 'text-[#40534C] dark:text-[#D6BD98] bg-[#40534C]/10 border-[#40534C]/20 dark:border-[#D6BD98]/30'
  },
  {
    year: '2026',
    period: 'Jun 2026 - Jul 2026',
    role: 'B2B Sales & Market Research Intern',
    company: 'Bruhat Logistics',
    icon: TrendingUp,
    unlockedSkill: 'B2B Lead Sourcing & ERP Tools',
    description: 'Researched 500+ manufacturing companies and built a verified 300+ qualified B2B lead database using Apollo AI and LinkedIn.',
    type: 'internship',
    color: 'from-[#1A3636] to-[#40534C]',
    accentColor: 'text-[#1A3636] dark:text-[#D6BD98] bg-[#1A3636]/10 border-[#1A3636]/20 dark:border-[#D6BD98]/30'
  }
];

export default function Experience() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAllCards, setShowAllCards] = useState<boolean>(false);

  // Scroll logic states
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const filteredExp =
    filter === 'all'
      ? experiences
      : experiences.filter((exp) => exp.type === filter);

  // Scroll milestones
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 340 : scrollLeft + 340;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      const timer = setTimeout(checkScroll, 300);
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
        clearTimeout(timer);
      };
    }
  }, []);

  useEffect(() => {
    if (filteredExp.length > 0) {
      setExpandedId(filteredExp[0].id);
    } else {
      setExpandedId(null);
    }
    setShowAllCards(false);
  }, [filter]);

  const tabs: { id: FilterType; label: string }[] = [
    { label: 'All Experience', id: 'all' },
    { label: 'Internships', id: 'internship' },
    { label: 'Live Projects', id: 'live-project' },
    { label: 'Content Work', id: 'work' },
    { label: 'Leadership', id: 'leadership' },
  ];

  const animateFadeUp = {
    hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any } 
    }
  };

  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-10 sm:py-14 md:py-16 bg-transparent relative overflow-hidden">
      {/* Background Matrix Grid Overlay */}
      <div className="absolute inset-0 matrix-grid-pattern opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-8 md:mb-10 space-y-2 md:space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={animateFadeUp}
        >
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/70 dark:bg-[#1A3636]/60 border border-[#40534C]/20 dark:border-[#D6BD98]/25 rounded-full text-[#1A3636] dark:text-[#D6BD98] text-xs font-semibold uppercase tracking-[0.2em] shadow-2xs backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#677D6A] dark:text-[#D6BD98]" />
            <span>WORK & PRACTICAL EXPERIENCE</span>
          </div>
          <h2 id="experience-heading" className="text-2xl sm:text-4xl lg:text-[42px] font-display font-bold text-brand-dark tracking-tight">
            Learning by Doing, Delivering Real Results
          </h2>
          <div className="w-12 h-1 bg-[#1A3636] dark:bg-[#D6BD98] mx-auto rounded-full" />
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto pt-1">
            Internships, practical projects, and lead generation initiatives where marketing meets execution.
          </p>
        </motion.div>

        {/* Horizontal Milestone Tracker */}
        <div className="max-w-7xl mx-auto mb-10 sm:mb-12 relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div className="text-left">
              <h3 className="font-display font-bold text-brand-dark text-base sm:text-lg tracking-tight flex items-center">
                <Sparkles className="w-4 h-4 text-[#1A3636] dark:text-[#D6BD98] mr-2 animate-pulse" />
                Career Milestones & Skills Unlocked
              </h3>
              <p className="text-brand-paragraph text-xs font-medium">
                Horizontal timeline showing practical skill progression across internships, projects, and leadership roles.
              </p>
            </div>
            
            {/* Slider controls */}
            <div className="flex items-center space-x-2 self-end sm:self-auto">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`p-2 rounded-xl border border-[#40534C]/20 dark:border-[#D6BD98]/25 bg-white/70 dark:bg-[#1A3636]/70 backdrop-blur-md text-slate-700 dark:text-slate-300 transition-all focus:outline-none min-w-[38px] min-h-[38px] flex items-center justify-center cursor-pointer ${
                  !canScrollLeft ? 'opacity-35 cursor-not-allowed' : 'hover:bg-[#1A3636]/5 hover:border-[#1A3636]/30 dark:hover:bg-[#D6BD98]/10 active:scale-95'
                }`}
                title="Scroll Left"
                aria-label="Scroll career milestones left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`p-2 rounded-xl border border-[#40534C]/20 dark:border-[#D6BD98]/25 bg-white/70 dark:bg-[#1A3636]/70 backdrop-blur-md text-slate-700 dark:text-slate-300 transition-all focus:outline-none min-w-[38px] min-h-[38px] flex items-center justify-center cursor-pointer ${
                  !canScrollRight ? 'opacity-35 cursor-not-allowed' : 'hover:bg-[#1A3636]/5 hover:border-[#1A3636]/30 dark:hover:bg-[#D6BD98]/10 active:scale-95'
                }`}
                title="Scroll Right"
                aria-label="Scroll career milestones right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Timeline Horizontal Container */}
          <div className="relative">
            <div className="absolute top-[38px] left-8 right-8 h-[2px] bg-gradient-to-r from-[#1A3636]/10 via-[#1A3636]/40 dark:via-[#D6BD98]/40 to-[#40534C]/10 z-0 hidden md:block" />

            <div
              ref={scrollRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none scroll-smooth snap-x snap-mandatory relative z-10 pb-3 px-1"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {timelineMilestones.map((milestone, idx) => {
                const IconComponent = milestone.icon;
                return (
                  <div
                    key={idx}
                    className="snap-center shrink-0 min-w-[260px] sm:min-w-[290px] max-w-[290px] flex flex-col pt-8 relative group"
                  >
                    <div className="absolute top-[26px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-white dark:bg-[#1A3636] border-[3px] border-[#1A3636] dark:border-[#D6BD98] group-hover:border-[#40534C] transition-all duration-300 group-hover:scale-125 relative shadow-md">
                        <div className="absolute inset-0 rounded-full bg-[#1A3636] dark:bg-[#D6BD98] opacity-0 group-hover:opacity-30 group-hover:animate-ping" />
                      </div>
                      <div className="w-[1.5px] h-4 bg-gradient-to-b from-[#1A3636] dark:from-[#D6BD98] to-[#1A3636]/20 opacity-60 group-hover:h-6 transition-all duration-300" />
                    </div>

                    <div className="p-4.5 rounded-[20px] bg-white/70 dark:bg-[#1A3636]/40 border border-[#40534C]/15 dark:border-[#D6BD98]/20 hover:border-[#1A3636]/40 dark:hover:border-[#D6BD98]/40 backdrop-blur-md hover:bg-white/90 dark:hover:bg-[#1A3636]/80 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between h-[240px] select-none">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-display font-black text-lg tracking-tight text-[#1A3636] dark:text-[#D6BD98]">
                            {milestone.year}
                          </span>
                          <div className={`p-1.5 rounded-xl border ${milestone.accentColor} shadow-3xs group-hover:scale-105 transition-transform duration-300`}>
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs sm:text-sm font-display font-bold text-brand-dark leading-tight group-hover:text-[#1A3636] dark:group-hover:text-[#D6BD98] transition-colors">
                            {milestone.role}
                          </h4>
                          <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-[#A8B8AE] mt-0.5 block truncate">
                            {milestone.company}
                          </span>
                        </div>

                        <div>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-[#1A3636]/5 dark:bg-[#D6BD98]/10 border border-[#1A3636]/10 dark:border-[#D6BD98]/20 text-[#1A3636] dark:text-[#D6BD98]">
                            🔑 {milestone.unlockedSkill}
                          </span>
                        </div>

                        <p className="text-xs text-brand-paragraph leading-relaxed line-clamp-3">
                          {milestone.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#40534C]/10 dark:border-[#D6BD98]/15 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                        <span>{milestone.period}</span>
                        <span className="font-mono text-slate-500 dark:text-slate-300 bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded text-[9px]">
                          0{idx + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filter Tab Switcher */}
        <div className="mb-8">
          <TabSwitcher
            idPrefix="experience"
            tabs={tabs}
            activeTab={filter}
            onChange={(val) => setFilter(val)}
            ariaLabel="Experience Category Filters"
          />
        </div>

        {/* Experience Cards */}
        <AnimatedPanel activeKey={filter}>
          {/* Desktop Timeline View (>= 768px) */}
          <div className="hidden md:block relative pl-8 border-l-2 border-[#40534C]/20 dark:border-[#D6BD98]/30 space-y-8 text-left max-w-4xl mx-auto">
            {filteredExp.map((exp) => (
              <div
                key={exp.id}
                className="relative group"
              >
                {/* Timeline Dot Indicator */}
                <div className="absolute -left-[41px] top-2 w-4 h-4 rounded-full bg-white dark:bg-[#1A3636] border-4 border-[#1A3636] dark:border-[#D6BD98] group-hover:bg-[#1A3636] dark:group-hover:bg-[#D6BD98] group-hover:scale-125 transition-all duration-300 z-10" />

                {/* Info Card */}
                <div className="p-6 sm:p-7 rounded-[24px] bg-white/70 dark:bg-[#1A3636]/40 border border-[#40534C]/15 dark:border-[#D6BD98]/20 backdrop-blur-md hover:bg-white/95 dark:hover:bg-[#1A3636]/70 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out">
                  
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 pb-4 border-b border-[#40534C]/10 dark:border-[#D6BD98]/15">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 border font-bold text-[10px] uppercase tracking-wider rounded-md ${
                          exp.type === 'leadership' 
                            ? 'bg-[#B38F6F]/10 dark:bg-[#B38F6F]/20 border-[#B38F6F]/30 text-[#B38F6F] dark:text-[#D6BD98]' 
                            : 'bg-[#1A3636]/5 dark:bg-[#D6BD98]/10 border-[#1A3636]/15 dark:border-[#D6BD98]/20 text-[#1A3636] dark:text-[#D6BD98]'
                        }`}>
                          {exp.id === 'exp_intercollege_prize' || exp.id === 'exp_ryla' ? 'Leadership Award' : exp.type.replace('-', ' ')}
                        </span>
                        <h3 className="text-lg sm:text-xl font-display font-bold text-brand-dark">
                          {exp.role}
                        </h3>
                      </div>
                      <p className="font-display font-bold text-[#1A3636] dark:text-[#D6BD98] text-sm flex items-center">
                        <Briefcase className="w-3.5 h-3.5 mr-1.5" />
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs text-brand-paragraph font-medium space-y-1 shrink-0">
                      <span className="flex items-center font-semibold text-brand-dark">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#1A3636] dark:text-[#D6BD98]" />
                        {exp.period}
                      </span>
                      <span className="flex items-center text-slate-400 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 mr-1.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="py-4 space-y-2.5">
                    {exp.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start text-xs sm:text-sm text-brand-paragraph leading-relaxed">
                        <ChevronRight className="mt-1 mr-2.5 w-4 h-4 text-[#1A3636] dark:text-[#D6BD98] shrink-0" />
                        <p className="font-normal">{bullet}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#40534C]/10 dark:border-[#D6BD98]/15">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/80 dark:bg-[#40534C]/30 border border-[#40534C]/15 dark:border-[#D6BD98]/20 text-brand-paragraph text-xs rounded-full font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Mobile Accordion View (< 768px) */}
          <div className="block md:hidden space-y-3.5 text-left max-w-xl mx-auto">
            {filteredExp.slice(0, 3).map((exp) => {
              const isExpanded = expandedId === exp.id;
              return (
                <div
                  key={exp.id}
                  className="rounded-[24px] border border-[#40534C]/15 dark:border-[#D6BD98]/20 bg-white/70 dark:bg-[#1A3636]/40 backdrop-blur-md overflow-hidden transition-all duration-250 shadow-2xs"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                    className="w-full text-left p-4.5 flex items-start justify-between gap-3 focus:outline-none cursor-pointer min-h-[48px]"
                    aria-expanded={isExpanded}
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`px-2 py-0.5 border font-bold text-[9px] uppercase tracking-wider rounded-md shrink-0 ${
                          exp.type === 'leadership' 
                            ? 'bg-[#B38F6F]/10 dark:bg-[#B38F6F]/20 border-[#B38F6F]/30 text-[#B38F6F] dark:text-[#D6BD98]' 
                            : 'bg-[#1A3636]/5 dark:bg-[#D6BD98]/10 border-[#1A3636]/15 text-[#1A3636] dark:text-[#D6BD98]'
                        }`}>
                          {exp.id === 'exp_intercollege_prize' || exp.id === 'exp_ryla' ? 'Leadership' : exp.type.replace('-', ' ')}
                        </span>
                        <h3 className="text-base font-display font-bold text-brand-dark truncate">
                          {exp.role}
                        </h3>
                      </div>
                      <p className="font-display font-bold text-[#1A3636] dark:text-[#D6BD98] text-xs">
                        {exp.company}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 pt-0.5 text-[11px] text-slate-500 dark:text-[#A8B8AE] font-medium">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1 text-[#1A3636] dark:text-[#D6BD98] shrink-0" />
                          {exp.period}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1 text-slate-400 shrink-0" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 p-1.5 rounded-xl bg-black/5 dark:bg-white/5 text-slate-500 mt-0.5">
                      <ChevronDown className={`w-4 h-4 transition-transform duration-250 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-4.5 pb-4.5 pt-1 border-t border-[#40534C]/10 dark:border-[#D6BD98]/15 space-y-3">
                          <div className="space-y-2 pt-2">
                            {exp.bullets.map((bullet, bIdx) => (
                              <div key={bIdx} className="flex items-start text-xs sm:text-sm text-brand-paragraph leading-relaxed">
                                <ChevronRight className="mt-0.5 mr-2 w-3.5 h-3.5 text-[#1A3636] dark:text-[#D6BD98] shrink-0" />
                                <p className="font-normal">{bullet}</p>
                              </div>
                            ))}
                          </div>

                          {exp.tags && exp.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#40534C]/10 dark:border-[#D6BD98]/15">
                              {exp.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2.5 py-0.5 bg-white dark:bg-[#40534C]/40 border border-[#40534C]/15 dark:border-[#D6BD98]/20 text-brand-paragraph text-[10px] rounded-full font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Remaining cards for mobile */}
            {filteredExp.length > 3 && (
              <AnimatePresence initial={false}>
                {showAllCards && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden space-y-3.5 pt-1"
                  >
                    {filteredExp.slice(3).map((exp) => {
                      const isExpanded = expandedId === exp.id;
                      return (
                        <div
                          key={exp.id}
                          className="rounded-[24px] border border-[#40534C]/15 dark:border-[#D6BD98]/20 bg-white/70 dark:bg-[#1A3636]/40 backdrop-blur-md overflow-hidden transition-all duration-250 shadow-2xs"
                        >
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                            className="w-full text-left p-4.5 flex items-start justify-between gap-3 focus:outline-none cursor-pointer min-h-[48px]"
                          >
                            <div className="space-y-1 flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="px-2 py-0.5 border font-bold text-[9px] uppercase tracking-wider rounded-md bg-[#1A3636]/5 text-[#1A3636] dark:text-[#D6BD98]">
                                  {exp.type.replace('-', ' ')}
                                </span>
                                <h3 className="text-base font-display font-bold text-brand-dark truncate">
                                  {exp.role}
                                </h3>
                              </div>
                              <p className="font-display font-bold text-[#1A3636] dark:text-[#D6BD98] text-xs">
                                {exp.company}
                              </p>
                            </div>
                            <div className="shrink-0 p-1.5 rounded-xl bg-black/5 dark:bg-white/5 text-slate-500">
                              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>
                          </button>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="px-4.5 pb-4.5 border-t border-[#40534C]/10 dark:border-[#D6BD98]/15 space-y-2 pt-2"
                              >
                                {exp.bullets.map((bullet, bIdx) => (
                                  <div key={bIdx} className="flex items-start text-xs text-brand-paragraph">
                                    <ChevronRight className="mt-0.5 mr-2 w-3.5 h-3.5 text-[#1A3636] dark:text-[#D6BD98] shrink-0" />
                                    <p>{bullet}</p>
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {filteredExp.length > 3 && (
              <div className="pt-2 text-center">
                <button
                  onClick={() => setShowAllCards(!showAllCards)}
                  className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-full bg-white dark:bg-[#1A3636] border border-[#40534C]/20 dark:border-[#D6BD98]/30 text-[#1A3636] dark:text-[#D6BD98] text-xs font-bold tracking-wider uppercase hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer min-h-[44px]"
                >
                  <span>{showAllCards ? 'Show Less' : 'View All Experiences'}</span>
                  {showAllCards ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>
        </AnimatedPanel>

      </motion.div>
    </section>
  );
}
