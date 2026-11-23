import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

// ============================================================================
// 1. ANIMATED PANEL
// ============================================================================
interface AnimatedPanelProps {
  activeKey: string;
  children: React.ReactNode;
  className?: string;
}

export function AnimatedPanel({ activeKey, children, className = '' }: AnimatedPanelProps) {
  const prefersReducedMotion = useReducedMotion();

  // Exit/Enter animations from specifications
  const initialX = prefersReducedMotion ? 0 : 20;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeKey}
          initial={{ opacity: 0, x: initialX }}
          animate={{ 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          exit={{ 
            opacity: 0, 
            x: initialX,
            transition: { duration: 0.2, ease: "easeIn" }
          }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// 2. CONTENT PANEL
// ============================================================================
interface ContentPanelProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function ContentPanel({ children, className = '', style }: ContentPanelProps) {
  return (
    <div 
      className={`p-6 sm:p-8 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/85 shadow-md relative overflow-hidden transition-all duration-300 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

// ============================================================================
// 3. TAB SWITCHER (Fully Accessible with Keyboard Support)
// ============================================================================
interface TabItem<T> {
  id: T;
  label: string;
  icon?: React.ReactNode;
}

interface TabSwitcherProps<T extends string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (id: T) => void;
  ariaLabel?: string;
  idPrefix: string;
}

export function TabSwitcher<T extends string>({
  tabs,
  activeTab,
  onChange,
  ariaLabel,
  idPrefix,
}: TabSwitcherProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation support: left/right and up/down arrows to navigate tabs
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    const maxIndex = tabs.length - 1;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = index === maxIndex ? 0 : index + 1;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = index === 0 ? maxIndex : index - 1;
    } else {
      return;
    }

    const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    if (buttons && buttons[nextIndex]) {
      buttons[nextIndex].focus();
      onChange(tabs[nextIndex].id);
    }
  };

  return (
    <div 
      ref={containerRef}
      role="tablist"
      aria-label={ariaLabel}
      className="flex lg:flex-wrap items-center lg:justify-center gap-2 sm:gap-2.5 w-full overflow-x-auto lg:overflow-x-visible py-2 px-4 sm:px-1 whitespace-nowrap scrollbar-none scroll-smooth snap-x snap-mandatory"
    >
      {tabs.map((tab, idx) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            id={`${idPrefix}-tab-${String(tab.id).toLowerCase().replace(/\s+/g, '-')}`}
            key={String(tab.id)}
            role="tab"
            aria-selected={isActive}
            aria-controls={`${idPrefix}-panel-${String(tab.id)}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`px-4.5 py-2 sm:py-2.5 min-h-[44px] rounded-full text-xs font-semibold tracking-wide transition-all duration-250 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-purple flex items-center gap-2 shrink-0 snap-start ${
              isActive
                ? 'bg-white dark:bg-slate-900 border-2 border-brand-purple text-brand-purple shadow-md shadow-brand-purple/15 scale-[1.02]'
                : 'bg-white/45 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-brand-paragraph hover:border-brand-purple/45 hover:text-brand-purple hover:-translate-y-1 hover:shadow-md'
            }`}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// 4. TOGGLE CARD
// ============================================================================
interface ToggleCardProps {
  id: string;
  isExpanded: boolean;
  onToggle: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ToggleCard({
  id,
  isExpanded,
  onToggle,
  title,
  subtitle,
  icon,
  headerRight,
  children,
  className = '',
}: ToggleCardProps) {
  return (
    <div 
      id={id}
      className={`border rounded-[24px] overflow-hidden bg-white dark:bg-slate-900 transition-all duration-300 ${
        isExpanded 
          ? 'border-brand-purple shadow-lg shadow-brand-purple/10 ring-4 ring-brand-purple/5 dark:ring-brand-purple/10' 
          : 'border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700'
      } ${className}`}
    >
      <button
        id={`${id}-trigger`}
        aria-expanded={isExpanded}
        aria-controls={`${id}-content`}
        onClick={onToggle}
        className="w-full text-left p-4 sm:p-5 flex items-center justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
      >
        <div className="flex items-start space-x-3.5 min-w-0 pr-2">
          {icon && (
            <div className={`p-2 bg-brand-purple/5 dark:bg-brand-purple/10 text-brand-purple rounded-lg shrink-0 border border-brand-purple/10`}>
              {icon}
            </div>
          )}
          <div className="min-w-0 space-y-0.5">
            <h3 className="font-display font-bold text-sm sm:text-base tracking-tight text-brand-dark truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-brand-paragraph font-medium truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          {headerRight}
          <ChevronRight 
            className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
              isExpanded ? 'rotate-90 text-brand-purple' : ''
            }`} 
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`${id}-content`}
            role="region"
            aria-labelledby={`${id}-trigger`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-slate-100 dark:border-slate-800/60"
          >
            <div className="p-4 sm:p-6 bg-slate-50/[0.15] dark:bg-slate-950/[0.15]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// 5. TIMELINE SWITCHER (Unified Responsive Layout)
// ============================================================================
interface TimelineSwitcherProps<T> {
  items: T[];
  activeId: string;
  onChange: (id: string) => void;
  renderSelectorItem: (item: T, isSelected: boolean) => React.ReactNode;
  renderDetail: (item: T) => React.ReactNode;
  getId: (item: T) => string;
  getMobileTitle: (item: T) => string;
  getMobileSubtitle?: (item: T) => string;
  getMobileHeaderRight?: (item: T) => React.ReactNode;
  getMobileIcon?: (item: T) => React.ReactNode;
  idPrefix: string;
}

export function TimelineSwitcher<T>({
  items,
  activeId,
  onChange,
  renderSelectorItem,
  renderDetail,
  getId,
  getMobileTitle,
  getMobileSubtitle,
  getMobileHeaderRight,
  getMobileIcon,
  idPrefix,
}: TimelineSwitcherProps<T>) {
  const activeItem = items.find((item) => getId(item) === activeId) || items[0];
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Local state to manage mobile accordion expanded item, allowing toggle close
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(activeId);

  // Keep in sync with prop changes
  useEffect(() => {
    if (activeId) {
      setMobileExpandedId(activeId);
    }
  }, [activeId]);

  // Keyboard navigation for sidebar selectors
  const handleSelectorKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    const maxIndex = items.length - 1;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = index === maxIndex ? 0 : index + 1;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = index === 0 ? maxIndex : index - 1;
    } else {
      return;
    }

    const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    if (buttons && buttons[nextIndex]) {
      buttons[nextIndex].focus();
      onChange(getId(items[nextIndex]));
    }
  };

  return (
    <div className="w-full">
      {/* ------------------------------------------------------------- */}
      {/* A. DESKTOP VIEW (lg and up)                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Sidebar Selectors */}
        <div 
          ref={containerRef}
          role="tablist"
          aria-label="Selection timeline"
          className="col-span-5 flex flex-col gap-3 sticky top-24 h-fit"
        >
          {items.map((item, idx) => {
            const isSelected = getId(item) === activeId;
            return (
              <button
                id={`${idPrefix}-selector-btn-${getId(item)}`}
                key={getId(item)}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`${idPrefix}-detail-panel`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => onChange(getId(item))}
                onKeyDown={(e) => handleSelectorKeyDown(e, idx)}
                className={`w-full rounded-[24px] transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden group focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-purple/20 ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-2 border-brand-purple shadow-lg shadow-brand-purple/15 scale-[1.02] z-10'
                    : 'bg-white dark:bg-slate-900/65 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:-translate-y-1 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900'
                }`}
              >
                {/* Left vertical border indicator */}
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-purple" />
                )}
                {renderSelectorItem(item, isSelected)}
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Animated Pane */}
        <div className="col-span-7">
          <ContentPanel className="h-full min-h-[480px]">
            {/* Soft stage-specific ambient background tint */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/[0.02] to-transparent pointer-events-none" />
            
            <AnimatedPanel activeKey={activeId}>
              {renderDetail(activeItem)}
            </AnimatedPanel>
          </ContentPanel>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* B. MOBILE & TABLET VIEW (Accordion, strictly single-expanded) */}
      {/* ------------------------------------------------------------- */}
      <div className="lg:hidden space-y-4 max-w-2xl mx-auto text-left">
        {items.map((item) => {
          const itemId = getId(item);
          const isExpanded = itemId === mobileExpandedId;
          return (
            <ToggleCard
              id={`${idPrefix}-accordion-${itemId}`}
              key={itemId}
              isExpanded={isExpanded}
              onToggle={() => {
                const nextId = isExpanded ? null : itemId;
                setMobileExpandedId(nextId);
                if (nextId) {
                  onChange(nextId);
                }
              }}
              title={getMobileTitle(item)}
              subtitle={getMobileSubtitle ? getMobileSubtitle(item) : undefined}
              headerRight={getMobileHeaderRight ? getMobileHeaderRight(item) : undefined}
              icon={getMobileIcon ? getMobileIcon(item) : undefined}
            >
              {renderDetail(item)}
            </ToggleCard>
          );
        })}
      </div>
    </div>
  );
}
