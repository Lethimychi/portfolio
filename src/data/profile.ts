export const profile = {
  name: "Le Thi My Chi",
  initials: "MC",
  role: "Software Testing Engineer",
  tagline: "I test with intent — not just to find bugs, but to prevent them.",
  headline:
    "Software Testing Engineer with 1.5 years of experience testing Web, Mobile, and Admin applications across Indoor Navigation, CRM, E-commerce, Media/Advertising Sales, and AI/Computer Vision domains.",
  bio: [
    "I'm a QA/QC Engineer who tests Web, Mobile, and Admin applications across Data Center, B2B Sales, Indoor Navigation, Media/Advertising, and E-commerce domains. I care about catching issues before they reach production — through careful requirement analysis, solid test design, and close work with BAs and developers.",
    "My strengths are business-rule testing for complex approval and permission workflows, API testing with Postman, SQL validation in PostgreSQL, and Playwright (TypeScript) automation — with AI tools like ChatGPT, Claude, and Codex speeding up analysis, test design, and scripting.",
  ],
  location: "Ho Chi Minh City & Quy Nhon, Vietnam",
  email: "mychi301215@gmail.com",
  phone: "0347790574",
  resumeUrl: "/LeThiMyChi_SoftwareTestingEngineer_CV.pdf",
  availability: "Open to QA/QC & Software Testing roles",
  social: {
    linkedin: "https://linkedin.com/in/lethimychi15",
    email: "mailto:mychi301215@gmail.com",
  },
  stats: [
    { label: "Test Cases Executed", value: 4800, suffix: "+", decimals: 0 },
    { label: "Defects Found", value: 145, suffix: "+", decimals: 0 },
    { label: "Projects Tested", value: 5, suffix: "", decimals: 0 },
    { label: "Years in QA", value: 1.5, suffix: "", decimals: 1 },
  ],
} as const;

export const siteConfig = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.headline,
  url: "https://mychi.vercel.app",
  keywords: [
    "Software Testing Engineer",
    "QA Engineer",
    "QC Engineer",
    "Software Tester",
    "Manual Testing",
    "API Testing",
    "Postman",
    "SQL Validation",
    "Playwright",
    "Quality Assurance Portfolio",
  ],
} as const;
