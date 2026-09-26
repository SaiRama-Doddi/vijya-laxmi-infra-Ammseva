import { createFileRoute } from "@tanstack/react-router";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  UserRound,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHero, SectionTitle, WhatsAppIcon, images } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Vijaya Lakshmi Infra" },
      {
        name: "description",
        content: "Discuss your next electrical or civil infrastructure project with our team.",
      },
      { property: "og:title", content: "Contact — Vijaya Lakshmi Infra" },
      {
        property: "og:description",
        content: "Let's build reliable infrastructure together.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    company: "",
    domain: "High-Voltage Transmission Lines (HT/LT)",
    scope: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refId, setRefId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRef = `VLI-REQ-${Math.floor(1000 + Math.random() * 9000)}`;
      setRefId(generatedRef);
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Enquiry Submitted Successfully!", {
        description: `Reference #${generatedRef}. Our technical estimator will reach out within 24 business hours.`,
      });
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      company: "",
      domain: "High-Voltage Transmission Lines (HT/LT)",
      scope: "",
    });
    setIsSuccess(false);
    setRefId("");
  };

  const contactInfo = [
    [
      MapPin,
      "Registered Office",
      "H.No: 32K/22C, 2nd Floor, Shop No-1, Old Bypass, Vettavalam Road, Thiruvannamalai, Tamil Nadu – 606601",
    ],
    [Phone, "Phone Support", "+91 95028 95289"],
    [Mail, "Email Enquiry", "anuraag.cherukuri@gmail.com"],
    [UserRound, "Managing Director", "Anuraag Cherukuri"],
  ] as const;

  const whatsappMessage = encodeURIComponent(
    `Hello Vijaya Lakshmi Infra, I have submitted an enquiry (Ref: ${refId}).\nName: ${formData.fullName}\nDomain: ${formData.domain}\nPhone: ${formData.phone}`
  );

  return (
    <>
      <PageHero
        title="Let's Build Infrastructure Together"
        eyebrow="Contact"
        image={images.engineersImage}
      />

      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="Talk to our team"
            title="Start your next project with confidence"
            copy="Reach out to discuss turnkey transmission, substation installation, highway utility shifting, or specialized civil engineering solutions."
          />

          {/* Quick Info Cards */}
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map(([Icon, title, desc]) => (
              <article
                className="group flex flex-col justify-between h-full rounded-card border border-border bg-card p-5 sm:p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-premium"
                key={title}
              >
                <div>
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base sm:text-lg font-bold text-navy leading-snug">
                    {title}
                  </h3>
                  <p className="mt-2 break-words text-xs sm:text-sm leading-relaxed text-muted-foreground text-justify sm:text-left">
                    {desc}
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-border/40 text-xs font-semibold text-primary">
                  Official Communication
                </div>
              </article>
            ))}
          </div>

          {/* Enquiry Form and Map / Office Container */}
          <div className="mt-10 sm:mt-12 grid gap-8 lg:grid-cols-[1.15fr_.85fr] items-stretch">
            {/* Form Container */}
            {isSuccess ? (
              <div className="flex flex-col justify-between rounded-card bg-primary-soft p-6 sm:p-8 shadow-card border border-border/60">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-success/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-success">
                    <CheckCircle2 className="h-4 w-4" /> Enquiry Received
                  </div>
                  <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-navy">
                    Thank You, {formData.fullName}!
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your infrastructure project enquiry has been registered under reference:
                  </p>
                  <div className="mt-4 inline-block rounded-xl border border-primary/20 bg-background px-4 py-3 shadow-inner">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Reference ID
                    </span>
                    <div className="font-numbers text-2xl font-extrabold text-primary">
                      {refId}
                    </div>
                  </div>

                  <div className="mt-6 space-y-2 rounded-xl border border-border/50 bg-background/80 p-4 text-xs sm:text-sm">
                    <div className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-muted-foreground">Service Required:</span>
                      <span className="font-semibold text-navy">{formData.domain}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-muted-foreground">Contact Phone:</span>
                      <span className="font-semibold text-navy">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-semibold text-navy">{formData.email}</span>
                    </div>
                    {formData.company && (
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Company:</span>
                        <span className="font-semibold text-navy">{formData.company}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 flex flex-wrap items-center gap-3">
                  <Button asChild variant="default" className="bg-[#25D366] text-white hover:bg-[#20ba59]">
                    <a
                      href={`https://wa.me/919502895289?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon className="mr-1.5 h-4 w-4" /> Fast-Track on WhatsApp
                    </a>
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    <RefreshCw className="mr-1.5 h-4 w-4" /> Submit Another Enquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form
                className="flex flex-col justify-between rounded-card bg-primary-soft p-6 sm:p-8 shadow-card border border-border/60"
                onSubmit={handleSubmit}
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-[.18em] text-primary">
                    Get In Touch
                  </span>
                  <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold text-navy">
                    Project Enquiry
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground text-justify sm:text-left">
                    Fill in the details below and our technical estimators will respond within 24
                    business hours with a tailored feasibility plan.
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Full Name *
                      <input
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="e.g. Rahul Sharma"
                      />
                    </label>

                    <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Phone Number *
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="+91 98765 43210"
                      />
                    </label>

                    <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Email Address *
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="name@company.com"
                      />
                    </label>

                    <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Company / Department
                      <input
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="Organization Name"
                      />
                    </label>

                    <label className="text-xs font-bold uppercase tracking-wider text-foreground sm:col-span-2">
                      Project Domain / Service Required
                      <select
                        value={formData.domain}
                        onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                        className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                      >
                        <option>High-Voltage Transmission Lines (HT/LT)</option>
                        <option>33/11kV Substation Construction & Bay Works</option>
                        <option>National & State Highway Utility Shifting</option>
                        <option>Underground Cable Corridors (XLPE)</option>
                        <option>Civil Infrastructure & Foundations</option>
                        <option>Mini Tower & Specialized Erection</option>
                        <option>Network Strengthening & Advanced Conductors</option>
                      </select>
                    </label>

                    <label className="text-xs font-bold uppercase tracking-wider text-foreground sm:col-span-2">
                      Project Details & Scope
                      <textarea
                        rows={3}
                        value={formData.scope}
                        onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                        className="mt-1.5 w-full rounded-lg border border-border bg-background p-3.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="Describe location, technical requirements, approximate timeline, and any special specifications..."
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Button
                    variant="consult"
                    size="lg"
                    className="w-full sm:w-auto"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        Submit Enquiry <Send className="ml-1.5 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-success" />
                    <span>Confidential & Prompt Consultation</span>
                  </div>
                </div>
              </form>
            )}

            {/* Office Showcase */}
            <div className="blueprint relative flex flex-col justify-between min-h-[400px] overflow-hidden rounded-card bg-brand-gradient p-6 sm:p-8 text-primary-foreground shadow-premium">
              <div className="relative z-10 flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 backdrop-blur-md">
                  <MapPin className="h-5 w-5 text-gold" />
                </span>
                <span className="rounded-full border border-gold/40 bg-navy/80 px-2.5 py-0.5 font-numbers text-[11px] font-bold tracking-wider text-gold">
                  HQ TAMIL NADU
                </span>
              </div>

              <div className="relative z-10 my-5">
                <span className="text-xs font-bold uppercase tracking-[.18em] text-gold">
                  Operational Reach
                </span>
                <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold">
                  Pan-India Turnkey Capability
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-primary-foreground/80 text-justify sm:text-left">
                  Headquartered in Tamil Nadu with active infrastructure teams, logistics, and plant
                  equipment deployed across multiple states in India.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-primary-foreground/70">
                  <Clock className="h-3.5 w-3.5 text-gold" />
                  <span>Monday – Saturday: 9:00 AM – 7:00 PM IST</span>
                </div>
              </div>

              <div className="relative z-10 rounded-card border border-primary-foreground/20 bg-primary-foreground/10 p-4 sm:p-5 backdrop-blur-md">
                <p className="text-[11px] font-bold uppercase tracking-[.18em] text-gold">
                  Registered Office Address
                </p>
                <h4 className="mt-1 font-display text-base font-bold">
                  Thiruvannamalai, Tamil Nadu
                </h4>
                <p className="mt-0.5 text-xs text-primary-foreground/75">
                  H.No: 32K/22C, 2nd Floor, Shop No-1, Old Bypass, Vettavalam Road, 606601
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
