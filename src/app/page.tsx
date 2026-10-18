import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { QAShowcase } from "@/components/sections/qa-showcase";
// import { Achievements } from "@/components/sections/achievements";
import { Certifications } from "@/components/sections/certifications";
import { Roadmap } from "@/components/sections/roadmap";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <QAShowcase />
      {/* <Achievements /> */}
      <Certifications />
      <Roadmap />
      <Contact />
    </>
  );
}
