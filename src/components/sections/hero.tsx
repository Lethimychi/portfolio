"use client";

import type { ComponentType, ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, MapPin, Smartphone, Sparkles, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/shared/magnetic";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { CareerTerminal } from "@/components/shared/career-terminal";
import { useTypingEffect } from "@/hooks/use-typing-effect";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { HiddenBug } from "@/components/bug-hunt/bug-hunt";

const ROLES = ["Software Testing Engineer", "QA/QC Engineer", "Manual & API Tester", "Playwright Automation", "SQL Data Validator"];

const HERO_HIGHLIGHTS: {
  id: string;
  icon: ComponentType<{ className?: string }>;
  accent: string;
  label: string;
  value: string;
  position: string;
  rotate: number;
}[] = [
  { id: "cross-platform", icon: Smartphone, accent: "text-success", label: "Cross-Platform", value: "Web, iOS & Android", position: "-top-2 -left-4", rotate: -3 },
  { id: "automation", icon: Sparkles, accent: "text-accent", label: "Automation", value: "Playwright (TypeScript)", position: "-bottom-2 -right-4", rotate: 2 },
];

export function Hero() {
  const typedRole = useTypingEffect(ROLES, { typingSpeed: 60, deletingSpeed: 32, pauseDuration: 1600 });

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16">
      <HiddenBug id="hero" className="bottom-28 right-6 sm:right-[12%]" />
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              {profile.availability}
            </div>
            <div className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-4xl font-semibold leading-[1.1] text-foreground sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m <span className="text-gradient-animated">{profile.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 flex h-9 items-center gap-2 font-mono text-lg text-secondary sm:text-xl"
          >
            <Terminal className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            <span>{typedRole}</span>
            <span className="animate-blink inline-block h-5 w-[2px] bg-secondary" aria-hidden />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-xl text-balance text-base text-muted-foreground sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Button
                size="lg"
                className="glow-primary group"
                nativeButton={false}
                render={<a href="#projects" />}
              >
                View Projects
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                size="lg"
                variant="outline"
                className="glass border-white/10"
                nativeButton={false}
                render={<a href={profile.resumeUrl} download />}
              >
                Download Resume
                <Download className="h-4 w-4" />
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-14 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {profile.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative hidden h-[460px] lg:block">
          {HERO_HIGHLIGHTS.map((item, index) => (
            <div
              key={item.id}
              aria-hidden
              className={cn("absolute z-10", item.position)}
              style={{ transform: `rotate(${item.rotate}deg)` }}
            >
              <FloatingCard
                delay={index * 0.6}
                icon={<item.icon className={cn("h-4.5 w-4.5", item.accent)} />}
                label={item.label}
                value={item.value}
              />
            </div>
          ))}

          <CareerTerminal className="absolute inset-x-6 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-8 w-5 items-start justify-center rounded-full border border-white/15 p-1"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function FloatingCard({
  delay,
  icon,
  label,
  value,
}: {
  delay: number;
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="animate-float glass card-shadow flex w-52 items-center gap-2.5 rounded-2xl p-3"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/5">{icon}</div>
      <div className="min-w-0">
        <p className="text-[11px] leading-snug text-muted-foreground">{label}</p>
        <p className="text-xs font-medium leading-snug text-foreground">{value}</p>
      </div>
    </motion.div>
  );
}
