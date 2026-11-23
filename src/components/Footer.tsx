import React from 'react';
import { 
  Mail, 
  Linkedin, 
  Instagram, 
  Youtube, 
  FileText, 
  MapPin 
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface FooterProps {
  onOpenResume?: () => void;
}

export default function Footer({ onOpenResume }: FooterProps) {
  const email = 'madhanprakashofficial@gmail.com';
  const resumeUrl = personalInfo.resumeUrl || 'https://drive.google.com/file/d/1J1MOQDqzKJVOFbmTO-D7vPfFIcUtsaFc/view?usp=drivesdk';
  const locationUrl = 'https://maps.google.com/?q=Tamil+Nadu,+India';

  const contactItems = [
    {
      id: 'email',
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      icon: Mail,
      badgeClass: 'bg-[#FEECEB] dark:bg-[#EA4335]/20 text-[#EA4335] dark:text-[#ff6b5d] border border-[#EA4335]/15',
      target: undefined,
      rel: undefined,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: '/in/madhanprakashofficial',
      href: personalInfo.linkedin,
      icon: Linkedin,
      badgeClass: 'bg-[#E8F3FA] dark:bg-[#0077B5]/20 text-[#0077B5] dark:text-[#3babeb] border border-[#0077B5]/15',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      value: '@madhanprakash_5',
      href: personalInfo.instagram || 'https://www.instagram.com/madhanprakash_5/',
      icon: Instagram,
      badgeClass: 'bg-[#FCEBF2] dark:bg-[#E1306C]/20 text-[#E1306C] dark:text-[#ff5990] border border-[#E1306C]/15',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      id: 'youtube',
      label: 'YouTube',
      value: '@classicantiloofficial',
      href: personalInfo.youtube || 'https://www.youtube.com/@classictamilofficial',
      icon: Youtube,
      badgeClass: 'bg-[#FEECEB] dark:bg-[#FF0000]/20 text-[#FF0000] dark:text-[#ff4f4f] border border-[#FF0000]/15',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      id: 'resume',
      label: 'Resume',
      value: 'M_Madhan_Prakash_Resume.pdf',
      href: resumeUrl,
      icon: FileText,
      badgeClass: 'bg-[#E8F5EE] dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-500/15',
      target: '_blank',
      rel: 'noopener noreferrer',
      onClick: onOpenResume ? (e: React.MouseEvent) => {
        // Allow modal preview if user doesn't use middle click / cmd click
        if (!e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          onOpenResume();
        }
      } : undefined,
    },
    {
      id: 'location',
      label: 'Location',
      value: 'Tamil Nadu, India',
      href: locationUrl,
      icon: MapPin,
      badgeClass: 'bg-[#EBEBEB] dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300/40 dark:border-slate-700/60',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ];

  return (
    <footer 
      id="contact" 
      role="contentinfo" 
      aria-label="Contact and Portfolio Footer"
      className="w-full bg-[#FBFBF9] dark:bg-[#111A18] border-t border-slate-200/80 dark:border-[#40534C]/25 pt-12 pb-8 sm:pt-14 sm:pb-10 transition-colors relative z-10 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Accent Pill */}
        <div className="w-10 h-1 bg-[#1A3636] dark:bg-[#D6BD98] rounded-full mx-auto mb-4" aria-hidden="true" />

        {/* Small Heading */}
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-slate-100 tracking-tight text-center">
          Let's Connect
        </h2>

        {/* Short Supporting Text */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 text-center max-w-xl mx-auto mt-2 sm:mt-2.5 mb-8 sm:mb-10 leading-relaxed font-normal">
          Open to MBA roles in Marketing, B2B Sales, Business Development, Digital Marketing and Business Analytics.
        </p>

        {/* ========================================================================= */}
        {/* DESKTOP ROW (Screen width > 1024px): One clean, compact horizontal row    */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 max-w-6xl mx-auto">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <React.Fragment key={item.id}>
                <a
                  href={item.href}
                  target={item.target}
                  rel={item.rel}
                  onClick={item.onClick}
                  aria-label={`${item.label}: ${item.value}`}
                  className="flex items-center gap-2.5 px-2.5 xl:px-3 py-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-white/5 transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A3636] dark:focus-visible:ring-[#D6BD98]"
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${item.badgeClass}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="block text-[11px] font-bold text-slate-900 dark:text-slate-100 leading-tight">
                      {item.label}
                    </span>
                    <span className="block text-[12px] text-slate-600 dark:text-slate-400 group-hover:text-[#1A3636] dark:group-hover:text-[#D6BD98] transition-colors leading-tight truncate max-w-[170px] xl:max-w-none">
                      {item.value}
                    </span>
                  </div>
                </a>

                {/* Vertical Divider between items */}
                {index < contactItems.length - 1 && (
                  <div 
                    className="w-px h-7 bg-slate-200 dark:bg-slate-800 shrink-0 mx-0.5 xl:mx-1" 
                    aria-hidden="true" 
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TABLET WRAP (768px - 1024px): 3 columns x 2 balanced rows               */}
        {/* ========================================================================= */}
        <div className="hidden md:grid lg:hidden grid-cols-3 gap-3.5 max-w-2xl mx-auto">
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                target={item.target}
                rel={item.rel}
                onClick={item.onClick}
                aria-label={`${item.label}: ${item.value}`}
                className="min-h-[44px] flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50/80 dark:bg-white/5 border border-slate-200/60 dark:border-slate-800/80 hover:border-[#1A3636]/30 dark:hover:border-[#D6BD98]/30 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A3636]"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.badgeClass}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 text-left">
                  <span className="block text-[11px] font-bold text-slate-900 dark:text-slate-100 leading-tight">
                    {item.label}
                  </span>
                  <span className="block text-[11px] text-slate-600 dark:text-slate-400 group-hover:text-[#1A3636] dark:group-hover:text-[#D6BD98] truncate leading-tight">
                    {item.value}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* MOBILE LAYOUT (< 768px): Intelligent stack & grid structure              */}
        {/* ========================================================================= */}
        <div className="md:hidden space-y-2.5 max-w-sm mx-auto">
          
          {/* 1. Email (Full-width card, comfortable touch target, wraps safely) */}
          <a
            href={`mailto:${email}`}
            aria-label={`Email: ${email}`}
            className="min-h-[44px] flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/90 dark:bg-white/5 border border-slate-200/70 dark:border-slate-800 hover:border-[#1A3636]/30 dark:hover:border-[#D6BD98]/30 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A3636]"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-[#FEECEB] dark:bg-[#EA4335]/20 text-[#EA4335] dark:text-[#ff6b5d] border border-[#EA4335]/15">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0 text-left">
              <span className="block text-[11px] font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Email
              </span>
              <span className="block text-xs text-slate-600 dark:text-slate-300 font-medium leading-tight break-all">
                {email}
              </span>
            </div>
          </a>

          {/* 2. 2-Column Grid: LinkedIn, Instagram, YouTube, Resume */}
          <div className="grid grid-cols-2 gap-2">
            {/* LinkedIn */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn: /in/madhanprakashofficial"
              className="min-h-[44px] flex items-center gap-2 p-2 rounded-xl bg-slate-50/90 dark:bg-white/5 border border-slate-200/70 dark:border-slate-800 hover:border-[#0077B5]/40 transition-all group"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-[#E8F3FA] dark:bg-[#0077B5]/20 text-[#0077B5] dark:text-[#3babeb] border border-[#0077B5]/15">
                <Linkedin className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 text-left">
                <span className="block text-[10px] font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  LinkedIn
                </span>
                <span className="block text-[11px] text-slate-600 dark:text-slate-400 truncate leading-tight">
                  /in/madhan...
                </span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href={personalInfo.instagram || 'https://www.instagram.com/madhanprakash_5/'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram: @madhanprakash_5"
              className="min-h-[44px] flex items-center gap-2 p-2 rounded-xl bg-slate-50/90 dark:bg-white/5 border border-slate-200/70 dark:border-slate-800 hover:border-[#E1306C]/40 transition-all group"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-[#FCEBF2] dark:bg-[#E1306C]/20 text-[#E1306C] dark:text-[#ff5990] border border-[#E1306C]/15">
                <Instagram className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 text-left">
                <span className="block text-[10px] font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  Instagram
                </span>
                <span className="block text-[11px] text-slate-600 dark:text-slate-400 truncate leading-tight">
                  @madhan...
                </span>
              </div>
            </a>

            {/* YouTube */}
            <a
              href={personalInfo.youtube || 'https://www.youtube.com/@classictamilofficial'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube: @classicantiloofficial"
              className="min-h-[44px] flex items-center gap-2 p-2 rounded-xl bg-slate-50/90 dark:bg-white/5 border border-slate-200/70 dark:border-slate-800 hover:border-[#FF0000]/40 transition-all group"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-[#FEECEB] dark:bg-[#FF0000]/20 text-[#FF0000] dark:text-[#ff4f4f] border border-[#FF0000]/15">
                <Youtube className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 text-left">
                <span className="block text-[10px] font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  YouTube
                </span>
                <span className="block text-[11px] text-slate-600 dark:text-slate-400 truncate leading-tight">
                  @classic...
                </span>
              </div>
            </a>

            {/* Resume */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onOpenResume ? (e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onOpenResume();
                }
              } : undefined}
              aria-label="Resume: M_Madhan_Prakash_Resume.pdf"
              className="min-h-[44px] flex items-center gap-2 p-2 rounded-xl bg-slate-50/90 dark:bg-white/5 border border-slate-200/70 dark:border-slate-800 hover:border-emerald-500/40 transition-all group"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-[#E8F5EE] dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-500/15">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 text-left">
                <span className="block text-[10px] font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  Resume
                </span>
                <span className="block text-[11px] text-slate-600 dark:text-slate-400 truncate leading-tight">
                  Resume.pdf
                </span>
              </div>
            </a>
          </div>

          {/* 3. Location */}
          <a
            href={locationUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Location: Tamil Nadu, India"
            className="min-h-[44px] flex items-center justify-center gap-2 p-2 rounded-xl bg-slate-50/90 dark:bg-white/5 border border-slate-200/70 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all group"
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-[#EBEBEB] dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300/40 dark:border-slate-700/60">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <span className="inline-block text-[10px] font-bold text-slate-900 dark:text-slate-100 mr-1.5">
                Location:
              </span>
              <span className="inline-block text-[11px] text-slate-600 dark:text-slate-300">
                Tamil Nadu, India
              </span>
            </div>
          </a>
        </div>

        {/* ========================================================================= */}
        {/* SUBTLE DIVIDER ABOVE COPYRIGHT AREA                                      */}
        {/* ========================================================================= */}
        <div className="w-full border-t border-slate-200 dark:border-slate-800/80 mt-8 sm:mt-10 pt-6" aria-hidden="true" />

        {/* ========================================================================= */}
        {/* BOTTOM ROW: Desktop (Left: Copyright, Right: Status) | Mobile (Stacked)   */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          
          {/* Copyright */}
          <p className="text-xs text-slate-500 dark:text-slate-400 font-normal order-2 sm:order-1">
            © 2026 Madhan Prakash. All rights reserved.
          </p>

          {/* Open to Opportunities Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 order-1 sm:order-2">
            <span>Open to Opportunities</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}
