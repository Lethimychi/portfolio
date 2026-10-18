"use client";

import { useState, type ReactNode } from "react";
import { CheckCircle2, CircleDot, Database, FileCode2, FlaskConical, ShieldAlert } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { PipelineFlow } from "@/components/shared/pipeline-flow";
import { cn } from "@/lib/utils";
import {
  showcaseProjects,
  type ApiTestSample,
  type BugReportSample,
  type PlaywrightSample,
  type SqlValidationSample,
  type TestCaseSample,
} from "@/data/qaShowcase";

const SEVERITY_STYLES: Record<string, string> = {
  Critical: "border-danger/30 bg-danger/10 text-danger",
  Major: "border-danger/30 bg-danger/10 text-danger",
  Medium: "border-warning/30 bg-warning/10 text-warning",
  Minor: "border-primary/30 bg-primary/10 text-primary",
  Low: "border-success/30 bg-success/10 text-success",
};

const TAB_TRIGGER_CLASS =
  "gap-1.5 rounded-xl px-3.5 py-2 text-xs data-active:bg-primary/15 data-active:text-foreground sm:text-sm";

export function QAShowcase() {
  const [projectId, setProjectId] = useState(showcaseProjects[0].id);
  const [tab, setTab] = useState("test-cases");
  const project = showcaseProjects.find((p) => p.id === projectId) ?? showcaseProjects[0];
  const activeTab = tab === "playwright" && !project.playwright ? "test-cases" : tab;

  return (
    <section id="qa-showcase" className="relative py-10 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="QA Showcase"
          title="How I document and validate quality"
          description="Representative examples modeled on projects I've tested — pick a project, then go from written test cases down to the SQL that proves a fix."
        />

        <Reveal className="mt-14">
          <PipelineFlow />
        </Reveal>

        <Reveal className="mt-14">
          <div role="radiogroup" aria-label="Choose a project" className="mx-auto mb-4 grid max-w-2xl gap-2 sm:grid-cols-2">
            {showcaseProjects.map((p) => {
              const active = p.id === project.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setProjectId(p.id)}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-left transition-colors",
                    active
                      ? "border-primary/40 bg-primary/10"
                      : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                  )}
                >
                  <span className={cn("block text-sm font-medium", active ? "text-foreground" : "text-muted-foreground")}>
                    {p.name}
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] text-muted-foreground/70">{p.domain}</span>
                </button>
              );
            })}
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setTab(String(v))} className="w-full">
            <TabsList className="glass mx-auto flex h-auto w-full max-w-full flex-wrap justify-start gap-1 rounded-2xl p-1.5 sm:justify-center">
              <TabsTrigger value="test-cases" className={TAB_TRIGGER_CLASS}>
                <CheckCircle2 className="h-3.5 w-3.5" /> Test Cases
              </TabsTrigger>
              <TabsTrigger value="bug-reports" className={TAB_TRIGGER_CLASS}>
                <ShieldAlert className="h-3.5 w-3.5" /> Bug Reports
              </TabsTrigger>
              <TabsTrigger value="api-testing" className={TAB_TRIGGER_CLASS}>
                <FlaskConical className="h-3.5 w-3.5" /> API Testing
              </TabsTrigger>
              <TabsTrigger value="sql" className={TAB_TRIGGER_CLASS}>
                <Database className="h-3.5 w-3.5" /> SQL Validation
              </TabsTrigger>
              {project.playwright && (
                <TabsTrigger value="playwright" className={TAB_TRIGGER_CLASS}>
                  <FileCode2 className="h-3.5 w-3.5" /> Playwright
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="test-cases" className="mt-8">
              <TestCasePanel data={project.testCase} host={project.host} />
            </TabsContent>
            <TabsContent value="bug-reports" className="mt-8">
              <BugReportPanel data={project.bugReport} host={project.host} />
            </TabsContent>
            <TabsContent value="api-testing" className="mt-8">
              <ApiTestingPanel data={project.apiTest} host={project.host} />
            </TabsContent>
            <TabsContent value="sql" className="mt-8">
              <SqlValidationPanel data={project.sqlValidation} host={project.host} />
            </TabsContent>
            {project.playwright && (
              <TabsContent value="playwright" className="mt-8">
                <PlaywrightPanel data={project.playwright} />
              </TabsContent>
            )}
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}

function PanelShell({ children, footer, url }: { children: ReactNode; footer?: ReactNode; url?: string }) {
  return (
    <div className="glass card-shadow overflow-hidden rounded-3xl">
      {url && (
        <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.02] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          <span className="ml-2 truncate rounded-md bg-white/5 px-2.5 py-1 font-mono text-[11px] text-muted-foreground/80">
            {url}
          </span>
        </div>
      )}
      <div className="p-6 sm:p-8">{children}</div>
      {footer && <div className="border-t border-white/8 bg-white/[0.02] px-6 py-4 sm:px-8">{footer}</div>}
    </div>
  );
}

function CodeBlock({ code, title }: { code: string; title?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/8 bg-background/60">
      {title && (
        <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          <span className="ml-2 font-mono text-xs text-muted-foreground">{title}</span>
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function TestCasePanel({ data: testCaseSample, host }: { data: TestCaseSample; host: string }) {
  return (
    <PanelShell url={`app.${host}.io/qa/test-cases/${testCaseSample.id}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="font-mono text-xs text-muted-foreground">{testCaseSample.id}</span>
          <h3 className="mt-1 font-heading text-lg font-semibold text-foreground">{testCaseSample.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{testCaseSample.module}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="border-warning/30 bg-warning/10 text-warning" variant="outline">
            {testCaseSample.priority} priority
          </Badge>
          <Badge className="border-success/30 bg-success/10 text-success" variant="outline">
            {testCaseSample.status}
          </Badge>
          {testCaseSample.automated && (
            <Badge className="border-secondary/30 bg-secondary/10 text-secondary" variant="outline">
              Automated
            </Badge>
          )}
        </div>
      </div>

      <div className="mt-6">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">Preconditions</p>
        <ul className="mt-2 space-y-1.5">
          {testCaseSample.preconditions.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 overflow-x-auto">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">Steps</p>
        <table className="w-full min-w-[480px] border-separate border-spacing-y-1.5 text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground/70">
              <th className="w-8 pb-1 font-medium">#</th>
              <th className="pb-1 font-medium">Step</th>
              <th className="pb-1 font-medium">Expected Result</th>
            </tr>
          </thead>
          <tbody>
            {testCaseSample.steps.map((step, index) => (
              <tr key={step.step} className="align-top">
                <td className="rounded-l-lg bg-white/[0.03] py-2.5 pl-3 text-muted-foreground">{index + 1}</td>
                <td className="bg-white/[0.03] py-2.5 pr-3 text-foreground">{step.step}</td>
                <td className="rounded-r-lg bg-white/[0.03] py-2.5 pr-3 text-muted-foreground">{step.expected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelShell>
  );
}

function BugReportPanel({ data: b, host }: { data: BugReportSample; host: string }) {
  return (
    <PanelShell url={`gitlab.com/${host}/issues/${b.id}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="font-mono text-xs text-muted-foreground">{b.id}</span>
          <h3 className="mt-1 font-heading text-lg font-semibold text-foreground">{b.title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={cn(SEVERITY_STYLES[b.severity])}>
            {b.severity}
          </Badge>
          <Badge variant="outline" className="border-white/10 text-muted-foreground">
            {b.priority}
          </Badge>
          <Badge variant="outline" className="border-success/30 bg-success/10 text-success">
            {b.status}
          </Badge>
        </div>
      </div>

      <p className="mt-2 font-mono text-xs text-muted-foreground/70">{b.environment} · reported by {b.reportedBy}</p>

      <div className="mt-6">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">Steps to Reproduce</p>
        <ol className="mt-2 space-y-1.5">
          {b.stepsToReproduce.map((step, index) => (
            <li key={step} className="flex gap-2 text-sm text-muted-foreground">
              <span className="font-mono text-xs text-muted-foreground/60">{index + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-success/20 bg-success/[0.04] p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-success/80">Expected</p>
          <p className="mt-1.5 text-sm text-muted-foreground">{b.expected}</p>
        </div>
        <div className="rounded-xl border border-danger/20 bg-danger/[0.04] p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-danger/80">Actual</p>
          <p className="mt-1.5 text-sm text-muted-foreground">{b.actual}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">Impact</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b.impact}</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">Root Cause</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b.rootCause}</p>
        </div>
      </div>
    </PanelShell>
  );
}

function ApiTestingPanel({ data: a, host }: { data: ApiTestSample; host: string }) {
  return (
    <PanelShell url={`postman://${host}${a.endpoint}`}>
      <div className="flex flex-wrap items-center gap-3">
        <Badge className="bg-secondary text-secondary-foreground">{a.method}</Badge>
        <code className="font-mono text-sm text-foreground">{a.endpoint}</code>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{a.description}</p>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">Request Body</p>
          <CodeBlock code={a.requestBody} title="request.json" />
        </div>
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">Response Body</p>
          <CodeBlock code={a.responseBody} title="200 OK" />
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">Assertions</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {a.assertions.map((assertion) => (
            <li key={assertion.label} className="flex items-start gap-2 rounded-lg bg-white/[0.03] px-3 py-2 text-sm">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span>
                <span className="text-foreground">{assertion.label}</span>{" "}
                <span className="text-muted-foreground">— {assertion.expected}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </PanelShell>
  );
}

function SqlValidationPanel({ data: s, host }: { data: SqlValidationSample; host: string }) {
  return (
    <PanelShell url={`dbeaver://postgresql/${host.replace(/-/g, "_")}_stg`}>
      <h3 className="font-heading text-lg font-semibold text-foreground">{s.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>

      <div className="mt-6">
        <CodeBlock code={s.query} title="validation.sql" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl bg-white/[0.03] p-4 text-center">
          <p className="font-heading text-xl font-semibold text-foreground">{s.expectedRows}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Expected mismatches</p>
        </div>
        <div className="rounded-xl bg-white/[0.03] p-4 text-center">
          <p className="font-heading text-xl font-semibold text-foreground">{s.actualRows}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Actual mismatches</p>
        </div>
        <div className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-success/30 bg-success/10 p-4 text-success sm:col-span-2">
          <CheckCircle2 className="h-4 w-4" />
          <span className="font-mono text-sm font-medium">{s.result}</span>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{s.note}</p>
    </PanelShell>
  );
}

function PlaywrightPanel({ data: p }: { data: PlaywrightSample }) {
  return (
    <PanelShell
      url="localhost:9323/trace-viewer"
      footer={
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs">
          <span className="flex items-center gap-1.5 text-success">
            <CircleDot className="h-3 w-3" /> {p.stats.passed} passed
          </span>
          <span className="flex items-center gap-1.5 text-danger">
            <CircleDot className="h-3 w-3" /> {p.stats.failed} failed
          </span>
          <span className="flex items-center gap-1.5 text-warning">
            <CircleDot className="h-3 w-3" /> {p.stats.flaky} flaky
          </span>
          <span className="ml-auto text-muted-foreground">{p.stats.duration}</span>
        </div>
      }
    >
      <p className="mb-3 font-mono text-xs text-muted-foreground/70">{p.title}</p>
      <CodeBlock code={p.code} title={p.fileName} />
    </PanelShell>
  );
}
