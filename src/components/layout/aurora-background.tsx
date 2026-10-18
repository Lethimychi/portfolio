import { Parallax } from "@/components/shared/parallax";

export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
      <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <Parallax scope="page" speed={0.12} className="absolute inset-0">
        <div className="animate-aurora absolute left-1/2 top-[-10%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]" />
      </Parallax>
      <Parallax scope="page" speed={-0.18} className="absolute inset-0">
        <div
          className="animate-aurora absolute right-[-10%] top-[10%] h-[420px] w-[600px] rounded-full bg-accent/20 blur-[130px]"
          style={{ animationDelay: "-6s" }}
        />
      </Parallax>
      <Parallax scope="page" speed={0.25} className="absolute inset-0">
        <div
          className="animate-aurora absolute bottom-[-15%] left-[-5%] h-[460px] w-[620px] rounded-full bg-secondary/15 blur-[130px]"
          style={{ animationDelay: "-11s" }}
        />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}
