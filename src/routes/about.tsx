import { createFileRoute } from "@tanstack/react-router";
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
  PageHero,
  SectionTitle,
  images,
} from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Vijaya Lakshmi Infra" },
      {
        name: "description",
        content: "Our journey, leadership and values in electrical and civil infrastructure.",
      },
      { property: "og:title", content: "About Vijaya Lakshmi Infra" },
      {
        property: "og:description",
        content: "Engineering reliable infrastructure across India since 2014.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
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
      <PageHero
        title="Building Reliable Infrastructure Across India"
        eyebrow="About us"
        image={images.engineersImage}
      />

      {/* Our Journey */}
      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="Our journey"
            title="Built on field experience. Driven by engineering."
            copy="Over a decade of progressive capability expansion, engineering milestones, and dedicated client service."
            center
          />
          <div className="relative mx-auto mt-6 sm:mt-8 grid max-w-6xl gap-5 sm:gap-6 md:grid-cols-3">
            {journey.map((item) => (
              <article
                key={item.year}
                className="group relative flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-slate-200/90 bg-card p-6 sm:p-7 shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-premium"
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
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground text-justify sm:text-left">
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
            className="h-[380px] sm:h-[440px] w-full rounded-card object-cover shadow-premium"
          />
          <div className="flex flex-col items-start justify-center">
            <SectionTitle
              eyebrow="Company overview"
              title="Engineering capability that moves India forward"
              copy="Established in 2014 as Vijaya Lakshmi Enterprises, our journey began as a specialized electrical contracting firm. Over the years, we expanded our expertise and rebranded as Vijaya Lakshmi Infra in 2021. Today, we stand as a premier infrastructure development company, delivering comprehensive electrical, civil, and engineering solutions for critical infrastructure projects across India."
            />
            <p className="mt-3 leading-relaxed text-sm sm:text-base text-muted-foreground text-justify sm:text-left">
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
            center
          />
          <FeatureGrid items={values} />
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            <article className="group flex flex-col justify-between h-full rounded-card border border-border bg-card p-6 sm:p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-premium">
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Eye className="h-6 w-6" />
                </span>
                <h2 className="mt-5 font-display text-xl sm:text-2xl font-bold text-navy">
                  Our Vision
                </h2>
                <p className="mt-3 leading-relaxed text-sm sm:text-base text-muted-foreground text-justify sm:text-left">
                  To be a trusted leader in infrastructure development, consistently exceeding
                  client expectations through excellence in engineering, safety, and service
                  quality.
                </p>
              </div>
            </article>
            <article className="group flex flex-col justify-between h-full rounded-card border border-border bg-card p-6 sm:p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-premium">
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-destructive/10 text-destructive transition group-hover:bg-destructive group-hover:text-destructive-foreground">
                  <Target className="h-6 w-6" />
                </span>
                <h2 className="mt-5 font-display text-xl sm:text-2xl font-bold text-navy">
                  Our Mission
                </h2>
                <p className="mt-3 leading-relaxed text-sm sm:text-base text-muted-foreground text-justify sm:text-left">
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
          <article className="grid overflow-hidden rounded-card bg-primary-soft md:grid-cols-[.8fr_1.2fr] shadow-card">
            <img
              src={images.engineersImage}
              alt="Engineering leadership team"
              className="h-full min-h-64 sm:min-h-72 w-full object-cover"
            />
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <span className="text-xs font-bold uppercase tracking-[.18em] text-primary">
                Managing Director
              </span>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-navy">
                Anuraag Cherukuri
              </h3>
              <p className="mt-3 max-w-xl leading-relaxed text-sm sm:text-base text-muted-foreground text-justify sm:text-left">
                Leading Vijaya Lakshmi Infra with a hands-on commitment to technical quality,
                uncompromising project safety, and long-term relationships with government bodies
                and infrastructure developers.
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
