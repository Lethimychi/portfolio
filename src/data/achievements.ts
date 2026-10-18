import type { LucideIcon } from "lucide-react";
import { Users2, Globe2, Wrench, ShieldCheck, Repeat, Bug } from "lucide-react";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  year: string;
  icon: LucideIcon;
  metric?: string;
};

export const achievements: Achievement[] = [
  {
    id: "five-industries",
    title: "Onboarded Into Five Different Industries",
    description:
      "Tested production systems across Indoor Navigation, Media/Ad Sales, E-commerce, CRM, and AI/Computer Vision — learning each domain's rules well enough to test it, not just click through it.",
    year: "Mar 2025 — Present",
    icon: Globe2,
  },
  {
    id: "sole-qa-owner",
    title: "Owned QA Across 20+ Sprints",
    description:
      "Owned QA for LWS (15+ sprints) and LWSn (6 sprints) — complex B2B Data Center and Sales platforms — plus Position Tracking across iOS/Android, Web, and Admin, from test planning through release sign-off.",
    year: "Mar 2025 — Present",
    icon: Users2,
  },

  {
    id: "toolchain",
    title: "One Tester, Full Toolchain",
    description:
      "Move fluidly between Postman/Swagger for API testing, DBeaver for PostgreSQL/MySQL validation, and Jira/GitLab for defect tracking — no handoffs needed between testing layers.",
    year: "Mar 2025 — Present",
    icon: Wrench,
  },
  {
    id: "release-stability",
    title: "Zero Critical Regression Defects",
    description:
      "Validated Position Tracking releases across TST → STG → UAT → Production with zero critical regression defects reaching core business flows.",
    year: "Mar 2025 — Present",
    icon: ShieldCheck,
  },
  {
    id: "dual-skill-growth",
    title: "Growing Manual and Automation Skills in Parallel",
    description:
      "Manual testing stays my core strength, and I automate smoke and regression tests with Playwright (TypeScript) — using ChatGPT, Claude, and Codex to speed up script development, scenario generation, and edge-case analysis.",
    year: "Mar 2025 — Present",
    icon: Repeat,
  },
  {
    id: "security-mindset",
    title: "Non-Functional Testing Beyond the Checklist",
    description:
      "Go beyond the functional test cases to consider security, performance, load, accessibility testing...not just to check a box, but to catch issues that could impact users or the business.",
    year: "Mar 2025 — Present",
    icon: Bug,
  },
];
