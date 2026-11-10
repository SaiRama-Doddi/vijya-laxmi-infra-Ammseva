import { useEffect } from "react";
import { ProjectCards, SectionTitle } from "@/components/site";

export default function Projects() {
  useEffect(() => {
    document.title = "Project Experience — Vijaya Lakshmi Infra";
  }, []);

  const milestones = [
    ["2014", "Enterprise established with initial regional electrical contracts"],
    ["2019", "Executed milestone NH-227 road-widening utility corridor subcontract"],
    ["2021", "Expanded into major Expressways (Bangalore–Chennai Expressway) and NH-45A"],
    ["2022–2026", "Key partner for TANGEDCO RDSS feeder segregation and multi-lane highway EPC works"],
  ] as const;

  const clients = [
    { name: "TANGEDCO", role: "RDSS Agri Feeder Schemes", state: "Tamil Nadu" },
    { name: "DILIP BUILDCON LTD", role: "NH-332 Packages I & II", state: "Madhya Pradesh / TN" },
    { name: "EKK INFRASTRUCTURE", role: "NH-205 & NH-716B Corridors", state: "Kerala / TN" },
    { name: "SRR PROJECTS", role: "NH-227 Road Widening", state: "Tamil Nadu" },
    { name: "RCCL SRIKANCHE", role: "Bangalore–Chennai Expressway", state: "Tamil Nadu" },
    { name: "RR INFRA", role: "CPRR Six-Lane Expressway", state: "Tamil Nadu" },
    { name: "P & C PROJECTS", role: "NH-48 Four-Laning Package", state: "Tamil Nadu" },
    { name: "NHAI CORRIDORS", role: "National Highway Networks", state: "Pan-South India" },
  ] as const;

  return (
    <>
      {/* Featured Projects Grid */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* Executive Header Banner matching user specification */}
          <div className="mb-10 text-left">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-primary mb-3">
              PROJECT EXPERIENCE
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy tracking-tight max-w-4xl leading-tight">
              Selected Highway Utility Shifting, HT/LT Line Works & Rural Feeder Segregation Projects
            </h1>
            <p className="mt-3.5 max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed text-justify">
              Demonstrated engineering execution across 10 major high-capacity national highway corridors,
              expressways, and government-tendered RDSS rural electrification contracts.
            </p>
          </div>

          <ProjectCards showFilters={true} />
        </div>
      </section>

      {/* Milestones */}
      <section className="section-pad bg-navy">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="2014–2026 Timeline"
            title="A proven track record built milestone by milestone"
            copy="Consistent growth in contract scale, technical capability, and client trust across southern India."
            light
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map(([year, desc], idx) => (
              <article
                className={`flex flex-col justify-between border-l-2 border-gold pl-4 py-1.5 ${
                  idx % 2 === 0 ? "reveal-left" : "reveal-right"
                }`}
                key={year}
              >
                <div>
                  <strong className="font-numbers text-2xl sm:text-3xl text-primary-foreground font-extrabold">
                    {year}
                  </strong>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-primary-foreground/75 text-justify">
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
        <div className="mx-auto max-w-7xl px-5 text-left lg:px-8">
          <SectionTitle
            eyebrow="Project Ecosystem & Clients"
            title="Trusted by India's Top EPC & Power Authorities"
            copy="Delivering reliable subcontract execution in partnership with state distribution corporations, national highway authorities, and Tier-1 infrastructure firms."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mt-6">
            {clients.map((c, idx) => (
              <div
                className={`flex flex-col justify-center rounded-xl border border-border bg-card p-5 text-center shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/50 ${
                  idx % 4 === 0
                    ? "reveal-left"
                    : idx % 4 === 1
                    ? "reveal-up"
                    : idx % 4 === 2
                    ? "reveal-down"
                    : "reveal-right"
                }`}
                key={c.name}
              >
                <span className="font-display text-sm font-extrabold tracking-wide text-navy">
                  {c.name}
                </span>
                <span className="mt-1 text-xs font-semibold text-primary">{c.role}</span>
                <span className="mt-0.5 text-[11px] text-muted-foreground">{c.state}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
