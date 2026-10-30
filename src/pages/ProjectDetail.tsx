import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { projects, type ProjectItem, images } from "@/components/site";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  FileText,
  MapPin,
  Layers,
  Zap,
  Building2,
  Phone,
  Mail,
  ShieldCheck,
  Route,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const currentIndex = projects.findIndex((p) => p.id === id);
  const project: ProjectItem | undefined = projects[currentIndex];

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — Vijaya Lakshmi Infra`;
      window.scrollTo(0, 0);
    }
  }, [project]);

  if (!project) {
    return (
      <div className="section-pad min-h-[60vh] flex flex-col items-center justify-center text-center px-5">
        <h1 className="text-3xl font-bold text-navy">Project Not Found</h1>
        <p className="mt-2 text-muted-foreground max-w-md">
          The requested project could not be found or may have been updated.
        </p>
        <Button asChild className="mt-6" variant="consult">
          <Link to="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Projects
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Top Banner / Breadcrumb Section */}
      <section className="bg-navy pt-28 pb-10 text-white border-b border-gold/20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-xs text-white/70 hover:text-white">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/40" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/projects" className="text-xs text-white/70 hover:text-white">
                    Projects
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/40" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xs text-gold font-medium truncate max-w-[200px] sm:max-w-none">
                  {project.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="rounded-md bg-gold/20 text-gold border border-gold/40 px-3 py-1 font-numbers text-xs font-extrabold tracking-wider">
              PROJECT #{project.no}
            </span>
            <span className="rounded-md bg-white/10 text-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-gold" />
              {project.category}
            </span>
            {project.status === "Completed" ? (
              <span className="rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Completed
              </span>
            ) : (
              <span className="rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 text-xs font-bold flex items-center gap-1.5 animate-pulse">
                <span className="h-2 w-2 rounded-full bg-amber-400"></span> Ongoing Execution
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
            {project.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4 text-gold shrink-0" />
              <strong>Client:</strong> {project.client}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-destructive shrink-0" />
              <strong>Location:</strong> {project.location}
            </span>
            {project.chainage && (
              <span className="flex items-center gap-1.5">
                <Route className="h-4 w-4 text-gold shrink-0" />
                <strong>Chainage:</strong> {project.chainage}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-6">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="text-xs font-semibold text-navy hover:text-primary"
            >
              <Link to="/projects">
                <ChevronLeft className="mr-1 h-3.5 w-3.5" /> Back to Project Experience
              </Link>
            </Button>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 items-start">
            {/* Left Column: Image, Detailed Description, Scope */}
            <div className="lg:col-span-8 space-y-8 reveal-left">
              {/* Featured Project Image */}
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-card">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[320px] sm:h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs uppercase tracking-widest text-gold font-bold">
                    Official Subcontract Execution
                  </div>
                  <div className="text-lg font-bold sm:text-xl truncate">{project.title}</div>
                </div>
              </div>

              {/* Scope of Work Section */}
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card">
                <div className="flex items-center gap-2 border-b border-border/80 pb-4 mb-5">
                  <FileText className="h-5 w-5 text-primary" />
                  <h2 className="text-xl sm:text-2xl font-bold text-navy">
                    Scope of Work & Engineering Specification
                  </h2>
                </div>

                <p className="text-base sm:text-lg leading-relaxed text-slate-700 font-normal text-justify">
                  {project.scope}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 pt-6 border-t border-border/60">
                  <div className="rounded-xl bg-primary-soft/50 p-4 border border-primary/10">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-2">
                      <Zap className="h-4 w-4" /> Electrical Infrastructure
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                      Erection and shifting of HT/LT power distribution lines, installation of
                      Distribution Transformer (DTR) centers, and intermediate baby towers
                      satisfying DISCOM specifications.
                    </p>
                  </div>

                  <div className="rounded-xl bg-primary-soft/50 p-4 border border-primary/10">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-2">
                      <ShieldCheck className="h-4 w-4" /> Safety & Clearances
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                      Adherence to NHAI Right of Way (ROW) parameters, highway expansion line
                      clearance norms, shutdown coordination, and statutory power supply safety
                      standards.
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Highlights & Deliverables */}
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card">
                <h3 className="text-lg font-bold text-navy mb-4">
                  Project Highlights & Key Features
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 border border-primary/20 px-3.5 py-2 text-xs font-bold text-navy"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      {tag}
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3.5 py-2 text-xs font-semibold text-secondary-foreground">
                    Subcontract Execution
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3.5 py-2 text-xs font-semibold text-secondary-foreground">
                    Statutory Compliances
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Project Dossier / Agreement Details Card */}
            <div className="lg:col-span-4 space-y-6 reveal-right">
              {/* Official Credentials Dossier */}
              <div className="rounded-2xl border-2 border-primary/20 bg-card overflow-hidden shadow-premium">
                <div className="bg-navy p-5 text-white">
                  <div className="text-[11px] font-extrabold uppercase tracking-widest text-gold mb-1">
                    CONTRACT SPECIFICATIONS
                  </div>
                  <h3 className="text-lg font-bold text-white">Official Project Dossier</h3>
                </div>

                <div className="p-5 sm:p-6 space-y-4 text-xs divide-y divide-border/60">
                  <div className="pt-2 first:pt-0">
                    <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px] block mb-1">
                      Client / Contractor
                    </span>
                    <span className="font-bold text-navy text-sm block">{project.client}</span>
                    <span className="text-muted-foreground mt-0.5 block">
                      {project.clientLocation}
                    </span>
                  </div>

                  <div className="pt-4">
                    <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px] block mb-1">
                      Agreement / Work Order No.
                    </span>
                    <span className="font-mono text-xs font-bold text-navy bg-primary-soft/80 p-2 rounded border border-primary/15 block break-all">
                      {project.agreement}
                    </span>
                  </div>

                  <div className="pt-4 grid grid-cols-2 gap-3">
                    <div>
                      <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px] block mb-1">
                        Agreement Date
                      </span>
                      <span className="font-numbers font-bold text-navy text-xs flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        {project.date}
                      </span>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px] block mb-1">
                        Execution Status
                      </span>
                      <span
                        className={`font-bold text-xs inline-flex items-center gap-1 ${
                          project.status === "Completed" ? "text-emerald-600" : "text-amber-600"
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px] block mb-1">
                      Site Location
                    </span>
                    <span className="font-semibold text-navy text-xs flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-destructive shrink-0" />
                      {project.location}
                    </span>
                  </div>

                  {project.chainage && (
                    <div className="pt-4">
                      <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px] block mb-1">
                        Chainage / Corridor Length
                      </span>
                      <span className="font-semibold text-primary text-xs flex items-center gap-1">
                        <Route className="h-3.5 w-3.5 text-primary shrink-0" />
                        {project.chainage}
                      </span>
                    </div>
                  )}

                  <div className="pt-4">
                    <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px] block mb-1">
                      Category
                    </span>
                    <span className="font-bold text-navy text-xs">{project.category}</span>
                  </div>
                </div>
              </div>

              {/* Consultation / Contact Box */}
              <div className="rounded-2xl border border-primary/20 bg-primary-soft/50 p-6 shadow-card">
                <h4 className="font-bold text-navy text-base">Inquire About This Project</h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Need turnkey execution for transmission lines, highway utility realignment, or
                  substations? Reach out to our executive engineering team.
                </p>

                <div className="mt-4 space-y-2.5 text-xs">
                  <a
                    href="tel:+919502895289"
                    className="flex items-center gap-2.5 rounded-lg bg-background p-2.5 font-semibold text-navy hover:text-primary transition-colors border border-border"
                  >
                    <Phone className="h-4 w-4 text-primary" /> +91 95028 95289
                  </a>
                  <a
                    href="mailto:anuraag.cherukuri@gmail.com"
                    className="flex items-center gap-2.5 rounded-lg bg-background p-2.5 font-semibold text-navy hover:text-primary transition-colors border border-border truncate"
                  >
                    <Mail className="h-4 w-4 text-primary" /> anuraag.cherukuri@gmail.com
                  </a>
                </div>

                <Button asChild className="w-full mt-4" variant="consult">
                  <Link to="/contact">Get Free Consultation</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Project Pagination / Previous - Next Navigator */}
          <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevProject ? (
              <Button asChild variant="outline" className="w-full sm:w-auto justify-start">
                <Link to={`/projects/${prevProject.id}`}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  <div className="text-left">
                    <span className="block text-[10px] text-muted-foreground uppercase font-bold">
                      Previous Project #{prevProject.no}
                    </span>
                    <span className="block text-xs font-bold text-navy truncate max-w-[200px]">
                      {prevProject.title}
                    </span>
                  </div>
                </Link>
              </Button>
            ) : (
              <div />
            )}

            <Button asChild variant="secondary" size="sm">
              <Link to="/projects">View All 10 Projects</Link>
            </Button>

            {nextProject ? (
              <Button asChild variant="outline" className="w-full sm:w-auto justify-end">
                <Link to={`/projects/${nextProject.id}`}>
                  <div className="text-right">
                    <span className="block text-[10px] text-muted-foreground uppercase font-bold">
                      Next Project #{nextProject.no}
                    </span>
                    <span className="block text-xs font-bold text-navy truncate max-w-[200px]">
                      {nextProject.title}
                    </span>
                  </div>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
