// Representative samples modeled on real projects (Position Tracking and
// LWS Portal) — illustrating how I structure test cases, bug reports, API
// tests, SQL validation, and Playwright specs, rather than literal excerpts.
// Identifiers, endpoints, and data are illustrative, not production values.

const ptTestCase = {
  id: "TC-INAV-014",
  title: "Position Tracking — User's live location marker updates accurately while moving between two points",
  module: "Indoor Navigation Platform / Position Tracking",
  priority: "High",
  preconditions: [
    "Location/Bluetooth permissions are granted on the device",
    "App has an active session with the correct building map loaded",
    "Device is within range of at least 3 known Wi-Fi/BLE beacons",
  ],
  steps: [
    { step: "Open the app and load the building map view", expected: "Map renders the correct floor plan with the user marker at the current position" },
    { step: "Walk from Point A to Point B within the same floor", expected: "User marker updates smoothly along the path in real time, without jumps" },
    { step: "Move to a different floor via stairs/elevator", expected: "App detects the floor change and switches the map to the correct floor level" },
    { step: "Stand still for 30 seconds", expected: "Marker position remains stable and does not drift to another location" },
    { step: "Compare the displayed marker position with the user's actual physical location", expected: "Marker position matches the actual location within the expected accuracy tolerance (≤ 3m)" },
  ],
  status: "Passed",
  automated: false,
};

const ptBugReport = {
  id: "BUG-INAV-032",
  title: "Position marker flickers between floors when standing near a stairwell",
  severity: "Medium",
  priority: "P2",
  environment: "Staging — Android 13, physical device",
  reportedBy: "Le Thi My Chi",
  status: "Resolved",
  stepsToReproduce: [
    "Open the app and navigate to Floor 2, near the stairwell junction",
    "Stand still within 1–2 meters of the stairwell for about 20 seconds",
    "Observe the position marker on the map",
  ],
  expected: "The marker stays on Floor 2 at the correct location, since the user did not change floors",
  actual: "The marker intermittently jumps to Floor 1 or Floor 3 and back, causing a flickering effect on the map",
  impact: "Users near stairwells could lose trust in the navigation accuracy and get confused mid-route in poorly covered signal areas.",
  rootCause: "Floor-detection logic weighted BLE beacon signals from adjacent floors too heavily during position triangulation, causing false floor transitions.",
};

const ptApiTest = {
  method: "POST" as const,
  endpoint: "/api/v1/routes/search",
  description: "Validates route search between two indoor points — response schema, distance/time fields, and error handling for unreachable destinations.",
  requestBody: `{
  "buildingId": "bld_A12",
  "fromPointId": "pt_101",
  "toPointId": "pt_248"
}`,
  assertions: [
    { label: "Status code", expected: "200 OK" },
    { label: "route.steps", expected: "non-empty array, ordered by sequence" },
    { label: "route.distanceMeters", expected: "> 0" },
    { label: "Unreachable point → 404", expected: "error.code == 'POINT_UNREACHABLE'" },
  ],
  responseBody: `{
  "routeId": "rt_88291",
  "distanceMeters": 42.5,
  "estimatedTimeSec": 55,
  "steps": [
    { "instruction": "Head north", "pointId": "pt_101" },
    { "instruction": "Turn right at junction B2", "pointId": "pt_190" },
    { "instruction": "Arrive at destination", "pointId": "pt_248" }
  ],
  "status": "success"
}`,
};

const ptSqlValidation = {
  title: "Route data integrity — building & point references",
  description: "Validates that every stored route references existing building and point records — used to confirm database consistency after a data import.",
  query: `SELECT
  r.route_id,
  r.building_id,
  r.from_point_id,
  r.to_point_id
FROM routes r
LEFT JOIN points p1 ON p1.point_id = r.from_point_id
LEFT JOIN points p2 ON p2.point_id = r.to_point_id
WHERE p1.point_id IS NULL OR p2.point_id IS NULL;`,
  expectedRows: 0,
  actualRows: 0,
  result: "PASS" as const,
  note: "0 orphaned route records found — confirms point references stayed consistent after the latest building data import.",
};

const ptPlaywright = {
  fileName: "regression.spec.ts",
  title: "regression.spec.ts — Indoor Navigation login & route search",
  code: `import { test, expect } from "@playwright/test";

test.describe("Indoor Navigation — core regression", () => {
  test("logs in and finds a route between two points", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("qa.tester@example.com");
    await page.getByLabel("Password").fill("********");
    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(page).toHaveURL(/dashboard/);

    await page.getByRole("combobox", { name: "From" }).selectOption("Point 101");
    await page.getByRole("combobox", { name: "To" }).selectOption("Point 248");
    await page.getByRole("button", { name: "Find Route" }).click();

    await expect(page.getByTestId("route-steps")).toBeVisible();
    await expect(page.getByTestId("route-distance")).toContainText("m");
  });
});`,
  stats: { passed: 18, failed: 0, flaky: 0, duration: "42s" },
};

// ---------------------------------------------------------------------------
// LWS Portal — Data Center / B2B Customer Lifecycle
// ---------------------------------------------------------------------------

const lwsTestCase = {
  id: "TC-LWS-PTW-021",
  title: "Permit to Work — multi-step approval routes to the right approver by role and facility",
  module: "LWS Portal / Requests / Permit to Work",
  priority: "High",
  preconditions: [
    "Customer user has Permit to Work permission for facility SG-01 only",
    "Approval chain configured: Customer Admin → DC Operations → Security",
    "A DC Operations user exists for SG-01 and another for a different facility",
  ],
  steps: [
    { step: "Customer user submits a Permit to Work request for SG-01 with a valid work window", expected: "Request is created with status Pending Customer Admin and appears in the Customer Admin queue only" },
    { step: "Customer Admin approves the request", expected: "Status moves to Pending DC Operations; approval history records approver, time, and action" },
    { step: "DC Operations user from another facility opens the request via direct URL", expected: "Access is denied — request is not visible outside the assigned facility" },
    { step: "DC Operations user for SG-01 approves the request", expected: "Status moves to Pending Security; requester receives a status update" },
    { step: "Security rejects the request with a reason", expected: "Status becomes Rejected, reason is shown to the requester, and no further approvals are possible" },
  ],
  status: "Passed",
  automated: false,
};

const lwsBugReport = {
  id: "BUG-LWS-118",
  title: "Remote Hand request can be approved by a DC Operations user outside the request's facility",
  severity: "Major",
  priority: "P1",
  environment: "STG — Admin Portal, Chrome",
  reportedBy: "Le Thi My Chi",
  status: "Resolved",
  stepsToReproduce: [
    "Log in as a DC Operations user assigned to facility MY-02 only",
    "Open a Remote Hand request created for facility SG-01 using its direct URL",
    "Click Approve",
  ],
  expected: "The request is not accessible, and the approve action is rejected because the user has no access to SG-01",
  actual: "The request detail loads and the approval succeeds, moving the request to the next approval step",
  impact: "Breaks the facility-based permission model — staff could approve operational work at sites they are not responsible for.",
  rootCause: "The approve endpoint checked the user's role but not their facility scope; the list view filtered by facility, which hid the gap in normal navigation.",
};

const lwsApiTest = {
  method: "POST" as const,
  endpoint: "/api/v1/requests/{id}/approve",
  description: "Validates the approval step of a Remote Hand request — status transition, facility-scope enforcement, and protection against double approval.",
  requestBody: `{
  "requestId": "req_40217",
  "action": "APPROVE",
  "comment": "Work window confirmed with site team"
}`,
  assertions: [
    { label: "Status code", expected: "200 OK for an approver with SG-01 access" },
    { label: "request.status", expected: "PENDING_SECURITY after DC Ops approval" },
    { label: "Approver outside facility → 403", expected: "error.code == 'FACILITY_SCOPE_DENIED'" },
    { label: "Approve twice → 409", expected: "error.code == 'ALREADY_ACTIONED'" },
  ],
  responseBody: `{
  "requestId": "req_40217",
  "type": "REMOTE_HAND",
  "facility": "SG-01",
  "status": "PENDING_SECURITY",
  "approvals": [
    { "step": 1, "role": "CUSTOMER_ADMIN", "action": "APPROVED" },
    { "step": 2, "role": "DC_OPERATIONS", "action": "APPROVED" }
  ]
}`,
};

const lwsSqlValidation = {
  title: "Approval integrity — approver must have access to the request's facility",
  description: "Finds any approval recorded by a user who has no access to the facility of the request — used to verify the fix for BUG-LWS-118 and to guard against regressions.",
  query: `SELECT
  a.request_id,
  a.approver_id,
  r.facility_id
FROM request_approvals a
JOIN requests r ON r.request_id = a.request_id
LEFT JOIN user_facility_access ufa
  ON ufa.user_id = a.approver_id
 AND ufa.facility_id = r.facility_id
WHERE a.action = 'APPROVED'
  AND ufa.user_id IS NULL;`,
  expectedRows: 0,
  actualRows: 0,
  result: "PASS" as const,
  note: "0 out-of-scope approvals found after the fix — every approval traces back to an approver with access to that facility.",
};

// ---------------------------------------------------------------------------

export type TestCaseSample = typeof ptTestCase;
export type BugReportSample = typeof ptBugReport;
export type ApiTestSample = typeof ptApiTest;
export type SqlValidationSample = typeof ptSqlValidation;
export type PlaywrightSample = typeof ptPlaywright;

export type ShowcaseProject = {
  id: string;
  name: string;
  domain: string;
  host: string;
  testCase: TestCaseSample;
  bugReport: BugReportSample;
  apiTest: ApiTestSample;
  sqlValidation: SqlValidationSample;
  // Only present where I actually wrote automation for that project.
  playwright?: PlaywrightSample;
};

export const showcaseProjects: ShowcaseProject[] = [
  {
    id: "lws",
    name: "LWS Portal",
    domain: "Data Center · B2B approvals & permissions",
    host: "lws-portal",
    testCase: lwsTestCase,
    bugReport: lwsBugReport,
    apiTest: lwsApiTest,
    sqlValidation: lwsSqlValidation,
  },
  {
    id: "position-tracking",
    name: "Position Tracking",
    domain: "Indoor Navigation · iOS/Android/Web",
    host: "indoor-nav",
    testCase: ptTestCase,
    bugReport: ptBugReport,
    apiTest: ptApiTest,
    sqlValidation: ptSqlValidation,
    playwright: ptPlaywright,
  },
];
