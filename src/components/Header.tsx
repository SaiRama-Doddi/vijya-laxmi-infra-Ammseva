import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo, FreeConsultancyModal } from "@/components/site";

export const navLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Projects", "/projects"],
  ["Gallery", "/gallery"],
  ["Contact", "/contact"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: "100%",
      }}
      className={`border-b transition-all duration-200 ${
        isScrolled
          ? "border-slate-200/90 bg-white shadow-md"
          : "border-slate-200/60 bg-white/95 shadow-xs backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-16 sm:h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav
          className="hidden items-center justify-center gap-4 lg:gap-5 xl:gap-7 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks.map(([label, to]) => (
            <Link
              key={to}
              to={to}
              className={`nav-link text-sm xl:text-base text-slate-700 hover:text-primary transition-colors ${
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
              <Button variant="consult" size="sm" className="inline-flex cursor-pointer text-xs xl:text-sm">
                Get Free Consultancy <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            }
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-700 hover:bg-slate-100 lg:hidden cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      {open && (
        <nav className="border-t border-slate-200 bg-white p-5 shadow-xl lg:hidden animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
          {navLinks.map(([label, to]) => (
            <Link
              key={to}
              to={to}
              className={`block border-b border-slate-100 py-3 font-display font-semibold transition-colors ${
                (to === "/" ? pathname === "/" : pathname.startsWith(to))
                  ? "text-primary font-bold bg-primary-soft/50 px-3 rounded-lg"
                  : "text-slate-800 hover:text-primary hover:bg-slate-50 px-3 rounded-lg"
              }`}
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
