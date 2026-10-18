"use client";

import { Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { skillCategories } from "@/data/skills";
import { handleSpotlightMove } from "@/lib/spotlight";
import { HiddenBug } from "@/components/bug-hunt/bug-hunt";

export function Skills() {
  return (
    <section id="skills" className="relative py-10 sm:py-18">
      <HiddenBug id="skills" className="right-4 top-6 sm:right-12" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="A full-stack QA toolkit"
          description="From manual and API testing to SQL validation and Playwright automation — everything at a glance."
        />

        <Reveal className="mt-8 flex justify-center">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" /> Core strengths
          </span>
        </Reveal>

        <StaggerGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <StaggerItem key={category.id}>
              <div
                onMouseMove={handleSpotlightMove}
                className="spotlight glass card-shadow relative h-full rounded-2xl p-6"
              >
                <div className="relative z-[1] flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <category.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{category.title}</h3>
                </div>

                <div className="relative z-[1] mt-5 flex flex-wrap gap-2">
                  {category.core.map((item) => (
                    <span
                      key={item}
                      className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-3 py-1.5 text-sm font-medium text-foreground"
                    >
                      <Star className="h-3 w-3 shrink-0 fill-primary text-primary" aria-hidden />
                      {item}
                    </span>
                  ))}
                </div>

                <div className="relative z-[1] mt-3 flex flex-wrap gap-1.5">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[13px] text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
