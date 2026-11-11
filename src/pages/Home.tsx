import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AnimatedCounter,
  Eyebrow,
  FeatureGrid,
  ProjectCards,
  SectionTitle,
  images,
} from "@/components/site";

export default function Home() {
  useEffect(() => {
    document.title = "Vijaya Lakshmi Infra — Electrical & Civil Contractors";
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-12 pt-8 sm:pb-16 sm:pt-10 lg:pb-18 lg:pt-12">
        <img
          src={images.heroImage}
          alt="Engineers at a high-voltage substation in India"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="blueprint absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl flex flex-col items-start justify-center">
            <Eyebrow light>Engineering excellence in infrastructure development</Eyebrow>
            <h1 className="font-display text-3xl font-extrabold leading-[1.08] text-primary-foreground sm:text-5xl lg:text-6xl">
              ELECTRICAL &<br />
              <span className="text-gold">CIVIL CONTRACTORS</span>
            </h1>
            <p className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-primary-foreground/85 text-justify sm:text-left">
              Powering India's infrastructure with innovative electrical, civil, and engineering
              solutions since 2014.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild variant="light" size="lg" className="shadow-lg">
                <Link to="/projects">
                  View Projects <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overlapping Stats Grid */}
      <div className="relative z-20 -mt-8 mx-auto max-w-7xl px-5 sm:-mt-10 lg:-mt-12 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {([
            ["10+", "Years Experience"],
            ["10+", "Infrastructure Projects"],
            ["33/11kV", "Power Infrastructure"],
            ["Pan India", "Services"],
          ] as const).map(([val, label], idx) => (
            <div
              key={label}
              className={`group flex flex-col justify-center items-center text-center sm:items-start sm:text-left rounded-card border border-border/80 bg-card p-5 sm:p-6 shadow-premium transition duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl ${idx === 0
                  ? "reveal-left"
                  : idx === 1
                    ? "reveal-down"
                    : idx === 2
                      ? "reveal-up"
                      : "reveal-right"
                }`}
            >
              <strong className="font-numbers text-xl font-extrabold text-primary sm:text-2xl lg:text-3xl">
                <AnimatedCounter value={val} />
              </strong>
              <span className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-600 sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* About Overview Section */}
      <section className="section-pad pt-6 sm:pt-8">
        <div className="mx-auto grid max-w-7xl items-stretch gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12 px-5 lg:px-8">
          <div className="relative reveal-left flex flex-col h-full min-h-[340px] sm:min-h-[400px] lg:min-h-0">
            <div className="relative h-full w-full overflow-hidden rounded-card shadow-premium">
              <img
                src={images.engineersImage}
                alt="Infrastructure engineers reviewing project plans"
                loading="lazy"
                className="h-full w-full object-cover lg:absolute lg:inset-0"
              />
            </div>
            <div className="absolute -bottom-3 right-3 sm:-bottom-4 sm:right-4 z-10 rounded-card bg-destructive p-3.5 sm:p-5 text-destructive-foreground shadow-xl">
              <strong className="font-numbers text-2xl sm:text-4xl font-black">2014</strong>
              <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[.15em]">
                Established
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-between h-full reveal-right py-0.5">
            <div>
              <SectionTitle
                eyebrow="About Vijaya Lakshmi Infra"
                title="Building Networks That Keep India Moving"
                copy="Established in 2014 as Vijaya Lakshmi Enterprises, our journey began as a specialized electrical contracting firm, rebranding as Vijaya Lakshmi Infra in 2021 as a premier infrastructure development company across India."
                className="!mb-3 sm:!mb-4"
              />
              <p className="leading-relaxed text-sm text-muted-foreground text-justify">
                We specialize in design, erection, shifting, and commissioning of High-Tension (HT) &
                Low-Tension (LT) power lines, substations, distribution transformer structures, and
                mini towers, ensuring seamless coordination with government agencies and utility providers.
              </p>
            </div>
            <div className="pt-4 sm:pt-5">
              <Button asChild variant="consult" size="lg">
                <Link to="/about">
                  Discover Our Story <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-pad overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="Why choose us"
            title="Why Choose Vijaya Lakshmi Infra?"
            copy="From feasibility surveys and detailed engineering to erection, testing, and final commissioning, we bring disciplined rigor to every infrastructure assignment."
          />
          <FeatureGrid />
        </div>
      </section>

      {/* Selected Work */}
      <section className="section-pad bg-primary-soft/50">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 sm:mb-8 gap-4">
            <SectionTitle
              eyebrow="Selected work"
              title="Delivery across critical infrastructure"
              copy="Proven track record in high-voltage transmission, substations, utility realignment, and civil projects."
            />
            <Button asChild variant="consult" size="lg" className="shrink-0 mb-6 sm:mb-8">
              <Link to="/projects">
                View All Projects <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ProjectCards limit={2} showAgreement={false} />
        </div>
      </section>
    </>
  );
}
