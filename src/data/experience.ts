export type ExperienceEntry = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: "Full-time" | "Internship" | "Contract";
  logoUrl?: string;
  summary: string;
  highlights: string[];
  tech: string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "teanis",
    company: "Teanis Technology and Solutions JSC",
    role: "QA/QC Engineer",
    period: "Oct 2025 — Present",
    location: "Ho Chi Minh City, Vietnam",
    type: "Full-time",
    logoUrl: "/teanis-mark.png",
    summary:
      "QA for three products in Agile/Scrum teams — two B2B portals for Data Center operations and sales (LWS, LWSn), and a multi-platform indoor navigation app (Position Tracking).",
    highlights: [
      "Test complex Request, Permission, and multi-step Approval workflows — Permit to Work, Cross Connect, Remote Hand, and Access Requests.",
      "Validate role-based access, margin-based pricing, and approval rules across the Singapore and Malaysia markets.",
      "Verify API and database data with Postman and PostgreSQL, supporting releases from TST through Production.",
      "Automate smoke and regression tests with Playwright (TypeScript), using AI tools for scripting and edge-case analysis.",
    ],
    tech: [
      "Playwright",
      "TypeScript",
      "Postman",
      "PostgreSQL (DBeaver)",
      "GitLab",
      "Chrome DevTools",
      "AI Tools",
    ],
  },
  {
    id: "itbee",
    company: "ITBee Solutions Technology Company Limited",
    role: "QC / Tester",
    period: "Mar 2025 — Oct 2025",
    location: "Ho Chi Minh City, Vietnam",
    type: "Full-time",
    logoUrl: "/itbee-mark.png",
    summary:
      "QA for Adex Digital Advertising, a web platform for selling media and advertising campaigns.",
    highlights: [
      "Tested Booking → Campaign → Contract workflows end to end.",
      "Verified Google Maps integration — locations, markers, filtering, and screen selection — for accurate media placement.",
      "Worked with BAs and developers on fix verification, regression, and release validation.",
    ],
    tech: [
      "Jira",
      "Postman",
      "Swagger",
      "PostgreSQL (DBeaver)",
      "Google Maps",
      "Chrome DevTools",
    ],
  },
];
