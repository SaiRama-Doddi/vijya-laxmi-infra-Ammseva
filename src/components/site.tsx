import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Bolt,
  Building2,
  Cable,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Construction,
  DraftingCompass,
  ExternalLink,
  Facebook,
  FileText,
  Instagram,
  Landmark,
  Layers,
  Linkedin,
  Loader2,
  LucideIcon,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  TowerControl,
  UtilityPole,
  Truck,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState, useRef, type ReactNode, type ElementType } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import heroImage from "@/assets/vli-hero.jpg";
import substationImage from "@/assets/vli-substation.jpg";
import civilImage from "@/assets/vli-civil.jpg";
import engineersImage from "@/assets/vli-engineers.jpg";

export const images = { heroImage, substationImage, civilImage, engineersImage };

export function AnimatedCounter({ value, duration = 1800 }: { value: string; duration?: number }) {
  const [display, setDisplay] = useState<string>(() => value.replace(/\d+/g, "0"));
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const numbers: { start: number; end: number; target: number }[] = [];
    const regex = /\d+/g;
    let match;
    while ((match = regex.exec(value)) !== null) {
      numbers.push({
        start: match.index,
        end: regex.lastIndex,
        target: parseInt(match[0], 10),
      });
    }

    if (numbers.length === 0) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !animated.current) {
          animated.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);

            let result = "";
            let lastIndex = 0;
            for (const num of numbers) {
              result += value.substring(lastIndex, num.start);
              const currentNum = Math.floor(ease * num.target);
              result += currentNum.toString();
              lastIndex = num.end;
            }
            result += value.substring(lastIndex);

            if (progress < 1) {
              setDisplay(result);
              requestAnimationFrame(step);
            } else {
              setDisplay(value);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Projects", "/projects"],
  ["Gallery", "/gallery"],
  ["Contact", "/contact"],
] as const;

export function VLLogoIcon({ className = "h-11 w-11 shrink-0" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="vlRedSphere" cx="42%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#EB262B" />
          <stop offset="60%" stopColor="#C91419" />
          <stop offset="100%" stopColor="#8E080C" />
        </radialGradient>
        <clipPath id="vlWhiteRingClip">
          <circle cx="100" cy="100" r="62" />
        </clipPath>
        <filter id="vlBadgeDropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Outer Royal Blue Ring */}
      <circle cx="100" cy="100" r="95" fill="#0A58A2" />

      {/* Yellow Dashed Road Marking Ring */}
      <circle
        cx="100"
        cy="100"
        r="75"
        fill="none"
        stroke="#FFE600"
        strokeWidth="7.5"
        strokeDasharray="22 17"
        strokeLinecap="butt"
      />

      {/* Middle White Ring with Horizontal Red Stripe */}
      <g clipPath="url(#vlWhiteRingClip)">
        <circle cx="100" cy="100" r="62" fill="#FFFFFF" />
        <rect x="25" y="87" width="150" height="26" fill="#D91B24" />
      </g>

      {/* Inner Red Core Sphere with Soft Depth Shadow */}
      <circle
        cx="100"
        cy="100"
        r="50"
        fill="url(#vlRedSphere)"
        filter="url(#vlBadgeDropShadow)"
      />

      {/* White Lightning Bolt */}
      <path
        d="M 64 115 L 105 88 L 96 95 L 138 82 L 108 102 L 115 96 Z"
        fill="#FFFFFF"
      />

      {/* Stylized Bold Golden-Yellow "VL" Letters */}
      {/* V Letter */}
      <path
        d="M 94 69 L 107 104 L 120 69"
        stroke="#FFE600"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* L Letter */}
      <path
        d="M 120 69 L 120 104 L 142 104"
        stroke="#FFE600"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      to="/"
      className="flex min-w-0 items-center gap-3 transition-opacity hover:opacity-95"
      aria-label="Vijaya Lakshmi Infra home"
    >
      <VLLogoIcon className="h-11 w-11 drop-shadow-sm transition-transform duration-300 hover:scale-105" />
      <span className="min-w-0 leading-tight">
        <strong
          className={`block truncate font-display text-sm font-extrabold uppercase sm:text-base ${
            inverse ? "text-primary-foreground" : "text-navy"
          }`}
        >
          Vijaya Lakshmi
        </strong>
        <span
          className={`block text-[10px] font-semibold uppercase tracking-[.18em] ${
            inverse ? "text-primary-foreground/65" : "text-muted-foreground"
          }`}
        >
          Infra
        </span>
      </span>
    </Link>
  );
}

export function FreeConsultancyModal({
  trigger,
  children,
}: {
  trigger?: ReactNode;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: "HT/LT Transmission Lines",
    location: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refId, setRefId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      toast.error("Please provide your name and phone number.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedRef = `VLI-CON-${Math.floor(1000 + Math.random() * 9000)}`;
      setRefId(generatedRef);
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Free Consultancy Request Received!", {
        description: `Reference #${generatedRef}. Our senior technical lead will contact you shortly.`,
      });
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      service: "HT/LT Transmission Lines",
      location: "",
      details: "",
    });
    setIsSuccess(false);
    setRefId("");
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Vijaya Lakshmi Infra, I would like to request a Free Technical Consultancy (Ref: ${refId}).\nName: ${formData.fullName}\nPhone: ${formData.phone}\nService: ${formData.service}\nLocation: ${formData.location || "N/A"}`
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) {
          setTimeout(handleReset, 300);
        }
      }}
    >
      <DialogTrigger asChild>
        {trigger || children || (
          <Button variant="consult">
            Get Free Consultancy <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-7 rounded-2xl bg-card border border-border">
        {isSuccess ? (
          <div className="py-2 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <DialogHeader className="mt-3 text-center sm:text-center">
              <DialogTitle className="font-display text-2xl font-bold text-navy">
                Consultancy Request Received!
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Thank you, <strong>{formData.fullName}</strong>. Our senior infrastructure engineer
                will analyze your project scope and contact you.
              </DialogDescription>
            </DialogHeader>

            <div className="my-5 inline-block rounded-xl border border-primary/20 bg-primary-soft px-5 py-3 text-center">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                Consultation Reference ID
              </span>
              <div className="font-numbers text-2xl font-extrabold text-primary">{refId}</div>
            </div>

            <div className="space-y-2 rounded-xl border border-border bg-background p-4 text-xs sm:text-sm text-left">
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Domain:</span>
                <span className="font-semibold text-navy">{formData.service}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Contact:</span>
                <span className="font-semibold text-navy">{formData.phone}</span>
              </div>
              {formData.location && (
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-semibold text-navy">{formData.location}</span>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1 bg-[#25D366] text-white hover:bg-[#20ba59]">
                <a
                  href={`https://wa.me/919502895289?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="mr-1.5 h-4 w-4" /> Fast-Track on WhatsApp
                </a>
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <DialogHeader className="text-left">
              <span className="text-xs font-bold uppercase tracking-[.18em] text-primary">
                Free Technical Estimation
              </span>
              <DialogTitle className="font-display text-xl sm:text-2xl font-bold text-navy mt-1">
                Get Free Infrastructure Consultancy
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
                Discuss feasibility, route planning, line voltages, or BOQ with certified infrastructure experts.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Your Name *
                  <input
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="e.g. Rajesh Kumar"
                  />
                </label>

                <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Phone / WhatsApp *
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="+91 98765 43210"
                  />
                </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Email Address
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="email@company.com"
                  />
                </label>

                <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Project Location / State
                  <input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="e.g. Chennai, TN / Hyderabad"
                  />
                </label>
              </div>

              <label className="block text-xs font-bold uppercase tracking-wider text-foreground">
                Service Domain
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option>HT/LT Transmission Lines</option>
                  <option>33/11kV Substation Construction & Bay Works</option>
                  <option>Highway Utility Shifting (NHAI/SH)</option>
                  <option>Underground XLPE Cable Laying</option>
                  <option>Mini Towers & Road Crossings</option>
                  <option>Civil Infrastructure & Foundations</option>
                  <option>Smart Power & Load Distribution</option>
                </select>
              </label>

              <label className="block text-xs font-bold uppercase tracking-wider text-foreground">
                Brief Project Scope / Notes
                <textarea
                  rows={2}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-background p-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Estimated route length, voltage, or timeline requirements..."
                />
              </label>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Button
                  variant="consult"
                  size="lg"
                  className="w-full sm:w-auto"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      Request Free Consultancy <ArrowRight className="ml-1.5 h-4 w-4" />
                    </>
                  )}
                </Button>
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-success" />
                  <span>100% Free & Confidential</span>
                </div>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-xs backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-16 sm:h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav
          className="hidden items-center justify-center gap-7 lg:flex"
          aria-label="Main navigation"
        >
          {links.map(([label, to]) => (
            <Link
              key={to}
              to={to}
              className={`nav-link text-slate-700 hover:text-primary transition-colors ${
                (to === "/" ? pathname === "/" : pathname.startsWith(to))
                  ? "is-active text-primary font-bold"
                  : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center justify-end">
          <FreeConsultancyModal
            trigger={
              <Button variant="consult" size="sm" className="inline-flex cursor-pointer">
                Get Free Consultancy <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            }
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-700 hover:bg-slate-100 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav className="border-t border-slate-200 bg-white p-5 shadow-xl lg:hidden">
          {links.map(([label, to]) => (
            <Link
              key={to}
              to={to}
              className="block border-b border-slate-100 py-2.5 font-display font-semibold text-slate-800 hover:text-primary"
            >
              {label}
            </Link>
          ))}
          <FreeConsultancyModal
            trigger={
              <Button variant="consult" className="mt-4 w-full cursor-pointer">
                Get Free Consultancy
              </Button>
            }
          />
        </nav>
      )}
    </header>
  );
}

export function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export function YouTubeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:py-10 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col justify-between">
          <div>
            <Logo inverse />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-primary-foreground/75 text-justify sm:text-left">
              Delivering reliable electrical, civil and engineering infrastructure across India
              since 2014.
            </p>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vijaya Lakshmi Infra on LinkedIn"
              title="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-full bg-[#0A66C2] text-white shadow-md shadow-[#0A66C2]/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#0A66C2]/50 hover:brightness-110"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href="https://wa.me/919502895289?text=Hello%20Vijaya%20Lakshmi%20Infra,%20I%20would%20like%20to%20inquire%20about%20your%20infrastructure%20services."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Vijaya Lakshmi Infra on WhatsApp"
              title="WhatsApp"
              className="grid h-10 w-10 place-items-center rounded-full bg-[#25D366] text-white shadow-md shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#25D366]/50 hover:brightness-110"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vijaya Lakshmi Infra on Facebook"
              title="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full bg-[#1877F2] text-white shadow-md shadow-[#1877F2]/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#1877F2]/50 hover:brightness-110"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vijaya Lakshmi Infra on Instagram"
              title="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-md shadow-[#dc2743]/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#dc2743]/50 hover:brightness-110"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vijaya Lakshmi Infra on YouTube"
              title="YouTube"
              className="grid h-10 w-10 place-items-center rounded-full bg-[#FF0000] text-white shadow-md shadow-[#FF0000]/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#FF0000]/50 hover:brightness-110"
            >
              <YouTubeIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer-title">Quick Links</h3>
          <ul className="space-y-2.5 text-sm text-primary-foreground/75">
            {links.map(([label, to]) => (
              <li key={to}>
                <Link
                  to={to}
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-gold"
                >
                  <ChevronRight className="h-3 w-3 opacity-50 transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-gold" />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Core Services */}
        <div>
          <h3 className="footer-title">Core Services</h3>
          <ul className="space-y-2.5 text-sm text-primary-foreground/75">
            {[
              "HT/LT Transmission Lines",
              "Substations up to 33/11kV",
              "Line Shifting & UG Networks",
              "Network Strengthening",
              "Mini Towers & Road Crossings",
              "Smart Power Solutions",
            ].map((srv) => (
              <li key={srv}>
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-gold"
                >
                  <ChevronRight className="h-3 w-3 opacity-50 transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-gold" />
                  <span>{srv}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-start">
          <h3 className="footer-title">Get In Touch</h3>
          <div className="space-y-3 text-sm">
            <a
              href="tel:+919502895289"
              className="group flex items-center gap-3 text-primary-foreground/80 hover:text-gold transition-colors"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 text-gold transition-colors group-hover:bg-gold group-hover:text-navy">
                <Phone className="h-4 w-4" />
              </span>
              <span className="font-semibold">+91 95028 95289</span>
            </a>

            <a
              href="https://wa.me/919502895289?text=Hello%20Vijaya%20Lakshmi%20Infra,%20I%20would%20like%20to%20inquire%20about%20your%20infrastructure%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-primary-foreground/80 hover:text-[#25D366] transition-colors"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#25D366]/20 text-[#25D366] transition-colors group-hover:bg-[#25D366] group-hover:text-white">
                <WhatsAppIcon className="h-4 w-4" />
              </span>
              <span>WhatsApp Direct Chat</span>
            </a>

            <a
              href="mailto:anuraag.cherukuri@gmail.com"
              className="group flex items-center gap-3 text-primary-foreground/80 hover:text-gold transition-colors"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 text-gold transition-colors group-hover:bg-gold group-hover:text-navy">
                <Mail className="h-4 w-4" />
              </span>
              <span className="break-all">anuraag.cherukuri@gmail.com</span>
            </a>

            <div className="flex items-start gap-3 text-primary-foreground/80">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 text-red-400 mt-0.5">
                <MapPin className="h-4 w-4" />
              </span>
              <span className="leading-snug">Thiruvannamalai, Tamil Nadu – 606601</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-primary-foreground/60 pt-1 border-t border-white/10">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/5 text-gold">
                <Clock3 className="h-3.5 w-3.5" />
              </span>
              <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 px-5 py-4 text-center text-xs text-primary-foreground/60">
        © 2026 Vijaya Lakshmi Infra. Engineering Excellence in Infrastructure Development. All
        rights reserved.
      </div>
    </footer>
  );
}

export function StickyContactActions() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const f = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <aside
      aria-label="Quick contact and navigation"
      className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-50 flex flex-col items-end gap-3"
    >
      {/* Back to Top Button */}
      {visible && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top of page"
          className="group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-navy/90 text-white backdrop-blur-md border border-white/20 shadow-xl transition-all duration-300 hover:scale-110 hover:bg-gold hover:text-navy hover:border-gold hover:shadow-gold/30 focus:outline-none focus:ring-4 focus:ring-gold/30 cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          <ArrowRight className="-rotate-90 h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
          <span className="pointer-events-none absolute right-14 sm:right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white shadow-xl opacity-0 transition-all duration-300 group-hover:opacity-100 hidden sm:block border border-white/10">
            Back to Top
          </span>
        </button>
      )}

      {/* Phone Call Button */}
      <a
        href="tel:+919502895289"
        aria-label="Call Vijaya Lakshmi Infra"
        className="group relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-primary text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/40"
      >
        <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white transition-transform duration-300 group-hover:rotate-12" />
        <span className="pointer-events-none absolute right-14 sm:right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white shadow-xl opacity-0 transition-all duration-300 group-hover:opacity-100 hidden sm:block border border-white/10">
          Call +91 95028 95289
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919502895289?text=Hello%20Vijaya%20Lakshmi%20Infra,%20I%20would%20like%20to%20inquire%20about%20your%20infrastructure%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Vijaya Lakshmi Infra on WhatsApp"
        className="group relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[#25D366]/50 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-80" />
          <span className="relative inline-flex h-full w-full rounded-full bg-white" />
        </span>
        <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7 text-white transition-transform duration-300 group-hover:scale-105" />
        <span className="pointer-events-none absolute right-14 sm:right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white shadow-xl opacity-0 transition-all duration-300 group-hover:opacity-100 hidden sm:block border border-white/10">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <StickyContactActions />
    </>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      className={`mb-2 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[.2em] ${
        light ? "text-gold" : "text-primary"
      }`}
    >
      <span className="h-0.5 w-6 bg-current" />
      {children}
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  copy,
  center = false,
  light = false,
  className = "",
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  copy?: ReactNode;
  center?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`mb-5 sm:mb-6 w-full ${
        center
          ? "mx-auto max-w-5xl lg:max-w-6xl text-center flex flex-col items-center justify-center"
          : "max-w-5xl lg:max-w-6xl text-left flex flex-col items-start"
      } ${className}`}
    >
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2
        className={`font-display text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl ${
          light ? "text-primary-foreground" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {copy && (
        <p
          className={`mt-2.5 sm:mt-3 leading-relaxed text-sm sm:text-base max-w-3xl lg:max-w-4xl ${
            center ? "text-center" : "text-justify sm:text-left"
          } ${light ? "text-primary-foreground/80" : "text-muted-foreground"}`}
        >
          {copy}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  title,
  eyebrow,
  image = heroImage,
}: {
  title: string;
  eyebrow: string;
  image?: string;
}) {
  return (
    <section className="relative flex min-h-[200px] sm:min-h-[240px] items-end overflow-hidden py-8 sm:py-10 lg:py-12">
      <img
        src={image}
        alt="Indian infrastructure engineering project"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="blueprint absolute inset-0 opacity-20" />
      <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 className="max-w-4xl font-display text-3xl font-extrabold leading-[1.08] text-primary-foreground sm:text-5xl">
          {title}
        </h1>
        <div className="mt-3 flex items-center gap-2 text-xs sm:text-sm font-medium text-primary-foreground/75">
          <Link to="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gold">{eyebrow}</span>
        </div>
      </div>
    </section>
  );
}

function StarPolygon({ cx, cy, size }: { cx: number; cy: number; size: number }) {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? size : size / 2.2;
    const angle = (i * Math.PI) / 5 - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return (
    <polygon
      points={points.join(" ")}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  );
}

export function ProvenExpertiseIcon({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer Circle */}
      <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth="2.5" />
      {/* Gear Head */}
      <circle cx="32" cy="20.5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M30.8 14.5 L33.2 14.5 L33.6 16.2 L35.2 16.8 L36.7 15.7 L38.4 17.4 L37.3 18.9 L37.9 20.5 L39.6 20.9 L39.6 23.3 L37.9 23.7 L37.3 25.3 L38.4 26.8 L36.7 28.5 L35.2 27.4 L33.6 28 L33.2 29.7 L30.8 29.7 L30.4 28 L28.8 27.4 L27.3 28.5 L25.6 26.8 L26.7 25.3 L26.1 23.7 L24.4 23.3 L24.4 20.9 L26.1 20.5 L26.7 18.9 L25.6 17.4 L27.3 15.7 L28.8 16.8 L30.4 16.2 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Shoulders / Bust */}
      <path
        d="M20 47 C20 37.5 25 34.5 32 34.5 C39 34.5 44 37.5 44 47"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* 3 Stars across bust */}
      <StarPolygon cx={32} cy={41} size={3.4} />
      <StarPolygon cx={24.5} cy={42.5} size={2.8} />
      <StarPolygon cx={39.5} cy={42.5} size={2.8} />
    </svg>
  );
}

export function EndToEndSolutionsIcon({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer Circle */}
      <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth="2.5" />
      {/* Top flow path */}
      <circle cx="19" cy="23" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M21.5 23 H31 C37.5 23 41.5 26.5 41.5 32.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="31" cy="23" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      {/* Bottom flow path */}
      <path d="M22.5 31.5 C22.5 37.5 26.5 41 33 41 H42.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="22.5" cy="31.5" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="33" cy="41" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="45" cy="41" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      {/* Center Gear */}
      <path
        d="M30.8 26 L33.2 26 L33.6 27.5 L35.2 28.1 L36.5 27.1 L38 28.6 L37 29.9 L37.6 31.5 L39.1 31.9 L39.1 34.1 L37.6 34.5 L37 36.1 L38 37.4 L36.5 38.9 L35.2 37.9 L33.6 38.5 L33.2 40 L30.8 40 L30.4 38.5 L28.8 37.9 L27.5 38.9 L26 37.4 L27 36.1 L26.4 34.5 L24.9 34.1 L24.9 31.9 L26.4 31.5 L27 29.9 L26 28.6 L27.5 27.1 L28.8 28.1 L30.4 27.5 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Center Checkmark */}
      <path d="M29.5 33 L31.5 35 L35 31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ExperienceSectorIcon({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer Circle */}
      <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth="2.5" />
      {/* Center Avatar Container */}
      <circle cx="32" cy="38" r="10" stroke="currentColor" strokeWidth="2.2" />
      {/* User inside avatar */}
      <circle cx="32" cy="34" r="2.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M25.5 44.5 C25.5 40 28.5 39 32 39 C35.5 39 38.5 40 38.5 44.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* 3 Stars arched */}
      <StarPolygon cx={32} cy={19} size={4.2} />
      <StarPolygon cx={19.5} cy={27} size={3.4} />
      <StarPolygon cx={44.5} cy={27} size={3.4} />
    </svg>
  );
}

export function SafetyQualityIcon({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer Circle */}
      <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth="2.5" />
      {/* Rosette scalloped seal */}
      <circle cx="32" cy="28" r="9.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M32 16.5 C33.3 16.5 34 17.5 35.2 17.8 C36.4 18.2 37.6 17.8 38.6 18.5 C39.6 19.3 39.7 20.6 40.5 21.6 C41.3 22.5 42.6 23 43.1 24.2 C43.5 25.4 43.1 26.6 43.1 27.9 C43.1 29.2 43.5 30.4 43.1 31.6 C42.6 32.8 41.3 33.3 40.5 34.2 C39.7 35.2 39.6 36.5 38.6 37.3 C37.6 38 36.4 37.6 35.2 38 C34 38.3 33.3 39.3 32 39.3 C30.7 39.3 30 38.3 28.8 38 C27.6 37.6 26.4 38 25.4 37.3 C24.4 36.5 24.3 35.2 23.5 34.2 C22.7 33.3 21.4 32.8 20.9 31.6 C20.5 30.4 20.9 29.2 20.9 27.9 C20.9 26.6 20.5 25.4 20.9 24.2 C21.4 23 22.7 22.5 23.5 21.6 C24.3 20.6 24.4 19.3 25.4 18.5 C26.4 17.8 27.6 18.2 28.8 17.8 C30 17.5 30.7 16.5 32 16.5 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Thumbs Up Icon */}
      <path
        d="M29.5 30 H28 V26 H29.5 M29.5 30 L33.2 30 C34.5 30 35 29 35 27.8 C35 26.8 34.2 26.4 33 26.4 H32 L32.6 23.8 C32.8 22.5 31.3 22.2 30.6 23.4 L29.5 26"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ribbon tails below */}
      <path d="M27.5 36.5 L24 47 L28.5 44.5 L32 47 L30 37.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36.5 36.5 L40 47 L35.5 44.5 L32 47 L34 37.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TimelyExecutionIcon({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer Circle */}
      <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth="2.5" />
      {/* Scalloped gear / seal */}
      <path
        d="M32 15 C33.8 15 34.8 16.5 36.5 17 C38.2 17.5 39.8 17 41.2 18 C42.6 19 42.8 20.8 43.9 22.1 C45 23.4 46.8 24.1 47.4 25.8 C48 27.5 47.5 29.1 47.5 30.9 C47.5 32.7 48 34.3 47.4 36 C46.8 37.7 45 38.4 43.9 39.7 C42.8 41 42.6 42.8 41.2 43.8 C39.8 44.8 38.2 44.3 36.5 44.8 C34.8 45.3 33.8 46.8 32 46.8 C30.2 46.8 29.2 45.3 27.5 44.8 C25.8 44.3 24.2 44.8 22.8 43.8 C21.4 42.8 21.2 41 20.1 39.7 C19 38.4 17.2 37.7 16.6 36 C16 34.3 16.5 32.7 16.5 30.9 C16.5 29.1 16 27.5 16.6 25.8 C17.2 24.1 19 23.4 20.1 22.1 C21.2 20.8 21.4 19 22.8 18 C24.2 17 25.8 17.5 27.5 17 C29.2 16.5 30.2 15 32 15 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Dotted inner circle */}
      <circle cx="32" cy="32" r="9.5" stroke="currentColor" strokeWidth="1.8" strokeDasharray="1.5 2.5" />
      {/* Checkmark in center */}
      <path d="M27.5 32 L30.5 35 L36.5 29" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const featureItems = [
  [
    ProvenExpertiseIcon,
    "Proven Expertise",
    "Over a decade of excellence in power & civil infrastructure.",
  ],
  [
    EndToEndSolutionsIcon,
    "End-to-End Solutions",
    "From survey & design to execution & commissioning.",
  ],
  [
    ExperienceSectorIcon,
    "Government & Private Sector Experience",
    "Trusted by leading utilities and organizations across India.",
  ],
  [
    SafetyQualityIcon,
    "Commitment to Safety & Quality",
    "Stringent compliance with national and international standards.",
  ],
  [
    TimelyExecutionIcon,
    "Timely Execution",
    "Efficient project management for on-time and within-budget delivery.",
  ],
] as const;

export function FeatureGrid({
  items = featureItems,
  autoScroll = true,
}: {
  items?: readonly (readonly [LucideIcon | ElementType, string, string?])[];
  autoScroll?: boolean;
}) {
  if (autoScroll) {
    const duplicated = [...items, ...items, ...items];
    return (
      <div className="relative -mx-5 sm:-mx-8 overflow-hidden py-4">
        {/* Gradient edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-32 bg-gradient-to-l from-background to-transparent" />

        <div className="animate-marquee pause-on-hover flex gap-6 px-6 py-2">
          {duplicated.map(([Icon, title, desc], idx) => (
            <article
              key={`${title}-${idx}`}
              className="group flex flex-col justify-between h-[310px] w-[300px] sm:w-[360px] shrink-0 rounded-card border border-border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-premium"
            >
              <div className="flex flex-col items-start">
                <span className="grid h-16 w-16 place-items-center text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-16 w-16" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-left line-clamp-3">
                  {desc ||
                    "Disciplined planning, qualified teams and dependable delivery across every project stage."}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary">
                <span>Verified Quality</span>
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(([Icon, title, desc]) => (
        <article
          key={title}
          className="group flex flex-col justify-between h-full rounded-card border border-border bg-card p-7 shadow-card transition duration-300 hover:-translate-y-2 hover:shadow-premium"
        >
          <div className="flex flex-col items-start">
            <span className="grid h-16 w-16 place-items-center text-primary transition-transform duration-300 group-hover:scale-110">
              <Icon className="h-16 w-16" />
            </span>
            <h3 className="mt-5 font-display text-lg font-bold text-navy">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-justify sm:text-left">
              {desc ||
                "Disciplined planning, qualified teams and dependable delivery across every project stage."}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary">
            <span>Verified Quality</span>
            <CheckCircle2 className="h-4 w-4" />
          </div>
        </article>
      ))}
    </div>
  );
}

export const serviceItems = [
  [
    TowerControl,
    "HT/LT Transmission Lines",
    "Survey, planning, and execution of HT/LT transmission lines.",
  ],
  [
    Zap,
    "Line Erection & Commissioning",
    "Erection, testing & commissioning of 33kV, 22kV, 11kV, and LT transmission lines.",
  ],
  [
    Building2,
    "Substations up to 33/11kV",
    "Installation & commissioning of electrical substations up to 33/11kV.",
  ],
  [
    Cable,
    "Line Shifting & UG Networks",
    "Shifting & upgrading overhead lines and underground cable networks.",
  ],
  [
    Bolt,
    "Network Strengthening",
    "Strengthening electrical networks with advanced conductors for enhanced load distribution.",
  ],
  [
    UtilityPole,
    "Mini Towers & Road Crossings",
    "Construction & installation of mini towers for power transmission and road crossings.",
  ],
  [
    Sparkles,
    "Smart Power Solutions",
    "Integration of smart power solutions for efficient energy distribution.",
  ],
  [
    Construction,
    "Substation Civil Works",
    "Control room construction, switchyard foundations, trenches and boundary works.",
  ],
  [
    Target,
    "Foundation Construction",
    "High-load engineered structural foundations built for stability and long service life.",
  ],
  [
    Truck,
    "Road Widening Utility Shifting",
    "Safe realignment of utilities and power corridors along expanding state/national highways.",
  ],
  [
    Landmark,
    "National Highway Projects",
    "Coordinated packages delivered strictly adhering to NHAI and ministry guidelines.",
  ],
  [
    Construction,
    "State Highway Projects",
    "Reliable utility realignment and civil works executed across state highway corridors.",
  ],
  [
    TowerControl,
    "Tower Foundations",
    "Precision pile, pad and chimney foundations designed for severe terrain and loads.",
  ],
  [
    UtilityPole,
    "Transformer Platforms",
    "Durable reinforced concrete platforms, fencing and plinth structures.",
  ],
  [
    Zap,
    "Renewable Infrastructure",
    "Electrical balance-of-plant support, evacuation lines and solar/wind substation hookups.",
  ],
] as const;

export interface ProjectItem {
  id: string;
  no: string;
  title: string;
  category: "Highway Utility Shifting" | "HT/LT & RDSS Works";
  scope: string;
  client: string;
  clientLocation: string;
  agreement: string;
  date: string;
  status: "Completed" | "Ongoing";
  location: string;
  chainage?: string;
  image: string;
  tags: string[];
}

export const projects: ProjectItem[] = [
  {
    id: "nh-227",
    no: "01",
    title: "NH-227 Road Widening",
    category: "Highway Utility Shifting",
    scope:
      "Shift and erect HT/LT lines, baby towers and DTRs for the NHAI road-widening project, CH 78+120 to 98+340. Subcontract work.",
    client: "SRR Projects",
    clientLocation: "Keelapalur, Tamil Nadu",
    agreement: "SRR Projects/WO/E.Shift/2018-19/07",
    date: "01.02.2019",
    status: "Completed",
    location: "Keelapalur, Tamil Nadu",
    chainage: "CH 78+120 to 98+340",
    image: civilImage,
    tags: ["NHAI Road Widening", "HT/LT Lines & DTRs", "Baby Towers"],
  },
  {
    id: "bangalore-chennai-exp",
    no: "02",
    title: "Bangalore–Chennai Expressway",
    category: "Highway Utility Shifting",
    scope:
      "Shift and erect HT/LT lines, baby towers and DTRs for the four-lane Bangalore–Chennai Expressway, Package IV.",
    client: "RCCL Srikanche Expressway Pvt Ltd",
    clientLocation: "Tamil Nadu",
    agreement: "RSEPL/LOI/WO-UTY/2021/001",
    date: "23.11.2021",
    status: "Completed",
    location: "Tamil Nadu",
    chainage: "Expressway Package IV",
    image: heroImage,
    tags: ["4-Lane Expressway", "Package IV", "Baby Towers & DTRs"],
  },
  {
    id: "rdss-feeder-1",
    no: "03",
    title: "RDSS Agricultural Feeder Segregation",
    category: "HT/LT & RDSS Works",
    scope:
      "11 kV Rural Agri Feeder Segregation (K2) work under the Government of India RDSS scheme.",
    client: "TANGEDCO",
    clientLocation: "Additional Chief Engineer, Kanchipuram",
    agreement: "ACE/KEDC/KPM/AEE.MM/AE/D.No.817/2022",
    date: "25.07.2022",
    status: "Completed",
    location: "Kanchipuram, Tamil Nadu",
    chainage: "11 kV K2 Feeder Network",
    image: substationImage,
    tags: ["RDSS Scheme", "11 kV Agri Feeder", "TANGEDCO Govt EPC"],
  },
  {
    id: "rdss-feeder-2",
    no: "04",
    title: "RDSS Agricultural Feeder Segregation",
    category: "HT/LT & RDSS Works",
    scope:
      "11 kV Rural Agri Feeder Segregation (K2) work under the Government of India RDSS scheme.",
    client: "TANGEDCO",
    clientLocation: "Additional Chief Engineer, Kanchipuram",
    agreement: "ACE/KEDC/KPM/AEE.MM/AE/D.No.827/2022",
    date: "26.07.2022",
    status: "Completed",
    location: "Kanchipuram, Tamil Nadu",
    chainage: "11 kV K2 Feeder Network",
    image: engineersImage,
    tags: ["RDSS Scheme", "Feeder Segregation", "TANGEDCO Govt EPC"],
  },
  {
    id: "nh-332-pkg-2",
    no: "05",
    title: "Puducherry–Poondiyankuppam / NH-332",
    category: "Highway Utility Shifting",
    scope:
      "Shift and erect HT/LT lines, baby towers and DTRs for four-laning of NH-45A (New NH-332), km 29.000 to km 67.000, Package II, Tamil Nadu.",
    client: "Dilip Buildcon Limited",
    clientLocation: "Bhopal, Madhya Pradesh",
    agreement: "DBL/WO/HO/Puducherry to Poondiyankuppam/2022/071",
    date: "2022",
    status: "Completed",
    location: "Tamil Nadu & Puducherry",
    chainage: "Km 29.000 to Km 67.000 (Package II)",
    image: civilImage,
    tags: ["NH-45A / New NH-332", "Dilip Buildcon", "Package II"],
  },
  {
    id: "nh-332-pkg-1",
    no: "06",
    title: "Villupuram–Puducherry / NH-332",
    category: "Highway Utility Shifting",
    scope:
      "Four-laning of the Villupuram–Puducherry section of NH-45A (New NH-332), km 0.000 to km 29.000, Package I, Tamil Nadu.",
    client: "Dilip Buildcon Limited",
    clientLocation: "Bhopal, Madhya Pradesh",
    agreement: "DBL/WO/HO/Villupuram Puducherry/2023/011",
    date: "30.01.2023",
    status: "Completed",
    location: "Villupuram – Puducherry, Tamil Nadu",
    chainage: "Km 0.000 to Km 29.000 (Package I)",
    image: heroImage,
    tags: ["NH-45A / New NH-332", "Dilip Buildcon", "Package I"],
  },
  {
    id: "nh-205-four-lane",
    no: "07",
    title: "Tiruvallur–Veppampattu / NH-205",
    category: "Highway Utility Shifting",
    scope:
      "Balance four-lane work from km 43.950 (Thiruvallur Bypass) to km 61.470 (Veppampattu Bypass), through Thaneerkulam, Thozur and Sevvapet Bypass (17.520 km), on the Tirupathi–Tiruttani–Chennai section of NH-205, Tamil Nadu.",
    client: "EKK Infrastructure Limited",
    clientLocation: "Perumbavoor, Ernakulam, Kerala",
    agreement: "EIL/205-29/22-23",
    date: "11.03.2023",
    status: "Completed",
    location: "Tiruvallur – Veppampattu, Tamil Nadu",
    chainage: "Km 43.950 to Km 61.470 (17.520 km)",
    image: civilImage,
    tags: ["NH-205 Tirupathi–Chennai", "17.52 km Corridor", "EKK Infrastructure"],
  },
  {
    id: "nh-716b-six-lane",
    no: "08",
    title: "Chittoor–Thatchur / NH-716B",
    category: "Highway Utility Shifting",
    scope:
      "Shift existing HT/LT overhead lines for the proposed six-lane highway, CH 51+000 to CH 55+600, Pallipet and Poddutturpet section of NH-716B, Tamil Nadu.",
    client: "EKK Infrastructure Limited",
    clientLocation: "Perumbavoor, Ernakulam, Kerala",
    agreement: "EIL/300-5/23-24",
    date: "10.06.2023",
    status: "Completed",
    location: "Pallipet & Poddutturpet, Tamil Nadu",
    chainage: "CH 51+000 to CH 55+600",
    image: substationImage,
    tags: ["Six-Lane NH-716B", "HT/LT Line Shift", "EKK Infrastructure"],
  },
  {
    id: "cprr-six-lane",
    no: "09",
    title: "Vengathur–Sengadu / CPRR",
    category: "Highway Utility Shifting",
    scope:
      "Shift existing HT/LT overhead lines for the proposed six-lane highway, CH 58+200 to CH 68+200, Thiruvallur section of CPRR, EPC Package 04, Tamil Nadu.",
    client: "RR Infra",
    clientLocation: "Vinayaga Nagar, Madurai, Tamil Nadu",
    agreement: "Ongoing works – as listed in profile",
    date: "Ongoing",
    status: "Ongoing",
    location: "Thiruvallur section, Tamil Nadu",
    chainage: "CH 58+200 to CH 68+200 (Package 04)",
    image: heroImage,
    tags: ["Chennai Peripheral Ring Road", "Six-Lane EPC Package 04", "Active Execution"],
  },
  {
    id: "nh-48-four-lane",
    no: "10",
    title: "Sriperumbudur–Karapattai / NH-48",
    category: "Highway Utility Shifting",
    scope:
      "Shift existing HT/LT overhead lines for the four-laning project on NH-48, CH 37+000 to CH 69+800, Tamil Nadu.",
    client: "P & C Projects (P) Ltd.",
    clientLocation: "Perundurai Road, Erode, Tamil Nadu",
    agreement: "Ongoing works – as listed in profile",
    date: "Ongoing",
    status: "Ongoing",
    location: "Sriperumbudur to Karapattai, Tamil Nadu",
    chainage: "CH 37+000 to CH 69+800 (32.8 km)",
    image: civilImage,
    tags: ["NH-48 Four-Laning", "32.8 km Corridor", "Active Execution"],
  },
];

export function ProjectCards({
  limit,
  showFilters = false,
}: {
  limit?: number;
  showFilters?: boolean;
}) {
  const [filter, setFilter] = useState<string>("All");

  const categories = [
    { label: "All Projects", value: "All", count: projects.length },
    {
      label: "Highway Utility Shifting",
      value: "Highway Utility Shifting",
      count: projects.filter((p) => p.category === "Highway Utility Shifting").length,
    },
    {
      label: "HT/LT & RDSS Works",
      value: "HT/LT & RDSS Works",
      count: projects.filter((p) => p.category === "HT/LT & RDSS Works").length,
    },
    {
      label: "Ongoing Works",
      value: "Ongoing",
      count: projects.filter((p) => p.status === "Ongoing").length,
    },
  ];

  let filtered = projects;
  if (filter === "Ongoing") {
    filtered = projects.filter((p) => p.status === "Ongoing");
  } else if (filter !== "All") {
    filtered = projects.filter((p) => p.category === filter);
  }

  const displayList = limit ? filtered.slice(0, limit) : filtered;

  return (
    <>
      {showFilters && !limit && (
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setFilter(c.value)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer ${
                filter === c.value
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-102"
                  : "bg-background text-muted-foreground hover:bg-primary-soft hover:text-navy border border-border"
              }`}
            >
              <span>{c.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  filter === c.value
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {c.count}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {displayList.map((p) => (
          <article
            key={p.id}
            className="group flex flex-col justify-between h-full overflow-hidden rounded-card bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-premium border border-border/80"
          >
            <div>
              <Link to={`/projects/${p.id}`} className="block relative h-60 sm:h-64 overflow-hidden cursor-pointer">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  width={800}
                  height={500}
                />
                {/* Project Number Badge */}
                <span className="absolute left-4 top-4 rounded-lg bg-navy/90 px-2.5 py-1 text-xs font-numbers font-extrabold text-gold backdrop-blur-xs shadow-md">
                  PROJ #{p.no}
                </span>

                {/* Status Badge */}
                {p.status === "Completed" ? (
                  <span className="absolute bottom-4 right-4 rounded-full bg-emerald-600/95 px-3 py-1 text-xs font-bold text-white shadow-md flex items-center gap-1 backdrop-blur-xs">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                  </span>
                ) : (
                  <span className="absolute bottom-4 right-4 rounded-full bg-amber-500/95 px-3 py-1 text-xs font-bold text-white shadow-md flex items-center gap-1.5 backdrop-blur-xs animate-pulse">
                    <span className="h-2 w-2 rounded-full bg-white"></span> Ongoing Work
                  </span>
                )}

                {/* Client Tag Top Right */}
                <span className="absolute right-4 top-4 max-w-[200px] truncate rounded-full bg-primary/90 px-3 py-1 text-xs font-bold text-primary-foreground backdrop-blur-xs shadow-sm">
                  {p.client}
                </span>
              </Link>

              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[.12em] text-primary">
                    <Layers className="h-3.5 w-3.5" /> {p.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-destructive shrink-0" />
                    <span className="truncate max-w-[170px]">{p.location}</span>
                  </span>
                </div>

                <h3 className="mt-3 font-display text-lg sm:text-xl font-bold text-navy leading-snug">
                  <Link to={`/projects/${p.id}`} className="hover:text-primary transition-colors">
                    {p.title}
                  </Link>
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {p.scope}
                </p>

                {/* Scope & Agreement Badges */}
                <div className="mt-4 rounded-lg bg-primary-soft/60 p-3 text-xs border border-primary/10 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-slate-600 shrink-0 flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5 text-primary" /> Agreement:
                    </span>
                    <span className="font-mono text-[11px] text-navy font-semibold text-right break-all">
                      {p.agreement}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-600 shrink-0 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-primary" /> Date:
                    </span>
                    <span className="font-medium text-navy text-right font-numbers text-[11px]">
                      {p.date}
                    </span>
                  </div>
                </div>

                {/* Tag Pills */}
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-5 sm:px-6 pb-5 pt-2 flex items-center justify-between border-t border-border/50">
              <span className="text-xs font-semibold text-muted-foreground">
                {p.chainage ? p.chainage : "Turnkey Execution"}
              </span>

              <Link
                to={`/projects/${p.id}`}
                className="text-xs font-bold text-primary inline-flex items-center gap-1.5 hover:text-navy cursor-pointer transition-colors group/btn"
              >
                View Scope & Details{" "}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export function CTA() {
  return null;
}

export function Carousel({ slides }: { slides: { image: string; title: string }[] }) {
  const [i, setI] = useState(0);
  const slide = slides[i] ?? slides[0];
  if (!slide) return null;

  return (
    <div className="relative overflow-hidden rounded-card shadow-card">
      <img
        src={slide.image}
        alt={slide.title}
        className="h-[380px] sm:h-[460px] w-full object-cover"
        width={1400}
        height={800}
      />
      <div className="absolute inset-0 bg-image-overlay" />
      <div className="absolute bottom-6 left-6 right-24 sm:bottom-8 sm:left-8">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-gold mb-1.5">
          Featured Infrastructure
        </span>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-primary-foreground">
          {slide.title}
        </h3>
      </div>
      <div className="absolute bottom-6 right-6 flex gap-2">
        <Button
          size="icon"
          variant="glass"
          onClick={() => setI((i - 1 + slides.length) % slides.length)}
          aria-label="Previous image"
        >
          <ChevronLeft />
        </Button>
        <Button
          size="icon"
          variant="glass"
          onClick={() => setI((i + 1) % slides.length)}
          aria-label="Next image"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
