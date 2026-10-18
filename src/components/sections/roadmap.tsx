"use client";

import { CheckCircle2, CircleDashed, LoaderCircle } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { roadmap } from "@/data/roadmap";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  completed: { icon: CheckCircle2, className: "text-success border-success/30 bg-success/10", label: "Completed" },
  "in-progress": { icon: LoaderCircle, className: "text-primary border-primary/30 bg-primary/10", label: "In progress" },
  planned: { icon: CircleDashed, className: "text-muted-foreground border-white/10 bg-white/5", label: "Planned" },
} as const;

export function Roadmap() {
  return (
    <section id="roadmap" className="relative py-10 sm:py-18">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Learning Roadmap" title="Where I'm headed next" />

        <StaggerGroup className="mt-12 grid gap-3 sm:grid-cols-2">
          {roadmap.map((item) => {
            const config = STATUS_CONFIG[item.status];
            return (
              <StaggerItem key={item.id}>
                <div className="glass relative flex h-full items-start gap-3.5 rounded-2xl p-4 sm:p-5">
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                      config.className
                    )}
                    title={config.label}
                  >
                    <config.icon
                      className={cn("h-4 w-4", item.status === "in-progress" && "animate-spin [animation-duration:2.5s]")}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <h3 className="font-heading text-sm font-semibold text-foreground sm:text-base">{item.title}</h3>
                      <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground/70">
                        {config.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
