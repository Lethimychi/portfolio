"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { testSuites } from "@/data/metrics";
import { cn } from "@/lib/utils";

const STEP_MS = 600;

// Plays the CV back as a test run: each project resolves as a passing suite.
export function CareerTerminal({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  // 0 = command typed, 1..n = suites resolved, n+1 = summary shown
  const [step, setStep] = useState(0);
  const finalStep = testSuites.length + 1;

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setStep(finalStep);
      return;
    }
    if (step >= finalStep) return;
    const timer = setTimeout(() => setStep((s) => s + 1), step === 0 ? 1100 : STEP_MS);
    return () => clearTimeout(timer);
  }, [inView, reduceMotion, step, finalStep]);

  const done = step >= finalStep;

  return (
    <div ref={ref} className={cn("glass card-shadow overflow-hidden rounded-3xl", className)}>
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.02] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        <span className="ml-2 font-mono text-[11px] text-muted-foreground/80">~/career — zsh</span>
      </div>

      <div className="space-y-1.5 p-5 font-mono text-xs leading-relaxed">
        <p className="text-muted-foreground">
          <span className="text-success">➜</span> <span className="text-foreground">npx playwright test --project=my-chi</span>
        </p>
        <p className="pb-2 text-muted-foreground/70">Running {testSuites.length} suites — one per project</p>

        {testSuites.map((suite, i) => {
          const state = step > i + 1 ? "passed" : step === i + 1 ? "running" : "pending";
          if (state === "pending") return null;
          return (
            <motion.div
              key={suite.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-baseline gap-2.5"
            >
              {state === "running" ? (
                <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin self-center text-warning" />
              ) : (
                <Check className="h-3.5 w-3.5 shrink-0 self-center text-success" />
              )}
              <span className="truncate text-foreground">{suite.name}</span>
              <span className="ml-auto shrink-0 text-muted-foreground/70">{suite.domain}</span>
            </motion.div>
          );
        })}

        {done ? (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 border-t border-white/8 pt-3 text-success"
          >
            {testSuites.length} passed <span className="text-muted-foreground/70">· 0 failed · 0 flaky</span>
          </motion.p>
        ) : (
          <p className="pt-1">
            <span className="animate-blink inline-block h-4 w-[7px] translate-y-0.5 bg-secondary" aria-hidden />
          </p>
        )}
      </div>
    </div>
  );
}
