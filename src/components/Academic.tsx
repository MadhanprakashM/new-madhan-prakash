import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Award, 
  MapPin, 
  BookOpen, 
  ChevronRight, 
  ClipboardList, 
  Calendar, 
  Heart, 
  Users, 
  Sparkles,
  Trophy,
  Search,
  BookMarked,
  Rocket,
  Compass,
  TrendingUp,
  Presentation
} from 'lucide-react';
import { educationHistory } from '../data/portfolioData';
import { TimelineSwitcher } from './InteractiveComponents';

// Static coursework data
const academicCoursework: Record<string, string[]> = {
  edu1: [
    'Digital Marketing Strategy',
    'Business Analytics',
    'SEO & Google Search Console',
    'Meta & Google Ads Strategy',
    'Data Analysis with SPSS & Power BI',
    'Quantitative & Statistical Methods'
  ],
  edu2: [
    'Organizational Behavior',
    'Financial, Cost & Management Accounting',
    'Quantitative Techniques (QT)',
    'Statistics (STAT)',
    'Marketing Research',
    'Marketing Management'
  ],
  edu3: [
    'Commerce',
    'History',
    'Economics',
    'Accountancy'
  ],
  edu4: [
    'Mathematics',
    'General Science',
    'Social Studies',
    'Language Studies'
  ]
};

const academicProjects: Record<string, { title: string; desc: string; icon: React.ReactNode }[]> = {
  edu1: [
    {
      title: 'PSG CAS IPL Auction Competition (2nd Prize)',
      desc: 'Formulated player valuation models, salary purse management, and squad auction bidding strategy to secure 2nd Prize at PSG College of Arts and Science.',
      icon: <Trophy className="w-4 h-4 text-amber-500" />
    },
    {
      title: 'VIMSMART 2K26 Intercollege Festival',
      desc: 'Overall Event Coordinator leading 80 student volunteers across 17 teams for 400+ participants.',
      icon: <Users className="w-4 h-4 text-[#1A3636] dark:text-[#D6BD98]" />
    },
    {
      title: 'VIP - VIMS Immersion Programme',
      desc: 'Student Coordinator for peer-learning sessions; delivered Nike Fall & Rise Case Study and Ikigai presentations.',
      icon: <Presentation className="w-4 h-4 text-[#1A3636] dark:text-[#D6BD98]" />
    },
    {
      title: 'Vetikaaran Digital Marketing Live Project',
      desc: 'Managed 4 Meta Ads campaigns on a ₹10,000 budget, achieving 2.5M+ views and 150+ product sales.',
      icon: <ClipboardList className="w-4 h-4 text-[#1A3636] dark:text-[#D6BD98]" />
    },
    {
      title: 'Bruhat Logistics B2B Lead Generation',
      desc: 'Researched 500+ companies and generated 300+ verified B2B leads using Apollo AI, LinkedIn, and IndiaMART.',
      icon: <TrendingUp className="w-4 h-4 text-[#1A3636] dark:text-[#D6BD98]" />
    }
  ],
  edu2: [
    {
      title: "Charavyuga Management Fest Leader (2k24 & 2k25)",
      desc: "Organized and led the 'Best Manager' competition rounds and participant evaluation criteria.",
      icon: <Trophy className="w-4 h-4 text-[#B38F6F]" />
    },
    {
      title: "Product Idea & Adzap Presentations",
      desc: "Won 1st Prize in Best Product Idea Presentation and 1st Prize in Adzap advertising pitch.",
      icon: <Award className="w-4 h-4 text-[#B38F6F]" />
    }
  ],
  edu3: [
    {
      title: "NSS Blood Donation Camp",
      desc: "Led volunteer mobilization and operational planning collecting 120+ units of blood.",
      icon: <Heart className="w-4 h-4 text-[#710014]" />
    }
  ],
  edu4: [
    {
      title: "JRC Civic Hygiene Initiatives",
      desc: "Conducted basic first aid workshops and community health education sessions.",
      icon: <Users className="w-4 h-4 text-[#677D6A]" />
    }
  ]
};

const academicResearch: Record<string, { title: string; desc: string; pub: string }[]> = {
  edu1: [
    {
      title: 'E-Commerce Online Shopping Behavior Study',
      desc: 'Analyzed purchasing behaviors of 150+ regional college students to identify core conversion drivers.',
      pub: 'Published peer-reviewed scientific paper (Paper ID: 1716534)'
    }
  ],
  edu2: [
    {
      title: "Tomorrow's Accountant Seminar Research",
      desc: "Studied the digitalization of management accounting roles for corporate efficiency.",
      pub: "Published in ISBN-registered national seminar research book (2023)"
    }
  ],
  edu3: [],
  edu4: []
};

const academicAchievements: Record<string, { title: string; award: string }[]> = {
  edu1: [
    {
      title: "IPL Auction Event – 2nd Prize Winner",
      award: "Won 2nd Prize at PSG College of Arts and Science (PSG CAS) inter-collegiate meet for strategic auction bidding, valuation, and purse management."
    },
    {
      title: "Overall Event Coordinator",
      award: "Recognized by VIMS administration for managing a major 400+ student festival (VIMSMART 2K26)."
    }
  ],
  edu2: [
    {
      title: "Adzap (Advertising Pitch) Winner",
      award: "1st Prize - Outperformed competing teams in on-the-spot brand campaign design."
    },
    {
      title: "Treasure Hunt Champion",
      award: "2nd Prize - Evaluated for rapid collaborative analytical problem solving."
    },
    {
      title: "RYLA Entrepreneur Scholar",
      award: "Rotary youth leadership residential training scholarship."
    }
  ],
  edu3: [
    {
      title: "NSS Blood Donation Campaign",
      award: "Collected 120+ units of blood. Awarded for exceptional service by school management."
    }
  ],
  edu4: [
    {
      title: "JRC Outstanding Volunteer",
      award: "Recognized for continuous participation in community first aid drills."
    }
  ]
};

// Theme configuration for academic stages
const stageTheme: Record<string, { badge: string; accent: string; bg: string }> = {
  edu1: {
    badge: 'bg-[#1A3636]/10 dark:bg-[#D6BD98]/15 text-[#1A3636] dark:text-[#D6BD98] border-[#1A3636]/20 dark:border-[#D6BD98]/30',
    accent: 'bg-[#1A3636] dark:bg-[#D6BD98]',
    bg: 'from-[#1A3636]/10 dark:from-[#D6BD98]/10 to-transparent'
  },
  edu2: {
    badge: 'bg-[#40534C]/10 dark:bg-[#B38F6F]/15 text-[#40534C] dark:text-[#B38F6F] border-[#40534C]/20 dark:border-[#B38F6F]/30',
    accent: 'bg-[#40534C] dark:bg-[#B38F6F]',
    bg: 'from-[#40534C]/10 dark:from-[#B38F6F]/10 to-transparent'
  },
  edu3: {
    badge: 'bg-[#677D6A]/10 dark:bg-[#677D6A]/20 text-[#677D6A] dark:text-[#A8B8AE] border-[#677D6A]/20 dark:border-[#677D6A]/30',
    accent: 'bg-[#677D6A]',
    bg: 'from-[#677D6A]/10 dark:from-[#677D6A]/10 to-transparent'
  },
  edu4: {
    badge: 'bg-[#B38F6F]/10 dark:bg-[#B38F6F]/20 text-[#B38F6F] dark:text-[#D6BD98] border-[#B38F6F]/20 dark:border-[#B38F6F]/30',
    accent: 'bg-[#B38F6F]',
    bg: 'from-[#B38F6F]/10 dark:from-[#B38F6F]/10 to-transparent'
  }
};

const mbaMilestones = [
  {
    year: '2025',
    title: 'MBA Foundation & VIP Leadership',
    subtitle: 'Marketing & Business Analytics at VIMS',
    description: 'Enrolled in the MBA programme at Vivekananda Institute of Management Studies. Served as Student Coordinator for the VIMS Immersion Programme (VIP), delivering presentations on the Nike Fall & Rise Case Study and the Ikigai life-purpose framework.',
    icon: <Rocket className="w-5 h-5 text-[#1A3636] dark:text-[#D6BD98]" />,
    tag: 'Foundation & Peer Learning'
  },
  {
    year: '2026',
    title: 'Applied Execution & Operations',
    subtitle: 'Live campaigns, B2B pipelines, IPL auction win & festival leadership',
    description: 'Managed Meta Ads live campaigns for Vetikaaran, researched 500+ companies and generated 300+ B2B leads at Bruhat Logistics, won 2nd Prize in IPL Auction Event at PSG College of Arts and Science, and led 80 volunteers as Overall Coordinator for VIMSMART 2K26.',
    icon: <TrendingUp className="w-5 h-5 text-[#1A3636] dark:text-[#D6BD98]" />,
    tag: 'Active Practice & Leadership'
  },
  {
    year: '2027',
    title: 'Advanced Analytics & Capstone',
    subtitle: 'Strategic business readiness & industry launch',
    description: 'Completing advanced coursework in marketing intelligence, predictive analytics, and corporate strategy to drive scalable commercial growth.',
    icon: <Compass className="w-5 h-5 text-[#1A3636] dark:text-[#D6BD98]" />,
    tag: 'Strategic Impact'
  }
];

interface DetailPanelContentProps {
  edu: typeof educationHistory[0];
}

function DetailPanelContent({ edu }: DetailPanelContentProps) {
  const projects = academicProjects[edu.id] || [];
  const research = academicResearch[edu.id] || [];
  const coursework = academicCoursework[edu.id] || [];
  const achievements = academicAchievements[edu.id] || [];

  return (
    <div className="space-y-5 relative z-10 text-left">
      {/* Education Headers */}
      <div className="space-y-2 border-b border-[#40534C]/15 dark:border-[#D6BD98]/20 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="p-1.5 bg-[#1A3636]/5 dark:bg-[#D6BD98]/10 text-[#1A3636] dark:text-[#D6BD98] border border-[#1A3636]/10 dark:border-[#D6BD98]/20 rounded-lg">
            <GraduationCap className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-paragraph flex items-center">
            <Calendar className="w-3 h-3 mr-1 text-[#677D6A] dark:text-[#D6BD98]" />
            {edu.period} • Grade: {edu.grade}
          </span>
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-brand-dark tracking-tight leading-tight">
          {edu.degree}
        </h3>
        <p className="text-brand-paragraph text-xs font-semibold flex items-center">
          <MapPin className="w-3.5 h-3.5 mr-1 text-[#1A3636] dark:text-[#D6BD98] shrink-0" />
          {edu.institution}
        </p>
      </div>

      {/* Key Highlights */}
      {edu.highlights && edu.highlights.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-dark flex items-center border-l-2 border-[#1A3636] dark:border-[#D6BD98] pl-2">
            <Award className="w-3.5 h-3.5 mr-1.5 text-[#1A3636] dark:text-[#D6BD98] shrink-0" />
            Key Highlights
          </h4>
          <div className="space-y-1.5 pl-2">
            {edu.highlights.map((highlight, idx) => {
              const lower = highlight.toLowerCase();
              const isIplAward = lower.includes('ipl auction');
              const isOverallCoordinator = lower.includes('overall event coordinator');
              return (
                <div
                  key={idx}
                  className={`flex items-start text-xs leading-relaxed ${
                    isIplAward
                      ? 'p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-900 dark:text-amber-200 font-medium'
                      : isOverallCoordinator
                      ? 'p-2.5 rounded-xl bg-[#1A3636]/10 dark:bg-[#D6BD98]/15 border border-[#1A3636]/25 dark:border-[#D6BD98]/35 text-[#1A3636] dark:text-[#D6BD98] font-semibold'
                      : 'text-brand-paragraph'
                  }`}
                >
                  {isIplAward ? (
                    <Trophy className="w-3.5 h-3.5 text-amber-500 mr-2 mt-0.5 shrink-0" />
                  ) : isOverallCoordinator ? (
                    <Award className="w-3.5 h-3.5 text-[#1A3636] dark:text-[#D6BD98] mr-2 mt-0.5 shrink-0" />
                  ) : (
                    <span className="w-1.5 h-1.5 bg-[#677D6A] dark:bg-[#D6BD98] rounded-full mr-2 mt-1.5 shrink-0" />
                  )}
                  <span className={isIplAward || isOverallCoordinator ? 'font-semibold text-balance' : 'font-normal text-balance'}>
                    {highlight}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Coursework Modules */}
      {coursework.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-dark flex items-center border-l-2 border-[#1A3636] dark:border-[#D6BD98] pl-2">
            <BookOpen className="w-3.5 h-3.5 mr-1.5 text-[#1A3636] dark:text-[#D6BD98] shrink-0" />
            Core Academic Coursework
          </h4>
          <div className="flex flex-wrap gap-1.5 pl-2">
            {coursework.map((course, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-white/80 dark:bg-[#1A3636]/60 border border-[#40534C]/15 dark:border-[#D6BD98]/20 rounded-md text-[11px] font-medium text-slate-700 dark:text-slate-200"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-dark flex items-center border-l-2 border-[#1A3636] dark:border-[#D6BD98] pl-2">
            <ClipboardList className="w-3.5 h-3.5 mr-1.5 text-[#1A3636] dark:text-[#D6BD98] shrink-0" />
            Practical Projects & Initiatives
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
            {projects.map((project, idx) => (
              <div key={idx} className="p-3 bg-white/60 dark:bg-[#1A3636]/40 border border-[#40534C]/15 dark:border-[#D6BD98]/20 rounded-lg">
                <h5 className="font-display font-bold text-xs text-brand-dark mb-1 flex items-center gap-1.5">
                  {project.icon}
                  {project.title}
                </h5>
                <p className="text-xs text-brand-paragraph leading-normal font-normal">
                  {project.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Research */}
      {research.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-dark flex items-center border-l-2 border-[#1A3636] dark:border-[#D6BD98] pl-2">
            <Search className="w-3.5 h-3.5 mr-1.5 text-[#1A3636] dark:text-[#D6BD98] shrink-0" />
            Academic Research & Publications
          </h4>
          <div className="space-y-2 pl-2">
            {research.map((res, idx) => (
              <div key={idx} className="p-3 bg-[#1A3636]/5 dark:bg-[#D6BD98]/10 border border-[#1A3636]/10 dark:border-[#D6BD98]/20 rounded-lg">
                <h5 className="font-display font-bold text-xs text-brand-dark mb-1 flex items-center gap-1.5">
                  <BookMarked className="w-3.5 h-3.5 text-[#1A3636] dark:text-[#D6BD98] shrink-0" />
                  {res.title}
                </h5>
                <p className="text-xs text-brand-paragraph leading-normal mb-1">
                  {res.desc}
                </p>
                <span className="text-[11px] font-mono text-[#1A3636] dark:text-[#D6BD98] font-bold">
                  {res.pub}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-dark flex items-center border-l-2 border-[#1A3636] dark:border-[#D6BD98] pl-2">
            <Trophy className="w-3.5 h-3.5 mr-1.5 text-[#1A3636] dark:text-[#D6BD98] shrink-0" />
            Key Campus Honors
          </h4>
          <div className="space-y-1.5 pl-2">
            {achievements.map((ach, idx) => (
              <div key={idx} className="flex items-start text-xs text-brand-paragraph">
                <Award className="w-3.5 h-3.5 text-[#1A3636] dark:text-[#D6BD98] mr-2 mt-0.5 shrink-0" />
                <div>
                  <h5 className="font-bold text-brand-dark">{ach.title}</h5>
                  <p className="text-xs text-brand-paragraph leading-normal">{ach.award}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Academic() {
  const [activeEducation, setActiveEducation] = useState<typeof educationHistory[0]>(educationHistory[0]);

  return (
    <section id="academic" className="py-14 sm:py-20 bg-transparent relative overflow-hidden">
      {/* Matrix background */}
      <div className="absolute inset-0 matrix-grid-pattern opacity-25 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/80 dark:bg-[#1A3636]/70 border border-[#40534C]/20 dark:border-[#D6BD98]/25 rounded-full text-[#1A3636] dark:text-[#D6BD98] text-xs font-semibold uppercase tracking-[0.24em] shadow-2xs backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#677D6A] dark:text-[#D6BD98]" />
            <span>MY MBA JOURNEY</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-display font-bold text-brand-dark tracking-tight">
            Learning. Growing. Evolving.
          </h2>
          <div className="w-12 h-1 bg-[#1A3636] dark:bg-[#D6BD98] mx-auto rounded-full" />
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto pt-1">
            Tracking my progression from foundational management principles to applied digital campaigns, business analytics, and event leadership.
          </p>
        </div>

        {/* 1. Visual MBA Milestones Timeline (3 Pillars) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {mbaMilestones.map((m, idx) => (
            <div
              key={m.year}
              className="p-6 sm:p-7 rounded-[22px] bg-white/85 dark:bg-[#1A3636]/40 border border-[#40534C]/15 dark:border-[#D6BD98]/20 backdrop-blur-md shadow-md hover:border-[#1A3636]/40 dark:hover:border-[#D6BD98]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group text-left relative overflow-hidden"
            >
              {/* Year Watermark */}
              <span className="absolute -top-2 right-4 font-mono font-black text-5xl text-slate-200/40 dark:text-white/5 pointer-events-none select-none">
                {m.year}
              </span>

              <div className="space-y-3.5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0F1D1D] border border-[#40534C]/15 dark:border-[#D6BD98]/20 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-250">
                    {m.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#40534C] dark:text-[#D6BD98] bg-[#1A3636]/5 dark:bg-[#D6BD98]/10 px-2.5 py-0.5 rounded-md border border-[#1A3636]/10 dark:border-[#D6BD98]/20">
                    {m.tag}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono font-extrabold text-[#1A3636] dark:text-[#D6BD98]">
                    {m.year}
                  </span>
                  <h3 className="font-display font-bold text-lg text-brand-dark tracking-tight">
                    {m.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 dark:text-[#A8B8AE]">
                    {m.subtitle}
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {m.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#40534C]/10 dark:border-[#D6BD98]/15 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-400">
                <span>Phase 0{idx + 1}</span>
                <span className="font-bold text-[#1A3636] dark:text-[#D6BD98]">Milestone Achieved</span>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Formal Academic Qualifications & Credentials Deep Dive */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#40534C]/15 dark:border-[#D6BD98]/20 pb-3">
            <div>
              <h3 className="font-display font-bold text-xl text-brand-dark tracking-tight">
                Academic Degrees & Coursework
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Explore formal degree programs, university grades, research, and campus projects
              </p>
            </div>
          </div>

          <TimelineSwitcher
            idPrefix="edu"
            items={educationHistory}
            activeId={activeEducation.id}
            onChange={(id) => {
              const found = educationHistory.find((edu) => edu.id === id);
              if (found) {
                setActiveEducation(found);
              }
            }}
            getId={(edu) => edu.id}
            getMobileTitle={(edu) => edu.degree}
            getMobileSubtitle={(edu) =>
              edu.id === 'edu1'
                ? `${edu.institution} • Overall Coordinator (VIMSMART 2K26) • 🏆 2nd Prize IPL Auction @ PSG CAS`
                : edu.institution
            }
            getMobileIcon={() => <GraduationCap className="w-4 h-4 text-[#1A3636] dark:text-[#D6BD98]" />}
            getMobileHeaderRight={(edu) => {
              const theme = stageTheme[edu.id] || stageTheme.edu1;
              return (
                <div className="flex flex-wrap items-center justify-end gap-1 shrink-0 max-w-[160px] sm:max-w-none">
                  {edu.id === 'edu1' && (
                    <>
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#1A3636]/10 dark:bg-[#D6BD98]/15 text-[#1A3636] dark:text-[#D6BD98] border border-[#1A3636]/25 dark:border-[#D6BD98]/35">
                        Overall Coordinator
                      </span>
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                        🏆 2nd Prize IPL
                      </span>
                    </>
                  )}
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded border shrink-0 ${theme.badge}`}>
                    {edu.period}
                  </span>
                </div>
              );
            }}
            renderSelectorItem={(edu, isSelected) => {
              const theme = stageTheme[edu.id] || stageTheme.edu1;
              return (
                <div className="p-4 w-full text-left flex flex-col justify-between h-full">
                  <div className="space-y-1.5 w-full text-left">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded border ${
                        isSelected ? theme.badge : 'bg-black/5 dark:bg-white/5 text-slate-500 dark:text-[#A8B8AE] border-[#40534C]/10 dark:border-[#D6BD98]/15'
                      }`}>
                        {edu.period}
                      </span>
                      <span className={`text-xs font-mono font-bold ${
                        isSelected ? 'text-[#1A3636] dark:text-[#D6BD98]' : 'text-slate-400 dark:text-slate-500'
                      }`}>
                        {edu.grade}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-sm sm:text-base tracking-tight text-brand-dark leading-snug group-hover:text-[#1A3636] dark:group-hover:text-[#D6BD98] transition-colors">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-brand-paragraph font-medium leading-normal flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                      <span className="truncate">{edu.institution}</span>
                    </p>
                    {edu.id === 'edu1' && (
                      <div className="pt-1.5 flex flex-wrap items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1A3636]/10 dark:bg-[#D6BD98]/15 text-[#1A3636] dark:text-[#D6BD98] border border-[#1A3636]/25 dark:border-[#D6BD98]/35">
                          <Users className="w-3 h-3 shrink-0" />
                          <span>Overall Coordinator • VIMSMART 2K26</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/25">
                          <Trophy className="w-3 h-3 text-amber-500 shrink-0" />
                          <span>Won 2nd Prize • IPL Auction @ PSG CAS</span>
                        </span>
                      </div>
                    )}
                  </div>

                  <span className={`text-[10px] font-bold pt-3 flex items-center transition-all ${
                    isSelected ? 'text-[#1A3636] dark:text-[#D6BD98] translate-x-1' : 'text-slate-500'
                  }`}>
                    <span>View Curriculum & Research</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5 shrink-0" />
                  </span>
                </div>
              );
            }}
            renderDetail={(edu) => {
              const theme = stageTheme[edu.id] || stageTheme.edu1;
              return (
                <div className="relative w-full h-full">
                  <div className={`absolute -inset-8 bg-gradient-to-b ${theme.bg} opacity-[0.25] pointer-events-none`} />
                  <DetailPanelContent edu={edu} />
                </div>
              );
            }}
          />
        </div>

      </motion.div>
    </section>
  );
}
