export type Honor = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
};

export type Education = {
  institution: string;
  degree: string;
  classification: string;
  period: string;
  gpa: string;
  researchTopic: string;
  language: string;
  logoUrl?: string;
};

export const education: Education = {
  institution: "Ho Chi Minh City University of Industry and Trade",
  degree: "Bachelor of Information Technology",
  classification: "Graduated with Honors (Good Classification)",
  period: "2022 — 2026",
  gpa: "GPA 3.41",
  researchTopic: "Research: Computer Vision (Image Classification)",
  language: "TOEIC 500 (LR) · 200+ (SW)",
  logoUrl: "/huit.jpg",
};

export const awards: Honor[] = [
  {
    id: "research-third-prize",
    name: "Third Prize — University-Level Student Scientific Research Competition",
    issuer: "Ho Chi Minh City University of Industry and Trade",
    date: "2025",
    skills: ["Computer Vision", "Image Classification"],
  },
  {
    id: "research-consolation",
    name: "Consolation Prize — Faculty-Level Student Scientific Research Competition",
    issuer: "Ho Chi Minh City University of Industry and Trade",
    date: "2025",
    skills: ["Computer Vision", "Image Classification"],
  },
  {
    id: "academic-scholarship",
    name: "Scholarship for Academic Good and Excellence",
    issuer: "Ho Chi Minh City University of Industry and Trade",
    date: "2022 — 2026",
    skills: ["Academic Excellence"],
  },
];
