export type Project = {
  id: string;
  title: string;
  role: string;
  platform: string;
  period: string;
  summary: string;
  scope: string[];
  tech: string[];
  results: { label: string; value: string }[];
  // large = current main work (2-up row); compact = 3-up row
  size: "large" | "compact";
};

export const projects: Project[] = [
  {
    id: "lws-enterprise-platform",
    title: "LWS Portal — Data Center / B2B Customer Lifecycle",
    role: "QA/QC Engineer",
    platform: "Web · Admin",
    period: "Oct 2025 — Present",
    summary:
      "Enterprise Data Center and Colocation platform for Singapore customers — CRM, facility operations, physical access, and permit-to-work in one system.",
    scope: [
      "Request, Permission & multi-step Approval workflows — Permit to Work, Cross Connect, Remote Hand, Access Requests",
      "Role-based and facility-based access control",
      "API and database validation with Postman and PostgreSQL",
    ],
    tech: ["Postman", "PostgreSQL", "GitLab", "Chrome DevTools"],
    results: [
      { label: "Test cases", value: "2,000+" },
      { label: "Sprints owned", value: "15+" },
    ],
    size: "large",
  },
  {
    id: "lwsn-regional-platform",
    title: "LWSn Portal — Facility Network / B2B Sales",
    role: "QA/QC Engineer",
    platform: "Web · Admin",
    period: "Oct 2025 — Present",
    summary:
      "Multi-market Network Facility and B2B Sales platform serving Singapore and Malaysia.",
    scope: [
      "End-to-end Lead → Quote → Sales Order → Delivery → Renewal/Termination",
      "Margin-based pricing, approval rules, and role/data permissions",
      "Document traceability, API/DB validation, and regression",
    ],
    tech: ["Postman", "PostgreSQL", "GitLab", "Chrome DevTools"],
    results: [
      { label: "Test cases", value: "1,500+" },
      { label: "Sprints owned", value: "6" },
      { label: "Markets", value: "SG · MY" },
    ],
    size: "large",
  },
  {
    id: "indoor-navigation",
    title: "Position Tracking — Indoor Navigation",
    role: "QA/QC Engineer",
    platform: "iOS/Android · Web · Admin",
    period: "Oct 2025 — Present",
    summary:
      "Multi-platform indoor navigation and location-based services app, tested from requirements through production release.",
    scope: [
      "Real-time positioning, floor transitions, and indoor wayfinding",
      "Smoke and regression automation with Playwright (TypeScript)",
      "AI-assisted script development and edge-case analysis",
    ],
    tech: [
      "Playwright",
      "TypeScript",
      "Postman",
      "PostgreSQL",
      "GitLab",
      "Chrome DevTools",
    ],
    results: [
      { label: "Test cases", value: "700+" },
      { label: "Defects found", value: "50+" },
      { label: "Critical regressions", value: "0" },
    ],
    size: "compact",
  },
  {
    id: "adex",
    title: "Adex — Digital Advertising",
    role: "QC / Tester",
    platform: "Web",
    period: "Mar 2025 — Oct 2025",
    summary:
      "Quality assurance for a web-based digital advertising and media sales platform covering Booking → Campaign → Contract workflows and map-based media placement.",
    scope: [
      "Booking → Campaign → Contract workflows",
      "Google Maps integration — locations, markers, filters, screen selection",
      "API testing with Postman/Swagger and DB checks in PostgreSQL",
    ],
    tech: ["Jira", "Postman", "Swagger", "PostgreSQL", "Google Maps"],
    results: [
      { label: "Test cases", value: "400+" },
      { label: "Defects found", value: "70+" },
    ],
    size: "compact",
  },
  {
    id: "cake-ecommerce",
    title: "Cake E-commerce — Personal Project",
    role: "QA Tester",
    platform: "Web",
    period: "Apr 2025 — May 2025",
    summary:
      "A web-based e-commerce platform for online cake ordering, payment, and order management.",
    scope: [
      "End-to-end Login, Product, Cart, Checkout, and Order Management",
      "Functional, UI/UX, Performance, and Security (OWASP ZAP) testing",
      "Cross-browser via BrowserStack; automation with Selenium and Appium",
    ],
    tech: ["Selenium", "Appium", "BrowserStack", "OWASP ZAP", "Jira"],
    results: [
      { label: "Test cases", value: "200+" },
      { label: "Defects reported", value: "25+" },
    ],
    size: "compact",
  },
];
