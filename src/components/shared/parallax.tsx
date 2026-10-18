"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ParallaxProps = {
  children: ReactNode;
  speed?: number;
  className?: string;
  /** "self" ties motion to this element's own entry/exit; "page" ties it to whole-document scroll (for fixed backgrounds). */
  scope?: "self" | "page";
};

export function Parallax({ children, speed = 0.15, className, scope = "self" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger:
          scope === "page"
            ? {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.6,
              }
            : {
                trigger: el.parentElement ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
      });
    });

    return () => ctx.revert();
  }, [speed, scope]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
