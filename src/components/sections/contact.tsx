"use client";

import { useState, type ComponentType, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { LinkedinIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { Magnetic } from "@/components/shared/magnetic";
import { profile } from "@/data/profile";
import { handleSpotlightMove } from "@/lib/spotlight";

type IconComponent = ComponentType<{ className?: string }>;

const CONTACT_METHODS: {
  icon: IconComponent;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}[] = [
  { icon: Mail, label: "Email", value: profile.email, href: profile.social.email },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}` },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: profile.social.linkedin.replace(/^https?:\/\//, ""),
    href: profile.social.linkedin,
    external: true,
  },
  { icon: MapPin, label: "Location", value: profile.location, href: undefined },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-10 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build reliable software together"
          description="Open to QA/QC, software testing, and test automation roles."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <StaggerGroup className="space-y-4">
            {CONTACT_METHODS.map((method) => (
              <StaggerItem key={method.label}>
                {method.href ? (
                  <a
                    href={method.href}
                    target={method.external ? "_blank" : undefined}
                    rel={method.external ? "noopener noreferrer" : undefined}
                    onMouseMove={handleSpotlightMove}
                    className="spotlight glass card-shadow relative flex items-center gap-4 rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <ContactIcon icon={method.icon} />
                    <div>
                      <p className="text-xs text-muted-foreground">{method.label}</p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">{method.value}</p>
                    </div>
                  </a>
                ) : (
                  <div
                    onMouseMove={handleSpotlightMove}
                    className="spotlight glass card-shadow relative flex items-center gap-4 rounded-2xl p-5"
                  >
                    <ContactIcon icon={method.icon} />
                    <div>
                      <p className="text-xs text-muted-foreground">{method.label}</p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">{method.value}</p>
                    </div>
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.15}>
            <div className="glass card-shadow glow-primary flex h-full flex-col justify-center gap-8 rounded-3xl p-8 sm:p-10">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">
                  Usually replies within a day
                </p>
                <h3 className="mt-3 text-balance font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                  Looking for a QA engineer to join your team?
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Whether it&apos;s a job opportunity, an interview invitation, or feedback on this
                  portfolio — send a message and it lands straight in my inbox.
                </p>
              </div>

              <div>
                <ContactDialog />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactIcon({ icon: Icon }: { icon: IconComponent }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
      <Icon className="h-5 w-5" />
    </div>
  );
}

const MESSAGE_TOPICS = ["Job Opportunity", "Interview Invitation", "Portfolio Feedback", "Other"] as const;

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const FIELD_CLASS =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20";

type SendStatus = "idle" | "sending" | "sent" | "error";

function ContactDialog() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<SendStatus>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Honeypot: real visitors never see or tick this field.
    if (formData.get("botcheck")) return;

    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const company = formData.get("company")?.toString().trim() ?? "";
    const topic = formData.get("topic")?.toString() ?? "Other";
    const message = formData.get("message")?.toString().trim() ?? "";

    if (!WEB3FORMS_KEY) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[Portfolio] ${topic} — ${name}${company ? ` (${company})` : ""}`,
          from_name: "Portfolio Contact Form",
          replyto: email,
          name,
          email,
          company: company || "—",
          topic,
          message,
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      setStatus(res.ok && data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setStatus("idle");
      }}
    >
      <Magnetic>
        <DialogTrigger render={<Button size="lg" className="w-full glow-primary" />}>
          Send a Message
          <Send className="h-4 w-4" />
        </DialogTrigger>
      </Magnetic>
      <DialogContent className="glass-strong border-white/10 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send a message</DialogTitle>
          <DialogDescription>
            Your message goes straight to {profile.name}&apos;s inbox — no email app needed.
          </DialogDescription>
        </DialogHeader>

        {status === "sent" ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <p className="font-medium text-foreground">Message sent — thank you!</p>
            <p className="text-sm text-muted-foreground">I&apos;ll get back to you within a day.</p>
            <Button variant="outline" className="mt-2" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-xs text-muted-foreground">
                  Name
                </label>
                <input id="contact-name" name="name" required type="text" placeholder="Your name" className={FIELD_CLASS} />
              </div>
              <div>
                <label htmlFor="contact-company" className="mb-1.5 block text-xs text-muted-foreground">
                  Company <span className="text-muted-foreground/60">(optional)</span>
                </label>
                <input id="contact-company" name="company" type="text" placeholder="Company name" className={FIELD_CLASS} />
              </div>
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-xs text-muted-foreground">
                Email
              </label>
              <input id="contact-email" name="email" required type="email" placeholder="you@company.com" className={FIELD_CLASS} />
            </div>
            <fieldset>
              <legend className="mb-1.5 block text-xs text-muted-foreground">Topic</legend>
              <div className="flex flex-wrap gap-2">
                {MESSAGE_TOPICS.map((topic, i) => (
                  <label key={topic} className="cursor-pointer">
                    <input type="radio" name="topic" value={topic} defaultChecked={i === 0} className="peer sr-only" />
                    <span className="block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground transition-colors peer-checked:border-primary/50 peer-checked:bg-primary/15 peer-checked:text-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30">
                      {topic}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-xs text-muted-foreground">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                placeholder="Tell me about the role, the interview, or your feedback..."
                className={`${FIELD_CLASS} resize-none`}
              />
            </div>

            {status === "error" && (
              <p role="alert" className="flex items-start gap-2 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2.5 text-xs text-danger">
                <AlertCircle className="mt-px h-4 w-4 shrink-0" />
                <span>
                  Something went wrong sending your message. Please email me directly at{" "}
                  <a href={profile.social.email} className="underline underline-offset-2">
                    {profile.email}
                  </a>
                  .
                </span>
              </p>
            )}

            <Button type="submit" disabled={status === "sending"} className="w-full glow-primary">
              {status === "sending" ? (
                <>
                  Sending...
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Send Message
                  <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
