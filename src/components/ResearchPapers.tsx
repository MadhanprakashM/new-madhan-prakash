import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  FileText, 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  Calendar, 
  Building2, 
  Bookmark, 
  Sparkles,
  Search,
  Tag
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface ResearchPaper {
  id: string;
  title: string;
  publicationVenue: string;
  date: string;
  year: string;
  type: 'Peer-Reviewed Journal' | 'ISBN Book Chapter' | 'International Conference' | 'National Seminar';
  isbnOrId?: string;
  sponsor?: string;
  abstract: string;
  keyInsights: string[];
  tags: string[];
  featured?: boolean;
}

const researchPapers: ResearchPaper[] = [
  {
    id: 'paper-ecommerce-behavior',
    title: 'A Study on Factors Influencing Online Shopping Behaviour Among College Students',
    publicationVenue: 'Published Scientific Research Paper',
    date: '2025',
    year: '2025',
    type: 'Peer-Reviewed Journal',
    isbnOrId: 'Paper ID: 1716534',
    abstract: 'An empirical investigation analyzing purchasing patterns, UI/UX trust factors, promotional influences, and checkout conversion drivers among 150+ college students across regional universities.',
    keyInsights: [
      'Identified discount sensitivity, visual product proof, and return policy transparency as primary conversion catalysts.',
      'Quantified mobile-first shopping adoption with over 84% student preferences for app-based checkout experiences.',
      'Formulated actionable recommendations for e-commerce marketers targeting Gen Z and young adult demographics.'
    ],
    tags: ['E-Commerce Analytics', 'Consumer Behavior', 'Gen Z Purchasing', 'Quantitative Research', 'Survey Methodology'],
    featured: true
  },
  {
    id: 'paper-financial-inclusion',
    title: 'Opportunities, Access and Challenges of Financial Inclusion in India',
    publicationVenue: 'International Seminar on "Envisioning 2047: Role of Digital Currencies in Achieving Viksit Bharat"',
    date: 'August 29, 2024',
    year: '2024',
    type: 'International Conference',
    sponsor: 'Sponsored by ICMAI & Sri Ramakrishna College of Arts and Science',
    isbnOrId: 'ISBN Registered Seminar Proceedings',
    abstract: 'Explores digital currency mechanisms, UPI-driven financial deepening, and fintech scalability for unbanked and semi-urban populations within the framework of the Viksit Bharat 2047 national agenda.',
    keyInsights: [
      'Evaluated Central Bank Digital Currency (CBDC) pilot implementations alongside Unified Payments Interface (UPI) metrics.',
      'Identified digital literacy and last-mile connectivity as remaining operational hurdles in rural micro-finance.',
      'Outlined a phased framework for integrating digital lending micro-pipelines for rural entrepreneurs.'
    ],
    tags: ['Financial Inclusion', 'Digital Currencies', 'CBDC', 'Fintech', 'ICMAI Sponsored'],
    featured: true
  },
  {
    id: 'paper-tomorrows-accountant',
    title: "Tomorrow's Accountant: Role of Cost and Management Accountant in Digital Future",
    publicationVenue: 'National Seminar Proceedings Book on Digital Accounting Transformation',
    date: 'August 24, 2023',
    year: '2023',
    type: 'ISBN Book Chapter',
    sponsor: 'Sponsored by Institute of Cost Accountants of India (ICMAI)',
    isbnOrId: 'ISBN Book Publication',
    abstract: 'Co-authored scientific paper analyzing automation, predictive ERP integration, and the strategic evolution of cost management accountants from record-keepers to strategic growth advisors.',
    keyInsights: [
      'Assessed algorithmic financial reporting systems reducing reconciliation cycles by up to 60%.',
      'Highlighted the increasing imperative for management accountants to master data visualization tools and predictive analytics.',
      'Published in official ISBN-registered seminar proceedings book.'
    ],
    tags: ['Cost Accounting', 'Digital Transformation', 'ERP Analytics', 'ISBN Publication', 'ICMAI'],
    featured: false
  },
  {
    id: 'paper-entrepreneurship-dm',
    title: 'Entrepreneurship in Digital Marketing: Nurturing Innovation and Growth',
    publicationVenue: 'International Conference on "Entrepreneurship and Start-up Culture: Nurturing Innovation and Growth"',
    date: 'July 21, 2023',
    year: '2023',
    type: 'International Conference',
    sponsor: 'Don Bosco College of Arts and Science, Thoothukudi',
    abstract: 'Investigated bootstrapping growth strategies, content-led customer acquisition, and cost-effective organic ad funnels for micro-enterprises and regional tech startups.',
    keyInsights: [
      'Demonstrated how hyper-localized short-form video content cuts customer acquisition costs compared to legacy channels.',
      'Presented real-world case comparisons of startup customer acquisition pipelines in tier-2 and tier-3 Indian cities.'
    ],
    tags: ['Digital Entrepreneurship', 'Startup Growth', 'Low-CAC Funnels', 'Content Strategy'],
    featured: false
  }
];

export default function ResearchPapers() {
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredPapers = selectedType === 'all'
    ? researchPapers
    : researchPapers.filter((p) => p.type === selectedType);

  return (
    <section 
      id="research" 
      className="py-20 lg:py-28 relative bg-transparent scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1A3636]/10 dark:bg-[#D6BD98]/10 border border-[#1A3636]/20 dark:border-[#D6BD98]/20 text-[#1A3636] dark:text-[#D6BD98] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 mr-1" />
            <span>Academic Scholarship & Publications</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brand-dark tracking-tight leading-tight">
            Research Papers & Publications
          </h2>

          <div className="w-16 h-1 bg-[#1A3636] dark:bg-[#D6BD98] mx-auto rounded-full" />

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Scientific research papers, ISBN-published seminar proceedings, and peer-reviewed studies examining consumer behavior, digital finance, and performance marketing strategies.
          </p>
        </div>

        {/* Overview Metric Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { value: '3', label: 'ISBN & Peer-Reviewed Papers', icon: Bookmark },
            { value: '8+', label: 'Seminar Presentations', icon: FileText },
            { value: '2025', label: 'Latest E-Commerce Paper', icon: Calendar },
            { value: 'ICMAI', label: 'Sponsored Recognitions', icon: Building2 },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-[#1A3636]/40 border border-[#40534C]/15 dark:border-[#D6BD98]/20 backdrop-blur-md text-center shadow-3xs hover:shadow-xs transition-all"
              >
                <div className="w-9 h-9 mx-auto mb-2.5 rounded-xl bg-[#1A3636]/5 dark:bg-[#D6BD98]/10 text-[#1A3636] dark:text-[#D6BD98] flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="font-display font-bold text-2xl sm:text-3xl text-brand-dark tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Papers Filter Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Publications (4)' },
            { id: 'Peer-Reviewed Journal', label: 'Peer-Reviewed (1)' },
            { id: 'ISBN Book Chapter', label: 'ISBN Books (1)' },
            { id: 'International Conference', label: 'International Conferences (2)' },
          ].map((tab) => {
            const active = selectedType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  active
                    ? 'bg-[#1A3636] text-[#F2F1ED] dark:bg-[#D6BD98] dark:text-[#161616] shadow-sm'
                    : 'bg-white/60 dark:bg-[#1A3636]/30 text-slate-600 dark:text-slate-300 border border-[#40534C]/15 dark:border-[#D6BD98]/20 hover:border-[#1A3636]/40 dark:hover:border-[#D6BD98]/40'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Research Papers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {filteredPapers.map((paper, index) => (
            <motion.article
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group p-6 sm:p-8 rounded-[24px] bg-white/80 dark:bg-[#1A3636]/45 border border-[#40534C]/15 dark:border-[#D6BD98]/20 backdrop-blur-xl hover:border-[#1A3636]/40 dark:hover:border-[#D6BD98]/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header Meta Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#1A3636]/10 dark:bg-[#D6BD98]/15 text-[#1A3636] dark:text-[#D6BD98] border border-[#1A3636]/15 dark:border-[#D6BD98]/20">
                      {paper.type}
                    </span>
                    {paper.isbnOrId && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                        {paper.isbnOrId}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-[#40534C] dark:text-[#D6BD98]" />
                    {paper.date}
                  </span>
                </div>

                {/* Paper Title */}
                <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-dark leading-snug group-hover:text-[#40534C] dark:group-hover:text-[#D6BD98] transition-colors">
                  {paper.title}
                </h3>

                {/* Publication Venue */}
                <div className="flex items-start text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <Building2 className="w-4 h-4 mr-2 text-[#40534C] dark:text-[#D6BD98] shrink-0 mt-0.5" />
                  <span>{paper.publicationVenue}</span>
                </div>

                {paper.sponsor && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 pl-6 italic">
                    {paper.sponsor}
                  </div>
                )}

                {/* Abstract */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                  {paper.abstract}
                </p>

                {/* Key Research Takeaways */}
                <div className="space-y-2 pt-2 border-t border-[#40534C]/10 dark:border-[#D6BD98]/10">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center">
                    <Sparkles className="w-3 h-3 mr-1.5 text-[#1A3636] dark:text-[#D6BD98]" />
                    <span>Key Findings & Analytical Contributions</span>
                  </div>
                  <ul className="space-y-1.5">
                    {paper.keyInsights.map((insight, i) => (
                      <li key={i} className="flex items-start text-xs text-slate-600 dark:text-slate-300 leading-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tags & Skills Footer */}
              <div className="pt-5 mt-5 border-t border-[#40534C]/10 dark:border-[#D6BD98]/10 flex flex-wrap gap-1.5">
                {paper.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-medium bg-[#1A3636]/5 dark:bg-[#D6BD98]/5 text-slate-600 dark:text-slate-300 border border-[#40534C]/10 dark:border-[#D6BD98]/15"
                  >
                    <Tag className="w-2.5 h-2.5 mr-1 text-[#40534C] dark:text-[#D6BD98]" />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom Academic Distinction Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white/60 dark:bg-[#1A3636]/30 border border-[#40534C]/15 dark:border-[#D6BD98]/20 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#1A3636] dark:bg-[#D6BD98] text-white dark:text-[#1A3636] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm sm:text-base text-brand-dark">
                Inter-College Paper Presentation Honors
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Presented research findings across 8+ regional institutes including SRCAS, Ayya Nadar Janaki Ammal College, and Don Bosco College.
              </p>
            </div>
          </div>

          <a
            href={personalInfo.resumeUrl || "https://drive.google.com/file/d/1J1MOQDqzKJVOFbmTO-D7vPfFIcUtsaFc/view?usp=drivesdk"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#1A3636] hover:bg-[#40534C] dark:bg-[#D6BD98] dark:hover:bg-[#B38F6F] text-[#F2F1ED] dark:text-[#161616] text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-250 shadow-sm shrink-0 inline-flex items-center"
          >
            <span>View Full Resume</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
