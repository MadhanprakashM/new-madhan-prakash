export interface ColorTheme {
  id: string;
  name: string;
  primary: string;       // --theme-primary
  primaryHover: string; // --theme-primary-hover
  primaryDark: string;  // --theme-primary-dark
  secondary: string;     // --theme-secondary
  secondaryLight: string; // --theme-secondary-light
  previewBg: string;     // color representation for selector
}

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: 'sunset',
    name: 'Classic Sunset',
    primary: '#1e3a8a',
    primaryHover: '#1e40af',
    primaryDark: '#0f172a',
    secondary: '#f97316',
    secondaryLight: '#fb923c',
    previewBg: '#f97316'
  },
  {
    id: 'emerald',
    name: 'Forest Emerald',
    primary: '#064e3b',
    primaryHover: '#059669',
    primaryDark: '#022c22',
    secondary: '#10b981',
    secondaryLight: '#34d399',
    previewBg: '#10b981'
  },
  {
    id: 'ocean',
    name: 'Royal Ocean',
    primary: '#0f172a',
    primaryHover: '#1e40af',
    primaryDark: '#030712',
    secondary: '#0ea5e9',
    secondaryLight: '#38bdf8',
    previewBg: '#0ea5e9'
  },
  {
    id: 'crimson',
    name: 'Crimson Rose',
    primary: '#881337',
    primaryHover: '#e11d48',
    primaryDark: '#4c0519',
    secondary: '#f43f5e',
    secondaryLight: '#fb7185',
    previewBg: '#f43f5e'
  },
  {
    id: 'cyber',
    name: 'Cyber Purple',
    primary: '#581c87',
    primaryHover: '#9333ea',
    primaryDark: '#2e1065',
    secondary: '#d946ef',
    secondaryLight: '#f472b6',
    previewBg: '#d946ef'
  }
];

export function applyTheme(theme: ColorTheme) {
  const root = document.documentElement;
  root.style.setProperty('--theme-primary', theme.primary);
  root.style.setProperty('--theme-primary-hover', theme.primaryHover);
  root.style.setProperty('--theme-primary-dark', theme.primaryDark);
  root.style.setProperty('--theme-secondary', theme.secondary);
  root.style.setProperty('--theme-secondary-light', theme.secondaryLight);
}
