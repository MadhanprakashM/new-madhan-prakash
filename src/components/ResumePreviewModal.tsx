import React from 'react';
import { X, Printer, Download, Sparkles, Phone, Mail, MapPin, Linkedin, ExternalLink } from 'lucide-react';
import { personalInfo, educationHistory, certifications, experiences, achievements, skillGroups } from '../data/portfolioData';

interface ResumePreviewModalProps {
  onClose: () => void;
}

export default function ResumePreviewModal({ onClose }: ResumePreviewModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if ((e.target as HTMLElement).id === 'resume-modal-backdrop') {
          onClose();
        }
      }}
    >
      <div
        id="resume-modal-container"
        className="w-full max-w-4xl bg-white dark:bg-[#1A3636]/95 rounded-3xl shadow-2xl border border-slate-200 dark:border-[#D6BD98]/20 flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Modal Controls Header - Hidden during print */}
        <div className="p-4 sm:p-5 border-b border-[#40534C]/15 dark:border-[#D6BD98]/15 flex items-center justify-between bg-slate-50 dark:bg-[#0F1D1D] print:hidden shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#1A3636] dark:bg-[#D6BD98] flex items-center justify-center text-white dark:text-[#1A3636] font-display font-bold text-xs">
              CV
            </div>
            <div>
              <h3 className="font-display font-bold text-sm sm:text-base text-brand-dark dark:text-[#F2F1ED] leading-tight">
                M. Madhan Prakash Resume
              </h3>
              <p className="text-[10px] sm:text-xs text-brand-paragraph dark:text-[#A8B8AE] font-medium">
                Optimized for standard A4 layout printing and digital systems.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              id="resume-modal-download-btn"
              href={personalInfo.resumeUrl || "https://drive.google.com/file/d/1J1MOQDqzKJVOFbmTO-D7vPfFIcUtsaFc/view?usp=drivesdk"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-3.5 py-2 bg-[#1A3636] hover:bg-[#40534C] dark:bg-[#D6BD98] dark:hover:bg-[#B38F6F] text-white dark:text-[#1A3636] rounded-xl text-xs font-bold shadow-xs transition-colors focus:outline-none cursor-pointer"
            >
              <Download className="w-4 h-4 mr-1.5" />
              Download PDF
            </a>
            <button
              id="resume-modal-print-btn"
              onClick={handlePrint}
              className="inline-flex items-center justify-center px-3.5 py-2 bg-white dark:bg-[#1A3636] border border-slate-300 dark:border-[#40534C] text-slate-700 dark:text-slate-200 hover:border-[#1A3636] dark:hover:border-[#D6BD98] rounded-xl text-xs font-bold shadow-xs transition-colors focus:outline-none cursor-pointer"
            >
              <Printer className="w-4 h-4 mr-1.5" />
              Print / Save PDF
            </button>
            <button
              id="resume-modal-close-btn"
              onClick={onClose}
              className="p-2 bg-white dark:bg-[#1A3636] border border-slate-200 dark:border-[#40534C] text-slate-500 dark:text-slate-300 hover:text-[#1A3636] dark:hover:text-[#D6BD98] rounded-xl transition-all focus:outline-none cursor-pointer"
              aria-label="Close resume preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet - Scrollable area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 text-brand-paragraph bg-white print:p-0 print:overflow-visible">
          
          {/* Printable Container */}
          <div className="max-w-3xl mx-auto space-y-8 print:text-black print:bg-white">
            
            {/* CV Header: Name & Contact Details */}
            <div className="text-center sm:text-left border-b-2 border-[#1A3636] pb-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-display font-black text-brand-dark tracking-tight print:text-black">
                    M. MADHAN PRAKASH
                  </h1>
                  <p className="text-xs sm:text-sm font-bold text-[#1A3636] mt-1 uppercase tracking-wider print:text-black">
                    MBA Student Specialized in Digital Marketing & Business Analytics
                  </p>
                </div>
                {/* Contact Columns */}
                <div className="text-xs text-brand-paragraph space-y-1 text-center sm:text-right font-medium shrink-0 print:text-black">
                  {personalInfo.phone && (
                    <p className="flex items-center justify-center sm:justify-end">
                      <Phone className="w-3.5 h-3.5 mr-1.5 text-[#1A3636]" />
                      <span>{personalInfo.phone}</span>
                    </p>
                  )}
                  <p className="flex items-center justify-center sm:justify-end">
                    <Mail className="w-3.5 h-3.5 mr-1.5 text-[#1A3636]" />
                    <span>{personalInfo.email}</span>
                  </p>
                  <p className="flex items-center justify-center sm:justify-end">
                    <Linkedin className="w-3.5 h-3.5 mr-1.5 text-[#1A3636]" />
                    <span className="underline">{personalInfo.linkedinUsername}</span>
                  </p>
                  <p className="flex items-center justify-center sm:justify-end text-[10px] text-slate-400">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{personalInfo.location}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Summary block */}
            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-sm sm:text-base text-brand-dark tracking-wide uppercase border-b border-brand-border pb-1.5 print:text-black">
                Profile Summary
              </h2>
              <p className="text-xs sm:text-sm text-brand-paragraph leading-relaxed text-justify print:text-black">
                {personalInfo.aboutStory}
              </p>
            </div>

            {/* Academic Qualification Table block - EXACTLY as shown in the Resume Screenshot! */}
            <div className="space-y-3">
              <h2 className="font-display font-extrabold text-sm sm:text-base text-brand-dark tracking-wide uppercase border-b border-brand-border pb-1.5 print:text-black">
                Academic Qualifications
              </h2>
              <div className="overflow-x-auto rounded-xl border border-brand-border">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-brand-dark font-bold uppercase tracking-wider text-[10px] print:bg-slate-100 print:text-black">
                    <tr>
                      <th className="px-4 py-3 border-b border-brand-border">Degree</th>
                      <th className="px-4 py-3 border-b border-brand-border">Institution</th>
                      <th className="px-4 py-3 border-b border-brand-border">Year</th>
                      <th className="px-4 py-3 border-b border-brand-border">Grade / CGPA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border print:divide-slate-200 text-brand-paragraph print:text-black bg-white">
                    {educationHistory.map((edu) => (
                      <tr key={edu.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-semibold text-brand-dark print:text-black">{edu.degree.split(' (')[0]}</td>
                        <td className="px-4 py-3">{edu.institution.split(' (')[0]}</td>
                        <td className="px-4 py-3 font-medium">{edu.period}</td>
                        <td className="px-4 py-3 font-mono text-xs">{edu.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Certifications Block */}
            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-sm sm:text-base text-brand-dark tracking-wide uppercase border-b border-brand-border pb-1.5 print:text-black">
                Certifications
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 list-disc pl-5 text-xs sm:text-sm text-brand-paragraph print:text-black">
                {certifications.map((cert) => (
                  <li key={cert.id}>
                    {cert.link ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#1A3636] hover:underline transition-colors"
                      >
                        <span className="font-semibold text-brand-dark print:text-black">{cert.title}</span> – Issued by {cert.issuer}
                      </a>
                    ) : (
                      <span>
                        <span className="font-semibold text-brand-dark print:text-black">{cert.title}</span> – Issued by {cert.issuer}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Experience & Live Projects block */}
            <div className="space-y-4">
              <h2 className="font-display font-extrabold text-sm sm:text-base text-brand-dark tracking-wide uppercase border-b border-brand-border pb-1.5 print:text-black">
                Work Experience & Live Projects
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs sm:text-sm">
                      <h3 className="font-bold text-brand-dark print:text-black">
                        {exp.role} – <span className="font-medium text-brand-paragraph">{exp.company}</span>
                      </h3>
                      <span className="font-semibold text-brand-paragraph shrink-0 text-xs">{exp.period}</span>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-brand-paragraph print:text-black">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Research & Publications block */}
            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-sm sm:text-base text-brand-dark tracking-wide uppercase border-b border-brand-border pb-1.5 print:text-black">
                Paper Publications & Academic Highlights
              </h2>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-brand-paragraph print:text-black">
                {achievements.map((ach) => (
                  <li key={ach.id}>
                    <span className="font-bold text-brand-dark print:text-black">{ach.title}</span>: {ach.description} ({ach.date})
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills & Tools matrix */}
            <div className="space-y-3">
              <h2 className="font-display font-extrabold text-sm sm:text-base text-brand-dark tracking-wide uppercase border-b border-brand-border pb-1.5 print:text-black">
                Skills & Technical Tools
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <h3 className="font-bold text-brand-dark mb-1 print:text-black">Core Skills</h3>
                  <p className="text-brand-paragraph print:text-black font-normal">
                    Digital Marketing, On-Page & Local SEO, Content Strategy, Social Media Marketing, Meta Ads, Google Ads, Event Management, Public Speaking, Case Presentation, Sales Consultations.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark mb-1 print:text-black">Software & Tools</h3>
                  <p className="text-brand-paragraph print:text-black font-normal">
                    Google Ads, Meta Ads Manager, Google Analytics 4, Google Search Console, SEMrush, Gamma AI, CapCut Studio, Canva Pro, Adobe Photoshop, Microsoft Excel, Power BI.
                  </p>
                </div>
              </div>
            </div>

            {/* Languages & Hobbies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-brand-border pt-4 text-xs">
              <div>
                <span className="font-bold uppercase text-slate-400 tracking-wider text-[10px] block">Languages Spoken</span>
                <span className="font-semibold text-brand-dark print:text-black">{personalInfo.languages.join(' • ')}</span>
              </div>
              <div>
                <span className="font-bold uppercase text-slate-400 tracking-wider text-[10px] block">Interests & Hobbies</span>
                <span className="font-semibold text-brand-dark print:text-black">{personalInfo.hobbies.join(' • ')}</span>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
}
