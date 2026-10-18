export type RoadmapItem = {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "planned";
};

export const roadmap: RoadmapItem[] = [
  {
    id: "playwright-automation",
    title: "Deeper Playwright automation",
    description: "From smoke and regression scripts to owning full automation suites.",
    status: "in-progress",
  },
  {
    id: "ai-testing",
    title: "AI-assisted testing",
    description: "Using ChatGPT, Claude, and Codex across analysis, test design, and scripting.",
    status: "in-progress",
  },
  {
    id: "istqb",
    title: "ISTQB Foundation Level",
    description: "Preparing to formalize my testing knowledge with the CTFL certification.",
    status: "in-progress",
  },
  {
    id: "non-functional",
    title: "Performance & security testing",
    description: "Load testing and broader OWASP Top 10 coverage beyond XSS and SQLi.",
    status: "planned",
  },
];
