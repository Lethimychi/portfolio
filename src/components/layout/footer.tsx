import { Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";

export function Footer() {
  const year = 2026;

  return (
    <footer className="relative z-10 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="font-heading text-sm font-semibold text-foreground">{profile.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{profile.role} — {profile.location}</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="glass flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={profile.social.email}
              aria-label="Email"
              className="glass flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground/70">
          © {year} {profile.name}. Built with Next.js, Tailwind CSS &amp; Framer Motion.
        </p>
      </div>
    </footer>
  );
}
