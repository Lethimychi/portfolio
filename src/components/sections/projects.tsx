"use client";

import { Layers, Monitor } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { handleSpotlightMove } from "@/lib/spotlight";
import { HiddenBug } from "@/components/bug-hunt/bug-hunt";

const CARD_CLASS =
  "spotlight glass card-shadow group relative flex h-full flex-col rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:glow-primary";

export function Projects() {
  const large = projects.filter((p) => p.size === "large");
  const compact = projects.filter((p) => p.size === "compact");

  return (
    <section id="projects" className="relative py-10 sm:py-18">
      <HiddenBug id="projects" className="bottom-0 left-4 sm:left-10" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Testing scope that moved the needle"
          description="A selection of products where my testing directly improved release quality and shipping confidence."
        />

        <StaggerGroup className="mt-16 grid gap-6 lg:grid-cols-2">
          {large.map((project) => (
            <StaggerItem key={project.id}>
              <LargeCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <StaggerGroup className="mt-6 grid gap-6 lg:grid-cols-3">
          {compact.map((project) => (
            <StaggerItem key={project.id}>
              <CompactCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function LargeCard({ project }: { project: Project }) {
  return (
    <article onMouseMove={handleSpotlightMove} className={cn(CARD_CLASS, "p-6 sm:p-7")}>
      <div className="relative z-[1]">
        <h3 className="font-heading text-lg font-semibold text-foreground sm:text-xl">{project.title}</h3>
        <ProjectMeta project={project} />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

      <div className="mt-5">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">Testing scope</p>
        <ScopeList items={project.scope} />
      </div>

      <TechList tech={project.tech} />
      <Results results={project.results} />
    </article>
  );
}

function CompactCard({ project }: { project: Project }) {
  const [name, domain] = project.title.split(" — ");
  return (
    <article onMouseMove={handleSpotlightMove} className={cn(CARD_CLASS, "p-6")}>
      <div className="relative z-[1]">
        {domain && (
          <p className="font-mono text-[11px] uppercase tracking-wider text-secondary/90">{domain}</p>
        )}
        <h3 className="mt-1 font-heading text-lg font-semibold text-foreground">{name}</h3>
        <ProjectMeta project={project} />
      </div>

      <ScopeList items={project.scope} />
      <TechList tech={project.tech} />
      <Results results={project.results} compact />
    </article>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <Layers className="h-3.5 w-3.5" /> {project.role}
      </span>
      <span className="flex items-center gap-1.5">
        <Monitor className="h-3.5 w-3.5" /> {project.platform}
      </span>
    </div>
  );
}

function ScopeList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm text-muted-foreground">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function TechList({ tech }: { tech: string[] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <span
          key={t}
          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function Results({ results, compact = false }: { results: Project["results"]; compact?: boolean }) {
  return (
    // mt-auto pins the numbers to the card bottom so they line up across a row
    <div className="mt-auto pt-6">
      <div
        className={cn(
          "grid gap-3 border-t border-white/8 pt-5",
          compact ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"
        )}
      >
        {results.map((result) => (
          <div key={result.label} className="min-w-0">
            <p
              className={cn(
                "break-words font-heading font-semibold text-gradient",
                compact ? "text-base" : "text-base sm:text-lg"
              )}
            >
              {result.value}
            </p>
            <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{result.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
