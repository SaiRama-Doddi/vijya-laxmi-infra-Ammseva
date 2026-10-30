import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { SiteShell } from "@/components/site";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SiteShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SiteShell>
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}
