import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ProjectCards, SectionTitle, images } from "@/components/site";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Infrastructure Projects — Vijaya Lakshmi Infra" },
      {
        name: "description",
        content: "Power and civil infrastructure projects delivered with engineering precision.",
      },
      { property: "og:title", content: "Projects — Vijaya Lakshmi Infra" },
      {
        property: "og:description",
        content: "Selected transmission, substation and utility shifting projects.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: Projects,
});

function Projects() {
  const milestones = [
    ["2014", "Enterprise established with initial regional electrical contracts"],
    ["2018", "Expanded high-voltage transmission and distribution portfolio"],
    ["2021", "Vijaya Lakshmi Infra launched for large-scale multi-state EPC execution"],
    ["2026", "Full pan-India turnkey capability across power & civil infrastructure"],
  ] as const;

  const clients = [
    "TSSPDCL",
    "NATIONAL HIGHWAYS",
    "STATE HIGHWAYS",
    "PRIVATE INFRASTRUCTURE",
  ] as const;

  return (
    <>
      <PageHero
        title="Projects Delivered with Engineering Precision"
        eyebrow="Projects"
        image={images.civilImage}
      />

      {/* Featured Projects Grid */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="Featured portfolio"
            title="Infrastructure that performs in the real world"
            copy="Selected assignments across high-voltage transmission lines, 33/11kV substations, underground XLPE networks, and critical highway utility realignment."
          />
          <ProjectCards />
        </div>
      </section>

      {/* Milestones */}
      <section className="section-pad bg-navy">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="2014–2026"
            title="An infrastructure journey built milestone by milestone"
            copy="Consistent track record of technical competence, client trust, and timely project handovers."
            light
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map(([year, desc]) => (
              <article
                className="flex flex-col justify-between border-l-2 border-gold pl-4 py-1.5"
                key={year}
              >
                <div>
                  <strong className="font-numbers text-2xl sm:text-3xl text-primary-foreground font-extrabold">
                    {year}
                  </strong>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-primary-foreground/75 text-justify sm:text-left">
                    {desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem & Clients */}
      <section className="section-pad bg-primary-soft">
        <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
          <SectionTitle
            eyebrow="Project ecosystem"
            title="Trusted across public and private infrastructure"
            copy="Delivering reliable execution in partnership with state discoms, highway authorities, and premier EPC contractors."
            center
          />
          <div className="grid gap-px overflow-hidden rounded-card bg-border sm:grid-cols-2 lg:grid-cols-4 shadow-card">
            {clients.map((client) => (
              <div
                className="flex h-24 sm:h-28 items-center justify-center bg-background px-5 text-center font-display text-xs sm:text-sm font-extrabold tracking-wider text-navy hover:text-primary transition-colors"
                key={client}
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
