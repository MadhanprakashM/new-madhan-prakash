import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sparkles, Download, Linkedin, Youtube, Instagram, Mail, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  activeSection: string;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ onOpenResume, activeSection, darkMode, toggleDarkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const prevScrollY = lastScrollYRef.current;

          // Add shadow/glass backdrop once scrolled past threshold
          setScrolled(currentScrollY > 20);

          // Hide navbar when scrolling down, show when scrolling up
          if (currentScrollY > prevScrollY && currentScrollY > 80) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          lastScrollYRef.current = currentScrollY;
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'MBA Journey', href: '#academic' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Research', href: '#research' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      id="main-nav"
      aria-label="Primary navigation"
      className={`fixed left-0 right-0 z-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
        isVisible ? 'top-5 translate-y-0' : '-top-28 -translate-y-full'
      }`}
    >
      <div
        className={`w-full rounded-2xl border border-slate-300/60 dark:border-[#40534C]/50 bg-white/80 dark:bg-[#1A3636]/60 py-2.5 px-6 shadow-lg dark:shadow-black/20 backdrop-blur-xl transition-all duration-500 relative overflow-hidden ${
          scrolled 
            ? 'shadow-xl shadow-[#1A3636]/[0.06] border-[#1A3636]/25 dark:border-[#D6BD98]/30 bg-[#F2F1ED]/95 dark:bg-[#0F1D1D]/90' 
            : 'shadow-md shadow-slate-200/40 dark:shadow-black/10'
        }`}
      >
        {/* Subtle top shine accent */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#1A3636]/30 dark:via-[#D6BD98]/35 to-transparent opacity-60" />

        <div className="flex items-center justify-between">
          {/* Logo on Left */}
          <a
            id="nav-logo"
            href="#home"
            className="flex items-center space-x-2.5 group focus:outline-none shrink-0"
          >
            {personalInfo.avatarUrl ? (
              <img
                src={personalInfo.avatarUrl}
                alt="M. Madhan Prakash profile photo"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                width="32"
                height="32"
                className="w-8 h-8 rounded-lg object-cover border border-[#40534C]/20 dark:border-[#D6BD98]/25 group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-[#1A3636] dark:bg-[#D6BD98] text-[#F2F1ED] dark:text-[#161616] flex items-center justify-center font-display font-bold text-sm shadow-xs">
                MP
              </div>
            )}
            <div className="flex flex-col shrink-0">
              <span className="font-display font-bold text-brand-dark dark:text-[#F2F1ED] tracking-tight leading-tight text-sm whitespace-nowrap">
                M. Madhan Prakash
              </span>
              <span className="text-[10px] sm:text-xs text-brand-paragraph dark:text-[#A8B8AE] font-medium tracking-wide flex items-center whitespace-nowrap">
                Digital Marketer <Sparkles className="w-2.5 h-2.5 ml-1 text-[#677D6A] dark:text-[#D6BD98] animate-pulse" />
              </span>
            </div>
          </a>

          {/* Menu on Right - Desktop */}
          <div className="hidden xl:flex items-center space-x-1 xl:space-x-2 shrink-0">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  id={`nav-link-${item.name.toLowerCase()}`}
                  key={item.name}
                  href={item.href}
                  className={`relative px-2.5 xl:px-3 py-1.5 text-[10px] xl:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isActive ? 'text-[#1A3636] dark:text-[#D6BD98]' : 'text-brand-paragraph hover:text-[#1A3636] dark:hover:text-[#D6BD98]'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-[#1A3636]/10 dark:bg-[#D6BD98]/15 rounded-xl z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Subtle underline hover effect */}
                  {!isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-[#1A3636]/40 dark:bg-[#D6BD98]/40 scale-x-0 hover:scale-x-100 transition-transform origin-center duration-300 z-10" />
                  )}
                </a>
              );
            })}

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 ml-1 rounded-xl text-brand-paragraph hover:text-[#1A3636] dark:hover:text-[#D6BD98] hover:bg-[#1A3636]/5 dark:hover:bg-[#D6BD98]/10 transition-all cursor-pointer relative overflow-hidden flex items-center justify-center min-w-[32px] min-h-[32px] focus:outline-none"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode ? "dark" : "light"}
                  initial={{ opacity: 0, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(3px)' }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  {darkMode ? (
                    <Sun className="w-3.5 h-3.5 text-[#D6BD98] filter drop-shadow-[0_0_5px_rgba(214,189,152,0.5)]" />
                  ) : (
                    <Moon className="w-3.5 h-3.5 text-[#1A3636] filter drop-shadow-[0_0_5px_rgba(26,54,54,0.35)]" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Vertical Divider */}
            <div className="h-4 w-px bg-slate-300/60 dark:bg-slate-800/80 mx-1.5" />

            {/* Resume Button */}
            <a
              id="nav-action-resume"
              href={personalInfo.resumeUrl || "https://drive.google.com/file/d/1J1MOQDqzKJVOFbmTO-D7vPfFIcUtsaFc/view?usp=drivesdk"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open M. Madhan Prakash Resume PDF"
              className="inline-flex items-center justify-center px-3 py-1.5 bg-white/70 dark:bg-[#1A3636]/60 border border-[#40534C]/25 dark:border-[#D6BD98]/30 text-brand-paragraph dark:text-[#F2F1ED] hover:text-[#1A3636] dark:hover:text-[#D6BD98] hover:border-[#1A3636]/40 dark:hover:border-[#D6BD98] hover:shadow-2xs rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <Download className="w-3 h-3 mr-1 text-[#1A3636] dark:text-[#D6BD98]" />
              Resume
            </a>

            {/* Let's Connect CTA Button */}
            <a
              id="nav-action-connect"
              href="#contact"
              className="inline-flex items-center justify-center px-4 py-1.5 bg-[#1A3636] hover:bg-[#40534C] dark:bg-[#D6BD98] dark:hover:bg-[#B38F6F] text-[#F2F1ED] dark:text-[#161616] shadow-sm hover:shadow-md hover:shadow-[#1A3636]/15 hover:-translate-y-0.5 active:translate-y-0 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Let's Connect
              <motion.span
                className="ml-1"
                animate={{ x: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                ➔
              </motion.span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center xl:hidden space-x-1.5">
            {/* Mobile Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl text-brand-dark dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none cursor-pointer overflow-hidden flex items-center justify-center min-w-[48px] min-h-[48px]"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode ? "dark" : "light"}
                  initial={{ opacity: 0, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(3px)' }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  {darkMode ? (
                    <Sun className="w-4.5 h-4.5 text-[#D6BD98] filter drop-shadow-[0_0_6px_rgba(214,189,152,0.5)]" />
                  ) : (
                    <Moon className="w-4.5 h-4.5 text-[#1A3636] filter drop-shadow-[0_0_6px_rgba(26,54,54,0.35)]" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-brand-dark hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none min-w-[48px] min-h-[48px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-drawer"
            variants={{
              hidden: { opacity: 0, scale: 0.95, y: -12 },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  duration: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                  staggerChildren: 0.04,
                  delayChildren: 0.02
                }
              },
              exit: {
                opacity: 0,
                scale: 0.95,
                y: -12,
                transition: {
                  duration: 0.15,
                  ease: "easeInOut"
                }
              }
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="xl:hidden mt-2 border border-slate-200/80 dark:border-slate-800/85 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md rounded-2xl shadow-xl p-4 space-y-1.5 overflow-hidden"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <motion.div
                  key={item.name}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: "easeOut" } }
                  }}
                >
                  <a
                    id={`mobile-nav-link-${item.name.toLowerCase()}`}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all min-h-[48px] flex items-center ${
                      isActive
                        ? 'bg-brand-purple/5 dark:bg-brand-purple/10 text-brand-purple font-bold'
                        : 'text-brand-paragraph hover:bg-slate-50 dark:hover:bg-slate-900/60 hover:text-brand-purple'
                    }`}
                  >
                    {item.name}
                  </a>
                </motion.div>
              );
            })}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } }
              }}
              className="pt-2.5 border-t border-brand-border/60 dark:border-slate-800/50 flex flex-col space-y-3"
            >
              {/* Social Icons for Mobile */}
              <div className="flex items-center justify-center space-x-4 py-1">
                {personalInfo.linkedin && (
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl text-[#0077B5] dark:text-[#3babeb] hover:bg-[#0077B5]/10 dark:hover:bg-[#0077B5]/15 transition-all cursor-pointer min-w-[48px] min-h-[48px] flex items-center justify-center"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-[#0077B5] dark:text-[#3babeb]" />
                  </a>
                )}
                {personalInfo.youtube && (
                  <a
                    href={personalInfo.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl text-[#FF0000] dark:text-[#ff3b3b] hover:bg-[#FF0000]/10 dark:hover:bg-[#FF0000]/15 transition-all cursor-pointer min-w-[48px] min-h-[48px] flex items-center justify-center"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-5 h-5 text-[#FF0000] dark:text-[#ff3b3b]" />
                  </a>
                )}
                {personalInfo.instagram && (
                  <a
                    href={personalInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl text-[#E1306C] dark:text-[#f25287] hover:bg-[#E1306C]/10 dark:hover:bg-[#E1306C]/15 transition-all cursor-pointer min-w-[48px] min-h-[48px] flex items-center justify-center"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 text-[#E1306C] dark:text-[#f25287]" />
                  </a>
                )}
                {personalInfo.email && (
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="p-3 rounded-xl text-[#EA4335] dark:text-[#ff5e50] hover:bg-[#EA4335]/10 dark:hover:bg-[#EA4335]/15 transition-all cursor-pointer min-w-[48px] min-h-[48px] flex items-center justify-center"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5 text-[#EA4335] dark:text-[#ff5e50]" />
                  </a>
                )}
              </div>

              <a
                id="mobile-nav-action-resume"
                href={personalInfo.resumeUrl || "https://drive.google.com/file/d/1J1MOQDqzKJVOFbmTO-D7vPfFIcUtsaFc/view?usp=drivesdk"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center px-4 py-3 bg-brand-purple hover:bg-brand-purple-light text-white font-semibold rounded-xl text-xs shadow-md transition-all cursor-pointer min-h-[48px]"
              >
                <Download className="w-4 h-4 mr-1.5 text-white" />
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
