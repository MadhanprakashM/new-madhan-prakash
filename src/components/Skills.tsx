import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { skillGroups } from '../data/portfolioData';
import { 
  Compass, 
  Search, 
  Sparkles, 
  Video, 
  Target, 
  BarChart2, 
  Truck, 
  CheckCircle2,
  Filter,
  Layers
} from 'lucide-react';
import { TabSwitcher, AnimatedPanel } from './InteractiveComponents';

export default function Skills() {
  const [activeTab, setActiveTab] = useState<'All' | string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...skillGroups.map((g) => g.category)];
  const tabs = categories.map((cat) => ({ id: cat, label: cat }));

  // Helper to map category name to an icon
  const getCategoryIcon = (category: string) => {
    const name = category.toLowerCase();
    if (name.includes('digital marketing')) return <Compass className="w-5 h-5 text-[#1A3636] dark:text-[#D6BD98]" />;
    if (name.includes('seo')) return <Search className="w-5 h-5 text-[#1A3636] dark:text-[#D6BD98]" />;
    if (name.includes('ai & productivity')) return <Sparkles className="w-5 h-5 text-[#1A3636] dark:text-[#D6BD98]" />;
    if (name.includes('design')) return <Video className="w-5 h-5 text-[#1A3636] dark:text-[#D6BD98]" />;
    if (name.includes('lead generation') || name.includes('research')) return <Target className="w-5 h-5 text-[#1A3636] dark:text-[#D6BD98]" />;
    if (name.includes('analytics')) return <BarChart2 className="w-5 h-5 text-[#1A3636] dark:text-[#D6BD98]" />;
    if (name.includes('logistics')) return <Truck className="w-5 h-5 text-[#1A3636] dark:text-[#D6BD98]" />;
    return <CheckCircle2 className="w-5 h-5 text-[#1A3636] dark:text-[#D6BD98]" />;
  };

  const getChipColors = (category: string) => {
    const name = category.toLowerCase();
    if (name.includes('digital marketing')) {
      return 'bg-[#B38F6F]/10 text-[#40534C] dark:text-[#D6BD98] border-[#B38F6F]/25 dark:bg-[#B38F6F]/15 dark:border-[#B38F6F]/30';
    }
    if (name.includes('analytics')) {
      return 'bg-[#40534C]/10 text-[#1A3636] dark:text-[#D6BD98] border-[#40534C]/25 dark:bg-[#40534C]/20 dark:border-[#D6BD98]/25';
    }
    if (name.includes('research')) {
      return 'bg-[#677D6A]/10 text-[#1A3636] dark:text-[#D6BD98] border-[#677D6A]/25 dark:bg-[#677D6A]/20 dark:border-[#677D6A]/30';
    }
    if (name.includes('content')) {
      return 'bg-[#D6BD98]/20 text-[#1A3636] dark:text-[#D6BD98] border-[#D6BD98]/40 dark:bg-[#D6BD98]/15 dark:border-[#D6BD98]/30';
    }
    if (name.includes('seo')) {
      return 'bg-[#677D6A]/15 text-[#1A3636] dark:text-[#D6BD98] border-[#677D6A]/30 dark:bg-[#677D6A]/25 dark:border-[#677D6A]/40';
    }
    if (name.includes('design') || name.includes('creative')) {
      return 'bg-[#B38F6F]/15 text-[#40534C] dark:text-[#D6BD98] border-[#B38F6F]/30 dark:bg-[#B38F6F]/20 dark:border-[#B38F6F]/40';
    }
    return 'bg-[#1A3636]/10 text-[#1A3636] dark:text-[#D6BD98] border-[#1A3636]/20 dark:bg-[#1A3636]/30 dark:border-[#D6BD98]/25';
  };

  const filteredGroups = useMemo(() => {
    let result = activeTab === 'All'
      ? skillGroups
      : skillGroups.filter((g) => g.category === activeTab);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.map((g) => ({
        ...g,
        skills: g.skills.filter((s) => s.name.toLowerCase().includes(q))
      })).filter((g) => g.skills.length > 0);
    }

    return result;
  }, [activeTab, searchQuery]);

  const animateFadeUp = {
    hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } 
    }
  };

  return (
    <section id="skills" className="py-14 sm:py-20 bg-transparent relative overflow-hidden">
      {/* Background matrix */}
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
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 space-y-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={animateFadeUp}
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/80 dark:bg-[#1A3636]/70 border border-[#40534C]/20 dark:border-[#D6BD98]/25 rounded-full text-[#1A3636] dark:text-[#D6BD98] text-xs font-semibold uppercase tracking-[0.24em] shadow-2xs backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#677D6A] dark:text-[#D6BD98]" />
            <span>TECHNICAL & PROFESSIONAL SKILLS</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-display font-bold text-brand-dark tracking-tight">
            Skills That Deliver Impact
          </h2>
          <div className="w-12 h-1 bg-[#1A3636] dark:bg-[#D6BD98] mx-auto rounded-full" />
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto pt-1">
            Practical tool proficiency, data analytics stacks, and core commercial competencies organized for easy recruiter discovery.
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills (e.g. Power BI, SEO, Meta Ads, Apollo)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/85 dark:bg-[#1A3636]/60 border border-[#40534C]/20 dark:border-[#D6BD98]/25 text-xs sm:text-sm text-brand-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A3636] dark:focus:ring-[#D6BD98] shadow-sm backdrop-blur-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Tab Filter Controls */}
          <div className="flex justify-center">
            <TabSwitcher
              idPrefix="skills"
              tabs={tabs}
              activeTab={activeTab}
              onChange={(val) => setActiveTab(val)}
              ariaLabel="Skills Category Filters"
            />
          </div>
        </div>

        {/* Categorized Skills Grid */}
        <AnimatedPanel activeKey={`${activeTab}-${searchQuery}`}>
          {filteredGroups.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              No skills found matching "{searchQuery}". Try a different search term.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch text-left">
              {filteredGroups.map((group, gIdx) => (
                <div
                  id={`skills-group-${gIdx}`}
                  key={group.category}
                  className="p-5 sm:p-6 rounded-[24px] bg-white/80 dark:bg-[#1A3636]/40 border border-[#40534C]/15 dark:border-[#D6BD98]/20 hover:bg-white dark:hover:bg-[#1A3636]/70 hover:border-[#1A3636]/30 dark:hover:border-[#D6BD98]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-250 flex flex-col justify-between group backdrop-blur-md"
                >
                  <div>
                    {/* Group Header */}
                    <div className="flex items-center space-x-3 pb-3 border-b border-[#40534C]/10 dark:border-[#D6BD98]/15 mb-4">
                      <div className="p-2.5 bg-[#1A3636]/5 dark:bg-[#D6BD98]/10 rounded-xl shrink-0 border border-[#1A3636]/10 dark:border-[#D6BD98]/20 group-hover:scale-105 transition-transform duration-200">
                        {getCategoryIcon(group.category)}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-brand-dark text-base">
                          {group.category}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-400">
                          {group.skills.length} Competencies
                        </span>
                      </div>
                    </div>

                    {/* Skill Chips */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {group.skills.map((skill) => {
                        const chipColors = getChipColors(group.category);
                        return (
                          <span 
                            key={skill.name} 
                            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border ${chipColors} transition-all duration-200 hover:scale-[1.03] cursor-default shadow-3xs flex items-center gap-1.5`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {skill.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AnimatedPanel>

      </motion.div>
    </section>
  );
}
