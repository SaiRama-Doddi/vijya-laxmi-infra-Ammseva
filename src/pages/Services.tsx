import { useState, useEffect, useRef, type ElementType } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, LucideIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PageHero, SectionTitle, serviceItems, images, FreeConsultancyModal } from "@/components/site";

import surveyImg from "@/assets/process/survey.jpg";
import designImg from "@/assets/process/design.jpg";
import approvalImg from "@/assets/process/approval.jpg";
import executionImg from "@/assets/process/execution.jpg";
import testingImg from "@/assets/process/testing.jpg";
import commissioningImg from "@/assets/process/commissioning.jpg";
import handoverImg from "@/assets/process/handover.jpg";

function ServiceCardsCarousel({
  items,
  badgeText = "Specialized Capability",
  category = "Electrical",
}: {
  items: readonly (readonly [LucideIcon | ElementType, string, string?])[];
  badgeText?: string;
  category?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    const firstChild = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild ? firstChild.offsetWidth + 20 : 340;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(0, index), items.length - 1));
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [items.length]);

  const scroll = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const firstChild = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild ? firstChild.offsetWidth + 20 : 340;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const firstChild = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild ? firstChild.offsetWidth + 20 : 340;
    el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Top Header & Controls */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <span className="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span>
            {category} Services ({items.length} Packages)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            disabled={!canScrollLeft}
            onClick={() => scroll("left")}
            className="h-9 w-9 rounded-full border-slate-200 bg-white text-navy hover:border-primary hover:bg-primary hover:text-white disabled:opacity-30 transition-all duration-300 shadow-sm cursor-pointer"
            aria-label="Previous service"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            disabled={!canScrollRight}
            onClick={() => scroll("right")}
            className="h-9 w-9 rounded-full border-slate-200 bg-white text-navy hover:border-primary hover:bg-primary hover:text-white disabled:opacity-30 transition-all duration-300 shadow-sm cursor-pointer"
            aria-label="Next service"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Carousel Scroll Track */}
      <div
        ref={containerRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-2 -mx-5 px-5 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map(([Icon, title, desc], index) => (
          <div
            key={title}
            className="shrink-0 snap-start w-[280px] sm:w-[320px] lg:w-[340px]"
          >
            <article className="group flex flex-col justify-between h-[340px] rounded-card border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-premium">
              <div>
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-base sm:text-lg font-bold text-navy leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground text-left line-clamp-3">
                  {desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                <FreeConsultancyModal
                  trigger={
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:underline cursor-pointer"
                    >
                      <span>{badgeText}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  }
                />
                <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
                  Turnkey EPC
                </span>
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* Progress Dots */}
      <div className="mt-6 flex items-center justify-center gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to service slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === activeIndex ? "w-7 bg-primary" : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  useEffect(() => {
    document.title = "Electrical & Civil Services — Vijaya Lakshmi Infra";
  }, []);

  const detail = [
    "Survey & Route Planning",
    "Detailed Engineering & Blueprints",
    "Tower Erection & Structural Erection",
    "High-Voltage Diagnostic Testing",
    "Grid Synchronization & Commissioning",
    "Post-Commissioning Maintenance",
    "Feeder & Substation Load Sharing",
    "Underground XLPE Cable Corridors",
    "Compact Mini Tower Construction",
  ];

  const processSteps = [
    {
      step: "01",
      title: "Survey",
      desc: "Route topography & GPS feasibility",
      image: surveyImg,
      alt: "Topographical land survey and GPS theodolite",
    },
    {
      step: "02",
      title: "Design",
      desc: "CAD structural & electrical blueprints",
      image: designImg,
      alt: "Engineering CAD drafting and blueprints",
    },
    {
      step: "03",
      title: "Approval",
      desc: "Statutory clearances & utility NOCs",
      image: approvalImg,
      alt: "Official statutory project approval",
    },
    {
      step: "04",
      title: "Execution",
      desc: "Civil foundation & line erection",
      image: executionImg,
      alt: "Infrastructure construction execution crane",
    },
    {
      step: "05",
      title: "Testing",
      desc: "High-voltage safety diagnostics",
      image: testingImg,
      alt: "Electrical high-voltage testing multimeter",
    },
    {
      step: "06",
      title: "Commissioning",
      desc: "Grid sync & live energization",
      image: commissioningImg,
      alt: "Substation power transformer energization",
    },
    {
      step: "07",
      title: "Handover",
      desc: "Turnkey delivery & documentation",
      image: handoverImg,
      alt: "Turnkey project handover certificate",
    },
  ] as const;

  return (
    <>
      <PageHero
        title="Integrated Engineering. Reliable Execution."
        eyebrow="Services"
        image={images.substationImage}
      />

      {/* Electrical & Civil Capabilities Carousels */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 space-y-12 sm:space-y-16">
          {/* Electrical Carousel */}
          <div>
            <SectionTitle
              eyebrow="Core Competencies"
              title="Electrical Infrastructure Services"
              copy="Vijaya Lakshmi Infra brings deep expertise in Transmission & Distribution (T&D) Systems, power infrastructure, and construction engineering. Our capabilities include:"
            />
            <div className="mt-4 sm:mt-6">
              <ServiceCardsCarousel
                items={serviceItems.slice(0, 7)}
                badgeText="Specialized Capability"
                category="Electrical T&D"
              />
            </div>
          </div>

          {/* Civil Carousel */}
          <div className="pt-6 border-t border-slate-200/70">
            <SectionTitle
              eyebrow="Civil works"
              title="Civil Infrastructure Services"
              copy="Structural engineering, control rooms, heavy equipment foundations, and integrated highway utility realignment."
            />
            <div className="mt-4 sm:mt-6">
              <ServiceCardsCarousel
                items={serviceItems.slice(7)}
                badgeText="Engineered Delivery"
                category="Civil & Highway"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lifecycle Accordion Section */}
      <section className="section-pad bg-primary-soft">
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-2 lg:gap-12 px-5 lg:px-8">
          <div className="flex flex-col justify-between h-full">
            <SectionTitle
              eyebrow="Detailed services"
              title="Capability across the complete project lifecycle"
              copy="Our integrated teams coordinate technical, commercial, statutory and on-site requirements from early survey feasibility through final energization and asset handover."
            />
            <div className="relative overflow-hidden rounded-card shadow-card group mt-2">
              <img
                src={images.engineersImage}
                alt="Engineers executing infrastructure project lifecycle"
                loading="lazy"
                className="h-[260px] sm:h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                width={700}
                height={450}
              />
              <div className="absolute inset-0 bg-image-overlay opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
                    Turnkey EPC Lifecycle
                  </span>
                  <h4 className="font-display text-sm sm:text-base font-bold text-white mt-0.5">
                    End-to-End Execution & Testing
                  </h4>
                </div>
                <div className="rounded-xl bg-white/10 backdrop-blur-md px-3 py-1.5 text-center border border-white/20">
                  <span className="font-numbers text-xs font-bold text-white">100%</span>
                  <span className="block text-[9px] uppercase tracking-wider text-white/80">
                    Quality
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Accordion
            type="single"
            collapsible
            className="rounded-card bg-background p-5 sm:p-6 shadow-card border border-border"
          >
            {detail.map((x, i) => (
              <AccordionItem value={x} key={x}>
                <AccordionTrigger className="font-display font-semibold text-navy hover:text-primary text-left py-3">
                  {String(i + 1).padStart(2, "0")} — {x}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-xs sm:text-sm text-muted-foreground text-justify sm:text-left pb-3">
                  Qualified engineering teams, stringent safety procedures, certified components,
                  and documented milestone controls ensure safe, dependable, and audit-ready results
                  for every work package.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Process Flow */}
      <section className="relative overflow-hidden bg-background py-12 sm:py-16 border-t border-slate-200/80">
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="How we deliver"
            title="A Proven 7-Step Execution Framework"
            copy="Rigorous milestone tracking, safety protocols, and multi-tier quality gates ensuring engineering precision from start to finish."
            center
          />

          {/* Desktop 7-Column Grid View (hidden on mobile/tablet) */}
          <div className="mt-8 hidden lg:grid lg:grid-cols-7 lg:gap-3.5">
            {processSteps.map((step) => (
              <article
                key={step.step}
                className="group relative flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-slate-200/90 bg-card p-3.5 text-center shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-premium"
              >
                <div className="flex flex-col items-center">
                  <span className="inline-flex items-center rounded-full bg-primary-soft px-2.5 py-0.5 font-numbers text-[11px] font-extrabold tracking-wider text-primary">
                    STEP {step.step}
                  </span>
                  <div className="mt-2.5 relative h-16 w-16 overflow-hidden rounded-xl border border-slate-200/80 shadow-xs bg-slate-50">
                    <img
                      src={step.image}
                      alt={step.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={100}
                      height={100}
                    />
                  </div>

                  <h3 className="mt-2.5 font-display text-sm font-bold tracking-wide text-navy group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
                <div className="mt-3 h-1 w-6 mx-auto rounded-full bg-slate-200 transition-all duration-300 group-hover:w-full group-hover:bg-primary" />
              </article>
            ))}
          </div>

          {/* Mobile & Tablet Auto-Scrolling Continuous Marquee (visible on screens < lg) */}
          <div className="relative mt-6 -mx-5 sm:-mx-8 overflow-hidden py-3 lg:hidden">
            {/* Edge Fade Masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-16 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-16 bg-gradient-to-l from-background to-transparent" />

            <div className="animate-marquee-fast pause-on-hover flex gap-4 px-5">
              {[...processSteps, ...processSteps, ...processSteps].map((step, idx) => (
                <article
                  key={`${step.step}-${idx}`}
                  className="group relative flex flex-col justify-between h-[230px] w-[190px] sm:w-[210px] shrink-0 overflow-hidden rounded-2xl border border-slate-200/90 bg-card p-3.5 text-center shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-premium"
                >
                  <div className="flex flex-col items-center">
                    <span className="inline-flex items-center rounded-full bg-primary-soft px-2.5 py-0.5 font-numbers text-[10px] font-extrabold tracking-wider text-primary">
                      STEP {step.step}
                    </span>
                    <div className="mt-2 relative h-14 w-14 overflow-hidden rounded-xl border border-slate-200/80 shadow-xs bg-slate-50">
                      <img
                        src={step.image}
                        alt={step.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        width={100}
                        height={100}
                      />
                    </div>

                    <h3 className="mt-2 font-display text-xs sm:text-sm font-bold tracking-wide text-navy group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground line-clamp-2">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-2.5 h-1 w-6 mx-auto rounded-full bg-slate-200 transition-all duration-300 group-hover:w-full group-hover:bg-primary" />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
