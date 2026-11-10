import { useEffect } from "react";
import {
  Award,
  Building2,
  CheckCircle2,
  Eye,
  Handshake,
  Leaf,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import {
  AnimatedCounter,
  FeatureGrid,
  SectionTitle,
  images,
} from "@/components/site";

export default function About() {
  useEffect(() => {
    document.title = "About Us — Vijaya Lakshmi Infra";
  }, []);

  const values = [
    [ShieldCheck, "Safety First", "Zero compromise on field safety protocols and risk mitigation."],
    [
      Handshake,
      "Integrity",
      "Transparent operations, statutory compliance, and ethical contracting.",
    ],
    [
      Award,
      "Engineering Excellence",
      "High technical precision from design calculations to live commissioning.",
    ],
    [
      Lightbulb,
      "Innovation",
      "Modern methodologies, compact tower designs, and efficient cable corridors.",
    ],
    [
      Eye,
      "Reliability",
      "Building resilient grid and civil assets engineered for decades of service.",
    ],
    [
      Leaf,
      "Sustainability",
      "Minimizing environmental disruption during right-of-way and utility works.",
    ],
  ] as const;

  const journey = [
    {
      year: "2014",
      tag: "Foundation",
      title: "Vijaya Lakshmi Enterprises",
      desc: "Specialized electrical contracting in transmission & distribution networks.",
      icon: Sparkles,
    },
    {
      year: "2021",
      tag: "Expansion",
      title: "Vijaya Lakshmi Infra",
      desc: "Expanded into 33/11kV substations, utility shifting, and civil infrastructure.",
      icon: Building2,
    },
    {
      year: "Today",
      tag: "Excellence",
      title: "Pan-India Delivery",
      desc: "Trusted delivery of mission-critical electrical and civil EPC projects across India.",
      icon: CheckCircle2,
    },
  ] as const;

  return (
    <>
      {/* Our Journey */}
      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="Our journey"
            title="Built on field experience. Driven by engineering."
            copy="Over a decade of progressive capability expansion, engineering milestones, and dedicated client service."
          />
          <div className="relative mt-6 sm:mt-8 grid max-w-6xl gap-5 sm:gap-6 md:grid-cols-3">
            {journey.map((item, idx) => (
              <article
                key={item.year}
                className={`group relative flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-slate-200/90 bg-card p-6 sm:p-7 shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-premium ${
                  idx % 3 === 0 ? "reveal-left" : idx % 3 === 1 ? "reveal-up" : "reveal-right"
                }`}
              >
                <span className="pointer-events-none absolute -right-3 -top-3 select-none font-numbers text-6xl sm:text-7xl font-black text-slate-100 transition-colors duration-500 group-hover:text-primary/10">
                  {item.year === "Today" ? "★" : item.year}
                </span>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <item.icon className="h-3.5 w-3.5" />
                      {item.tag}
                    </span>
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-background bg-destructive"></span>
                    </span>
                  </div>
                  <div className="mt-4 sm:mt-5">
                    <strong className="font-numbers text-3xl font-extrabold text-primary transition-colors group-hover:text-navy sm:text-4xl">
                      <AnimatedCounter value={item.year} />
                    </strong>
                    <h3 className="mt-1.5 font-display text-base sm:text-lg font-bold text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground text-justify">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className="relative z-10 mt-4 pt-3">
                  <div className="h-1.5 w-10 rounded-full bg-slate-200 transition-all duration-500 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-gold"></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section-pad bg-primary-soft">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12 px-5 lg:px-8">
          <img
            src={images.substationImage}
            alt="Electrical substation infrastructure"
            className="h-[380px] sm:h-[440px] w-full rounded-card object-cover shadow-premium reveal-left"
          />
          <div className="flex flex-col items-start justify-center reveal-right">
            <SectionTitle
              eyebrow="Company overview"
              title="Engineering capability that moves India forward"
              copy="Established in 2014 as Vijaya Lakshmi Enterprises, our journey began as a specialized electrical contracting firm. Over the years, we expanded our expertise and rebranded as Vijaya Lakshmi Infra in 2021. Today, we stand as a premier infrastructure development company, delivering comprehensive electrical, civil, and engineering solutions for critical infrastructure projects across India."
            />
            <p className="mt-3 leading-relaxed text-sm sm:text-base text-muted-foreground text-justify">
              We specialize in design, erection, shifting, and commissioning of High-Tension (HT) & Low-Tension (LT)
              power lines, substations, distribution transformer structures, and mini towers. Our holistic approach
              ensures seamless coordination with government agencies, utility providers, and private clients,
              offering innovative load-sharing and engineering solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-pad overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="Core values"
            title="Principles engineered into every project"
            copy="Our operational values guide how we work on site, collaborate with clients, and safeguard our workforce."
          />
          <FeatureGrid items={values} />
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            <article className="group flex flex-col justify-between h-full rounded-card border border-border bg-card p-6 sm:p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-premium reveal-left">
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Eye className="h-6 w-6" />
                </span>
                <h2 className="mt-5 font-display text-xl sm:text-2xl font-bold text-navy">
                  Our Vision
                </h2>
                <p className="mt-3 leading-relaxed text-sm sm:text-base text-muted-foreground text-justify">
                  To be a trusted leader in infrastructure development, consistently exceeding
                  client expectations through excellence in engineering, safety, and service
                  quality.
                </p>
              </div>
            </article>
            <article className="group flex flex-col justify-between h-full rounded-card border border-border bg-card p-6 sm:p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-premium reveal-right">
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-destructive/10 text-destructive transition group-hover:bg-destructive group-hover:text-destructive-foreground">
                  <Target className="h-6 w-6" />
                </span>
                <h2 className="mt-5 font-display text-xl sm:text-2xl font-bold text-navy">
                  Our Mission
                </h2>
                <p className="mt-3 leading-relaxed text-sm sm:text-base text-muted-foreground text-justify">
                  To deliver high-quality infrastructure projects safely and on time, adhering to
                  the highest industry standards while building long-term relationships based on
                  trust, performance, and reliability.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="Leadership"
            title="Accountable leadership. Grounded execution."
            copy="Guiding every infrastructure undertaking with deep domain expertise and direct on-site accountability."
          />
          <article className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-primary-soft/30 to-white p-5 sm:p-8 lg:p-12 shadow-card transition-all duration-500 hover:border-primary/40 hover:shadow-premium reveal-up">
            {/* Ambient background decoration */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
            <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

            <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 md:flex-row md:items-center lg:gap-12 xl:gap-14">
              {/* Round Executive Avatar with Effects */}
              <div className="relative shrink-0 my-2 sm:my-3">
                {/* Soft ambient aura / glow behind avatar */}
                <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-primary/30 via-gold/20 to-navy/30 blur-xl opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105" />

                {/* Multi-layer luxury gradient ring */}
                <div className="relative h-52 w-52 sm:h-60 sm:w-60 md:h-64 md:w-64 lg:h-72 lg:w-72 rounded-full p-[5px] bg-gradient-to-tr from-primary via-navy to-gold shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20">
                  <div className="h-full w-full rounded-full bg-white p-[3px] shadow-inner">
                    <div className="relative h-full w-full overflow-hidden rounded-full bg-slate-50 ring-1 ring-slate-200">
                      <img
                        src={images.anuraagImage}
                        alt="Anuraag Cherukuri - Founder and Managing Director"
                        className="h-full w-full object-cover object-[center_18%] scale-105 transition-transform duration-500 ease-out group-hover:scale-115"
                      />
                      {/* Subtle lighting reflection */}
                      <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-navy/30 via-transparent to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-20" />
                    </div>
                  </div>
                </div>

                {/* Floating Centered Executive Badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 whitespace-nowrap rounded-full border-2 border-white bg-navy px-3.5 py-1.5 sm:px-4 text-xs font-bold text-white shadow-lg backdrop-blur transition-all duration-300 group-hover:scale-105 group-hover:bg-primary">
                  <ShieldCheck className="h-4 w-4 text-gold" />
                  <span className="tracking-wide">Founder & MD</span>
                </div>
              </div>

              {/* Bio & Leadership Information */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[.18em] text-primary">
                  <Award className="h-3.5 w-3.5 text-gold" />
                  Founder & Managing Director
                </div>
                <h3 className="mt-3 font-display text-2xl font-black text-navy sm:text-3xl lg:text-4xl">
                  Anuraag Cherukuri
                </h3>
                <p className="mt-3.5 leading-relaxed text-sm sm:text-base text-muted-foreground text-justify">
                  Leading Vijaya Lakshmi Infra with a hands-on commitment to technical quality,
                  uncompromising project safety, and long-term relationships with government bodies
                  and infrastructure developers. Under his leadership, the organization has
                  successfully delivered landmark high-voltage transmission, substations, and
                  critical highway utility corridors across India.
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 pt-4 sm:pt-5 border-t border-slate-200/80 text-xs">
                  <div className="rounded-xl bg-white/90 p-3 sm:p-3.5 border border-slate-100 shadow-xs text-left">
                    <span className="text-slate-500 font-semibold block text-[11px] uppercase tracking-wider">Designation</span>
                    <span className="font-bold text-navy text-xs sm:text-sm">Founder & MD</span>
                  </div>
                  <div className="rounded-xl bg-white/90 p-3 sm:p-3.5 border border-slate-100 shadow-xs text-left">
                    <span className="text-slate-500 font-semibold block text-[11px] uppercase tracking-wider">Company</span>
                    <span className="font-bold text-navy text-xs sm:text-sm">Vijaya Lakshmi Infra</span>
                  </div>
                  <div className="rounded-xl bg-white/90 p-3 sm:p-3.5 border border-slate-100 shadow-xs text-left">
                    <span className="text-slate-500 font-semibold block text-[11px] uppercase tracking-wider">Leadership</span>
                    <span className="font-bold text-navy text-xs sm:text-sm">Since 2014</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
