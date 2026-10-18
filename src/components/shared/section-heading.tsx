import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <div className={cn("flex items-center gap-2", align === "center" && "justify-center")}>
        <span className="h-px w-6 bg-gradient-to-r from-primary to-transparent" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{eyebrow}</span>
        <span className="h-px w-6 bg-gradient-to-l from-primary to-transparent" />
      </div>
      <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-balance text-muted-foreground">{description}</p>}
    </Reveal>
  );
}
