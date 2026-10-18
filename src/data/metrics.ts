// Projects replayed as test suites in the hero terminal. Per-project numbers
// live on the project cards (projects.ts) so they aren't repeated here.

export type TestSuite = {
  id: string;
  name: string;
  domain: string;
};

export const testSuites: TestSuite[] = [
  { id: "lws", name: "LWS Portal", domain: "Data Center / B2B" },
  { id: "lwsn", name: "LWSn Portal", domain: "B2B Sales · SG & MY" },
  { id: "position-tracking", name: "Position Tracking", domain: "Indoor Navigation" },
  { id: "adex", name: "Adex", domain: "Media / Ad Sales" },
  { id: "cake", name: "Cake E-commerce", domain: "E-commerce" },
];
