import React, { useState, memo } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, ExternalLink, Copy, Check, Info } from 'lucide-react';
import { Certification } from '../types';

interface CertificationCardProps {
  certification: Certification;
  onView: (cert: Certification) => void;
  isPriority?: boolean;
}

function CertificationCardComponent({
  certification,
  onView,
}: CertificationCardProps) {
  const [copiedId, setCopiedId] = useState(false);

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (certification.credentialId) {
      navigator.clipboard.writeText(certification.credentialId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <motion.div
      id={`certification-card-${certification.id}`}
      layout="position"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      onClick={() => onView(certification)}
      className="p-5 sm:p-6 rounded-2xl bg-white/90 dark:bg-[#1A3636]/50 border border-[#40534C]/15 dark:border-[#D6BD98]/20 hover:border-[#1A3636]/40 dark:hover:border-[#D6BD98]/50 hover:bg-white dark:hover:bg-[#1A3636]/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative backdrop-blur-md text-left"
    >
      {/* Top Meta: Category Badge & Verified Pill */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A3636] dark:text-[#D6BD98] bg-[#1A3636]/10 dark:bg-[#D6BD98]/15 px-2.5 py-1 rounded-full border border-[#1A3636]/15 dark:border-[#D6BD98]/20 truncate max-w-[200px]">
            {certification.categoryLabel || certification.category || 'Credential'}
          </span>

          <span className="flex items-center space-x-1 text-[10px] text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 px-2 py-0.5 rounded-full shrink-0">
            <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>Verified</span>
          </span>
        </div>

        {/* Organization & Year */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-[#A8B8AE]">
          <div className="flex items-center space-x-1.5 min-w-0">
            <Award className="w-3.5 h-3.5 text-[#1A3636] dark:text-[#D6BD98] shrink-0" />
            <span className="truncate">{certification.issuer}</span>
          </div>
          {certification.year && (
            <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300 shrink-0">
              {certification.year}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-slate-900 dark:text-slate-100 text-base sm:text-[17px] tracking-tight leading-snug group-hover:text-[#1A3636] dark:group-hover:text-[#D6BD98] transition-colors duration-200">
          {certification.title}
        </h3>

        {/* Description */}
        {certification.description && (
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed font-normal">
            {certification.description}
          </p>
        )}

        {/* Skills Chips */}
        {certification.skills && certification.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {certification.skills.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-lg bg-[#1A3636]/5 dark:bg-[#D6BD98]/10 text-[#1A3636] dark:text-[#D6BD98] font-medium border border-[#1A3636]/10 dark:border-[#D6BD98]/15 truncate max-w-[150px]"
              >
                {skill}
              </span>
            ))}
            {certification.skills.length > 4 && (
              <span className="text-[10px] px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/5 text-slate-500 font-medium">
                +{certification.skills.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Footer: Credential ID + Action buttons */}
      <div className="pt-4 mt-4 border-t border-[#40534C]/10 dark:border-[#D6BD98]/15 space-y-3">
        {/* Credential ID row if exists */}
        {certification.credentialId && (
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-black/20 px-2.5 py-1.5 rounded-lg border border-slate-200/60 dark:border-[#40534C]/30">
            <span className="truncate max-w-[180px]">ID: {certification.credentialId}</span>
            <button
              type="button"
              onClick={handleCopyId}
              className="text-[#1A3636] dark:text-[#D6BD98] hover:underline flex items-center gap-1 text-[10px] font-bold cursor-pointer shrink-0 ml-1"
              title="Copy Credential ID"
              aria-label={`Copy credential ID ${certification.credentialId}`}
            >
              {copiedId ? (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                  <Check className="w-3 h-3" /> Copied
                </span>
              ) : (
                <span className="flex items-center gap-0.5">
                  <Copy className="w-3 h-3" /> Copy
                </span>
              )}
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onView(certification);
            }}
            className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-[#1A3636]/10 dark:bg-[#D6BD98]/15 text-[#1A3636] dark:text-[#D6BD98] group-hover:bg-[#1A3636] group-hover:text-white dark:group-hover:bg-[#D6BD98] dark:group-hover:text-[#1A3636] text-xs font-bold transition-all duration-200 cursor-pointer shadow-2xs"
            aria-label={`View Details for ${certification.title}`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>View Details</span>
          </button>

          {certification.link && (
            <a
              href={certification.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center space-x-1 py-2 px-3 rounded-xl bg-[#1A3636] hover:bg-[#40534C] dark:bg-[#D6BD98] dark:hover:bg-[#B38F6F] text-white dark:text-[#1A3636] text-xs font-bold transition-all duration-200 cursor-pointer shadow-2xs shrink-0"
              title={`Verify ${certification.title} on official portal`}
              aria-label={`Verify ${certification.title} on official issuer portal`}
            >
              <span>Verify</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export const CertificationCard = memo(CertificationCardComponent);
export default CertificationCard;
