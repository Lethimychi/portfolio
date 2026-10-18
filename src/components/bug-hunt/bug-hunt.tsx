"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bug, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const BUG_IDS = ["hero", "skills", "experience", "projects", "honors"] as const;
export type BugId = (typeof BUG_IDS)[number];

const STORAGE_KEY = "bug-hunt:found";

type BugHuntContextValue = {
  found: BugId[];
  total: number;
  isFound: (id: BugId) => boolean;
  report: (id: BugId) => void;
  reset: () => void;
};

const BugHuntContext = createContext<BugHuntContextValue | null>(null);

function readStored(): BugId[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is BugId => BUG_IDS.includes(id)) : [];
  } catch {
    return [];
  }
}

export function BugHuntProvider({ children }: { children: ReactNode }) {
  const [found, setFound] = useState<BugId[]>([]);

  useEffect(() => {
    setFound(readStored());
  }, []);

  const persist = useCallback((next: BugId[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage can be unavailable (private mode) — the hunt still works for this visit.
    }
  }, []);

  const report = useCallback(
    (id: BugId) => {
      setFound((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const reset = useCallback(() => {
    setFound([]);
    persist([]);
  }, [persist]);

  const value = useMemo<BugHuntContextValue>(
    () => ({ found, total: BUG_IDS.length, isFound: (id) => found.includes(id), report, reset }),
    [found, report, reset]
  );

  return <BugHuntContext.Provider value={value}>{children}</BugHuntContext.Provider>;
}

export function useBugHunt() {
  const ctx = useContext(BugHuntContext);
  if (!ctx) throw new Error("useBugHunt must be used inside <BugHuntProvider>");
  return ctx;
}

export function HiddenBug({ id, className }: { id: BugId; className?: string }) {
  const { isFound, report } = useBugHunt();
  const reduceMotion = useReducedMotion();
  const [justReported, setJustReported] = useState(false);
  const found = isFound(id);
  const ticket = `BUG-${String(BUG_IDS.indexOf(id) + 1).padStart(2, "0")}`;

  useEffect(() => {
    if (!justReported) return;
    const timer = setTimeout(() => setJustReported(false), 1800);
    return () => clearTimeout(timer);
  }, [justReported]);

  return (
    <div className={cn("absolute z-20", className)}>
      <motion.button
        type="button"
        disabled={found}
        onClick={() => {
          report(id);
          setJustReported(true);
        }}
        aria-label={found ? `${ticket} already reported` : "You spotted a hidden bug — click to report it"}
        title={found ? `${ticket} · fixed` : undefined}
        whileHover={reduceMotion || found ? undefined : { rotate: [0, -14, 12, -8, 0], scale: 1.25 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
          found
            ? "cursor-default text-success/50"
            : "cursor-pointer text-muted-foreground/35 hover:bg-danger/10 hover:text-danger focus-visible:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/40"
        )}
      >
        {found ? <Check className="h-4 w-4" /> : <Bug className="h-4 w-4" />}
      </motion.button>

      <AnimatePresence>
        {justReported && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: -6, scale: 1 }}
            exit={{ opacity: 0, y: -14 }}
            className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-success/30 bg-background/90 px-2.5 py-1 font-mono text-[11px] text-success shadow-lg"
          >
            {ticket} reported ✓
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
