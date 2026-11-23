import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedPanel } from './InteractiveComponents';
import { 
  personalInfo, 
  skillGroups, 
  experiences, 
  projects, 
  certifications, 
  achievements, 
  educationHistory, 
  testimonials 
} from '../data/portfolioData';
import { Certification } from '../types';
import CertificationDetailModal from './CertificationDetailModal';
import { 
  Download, 
  Mail, 
  Linkedin, 
  ArrowRight, 
  Sparkles, 
  Instagram, 
  BookOpen, 
  Phone, 
  MapPin, 
  Check, 
  Copy, 
  Send, 
  Award, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Target,
  BarChart2,
  Search,
  BookMarked,
  Layers,
  GraduationCap,
  Calendar,
  Briefcase,
  X,
  Compass,
  Cpu,
  Star,
  Quote,
  ArrowUp,
  Youtube,
  User
} from 'lucide-react';

interface BentoLayoutProps {
  darkMode: boolean;
  onToggleDarkMode: (isDark: boolean) => void;
  onOpenResume: () => void;
}

export default function BentoLayout({ darkMode, onToggleDarkMode, onOpenResume }: BentoLayoutProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [activeProjectTab, setActiveProjectTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [careerTab, setCareerTab] = useState<'experience' | 'education'>('experience');
  
  // Contact Form states
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Active testimonial state
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Scroll Top state
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto scroll/slide testimonials
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Tracking scroll metrics
  useEffect(() => {
    const handleScroll = () => {
      const mainElement = document.getElementById('bento-main-container');
      if (!mainElement) return;
      setShowScrollTop(mainElement.scrollTop > 350);
    };

    const mainElement = document.getElementById('bento-main-container');
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Filter projects based on activeProjectTab
  const categoriesOfProjects = useMemo(() => {
    const cats = new Set(projects.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeProjectTab === 'all') return projects;
    return projects.filter(p => p.category === activeProjectTab);
  }, [activeProjectTab]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitSuccess(false);

    const provider = personalInfo.contactFormProvider || 'web3forms';

    if (provider === 'web3forms') {
      const accessKey = (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY || personalInfo.web3formsAccessKey;
      
      if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE' || accessKey.trim() === '') {
        setIsSubmitting(false);
        setSubmitMessage('Contact Form works! To receive actual emails, please enter your Web3Forms Access Key in portfolioData.ts.');
        setSubmitSuccess(true);
        setFormState({ name: '', email: '', message: '' });
        return;
      }

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: formState.name,
            email: formState.email,
            subject: `Bento Portfolio Message from ${formState.name}`,
            message: formState.message,
            from_name: `${personalInfo.name} Portfolio`,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setIsSubmitting(false);
          setSubmitSuccess(true);
          setSubmitMessage('Message sent successfully! Thank you.');
          setFormState({ name: '', email: '', message: '' });
        } else {
          setIsSubmitting(false);
          setSubmitMessage(data.message || 'Submission failed. Please check setup.');
        }
      } catch (err) {
        setIsSubmitting(false);
        setSubmitMessage('A network error occurred. Please try again.');
        console.error(err);
      }
    } else {
      // Local Fallback simulation
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setSubmitMessage('Your message was simulated successfully! Set contactFormProvider to Web3Forms to activate true deliveries.');
        setFormState({ name: '', email: '', message: '' });
      }, 1000);
    }
  };

  // Setup intersection observer to track which bento-group is currently on screen
  useEffect(() => {
    const bentoIds = ['bento-home', 'bento-experience', 'bento-skills', 'bento-certifications', 'bento-achievements', 'bento-blog', 'bento-contact'];
    const observers = bentoIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const section = id.replace('bento-', '');
            setActiveSection(section);
          }
        },
        { rootMargin: '-20% 0px -50% 0px' }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const scrollToBento = (id: string) => {
    const el = document.getElementById(`bento-${id}`);
    const mainElement = document.getElementById('bento-main-container');
    if (el && mainElement) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveSection(id);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen ${darkMode ? 'dark bg-[#020617]' : 'light bg-[#F3F4F6]'} overflow-hidden relative transition-colors duration-500`}
    >
      {/* Background radial atmosphere glows */}
      <div className="absolute top-[12%] left-[8%] w-[600px] h-[600px] rounded-full bg-blue-600/5 dark:bg-blue-500/5 blur-[150px] pointer-events-none -z-20 animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[8%] w-[500px] h-[500px] rounded-full bg-blue-500/5 dark:bg-[#22D3EE]/5 blur-[120px] pointer-events-none -z-20 animate-float" />
      
      {/* Delicate floating starry background overlay */}
      <div className="absolute inset-0 noise-bg pointer-events-none opacity-40 -z-10" />

      <div className="flex h-screen overflow-hidden">

        {/* ========================================================= */}
        {/* SIDEBAR NAVIGATION (Desktop only)                         */}
        {/* ========================================================= */}
        <motion.aside
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex w-68 xl:w-76 flex-col shrink-0 bg-white/50 dark:bg-[#060b18]/70 backdrop-blur-xl border-r border-slate-200/40 dark:border-white/[0.04] p-7 flex-between h-full relative z-30"
        >
          <div className="space-y-9 w-full">
            {/* Elegant Luxury Branding Logo */}
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-200/30 dark:border-white/[0.03]">
              <div className="w-11 h-11 rounded-xl border border-[#22D3EE]/30 flex items-center justify-center shadow-xl relative overflow-hidden shrink-0 bg-gradient-to-tr from-slate-900 to-[#020617]">
                {personalInfo.avatarUrl ? (
                  <img
                    src={personalInfo.avatarUrl}
                    alt="M. Madhan Prakash - MBA Digital Marketing Portfolio"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-[#22D3EE]" />
                )}
              </div>
              <div className="text-left">
                <span className="font-display font-medium tracking-wide text-slate-900 dark:text-[#22D3EE] text-base block italic">
                  M. Madhan Prakash
                </span>
                <p className="text-[9px] font-mono font-bold text-[#3B82F6] dark:text-[#22D3EE]/80 tracking-widest uppercase">
                  Growth Specialist
                </p>
              </div>
            </div>

            {/* Sidebar navigation items */}
            <nav className="space-y-1.5">
              {[
                { id: 'home', label: 'Home / Overview', icon: <Compass className="w-4 h-4" /> },
                { id: 'experience', label: 'Career & Education', icon: <Briefcase className="w-4 h-4" /> },
                { id: 'skills', label: 'Skill Matrix', icon: <Cpu className="w-4 h-4" /> },
                { id: 'certifications', label: 'Certifications', icon: <Award className="w-4 h-4" /> },
                { id: 'achievements', label: 'Key Milestones', icon: <Star className="w-4 h-4" /> },
                { id: 'blog', label: 'Blog Curation', icon: <BookOpen className="w-4 h-4" /> },
                { id: 'contact', label: 'Let\'s Connect', icon: <Mail className="w-4 h-4" /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToBento(item.id)}
                  className={`w-full flex items-center space-x-3.5 px-4.5 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-[#22D3EE]/15 to-[#22D3EE]/5 text-slate-900 dark:text-[#22D3EE] border-l-[3px] border-[#22D3EE] font-bold shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-white/30 dark:hover:bg-white/[0.02]'
                  }`}
                >
                  <span className={`${activeSection === item.id ? 'text-[#22D3EE]' : 'text-slate-400'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Socials & Custom Premium CTA at sidebar bottom */}
          <div className="w-full pt-6 border-t border-slate-200/30 dark:border-white/[0.03] space-y-4">
            <button
              onClick={onOpenResume}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3.5 bg-gradient-to-r from-[#22D3EE] to-[#3B82F6] hover:scale-[1.02] text-slate-950 rounded-xl text-xs font-bold shadow-lg shadow-[#22D3EE]/10 transition-all duration-300 shimmer-btn font-mono"
            >
              <Download className="w-3.5 h-3.5 text-slate-950" />
              <span>DOWNLOAD RESUME</span>
            </button>

            <div className="flex items-center justify-center gap-3">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-2.5 rounded-xl bg-white/50 hover:bg-slate-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.05] text-slate-500 dark:text-slate-400 hover:text-[#22D3EE] dark:hover:text-[#22D3EE] transition-all duration-300 border border-slate-200/20 dark:border-white/[0.02]"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              {personalInfo.instagram && (
                <a
                  href={personalInfo.instagram}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="p-2.5 rounded-xl bg-white/50 hover:bg-slate-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.05] text-slate-500 dark:text-slate-400 hover:text-[#22D3EE] dark:hover:text-[#22D3EE] transition-all duration-300 border border-slate-200/20 dark:border-white/[0.02]"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {(personalInfo as any).youtube && (
                <a
                  href={(personalInfo as any).youtube}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="p-2.5 rounded-xl bg-white/50 hover:bg-slate-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.05] text-slate-500 dark:text-slate-400 hover:text-[#22D3EE] dark:hover:text-[#22D3EE] transition-all duration-300 border border-slate-200/20 dark:border-white/[0.02]"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-xl bg-white/50 hover:bg-slate-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.05] text-slate-500 dark:text-slate-400 hover:text-[#22D3EE] dark:hover:text-[#22D3EE] transition-all duration-300 relative border border-slate-200/20 dark:border-white/[0.02]"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-green-500" /> : <Mail className="w-4 h-4" />}
                {copiedEmail && (
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-900 text-[#22D3EE] dark:bg-white dark:text-slate-950 text-[9px] font-bold rounded shadow-lg whitespace-nowrap border border-[#22D3EE]/20">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </div>
        </motion.aside>

        {/* ========================================================= */}
        {/* MAIN SCROLLABLE DASHBOARD AREA                            */}
        {/* ========================================================= */}
        <main 
          id="bento-main-container"
          className="flex-1 overflow-y-auto h-full px-4 py-6 md:p-6 lg:p-10 space-y-7 relative"
        >

          {/* DESKTOP TOP BAR (Connect Socials & Theme) */}
          <div className="hidden lg:flex items-center justify-between max-w-[1550px] mx-auto pb-4 border-b border-slate-200/10 dark:border-white/[0.02]">
            <div className="flex items-center space-x-3.5">
              <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Connect Hub:</span>
              <div className="flex items-center space-x-2.5">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="p-2 rounded-xl bg-white/40 hover:bg-slate-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.05] text-slate-500 dark:text-slate-400 hover:text-[#22D3EE] dark:hover:text-[#22D3EE] transition-all duration-300 border border-slate-200/15 dark:border-white/[0.01]"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                {personalInfo.instagram && (
                  <a
                    href={personalInfo.instagram}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="p-2 rounded-xl bg-white/40 hover:bg-slate-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.05] text-slate-500 dark:text-slate-400 hover:text-[#22D3EE] dark:hover:text-[#22D3EE] transition-all duration-300 border border-slate-200/15 dark:border-white/[0.01]"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {(personalInfo as any).youtube && (
                  <a
                    href={(personalInfo as any).youtube}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="p-2 rounded-xl bg-white/40 hover:bg-slate-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.05] text-slate-500 dark:text-slate-400 hover:text-[#22D3EE] dark:hover:text-[#22D3EE] transition-all duration-300 border border-slate-200/15 dark:border-white/[0.01]"
                    title="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => onToggleDarkMode(!darkMode)}
                className="px-3.5 py-1.5 rounded-xl bg-white/40 hover:bg-slate-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.05] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-[#22D3EE] text-xs font-mono font-semibold tracking-wider uppercase border border-slate-200/15 dark:border-white/[0.01] transition-all duration-300"
              >
                {darkMode ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
          </div>

          {/* MOBILE GLASS HEADER */}
          <motion.header
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden flex items-center justify-between bg-white/40 dark:bg-[#060b18]/60 backdrop-blur-xl border border-slate-200/30 dark:border-white/[0.04] p-4 rounded-2xl mb-2 relative z-30 shadow-md"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl border border-[#22D3EE]/30 flex items-center justify-center shadow-md relative overflow-hidden shrink-0 bg-gradient-to-tr from-slate-900 to-[#020617]">
                {personalInfo.avatarUrl ? (
                  <img
                    src={personalInfo.avatarUrl}
                    alt="M. Madhan Prakash Avatar"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 text-[#22D3EE]" />
                )}
              </div>
              <div className="text-left">
                <span className="font-display font-medium text-sm text-slate-900 dark:text-[#22D3EE] block italic leading-tight">
                  M. Madhan Prakash
                </span>
                <span className="text-[8px] font-mono font-bold text-[#3B82F6] dark:text-[#22D3EE]/80 tracking-wider uppercase">
                  MBA • Growth Portfolio
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Top social icons for mobile */}
              <div className="flex items-center space-x-1.5 border-r border-slate-200/30 dark:border-white/[0.03] pr-2 mr-1">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="p-1.5 text-slate-500 hover:text-[#22D3EE] dark:text-slate-400"
                  title="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                {personalInfo.instagram && (
                  <a
                    href={personalInfo.instagram}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="p-1.5 text-slate-500 hover:text-[#22D3EE] dark:text-slate-400"
                    title="Instagram"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                )}
                {(personalInfo as any).youtube && (
                  <a
                    href={(personalInfo as any).youtube}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="p-1.5 text-slate-500 hover:text-[#22D3EE] dark:text-slate-400"
                    title="YouTube"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <button
                onClick={onOpenResume}
                className="p-2 bg-gradient-to-r from-[#22D3EE]/20 to-[#22D3EE]/5 dark:text-[#22D3EE] text-slate-950 rounded-xl text-xs border border-[#22D3EE]/20 hover:scale-105 transition-all"
                title="Download CV"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => onToggleDarkMode(!darkMode)}
                className="p-2.5 bg-white/50 dark:bg-white/[0.02] border border-slate-200/30 dark:border-white/[0.04] text-slate-600 dark:text-slate-400 rounded-xl text-xs"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </motion.header>

          {/* DYNAMIC BENTO GRID WRAPPER */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 max-w-[1550px] mx-auto pb-14">

            {/* ========================================================= */}
            {/* CARD 1: COSMIC HERO CARD (lg:col-span-8, min-h-[460px])   */}
            {/* ========================================================= */}
            <motion.section
              id="bento-home"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                    staggerChildren: 0.08,
                    delayChildren: 0.05
                  }
                }
              }}
              className="lg:col-span-8 cosmic-card-gold rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group min-h-[460px] border border-[#22D3EE]/20 dark:border-[#22D3EE]/15 shadow-2xl"
            >
              {/* Premium Layered Light Beams & Liquid Cosmic Glows */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-[#22D3EE]/10 via-[#22D3EE]/3 to-transparent blur-[100px] pointer-events-none group-hover:scale-125 transition-all duration-1000 ease-out" />
              <div className="absolute -bottom-20 -left-10 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-blue-500/[0.04] to-transparent blur-[80px] pointer-events-none" />
              
              {/* Luxury Geometric Grid/Line Accent */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.015)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-70 pointer-events-none" />
              
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 lg:gap-10 items-center h-full relative z-10">
                {/* Visual Typography & Intro Column */}
                <div className="sm:col-span-7 space-y-6 text-left order-2 sm:order-1 flex flex-col justify-center">
                  
                  {/* Status Indicator Pill */}
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="inline-flex items-center space-x-2.5 bg-white/60 dark:bg-slate-950/40 backdrop-blur-md text-slate-800 dark:text-[#22D3EE] px-4 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border border-slate-200/50 dark:border-[#22D3EE]/25 w-fit shadow-sm"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="tracking-wider">OPEN TO STRATEGIC ROLES</span>
                  </motion.div>

                  {/* Editorial Title Block */}
                  <div className="space-y-3">
                    <motion.span 
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      className="text-[11px] font-mono font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] block"
                    >
                      GROWTH SPECIALIST & DIGITAL MARKETER
                    </motion.span>
                    
                    <motion.h1 
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-display font-light tracking-tight leading-tight"
                    >
                      <span className="text-slate-900 dark:text-white font-medium italic block">
                        M. Madhan Prakash
                      </span>
                    </motion.h1>
                    
                    {/* Role Tags with Soft Ambient Borders */}
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      className="flex flex-wrap gap-2 pt-2"
                    >
                      {["MBA Marketing Student", "Digital Marketer", "Business Analyst", "SEO Enthusiast"].map((role, idx) => (
                        <span 
                          key={idx} 
                          className="text-[9px] sm:text-[10px] font-bold px-2.5 py-1 bg-white/50 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/[0.05] rounded-lg text-slate-700 dark:text-slate-300 shadow-sm hover:border-[#22D3EE]/30 transition-colors duration-300"
                        >
                          {role}
                        </span>
                      ))}
                    </motion.div>
                  </div>

                  {/* Clean readable summary statement */}
                  <motion.p 
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-md"
                  >
                    I bridge the gap between creative storytelling and marketing analytics. Helping companies build, optimize, and scale customer acquisition channels through rigorous local SEO audits, meta ad campaigns, outbound lead flows, and executive dashboards.
                  </motion.p>

                  {/* Special Certifications List */}
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="flex flex-wrap gap-2 text-[9px] font-mono font-semibold tracking-wider text-slate-500 dark:text-[#22D3EE]"
                  >
                    <span className="px-3 py-1.5 bg-slate-100/60 dark:bg-slate-950/40 border border-slate-200/40 dark:border-[#22D3EE]/10 rounded-md flex items-center">
                      🎓 VIMS MBA Candidate (Analytics)
                    </span>
                    <span className="px-3 py-1.5 bg-slate-100/60 dark:bg-[#22D3EE]/10 border border-[#22D3EE]/15 dark:border-[#22D3EE]/20 rounded-md flex items-center">
                      📈 Meta Ads Certified
                    </span>
                    <span className="px-3 py-1.5 bg-slate-100/60 dark:bg-slate-950/40 border border-slate-200/40 dark:border-[#22D3EE]/10 rounded-md flex items-center">
                      🔍 AEO & Local Search
                    </span>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 22, stiffness: 140 } }
                    }}
                    className="flex items-center gap-4 pt-3"
                  >
                    <a
                      href="#bento-contact"
                      onClick={(e) => { e.preventDefault(); scrollToBento('contact'); }}
                      className="inline-flex items-center justify-center px-6 py-3.5 bg-slate-950 dark:bg-gradient-to-r dark:from-[#22D3EE] dark:to-[#3B82F6] text-white dark:text-slate-950 font-bold rounded-xl text-xs tracking-wider uppercase shadow-xl transition-all duration-300 hover:scale-[1.03] shimmer-btn"
                    >
                      Hire Me
                      <ArrowRight className="w-3.5 h-3.5 ml-2.5 dark:text-slate-950" />
                    </a>
                    <a
                      href="#bento-experience"
                      onClick={(e) => { e.preventDefault(); scrollToBento('experience'); }}
                      className="inline-flex items-center justify-center px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] dark:text-white font-bold rounded-xl text-xs tracking-wider uppercase transition-all duration-300 border border-slate-200 dark:border-white/[0.06] hover:scale-[1.03] shadow-sm"
                    >
                      View My Work
                    </a>
                  </motion.div>
                </div>

                {/* Deluxe Portrait Side Column with Floating Luxury Canvas */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, scale: 0.94 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="sm:col-span-5 flex justify-center items-center order-1 sm:order-2 h-full py-2"
                >
                  <div className="relative group/portrait">
                    
                    {/* Animated Outer Ambient Reflection Shadow Ring */}
                    <div className="absolute -inset-2 rounded-[38px] bg-gradient-to-tr from-[#22D3EE]/40 via-transparent to-[#3B82F6]/20 blur-xl opacity-80 group-hover/portrait:opacity-100 transition-opacity duration-500" />
                    
                    {/* Exquisite Double Ring Frame */}
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-[36px] overflow-hidden border-2 border-slate-200/50 dark:border-[#22D3EE]/20 p-2.5 bg-white/60 dark:bg-slate-950/55 backdrop-blur-2xl shadow-2xl transition-transform duration-700 ease-out group-hover/portrait:scale-[1.03] group-hover/portrait:rotate-1">
                      
                      {/* Subsurface Metallic Mask Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-80 z-10 pointer-events-none rounded-[28px]" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] to-transparent mix-blend-overlay z-10 pointer-events-none rounded-[28px]" />
                      
                      {/* Portrait Image with Premium Scale Up on Hover */}
                      <div className="w-full h-full rounded-[26px] overflow-hidden relative">
                        {personalInfo.avatarUrl ? (
                           <img
                             src={personalInfo.avatarUrl}
                             alt="M. Madhan Prakash - MBA Digital Marketing & Business Analytics Specialist"
                             loading="lazy"
                             decoding="async"
                             referrerPolicy="no-referrer"
                             className="w-full h-full object-cover transition-transform duration-700 ease-out scale-[1.02] group-hover/portrait:scale-108"
                           />
                        ) : (
                          <div className="w-full h-full bg-slate-950 flex items-center justify-center text-[#22D3EE]">
                            <User className="w-16 h-16 text-[#22D3EE]" />
                          </div>
                        )}
                        
                        {/* Elegant Lens flare effect on top-left of image */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-20" />
                      </div>
                    </div>
                    
                    {/* Miniature floating accent badge on image corner */}
                    <div className="absolute -bottom-2.5 -right-1.5 bg-slate-900 dark:bg-[#3B82F6] text-white dark:text-slate-950 text-[8px] font-mono font-extrabold px-3 py-1 rounded-full border border-slate-800 dark:border-[#22D3EE]/30 tracking-widest uppercase shadow-lg z-30 transform group-hover/portrait:translate-y-[-2px] transition-transform duration-300">
                      GROWTH
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* ========================================================= */}
            {/* CARD 2: PREMIUM DOWNLOAD RESUME CARD (lg:col-span-4)     */}
            {/* ========================================================= */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 cosmic-card rounded-[18px] p-7 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="space-y-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-900 to-[#020617] border border-[#22D3EE]/20 flex items-center justify-center text-[#22D3EE] shadow-inner">
                  <BookMarked className="w-5.5 h-5.5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-display font-medium tracking-wide text-slate-900 dark:text-white italic">Curriculum Vitae</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    Download my verified curriculum vitae detailing full-time studies, consulting experiences, analytics qualifications, and institutional references.
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={onOpenResume}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-4 bg-[#22D3EE] hover:bg-[#06B6D4] text-slate-950 font-bold rounded-xl text-xs tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#22D3EE]/5 border border-[#22D3EE]/25 hover:scale-[1.02] font-mono"
                >
                  <Download className="w-4 h-4 text-slate-950" />
                  <span>PREVIEW & DOWNLOAD</span>
                </button>
              </div>
            </motion.section>

            {/* ========================================================= */}
            {/* CARD 3: KEY PERFORMANCE STATS CARD (lg:col-span-4)        */}
            {/* ========================================================= */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 cosmic-card rounded-[18px] p-7 relative overflow-hidden group flex flex-col justify-between"
            >
              {/* Elegant glow wireframe sparkline svg */}
              <div className="absolute inset-x-0 bottom-0 h-28 opacity-25 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                  <path d="M0,85 Q20,35 40,70 T80,30 L100,50 L100,100 L0,100 Z" fill="url(#cosmicStatsGrad)" />
                  <defs>
                    <linearGradient id="cosmicStatsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="space-y-4.5 text-left">
                <h3 className="text-[10px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">IMPACT METRICS</h3>
                
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <span className="text-3xl sm:text-4xl font-mono font-medium text-slate-900 dark:text-[#22D3EE]">150+</span>
                    <p className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Products Sold</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-3xl sm:text-4xl font-mono font-medium text-slate-900 dark:text-[#22D3EE]">200+</span>
                    <p className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Leads Generated</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-3xl sm:text-4xl font-mono font-medium text-slate-900 dark:text-[#22D3EE]">10+</span>
                    <p className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Deals Completed</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-3xl sm:text-4xl font-mono font-medium text-slate-900 dark:text-[#22D3EE]">5+</span>
                    <p className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Certifications</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between text-[9px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 z-10">
                <span>Enterprise Growth</span>
                <span className="flex items-center text-[#22D3EE] font-semibold">
                  Data-Driven Strategy
                  <TrendingUp className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </motion.section>

            {/* ========================================================= */}
            {/* CARD 7: EDUCATION & TIMELINE TRACK (lg:col-span-8)         */}
            {/* ========================================================= */}
            <motion.section
              id="bento-experience"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 cosmic-card rounded-[18px] p-7 sm:p-9 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-5 text-left w-full">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2.5">
                    <Briefcase className="w-5 h-5 text-[#22D3EE]" />
                    <h2 className="text-lg font-display font-medium text-slate-900 dark:text-white italic">Career & Academic Path</h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                    Academic tracks, enterprise internships, and consulting campaigns.
                  </p>
                </div>

                {/* Highly premium segments selector tabs */}
                <div className="flex bg-slate-100/80 dark:bg-white/[0.02] p-1 rounded-xl border border-slate-200/20 dark:border-white/[0.02] text-[10px] font-mono">
                  <button
                    onClick={() => setCareerTab('experience')}
                    className={`flex-1 py-1.5 rounded-lg transition-all uppercase tracking-wider font-bold ${
                      careerTab === 'experience'
                        ? 'bg-[#22D3EE] text-slate-950 shadow-xs'
                        : 'text-slate-500 dark:text-slate-450 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    Experience & Campaigns
                  </button>
                  <button
                    onClick={() => setCareerTab('education')}
                    className={`flex-1 py-1.5 rounded-lg transition-all uppercase tracking-wider font-bold ${
                      careerTab === 'education'
                        ? 'bg-[#22D3EE] text-slate-950 shadow-xs'
                        : 'text-slate-500 dark:text-slate-450 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    Education
                  </button>
                </div>

                <AnimatedPanel activeKey={careerTab} className="space-y-4 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/10">
                  {careerTab === 'experience' ? (
                    <div className="space-y-5">
                      {/* Section: Professional Roles */}
                      <div className="space-y-3.5">
                        <div className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1.5 border-l-2 border-[#22D3EE] mb-2">
                          Professional Roles
                        </div>
                        {experiences.map((exp) => (
                          <div
                            key={exp.id}
                            className="p-4 rounded-xl bg-white/40 dark:bg-white/[0.02] backdrop-blur-md border border-slate-200/30 dark:border-white/[0.05] hover:border-[#22D3EE]/20 transition-all duration-300 shadow-inner text-left"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                              <div>
                                <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-white leading-tight">
                                  {exp.role}
                                </h4>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                                  {exp.company} • {exp.location}
                                </p>
                              </div>
                              <span className="text-[8px] font-mono font-bold text-[#3B82F6] dark:text-[#22D3EE] tracking-wider shrink-0 bg-[#22D3EE]/10 dark:bg-[#22D3EE]/5 px-2 py-0.5 rounded border border-[#22D3EE]/20">
                                {exp.period}
                              </span>
                            </div>
                            
                            <ul className="mt-2.5 space-y-1.5 list-disc pl-3.5 text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                              {exp.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                              ))}
                            </ul>

                            <div className="flex flex-wrap gap-1 mt-3 pt-2.5 border-t border-slate-100 dark:border-white/[0.03]">
                              {exp.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-1.5 py-0.5 rounded bg-slate-100/65 dark:bg-white/[0.02] text-[8px] font-mono text-slate-400 dark:text-slate-450 border border-slate-200/10 dark:border-white/[0.02]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Section: Campaigns & Projects */}
                      <div className="space-y-3.5 pt-2">
                        <div className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1.5 border-l-2 border-[#22D3EE] mb-2">
                          Campaigns & Projects
                        </div>
                        {projects.map((proj) => (
                          <div
                            key={proj.id}
                            onClick={() => setSelectedProject(proj)}
                            className="p-4 rounded-xl bg-white/40 dark:bg-white/[0.02] backdrop-blur-md border border-slate-200/30 dark:border-white/[0.05] hover:border-[#22D3EE]/30 transition-all duration-300 shadow-inner cursor-pointer group/item text-left"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                              <div>
                                <span className="text-[8px] font-mono font-bold text-[#3B82F6] dark:text-[#22D3EE] uppercase tracking-wider bg-[#22D3EE]/10 dark:bg-[#22D3EE]/5 px-1.5 py-0.5 rounded border border-[#22D3EE]/20 mb-1.5 inline-block">
                                  {proj.category}
                                </span>
                                <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-white leading-tight group-hover/item:text-[#22D3EE] transition-colors duration-300">
                                  {proj.title}
                                </h4>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                                  {proj.subtitle}
                                </p>
                              </div>
                              <span className="text-[8px] font-mono font-bold text-slate-400 dark:text-[#22D3EE]/80 tracking-wider shrink-0 mt-1 sm:mt-0 underline group-hover/item:text-[#22D3EE]">
                                View Report
                              </span>
                            </div>
                            
                            <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                              {proj.overview}
                            </p>

                            <div className="flex flex-wrap gap-1 mt-3 pt-2.5 border-t border-slate-100 dark:border-white/[0.03]">
                              {proj.tools.slice(0, 4).map((tool) => (
                                <span
                                  key={tool}
                                  className="px-1.5 py-0.5 rounded bg-slate-100/65 dark:bg-white/[0.02] text-[8px] font-mono text-slate-400 dark:text-slate-450 border border-slate-200/10 dark:border-white/[0.02]"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {educationHistory.map((edu) => (
                        <div
                          key={edu.id}
                          className="p-4 rounded-xl bg-white/40 dark:bg-white/[0.02] backdrop-blur-md border border-slate-200/30 dark:border-white/[0.05] hover:border-[#22D3EE]/20 transition-all duration-300 shadow-inner"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                            <div>
                              <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-white leading-tight">
                                {edu.degree}
                              </h4>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                                {edu.institution}
                              </p>
                            </div>
                            <span className="text-[8px] font-mono font-bold text-[#3B82F6] dark:text-[#22D3EE] tracking-wider shrink-0 bg-[#22D3EE]/10 dark:bg-[#22D3EE]/5 px-2 py-0.5 rounded border border-[#22D3EE]/20">
                              {edu.period}
                            </span>
                          </div>

                          {edu.grade && (
                            <div className="mt-2 text-[9px] font-mono text-[#3B82F6] dark:text-[#22D3EE] font-bold">
                              STATUS / GRADE: {edu.grade}
                            </div>
                          )}
                          
                          {edu.highlights && edu.highlights.length > 0 && (
                            <ul className="mt-2.5 space-y-1.5 list-disc pl-3.5 text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                              {edu.highlights.map((h, i) => (
                                <li key={i}>{h}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </AnimatedPanel>
              </div>

              <div className="pt-5 border-t border-slate-200/30 dark:border-white/[0.03] mt-5 text-[9px] font-mono text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest flex items-center justify-between">
                <span>View Full Timeline</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </motion.section>

            {/* ========================================================= */}
            {/* CARD 5: TOP SKILLS RATINGS (lg:col-span-4)               */}
            {/* ========================================================= */}
            <motion.section
              id="bento-skills"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 cosmic-card rounded-[18px] p-7 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-5 text-left w-full">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2.5">
                    <Cpu className="w-5 h-5 text-[#22D3EE]" />
                    <h2 className="text-lg font-display font-medium text-slate-900 dark:text-white italic">Technical & Channel Matrix</h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                    Tool capabilities and marketing expertise verified by live project completions.
                  </p>
                </div>

                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/10">
                  {skillGroups.map((group, idx) => (
                    <div key={idx} className="space-y-2">
                      <h4 className="text-[10px] font-mono font-bold text-[#3B82F6] dark:text-[#22D3EE] tracking-widest uppercase">
                        {group.category}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {group.skills.map((skill) => (
                          <span
                            key={skill.name}
                            className="px-2.5 py-1 text-[11px] font-sans font-medium text-slate-700 dark:text-slate-200 bg-white/40 dark:bg-white/[0.02] border border-slate-200/30 dark:border-white/[0.04] rounded-lg shadow-xs hover:border-[#22D3EE]/30 transition-colors duration-200"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-slate-200/30 dark:border-white/[0.03] mt-5 text-[9px] font-mono text-center text-slate-400 font-bold tracking-widest uppercase">
                95+ Elite Skill Score
              </div>
            </motion.section>

            {/* ========================================================= */}
            {/* CARD 6: CERTIFICATIONS DISPLAY (lg:col-span-4)            */}
            {/* ========================================================= */}
            <motion.section
              id="bento-certifications"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 cosmic-card rounded-[18px] p-7 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-5 text-left w-full">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2.5">
                    <Award className="w-5 h-5 text-[#22D3EE]" />
                    <h2 className="text-lg font-display font-medium text-slate-900 dark:text-white italic">Accredited Credentials</h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                    Verified certifications and training programmes with credentials.
                  </p>
                </div>

                <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/10">
                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      onClick={() => setSelectedCertification(cert)}
                      className="p-4 rounded-xl bg-white/40 dark:bg-white/[0.02] backdrop-blur-md border border-slate-200/30 dark:border-white/[0.05] hover:border-[#22D3EE]/40 dark:hover:border-[#22D3EE]/40 transition-all duration-300 shadow-inner flex flex-col justify-between cursor-pointer group/cert text-left"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-xs font-semibold text-slate-900 dark:text-white leading-tight group-hover/cert:text-[#22D3EE] transition-colors">
                            {cert.title}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                          <span className="flex items-center">
                            {cert.issuer}
                          </span>
                          <span className="font-mono text-[9px]">{cert.date}</span>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-white/[0.03] flex items-center justify-between text-[9px] font-mono text-slate-400 dark:text-slate-500">
                        <span>Credential ID: <span className="font-bold text-slate-500 dark:text-slate-400">{cert.credentialId || 'VERIFIED'}</span></span>
                        <span className="text-[#3B82F6] dark:text-[#22D3EE] font-bold underline flex items-center">
                          View Certificate
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-slate-200/30 dark:border-white/[0.03] mt-5 text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest flex items-center justify-between">
                <span>Verified Seals</span>
                <span className="text-[#22D3EE] font-semibold">{certifications.length} Registered Credentials</span>
              </div>
                </motion.section>

            {/* ========================================================= */}
            {/* CARD 8: DETAILED ACHIEVEMENTS & PAPERS (lg:col-span-4)     */}
            {/* ========================================================= */}
            <motion.section
              id="bento-achievements"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 cosmic-card rounded-[18px] p-7 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-5 text-left w-full">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2.5">
                    <Star className="w-5 h-5 text-[#22D3EE]" />
                    <h2 className="text-lg font-display font-medium text-slate-900 dark:text-white italic">Key Milestones</h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                    Research publications, strategy presentations, and civic leadership achievements.
                  </p>
                </div>

                <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/10">
                  {achievements.map((ach) => {
                    const isPaper = ach.category === 'paper';
                    const scoreLabel = isPaper ? "Peer-Review Approval" : "Leadership Assessment";
                    
                    return (
                      <div
                        key={ach.id}
                        className="p-4 rounded-xl bg-white/40 dark:bg-white/[0.02] backdrop-blur-md border border-slate-200/30 dark:border-white/[0.05] hover:border-[#22D3EE]/30 transition-all duration-300 shadow-inner"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2 py-0.5 rounded bg-slate-100/60 dark:bg-white/[0.02] border border-slate-200/10 dark:border-white/[0.02] text-[8px] font-mono font-bold text-slate-400 uppercase tracking-wider shrink-0">
                            {isPaper ? 'Research / Paper' : 'Leadership'}
                          </span>
                          <span className="text-[9px] font-mono font-bold text-[#3B82F6] dark:text-[#22D3EE] tracking-wider shrink-0">
                            {ach.date}
                          </span>
                        </div>
                        
                        <h4 className="text-xs font-semibold text-slate-900 dark:text-white mt-2 leading-snug">
                          {ach.title}
                        </h4>
                        
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-normal">
                          {ach.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-5 border-t border-slate-200/30 dark:border-white/[0.03] mt-5 text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest text-center">
                🏆 RYLA ENTREPRENEUR SCHOLAR HONOREE
              </div>
            </motion.section>

            {/* ========================================================= */}
            {/* CARD 9: TESTIMONIALS SLIDER CARD (lg:col-span-4)          */}
            {/* ========================================================= */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 cosmic-card rounded-[18px] p-7 relative overflow-hidden flex flex-col justify-between min-h-[280px]"
            >
              <div className="space-y-5 text-left w-full">
                <div className="flex items-center justify-between border-b border-slate-200/30 dark:border-white/[0.03] pb-3">
                  <h3 className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">PROFESSIONAL ENDORSEMENTS</h3>
                  <Quote className="w-5 h-5 text-[#22D3EE]/30" />
                </div>

                <div className="space-y-4 relative min-h-[110px] flex flex-col justify-between">
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed font-normal">
                    "{testimonials[activeTestimonialIdx]?.feedback}"
                  </p>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-slate-900 border border-[#22D3EE]/30 text-[#22D3EE] flex items-center justify-center font-bold text-xs font-mono">
                      {testimonials[activeTestimonialIdx]?.avatarLetter}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block">
                        {testimonials[activeTestimonialIdx]?.name}
                      </span>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase font-mono block font-semibold tracking-wide">
                        {testimonials[activeTestimonialIdx]?.role} • {testimonials[activeTestimonialIdx]?.company}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider indicators */}
              <div className="pt-6 flex items-center justify-center space-x-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonialIdx(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      activeTestimonialIdx === i ? 'bg-[#22D3EE] w-4.5' : 'bg-slate-300 dark:bg-white/[0.1]'
                    }`}
                  />
                ))}
              </div>
            </motion.section>

            {/* ========================================================= */}
            {/* CARD 10: BLOG CURATION TOPICS (lg:col-span-4)             */}
            {/* ========================================================= */}
            <motion.section
              id="bento-blog"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 cosmic-card rounded-[18px] p-7 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-5 text-left w-full">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2.5">
                    <BookOpen className="w-5 h-5 text-[#22D3EE]" />
                    <h2 className="text-lg font-display font-medium text-slate-900 dark:text-white italic">Curation & Essays</h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                    Upcoming analytics-backed insights and marketing case audits.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: <Compass className="w-4 h-4 text-[#22D3EE]" />, title: 'Local Search Optimization' },
                    { icon: <Cpu className="w-4 h-4 text-blue-400" />, title: 'Automating Lead Databases' },
                    { icon: <TrendingUp className="w-4 h-4 text-emerald-400" />, title: 'Power BI Executive Dashboards' },
                  ].map((topic, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white/40 dark:bg-white/[0.02] border border-slate-200/30 dark:border-white/[0.03] flex items-center space-x-3.5 hover:border-[#22D3EE]/10 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-slate-900 text-[#22D3EE] border border-white/[0.04] shadow-inner">
                        {topic.icon}
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block">
                          {topic.title}
                        </span>
                        <span className="text-[8px] font-mono text-[#3B82F6] dark:text-[#22D3EE] font-bold uppercase tracking-widest block">
                          Drafting Phase
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-slate-200/30 dark:border-white/[0.03] mt-5 text-[9px] font-mono text-center text-slate-400 font-bold uppercase tracking-widest">
                📰 ARTICLES LAUNCHING Q3 2026
              </div>
            </motion.section>

            {/* ========================================================= */}
            {/* CARD 11: LET'S CONNECT CONTACT & GOOGLE MAPS (lg:col-span-4) */}
            {/* ========================================================= */}
            <motion.section
              id="bento-contact"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 cosmic-card rounded-[18px] p-7 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-5 text-left w-full">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2.5">
                    <Send className="w-5 h-5 text-[#22D3EE]" />
                    <h2 className="text-lg font-display font-medium text-slate-900 dark:text-white italic">Let's Connect</h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                    Initiate campaign consultations or request custom local SEO Audits.
                  </p>
                  
                  {/* Quick Social Media Links row */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 pb-1">
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-100/60 hover:bg-slate-200/80 dark:bg-white/[0.02] dark:hover:bg-white/[0.05] border border-slate-200/20 dark:border-white/[0.02] text-[10px] font-mono font-bold text-slate-600 dark:text-slate-350 hover:text-[#22D3EE] dark:hover:text-[#22D3EE] transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-3 h-3" />
                      <span>LinkedIn</span>
                    </a>
                    {personalInfo.instagram && (
                      <a
                        href={personalInfo.instagram}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-100/60 hover:bg-slate-200/80 dark:bg-white/[0.02] dark:hover:bg-white/[0.05] border border-slate-200/20 dark:border-white/[0.02] text-[10px] font-mono font-bold text-slate-600 dark:text-slate-350 hover:text-[#22D3EE] dark:hover:text-[#22D3EE] transition-colors"
                        title="Instagram"
                      >
                        <Instagram className="w-3 h-3" />
                        <span>Instagram</span>
                      </a>
                    )}
                    {(personalInfo as any).youtube && (
                      <a
                        href={(personalInfo as any).youtube}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-100/60 hover:bg-slate-200/80 dark:bg-white/[0.02] dark:hover:bg-white/[0.05] border border-slate-200/20 dark:border-white/[0.02] text-[10px] font-mono font-bold text-slate-600 dark:text-slate-350 hover:text-[#22D3EE] dark:hover:text-[#22D3EE] transition-colors"
                        title="YouTube"
                      >
                        <Youtube className="w-3 h-3" />
                        <span>YouTube</span>
                      </a>
                    )}
                  </div>
                </div>

                {submitSuccess ? (
                  <div className="p-5 rounded-2xl bg-green-500/10 border border-green-500/20 text-center space-y-3 py-8">
                    <Check className="w-9 h-9 text-green-500 mx-auto" />
                    <p className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                      {submitMessage}
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="text-[10px] font-mono font-bold text-[#22D3EE] hover:underline uppercase tracking-wider"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200/40 dark:border-white/[0.04] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#22D3EE] text-slate-800 dark:text-slate-100 placeholder-slate-400"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your Email Address"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200/40 dark:border-white/[0.04] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#22D3EE] text-slate-800 dark:text-slate-100 placeholder-slate-400"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Project Details or Message..."
                        rows={3}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        required
                        className="w-full px-4 py-3 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200/40 dark:border-white/[0.04] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#22D3EE] text-slate-800 dark:text-slate-100 placeholder-slate-400 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-gradient-to-r from-[#22D3EE] to-[#3B82F6] hover:scale-[1.01] text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-2.5 transition-all shadow-md shadow-[#22D3EE]/5 uppercase tracking-wider font-mono shimmer-btn"
                    >
                      {isSubmitting ? (
                        <span>TRANSMITTING...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>SEND SECURE MESSAGE</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Integration of real Google Maps Embed styled beautifully */}
                <div className="pt-2 border-t border-slate-200/30 dark:border-white/[0.03]">
                  <p className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">GEOGRAPHIC BASE</p>
                  <div className="w-full h-24 rounded-xl overflow-hidden border border-slate-200/40 dark:border-white/[0.04] map-container">
                    <iframe 
                      title="Coimbatore Base Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d15665.414002613437!2d76.953579!3d11.016844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f973b7b%3A0x2fe7a5a3bcff252b!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1689000000000!5m2!1sen!2sin" 
                      className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 dark:invert-[90%] dark:hue-rotate-[180deg] dark:opacity-75 dark:hover:opacity-90 transition-all duration-500" 
                      allowFullScreen={false} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/30 dark:border-white/[0.03] mt-5 text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest flex items-center justify-between">
                <span>Secure SMTP Node</span>
                <span className="text-[#22D3EE] font-semibold">Coimbatore, TN</span>
              </div>
            </motion.section>

          </div>
        </main>
      </div>

      {/* ========================================================= */}
      {/* FLOATING ACTION PIECES: SCROLL TO TOP                     */}
      {/* ========================================================= */}
      {showScrollTop && (
        <button
          onClick={() => {
            const mainElement = document.getElementById('bento-main-container');
            if (mainElement) {
              mainElement.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-[#22D3EE] text-slate-950 shadow-2xl border border-[#22D3EE]/30 hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 text-slate-950" />
        </button>
      )}

      {/* ========================================================= */}
      {/* CASE STUDY REPORT DETAILS MODAL                           */}
      {/* ========================================================= */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in text-slate-100">
          <div className="bg-[#060b18] border border-white/[0.05] max-w-2xl w-full max-h-[85vh] rounded-[18px] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/[0.05] bg-[#020617]/50">
              <div className="space-y-1 text-left">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-[8px] font-mono font-bold text-[#22D3EE] tracking-widest uppercase">
                  {selectedProject.category}
                </span>
                <h3 className="text-xl font-display font-medium text-white italic">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-full hover:bg-white/[0.03] text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
              {/* Overview Section */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Project Overview</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {selectedProject.overview}
                </p>
              </div>

              {/* Problem section */}
              {selectedProject.problem && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">The Challenge</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {selectedProject.problem}
                  </p>
                </div>
              )}

              {/* My Contribution */}
              {(selectedProject.myContribution || selectedProject.solution) && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono font-bold uppercase text-[#22D3EE] tracking-wider">My Contribution</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {selectedProject.myContribution || selectedProject.solution}
                  </p>
                </div>
              )}

              {/* What I Learned */}
              {(selectedProject.whatILearned || selectedProject.learnings) && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono font-bold uppercase text-[#22D3EE] tracking-wider">What I Learned</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {selectedProject.whatILearned || selectedProject.learnings}
                  </p>
                </div>
              )}

              {/* Project Outcome */}
              {(selectedProject.projectOutcome || selectedProject.businessImpact) && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono font-bold uppercase text-[#22D3EE] tracking-wider">Project Outcome</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {selectedProject.projectOutcome || selectedProject.businessImpact}
                  </p>
                </div>
              )}

              {/* Skills Used */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Skills & Tools Used</h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedProject.skillsUsed || selectedProject.tools).map((skill: string) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded bg-[#22D3EE]/5 border border-[#22D3EE]/10 text-xs font-mono font-semibold text-[#22D3EE]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Business Results */}
              {selectedProject.results && selectedProject.results.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Key Details & Outcomes</h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-300 font-normal">
                    {selectedProject.results.map((r: string, idx: number) => (
                      <li key={idx} className="leading-relaxed">{r}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-[#020617]/50 border-t border-white/[0.05] flex items-center justify-between">
              {selectedProject.liveDemo ? (
                <a
                  href={selectedProject.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-mono font-bold text-[#22D3EE] hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                  LIVE DEMO / CASE STUDY Link
                </a>
              ) : (
                <div />
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 bg-gradient-to-r from-[#22D3EE] to-[#3B82F6] text-slate-950 rounded-xl text-xs font-bold font-mono tracking-wider"
              >
                CLOSE REPORT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certification Detail Modal */}
      <CertificationDetailModal
        isOpen={!!selectedCertification}
        onClose={() => setSelectedCertification(null)}
        certification={selectedCertification}
      />

    </div>
  );
}
