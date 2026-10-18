import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { achievements } from "@/data/achievements";

export function Achievements() {
  return (
    <section id="achievements" className="relative py-10 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Achievements"
          title="Milestones along the way"
          description="Recognition earned through consistent, measurable contributions to product quality."
        />

        <StaggerGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item) => (
            <StaggerItem key={item.id}>
              <div className="glass card-shadow group relative h-full overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                {item.metric && (
                  <span className="absolute -right-2 -top-2 font-heading text-6xl font-bold text-white/[0.03]">
                    {item.metric}
                  </span>
                )}
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="relative mt-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">
                  {item.year}
                </p>
                <h3 className="relative mt-1.5 font-heading text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
