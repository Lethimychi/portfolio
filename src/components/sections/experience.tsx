"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { CompanyMark } from "@/components/shared/company-mark";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";
import { handleSpotlightMove } from "@/lib/spotlight";
import { HiddenBug } from "@/components/bug-hunt/bug-hunt";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"],
  });

  return (
    <section id="experience" className="relative py-10 sm:py-18">
      <HiddenBug id="experience" className="right-4 top-10 sm:right-14" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've put quality into practice"
          description="A timeline of roles where I've owned test strategy, automation, and release confidence."
        />

        <div ref={containerRef} className="relative mt-16">
          <div className="absolute left-[19px] top-0 h-full w-px bg-white/8 sm:left-1/2 sm:-translate-x-1/2" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-[19px] top-0 h-full w-px origin-top bg-gradient-to-b from-primary via-secondary to-accent sm:left-1/2 sm:-translate-x-1/2"
          />

          <div className="space-y-10 sm:space-y-16">
            {experience.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.id} className="relative">
                  <TimelineDot />
                  <div className="ml-12 sm:ml-0 sm:flex sm:items-start sm:justify-between">
                    <Reveal
                      y={12}
                      x={isEven ? 40 : -40}
                      className={cn(
                        "mb-4 sm:mb-0 sm:w-[calc(50%-2.5rem)] sm:pt-6",
                        isEven ? "sm:order-2" : "sm:order-1"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <CompanyMark company={item.company} logoUrl={item.logoUrl} size={56} />
                        <span className="font-heading text-sm font-semibold leading-snug text-foreground">
                          {item.company}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge variant="secondary" className="h-auto bg-primary/10 py-1 text-sm text-primary">
                          {item.period}
                        </Badge>
                        <Badge variant="outline" className="h-auto border-white/10 py-1 text-sm text-muted-foreground">
                          {item.type}
                        </Badge>
                      </div>
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 shrink-0" /> {item.location}
                        </span>
                      </div>
                    </Reveal>

                    <Reveal
                      y={16}
                      x={isEven ? -40 : 40}
                      className={cn("sm:w-[calc(50%-2.5rem)]", isEven ? "sm:order-1" : "sm:order-2")}
                    >
                      <div
                        onMouseMove={handleSpotlightMove}
                        className="spotlight glass card-shadow relative rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7"
                      >
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          {item.role}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>

                        <ul className="mt-4 space-y-2">
                          {item.highlights.map((point) => (
                            <li key={point} className="flex gap-2 text-sm text-muted-foreground">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-secondary" />
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {item.tech.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineDot() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glow-primary absolute left-2.5 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-primary/40 bg-card sm:left-1/2 sm:-translate-x-1/2"
    >
      <span className="h-2 w-2 rounded-full bg-primary" />
    </motion.div>
  );
}
