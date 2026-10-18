"use client";

import { motion } from "framer-motion";
import { Bug, FileSearch, ListChecks, PlayCircle, Rocket, RotateCcw } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/shared/reveal";

const STEPS = [
  { label: "Requirement Analysis", sub: "SRS / BRD", icon: FileSearch },
  { label: "Test Design", sub: "Cases & scenarios", icon: ListChecks },
  { label: "Execution", sub: "TST → STG → UAT", icon: PlayCircle },
  { label: "Bug Report", sub: "Jira / GitLab", icon: Bug },
  { label: "Retest", sub: "Verify the fix", icon: RotateCcw },
  { label: "Release", sub: "PRD sign-off", icon: Rocket },
];

export function PipelineFlow() {
  return (
    <div className="relative overflow-x-auto no-scrollbar">
      <StaggerGroup className="relative flex min-w-max items-start justify-between gap-8 px-2 sm:min-w-0 sm:gap-4">
        <div className="absolute left-6 right-6 top-6 h-px bg-gradient-to-r from-primary via-secondary to-accent opacity-40" />
        <motion.div
          aria-hidden
          className="glow-primary absolute top-6 z-10 h-2 w-2 -translate-y-1/2 rounded-full bg-secondary"
          style={{ left: "3%" }}
          animate={{ left: ["3%", "97%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.85, 1] }}
        />
        {STEPS.map((step) => (
          <StaggerItem key={step.label} className="relative z-10 flex w-28 flex-col items-center gap-3 text-center sm:w-auto sm:flex-1">
            <div className="glass card-shadow flex h-12 w-12 items-center justify-center rounded-full text-primary">
              <step.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium leading-snug text-foreground">{step.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{step.sub}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
