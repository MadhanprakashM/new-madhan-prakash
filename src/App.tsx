import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ImpactMetrics from './components/ImpactMetrics';
import About from './components/About';
import Academic from './components/Academic';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import ResearchPapers from './components/ResearchPapers';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';
import PremiumBackground from './components/PremiumBackground';
import CustomCursor from './components/CustomCursor';

const ResumePreviewModal = lazy(() => import('./components/ResumePreviewModal'));

export default function App() {
  const [showResumeModal, setShowResumeModal] = useState<boolean>(false);
  const [is404, setIs404] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Monitor location hash to support simulated 404 views
  useEffect(() => {
    const checkHash = () => {
      setIs404(window.location.hash === '#404');
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Set the correct page title and metadata
  useEffect(() => {
    document.title = 'M. Madhan Prakash | MBA Marketing, Digital Marketing & Business Analytics';
  }, []);

  // Unified Intersection Observer to track scroll positions efficiently
  useEffect(() => {
    const sectionIds = [
      'home',
      'impact',
      'about',
      'academic',
      'experience',
      'skills',
      'certifications',
      'research',
      'testimonials',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -45% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    const elements: HTMLElement[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <ErrorBoundary>
      {is404 ? (
        <NotFound
          onBackToHome={() => {
            window.location.hash = '';
            setIs404(false);
          }}
        />
      ) : (
        <div className="text-brand-dark min-h-screen relative font-sans antialiased selection:bg-brand-purple/15 selection:text-brand-dark overflow-x-hidden">
          {/* Subtle desktop interactive cursor */}
          <CustomCursor />

          {/* Layered luxury animated background */}
          <PremiumBackground />
          
          {/* Sticky responsive Navbar */}
          <Navbar
            activeSection={activeSection}
            onOpenResume={() => setShowResumeModal(true)}
            darkMode={darkMode}
            toggleDarkMode={() => setDarkMode(!darkMode)}
          />

          {/* Page Sections */}
          <main id="portfolio-scroll-container" className="space-y-0">
            
            {/* 1. Hero / Home Section */}
            <Hero onOpenResumeModal={() => setShowResumeModal(true)} />

            {/* 2. Real Impact in Numbers Cards */}
            <ImpactMetrics />

            {/* 3. About Me Section */}
            <About />

            {/* 4. Academic Profile & MBA Journey Timeline */}
            <Academic />

            {/* 6. Work & Practical Experience Section */}
            <Experience />

            {/* 7. Technical & Professional Skills Matrix */}
            <Skills />

            {/* 8. Verified Credentials & Certifications */}
            <Certifications />

            {/* 9. Scientific Research Papers & Seminar Publications */}
            <ResearchPapers />

            {/* 10. Testimonials & Faculty Endorsements */}
            <Testimonials />

          </main>

          {/* Clean, Compact Recruiter Footer / Contact */}
          <Footer onOpenResume={() => setShowResumeModal(true)} />

          {/* Interactive Resume Sheet Modal */}
          {showResumeModal && (
            <Suspense fallback={<div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs"><div className="w-8 h-8 rounded-full border-2 border-brand-purple border-t-transparent animate-spin" /></div>}>
              <ResumePreviewModal onClose={() => setShowResumeModal(false)} />
            </Suspense>
          )}
          
        </div>
      )}
    </ErrorBoundary>
  );
}
