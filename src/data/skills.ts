import type { LucideIcon } from "lucide-react";
import {
  ClipboardCheck,
  ListChecks,
  Bot,
  Plug,
  Code2,
  Wrench,
} from "lucide-react";

export type SkillCategory = {
  id: string;
  title: string;
  icon: LucideIcon;
  // Core strengths (bold on the CV) — rendered first and highlighted so a
  // recruiter can scan them without reading every tag.
  core: string[];
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "manual",
    title: "Manual Testing",
    icon: ClipboardCheck,
    core: ["Test Case Design & Execution", "API Testing", "SQL Querying"],
    items: [
      "Web & Mobile",
      "Requirement Analysis",
      "Test Planning",
      "Test Reporting",
      "Defect Management",
      "User Guide Documentation",
    ],
  },
  {
    id: "test-types",
    title: "Test Types",
    icon: ListChecks,
    core: ["Functional", "Regression", "Integration"],
    items: ["UI/UX", "Smoke", "Sanity", "Security (XSS, SQLi)", "Cross-browser", "Retesting"],
  },
  {
    id: "automation",
    title: "Automation Testing",
    icon: Bot,
    core: ["Playwright (TypeScript)"],
    items: ["Selenium WebDriver", "Appium"],
  },
  {
    id: "api-db",
    title: "API & Database",
    icon: Plug,
    core: ["Postman", "SQL", "PostgreSQL"],
    items: ["Swagger", "MySQL", "MongoDB", "DBeaver"],
  },
  {
    id: "programming",
    title: "Programming & Scripting",
    icon: Code2,
    core: ["TypeScript", "JavaScript"],
    items: ["HTML", "CSS", "C#"],
  },
  {
    id: "tools",
    title: "Tools & Process",
    icon: Wrench,
    core: ["Agile/Scrum", "Jira", "GitLab", "AI Tools"],
    items: [
      "BrowserStack",
      "Chrome DevTools",
      "OWASP ZAP",
      "Figma",
      "Notion",
      "Excel / Sheets",
      "SDLC · STLC",
      "Waterfall",
    ],
  },
];
