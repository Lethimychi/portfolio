import Image from "next/image";
import { cn } from "@/lib/utils";

const ACCENTS = ["--color-primary", "--color-secondary", "--color-accent"];

function getInitials(company: string) {
  const words = company.split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

function getAccent(company: string) {
  const hash = company.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return ACCENTS[hash % ACCENTS.length];
}

type CompanyMarkProps = {
  company: string;
  logoUrl?: string;
  size?: number;
  className?: string;
};

export function CompanyMark({ company, logoUrl, size = 40, className }: CompanyMarkProps) {
  if (logoUrl) {
    return (
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.25)] ring-1 ring-white/15",
          className
        )}
        style={{ width: size, height: size }}
      >
        <Image
          src={logoUrl}
          alt={`${company} logo`}
          fill
          sizes={`${size}px`}
          className="object-contain"
          style={{ padding: size * 0.08 }}
        />
      </div>
    );
  }

  const accent = getAccent(company);

  return (
    <div
      className={cn("flex shrink-0 items-center justify-center rounded-full border", className)}
      style={{
        width: size,
        height: size,
        borderColor: `color-mix(in srgb, var(${accent}) 30%, transparent)`,
        backgroundColor: `color-mix(in srgb, var(${accent}) 12%, transparent)`,
      }}
      aria-hidden
    >
      <span className="font-heading font-semibold" style={{ color: `var(${accent})`, fontSize: size * 0.36 }}>
        {getInitials(company)}
      </span>
    </div>
  );
}
