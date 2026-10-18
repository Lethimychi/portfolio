"use client";

import { Award } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { Reveal } from "@/components/shared/reveal";
import { CompanyMark } from "@/components/shared/company-mark";
import { education, awards } from "@/data/certifications";
import { handleSpotlightMove } from "@/lib/spotlight";
import { HiddenBug } from "@/components/bug-hunt/bug-hunt";

export function Certifications() {
  return (
    <section id="certifications" className="relative py-10 sm:py-18">
      <HiddenBug id="honors" className="left-4 top-6 sm:left-16" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Honors & Awards"
          title="Recognition along the way"
          description="Academic honors earned alongside my QA/QC work."
        />

        <Reveal y={20} className="mt-16">
          <div
            onMouseMove={handleSpotlightMove}
            className="spotlight glass card-shadow relative flex flex-col gap-5 rounded-2xl p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8"
          >
            <CompanyMark company={education.institution} logoUrl={education.logoUrl} size={64} />
            <div className="flex-1">
              <h3 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
                {education.institution}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {education.degree} &middot; {education.period}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {[education.classification, education.gpa, education.researchTopic, education.language].map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <StaggerGroup className="mt-6 grid gap-5 sm:grid-cols-3">
          {awards.map((honor) => (
            <StaggerItem key={honor.id}>
              <div
                onMouseMove={handleSpotlightMove}
                className="spotlight glass card-shadow relative flex h-full flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold leading-snug text-foreground">
                  {honor.name}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {honor.issuer} &middot; {honor.date}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {honor.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {skill}
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
