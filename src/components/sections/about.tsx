"use client";

import { Layers, Microscope, Repeat, Users2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { profile } from "@/data/profile";
import { handleSpotlightMove } from "@/lib/spotlight";

const PILLARS = [
  {
    icon: Microscope,
    title: "Prevention over detection",
    description: "I shift quality left — reviewing specs and edge cases before code is written, not after it ships.",
  },
  {
    icon: Repeat,
    title: "Automation where it counts",
    description: "I automate smoke and regression checks with Playwright so they don't rely on someone re-running them every release.",
  },
  {
    icon: Layers,
    title: "Full-stack visibility",
    description: "From UI to API to database — I validate quality at every layer, not just what's on screen.",
  },
  {
    icon: Users2,
    title: "Engineering collaboration",
    description: "QA works best embedded with developers — I pair on root cause, not just report symptoms.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-10 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="Quality is a discipline, not a checkbox"
          description="A closer look at how I think about testing, process, and building trust in software releases."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal className="space-y-5 text-muted-foreground">
            {profile.bio.map((paragraph, index) => (
              <p key={index} className="text-balance leading-relaxed">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <StaggerGroup className="grid gap-5 sm:grid-cols-2">
            {PILLARS.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <div
                  onMouseMove={handleSpotlightMove}
                  className="spotlight glass card-shadow group relative h-full rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative z-[1] flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                    <pillar.icon className="h-5 w-5" />
                  </div>
                  <h3 className="relative z-[1] mt-4 font-heading text-base font-semibold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="relative z-[1] mt-2 text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
