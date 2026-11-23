import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Award, 
  Calendar, 
  Copy, 
  Check, 
  Share2, 
  Building2, 
  CheckCircle2,
  BookOpen,
  Tag
} from 'lucide-react';
import { Certification } from '../types';

interface CertificationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  certification: Certification | null;
}

export default function CertificationDetailModal({
  isOpen,
  onClose,
  certification,
}: CertificationDetailModalProps) {
  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Reset states on open/change
  useEffect(() => {
    if (isOpen) {
      setCopiedId(false);
      setCopiedLink(false);
    }
  }, [isOpen, certification?.id]);

  // Handle ESC key and prevent body scroll when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !certification) return null;

  const handleCopyCredentialId = () => {
    if (certification.credentialId) {
      navigator.clipboard.writeText(certification.credentialId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleCopyShareLink = () => {
    const shareUrl = certification.link || window.location.href;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <AnimatePresence>
      <div 
        id="cert-modal-overlay" 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
        onClick={(e) => {
          if ((e.target as HTMLElement).id === 'cert-modal-overlay') {
            onClose();
          }
        }}
      >
        <motion.div
          id="cert-modal-window"
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl bg-white dark:bg-[#1A3636] rounded-2xl md:rounded-3xl border border-slate-200 dark:border-[#40534C] shadow-2xl flex flex-col overflow-hidden text-left"
        >
          {/* Header Bar */}
          <div className="px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-[#40534C]/40 flex items-center justify-between bg-slate-50/90 dark:bg-[#1A3636]/90 backdrop-blur-sm shrink-0">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#1A3636]/10 dark:bg-[#D6BD98]/10 text-[#1A3636] dark:text-[#D6BD98] border border-[#1A3636]/20 dark:border-[#D6BD98]/20 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A3636] dark:text-[#D6BD98] bg-[#1A3636]/10 dark:bg-[#D6BD98]/15 px-2.5 py-0.5 rounded-full border border-[#1A3636]/15 dark:border-[#D6BD98]/20">
                    {certification.categoryLabel || 'Verified Credential'}
                  </span>
                  <span className="inline-flex items-center text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
                    <ShieldCheck className="w-3 h-3 mr-1 text-emerald-600 dark:text-emerald-400" />
                    Verified Record
                  </span>
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white truncate max-w-sm sm:max-w-md mt-0.5">
                  {certification.title}
                </h3>
              </div>
            </div>

            {/* Quick Actions (Share, Close) */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
              <button
                id="cert-modal-share-btn"
                onClick={handleCopyShareLink}
                className="p-2 text-slate-500 dark:text-slate-300 hover:text-[#1A3636] dark:hover:text-[#D6BD98] hover:bg-slate-100 dark:hover:bg-[#40534C]/40 rounded-xl transition-colors cursor-pointer"
                title="Copy Credential Share Link"
                aria-label="Copy Credential Share Link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                id="cert-modal-close-btn"
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#40534C]/40 rounded-xl transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body: Clean, High-Contrast Credential Details */}
          <div className="p-5 sm:p-6 space-y-5 overflow-y-auto max-h-[75vh]">
            
            {/* Overview Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Issuing Organization */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200/80 dark:border-[#40534C]/40 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#1A3636]/10 dark:bg-[#D6BD98]/10 text-[#1A3636] dark:text-[#D6BD98] flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Issuing Authority</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight mt-0.5">{certification.issuer}</p>
                </div>
              </div>

              {/* Issue Date & Status */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200/80 dark:border-[#40534C]/40 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#1A3636]/10 dark:bg-[#D6BD98]/10 text-[#1A3636] dark:text-[#D6BD98] flex items-center justify-center shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Completion & Status</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight mt-0.5">
                    {certification.date || certification.year || '2024'} • <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Official Credential ID */}
            {certification.credentialId && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200/80 dark:border-[#40534C]/40 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Official Credential Identification</span>
                  <button
                    type="button"
                    onClick={handleCopyCredentialId}
                    className="text-[11px] text-[#1A3636] dark:text-[#D6BD98] hover:underline flex items-center font-bold cursor-pointer gap-1"
                  >
                    {copiedId ? (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                        <Check className="w-3.5 h-3.5" /> Copied to Clipboard
                      </span>
                    ) : (
                      <span className="flex items-center gap-0.5">
                        <Copy className="w-3.5 h-3.5" /> Copy Credential ID
                      </span>
                    )}
                  </button>
                </div>
                <div className="font-mono text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 bg-white dark:bg-[#1A3636] px-3 py-2 rounded-lg border border-slate-200 dark:border-[#40534C]/40 break-all select-all">
                  {certification.credentialId}
                </div>
              </div>
            )}

            {/* Description / Curriculum Scope */}
            {certification.description && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#1A3636] dark:text-[#D6BD98]" />
                  <span>Credential Scope & Curriculum</span>
                </h4>
                <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-black/20 p-4 rounded-xl border border-slate-200/80 dark:border-[#40534C]/40">
                  {certification.description}
                </p>
              </div>
            )}

            {/* Skills & Competencies */}
            {certification.skills && certification.skills.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#1A3636] dark:text-[#D6BD98]" />
                  <span>Validated Competencies</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {certification.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1 rounded-lg bg-[#1A3636]/5 dark:bg-[#D6BD98]/10 border border-[#1A3636]/15 dark:border-[#D6BD98]/20 text-[#1A3636] dark:text-[#D6BD98] font-semibold flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 opacity-70" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions: Official Verification Link + Close */}
          <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-[#40534C]/40 bg-slate-50/70 dark:bg-[#1A3636]/70 flex flex-col sm:flex-row items-center gap-2.5">
            {certification.link ? (
              <a
                href={certification.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 inline-flex items-center justify-center space-x-2 py-2.5 px-4 bg-[#1A3636] hover:bg-[#40534C] dark:bg-[#D6BD98] dark:hover:bg-[#B38F6F] text-white dark:text-[#1A3636] rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Verify on Official Issuer Portal</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            ) : (
              <div className="w-full sm:flex-1 text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left font-medium">
                Official Institutional Academic Credential
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-[#40534C]/60 hover:bg-slate-300 dark:hover:bg-[#40534C] text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
