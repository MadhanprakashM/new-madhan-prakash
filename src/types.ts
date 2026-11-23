export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'internship' | 'live-project' | 'freelance' | 'leadership' | 'work';
  bullets: string[];
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  overview: string;
  problem: string;
  solution: string;
  tools: string[];
  results: string[];
  learnings: string;
  stats?: { value: string; label: string }[];
  link?: string;
  github?: string;
  liveDemo?: string;
  skills?: string[];
  businessImpact?: string;
  whatILearned?: string;
  myContribution?: string;
  projectOutcome?: string;
  skillsUsed?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  year?: number | string | null;
  link?: string;
  credentialUrl?: string;
  credentialId?: string;
  description?: string;
  category?: 'professional' | 'academic' | 'achievement' | 'participation' | 'review' | string;
  categoryLabel?: string;
  skills?: string[];
  certificateUrl?: string;
  thumbnail?: string;
  fileType?: 'image' | 'pdf' | 'document';
  issuedTo?: string;
  expiryDate?: string;
  verificationStatus?: 'verified' | 'pending';
  status?: 'verified' | 'needs_verification' | string;
  importance?: number;
  featured?: boolean;
  sourceFile?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
  category: 'paper' | 'leadership' | 'competition' | 'activity';
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  grade: string;
  highlights?: string[];
}

export interface SkillItem {
  name: string;
  rating: number; // 1 to 5 rating
}

export interface SkillGroup {
  category: string;
  skills: SkillItem[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  feedback: string;
  avatarLetter: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  slug: string;
  tags: string[];
}

