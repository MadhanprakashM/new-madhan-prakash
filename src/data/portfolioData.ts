import { Experience, Project, Certification, Achievement, Education, SkillGroup, Testimonial, BlogPost } from '../types';
import { allCertifications } from './certificationsData';

export const personalInfo = {
  name: 'M. Madhan Prakash',
  title: 'MBA Candidate | Marketing & Business Analytics',
  subtitles: [
    'B2B Sales',
    'Digital Marketing',
    'Market Research',
    'Business Analytics'
  ],
  tagline: 'MBA Candidate specializing in Marketing & Business Analytics with hands-on experience in B2B sales pipelines, digital marketing campaigns, market research, and business analytics.',
  email: 'Madhanprakashoff@gmail.com',
  phone: '',
  linkedin: 'https://www.linkedin.com/in/madhanprakashofficial',
  linkedinUsername: 'madhanprakashofficial',
  instagram: 'https://www.instagram.com/madhanprakash_5/',
  instagramUsername: 'madhanprakash_5',
  youtube: 'https://www.youtube.com/@classictamilofficial',
  youtubeUsername: 'classictamilofficial',
  resumeUrl: 'https://drive.google.com/file/d/1J1MOQDqzKJVOFbmTO-D7vPfFIcUtsaFc/view?usp=drivesdk',
  location: 'Sivakasi, Tamil Nadu, India',
  address: 'Sivakasi, Tamil Nadu, India',
  avatarUrl: 'https://blogger.googleusercontent.com/img/a/AVvXsEij7PlnDYBCA7Au0BSXOvTk3u4IMytJyUPZpsmB3c9ax4q8P0W22SgT9Df9NSCaoz4CM4CuXh8HPV9mq1EtAt0LQB0px2VPSGg0Wmpum_e1bDlDc9sJC6uXi-1RlyzIqpk_7BDrnx03R4ATkoDa3cASXd7daqttVKziz3_gSXhIXDd6iDB1hOX4CQI5E2o',
  aboutStory: 'MBA Candidate specializing in Marketing & Business Analytics with practical experience in B2B sales, digital marketing campaigns, market research, and data analytics. Focused on consumer behavior insights, high-conversion digital initiatives, and applying analytical tools to solve commercial challenges.',
  hobbies: ['Digital Content Creation', 'Campaign Strategy', 'Audience Analytics', 'Video Editing'],
  languages: ['Tamil (Native)', 'English (Professional Working Proficiency)'],
  // Contact Form Provider configuration ('web3forms' or 'googleforms')
  contactFormProvider: 'web3forms', 
  web3formsAccessKey: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE', 
  googleFormUrl: '',
  googleFormEntries: {
    name: 'entry.123456789',
    email: 'entry.987654321',
    subject: 'entry.111111111',
    message: 'entry.222222222'
  }
};

export const skillGroups: SkillGroup[] = [
  {
    category: 'Marketing',
    skills: [
      { name: 'Digital Marketing', rating: 5 },
      { name: 'B2B Sales', rating: 5 },
      { name: 'Lead Generation', rating: 5 },
      { name: 'Business Development', rating: 5 },
      { name: 'Market Research', rating: 5 },
      { name: 'Meta Ads', rating: 5 },
      { name: 'Google Ads', rating: 4 },
      { name: 'SEO', rating: 4 }
    ],
  },
  {
    category: 'Analytics',
    skills: [
      { name: 'Marketing Analytics', rating: 5 },
      { name: 'Excel', rating: 5 },
      { name: 'Power BI', rating: 4 },
      { name: 'Google Analytics 4', rating: 5 },
      { name: 'Data Analysis', rating: 5 }
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Apollo AI', rating: 5 },
      { name: 'LinkedIn / Sales Navigator', rating: 5 },
      { name: 'IndiaMART', rating: 5 },
      { name: 'Canva', rating: 5 },
      { name: 'CapCut', rating: 5 },
      { name: 'Adobe Photoshop', rating: 4 },
      { name: 'HubSpot CRM', rating: 4 }
    ],
  },
  {
    category: 'Professional',
    skills: [
      { name: 'Communication', rating: 5 },
      { name: 'Presentation', rating: 5 },
      { name: 'Leadership', rating: 5 },
      { name: 'Team Coordination', rating: 5 },
      { name: 'Problem Solving', rating: 5 },
      { name: 'Sales Pitching', rating: 5 }
    ],
  }
];

export const experiences: Experience[] = [
  {
    id: 'exp1',
    role: 'B2B Sales & Market Research Intern',
    company: 'Bruhat Logistics',
    location: 'Sivakasi, Tamil Nadu, India / Remote',
    period: 'Jun 2026 - Jul 2026',
    type: 'internship',
    bullets: [
      'Researched 500+ manufacturing companies across industrial sectors.',
      'Generated and verified 300+ qualified B2B leads using Apollo AI, LinkedIn, IndiaMART, Google Maps, and Excel.',
      'Prepared sales presentations and structured market research to support client expansion.'
    ],
    tags: ['B2B Sales', 'Market Research', 'Lead Generation', 'Apollo AI', 'IndiaMART', 'LinkedIn', 'Google Maps']
  },
  {
    id: 'exp2',
    role: 'Digital Marketing Live Project',
    company: 'Vetikaaran',
    location: 'Coimbatore, Tamil Nadu, India',
    period: 'Dec 2025 - Feb 2026',
    type: 'live-project',
    bullets: [
      'Managed 4 Meta Ads campaigns on a ₹10,000 budget, achieving 2.5M+ views and 150+ product sales.',
      'Created ad creatives, reels, videos, and conversion copy tailored for the 20–30 age group.',
      'Optimized audience targeting and ad spend to maximize campaign return.'
    ],
    tags: ['Meta Ads', 'Digital Marketing', 'Ad Creatives', 'Reels & Copywriting', 'Campaign Optimization']
  },
  {
    id: 'exp_vip',
    role: 'Student Coordinator',
    company: 'VIP - VIMS Immersion Programme',
    location: 'Vivekananda Institute of Management Studies, Coimbatore',
    period: '2025 - Present',
    type: 'leadership',
    bullets: [
      'Student-organized voluntary members programme at VIMS focused on student-led learning and knowledge sharing.',
      'Coordinating students, programme activities, and supporting student-led sessions.',
      'Delivered "Nike Fall & Rise Case Study" presentation examining Nike\'s business challenges, brand decline, strategic turnaround, and recovery lessons.',
      'Delivered "Ikigai" presentation focused on purpose, passion, skills, career direction, and personal development.'
    ],
    tags: ['VIP', 'Student Coordinator', 'Nike Case Study', 'Ikigai Presentation', 'VIMS']
  },
  {
    id: 'exp_yi',
    role: 'Member',
    company: 'Young Indians (YI)',
    location: 'Coimbatore / Regional Chapter',
    period: '2024 - Present',
    type: 'leadership',
    bullets: [
      'Member of Young Indians since 2024, participating in a youth and professional development ecosystem focused on leadership, networking and community engagement.'
    ],
    tags: ['Young Indians', 'Member', 'Youth Leadership', 'Networking', 'Community Engagement']
  },
  {
    id: 'exp5',
    role: 'Overall Event Coordinator',
    company: 'VIMSMART 2K26 Intercollege Festival',
    location: 'VIMS, Coimbatore',
    period: 'Feb 2026',
    type: 'leadership',
    bullets: [
      'Led 80 volunteers across 17 teams to successfully organize VIMSMART 2K26 for 400+ participants from 20+ colleges.',
      'Received the Best Event Manager Award for overall festival execution and operational planning.'
    ],
    tags: ['Leadership', 'Event Management', 'Best Event Manager Award', 'Team Coordination']
  },
  {
    id: 'exp_youtube',
    role: 'YouTube Creator & Video Producer',
    company: 'Classic Tamil (YouTube Channel)',
    location: 'Sivakasi, TN / Remote',
    period: 'Jan 2021 - Present',
    type: 'work',
    bullets: [
      'Built an organic sports gaming channel to 93.5K+ total views and 717+ subscribers across 48 videos.',
      'Collaborated with two game development companies for video promotion and tutorials using CapCut and Canva.',
      'Analyzed channel statistics weekly to optimize viewer retention and search ranking.'
    ],
    tags: ['YouTube SEO', 'Video Editing', 'Audience Analytics', 'CapCut', 'Canva']
  },
  {
    id: 'exp6',
    role: 'Freelance Video Editor & Content Optimizer',
    company: 'Mosi Trading Company',
    location: 'Sivakasi, TN',
    period: 'Jun 2024 – Jan 2026',
    type: 'work',
    bullets: [
      'Edited 15+ financial educational videos and short reels to build the company’s social media presence.',
      'Improved video pacing, text overlays, and script structuring to maximize retention.'
    ],
    tags: ['Video Editing', 'Content Optimization', 'CapCut', 'Financial Video']
  },
  {
    id: 'exp_charavyuga',
    role: 'Organizing Committee Member & Event Leader',
    company: 'Charavyuga Inter-College Management Fest (2k24 & 2k25)',
    location: 'Ayya Nadar Janaki Ammal College, Sivakasi',
    period: '2024 - 2025',
    type: 'leadership',
    bullets: [
      'Organized and led the "Best Manager" event for the Charavyuga 2k24 and 2k25 inter-collegiate management meets.',
      'Designed competition rounds, established evaluation criteria, and managed participants.'
    ],
    tags: ['Event Organizing', 'Best Manager Event', 'Student Coordination']
  },
  {
    id: 'exp_intercollege_prize',
    role: 'Inter-College Competition Achievements',
    company: 'Ayya Nadar Janaki Ammal College, PSG CAS & Regional Meets',
    location: 'Tamil Nadu',
    period: '2024 - 2026',
    type: 'leadership',
    bullets: [
      'Won 2nd Prize in IPL Auction Event at PSG College of Arts and Science, demonstrating player valuation, dynamic budget bidding, and team strategy.',
      'Won First Prize in Best Product Idea Presentation in inter-college management competition.',
      'Won 1st Prize in Adzap (Advertising pitch) event for on-the-spot ad campaign creation.',
      'Received Best Team Award in the Vision 20 Leadership Development Programme.'
    ],
    tags: ['IPL Auction 2nd Prize (PSG)', 'First Prize Best Product Idea', 'Adzap 1st Prize', 'Vision 20 Best Team']
  },
  {
    id: 'exp_ryla',
    role: 'Rotary Youth Leadership Awards (RYLA) Scholar',
    company: 'Rotary International',
    location: 'Tamil Nadu',
    period: '2024',
    type: 'leadership',
    bullets: [
      'Selected for the RYLA "Be an Entrepreneur" residential leadership program.',
      'Collaborated in a team of 5 to develop and pitch a startup concept to an entrepreneur panel.'
    ],
    tags: ['Entrepreneurship Training', 'RYLA Scholar', 'Team Pitch']
  },
  {
    id: 'exp_nss_blood',
    role: 'NSS Blood Donation Camp Leader',
    company: 'National Service Scheme (NSS)',
    location: 'S.H.N.V Higher Secondary School',
    period: '2021 - 2022',
    type: 'leadership',
    bullets: [
      'Organized a regional blood donation camp, mobilizing student volunteers and collecting 120+ units of blood.',
      'Earned recognition from school management for outstanding community service.'
    ],
    tags: ['Community Service', 'NSS Leadership', 'Volunteer Mobilization']
  }
];

export const projects: Project[] = [
  {
    id: 'proj2',
    title: 'Digital Marketing (Live Project) - Vetikaaran',
    subtitle: 'Meta Ads, 2.5M+ Views & 150+ Product Sales Conversion',
    category: 'Digital Marketing',
    overview: 'Managed 4 Meta Ads campaigns with a ₹10,000 budget to launch and sell physical consumer products, achieving 2.5M+ views and 150+ product sales.',
    problem: 'Reaching target audience (20–30 age group) effectively with a limited budget and converting views into verified sales.',
    solution: 'Designed and executed 4 targeted Meta Ads campaigns, created video reels and ad copy tailored for 20-30 age group, and optimized ad spend for maximum ROI.',
    tools: ['Meta Ads Manager', 'Canva', 'CapCut', 'Instagram Reels', 'Customer Engagement'],
    skills: ['Digital Marketing', 'Meta Ads', 'Campaign Optimization', 'Copywriting', 'Target Audience Segmentation'],
    businessImpact: 'Generated over 2.5M+ campaign views and 150+ product sales with an ad spend of ₹10,000.',
    whatILearned: 'Learned campaign structure optimization for Meta Ads, demographic targeting for the 20-30 age group, and how creative video reels boost conversions.',
    myContribution: 'Created ad creatives, reels, videos, and copy, managed ad budgets across 4 campaigns, and optimized audience parameters.',
    projectOutcome: 'Achieved 2.5M+ views and 150+ product sales while keeping cost-per-conversion low.',
    skillsUsed: ['Meta Ads Manager', 'Campaign Optimization', 'Reels Production', 'Copywriting'],
    liveDemo: 'https://www.instagram.com/madhanprakash_5/',
    results: [
      'Managed 4 Meta Ads campaigns on a ₹10,000 budget.',
      'Achieved 2.5M+ views across Meta ad creatives and reels.',
      'Generated 150+ direct product sales.'
    ],
    learnings: 'Optimizing creative ad copy and video reels for specific age demographics significantly boosts ROI and conversion rates.',
    stats: [
      { value: '2.5M+', label: 'Campaign Views' },
      { value: '150+', label: 'Product Sales' },
      { value: '₹10,000', label: 'Meta Ads Budget' }
    ]
  },
  {
    id: 'proj_bruhat',
    title: 'B2B Sales & Market Research - Bruhat Logistics',
    subtitle: '500+ Companies Researched & 300+ Qualified B2B Leads Sourced',
    category: 'Marketing Research',
    overview: 'Market research and B2B lead generation internship at Bruhat Logistics to identify business opportunities across manufacturing sectors.',
    problem: 'Identifying and verifying active manufacturing leads and decision-makers for logistics & freight forwarding services.',
    solution: 'Researched 500+ companies across manufacturing sectors, generated and verified 300+ qualified B2B leads using Excel, LinkedIn, IndiaMART, Apollo AI, and Google Maps.',
    tools: ['Apollo AI', 'LinkedIn', 'IndiaMART', 'Google Maps', 'Microsoft Excel'],
    skills: ['B2B Sales', 'Market Research', 'Lead Generation', 'Business Development', 'Data Verification'],
    businessImpact: 'Sourced 300+ verified B2B leads and prepared strategic sales presentations to empower the business development team.',
    whatILearned: 'Acquired deep practical knowledge in B2B market research, lead verification workflows, and crafting compelling sales presentations.',
    myContribution: 'Researched 500+ manufacturing companies, extracted and verified 300+ B2B decision-maker contacts, and created presentation decks.',
    projectOutcome: 'Delivered a verified B2B lead database with high contact accuracy across manufacturing sectors.',
    skillsUsed: ['Apollo AI Data Mining', 'IndiaMART B2B Prospecting', 'LinkedIn Outreach', 'Excel Data Verification'],
    results: [
      'Researched 500+ manufacturing companies for business expansion.',
      'Generated and verified 300+ qualified B2B leads.',
      'Prepared sales presentations and market insights for business development.'
    ],
    learnings: 'Using multi-platform verification tools (Apollo AI, IndiaMART, LinkedIn) ensures high lead deliverability in B2B sales.',
    stats: [
      { value: '500+', label: 'Companies Researched' },
      { value: '300+', label: 'Qualified B2B Leads' },
      { value: 'B2B', label: 'Logistics Focus' }
    ]
  },
  {
    id: 'proj_vimsmart',
    title: 'VIMSMART 2K26 Intercollege Management Fest',
    subtitle: 'Overall Event Coordination & Best Event Manager Award',
    category: 'Digital Marketing',
    overview: 'Led 80 volunteers across 17 teams to successfully organize VIMSMART 2K26 for 400+ participants from 20+ colleges.',
    problem: 'Managing 17 specialized teams, 80 volunteers, and 400+ attendees across multiple simultaneous management events.',
    solution: 'Established clear team hierarchies, volunteer coordination protocols, digital registration workflows, and sponsor communication.',
    tools: ['Microsoft Excel', 'Google Forms', 'Team Communication', 'Event Management Sheets'],
    skills: ['Leadership', 'Event Planning', 'Sponsorship Pitching', 'Team Coordination', 'Public Relations'],
    businessImpact: 'Successfully executed VIMSMART 2K26 and received the Best Event Manager Award.',
    whatILearned: 'Learned large-scale event management, leading large volunteer teams, and negotiating sponsor partnerships.',
    myContribution: 'Served as Overall Event Coordinator, led 80 volunteers, managed event execution, and earned the Best Event Manager Award.',
    projectOutcome: 'Hosted 400+ participants from 20+ colleges seamlessly.',
    skillsUsed: ['Team Leadership', 'Sponsorship Management', 'Public Relations', 'Logistics'],
    results: [
      'Led 80 volunteers across 17 teams.',
      'Hosted 400+ participants from 20+ colleges.',
      'Received the Best Event Manager Award.'
    ],
    learnings: 'Empowering team leads with clear responsibilities ensures flawless execution during large-scale intercollege festivals.',
    stats: [
      { value: '80', label: 'Volunteers Led' },
      { value: '400+', label: 'Participants' },
      { value: '20+', label: 'Colleges' }
    ]
  },
  {
    id: 'proj_youtube',
    title: 'YouTube Channel Growth & Developer Collaboration',
    subtitle: 'Classic Tamil Channel, CapCut Editing & Brand Collaborations',
    category: 'Content Creation',
    overview: 'Personal sports gaming channel Classic Tamil (@classictamilofficial) with 93.5K+ views and 717+ subscribers across 48 videos.',
    problem: 'Standing out in a competitive gaming niche and attracting sponsorship/collaboration interest from game developers.',
    solution: 'Produced 48 high-quality gameplay and tutorial videos using CapCut, designed thumbnails in Canva, and collaborated with two game development companies.',
    tools: ['CapCut', 'Canva', 'YouTube SEO', 'Audience Analytics'],
    skills: ['SEO Analytics', 'Video Production', 'Brand Collaboration', 'Audience Growth'],
    businessImpact: 'Grew organic channel to 93.5K+ total views and collaborated with two game development companies through YouTube.',
    whatILearned: 'Gained practical experience in organic video SEO, brand outreach, and audience retention analysis.',
    myContribution: 'Edited 48 videos, created thumbnails, optimized video metadata, and managed game company collaborations.',
    projectOutcome: 'Achieved 93.5K+ views, 717+ subscribers, and 2 game developer brand collaborations.',
    skillsUsed: ['YouTube SEO', 'CapCut Video Production', 'Canva Thumbnail Design', 'Brand Collaboration'],
    liveDemo: 'https://www.youtube.com/@classictamilofficial',
    results: [
      'Achieved 93.5K+ total views and 717+ subscribers.',
      'Collaborated with two game development companies through YouTube.',
      'Produced and optimized 48 video tutorials.'
    ],
    learnings: 'High-quality thumbnails and consistent video SEO attract both organic viewers and corporate brand collaborations.',
    stats: [
      { value: '93.5K+', label: 'Total Views' },
      { value: '2', label: 'Game Dev Collaborations' },
      { value: '717+', label: 'Subscribers' }
    ]
  }
];

export const certifications: Certification[] = allCertifications;

export const achievements: Achievement[] = [
  {
    id: 'ach5',
    title: 'Published Research Paper (Paper ID: 1716534)',
    description: 'Published a scientific research paper titled "A STUDY ON FACTORS INFLUENCING ONLINE SHOPPING BEHAVIOUR AMONG COLLEGE STUDENTS" analyzing modern e-commerce purchasing drivers and consumer trends.',
    date: '2025',
    category: 'paper',
  },
  {
    id: 'ach1',
    title: 'Published ISBN Book Paper: Tomorrow\'s Accountant',
    description: 'Co-authored and published a scientific paper in an ISBN-registered research book: "National Seminar Proceedings on Tomorrow\'s Accountant: Role of Cost and Management Accountant in Digital Future" (2023).',
    date: '2023',
    category: 'paper',
  },
  {
    id: 'ach2',
    title: 'Published ISBN Book Paper: Digital Currencies',
    description: 'Co-authored and published research paper titled "ENVISIONING 2047: Role of Digital Currencies in achieving Viksit Bharat" in an ISBN-registered seminar proceedings book.',
    date: '2024',
    category: 'paper',
  },
  {
    id: 'ach3',
    title: '8+ Professional Research Paper Presentations',
    description: 'Presented 8+ research papers and published 3 ISBN-registered research papers at various highly reputed colleges and business schools.',
    date: '2022 - 2026',
    category: 'paper',
  }
];

export const educationHistory: Education[] = [
  {
    id: 'edu1',
    degree: 'Master of Business Administration (MBA) - Marketing & Business Analytics',
    institution: 'Vivekananda Institute of Management Studies',
    period: '2025 – 2027',
    grade: 'Current Programme',
    highlights: [
      'Marketing & Business Analytics specialization.',
      'Won 2nd Prize in IPL Auction Event at PSG College of Arts and Science.',
      'VIMSMART 2K26 Overall Event Coordinator (Best Event Manager Award).',
      'VIP (VIMS Immersion Programme) Student Coordinator.'
    ],
  },
  {
    id: 'edu2',
    degree: 'Bachelor of Business Administration (BBA)',
    institution: 'Ayya Nadar Janaki Ammal College',
    period: '2022 – 2025',
    grade: '6.27 CGPA',
    highlights: [
      'Studied core areas: Marketing Management, Marketing Research, Quantitative Techniques, Statistics, Financial Accounting, Cost Accounting.',
      'Organized Best Manager event for Charavyuga 2k24 & 2k25 inter-collegiate management meets.',
      'First Prize in Best Product Idea Presentation and Adzap advertising pitch.'
    ],
  },
  {
    id: 'edu3',
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'S.H.N.V. Higher Secondary School',
    period: '2022',
    grade: '63.3%',
    highlights: [
      'Commerce Stream: Commerce, Accountancy, Economics, History.',
      'Led NSS Blood Donation Camp collecting 120+ units of blood.'
    ]
  },
  {
    id: 'edu4',
    degree: 'Secondary School Leaving Certificate (SSLC)',
    institution: 'S.H.N.V. Secondary School',
    period: '2020',
    grade: '55%',
    highlights: [
      'Junior Red Cross (JRC) active volunteer for civic hygiene and first aid.'
    ]
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'test1',
    name: 'M. Thilak, M.Sc.',
    role: 'Founder & Director',
    company: 'Agam Academy',
    feedback: 'Catchy, elegant, and highly professional design work. Thanks a lot for delivering an effective and efficient design, Madhan. Looking forward to many more collaborations in the future!',
    avatarLetter: 'T',
  }
];

export const blogPosts: BlogPost[] = [];

