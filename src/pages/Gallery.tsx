import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PageHero, SectionTitle } from "@/components/site";
import { Button } from "@/components/ui/button";
import {
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Maximize2,
} from "lucide-react";

import cableTerminationImg from "@/assets/gallery/cable-termination.jpg";
import structureInstallationImg from "@/assets/gallery/structure-installation.jpg";
import roadCorridorImg from "@/assets/gallery/road-corridor.jpg";
import lineInfrastructureImg from "@/assets/gallery/line-infrastructure.jpg";
import towerLandscapeImg from "@/assets/gallery/tower-landscape.jpg";
import highwayNetworkImg from "@/assets/gallery/highway-network.jpg";
import transmissionNetworkImg from "@/assets/gallery/transmission-network.jpg";
import substationYardImg from "@/assets/gallery/substation-yard.jpg";
import civilFoundationsImg from "@/assets/gallery/civil-foundations.jpg";
import fieldEngineersImg from "@/assets/gallery/field-engineers.jpg";

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Field Execution" | "Highway Corridors" | "Power Lines & Towers" | "Substations & Civil";
  image: string;
  location: string;
  aspect: "landscape" | "portrait" | "wide";
  tags: string[];
}

const galleryItems: GalleryItem[] = [
  {
    id: "cable-termination",
    title: "Cable Termination Preparation",
    subtitle: "High-voltage outdoor cable termination kit preparation and stress cone assembly.",
    category: "Field Execution",
    image: cableTerminationImg,
    location: "Kandamangalam Road, Tamil Nadu",
    aspect: "landscape",
    tags: ["HT Cable Termination", "Outdoor Kit Assembly", "Field Execution"],
  },
  {
    id: "structure-installation",
    title: "Electrical Structure Installation",
    subtitle: "Linemen installing HT/LT double-pole (DP) electrical structure, insulators and cross arms.",
    category: "Field Execution",
    image: structureInstallationImg,
    location: "Tamil Nadu Corridor",
    aspect: "portrait",
    tags: ["DP Structure", "Pole Erection", "Lineman Team"],
  },
  {
    id: "road-corridor",
    title: "Highway Utility Corridors — Road Corridor & Overhead Network",
    subtitle: "NHAI road widening utility corridor with shifted transmission line network running along the highway.",
    category: "Highway Corridors",
    image: roadCorridorImg,
    location: "NHAI Road Widening Corridor",
    aspect: "landscape",
    tags: ["Highway Utility Corridor", "NHAI Road Widening", "Overhead Network"],
  },
  {
    id: "line-infrastructure",
    title: "Line Infrastructure at Project Site",
    subtitle: "High-voltage transmission lattice towers and baby towers erected along the project boundary.",
    category: "Power Lines & Towers",
    image: lineInfrastructureImg,
    location: "Tamil Nadu Project Site",
    aspect: "landscape",
    tags: ["HT Transmission Lines", "Mini Towers", "Grid Connection"],
  },
  {
    id: "tower-landscape",
    title: "High-Voltage Transmission Towers & Landscape",
    subtitle: "Panoramic view of transmission infrastructure crossing agricultural and highway corridors.",
    category: "Power Lines & Towers",
    image: towerLandscapeImg,
    location: "Southern India Corridor",
    aspect: "wide",
    tags: ["Turnkey Transmission", "Lattice Towers", "Ultra HD"],
  },
  {
    id: "highway-network",
    title: "Highway Expansion Utility Realignment",
    subtitle: "Underground cable and overhead realignment supporting expressway and multi-lane widening.",
    category: "Highway Corridors",
    image: highwayNetworkImg,
    location: "Bangalore–Chennai Expressway / NH Corridors",
    aspect: "landscape",
    tags: ["Utility Realignment", "Expressway Corridor", "Overhead Network"],
  },
  {
    id: "transmission-network",
    title: "Rural Agri Feeder Segregation Network",
    subtitle: "11kV agricultural feeder segregation line works executed under the government RDSS scheme.",
    category: "Highway Corridors",
    image: transmissionNetworkImg,
    location: "TANGEDCO Kanchipuram Circle",
    aspect: "landscape",
    tags: ["RDSS Scheme", "11kV Feeder Network", "TANGEDCO"],
  },
  {
    id: "substation-yard",
    title: "33/11kV Substation Yard & Transformers",
    subtitle: "High-capacity power transformer installations, switchyard civil platforms, and bay extensions.",
    category: "Substations & Civil",
    image: substationYardImg,
    location: "Substation Infrastructure",
    aspect: "landscape",
    tags: ["33/11kV Substation", "Power Transformers", "Switchyard"],
  },
  {
    id: "civil-foundations",
    title: "Tower Foundations & Road Utility Trenching",
    subtitle: "Reinforced concrete plinth platforms, cable trench excavation, and highway utility shifting works.",
    category: "Substations & Civil",
    image: civilFoundationsImg,
    location: "Highway & Urban Corridors",
    aspect: "landscape",
    tags: ["Civil Foundations", "Utility Trenching", "Reinforced Plinth"],
  },
  {
    id: "field-engineers",
    title: "Field Execution Team & Safety Supervision",
    subtitle: "Certified electrical & civil engineering team conducting on-site technical inspection and quality audits.",
    category: "Substations & Civil",
    image: fieldEngineersImg,
    location: "Project Worksite",
    aspect: "landscape",
    tags: ["Safety Compliance", "Quality Audits", "Certified Engineers"],
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Site Photo Gallery — Vijaya Lakshmi Infra";
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") setSelectedImageIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
      }
      if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, activeCategory]);

  const categories = [
    { label: "All Photos", value: "All", count: galleryItems.length },
    {
      label: "Field Execution",
      value: "Field Execution",
      count: galleryItems.filter((i) => i.category === "Field Execution").length,
    },
    {
      label: "Highway Corridors",
      value: "Highway Corridors",
      count: galleryItems.filter((i) => i.category === "Highway Corridors").length,
    },
    {
      label: "Power Lines & Towers",
      value: "Power Lines & Towers",
      count: galleryItems.filter((i) => i.category === "Power Lines & Towers").length,
    },
    {
      label: "Substations & Civil",
      value: "Substations & Civil",
      count: galleryItems.filter((i) => i.category === "Substations & Civil").length,
    },
  ];

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((i) => i.category === activeCategory);

  const selectedItem = selectedImageIndex !== null ? filteredItems[selectedImageIndex] : null;

  return (
    <>
      <PageHero
        title="Infrastructure Photo Gallery"
        eyebrow="Visual Portfolio"
        image={roadCorridorImg}
      />

      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* Header Title Banner */}
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-primary mb-3">
              OFFICIAL SITE PHOTOGRAPHS
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy tracking-tight max-w-4xl mx-auto leading-tight">
              Field Execution & Project Site Gallery
            </h1>
            <p className="mt-3.5 max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed">
              Authentic on-site photographs reproduced from company profile documents, capturing cable
              terminations, tower erection, highway utility corridors, and substation works.
            </p>

            {/* Category Filter Pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {categories.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => {
                    setActiveCategory(c.value);
                    setSelectedImageIndex(null);
                  }}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer ${
                    activeCategory === c.value
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-102"
                      : "bg-background text-muted-foreground hover:bg-primary-soft hover:text-navy border border-border"
                  }`}
                >
                  <span>{c.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                      activeCategory === c.value
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {c.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Premium Image-Only Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedImageIndex(idx)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/80 bg-slate-900 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-primary/50 aspect-4/3"
              >
                {/* Pristine HD Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Subtle HD badge on top right */}
                <div className="absolute right-3.5 top-3.5 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-full bg-navy/85 border border-white/20 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-gold backdrop-blur-md shadow-md">
                    HD
                  </span>
                </div>

                {/* Hover Overlay: Premium Dark Gradient with Title, Category, and Center Zoom Icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100 flex flex-col justify-between p-5 backdrop-blur-[2px]">
                  {/* Category Pill Top Left */}
                  <div className="transform -translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="rounded-full bg-primary/90 px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Center Zoom Button */}
                  <div className="self-center flex h-12 w-12 items-center justify-center rounded-full bg-gold/90 text-navy shadow-xl transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 hover:bg-gold">
                    <Maximize2 className="h-5 w-5" />
                  </div>

                  {/* Title & Location at bottom */}
                  <div className="transform translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="font-display text-sm sm:text-base font-bold text-white leading-snug line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-white/70 line-clamp-1">
                      {item.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Consultation Box */}
          <div className="mt-16 rounded-2xl bg-navy p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-premium">
            <div className="max-w-xl">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-gold mb-1.5">
                FIELD READY INFRASTRUCTURE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                Looking for execution partners for high-voltage and highway packages?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/80">
                Vijaya Lakshmi Infra provides proven field capability across Tamil Nadu, Telangana, and
                pan-South India.
              </p>
            </div>
            <Button asChild size="lg" variant="consult" className="shrink-0">
              <Link to="/contact">
                Contact Our Team <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Full HD Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-6 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex((prev) =>
                prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
              );
            }}
            className="absolute left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors cursor-pointer hidden sm:flex"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex((prev) =>
                prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
              );
            }}
            className="absolute right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors cursor-pointer hidden sm:flex"
            aria-label="Next Photo"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          {/* Lightbox Content Container */}
          <div
            className="relative max-w-5xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Box */}
            <div className="relative flex items-center justify-center bg-black max-h-[70vh] overflow-hidden">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Bottom Caption & Info Bar */}
            <div className="p-5 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded bg-gold/20 text-gold border border-gold/40 px-2.5 py-0.5 text-xs font-bold">
                    {selectedItem.category}
                  </span>
                  <span className="text-xs text-white/60 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-destructive" />
                    {selectedItem.location}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{selectedItem.title}</h3>
                <p className="text-xs text-white/70 mt-1 max-w-2xl">{selectedItem.subtitle}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-mono text-white/60">
                  {selectedImageIndex! + 1} / {filteredItems.length}
                </span>
                <a
                  href={selectedItem.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-primary/80 transition-colors inline-flex items-center gap-1.5"
                >
                  <Maximize2 className="h-3.5 w-3.5" /> Full HD Original
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
