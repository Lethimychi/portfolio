"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bug, PartyPopper, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUG_IDS, useBugHunt } from "@/components/bug-hunt/bug-hunt";
import { cn } from "@/lib/utils";

export function BugHuntHud() {
  const { found, total, reset } = useBugHunt();
  const [open, setOpen] = useState(false);
  const complete = found.length === total;
  const prevCount = useRef(found.length);

  // Pop the panel open the moment the last bug is reported.
  useEffect(() => {
    if (found.length === total && prevCount.current < total) setOpen(true);
    prevCount.current = found.length;
  }, [found.length, total]);

  return (
    <div className="fixed bottom-6 left-4 z-40 md:bottom-8 md:left-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="glass-strong card-shadow absolute bottom-full left-0 mb-3 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-white/10 p-5"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close bug hunt panel"
              className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            {complete ? (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
                  <PartyPopper className="h-5 w-5" />
                </div>
                <p className="mt-3 font-heading text-base font-semibold text-foreground">
                  All {total} bugs reported!
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  You&apos;ve clearly got a tester&apos;s eye. If you&apos;re hiring someone who notices the details,
                  I&apos;d love to talk.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <Button
                    size="sm"
                    className="glow-primary"
                    nativeButton={false}
                    render={<a href="#contact" onClick={() => setOpen(false)} />}
                  >
                    Get in touch <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={reset}>
                    <RotateCcw className="h-3.5 w-3.5" /> Play again
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="font-mono text-[11px] uppercase tracking-wider text-secondary">Bug Hunt</p>
                <p className="mt-2 font-heading text-base font-semibold text-foreground">
                  {total} bugs are hiding on this page
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Testers find what others miss. Spot a faint <Bug className="inline h-3.5 w-3.5 align-[-2px]" />{" "}
                  while you scroll and click it to file a report.
                </p>
              </>
            )}

            <div className="mt-4 flex gap-1.5" aria-hidden>
              {BUG_IDS.map((id) => (
                <span
                  key={id}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-colors",
                    found.includes(id) ? "bg-success" : "bg-white/10"
                  )}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          "glass flex items-center gap-2 rounded-full px-3.5 py-2 font-mono text-xs shadow-lg transition-colors",
          complete ? "text-success" : "text-muted-foreground hover:text-foreground"
        )}
      >
        <span className="relative flex">
          <Bug className="h-4 w-4" />
          {found.length === 0 && (
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 animate-ping rounded-full bg-danger" />
          )}
        </span>
        <span>
          <span className="hidden sm:inline">Bug hunt </span>
          {found.length}/{total}
        </span>
      </button>
    </div>
  );
}
