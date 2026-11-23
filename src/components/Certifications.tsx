import React, { useState, useMemo, lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import { certifications } from '../data/portfolioData';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Sparkles, 
  Award, 
  BookOpen, 
  Trophy, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import CertificationCard from './CertificationCard';
import { Certification } from '../types';

// Lazy load the detail modal so it is only loaded on demand when user clicks "View Certificate"
const CertificationDetailModal = lazy(() => import('./CertificationDetailModal'));

type CategoryFilter = 'all' | 'professional' | 'academic' | 'achievement';

export default function Certifications() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState<boolean>(false);

  // Filter certifications based on category and search query
  const filteredCertifications = useMemo(() => {
    const trimmedQuery = searchQuery.toLowerCase().trim();

    return certifications.filter((cert) => {
      const matchesCategory = 
        selectedCategory === 'all' || 
        cert.category === selectedCategory;

      if (!matchesCategory) return false;
      if (!trimmedQuery) return true;

      const matchTitle = cert.title.toLowerCase().includes(trimmedQuery);
      const matchIssuer = cert.issuer.toLowerCase().includes(trimmedQuery);
      const matchYear = cert.year?.toString().includes(trimmedQuery) || cert.date?.toLowerCase().includes(trimmedQuery);
      const matchId = cert.credentialId?.toLowerCase().includes(trimmedQuery);
      const matchDesc = cert.description?.toLowerCase().includes(trimmedQuery);
      const matchSkills = cert.skills?.some((s) => s.toLowerCase().includes(trimmedQuery));

      return matchTitle || matchIssuer || matchYear || matchId || matchDesc || matchSkills;
    });
  }, [selectedCategory, searchQuery]);

  // When viewing "all" category without a search filter, default to showing the top 6 featured certificates
  const isAllSectionLimited = selectedCategory === 'all' && !searchQuery.trim() && !showAll;
  const displayedCertifications = useMemo(() => {
    if (isAllSectionLimited) {
      return filteredCertifications.slice(0, 6);
    }
    return filteredCertifications;
  }, [filteredCertifications, isAllSectionLimited]);

  const hasMoreToView = selectedCategory === 'all' && !searchQuery.trim() && filteredCertifications.length > 6;
  const remainingCount = Math.max(0, filteredCertifications.length - 6);

  const handleOpenCertificate = (cert: Certification) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCert(null);
  };

  // Category counts memoized
  const categoryCounts = useMemo(() => {
    return {
      all: certifications.length,
      professional: certifications.filter((c) => c.category === 'professional').length,
      academic: certifications.filter((c) => c.category === 'academic').length,
      achievement: certifications.filter((c) => c.category === 'achievement').length,
    };
  }, []);

  const categories: { key: CategoryFilter; label: string; icon: any }[] = [
    { key: 'all', label: 'All Key Credentials', icon: Award },
    { key: 'professional', label: 'Professional & Ad Strategy', icon: Sparkles },
    { key: 'academic', label: 'Academic & Research', icon: BookOpen },
    { key: 'achievement', label: 'Competitions & Awards', icon: Trophy },
  ];

  return (
    <section id="certifications" className="py-12 sm:py-16 md:py-20 bg-transparent relative overflow-hidden">
      {/* Matrix background */}
      <div className="absolute inset-0 matrix-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-8 md:mb-10 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 bg-white/80 dark:bg-[#1A3636]/70 border border-[#40534C]/20 dark:border-[#D6BD98]/25 rounded-full text-[#1A3636] dark:text-[#D6BD98] text-xs font-semibold uppercase tracking-[0.24em] shadow-2xs backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-[#677D6A] dark:text-[#D6BD98]" />
            <span>VERIFIED CREDENTIALS ({certifications.length})</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-display font-bold text-brand-dark tracking-tight">
            Certifications & Qualifications
          </h2>
          <div className="w-12 h-1 bg-[#1A3636] dark:bg-[#D6BD98] mx-auto rounded-full" />
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto pt-1">
            Industry qualifications from Google, AICTE ATAL, HubSpot, SEMrush, and prestigious academic institutions.
          </p>
        </motion.div>

        {/* Filter & Search Bar */}
        <div className="mb-8 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 gap-2 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.key;
              const count = categoryCounts[cat.key];

              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all duration-200 shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1A3636] dark:bg-[#D6BD98] text-white dark:text-[#1A3636] shadow-md shadow-[#1A3636]/20 scale-[1.02]'
                      : 'bg-white dark:bg-[#1A3636]/60 border border-[#40534C]/20 dark:border-[#D6BD98]/20 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1A3636]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 dark:bg-black/20 text-white dark:text-[#1A3636]' : 'bg-black/5 dark:bg-white/5 text-slate-500 dark:text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, issuer (Google, AICTE, Reliance), skill, or ID..."
              className="w-full pl-10 pr-12 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#1A3636]/60 border border-[#40534C]/20 dark:border-[#D6BD98]/20 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A3636]/30 dark:focus:ring-[#D6BD98]/30 focus:border-[#1A3636] dark:focus:border-[#D6BD98] transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Search result indicator if searching */}
          {searchQuery && (
            <div className="text-center text-xs text-slate-500 dark:text-slate-400">
              Found <span className="font-semibold text-[#1A3636] dark:text-[#D6BD98]">{filteredCertifications.length}</span> matching certificates for "<span className="text-slate-800 dark:text-slate-200">{searchQuery}</span>"
            </div>
          )}
        </div>

        {/* Certifications Grid */}
        {displayedCertifications.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-[#1A3636]/60 border border-[#40534C]/20 dark:border-[#D6BD98]/20">
            <Filter className="w-8 h-8 text-slate-400 mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No certificates match your query</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Try clearing your search term or selecting a different category filter.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-1.5 rounded-lg bg-[#1A3636]/10 dark:bg-[#D6BD98]/10 text-[#1A3636] dark:text-[#D6BD98] text-xs font-semibold hover:bg-[#1A3636] hover:text-white dark:hover:bg-[#D6BD98] dark:hover:text-[#1A3636] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 text-left">
              {displayedCertifications.map((cert, index) => (
                <CertificationCard
                  key={cert.id}
                  certification={cert}
                  onView={handleOpenCertificate}
                  isPriority={index < 3}
                />
              ))}
            </div>

            {/* "View More" / "Show Less" Expand Action */}
            {hasMoreToView && (
              <motion.div 
                className="mt-10 flex flex-col items-center justify-center space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  id="certifications-view-more-btn"
                  type="button"
                  onClick={() => setShowAll((prev) => !prev)}
                  className="group inline-flex items-center space-x-2.5 px-6 py-3 rounded-xl bg-[#1A3636] dark:bg-[#D6BD98] text-white dark:text-[#1A3636] font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#1A3636]/20 dark:shadow-[#D6BD98]/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  <span>
                    {showAll 
                      ? 'Show Less (Top 6 Featured)' 
                      : `View More Certificates (+${remainingCount} More)`}
                  </span>
                  {showAll ? (
                    <ChevronUp className="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform" />
                  ) : (
                    <ChevronDown className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform" />
                  )}
                </button>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {showAll 
                    ? `Showing all ${filteredCertifications.length} verified credentials & research presentations` 
                    : `Showing 6 of ${filteredCertifications.length} verified credentials`}
                </p>
              </motion.div>
            )}
          </>
        )}

      </div>

      {/* Lazy-Loaded Certification Detail & Document Modal */}
      {isModalOpen && (
        <Suspense fallback={null}>
          <CertificationDetailModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            certification={selectedCert}
          />
        </Suspense>
      )}
    </section>
  );
}
